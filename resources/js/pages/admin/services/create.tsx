import { Head } from '@inertiajs/react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { ServiceForm } from '@/components/admin/forms/service-form';
import { PageHeader } from '@/components/admin/page-header';

export default function ServiceCreate() {
    return (
        <AdminLayout>
            <Head title="Nouveau service — Administration" />
            <PageHeader
                title="Nouveau service"
                description="Ajoutez une prestation à la section publique."
            />
            <ServiceForm />
        </AdminLayout>
    );
}
