import { Head, Link, router } from '@inertiajs/react';
import { Inbox, Search } from 'lucide-react';
import { useState } from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { DeleteButton } from '@/components/admin/delete-button';
import { PageHeader } from '@/components/admin/page-header';
import { Pagination } from '@/components/admin/pagination';
import { EmptyState, StatusBadge } from '@/components/admin/status-badge';
import type { ContactMessage, Paginated } from '@/types/admin';

function formatDate(value: string): string {
    return new Date(value).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}

export default function MessagesIndex({
    messages,
    filters,
}: {
    messages: Paginated<ContactMessage>;
    filters: { search: string; filter: string };
}) {
    const [search, setSearch] = useState(filters.search);

    const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.get(
            '/admin/messages',
            { search, filter: filters.filter },
            { preserveState: true, preserveScroll: true },
        );
    };

    return (
        <AdminLayout>
            <Head title="Messages — Administration" />
            <PageHeader
                title="Messages"
                description="Les demandes reçues via le formulaire de contact du site."
            />

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <form
                    onSubmit={submitSearch}
                    className="relative w-full sm:max-w-xs"
                >
                    <Search
                        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500"
                        aria-hidden="true"
                    />
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Rechercher un nom, e-mail, sujet…"
                        className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pr-3 pl-10 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none"
                    />
                </form>

                <div className="flex items-center gap-2">
                    <Link
                        href="/admin/messages"
                        className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                            filters.filter !== 'unread'
                                ? 'bg-emerald-400/10 text-emerald-300'
                                : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                        }`}
                    >
                        Tous
                    </Link>
                    <Link
                        href="/admin/messages?filter=unread"
                        className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                            filters.filter === 'unread'
                                ? 'bg-emerald-400/10 text-emerald-300'
                                : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                        }`}
                    >
                        Non lus
                    </Link>
                </div>
            </div>

            {messages.data.length === 0 ? (
                <EmptyState
                    title="Aucun message"
                    description={
                        filters.search || filters.filter === 'unread'
                            ? 'Aucun message ne correspond à ces filtres.'
                            : 'Les messages envoyés depuis le formulaire de contact apparaîtront ici.'
                    }
                />
            ) : (
                <div className="space-y-3">
                    {messages.data.map((message) => (
                        <article
                            key={message.id}
                            className="glass glow-card rounded-2xl p-4 transition-colors hover:border-emerald-400/20 sm:p-5"
                        >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <Link
                                    href={`/admin/messages/${message.id}`}
                                    className="min-w-0 flex-1"
                                >
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="text-sm font-semibold text-zinc-100 transition-colors hover:text-emerald-300">
                                            {message.subject}
                                        </h2>
                                        <StatusBadge
                                            active={!message.read}
                                            activeLabel="Non lu"
                                            inactiveLabel="Lu"
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-zinc-500">
                                        {message.name} · {message.email}
                                    </p>
                                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
                                        {message.message}
                                    </p>
                                </Link>

                                <div className="flex shrink-0 items-center justify-between gap-3 sm:flex-col sm:items-end">
                                    <span className="text-xs text-zinc-500">
                                        {formatDate(message.created_at)}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/messages/${message.id}`}
                                            className="glass rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:text-emerald-300"
                                        >
                                            Lire
                                        </Link>
                                        <DeleteButton
                                            url={`/admin/messages/${message.id}`}
                                            message="Supprimer définitivement ce message ?"
                                            label="Supprimer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            <Pagination page={messages} />

            {messages.data.length > 0 && (
                <p className="mt-4 flex items-center gap-1.5 text-xs text-zinc-600">
                    <Inbox className="h-3.5 w-3.5" aria-hidden="true" />
                    {messages.total} message{messages.total > 1 ? 's' : ''} au
                    total
                </p>
            )}
        </AdminLayout>
    );
}
