import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

export function Reveal({
    children,
    className,
    delay = 0,
    y = 30,
    once = true,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    once?: boolean;
}) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reduceMotion ? false : { opacity: 0, y }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once, margin: '-10% 0px -10% 0px' }}
            transition={{ duration: 0.8, delay, ease: EASE_OUT }}
        >
            {children}
        </motion.div>
    );
}

export function RevealList({
    children,
    className,
    stagger = 0.08,
    delay = 0,
}: {
    children: ReactNode;
    className?: string;
    stagger?: number;
    delay?: number;
}) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'visible'}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: stagger,
                        delayChildren: delay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function RevealItem({
    children,
    className,
    y = 24,
}: {
    children: ReactNode;
    className?: string;
    y?: number;
}) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.75, ease: EASE_OUT },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
