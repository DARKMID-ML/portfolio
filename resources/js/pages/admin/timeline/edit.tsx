import { Head } from '@inertiajs/react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { TimelineForm } from '@/components/admin/forms/timeline-form';
import { PageHeader } from '@/components/admin/page-header';
import type { AdminTimelineEntry } from '@/types/admin';

export default function TimelineEdit({ entry }: { entry: AdminTimelineEntry }) {
    return (
        <AdminLayout>
            <Head title={`Modifier ${entry.title} — Administration`} />
            <PageHeader title="Modifier l’étape" description={entry.title} />
            <TimelineForm entry={entry} />
        </AdminLayout>
    );
}
