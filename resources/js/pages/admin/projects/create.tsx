import { Head } from '@inertiajs/react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { ProjectForm } from '@/components/admin/forms/project-form';
import { PageHeader } from '@/components/admin/page-header';

export default function ProjectCreate() {
    return (
        <AdminLayout>
            <Head title="Nouveau projet — Administration" />
            <PageHeader
                title="Nouveau projet"
                description="Ajoutez une réalisation à la section Projets du site."
            />
            <ProjectForm />
        </AdminLayout>
    );
}
