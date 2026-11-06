import { Link, usePage } from '@inertiajs/react';
import {
    Briefcase,
    CircleCheck,
    ExternalLink,
    FolderKanban,
    GraduationCap,
    LayoutDashboard,
    LogOut,
    Mail,
    Menu,
    Settings,
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
        <div className="flex h-full flex-col bg-[#17112d] text-[#f4f0e6]">
            <div className="flex min-h-20 items-center justify-between border-b border-white/10 px-5">
                <Link
                    href="/admin"
                    className="flex items-center gap-3"
                    onClick={() => setMobileOpen(false)}
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d6ff3f] font-display text-sm font-extrabold text-[#17112d]">
                        MD
                    </span>
                    <span className="min-w-0">
                        <span className="block font-display text-base font-bold tracking-tight">
                            MID / 223
                        </span>
                        <span className="mt-0.5 block text-xs text-[#b8b0d1]">
                            Administration
                        </span>
                    </span>
                </Link>
                <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg p-2 text-[#c8c0df] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ff3f] lg:hidden"
                    aria-label="Fermer le menu"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <nav
                aria-label="Navigation d’administration"
                className="flex-1 space-y-1 overflow-y-auto px-3 py-6"
            >
                <p className="mb-3 px-3 text-xs font-semibold text-[#9d93ba]">
                    Gestion du site
                </p>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            aria-current={active ? 'page' : undefined}
                            className={`group flex min-h-11 items-center gap-3 rounded-lg border-l-2 px-3 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ff3f] ${
                                active
                                    ? 'border-[#d6ff3f] bg-white/10 text-[#f4f0e6]'
                                    : 'border-transparent text-[#c8c0df] hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <Icon
                                className={`h-4 w-4 ${active ? 'text-[#d6ff3f]' : 'text-[#9d93ba] group-hover:text-[#d6ff3f]'}`}
                                aria-hidden="true"
                            />
                            <span className="flex-1">{item.label}</span>
                            {item.href === '/admin/messages' &&
                                unreadMessages > 0 && (
                                    <span className="min-w-5 rounded-full bg-[#d6ff3f] px-1.5 py-0.5 text-center text-[10px] font-bold text-[#17112d]">
                                        {unreadMessages}
                                    </span>
                                )}
                        </Link>
                    );
                })}
            </nav>

            <div className="space-y-1 border-t border-white/10 p-3">
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#c8c0df] transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ff3f]"
                >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Voir le site
                </a>
                <Link
                    href="/admin/profil"
                    className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#c8c0df] transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ff3f]"
                >
                    <Settings className="h-4 w-4" aria-hidden="true" />
                    Paramètres
                </Link>
                <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d6ff3f]/30 bg-[#d6ff3f]/10 text-xs font-bold text-[#d6ff3f]">
                            {initials(auth.user?.name ?? 'Admin')}
                        </span>
                        <span className="min-w-0">
                            <span className="block truncate text-sm font-medium text-white">
                                {auth.user?.name}
                            </span>
                            <span className="block truncate text-xs text-[#b8b0d1]">
                                {auth.user?.email}
                            </span>
                        </span>
                    </div>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="mt-3 flex min-h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-[#c8c0df] transition-colors hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ff3f]"
                    >
                        <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                        Déconnexion
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#100d19] text-[#f4f0e6]">
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/10 shadow-[12px_0_40px_rgba(0,0,0,0.18)] lg:block">
                {sidebar}
            </aside>

            {mobileOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
                        onClick={() => setMobileOpen(false)}
                        aria-hidden="true"
                    />
                    <aside className="fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 shadow-2xl lg:hidden">
                        {sidebar}
                    </aside>
                </>
            )}

            <div className="lg:pl-64">
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-white/10 bg-[#100d19]/95 px-4 backdrop-blur lg:hidden">
                    <Link
                        href="/admin"
                        className="flex items-center gap-2 font-display text-base font-bold tracking-tight"
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d6ff3f] text-xs font-extrabold text-[#17112d]">
                            MD
                        </span>
                        MID / 223
                    </Link>
                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="rounded-lg p-2 text-[#c8c0df] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d6ff3f]"
                        aria-label="Ouvrir le menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </header>

                <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-10 lg:py-10">
                    {flash.success && (
                        <div className="mb-6 flex items-start gap-3 rounded-xl border border-[#d6ff3f]/20 bg-[#d6ff3f]/[0.07] px-4 py-3 text-sm text-[#e9f7bd]">
                            <CircleCheck
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
