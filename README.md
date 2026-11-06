# 📘 Portfolio — PRD & TRD

> **Stack** : Next.js 14 + Drizzle + Neon + shadcn/ui + Tailwind · Laravel 13 (Inertia.js)  
> **Domaine** : Portfolio développeur full-stack  
> **Statut** : En cours

---

## Déploiement sur Render

L'application Laravel nécessite PHP ; le service Render doit utiliser l'environnement **Docker** (fichier `Dockerfile` à la racine), et non le runtime Node/Bun. Le conteneur construit les assets Vite, lance Apache et applique les migrations au démarrage.

Dans les variables d'environnement Render, définir `APP_KEY` avec une clé générée localement par `php artisan key:generate --show`. La base SQLite incluse dans le conteneur est éphémère : utiliser une base de données persistante pour conserver les données entre les déploiements.

---

## 1. PRD

### Objectifs

- Site vitrine développeur full-stack
- Blog/tutoriels techniques (MDX)
- Backend Laravel API + Frontend Next.js

### User Stories

| #   | En tant que… | Je veux…           | Afin de…              |
| --- | ------------ | ------------------ | --------------------- |
| 1   | Visiteur     | voir mon portfolio | découvrir mes projets |
| 2   | Visiteur     | lire mes tutoriels | apprendre             |
| 3   | Recruteur    | télécharger mon CV | me contacter          |
| 4   | Moi-même     | gérer mes posts    | publier du contenu    |

### Priorité : **P1**

---

## 2. TRD

### Frontend

- **Framework** : Next.js 14
- **Langage** : TypeScript
- **ORM** : Drizzle ORM
- **DB** : Neon (PostgreSQL serverless)
- **UI** : Tailwind + shadcn/ui
- **Content** : @mdxeditor/editor
- **Runtime** : Bun

### Backend

- **Framework** : Laravel 13
- **Langage** : PHP 8.3
- **Auth** : Laravel Breeze ( Inertia.js)
- **ORM** : Eloquent

### Scripts

```bash
npm run dev        # Next dev server
npm run db:push    # Drizzle push
npm run db:studio  # Drizzle studio
npm run start      # Bun production
```

---

## 3. AppFlow — Blogging Flow

```
1. Client → GET /blog
2. Next.js → Drizzle → Neon DB
3. Return posts → render
4. Admin → POST /admin/posts (auth required)
5. Laravel API → store → redirect
```

---

## 4. Design UI/UX

### Design System

- **Palette** : slate-900 bg, blue-500 primary, slate-100 text
- **Composants** : shadcn/ui (Button, Card, Dialog, Form)
- **Typographie** : Inter

### Wireframe — Homepage

```
┌─────────────────────────────────────┐
│  Hero : Nom + titre + CTA           │
├─────────────────────────────────────┤
│  Projects grid                      │
│  ┌─────────────┐ ┌─────────────┐    │
│  │ ProjectCard │ │ ProjectCard │    │
│  └─────────────┘ └─────────────┘    │
├─────────────────────────────────────┤
│  Blog preview                       │
│  ┌───────────────────────────────┐  │
│  │ PostCard x 3                  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## 5. Schéma Backend

### Drizzle (Next.js / Neon)

```typescript
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    name: varchar('name', { length: 255 }),
});

export const posts = pgTable('posts', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content'),
    authorId: uuid('author_id').references(() => users.id),
});
```

### Laravel (Backend)

```php
// routes/api.php
Route::apiResource('projects', ProjectController::class);
Route::apiResource('posts', PostController::class);
```

---

## 6. Plan d’Implémentation — Sprint 1 semaine

| Jour | Tâche                       | Status |
| ---- | --------------------------- | ------ |
| J1   | Next.js setup + shadcn/ui   | ☐      |
| J2   | Drizzle schema + migrations | ☐      |
| J3   | Blog posts (MDX) + content  | ☐      |
| J4   | Laravel API + Inertia auth  | ☐      |
| J5   | Déploiement (Vercel/Neon)   | ☐      |
