import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { m } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MidMark } from '@/components/portfolio/mid-mark';

const INTRO_KEY = 'portfolio-intro';
const INTRO_DURATION = 700;
const EXIT_DURATION = 0.45;
const SEGMENTS = 12;

export function Intro({ onDone, name }: { onDone: () => void; name: string }) {
    const reduceMotion = useReducedMotion();
    const finished = useRef(false);
    const lastSegment = useRef(-1);
    const [visible, setVisible] = useState(() => {
        if (typeof window === 'undefined') {
            return true;
        }

        return window.sessionStorage.getItem(INTRO_KEY) !== 'done';
    });
    const [progressSegments, setProgressSegments] = useState(0);

    const finish = useCallback(() => {
        if (finished.current) {
            return;
        }

        finished.current = true;
        onDone();
    }, [onDone]);

    useEffect(() => {
        if (!visible) {
            finish();

            return;
        }

        if (reduceMotion) {
            window.sessionStorage.setItem(INTRO_KEY, 'done');
            setVisible(false);

            return;
        }

        const startedAt = window.performance.now();
        let frame = 0;
        lastSegment.current = -1;

        const tick = () => {
            const elapsed = window.performance.now() - startedAt;
            const nextSegment = Math.min(
                SEGMENTS,
                Math.floor((elapsed / INTRO_DURATION) * SEGMENTS),
            );

            if (nextSegment !== lastSegment.current) {
                lastSegment.current = nextSegment;
                setProgressSegments(nextSegment);
            }

            if (nextSegment < SEGMENTS) {
                frame = window.requestAnimationFrame(tick);
            } else {
                window.sessionStorage.setItem(INTRO_KEY, 'done');
                finish();
                setVisible(false);
            }
        };

        frame = window.requestAnimationFrame(tick);

        return () => window.cancelAnimationFrame(frame);
    }, [finish, reduceMotion, visible]);

    const progress = Math.round((progressSegments / SEGMENTS) * 100);

    return (
        <AnimatePresence onExitComplete={finish}>
            {visible && !reduceMotion && (
                <m.div
                    className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-violet px-5 py-6 text-bone sm:px-10 sm:py-8"
                    exit={{
                        y: '-100%',
                        transition: {
                            duration: EXIT_DURATION,
                            ease: [0.76, 0, 0.24, 1],
                        },
                    }}
                >
                    <div
                        className="weave-grid absolute inset-0 opacity-50"
                        aria-hidden="true"
                    />
                    <div
                        className="halftone-light absolute inset-0 opacity-10"
                        aria-hidden="true"
                    />

                    <div className="relative flex items-center justify-between gap-4 border-b border-bone/25 pb-3 font-code text-[9px] tracking-[0.1em] text-bone/70">
                        <span>PORTFOLIO / 2026</span>
                        <span>BAMAKO / MALI · 223</span>
                    </div>

                    <div className="relative flex flex-1 items-center">
                        <div className="w-full">
                            <m.div
                                className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.7,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <div>
                                    <p className="font-code text-[9px] tracking-[0.14em] text-lime">
                                        OUVERTURE DU DOSSIER
                                    </p>
                                    <p className="mt-2 font-display text-[clamp(4.2rem,16vw,12rem)] leading-[0.75] font-extrabold tracking-[-0.07em]">
                                        MID
                                        <span className="text-outline-bone">
                                            /223
                                        </span>
                                    </p>
                                    <p className="mt-4 max-w-md text-[13px] leading-relaxed text-bone/70">
                                        {name}
                                        <br />
                                        Développeur web junior · Bamako, Mali
                                    </p>
                                </div>
                                <span className="flex h-20 w-20 shrink-0 items-center justify-center bg-lime text-ink">
                                    <MidMark className="h-6 w-auto" />
                                </span>
                            </m.div>

                            <div className="mt-12 flex items-end justify-between gap-4">
                                <div className="flex flex-1 gap-1">
                                    {Array.from({ length: SEGMENTS }).map(
                                        (_, index) => (
                                            <span
                                                key={index}
                                                className={`h-3 flex-1 transition-colors duration-150 ${
                                                    index < progressSegments
                                                        ? 'bg-lime'
                                                        : 'bg-bone/20'
                                                }`}
                                            />
                                        ),
                                    )}
                                </div>
                                <p className="font-display text-3xl leading-none font-extrabold tabular-nums">
                                    {String(progress).padStart(3, '0')}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-bone/25 pt-3 font-code text-[8px] tracking-[0.1em] text-bone/65">
                        <span>DUT INFORMATIQUE DE GESTION · ESCAE 2025</span>
                        <span>CHARGEMENT DE L’ATELIER</span>
                    </div>
                </m.div>
            )}
        </AnimatePresence>
    );
}
