import { Reveal } from '@/components/portfolio/motion/reveal';
import { SplitWords } from '@/components/portfolio/motion/split-words';
import { cn } from '@/lib/utils';

export function SectionHeading({
    index,
    label,
    title,
    accent,
    description,
    tone = 'light',
    className,
}: {
    index: string;
    label: string;
    title: string;
    accent?: string;
    description?: string;
    tone?: 'light' | 'dark';
    className?: string;
}) {
    const dark = tone === 'dark';

    return (
        <div className={cn('relative', className)}>
            <Reveal>
                <div
                    className={cn(
                        'flex items-center gap-3 font-code text-[10px] tracking-[0.12em]',
                        dark ? 'text-bone/65' : 'text-ink/65',
                    )}
                >
                    <span
                        className={cn(
                            'inline-flex h-8 min-w-8 items-center justify-center px-1.5 font-code text-[11px] font-medium',
                            dark ? 'bg-lime text-ink' : 'bg-violet text-bone',
                        )}
                    >
                        {index.replace('/', '')}
                    </span>
                    <span>{label}</span>
                    <span
                        className={cn(
                            'h-px flex-1',
                            dark ? 'bg-bone/20' : 'bg-ink/20',
                        )}
                        aria-hidden="true"
                    />
                    <span className="hidden sm:inline">MID / 223</span>
                </div>
            </Reveal>

            <h2
                className={cn(
                    'mt-5 max-w-5xl font-display text-[clamp(2.7rem,6.8vw,6.2rem)] leading-[0.83] font-extrabold tracking-[-0.055em] text-balance uppercase',
                    dark ? 'text-bone' : 'text-ink',
                )}
            >
                <SplitWords text={title} stagger={0.035} />
                {accent ? (
                    <>
                        <br />
                        <span
                            className={
                                dark ? 'text-outline-bone' : 'text-outline-ink'
                            }
                        >
                            <SplitWords
                                text={accent}
                                delay={0.08}
                                stagger={0.035}
                            />
                        </span>
                    </>
                ) : null}
            </h2>

            {description ? (
                <Reveal delay={0.14}>
                    <p
                        className={cn(
                            'mt-6 max-w-xl text-[15px] leading-[1.7]',
                            dark ? 'text-bone/65' : 'text-ink/65',
                        )}
                    >
                        {description}
                    </p>
                </Reveal>
            ) : null}
        </div>
    );
}
