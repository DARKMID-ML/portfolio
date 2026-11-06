import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function TiltCard({
    children,
    className,
    max = 7,
}: {
    children: ReactNode;
    className?: string;
    max?: number;
}) {
    const reduceMotion = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const hover = useMotionValue(0);
    const springX = useSpring(rotateX, { stiffness: 180, damping: 20 });
    const springY = useSpring(rotateY, { stiffness: 180, damping: 20 });
    const scale = useSpring(useTransform(hover, [0, 1], [1, 1.015]), {
        stiffness: 180,
        damping: 22,
    });

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (reduceMotion || !ref.current) {
            return;
        }

        const bounds = ref.current.getBoundingClientRect();
        const px = (event.clientX - bounds.left) / bounds.width - 0.5;
        const py = (event.clientY - bounds.top) / bounds.height - 0.5;

        rotateY.set(px * max * 2);
        rotateX.set(py * -max * 2);
        hover.set(1);
    };

    const reset = () => {
        rotateX.set(0);
        rotateY.set(0);
        hover.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={cn('[transform-style:preserve-3d]', className)}
            style={{
                rotateX: springX,
                rotateY: springY,
                scale,
                transformPerspective: 1100,
            }}
            onPointerMove={handlePointerMove}
            onPointerLeave={reset}
            onBlur={reset}
        >
            {children}
        </motion.div>
    );
}
