import { Head } from '@inertiajs/react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { SkillForm } from '@/components/admin/forms/skill-form';
import { PageHeader } from '@/components/admin/page-header';
import type { AdminSkillCategory } from '@/types/admin';

export default function SkillEdit({
    category,
}: {
    category: AdminSkillCategory;
}) {
    return (
        <AdminLayout>
            <Head title={`Modifier ${category.title} — Administration`} />
            <PageHeader
                title="Modifier la catégorie"
                description={category.title}
            />
            <SkillForm category={category} />
        </AdminLayout>
    );
}
