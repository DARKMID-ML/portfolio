import { Head, Link } from '@inertiajs/react';
import {
    Briefcase,
    FileText,
    FolderKanban,
    GraduationCap,
    Mail,
    Plus,
    UserRound,
    Wrench,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { EmptyState, StatusBadge } from '@/components/admin/status-badge';
import { PageHeader } from '@/components/admin/page-header';
import type { ContactMessage } from '@/types/admin';

type Stats = {
    unreadMessages: number;
    totalMessages: number;
    projects: number;
    skills: number;
    timeline: number;
    services: number;
};

function formatDate(value: string): string {
    return new Date(value).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export default function Dashboard({
    stats,
    recentMessages,
    hasCv,
}: {
    stats: Stats;
    recentMessages: ContactMessage[];
    hasCv: boolean;
}) {
    const cards = [
        {
            label: 'Messages non lus',
            value: stats.unreadMessages,
            detail: `${stats.totalMessages} message${stats.totalMessages > 1 ? 's' : ''} au total`,
            icon: Mail,
            href: '/admin/messages',
            accent: 'text-[#d6ff3f] bg-[#d6ff3f]/10',
        },
        {
            label: 'Projets',
            value: stats.projects,
            detail: 'Fiches publiées ou brouillons',
            icon: FolderKanban,
            href: '/admin/projects',
            accent: 'text-[#c8b8ff] bg-[#7658d6]/20',
        },
        {
            label: 'Compétences',
            value: stats.skills,
            detail: 'Catégories affichées',
            icon: Wrench,
            href: '/admin/skills',
            accent: 'text-[#d6ff3f] bg-[#d6ff3f]/10',
        },
        {
            label: 'Parcours',
            value: stats.timeline,
            detail: 'Étapes de la timeline',
            icon: GraduationCap,
            href: '/admin/timeline',
            accent: 'text-[#c8b8ff] bg-[#7658d6]/20',
        },
        {
            label: 'Services',
            value: stats.services,
            detail: 'Cartes de services',
            icon: Briefcase,
            href: '/admin/services',
            accent: 'text-[#d6ff3f] bg-[#d6ff3f]/10',
        },
        {
            label: 'CV en ligne',
            value: hasCv ? 'Oui' : 'Non',
            detail: hasCv ? 'PDF téléchargeable' : 'Aucun fichier déposé',
            icon: FileText,
            href: '/admin/profil',
            accent: 'text-[#c8b8ff] bg-[#7658d6]/20',
        },
    ];

    return (
        <AdminLayout>
            <Head title="Tableau de bord — Administration" />
            <PageHeader
                title="Vue d’ensemble"
                description="Gérez les contenus du portfolio et suivez les messages reçus."
                action={
                    <Link
                        href="/admin/projects/create"
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#d6ff3f] px-4 py-2.5 text-sm font-semibold text-[#17112d] transition-colors hover:bg-[#e3ff75] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ff3f]"
                    >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        Nouveau projet
                    </Link>
                }
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="group rounded-xl border border-white/10 bg-white/[0.035] p-5 transition-colors hover:border-[#d6ff3f]/35 hover:bg-white/[0.055] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ff3f]"
                        >
                            <div className="flex items-start justify-between">
                                <div
                                    className={`rounded-xl p-2.5 ${card.accent}`}
                                >
                                    <Icon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                    />
                                </div>
                                <span className="text-2xl font-bold text-zinc-100">
                                    {card.value}
                                </span>
                            </div>
                            <p className="mt-4 text-sm font-semibold text-zinc-100">
                                {card.label}
                            </p>
                            <p className="mt-0.5 text-xs text-zinc-500">
                                {card.detail}
                            </p>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
                <section className="rounded-xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-base font-semibold text-zinc-100">
                                Derniers messages
                            </h2>
                            <p className="text-xs text-zinc-500">
                                Les 5 demandes les plus récentes.
                            </p>
                        </div>
                        <Link
                            href="/admin/messages"
                            className="text-xs font-semibold text-[#d6ff3f] hover:text-[#e3ff75]"
                        >
                            Tout voir
                        </Link>
                    </div>

                    {recentMessages.length === 0 ? (
                        <EmptyState
                            title="Aucun message pour le moment"
                            description="Les messages envoyés depuis le formulaire de contact apparaîtront ici."
                        />
                    ) : (
                        <div className="divide-y divide-white/5">
                            {recentMessages.map((message) => (
                                <Link
                                    key={message.id}
                                    href={`/admin/messages/${message.id}`}
                                    className="flex items-center gap-3 py-3 transition-colors hover:text-[#d6ff3f]"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-zinc-200">
                                            {message.subject}
                                        </p>
                                        <p className="truncate text-xs text-zinc-500">
                                            {message.name} · {message.email}
                                        </p>
                                    </div>
                                    <div className="hidden shrink-0 text-right sm:block">
                                        <p className="text-xs text-zinc-500">
                                            {formatDate(message.created_at)}
                                        </p>
                                        <div className="mt-1">
                                            <StatusBadge
                                                active={!message.read}
                                                activeLabel="Non lu"
                                                inactiveLabel="Lu"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                <section className="rounded-xl border border-white/10 bg-white/[0.035] p-5 sm:p-6">
                    <h2 className="text-base font-semibold text-zinc-100">
                        Actions rapides
                    </h2>
                    <p className="mb-4 text-xs text-zinc-500">
                        Les raccourcis les plus utilisés.
                    </p>
                    <div className="space-y-2">
                        <Link
                            href="/admin/profil"
                            className="flex items-center gap-3 rounded-lg border border-white/10 px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:border-[#d6ff3f]/30 hover:bg-[#d6ff3f]/5 hover:text-[#d6ff3f]"
                        >
                            <UserRound className="h-4 w-4" aria-hidden="true" />
                            Modifier le profil et le CV
                        </Link>
                        <Link
                            href="/admin/messages?filter=unread"
                            className="flex items-center gap-3 rounded-lg border border-white/10 px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:border-[#d6ff3f]/30 hover:bg-[#d6ff3f]/5 hover:text-[#d6ff3f]"
                        >
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            Lire les messages non lus
                        </Link>
                        <Link
                            href="/admin/projects/create"
                            className="flex items-center gap-3 rounded-lg border border-white/10 px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:border-[#d6ff3f]/30 hover:bg-[#d6ff3f]/5 hover:text-[#d6ff3f]"
                        >
                            <Plus className="h-4 w-4" aria-hidden="true" />
                            Ajouter un projet
                        </Link>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}
