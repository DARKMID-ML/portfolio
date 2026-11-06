import { Head } from '@inertiajs/react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { ServiceForm } from '@/components/admin/forms/service-form';
import { PageHeader } from '@/components/admin/page-header';
import type { AdminService } from '@/types/admin';

export default function ServiceEdit({ service }: { service: AdminService }) {
    return (
        <AdminLayout>
            <Head title={`Modifier ${service.title} — Administration`} />
            <PageHeader
                title="Modifier le service"
                description={service.title}
            />
            <ServiceForm service={service} />
        </AdminLayout>
    );
}
