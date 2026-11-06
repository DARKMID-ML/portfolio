import { Head, Link } from '@inertiajs/react';
import { GraduationCap, Plus } from 'lucide-react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { DeleteButton } from '@/components/admin/delete-button';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/status-badge';
import type { AdminTimelineEntry } from '@/types/admin';

export default function TimelineIndex({
    entries,
}: {
    entries: AdminTimelineEntry[];
}) {
    return (
        <AdminLayout>
            <Head title="Parcours — Administration" />
            <PageHeader
                title="Parcours"
                description="Les étapes affichées dans la section « Parcours » du site."
                action={
                    <Link
                        href="/admin/timeline/create"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90"
                    >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        Nouvelle étape
                    </Link>
                }
            />

            {entries.length === 0 ? (
                <EmptyState
                    title="Aucune étape"
                    description="Ajoutez une formation, un diplôme ou une expérience pour construire votre parcours."
                    action={
                        <Link
                            href="/admin/timeline/create"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2.5 text-sm font-medium text-zinc-950"
                        >
                            <Plus className="h-4 w-4" aria-hidden="true" />
                            Créer une étape
                        </Link>
                    }
                />
            ) : (
                <div className="space-y-3">
                    {entries.map((entry) => (
                        <article
                            key={entry.id}
                            className="glass glow-card rounded-2xl p-4 sm:p-5"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex min-w-0 gap-4">
                                    <span className="hidden h-12 w-20 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 font-mono text-xs font-semibold text-emerald-300 sm:flex">
                                        {entry.year}
                                    </span>
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="text-sm font-semibold text-zinc-100">
                                                {entry.title}
                                            </h2>
                                            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-500 sm:hidden">
                                                {entry.year}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-emerald-300/80">
                                            {entry.subtitle}
                                        </p>
                                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                                            {entry.description}
                                        </p>
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {entry.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <span className="mr-2 text-xs text-zinc-600">
                                        #{entry.sort_order}
                                    </span>
                                    <Link
                                        href={`/admin/timeline/${entry.id}/edit`}
                                        className="glass rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:text-emerald-300"
                                    >
                                        Modifier
                                    </Link>
                                    <DeleteButton
                                        url={`/admin/timeline/${entry.id}`}
                                        message={`Supprimer l’étape « ${entry.title} » ?`}
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {entries.length > 0 && (
                <p className="mt-4 flex items-center gap-1.5 text-xs text-zinc-600">
                    <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                    {entries.length} étape
                    {entries.length > 1 ? 's' : ''}
                </p>
            )}
        </AdminLayout>
    );
}
