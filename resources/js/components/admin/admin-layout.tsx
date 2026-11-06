import { Link, usePage } from '@inertiajs/react';
import {
    Briefcase,
    ExternalLink,
    FolderKanban,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    Mail,
    Menu,
    Settings,
    Sparkles,
    UserRound,
    Wrench,
    X,
    type LucideIcon,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import type { SharedData } from '@/types/admin';

const navItems: { href: string; label: string; icon: LucideIcon }[] = [
    { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/admin/messages', label: 'Messages', icon: Mail },
    { href: '/admin/profil', label: 'Profil & CV', icon: UserRound },
    { href: '/admin/projects', label: 'Projets', icon: FolderKanban },
    { href: '/admin/skills', label: 'Compétences', icon: Wrench },
    { href: '/admin/timeline', label: 'Parcours', icon: GraduationCap },
    { href: '/admin/services', label: 'Services', icon: Briefcase },
];

function initials(name: string): string {
    const parts = name.split(' ').filter(Boolean);

    if (parts.length === 0) {
        return 'AD';
    }

    const first = parts[0][0] ?? '';
    const last = parts.length > 1 ? (parts[parts.length - 1][0] ?? '') : '';

    return `${first}${last}`.toUpperCase();
}

export function AdminLayout({ children }: { children: ReactNode }) {
    const page = usePage<SharedData>();
    const { auth, flash, unreadMessages } = page.props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) =>
        href === '/admin' ? page.url === '/admin' : page.url.startsWith(href);

    const sidebar = (
        <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-between border-b border-white/5 px-5">
                <Link
                    href="/admin"
                    className="font-mono text-lg font-bold tracking-tight"
                    onClick={() => setMobileOpen(false)}
                >
                    <span className="neon-text">
                        &lt;{initials(auth.user?.name ?? 'Admin')} /&gt;
                    </span>
                    <span className="ml-2 align-middle font-sans text-xs font-medium text-zinc-500">
                        admin
                    </span>
                </Link>
                <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 lg:hidden"
                    aria-label="Fermer le menu"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                                active
                                    ? 'bg-emerald-400/10 text-emerald-300'
                                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
                            }`}
                        >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                            <span className="flex-1">{item.label}</span>
                            {item.href === '/admin/messages' &&
                                unreadMessages > 0 && (
                                    <span className="rounded-full bg-emerald-400 px-1.5 py-0.5 text-[10px] font-bold text-zinc-950">
                                        {unreadMessages}
                                    </span>
                                )}
                        </Link>
                    );
                })}
            </nav>

            <div className="space-y-2 border-t border-white/5 p-3">
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100"
                >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Voir le site
                </a>
                <Link
                    href="/admin/profil"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-100"
                >
                    <Settings className="h-4 w-4" aria-hidden="true" />
                    Paramètres
                </Link>
                <div className="glass mt-2 rounded-xl p-3">
                    <p className="truncate text-sm font-medium text-zinc-200">
                        {auth.user?.name}
                    </p>
                    <p className="truncate text-xs text-zinc-500">
                        {auth.user?.email}
                    </p>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-300"
                    >
                        <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                        Déconnexion
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen">
            <aside className="glass-strong fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/5 lg:block">
                {sidebar}
            </aside>

            {mobileOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                        onClick={() => setMobileOpen(false)}
                        aria-hidden="true"
                    />
                    <aside className="glass-strong fixed inset-y-0 left-0 z-50 w-72 border-r border-white/5 lg:hidden">
                        {sidebar}
                    </aside>
                </>
            )}

            <div className="lg:pl-64">
                <header className="glass-strong sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/5 px-4 lg:hidden">
                    <Link
                        href="/admin"
                        className="font-mono text-lg font-bold tracking-tight"
                    >
                        <span className="neon-text">
                            &lt;{initials(auth.user?.name ?? 'Admin')} /&gt;
                        </span>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="rounded-lg p-2 text-zinc-300 hover:bg-white/5"
                        aria-label="Ouvrir le menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </header>

                <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                            <Sparkles
                                className="mt-0.5 h-4 w-4 shrink-0"
                                aria-hidden="true"
                            />
                            {flash.success}
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
