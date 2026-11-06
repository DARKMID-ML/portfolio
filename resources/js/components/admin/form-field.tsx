import type { ReactNode } from 'react';

export function FormField({
    label,
    htmlFor,
    error,
    hint,
    children,
}: {
    label: string;
    htmlFor?: string;
    error?: string;
    hint?: string;
    children: ReactNode;
}) {
    return (
        <div className="space-y-2">
            <label
                htmlFor={htmlFor}
                className="block text-sm font-medium text-zinc-200"
            >
                {label}
            </label>
            {children}
            {hint && !error && (
                <p className="text-xs leading-relaxed text-zinc-500">{hint}</p>
            )}
            {error && (
                <p className="text-xs font-medium text-rose-400">{error}</p>
            )}
        </div>
    );
}
