import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Paginated } from '@/types/admin';

export function Pagination<T>({ page }: { page: Paginated<T> }) {
    if (page.last_page <= 1) {
        return null;
    }

    return (
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-zinc-500">
                {page.from ?? 0}–{page.to ?? 0} sur {page.total} résultat
                {page.total > 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-2">
                {page.prev_page_url ? (
                    <Link
                        href={page.prev_page_url}
                        preserveScroll
                        className="glass inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs text-zinc-300 transition-colors hover:text-emerald-300"
                    >
                        <ChevronLeft
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                        />
                        Précédent
                    </Link>
                ) : (
                    <span className="inline-flex items-center gap-1 rounded-lg border border-white/5 px-3 py-2 text-xs text-zinc-600">
                        <ChevronLeft
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                        />
                        Précédent
                    </span>
                )}
                <span className="text-xs text-zinc-500">
                    Page {page.current_page} / {page.last_page}
                </span>
                {page.next_page_url ? (
                    <Link
                        href={page.next_page_url}
                        preserveScroll
                        className="glass inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs text-zinc-300 transition-colors hover:text-emerald-300"
                    >
                        Suivant
                        <ChevronRight
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                        />
                    </Link>
                ) : (
                    <span className="inline-flex items-center gap-1 rounded-lg border border-white/5 px-3 py-2 text-xs text-zinc-600">
                        Suivant
                        <ChevronRight
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                        />
                    </span>
                )}
            </div>
        </div>
    );
}
