import {
    ArrowUp,
    Download,
    Github,
    Linkedin,
    Mail,
    MessageCircle,
} from 'lucide-react';
import { MidMark } from '@/components/portfolio/mid-mark';
import { Marquee } from '@/components/portfolio/motion/marquee';
import { navLinks } from '@/config/site';
import { useLocalTime } from '@/hooks/use-local-time';
import type { Profile } from '@/types/portfolio';

export function Footer({ profile }: { profile: Profile }) {
    const year = new Date().getFullYear();
    const localTime = useLocalTime();

    const socials = [
        profile.contact.github
            ? {
                  href: profile.contact.github,
                  icon: Github,
                  label: 'Profil GitHub',
              }
            : null,
        profile.contact.linkedin
            ? {
                  href: profile.contact.linkedin,
                  icon: Linkedin,
                  label: 'Profil LinkedIn',
              }
            : null,
        profile.contact.whatsapp
            ? {
                  href: profile.contact.whatsapp,
                  icon: MessageCircle,
                  label: 'Contact WhatsApp',
              }
            : null,
    ].filter((social) => social !== null);

    const ticker = [
        'OUVERT AUX STAGES',
        'PREMIÈRES OPPORTUNITÉS',
        'BAMAKO / MALI',
        'MID / 223',
        'HTML / CSS / PYTHON',
        'PORTFOLIO 2026',
    ];

    return (
        <footer
            className="relative mt-auto overflow-hidden bg-ink text-bone"
            role="contentinfo"
        >
            <div className="border-b border-ink/20 bg-bone py-2 text-ink">
                <Marquee speed={42}>
                    {ticker.map((item) => (
                        <span
                            key={item}
                            className="flex items-center gap-5 px-5 font-code text-[9px] tracking-[0.08em] whitespace-nowrap"
                        >
                            {item}
                            <span className="h-1.5 w-1.5 bg-ink" />
                        </span>
                    ))}
                </Marquee>
            </div>

            <div className="relative mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-14">
                <span
                    className="pointer-events-none absolute top-0 right-0 font-display text-[14rem] leading-none font-extrabold text-bone/[0.035] select-none"
                    aria-hidden="true"
                >
                    223
                </span>

                <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.9fr]">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center bg-lime text-ink">
                                <MidMark className="h-4 w-auto" />
                            </span>
                            <span className="font-code text-[9px] tracking-[0.1em] text-bone/65">
                                MID / 223 · BAMAKO
                            </span>
                        </div>
                        <p className="mt-4 max-w-md font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[0.92] font-extrabold tracking-[-0.04em] uppercase">
                            {profile.name}
                        </p>
                        <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-bone/70">
                            {profile.tagline}
                        </p>
                        <p className="mt-5 flex items-center gap-2 font-code text-[8px] tracking-[0.08em] text-bone/55">
                            <span className="h-1.5 w-1.5 bg-lime" />
                            HEURE LOCALE · {localTime} GMT
                        </p>
                    </div>

                    <nav aria-label="Navigation de pied de page">
                        <p className="font-code text-[9px] tracking-[0.08em] text-bone/55">
                            INDEX
                        </p>
                        <ul className="mt-4 space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="group inline-flex items-center gap-3 font-code text-[10px] text-bone/70 transition-colors hover:text-lime"
                                    >
                                        <span className="h-px w-3 bg-bone/25 transition-all group-hover:w-5 group-hover:bg-lime" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <p className="font-code text-[9px] tracking-[0.08em] text-bone/55">
                            CANAL DIRECT
                        </p>
                        <a
                            href={`mailto:${profile.contact.email}`}
                            className="mt-4 block text-[13px] break-all text-bone/75 transition-colors hover:text-lime"
                        >
                            {profile.contact.email}
                        </a>
                        <a
                            href={`tel:${profile.contact.phone.replace(/\s/g, '')}`}
                            className="mt-1 block text-[13px] text-bone/65 transition-colors hover:text-lime"
                        >
                            {profile.contact.phone}
                        </a>

                        <div className="mt-5 flex items-center gap-2">
                            {socials.map(({ href, icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="inline-flex h-9 w-9 items-center justify-center border border-bone/20 text-bone/65 transition-colors hover:border-lime hover:bg-lime hover:text-ink"
                                >
                                    <Icon
                                        className="h-3.5 w-3.5"
                                        aria-hidden="true"
                                    />
                                </a>
                            ))}
                            <a
                                href={`mailto:${profile.contact.email}`}
                                aria-label="Envoyer un e-mail"
                                className="inline-flex h-9 w-9 items-center justify-center border border-bone/20 text-bone/65 transition-colors hover:border-lime hover:bg-lime hover:text-ink"
                            >
                                <Mail
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                />
                            </a>
                        </div>

                        {profile.cvUrl ? (
                            <a
                                href={profile.cvUrl}
                                className="mt-5 inline-flex items-center gap-2 border border-bone/25 px-3 py-2 font-code text-[8px] tracking-[0.06em] text-bone/70 transition-colors hover:border-lime hover:text-lime"
                            >
                                <Download
                                    className="h-3 w-3"
                                    aria-hidden="true"
                                />
                                TÉLÉCHARGER LE CV
                            </a>
                        ) : null}
                    </div>
                </div>

                <div className="relative mt-12 flex flex-col gap-5 border-t border-bone/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <span className="barcode block h-7 w-28 text-bone/55" />
                        <p className="font-code text-[8px] leading-relaxed tracking-[0.06em] text-bone/55">
                            © {year} {profile.name}
                            <br />
                            BAMAKO, MALI / EXPÉDITION 223
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 font-code text-[8px] tracking-[0.06em] text-bone/55">
                        <span>LARAVEL · INERTIA · REACT</span>
                        <a
                            href="/login"
                            className="transition-colors hover:text-bone/85"
                        >
                            ADMIN
                        </a>
                    </div>

                    <a
                        href="#accueil"
                        aria-label="Retour en haut de page"
                        className="group inline-flex h-10 w-10 items-center justify-center bg-lime text-ink transition-colors hover:bg-bone"
                    >
                        <ArrowUp
                            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1"
                            aria-hidden="true"
                        />
                    </a>
                </div>
            </div>

            <div className="relative overflow-hidden border-t border-bone/15">
                <p className="px-5 font-display text-[clamp(3.2rem,16vw,13rem)] leading-none font-extrabold tracking-[-0.06em] whitespace-nowrap text-bone/[0.09] select-none sm:px-8">
                    MID / 223
                </p>
            </div>
        </footer>
    );
}
