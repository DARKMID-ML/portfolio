import { Head } from '@inertiajs/react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { TimelineForm } from '@/components/admin/forms/timeline-form';
import { PageHeader } from '@/components/admin/page-header';

export default function TimelineCreate() {
    return (
        <AdminLayout>
            <Head title="Nouvelle étape — Administration" />
            <PageHeader
                title="Nouvelle étape"
                description="Ajoutez une formation, un diplôme ou une expérience au parcours."
            />
            <TimelineForm />
        </AdminLayout>
    );
}
