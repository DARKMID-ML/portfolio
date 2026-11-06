import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function DeleteButton({
    url,
    message = 'Confirmer la suppression ?',
    label = 'Supprimer',
}: {
    url: string;
    message?: string;
    label?: string;
}) {
    const [processing, setProcessing] = useState(false);

    const handleDelete = () => {
        if (!window.confirm(message)) {
            return;
        }

        router.delete(url, {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={processing}
        >
            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
            {processing ? 'Suppression…' : label}
        </Button>
    );
}
