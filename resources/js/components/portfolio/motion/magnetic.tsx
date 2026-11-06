import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { m } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Magnetic({
    children,
    className,
    strength = 0.22,
}: {
    children: ReactNode;
    className?: string;
    strength?: number;
}) {
    const reduceMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (reduceMotion || !ref.current) {
            return;
        }

        const bounds = ref.current.getBoundingClientRect();

        x.set((event.clientX - (bounds.left + bounds.width / 2)) * strength);
        y.set((event.clientY - (bounds.top + bounds.height / 2)) * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <m.div
            ref={ref}
            className={cn('inline-block', className)}
            style={{ x: springX, y: springY }}
            onPointerMove={handlePointerMove}
            onPointerLeave={reset}
            onBlur={reset}
        >
            {children}
        </m.div>
    );
}
