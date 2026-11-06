# BACKEND.md — Documentation technique du portfolio

> **Objet** : documenter l'ensemble du code du projet — le backend (migration
> Prisma → Drizzle ORM + PostgreSQL/Neon) et le front — fichier par fichier,
> avec l'état d'avancement.

---

## 1. Vue d'ensemble

### L'architecture en 4 couches

```
┌────────────────────────────────────────────────────────────┐
│  FRONT (React / Next.js)                                   │
│  src/app/page.tsx + src/components/**                      │
│  → affiche le site, envoie le formulaire de contact        │
└──────────────────────────┬─────────────────────────────────┘
                           │ fetch("/api/contact", POST)
┌──────────────────────────▼─────────────────────────────────┐
│  BACKEND (API Routes Next.js)                              │
│  src/app/api/{contact,messages,health}/route.ts            │
│  → valide les données (Zod), répond en JSON                │
└──────────────────────────┬─────────────────────────────────┘
                           │ db.insert(...) / db.select(...)
┌──────────────────────────▼─────────────────────────────────┐
│  ORM (Drizzle)                                             │
│  src/db/schema.ts + src/lib/db.ts                          │
│  → traduit le TypeScript en requêtes SQL                   │
└──────────────────────────┬─────────────────────────────────┘
                           │ SQL (HTTPS)
┌──────────────────────────▼─────────────────────────────────┐
│  BASE DE DONNÉES (PostgreSQL sur Neon, cloud)              │
│  table : contact_messages                                  │
│  → stocke les messages du formulaire de contact            │
└────────────────────────────────────────────────────────────┘
```

### Avant → Après

| Couche               | Avant                   | Après                                  |
| -------------------- | ----------------------- | -------------------------------------- |
| ORM                  | Prisma                  | **Drizzle ORM**                        |
| Base de données      | SQLite (fichier local)  | **PostgreSQL (Neon, cloud)**           |
| Driver               | `@prisma/client` généré | `@neondatabase/serverless` (neon-http) |
| Backend (API Routes) | identique               | identique                              |
| Front                | identique               | identique                              |

### Répartition des 87 fichiers

| Catégorie                | Quantité | Détail                                                 |
| ------------------------ | -------- | ------------------------------------------------------ |
| Backend (API + DB)       | 8        | 4 routes API, schema, db.ts, types, drizzle.config     |
| Front (pages + sections) | 11       | layout, page, globals.css, 8 sections portfolio        |
| Composants UI (shadcn)   | 46       | `src/components/ui/`                                   |
| Hooks + utilitaires      | 4        | use-toast, use-mobile, lib/utils, lib/db               |
| Config / contenu         | 1        | `src/config/portfolio.ts`                              |
| Configuration projet     | 13       | package.json, tsconfig, tailwind, eslint, Caddyfile... |
| Scripts                  | 1        | scripts/verify-contact.ts                              |

---

## 2. Le BACKEND — chaque fichier

### 2.1 Fichiers supprimés (ancien système Prisma)

| Fichier                             | Ce qu'il faisait                                                                                                                | Remplacé par                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `prisma/schema.prisma`              | Décrivait la table `ContactMessage` (id, name, email, subject, message, read, createdAt) en langage Prisma, sur base **SQLite** | `src/db/schema.ts`                         |
| dep `prisma` (package.json)         | CLI Prisma : `prisma generate`, `db push`, migrations                                                                           | `drizzle-kit`                              |
| dep `@prisma/client` (package.json) | Client exécuté dans les routes pour parler à la BDD                                                                             | `drizzle-orm` + `@neondatabase/serverless` |
| `node_modules/.prisma/`             | Client généré automatiquement                                                                                                   | n'existe plus                              |

### 2.2 Fichiers créés

#### `src/db/schema.ts` — le plan de la table

Définit la seule table du projet, `contact_messages`, colonne par colonne :

```ts
id        : text, clé primaire, UUID généré automatiquement
name      : text, requis
email     : text, requis
subject   : text, requis
message   : text, requis
read      : boolean, défaut false   → lu / non-lu (back-office)
createdAt : timestamp tz, défaut now() → date de réception
```

