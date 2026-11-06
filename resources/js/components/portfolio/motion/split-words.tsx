import { useReducedMotion } from 'framer-motion';
import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { EASE_OUT } from './reveal';

export function SplitWords({
    text,
    className,
    wordClassName,
    delay = 0,
    stagger = 0.05,
    active,
}: {
    text: string;
    className?: string;
    wordClassName?: string;
    delay?: number;
    stagger?: number;
    active?: boolean;
}) {
    const reduceMotion = useReducedMotion();
    const words = text.split(' ');
    const motionProps =
        active === undefined
            ? { whileInView: 'visible' as const, viewport: { once: true } }
            : { animate: active ? ('visible' as const) : ('hidden' as const) };

    if (reduceMotion) {
        return <span className={className}>{text}</span>;
    }

    return (
        <m.span
            className={cn('inline', className)}
            aria-label={text}
            initial="hidden"
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: stagger,
                        delayChildren: delay,
                    },
                },
            }}
            {...motionProps}
        >
            {words.map((word, index) => (
                <span
                    key={`${word}-${index}`}
                    className="inline-block overflow-hidden pb-[0.08em] align-bottom"
                    aria-hidden="true"
                >
                    <m.span
                        className={cn('inline-block', wordClassName)}
                        variants={{
                            hidden: { y: '115%', rotate: 3 },
                            visible: {
                                y: '0%',
                                rotate: 0,
                                transition: {
                                    duration: 0.85,
                                    ease: EASE_OUT,
                                },
                            },
                        }}
                    >
                        {word}
                        {index < words.length - 1 ? '\u00A0' : ''}
                    </m.span>
                </span>
            ))}
        </m.span>
    );
}

export function LineReveal({
    children,
    className,
    delay = 0,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) {
    const reduceMotion = useReducedMotion();

    if (reduceMotion) {
        return <span className={className}>{children}</span>;
    }

    return (
        <span className={cn('block overflow-hidden', className)}>
            <m.span
                className="block"
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay, ease: EASE_OUT }}
            >
                {children}
            </m.span>
        </span>
    );
}
