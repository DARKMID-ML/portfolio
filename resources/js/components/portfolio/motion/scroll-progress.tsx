import {
    motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useSpring,
} from 'framer-motion';
import { useState } from 'react';

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const reduceMotion = useReducedMotion();
    const progress = useSpring(scrollYProgress, {
        stiffness: 140,
        damping: 28,
        mass: 0.35,
    });
    const [percent, setPercent] = useState(() =>
        Math.round(scrollYProgress.get() * 100),
    );

    useMotionValueEvent(progress, 'change', (latest) => {
        setPercent(Math.round(latest * 100));
    });

    return (
        <>
            <div
                className="fixed inset-x-0 bottom-0 z-[96] h-[3px] bg-ink/20 min-[1536px]:hidden"
                aria-hidden="true"
            >
                <motion.div
                    className="h-full origin-left bg-lime"
                    style={{ scaleX: progress }}
                />
            </div>

            <div
                className="fixed top-1/2 right-5 z-[96] hidden -translate-y-1/2 min-[1536px]:block"
                aria-hidden="true"
            >
                <div className="flex flex-col items-center gap-2 border border-ink/25 bg-bone/90 px-1.5 py-2 text-ink shadow-[3px_3px_0_0_var(--color-ink)] backdrop-blur">
                    <span className="font-code text-[7px] tracking-[0.1em] text-ink/65 [writing-mode:vertical-rl]">
                        DOSSIER / 223
                    </span>
                    <div className="relative h-28 w-[3px] overflow-hidden bg-ink/20 lg:h-36">
                        <motion.div
                            className="absolute inset-0 origin-top bg-lime"
                            style={{
                                scaleY: reduceMotion
                                    ? scrollYProgress
                                    : progress,
                            }}
                        />
                    </div>
                    <span className="font-display text-[10px] leading-none font-extrabold tabular-nums">
                        {String(percent).padStart(3, '0')}
                    </span>
                    <span className="h-1.5 w-1.5 bg-pine" />
                </div>
            </div>
        </>
    );
}
