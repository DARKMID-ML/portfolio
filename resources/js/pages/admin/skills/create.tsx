import { Head } from '@inertiajs/react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { SkillForm } from '@/components/admin/forms/skill-form';
import { PageHeader } from '@/components/admin/page-header';

export default function SkillCreate() {
    return (
        <AdminLayout>
            <Head title="Nouvelle catégorie — Administration" />
            <PageHeader
                title="Nouvelle catégorie"
                description="Ajoutez un groupe de compétences à la section publique."
            />
            <SkillForm />
        </AdminLayout>
    );
}
