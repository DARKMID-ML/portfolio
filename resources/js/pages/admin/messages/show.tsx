import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Mail, MailOpen, Reply } from 'lucide-react';
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { DeleteButton } from '@/components/admin/delete-button';
import { PageHeader } from '@/components/admin/page-header';
import { StatusBadge } from '@/components/admin/status-badge';
import type { ContactMessage } from '@/types/admin';

function formatDate(value: string): string {
    return new Date(value).toLocaleString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function MessageShow({ message }: { message: ContactMessage }) {
    const [processing, setProcessing] = useState(false);

    const toggleRead = () => {
        router.patch(
            `/admin/messages/${message.id}`,
            { read: !message.read },
            {
                preserveScroll: true,
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <AdminLayout>
            <Head title={`${message.subject} — Messages`} />
            <PageHeader
                title={message.subject}
                description={`Reçu le ${formatDate(message.created_at)}`}
                action={
                    <Link
                        href="/admin/messages"
                        className="glass inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-zinc-300 transition-colors hover:text-emerald-300"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Retour
                    </Link>
                }
            />

            <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
                <section className="glass glow-card rounded-2xl p-5 sm:p-6">
                    <div className="mb-4 flex items-center gap-2">
                        <StatusBadge
                            active={!message.read}
                            activeLabel="Non lu"
                            inactiveLabel="Lu"
                        />
                    </div>
                    <p className="text-[15px] leading-relaxed whitespace-pre-line text-zinc-300">
                        {message.message}
                    </p>
                </section>

                <aside className="space-y-4">
                    <section className="glass rounded-2xl p-5">
                        <h2 className="mb-3 text-sm font-semibold text-zinc-100">
                            Expéditeur
                        </h2>
                        <p className="text-sm font-medium text-zinc-200">
                            {message.name}
                        </p>
                        <a
                            href={`mailto:${message.email}`}
                            className="mt-1 inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-emerald-200"
                        >
                            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                            {message.email}
                        </a>
                    </section>

                    <section className="glass rounded-2xl p-5">
                        <h2 className="mb-3 text-sm font-semibold text-zinc-100">
                            Actions
                        </h2>
                        <div className="space-y-2">
                            <a
                                href={`mailto:${message.email}?subject=${encodeURIComponent(
                                    `Re : ${message.subject}`,
                                )}`}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-4 py-2.5 text-sm font-medium text-zinc-950 transition-opacity hover:opacity-90"
                            >
                                <Reply className="h-4 w-4" aria-hidden="true" />
                                Répondre par e-mail
                            </a>
                            <button
                                type="button"
                                onClick={toggleRead}
                                disabled={processing}
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:border-emerald-400/30 hover:text-emerald-300 disabled:opacity-60"
                            >
                                {message.read ? (
                                    <>
                                        <Mail
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                        Marquer comme non lu
                                    </>
                                ) : (
                                    <>
                                        <MailOpen
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                        Marquer comme lu
                                    </>
                                )}
                            </button>
                            <DeleteButton
                                url={`/admin/messages/${message.id}`}
                                message="Supprimer définitivement ce message ?"
                                label="Supprimer le message"
                            />
                        </div>
                    </section>

                    <section className="glass rounded-2xl p-5">
                        <h2 className="mb-3 text-sm font-semibold text-zinc-100">
                            Sujet
                        </h2>
                        <p className="text-sm leading-relaxed text-zinc-400">
                            {message.subject}
                        </p>
                    </section>
                </aside>
            </div>
        </AdminLayout>
    );
}
