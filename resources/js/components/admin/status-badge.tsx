import type { ReactNode } from 'react';

export function StatusBadge({
    active,
    activeLabel,
    inactiveLabel,
}: {
    active: boolean;
    activeLabel: string;
    inactiveLabel: string;
}) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                active
                    ? 'bg-emerald-400/10 text-emerald-300'
                    : 'bg-white/5 text-zinc-500'
            }`}
        >
            <span
                className={`h-1.5 w-1.5 rounded-full ${
                    active ? 'bg-emerald-400' : 'bg-zinc-600'
                }`}
            />
            {active ? activeLabel : inactiveLabel}
        </span>
    );
}

export function EmptyState({
    title,
    description,
    action,
}: {
    title: string;
    description: string;
    action?: ReactNode;
}) {
    return (
        <div className="glass rounded-2xl p-10 text-center">
            <h3 className="mb-2 text-base font-semibold text-zinc-200">
                {title}
            </h3>
            <p className="mx-auto mb-5 max-w-md text-sm leading-relaxed text-zinc-500">
                {description}
            </p>
            {action}
        </div>
    );
}
