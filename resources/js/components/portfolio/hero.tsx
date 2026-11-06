import { useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { m } from 'framer-motion';
import {
    ArrowDown,
    ArrowUpRight,
    Download,
    Github,
    Linkedin,
    Mail,
    MapPin,
    MessageCircle,
} from 'lucide-react';
import { useRef } from 'react';
import { MidMark } from '@/components/portfolio/mid-mark';
import { SplitWords } from '@/components/portfolio/motion/split-words';
import { EASE_OUT } from '@/components/portfolio/motion/reveal';
import { useLocalTime } from '@/hooks/use-local-time';
import type { Profile } from '@/types/portfolio';

export function Hero({
    profile,
    introReady,
}: {
    profile: Profile;
    introReady: boolean;
}) {
    const sectionRef = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion();
    const localTime = useLocalTime();
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    const cardY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const markY = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

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
        {
            href: `mailto:${profile.contact.email}`,
            icon: Mail,
            label: 'Envoyer un e-mail',
        },
    ].filter((social) => social !== null);

    const reveal = (delay: number) => ({
        initial: false as const,
        animate: {
            opacity: introReady ? 1 : 0,
            y: introReady ? 0 : 14,
        },
        transition: { duration: 0.65, delay, ease: EASE_OUT },
    });

    return (
        <section
            ref={sectionRef}
            id="accueil"
            className="relative flex min-h-[100svh] flex-col overflow-hidden bg-violet text-bone"
            aria-label="Introduction"
        >
            <div
                className="weave-grid absolute inset-0 opacity-45"
                aria-hidden="true"
            />
            <div
                className="halftone-light absolute inset-0 opacity-[0.13]"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute top-[14%] right-[-12%] h-[34rem] w-[34rem] rounded-full border border-bone/15 sm:h-[44rem] sm:w-[44rem]"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute top-[20%] right-[-8%] h-[26rem] w-[26rem] rounded-full border border-dashed border-bone/15 sm:h-[34rem] sm:w-[34rem]"
                aria-hidden="true"
            />
            <m.span
                className="text-outline-bone pointer-events-none absolute right-[-1rem] bottom-[9%] font-display text-[27vw] leading-none font-extrabold select-none lg:right-[-2rem]"
                style={reduceMotion ? undefined : { y: markY }}
                aria-hidden="true"
            >
                223
            </m.span>

            <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 pt-24 pb-6 sm:px-8 sm:pt-28">
                <m.div
                    className="flex flex-wrap items-center justify-between gap-3 border-b border-bone/25 pb-3 font-code text-[9px] tracking-[0.1em] text-bone/65"
                    initial={false}
                    animate={{ opacity: introReady ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span>PORTFOLIO / 2026</span>
                    <span className="flex items-center gap-2">
                        <MapPin
                            className="h-3 w-3 text-lime"
                            aria-hidden="true"
                        />
                        {profile.location} · 12.6392°N 8.0029°W · {localTime}{' '}
                        GMT
                    </span>
                </m.div>

                <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10 lg:py-12">
                    <m.div
                        style={
                            reduceMotion
                                ? undefined
                                : { opacity: contentOpacity }
                        }
                        className="relative"
                    >
                        <m.div
                            className="mb-6 inline-flex items-center gap-2.5 bg-ink px-3 py-2 font-code text-[9px] tracking-[0.08em] text-bone"
                            {...reveal(0.08)}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-lime" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                            </span>
                            {profile.availabilityText}
                        </m.div>

                        <h1 className="font-display text-[clamp(3.35rem,10.9vw,9.5rem)] leading-[0.77] font-extrabold tracking-[-0.07em]">
                            <span className="block">
                                <SplitWords
                                    text="Mohamed"
                                    active={introReady}
                                    delay={0.12}
                                    stagger={0.03}
                                    wordClassName="uppercase"
                                />
                            </span>
                            <span className="text-outline-bone block pl-[5vw] sm:pl-[7vw]">
                                <SplitWords
                                    text="Idrissa"
                                    active={introReady}
                                    delay={0.22}
                                    stagger={0.03}
                                    wordClassName="uppercase"
                                />
                            </span>
                            <m.span
                                className="relative mt-1 inline-block max-w-full overflow-hidden bg-lime"
                                initial={false}
                                animate={{
                                    scaleX: introReady ? 1 : 0.2,
                                    opacity: introReady ? 1 : 0,
                                }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.32,
                                    ease: EASE_OUT,
                                }}
                                style={{ transformOrigin: 'left center' }}
                            >
                                <span className="relative block px-[0.12em] pb-[0.03em] text-ink">
                                    <SplitWords
                                        text="Diallo"
                                        active={introReady}
                                        delay={0.38}
                                        stagger={0.03}
                                        wordClassName="uppercase"
                                    />
                                </span>
                            </m.span>
                        </h1>

                        <m.div
                            className="mt-7 max-w-[38rem] border-l-2 border-lime pl-4"
                            {...reveal(0.58)}
                        >
                            <p className="text-[15px] leading-[1.65] text-bone/80 sm:text-[17px]">
                                {profile.tagline}
                            </p>
                            <p className="mt-3 font-code text-[9px] leading-relaxed tracking-[0.08em] text-lime">
                                {profile.role} · {profile.education}
                            </p>
                        </m.div>

                        <m.div
                            className="mt-7 flex flex-wrap items-center gap-2.5"
                            {...reveal(0.7)}
                        >
                            <a
                                href="#projets"
                                className="group inline-flex h-11 items-center gap-4 bg-ink px-4 font-code text-[10px] tracking-[0.04em] text-lime transition-transform hover:-translate-y-0.5"
                            >
                                Voir les projets
                                <ArrowUpRight
                                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    aria-hidden="true"
                                />
                            </a>
                            {profile.cvUrl ? (
                                <a
                                    href={profile.cvUrl}
                                    className="group inline-flex h-11 items-center gap-3 border border-bone/40 px-4 font-code text-[10px] tracking-[0.04em] text-bone/85 transition-colors hover:bg-bone hover:text-ink"
                                >
                                    <Download
                                        className="h-3.5 w-3.5"
                                        aria-hidden="true"
                                    />
                                    Télécharger le CV
                                </a>
                            ) : null}
                            <a
                                href="#contact"
                                className="group inline-flex h-11 items-center gap-2 px-2 font-code text-[10px] tracking-[0.04em] text-bone/70 transition-colors hover:text-lime"
                            >
                                Me contacter
                                <ArrowUpRight
                                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    aria-hidden="true"
                                />
                            </a>
                        </m.div>

                        <m.div
                            className="mt-7 flex items-center gap-2"
                            {...reveal(0.82)}
                        >
                            {socials.map(({ href, icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={
                                        href.startsWith('http')
                                            ? '_blank'
                                            : undefined
                                    }
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="inline-flex h-9 w-9 items-center justify-center border border-bone/35 text-bone/75 transition-colors hover:border-lime hover:bg-lime hover:text-ink"
                                >
                                    <Icon
                                        className="h-3.5 w-3.5"
                                        aria-hidden="true"
                                    />
                                </a>
                            ))}
                        </m.div>
                    </m.div>

                    <m.div
                        className="relative mx-auto w-full max-w-[390px] lg:mr-0"
                        style={reduceMotion ? undefined : { y: cardY }}
                    >
                        <m.div
                            initial={false}
                            animate={{
                                opacity: introReady ? 1 : 0,
                                y: introReady ? 0 : 30,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.52,
                                ease: EASE_OUT,
                            }}
                        >
                            <div
                                className="absolute -inset-2 translate-x-3 translate-y-3 bg-lime"
                                aria-hidden="true"
                            />
                            <div className="relative -rotate-[1.5deg] border-2 border-ink bg-bone text-ink shadow-[8px_8px_0_0_var(--color-ink)]">
                                <div className="flex items-center justify-between gap-3 bg-ink px-4 py-2.5 font-code text-[8px] tracking-[0.12em] text-bone">
                                    <span>MID-223 / FICHE TERRAIN</span>
                                    <span className="flex items-center gap-1.5 text-lime">
                                        <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                                        DISPONIBLE
                                    </span>
                                </div>

                                <div className="halftone relative border-b-2 border-ink px-4 py-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="font-code text-[8px] tracking-[0.12em] text-ink/65">
                                                BAMAKO / MALI
                                            </p>
                                            <p className="mt-1 font-display text-[clamp(2rem,4.8vw,2.85rem)] leading-[0.85] font-extrabold tracking-[-0.05em] uppercase">
                                                Mohamed
                                                <br />
                                                Idrissa
                                                <br />
                                                Diallo
                                            </p>
                                        </div>
                                        <img
                                            src="/avatar.svg"
                                            alt={`Portrait de ${profile.name}`}
                                            className="h-24 w-16 shrink-0 border-2 border-ink bg-white object-contain"
                                            loading="eager"
                                            decoding="async"
                                        />
                                    </div>

                                    <div className="mt-4 flex items-center gap-3">
                                        <span className="barcode block h-8 w-24 text-ink" />
                                        <span className="font-code text-[8px] leading-relaxed tracking-[0.08em] text-ink/65">
                                            PORTFOLIO
                                            <br />
                                            2026 / 001
                                        </span>
                                    </div>
                                </div>

                                <dl className="divide-y divide-ink/15 px-4 py-1">
                                    <div className="flex items-baseline justify-between gap-4 py-2">
                                        <dt className="font-code text-[8px] tracking-[0.08em] text-ink/65">
                                            RÔLE
                                        </dt>
                                        <dd className="text-right text-[11px] font-medium">
                                            {profile.role}
                                        </dd>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-4 py-2">
                                        <dt className="font-code text-[8px] tracking-[0.08em] text-ink/65">
                                            FORMATION
                                        </dt>
                                        <dd className="max-w-[65%] text-right text-[11px] font-medium">
                                            {profile.education}
                                        </dd>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-4 py-2">
                                        <dt className="font-code text-[8px] tracking-[0.08em] text-ink/65">
                                            LANGUES
                                        </dt>
                                        <dd className="max-w-[65%] text-right text-[11px] font-medium">
                                            {profile.languages
                                                .map(
                                                    (language) => language.name,
                                                )
                                                .join(' · ')}
                                        </dd>
                                    </div>
                                    <div className="flex items-baseline justify-between gap-4 py-2">
                                        <dt className="font-code text-[8px] tracking-[0.08em] text-ink/65">
                                            STATUT
                                        </dt>
                                        <dd className="text-right font-code text-[9px] text-pine">
                                            OUVERT AUX STAGES
                                        </dd>
                                    </div>
                                </dl>

                                <div className="flex items-end justify-between gap-4 border-t-2 border-ink bg-lime px-4 py-2.5">
                                    <p className="font-code text-[8px] leading-relaxed tracking-[0.1em]">
                                        HEURE LOCALE
                                        <br />
                                        <span className="font-display text-lg font-extrabold tracking-[-0.03em]">
                                            {localTime} GMT
                                        </span>
                                    </p>
                                    <span className="font-code text-[8px] tracking-[0.1em]">
                                        ESCAE / 2025
                                    </span>
                                </div>
                            </div>
                        </m.div>
                    </m.div>
                </div>

                <m.div
                    className="flex flex-wrap items-center justify-between gap-3 border-t border-bone/25 pt-3 font-code text-[9px] tracking-[0.1em] text-bone/65"
                    initial={false}
                    animate={{ opacity: introReady ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                >
                    <span className="flex items-center gap-2">
                        <ArrowDown
                            className="h-3.5 w-3.5 text-lime"
                            aria-hidden="true"
                        />
                        DÉFILER POUR LE DOSSIER
                    </span>
                    <span className="hidden sm:inline">
                        HTML / CSS / PYTHON · BUREAUTIQUE · SUPPORT
                    </span>
                    <span>01 / 06</span>
                </m.div>
            </div>
        </section>
    );
}