Exporte aussi les types TypeScript `ContactMessage` (lecture) et
`NewContactMessage` (écriture) — c'est la source de vérité du modèle de données.

#### `src/lib/db.ts` — la connexion à la base

- Crée le client `neon()` (driver HTTP de Neon, adapté au serverless)
- L'enveloppe dans `drizzle(sql, { schema })`
- Garde une **instance unique** sur `globalThis` en dev (évite d'ouvrir
  plusieurs connexions à chaque rechargement à chaud)
- **Lève une erreur explicite** si `DATABASE_URL` est absente de `.env`
- Ré-exporte le schéma

#### `src/app/api/contact/route.ts` — MODIFIÉ (voir §2.3)

Endpoint `POST /api/contact` : reçoit le formulaire du front.

#### `src/app/api/messages/route.ts` — liste des messages (back-office)

- `GET /api/messages` → tous les messages, du plus récent au plus ancien
- `GET /api/messages?unread=true` → uniquement les non-lus
- Réponse : `{ messages: [...], total: n }`

#### `src/app/api/messages/[id]/route.ts` — gestion d'un message

- `GET /api/messages/:id` → un message précis (404 si introuvable)
- `PATCH /api/messages/:id` → met à jour, ex. `{ "read": true }` pour marquer lu
- `DELETE /api/messages/:id` → supprime le message

#### `src/app/api/health/route.ts` — vérification de santé

- `GET /api/health` → exécute `select 1` sur la base
- Répond `200 {"status":"ok","database":"up",...}` ou `503 {"database":"down"}`
- **C'est l'endpoint de test rapide** après tout changement de config

#### `src/types/index.ts` — types partagés

`ApiError`, `ApiOk`, `HealthStatus` (contrats de réponse JSON) + ré-export du
type `ContactMessage` — utilisé par toutes les routes.

#### `drizzle.config.ts` — config de l'outil drizzle-kit

Indique où est le schéma (`src/db/schema.ts`), où ranger les migrations
(`./drizzle/`), le dialecte (`postgresql`) et lit `DATABASE_URL`.

#### `.env.example` — modèle de variable d'environnement

Montre la forme attendue : `DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"`.

### 2.3 Fichiers modifiés

#### `package.json`

- **Scripts** : les commandes Prisma deviennent Drizzle —

    | Avant                  | Après                                          | Rôle                                             |
    | ---------------------- | ---------------------------------------------- | ------------------------------------------------ |
    | `prisma db push`       | `drizzle-kit push`                             | pousse le schéma en base sans migration formelle |
    | `prisma generate`      | (inutile)                                      | Drizzle n'a pas de génération de client          |
    | `prisma migrate dev`   | `drizzle-kit generate` + `drizzle-kit migrate` | migrations versionnées                           |
    | `prisma migrate reset` | (supprimé)                                     | —                                                |
    | —                      | `drizzle-kit studio`                           | interface web pour consulter la base             |

- **Dépendances** : `-prisma` `-@prisma/client` `+drizzle-orm`
  `+@neondatabase/serverless` `+drizzle-kit` (dev)
- Les autres scripts (`dev`, `build`, `start`, `lint`) sont **inchangés**.

#### `src/app/api/contact/route.ts`

Seule la partie écriture a changé — la validation Zod est identique :

```ts
// AVANT (Prisma)
const saved = await db.contactMessage.create({ data: parsed.data });

// APRÈS (Drizzle)
const [saved] = await db
    .insert(contactMessages)
    .values(parsed.data)
    .returning({ id: contactMessages.id });
```

Les réponses JSON (`201 { ok, id }`, `400 { error }`, `500 { error }`) sont
**identiques** → le front n'a rien à changer.

#### `scripts/verify-contact.ts`

Réécrit : lit tous les messages avec Drizzle et les affiche dans le terminal
(`bun run scripts/verify-contact.ts`). Même utilité qu'avant, sans Prisma.

### 2.4 Fichiers À MODIFIER (reste à faire)

