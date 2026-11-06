import { m } from 'framer-motion';
import { Layout, Server, Sparkles, Wrench } from 'lucide-react';
import { EASE_OUT, Reveal } from '@/components/portfolio/motion/reveal';
import { SectionHeading } from '@/components/portfolio/section-heading';
import type { SkillCategory } from '@/types/portfolio';

const iconMap = {
    layout: Layout,
    server: Server,
    wrench: Wrench,
    sparkles: Sparkles,
} as const;

const rowStyles = [
    {
        shell: 'bg-bone text-ink',
        muted: 'text-ink/65',
        border: 'border-ink/20',
        tag: 'border-ink/20 text-ink hover:bg-violet hover:text-bone',
        icon: 'bg-violet text-bone',
        rowBorder: 'border-ink/20',
    },
    {
        shell: 'bg-lilac text-ink',
        muted: 'text-ink/65',
        border: 'border-ink/20',
        tag: 'border-ink/20 text-ink hover:bg-pine hover:text-bone',
        icon: 'bg-pine text-bone',
        rowBorder: 'border-ink/20',
    },
    {
        shell: 'bg-pine text-bone',
        muted: 'text-bone/80',
        border: 'border-bone/30',
        tag: 'border-bone/35 text-bone hover:bg-bone hover:text-ink',
        icon: 'bg-bone text-pine',
        rowBorder: 'border-bone/25',
    },
] as const;

export function Skills({ categories }: { categories: SkillCategory[] }) {
    const skillCount = categories.reduce(
        (total, category) => total + category.skills.length,
        0,
    );

    return (
        <section
            id="competences"
            className="relative overflow-hidden bg-lilac py-20 text-ink sm:py-28"
            aria-label="Compétences"
        >
            <div
                className="weave-grid-ink pointer-events-none absolute inset-0 opacity-40"
                aria-hidden="true"
            />
            <span
                className="text-outline-ink pointer-events-none absolute -top-8 -right-4 font-display text-[28vw] leading-none font-extrabold select-none lg:-right-8"
                aria-hidden="true"
            >
                02
            </span>

            <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                    <SectionHeading
                        index="02 /"
                        label="Compétences"
                        title="Les outils"
                        accent="du métier"
                        description="Les compétences acquises pendant ma formation en informatique de gestion et mon stage pratique."
                    />
                    <Reveal delay={0.14}>
                        <p className="max-w-[250px] border-l-2 border-violet pl-4 font-code text-[9px] leading-relaxed tracking-[0.08em] text-ink/65">
                            {String(categories.length).padStart(2, '0')}{' '}
                            FAMILLES
                            <br />
                            {String(skillCount).padStart(2, '0')} COMPÉTENCES
                            <br />
                            UNE MÊME EXIGENCE
                        </p>
                    </Reveal>
                </div>

                {categories.length === 0 ? (
                    <p className="mt-14 text-sm text-ink/65">
                        Les compétences seront bientôt disponibles.
                    </p>
                ) : (
                    <div className="mt-12 border-t-2 border-ink/20">
                        {categories.map((category, index) => {
                            const Icon =
                                iconMap[
                                    category.icon as keyof typeof iconMap
                                ] ?? Sparkles;
                            const style =
                                rowStyles[index % rowStyles.length] ??
                                rowStyles[1];

                            return (
                                <m.article
                                    key={category.id}
                                    initial={{
                                        opacity: 0,
                                        x: index % 2 === 0 ? -28 : 28,
                                    }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: '-8%' }}
                                    transition={{
                                        duration: 0.7,
                                        delay: index * 0.07,
                                        ease: EASE_OUT,
                                    }}
                                    className={`group grid gap-5 border-b-2 px-4 py-6 transition-transform duration-300 hover:-translate-y-0.5 sm:px-5 md:grid-cols-[3rem_0.9fr_1.1fr] md:items-center md:gap-8 md:py-7 ${style.rowBorder} ${style.shell}`}
                                >
                                    <div className="flex items-center gap-4 md:block">
                                        <span
                                            className={`flex h-10 w-10 items-center justify-center ${style.icon}`}
                                        >
                                            <Icon
                                                className="h-4.5 w-4.5"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="font-display text-[clamp(1.9rem,4.2vw,3.3rem)] leading-[0.84] font-extrabold tracking-[-0.045em] uppercase">
                                            {category.title}
                                        </h3>
                                        <p
                                            className={`mt-2 max-w-sm text-[12px] leading-relaxed ${style.muted}`}
                                        >
                                            {category.description}
                                        </p>
                                    </div>

                                    <ul
                                        className={`flex flex-wrap gap-1.5 md:justify-end ${style.border}`}
                                        aria-label={`Compétences ${category.title}`}
                                    >
                                        {category.skills.map((skill) => (
                                            <li key={skill}>
                                                <span
                                                    className={`inline-flex border px-2.5 py-1.5 font-code text-[9px] tracking-[0.04em] transition-colors duration-200 ${style.tag}`}
                                                >
                                                    {skill}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </m.article>
                            );
                        })}
                    </div>
                )}

                <Reveal className="mt-8" delay={0.1}>
                    <p className="max-w-2xl font-code text-[9px] leading-relaxed tracking-[0.06em] text-ink/65">
                        J’apprends en continu. Les projets, le support et la
                        bureautique sont les trois terrains sur lesquels je
                        continue de progresser.
                    </p>
                </Reveal>
            </div>
        </section>
    );
}
