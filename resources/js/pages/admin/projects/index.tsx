import { Head, Link } from '@inertiajs/react';
import { FolderKanban, Plus } from 'lucide-react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { DeleteButton } from '@/components/admin/delete-button';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState, StatusBadge } from '@/components/admin/status-badge';
import type { AdminProject } from '@/types/admin';

export default function ProjectsIndex({
    projects,
}: {
    projects: AdminProject[];
}) {
    return (
        <AdminLayout>
            <Head title="Projets — Administration" />
            <PageHeader
                title="Projets"
                description="Gérez les projets affichés dans la section « Projets » du site."
                action={
                    <Link
                        href="/admin/projects/create"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90"
                    >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        Nouveau projet
                    </Link>
                }
            />

            {projects.length === 0 ? (
                <EmptyState
                    title="Aucun projet"
                    description="Ajoutez votre premier projet pour alimenter la section publique."
                    action={
                        <Link
                            href="/admin/projects/create"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2.5 text-sm font-medium text-zinc-950"
                        >
                            <Plus className="h-4 w-4" aria-hidden="true" />
                            Créer un projet
                        </Link>
                    }
                />
            ) : (
                <div className="space-y-3">
                    {projects.map((project) => (
                        <article
                            key={project.id}
                            className="glass glow-card rounded-2xl p-4 sm:p-5"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="flex min-w-0 gap-4">
                                    <div
                                        className={`hidden h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br sm:block ${project.gradient}`}
                                        aria-hidden="true"
                                    />
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h2 className="text-sm font-semibold text-zinc-100">
                                                {project.title}
                                            </h2>
                                            <StatusBadge
                                                active={project.is_published}
                                                activeLabel="Publié"
                                                inactiveLabel="Brouillon"
                                            />
                                        </div>
                                        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                                            {project.description}
                                        </p>
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                            {project.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <span className="mr-2 text-xs text-zinc-600">
                                        #{project.sort_order}
                                    </span>
                                    <Link
                                        href={`/admin/projects/${project.id}/edit`}
                                        className="glass rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:text-emerald-300"
                                    >
                                        Modifier
                                    </Link>
                                    <DeleteButton
                                        url={`/admin/projects/${project.id}`}
                                        message={`Supprimer le projet « ${project.title} » ?`}
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {projects.length > 0 && (
                <p className="mt-4 flex items-center gap-1.5 text-xs text-zinc-600">
                    <FolderKanban className="h-3.5 w-3.5" aria-hidden="true" />
                    {projects.length} projet
                    {projects.length > 1 ? 's' : ''}
                </p>
            )}
        </AdminLayout>
    );
}
