import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { m } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Cursor() {
    const reduceMotion = useReducedMotion();
    const [active, setActive] = useState(false);
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const ringX = useSpring(x, { stiffness: 180, damping: 24, mass: 0.35 });
    const ringY = useSpring(y, { stiffness: 180, damping: 24, mass: 0.35 });

    useEffect(() => {
        if (reduceMotion) {
            return;
        }

        const handleMove = (event: PointerEvent) => {
            x.set(event.clientX);
            y.set(event.clientY);
        };

        const handleOver = (event: PointerEvent) => {
            const target = event.target;

            setActive(
                target instanceof Element &&
                    Boolean(
                        target.closest(
                            'a, button, input, textarea, select, [data-cursor]',
                        ),
                    ),
            );
        };

        window.addEventListener('pointermove', handleMove, { passive: true });
        window.addEventListener('pointerover', handleOver, { passive: true });

        return () => {
            window.removeEventListener('pointermove', handleMove);
            window.removeEventListener('pointerover', handleOver);
        };
    }, [reduceMotion, x, y]);

    if (reduceMotion) {
        return null;
    }

    return (
        <>
            <m.div
                className="cursor-dot pointer-events-none fixed top-0 left-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay mix-blend-difference"
                style={{ x, y }}
                aria-hidden="true"
            />
            <m.div
                className="cursor-ring pointer-events-none fixed top-0 left-0 z-[100] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-clay/70 mix-blend-difference"
                style={{ x: ringX, y: ringY }}
                animate={{
                    scale: active ? 1.9 : 1,
                    opacity: active ? 0.5 : 0.8,
                }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
            />
        </>
    );
}