| Fichier                   | Changement requis                                                                                                               | État                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `.env`                    | Remplacer `DATABASE_URL=file:/home/z/...` (SQLite obsolète) par l'URL **Neon** `postgresql://...`                               | 🔴 **BLOQUANT** — empêche build et db:push |
| `src/config/portfolio.ts` | Lignes 124 et 158 : remplacer les libellés `"Prisma ORM"` / `"Prisma"` par `"Drizzle"` / `"Drizzle ORM"` (affichés sur le site) | 🟡 cosmétique                              |
| `src/app/api/route.ts`    | Route de test `GET /api` → `{ message: "Hello, world!" }` : à conserver comme ping ou à supprimer                               | 🟡 à décider                               |
| (futur) auth back-office  | Protéger `/api/messages` (par ex. variable `ADMIN_API_KEY` ou `next-auth` déjà installé) avant publication                      | 🟡 avant mise en ligne                     |

---

## 3. Le FRONT — chaque fichier (inchangé par la migration)

### 3.1 Pages (`src/app/`)

| Fichier        | Rôle exact                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `layout.tsx`   | Racine de l'app : métadonnées SEO (title, description, OpenGraph pour "Moussa Traoré — Bamako, Mali"), polices Google Geist, thème sombre (`className="dark"`), monte le `<Toaster>` des notifications |
| `page.tsx`     | Accueil : assemble les 8 sections dans l'ordre Navbar → Hero → About → Skills → Projects → Services → Contact → Footer                                                                                 |
| `globals.css`  | Styles globaux Tailwind v4 : variables de couleurs, classes utilitaires maison (`glass`, `neon-text`, `glow-card`, `glow-green`)                                                                       |
| `api/route.ts` | Voir §2.4                                                                                                                                                                                              |

### 3.2 Sections du site (`src/components/portfolio/`)

| Composant      | Rôle exact                                                                                                                                                                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `navbar.tsx`   | Barre de navigation fixe, effet transparence au scroll, menu mobile                                                                                                                                                                                         |
| `hero.tsx`     | Bloc d'accueil avec **effet machine à écrire** (`useTypingEffect`) sur les rôles rotatifs ("Développeur Web Full-Stack"...)                                                                                                                                 |
| `about.tsx`    | Section "À propos" : profil + timeline du parcours (données de `config/portfolio.ts`)                                                                                                                                                                       |
| `skills.tsx`   | Grille de compétences techniques par catégorie (Frontend, Backend...)                                                                                                                                                                                       |
| `projects.tsx` | Cartes des projets (GestiSchool...) avec technologies et liens                                                                                                                                                                                              |
| `services.tsx` | Prestations proposées (site vitrine, e-commerce...)                                                                                                                                                                                                         |
| `contact.tsx`  | ⚠️ **Seul lien réel front → back** : formulaire (name, email, subject, message) qui fait `fetch("/api/contact", { method: "POST" })`, affiche un toast de succès ou d'erreur via `use-toast`. Aussi les canaux directs (WhatsApp, e-mail, LinkedIn, GitHub) |
| `footer.tsx`   | Pied de page : copyright, liens sociaux (année dynamique)                                                                                                                                                                                                   |

**Flux du formulaire (le seul circuit complet) :**

```
contact.tsx --POST JSON--> /api/contact --Zod--> Drizzle insert --> Neon
   <-- toast "Message envoyé !" <-- 201 {ok,id} <-------------------
```

### 3.3 Composants UI (`src/components/ui/` — 46 fichiers)

Bibliothèque **shadcn/ui** générée : button, input, textarea, label, dialog,
toast/toaster, card, badge, table, form, sidebar... etc.
Ce sont des **composants prêts à l'emploi, personnalisables**, dépendants de
Radix UI + Tailwind. Aucun n'est modifié par la migration ; seul `toast` et
`input/textarea/label` sont utilisés par le formulaire de contact.

### 3.4 Hooks & utilitaires

| Fichier                   | Rôle                                                                              |
| ------------------------- | --------------------------------------------------------------------------------- |
| `src/hooks/use-toast.ts`  | Gère l'état des notifications (add/dismiss) + reducer ; branché sur `<Toaster />` |
| `src/hooks/use-mobile.ts` | Détecte un écran < 768px (responsive)                                             |
| `src/lib/utils.ts`        | `cn()` = fusionne les classes Tailwind (clsx + tailwind-merge)                    |

