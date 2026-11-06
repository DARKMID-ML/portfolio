import { useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { m } from 'framer-motion';
import {
    ArrowUpRight,
    BadgeCheck,
    Clock,
    Globe2,
    GraduationCap,
    Languages,
    MapPin,
    ShieldCheck,
} from 'lucide-react';
import { useRef } from 'react';
import { MidMark } from '@/components/portfolio/mid-mark';
import {
    EASE_OUT,
    Reveal,
    RevealList,
} from '@/components/portfolio/motion/reveal';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { localMarket } from '@/config/site';
import { useLocalTime } from '@/hooks/use-local-time';
import type { Profile, TimelineEntry } from '@/types/portfolio';

const marketIcons = {
    'map-pin': MapPin,
    'shield-check': ShieldCheck,
    'globe-2': Globe2,
} as const;

export function About({
    profile,
    timeline,
}: {
    profile: Profile;
    timeline: TimelineEntry[];
}) {
    const timelineRef = useRef<HTMLOListElement>(null);
    const reduceMotion = useReducedMotion();
    const localTime = useLocalTime();
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 80%', 'end 45%'],
    });
    const lineScale = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 26,
        mass: 0.35,
    });

    const facts = [
        {
            icon: GraduationCap,
            label: 'Formation',
            value: profile.education ?? profile.role,
        },
        {
            icon: Languages,
            label: 'Langues',
            value: profile.languages
                .map((language) => `${language.name} — ${language.level}`)
                .join(' · '),
        },
        {
            icon: Clock,
            label: 'Fuseau',
            value: `${profile.timezone} · flexible pour les échanges avec l’Europe`,
        },
        {
            icon: BadgeCheck,
            label: 'Disponibilité',
            value: profile.availabilityText,
        },
    ];

    return (
        <section
            id="a-propos"
            className="relative overflow-hidden bg-bone py-20 sm:py-28"
            aria-label="À propos"
        >
            <div
                className="weave-grid-ink pointer-events-none absolute inset-0 opacity-40"
                aria-hidden="true"
            />
            <span
                className="pointer-events-none absolute -top-8 -right-3 font-display text-[32vw] leading-none font-extrabold text-ink/[0.035] select-none lg:-right-10"
                aria-hidden="true"
            >
                01
            </span>

            <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
                <SectionHeading
                    index="01 /"
                    label="À propos"
                    title="Un parcours"
                    accent="à hauteur d’homme"
                    description={
                        profile.profileSummary ??
                        'Un parcours en informatique de gestion, entre rigueur administrative et curiosité technique.'
                    }
                />

                <div className="mt-14 grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <Reveal>
                            <div className="relative">
                                <div
                                    className="absolute inset-0 translate-x-2.5 translate-y-2.5 bg-pine"
                                    aria-hidden="true"
                                />
                                <div className="relative overflow-hidden border-2 border-ink bg-violet p-5 text-bone sm:p-6">
                                    <div className="flex items-start justify-between gap-5 border-b border-bone/25 pb-5">
                                        <div>
                                            <p className="font-code text-[8px] tracking-[0.12em] text-bone/70">
                                                FICHE / IDENTITÉ
                                            </p>
                                            <p className="mt-2 font-display text-[clamp(1.9rem,4vw,2.8rem)] leading-[0.86] font-extrabold tracking-[-0.04em] uppercase">
                                                Mohamed
                                                <br />
                                                Idrissa
                                                <br />
                                                Diallo
                                            </p>
                                        </div>
                                        <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-lime text-ink">
                                            <MidMark className="h-4 w-auto" />
                                        </span>
                                    </div>

                                    <div className="relative mt-5 overflow-hidden border border-bone/25 p-4">
                                        <div
                                            className="halftone-light absolute inset-0 opacity-20"
                                            aria-hidden="true"
                                        />
                                        <div className="relative flex items-center justify-between gap-4">
                                            <div>
                                                <p className="font-code text-[8px] tracking-[0.12em] text-bone/70">
                                                    POSITION
                                                </p>
                                                <p className="mt-1 font-display text-xl font-extrabold tracking-[-0.03em] uppercase">
                                                    Bamako
                                                </p>
                                            </div>
                                            <span className="relative flex h-12 w-12 items-center justify-center">
                                                <span className="absolute inset-0 rounded-full border border-bone/30" />
                                                <span className="absolute inset-2 rounded-full border border-dashed border-bone/25" />
                                                <span className="h-2 w-2 bg-lime" />
                                            </span>
                                        </div>
                                        <div className="relative mt-5 flex items-end justify-between gap-3 border-t border-bone/20 pt-3 font-code text-[8px] tracking-[0.08em] text-bone/70">
                                            <span>12.6392°N / 8.0029°W</span>
                                            <span className="text-lime">
                                                {localTime} GMT
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-5 flex flex-wrap gap-1.5">
                                        {profile.languages.map((language) => (
                                            <span
                                                key={language.name}
                                                className="border border-bone/25 px-2 py-1 font-code text-[8px] tracking-[0.08em] text-bone/70"
                                            >
                                                {language.name}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-bone/25 pt-4">
                                        <span className="flex items-center gap-2 font-code text-[8px] tracking-[0.1em] text-lime">
                                            <span className="h-1.5 w-1.5 bg-lime" />
                                            {profile.availabilityText}
                                        </span>
                                        <ArrowUpRight
                                            className="h-4 w-4 text-bone/60"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <div>
                        <RevealList className="space-y-5">
                            {profile.bio.map((paragraph, index) => (
                                <m.p
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 22 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.7,
                                                ease: EASE_OUT,
                                            },
                                        },
                                    }}
                                    className={
                                        index === 0
                                            ? 'border-l-2 border-violet pl-5 text-[17px] leading-[1.7] text-ink/80 sm:text-[19px]'
                                            : 'text-[15px] leading-[1.8] text-ink/65 sm:text-base'
                                    }
                                >
                                    {paragraph}
                                </m.p>
                            ))}
                        </RevealList>

                        <Reveal delay={0.1}>
                            <blockquote className="relative mt-8 overflow-hidden border-l-4 border-lime bg-ink px-5 py-5 text-bone sm:px-7 sm:py-6">
                                <p className="max-w-2xl font-display text-[clamp(1.35rem,3vw,2.2rem)] leading-[1.05] font-extrabold tracking-[-0.035em] uppercase">
                                    « {profile.tagline} »
                                </p>
                            </blockquote>
                        </Reveal>

                        <div className="mt-8 border-t border-ink/25">
                            {facts.map(({ icon: Icon, label, value }) => (
                                <Reveal key={label}>
                                    <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-ink/15 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                                        <span className="flex items-center gap-2 font-code text-[9px] tracking-[0.08em] text-ink/65">
                                            <Icon
                                                className="h-3.5 w-3.5 text-violet"
                                                aria-hidden="true"
                                            />
                                            {label}
                                        </span>
                                        <span className="text-[13px] leading-relaxed font-medium text-ink/80">
                                            {value}
                                        </span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-20 sm:mt-28">
                    <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-4">
                        <h3 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.85] font-extrabold tracking-[-0.05em] uppercase">
                            Le parcours
                        </h3>
                        <span className="font-code text-[9px] tracking-[0.1em] text-ink/65">
                            {String(timeline.length).padStart(2, '0')} ÉTAPES /
                            CHRONOLOGIE
                        </span>
                    </div>

                    <ol
                        ref={timelineRef}
                        className="relative mt-8 grid gap-0 md:grid-cols-4"
                    >
                        <span
                            className="absolute top-[0.55rem] right-0 left-0 hidden h-[2px] bg-ink/15 md:block"
                            aria-hidden="true"
                        />
                        <m.span
                            className="absolute top-[0.55rem] right-0 left-0 hidden h-[2px] origin-left bg-violet md:block"
                            style={
                                reduceMotion
                                    ? { scaleX: 1 }
                                    : { scaleX: lineScale }
                            }
                            aria-hidden="true"
                        />

                        {timeline.map((item, index) => (
                            <m.li
                                key={item.id}
                                initial={
                                    reduceMotion ? false : { opacity: 0, y: 22 }
                                }
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-8%' }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.08,
                                    ease: EASE_OUT,
                                }}
                                className="relative border-ink/15 py-6 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                            >
                                <span
                                    className="absolute top-0 left-0 h-3 w-3 border-2 border-bone bg-lime md:left-5 md:first:left-0"
                                    aria-hidden="true"
                                />
                                <p className="font-display text-[clamp(2rem,4vw,3.2rem)] leading-none font-extrabold tracking-[-0.04em] text-violet md:min-h-[2em]">
                                    {item.year}
                                </p>
                                <h4 className="mt-4 text-[15px] font-semibold text-ink">
                                    {item.title}
                                </h4>
                                <p className="mt-1 font-code text-[9px] tracking-[0.06em] text-ink/65">
                                    {item.subtitle}
                                </p>
                                <p className="mt-3 text-[12px] leading-relaxed text-ink/60">
                                    {item.description}
                                </p>
                                <ul className="mt-3 flex flex-wrap gap-1">
                                    {item.tags.map((tag) => (
                                        <li
                                            key={tag}
                                            className="border border-ink/20 px-1.5 py-0.5 font-code text-[7px] tracking-[0.08em] text-ink/65"
                                        >
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </m.li>
                        ))}
                    </ol>
                </div>

                <Reveal className="mt-16" y={36}>
                    <div className="relative overflow-hidden border-2 border-ink bg-ink px-5 py-7 text-bone sm:px-8 sm:py-9">
                        <div
                            className="weave-grid absolute inset-0 opacity-40"
                            aria-hidden="true"
                        />
                        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                            <div>
                                <p className="font-code text-[9px] tracking-[0.1em] text-lime">
                                    NOTE DE TERRAIN / BAMAKO
                                </p>
                                <h3 className="mt-3 max-w-2xl font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[0.88] font-extrabold tracking-[-0.045em] uppercase">
                                    {localMarket.title}
                                </h3>
                                <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-bone/60">
                                    {localMarket.description}
                                </p>
                            </div>
                            <div className="grid gap-0 border-t border-bone/20 lg:border-t-0 lg:border-l lg:border-bone/20 lg:pl-8">
                                {localMarket.points.map((point) => {
                                    const Icon =
                                        marketIcons[
                                            point.icon as keyof typeof marketIcons
                                        ] ?? MapPin;

                                    return (
                                        <div
                                            key={point.title}
                                            className="flex gap-3 border-b border-bone/15 py-3 last:border-b-0"
                                        >
                                            <Icon
                                                className="mt-0.5 h-4 w-4 shrink-0 text-lime"
                                                aria-hidden="true"
                                            />
                                            <div>
                                                <h4 className="text-[13px] font-semibold text-bone">
                                                    {point.title}
                                                </h4>
                                                <p className="mt-0.5 text-[11px] leading-relaxed text-bone/50">
                                                    {point.description}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
