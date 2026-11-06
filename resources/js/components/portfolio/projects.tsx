import { useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { m } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { useRef } from 'react';
import { MidMark } from '@/components/portfolio/mid-mark';
import { EASE_OUT, Reveal } from '@/components/portfolio/motion/reveal';
import { SectionHeading } from '@/components/portfolio/section-heading';
import type { Project } from '@/types/portfolio';

const gradientMap: Record<string, string> = {
    'from-clay to-cobalt': 'from-clay to-cobalt',
    'from-clay to-moss': 'from-clay to-moss',
    'from-cobalt to-moss': 'from-cobalt to-moss',
    'from-soot to-clay': 'from-soot to-clay',
    'from-moss to-clay': 'from-moss to-clay',
    'from-cobalt to-clay': 'from-cobalt to-clay',
};

export function Projects({ projects }: { projects: Project[] }) {
    const sectionRef = useRef<HTMLElement>(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const previewY = useTransform(scrollYProgress, [0, 1], [34, -34]);
    const featured = projects[0];
    const rest = projects.slice(1);

    return (
        <section
            ref={sectionRef}
            id="projets"
            className="relative overflow-hidden bg-bone py-20 text-ink sm:py-28"
            aria-label="Projets"
        >
            <div
                className="halftone pointer-events-none absolute inset-0 opacity-[0.12]"
                aria-hidden="true"
            />
            <span
                className="text-outline-ink pointer-events-none absolute -top-8 -right-4 font-display text-[30vw] leading-none font-extrabold select-none lg:-right-8"
                aria-hidden="true"
            >
                03
            </span>

            <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
                <SectionHeading
                    index="03 /"
                    label="Projets"
                    title="Le travail"
                    accent="mis à plat"
                    description="Un projet personnel qui rassemble ce que je sais faire aujourd’hui : structurer, intégrer et rendre une interface utilisable."
                />

                {!featured ? (
                    <p className="mt-14 text-sm text-ink/65">
                        Les projets seront bientôt disponibles.
                    </p>
                ) : (
                    <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
                        <Reveal y={34}>
                            <m.div
                                style={
                                    reduceMotion ? undefined : { y: previewY }
                                }
                                className="relative"
                            >
                                <div className="absolute -inset-2 translate-x-2 translate-y-2 border-2 border-ink" />
                                <div className="relative border-2 border-ink bg-ink p-2.5">
                                    <div className="flex items-center justify-between gap-3 border-b border-bone/20 px-1 pb-2">
                                        <span className="flex items-center gap-1.5">
                                            <span className="h-1.5 w-1.5 rounded-full bg-pine" />
                                            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                                            <span className="h-1.5 w-1.5 rounded-full bg-bone/35" />
                                        </span>
                                        <span className="flex-1 border border-bone/20 px-2 py-1 text-center font-code text-[7px] tracking-[0.08em] text-bone/60">
                                            mid-223.portfolio / accueil
                                        </span>
                                        <MidMark className="h-2.5 w-auto text-lime" />
                                    </div>

                                    <div className="relative mt-2 aspect-[4/3] overflow-hidden bg-violet text-bone">
                                        <div
                                            className="weave-grid absolute inset-0 opacity-50"
                                            aria-hidden="true"
                                        />
                                        <div
                                            className="halftone-light absolute inset-0 opacity-15"
                                            aria-hidden="true"
                                        />
                                        <div
                                            className={`absolute top-0 right-0 h-full w-[36%] bg-gradient-to-br ${gradientMap[featured.gradient] ?? gradientMap['from-cobalt to-clay']} opacity-80`}
                                            aria-hidden="true"
                                        />
                                        <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
                                            <div className="flex items-center justify-between gap-3 font-code text-[7px] tracking-[0.08em] text-bone/70">
                                                <span>MID / 223</span>
                                                <span>BAMAKO</span>
                                            </div>
                                            <div>
                                                <p className="font-code text-[7px] tracking-[0.1em] text-lime">
                                                    PORTFOLIO / 2026
                                                </p>
                                                <p className="mt-1 font-display text-[clamp(2rem,4.8vw,4rem)] leading-[0.8] font-extrabold tracking-[-0.06em] uppercase">
                                                    Mohamed
                                                    <br />
                                                    <span className="text-outline-bone">
                                                        Idrissa
                                                    </span>
                                                    <br />
                                                    Diallo
                                                </p>
                                            </div>
                                            <div className="flex items-end justify-between gap-3 border-t border-bone/25 pt-2 font-code text-[7px] text-bone/70">
                                                <span>DÉVELOPPEUR WEB</span>
                                                <span className="bg-ink px-1.5 py-0.5 text-lime">
                                                    DISPONIBLE
                                                </span>
                                            </div>
                                        </div>
                                        <span
                                            className="scan-line pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-bone/15 to-transparent"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>

                                <span className="absolute -top-3 -left-3 -rotate-3 bg-lime px-3 py-1.5 font-code text-[9px] tracking-[0.08em] text-ink shadow-[4px_4px_0_0_var(--color-ink)]">
                                    PROJET / 01
                                </span>
                                <span
                                    className="absolute -top-2 right-8 h-6 w-20 -rotate-6 bg-lilac/90"
                                    aria-hidden="true"
                                />
                            </m.div>
                        </Reveal>

                        <Reveal delay={0.12} y={34}>
                            <article className="flex h-full flex-col border-2 border-ink bg-ink p-5 text-bone sm:p-7">
                                <div className="flex items-center justify-between gap-4 border-b border-bone/20 pb-3 font-code text-[8px] tracking-[0.1em] text-bone/60">
                                    <span>ÉTUDE DE CAS / 01</span>
                                    <span className="text-lime">2026</span>
                                </div>

                                <h3 className="mt-6 max-w-md font-display text-[clamp(2.3rem,5vw,4rem)] leading-[0.82] font-extrabold tracking-[-0.055em] uppercase">
                                    {featured.title}
                                </h3>
                                <p className="mt-4 max-w-md text-[14px] leading-relaxed text-bone/65">
                                    {featured.description}
                                </p>

                                <div className="mt-5">
                                    <p className="font-code text-[8px] tracking-[0.1em] text-bone/60">
                                        STACK / OUTILS
                                    </p>
                                    <ul className="mt-2 flex flex-wrap gap-1.5">
                                        {featured.tech.map((tech) => (
                                            <li
                                                key={tech}
                                                className="border border-bone/25 px-2 py-1 font-code text-[8px] tracking-[0.04em] text-bone/70"
                                            >
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-bone/20 pt-4">
                                    <span className="font-code text-[8px] leading-relaxed tracking-[0.06em] text-bone/60">
                                        CONÇU & DÉVELOPPÉ
                                        <br />
                                        DE A À Z
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {featured.githubUrl ? (
                                            <a
                                                href={featured.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Voir le code sur GitHub"
                                                className="inline-flex h-9 w-9 items-center justify-center border border-bone/25 text-bone/70 transition-colors hover:border-lime hover:text-lime"
                                            >
                                                <Github
                                                    className="h-3.5 w-3.5"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        ) : null}
                                        <a
                                            href="#contact"
                                            className="group inline-flex h-9 items-center gap-3 bg-lime px-3 font-code text-[9px] text-ink transition-colors hover:bg-bone"
                                        >
                                            En parler
                                            <ArrowUpRight
                                                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </Reveal>
                    </div>
                )}

                {rest.length > 0 ? (
                    <div className="mt-12 border-t-2 border-ink">
                        {rest.map((project, index) => (
                            <m.article
                                key={project.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-8%' }}
                                transition={{
                                    duration: 0.55,
                                    delay: index * 0.05,
                                    ease: EASE_OUT,
                                }}
                                className="grid gap-3 border-b border-ink/30 py-5 md:grid-cols-[5rem_1fr_1fr] md:items-center"
                            >
                                <span className="font-display text-2xl font-extrabold text-ink/65">
                                    {String(index + 2).padStart(2, '0')}
                                </span>
                                <h3 className="font-display text-xl font-extrabold tracking-[-0.03em] uppercase">
                                    {project.title}
                                </h3>
                                <p className="text-[12px] leading-relaxed text-ink/65">
                                    {project.description}
                                </p>
                            </m.article>
                        ))}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
