import { Head, Link } from '@inertiajs/react';
import { Briefcase, Plus } from 'lucide-react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { DeleteButton } from '@/components/admin/delete-button';
import { PageHeader } from '@/components/admin/page-header';
import { EmptyState, StatusBadge } from '@/components/admin/status-badge';
import type { AdminService } from '@/types/admin';

export default function ServicesIndex({
    services,
}: {
    services: AdminService[];
}) {
    return (
        <AdminLayout>
            <Head title="Services — Administration" />
            <PageHeader
                title="Services"
                description="Les prestations présentées dans la section « Services » du site."
                action={
                    <Link
                        href="/admin/services/create"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90"
                    >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                        Nouveau service
                    </Link>
                }
            />

            {services.length === 0 ? (
                <EmptyState
                    title="Aucun service"
                    description="Ajoutez une prestation pour la mettre en avant sur le site."
                    action={
                        <Link
                            href="/admin/services/create"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2.5 text-sm font-medium text-zinc-950"
                        >
                            <Plus className="h-4 w-4" aria-hidden="true" />
                            Créer un service
                        </Link>
                    }
                />
            ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                    {services.map((service) => (
                        <article
                            key={service.id}
                            className="glass glow-card flex flex-col rounded-2xl p-5"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="text-sm font-semibold text-zinc-100">
                                            {service.title}
                                        </h2>
                                        <StatusBadge
                                            active={service.is_published}
                                            activeLabel="Publié"
                                            inactiveLabel="Brouillon"
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-zinc-500">
                                        Icône : {service.icon}
                                    </p>
                                </div>
                                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-500">
                                    #{service.sort_order}
                                </span>
                            </div>
                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                                {service.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {service.features.map((feature) => (
                                    <span
                                        key={feature}
                                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4 flex flex-1 items-end gap-2">
                                <Link
                                    href={`/admin/services/${service.id}/edit`}
                                    className="glass rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:text-emerald-300"
                                >
                                    Modifier
                                </Link>
                                <DeleteButton
                                    url={`/admin/services/${service.id}`}
                                    message={`Supprimer le service « ${service.title} » ?`}
                                />
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {services.length > 0 && (
                <p className="mt-4 flex items-center gap-1.5 text-xs text-zinc-600">
                    <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                    {services.length} service
                    {services.length > 1 ? 's' : ''}
                </p>
            )}
        </AdminLayout>
    );
}
