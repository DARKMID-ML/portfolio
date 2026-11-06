import { m } from 'framer-motion';
import {
    AppWindow,
    ArrowUpRight,
    Check,
    Globe,
    ShieldCheck,
    ShoppingCart,
} from 'lucide-react';
import { EASE_OUT, Reveal } from '@/components/portfolio/motion/reveal';
import { SectionHeading } from '@/components/portfolio/section-heading';
import type { Profile, Service } from '@/types/portfolio';

const serviceIcons = {
    globe: Globe,
    'shopping-cart': ShoppingCart,
    'app-window': AppWindow,
    'shield-check': ShieldCheck,
} as const;

const ticketStyles = [
    {
        shell: 'bg-bone text-ink',
        band: 'bg-lime text-ink',
        line: 'border-ink/20',
        muted: 'text-ink/65',
        check: 'text-violet',
        className: 'lg:-rotate-1',
    },
    {
        shell: 'bg-bone text-ink',
        band: 'bg-violet text-bone',
        line: 'border-ink/20',
        muted: 'text-ink/65',
        check: 'text-pine',
        className: 'lg:translate-y-8 lg:rotate-[0.6deg]',
    },
    {
        shell: 'bg-bone text-ink',
        band: 'bg-pine text-bone',
        line: 'border-ink/20',
        muted: 'text-ink/65',
        check: 'text-violet',
        className: 'lg:-rotate-[0.8deg]',
    },
] as const;

export function Services({
    services,
    profile,
}: {
    services: Service[];
    profile: Profile;
}) {
    return (
        <section
            id="services"
            className="relative overflow-hidden bg-ink py-20 text-bone sm:py-28"
            aria-label="Services"
        >
            <div
                className="weave-grid pointer-events-none absolute inset-0 opacity-30"
                aria-hidden="true"
            />
            <span
                className="text-outline-bone pointer-events-none absolute -top-8 -right-4 font-display text-[28vw] leading-none font-extrabold select-none lg:-right-8"
                aria-hidden="true"
            >
                04
            </span>

            <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
                <SectionHeading
                    index="04 /"
                    label="Services"
                    title="Ce que je peux"
                    accent="mettre sur la table"
                    description="Des services concrets, pensés pour les besoins administratifs, web et de support du quotidien."
                    tone="dark"
                />

                {services.length === 0 ? (
                    <p className="mt-14 text-sm text-bone/55">
                        Les services seront bientôt disponibles.
                    </p>
                ) : (
                    <div className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-6">
                        {services.map((service, index) => {
                            const Icon =
                                serviceIcons[
                                    service.icon as keyof typeof serviceIcons
                                ] ?? Globe;
                            const style =
                                ticketStyles[index % ticketStyles.length] ??
                                ticketStyles[0];

                            return (
                                <m.article
                                    key={service.id}
                                    initial={{
                                        opacity: 0,
                                        y: 28,
                                        rotate:
                                            index === 1
                                                ? 0
                                                : index === 0
                                                  ? -1
                                                  : 1,
                                    }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-8%' }}
                                    transition={{
                                        duration: 0.65,
                                        delay: index * 0.07,
                                        ease: EASE_OUT,
                                    }}
                                    className={`ticket border-2 border-ink shadow-[8px_8px_0_0_var(--color-bone)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 ${style.shell} ${style.className}`}
                                    style={
                                        {
                                            '--ticket-notch':
                                                'var(--color-ink)',
                                        } as React.CSSProperties
                                    }
                                >
                                    <div
                                        className={`flex items-center justify-between gap-3 px-4 py-3 ${style.band}`}
                                    >
                                        <span className="font-code text-[8px] tracking-[0.1em]">
                                            SERVICE /{' '}
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="flex h-8 w-8 items-center justify-center border border-current/30">
                                            <Icon
                                                className="h-3.5 w-3.5"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </div>

                                    <div className="px-5 py-6">
                                        <h3 className="max-w-[12ch] font-display text-[clamp(1.8rem,3.3vw,2.85rem)] leading-[0.86] font-extrabold tracking-[-0.045em] break-words uppercase">
                                            {service.title}
                                        </h3>
                                        <p
                                            className={`mt-3 text-[13px] leading-relaxed ${style.muted}`}
                                        >
                                            {service.description}
                                        </p>

                                        <div
                                            className={`ticket-dash mt-6 pt-4 ${style.line}`}
                                        >
                                            <p className="font-code text-[8px] tracking-[0.1em] opacity-75">
                                                CE QUI EST INCLUS
                                            </p>
                                            <ul
                                                className="mt-3 space-y-2"
                                                aria-label={`Inclus dans : ${service.title}`}
                                            >
                                                {service.features.map(
                                                    (feature) => (
                                                        <li
                                                            key={feature}
                                                            className="flex items-center gap-2.5 text-[12px]"
                                                        >
                                                            <Check
                                                                className={`h-3.5 w-3.5 shrink-0 ${style.check}`}
                                                                aria-hidden="true"
                                                            />
                                                            {feature}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </div>

                                    <div
                                        className={`flex items-center justify-between gap-3 border-t px-5 py-3 font-code text-[8px] tracking-[0.08em] ${style.line}`}
                                    >
                                        <span>BAMAKO / À DISTANCE</span>
                                        <span className="h-1.5 w-1.5 bg-lime" />
                                    </div>
                                </m.article>
                            );
                        })}
                    </div>
                )}

                <Reveal className="mt-16" y={32}>
                    <a
                        href="#contact"
                        className="group grid overflow-hidden border-2 border-bone bg-bone text-ink sm:grid-cols-[1fr_auto]"
                    >
                        <div className="px-5 py-6 sm:px-8 sm:py-7">
                            <p className="font-code text-[9px] tracking-[0.1em] text-ink/65">
                                UN BESOIN PRÉCIS ? {profile.availabilityText}
                            </p>
                            <p className="mt-2 font-display text-[clamp(2rem,5vw,4.4rem)] leading-[0.82] font-extrabold tracking-[-0.05em] uppercase">
                                Écrivons quelque
                                <br />
                                chose ensemble.
                            </p>
                        </div>
                        <span className="flex items-center justify-center bg-pine px-7 py-6 text-bone transition-colors group-hover:bg-violet sm:px-9">
                            <ArrowUpRight
                                className="h-9 w-9 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                aria-hidden="true"
                            />
                        </span>
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
