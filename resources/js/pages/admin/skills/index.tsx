import { Head, Link } from '@inertiajs/react';
import { Plus, Wrench } from 'lucide-react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { DeleteButton } from '@/components/admin/delete-button';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState } from '@/components/admin/status-badge';
import type { AdminSkillCategory } from '@/types/admin';

export default function SkillsIndex({
    categories,
}: {
    categories: AdminSkillCategory[];
}) {
    return (
        <AdminLayout>
            <Head title="Compétences — Administration" />
            <PageHeader
                title="Compétences"
                description="Les catégories et technologies affichées dans la section Compétences."
                action={
                    <Link
                        href="/admin/skills/create"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90"
                    >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        Nouvelle catégorie
                    </Link>
                }
            />

            {categories.length === 0 ? (
                <EmptyState
                    title="Aucune catégorie"
                    description="Ajoutez une catégorie pour organiser vos compétences."
                    action={
                        <Link
                            href="/admin/skills/create"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2.5 text-sm font-medium text-zinc-950"
                        >
                            <Plus className="h-4 w-4" aria-hidden="true" />
                            Créer une catégorie
                        </Link>
                    }
                />
            ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                    {categories.map((category) => (
                        <article
                            key={category.id}
                            className="glass glow-card rounded-2xl p-5"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h2 className="text-sm font-semibold text-zinc-100">
                                        {category.title}
                                    </h2>
                                    <p className="mt-1 text-xs text-zinc-500">
                                        {category.description}
                                    </p>
                                </div>
                                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-500">
                                    #{category.sort_order}
                                </span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <Link
                                    href={`/admin/skills/${category.id}/edit`}
                                    className="glass rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:text-emerald-300"
                                >
                                    Modifier
                                </Link>
                                <DeleteButton
                                    url={`/admin/skills/${category.id}`}
                                    message={`Supprimer la catégorie « ${category.title} » ?`}
                                />
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {categories.length > 0 && (
                <p className="mt-4 flex items-center gap-1.5 text-xs text-zinc-600">
                    <Wrench className="h-3.5 w-3.5" aria-hidden="true" />
                    {categories.length} catégorie
                    {categories.length > 1 ? 's' : ''}
                </p>
            )}
        </AdminLayout>
    );
}
