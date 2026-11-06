import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Marquee({
    children,
    speed = 30,
    reverse = false,
    className,
    pauseOnHover = true,
}: {
    children: ReactNode;
    speed?: number;
    reverse?: boolean;
    className?: string;
    pauseOnHover?: boolean;
}) {
    return (
        <div
            className={cn(
                'relative overflow-hidden',
                pauseOnHover &&
                    '[&:hover_.marquee-track]:[animation-play-state:paused]',
                className,
            )}
            aria-hidden="true"
        >
            <div
                className="marquee-track"
                style={{
                    animationDuration: `${speed}s`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                }}
            >
                <div className="flex shrink-0 items-center">{children}</div>
                <div className="flex shrink-0 items-center">{children}</div>
            </div>
        </div>
    );
}
