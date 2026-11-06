import { Head } from '@inertiajs/react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { ProjectForm } from '@/components/admin/forms/project-form';
import { PageHeader } from '@/components/admin/page-header';
import type { AdminProject } from '@/types/admin';

export default function ProjectEdit({ project }: { project: AdminProject }) {
    return (
        <AdminLayout>
            <Head title={`Modifier ${project.title} — Administration`} />
            <PageHeader
                title="Modifier le projet"
                description={project.title}
            />
            <ProjectForm project={project} />
        </AdminLayout>
    );
}
