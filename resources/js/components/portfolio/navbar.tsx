import { AnimatePresence } from 'framer-motion';
import { m } from 'framer-motion';
import { ArrowUpRight, Download, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MidMark } from '@/components/portfolio/mid-mark';
import { navLinks } from '@/config/site';
import { cn } from '@/lib/utils';
import type { Profile } from '@/types/portfolio';

export function Navbar({ profile }: { profile: Profile }) {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('#accueil');
    const lastScrollY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            const currentY = window.scrollY;

            setScrolled(currentY > 40);
            setHidden(
                currentY > lastScrollY.current && currentY > 520 && !open,
            );
            lastScrollY.current = currentY;

            let current = '#accueil';

            for (const link of navLinks) {
                const element = document.getElementById(link.href.slice(1));

                if (element && element.getBoundingClientRect().top <= 160) {
                    current = link.href;
                }
            }

            setActive(current);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, [open]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <>
            <m.header
                className={cn(
                    'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500',
                    scrolled || open
                        ? 'border-ink/15 bg-bone/95 text-ink backdrop-blur-xl'
                        : 'border-bone/20 bg-violet/60 text-bone backdrop-blur-sm',
                )}
                animate={{ y: hidden ? '-110%' : '0%' }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
                <nav
                    className="mx-auto flex h-[4.5rem] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8"
                    aria-label="Navigation principale"
                >
                    <a
                        href="#accueil"
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-3"
                        aria-label={`Revenir à l'accueil — ${profile.name}`}
                    >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-lime text-ink transition-transform duration-300 group-hover:-rotate-6">
                            <MidMark className="h-4 w-auto" />
                        </span>
                        <span className="leading-none">
                            <span className="block font-display text-[15px] font-extrabold tracking-[-0.035em]">
                                Mohamed I. Diallo
                            </span>
                            <span className="mt-1 block font-code text-[9px] tracking-[0.12em] opacity-70">
                                Développeur web · Bamako 223
                            </span>
                        </span>
                    </a>

                    <ul className="hidden items-center gap-5 lg:flex">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    aria-current={
                                        active === link.href
                                            ? 'location'
                                            : undefined
                                    }
                                    className="group relative inline-flex flex-col py-2 font-code text-[10px] tracking-[0.06em] transition-opacity hover:opacity-100"
                                >
                                    <span
                                        className={cn(
                                            'transition-opacity',
                                            active === link.href
                                                ? 'opacity-100'
                                                : 'opacity-70 group-hover:opacity-100',
                                        )}
                                    >
                                        {link.label}
                                    </span>
                                    <span
                                        className={cn(
                                            'absolute right-0 bottom-0 left-0 h-[2px] origin-left bg-lime transition-transform duration-300',
                                            active === link.href
                                                ? 'scale-x-100'
                                                : 'scale-x-0 group-hover:scale-x-100',
                                        )}
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden items-center gap-2.5 lg:flex">
                        {profile.cvUrl ? (
                            <a
                                href={profile.cvUrl}
                                aria-label="Télécharger mon CV"
                                className={cn(
                                    'inline-flex h-10 w-10 items-center justify-center border transition-colors duration-300',
                                    scrolled
                                        ? 'border-ink/20 hover:border-ink hover:bg-ink hover:text-bone'
                                        : 'border-bone/30 hover:border-bone hover:bg-bone hover:text-ink',
                                )}
                            >
                                <Download
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                />
                            </a>
                        ) : null}
                        <a
                            href="#contact"
                            className="group inline-flex h-10 items-center gap-3 bg-ink px-4 font-code text-[10px] tracking-[0.04em] text-lime transition-colors hover:bg-lime hover:text-ink"
                        >
                            Écrire
                            <ArrowUpRight
                                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                            />
                        </a>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        aria-label="Ouvrir le menu"
                        aria-expanded={open}
                        className={cn(
                            'inline-flex h-10 w-10 items-center justify-center border transition-colors lg:hidden',
                            scrolled || open
                                ? 'border-ink/25 text-ink'
                                : 'border-bone/35 text-bone',
                        )}
                    >
                        <Menu className="h-5 w-5" aria-hidden="true" />
                    </button>
                </nav>
            </m.header>

            <AnimatePresence>
                {open && (
                    <m.div
                        className="fixed inset-0 z-[120] flex flex-col bg-ink text-bone"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{
                            duration: 0.55,
                            ease: [0.76, 0, 0.24, 1],
                        }}
                    >
                        <div
                            className="weave-grid absolute inset-0 opacity-50"
                            aria-hidden="true"
                        />
                        <div className="relative flex h-[4.5rem] items-center justify-between px-5 sm:px-8">
                            <span className="flex items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center bg-lime text-ink">
                                    <MidMark className="h-3.5 w-auto" />
                                </span>
                                <span className="font-code text-[10px] tracking-[0.12em] text-bone/70">
                                    MID / 223
                                </span>
                            </span>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Fermer le menu"
                                className="inline-flex h-10 w-10 items-center justify-center border border-bone/35 text-bone"
                            >
                                <X className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>

                        <nav
                            className="relative flex flex-1 flex-col justify-center px-5 sm:px-8"
                            aria-label="Navigation mobile"
                        >
                            <ul>
                                {navLinks.map((link, index) => (
                                    <m.li
                                        key={link.href}
                                        initial={{ opacity: 0, x: 24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.45,
                                            delay: 0.08 + index * 0.045,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="border-b border-bone/20"
                                    >
                                        <a
                                            href={link.href}
                                            onClick={() => setOpen(false)}
                                            aria-current={
                                                active === link.href
                                                    ? 'location'
                                                    : undefined
                                            }
                                            className="flex items-baseline justify-between gap-4 py-2.5 font-display text-[clamp(2.2rem,10vw,4.4rem)] leading-[0.95] font-extrabold tracking-[-0.05em] text-bone transition-colors hover:text-lime"
                                        >
                                            {link.label}
                                            <span className="font-code text-[10px] font-normal tracking-[0.1em] text-bone/65">
                                                {String(index + 1).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </span>
                                        </a>
                                    </m.li>
                                ))}
                            </ul>
                        </nav>

                        <m.div
                            className="relative border-t border-bone/20 bg-lime px-5 py-6 text-ink sm:px-8"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="font-code text-[9px] tracking-[0.12em] opacity-70">
                                        Écrire directement
                                    </p>
                                    <a
                                        href={`mailto:${profile.contact.email}`}
                                        className="mt-1 block font-display text-[clamp(1.3rem,4.5vw,2rem)] font-extrabold tracking-[-0.04em] break-all"
                                    >
                                        {profile.contact.email}
                                    </a>
                                </div>
                                {profile.cvUrl ? (
                                    <a
                                        href={profile.cvUrl}
                                        className="inline-flex items-center gap-2 border border-ink/30 px-3 py-2 font-code text-[10px]"
                                    >
                                        <Download
                                            className="h-3.5 w-3.5"
                                            aria-hidden="true"
                                        />
                                        CV
                                    </a>
                                ) : null}
                            </div>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
}