### 3.5 Contenu éditorial : `src/config/portfolio.ts`

Fichier **sans composant** qui centralise tout le texte affiché :
`profile` (identité, contacts), `rotatingRoles` (hero), `timeline`,
`skillCategories`, `projects`, `services`, `localMarket`.
➡️ C'est ici qu'on remplace les 2 mentions "Prisma" (voir §2.4).

---

## 4. Configuration & outillage (racine du projet)

| Fichier                     | Rôle exact                                                        |
| --------------------------- | ----------------------------------------------------------------- |
| `package.json`              | Scripts + dépendances (voir §2.3)                                 |
| `tsconfig.json`             | Réglages TypeScript : strict, alias `@/*` → `./src/*`             |
| `next.config.ts`            | Configuration Next.js (output standalone pour le déploiement)     |
| `tailwind.config.ts`        | Thème Tailwind (couleurs, animations)                             |
| `postcss.config.mjs`        | PostCSS + plugin Tailwind v4                                      |
| `eslint.config.mjs`         | Lint ESLint (configs Next core-web-vitals + TypeScript)           |
| `components.json`           | Config shadcn/ui (où poser les nouveaux composants)               |
| `Caddyfile`                 | Serveur web Caddy : routage/HTTPS du site déployé                 |
| `.gitignore`                | Fichiers ignorés par Git (node_modules, .next, .env...)           |
| `.env`                      | 🔴 Variables secrètes : `DATABASE_URL` **à remplacer (URL Neon)** |
| `.env.example`              | Modèle sans secrets                                               |
| `bun.lock`                  | Verrouillage des versions (Bun)                                   |
| `drizzle.config.ts`         | Config drizzle-kit (voir §2.2)                                    |
| `next-env.d.ts`             | Généré par Next.js, ne pas toucher                                |
| `tsconfig.tsbuildinfo`      | Cache TypeScript, généré                                          |
| `scripts/verify-contact.ts` | Voir §2.3                                                         |

---

## 5. Commandes

```bash
bun install          # ✅ fait — dépendances installées
bun run db:push      # ⏳ crée la table contact_messages sur Neon (réclame l'URL Neon)
bun run dev          # démarre le site sur http://localhost:3000
bun run build        # build de production
bun run lint         # vérification ESLint
bun x tsc --noEmit   # ✅ fait — vérification TypeScript (0 erreur)
```

**Tests manuels après `db:push` :**

1. `GET http://localhost:3000/api/health` → `{"status":"ok","database":"up"}`
2. Remplir le formulaire de contact sur le site → toast "Message envoyé !"
3. `GET http://localhost:3000/api/messages` → le message apparaît
4. `PATCH /api/messages/:id` avec `{"read":true}` → marqué lu
5. `DELETE /api/messages/:id` → supprimé

---

## 6. État d'avancement (au 15/10/2026)

| Étape                                                | État                                        |
| ---------------------------------------------------- | ------------------------------------------- |
| Analyse du projet & choix technique (Drizzle + Neon) | ✅                                          |
| Suppression de Prisma (fichiers + deps)              | ✅                                          |
| Création du schéma Drizzle (`src/db/schema.ts`)      | ✅                                          |
| Connexion DB (`src/lib/db.ts`)                       | ✅                                          |
| Routes API : contact migré, messages, health         | ✅                                          |
| Installation des dépendances (`bun install`)         | ✅                                          |
| Typecheck TypeScript                                 | ✅ 0 erreur                                 |
| Compilation Next.js                                  | ✅ "Compiled successfully"                  |
| Build complet                                        | ❌ échoue : `DATABASE_URL` encore en SQLite |
| `.env` → URL Neon                                    | 🔴 **EN ATTENTE de l'URL de connexion**     |
| `bun run db:push`                                    | ⏳ bloqué par l'étape ci-dessus             |
| Test `/api/health` + formulaire                      | ⏳                                          |
| Authentification du back-office                      | ⏳ à prévoir avant mise en ligne            |
