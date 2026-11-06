import { cn } from '@/lib/utils';

const M = ['10001', '11011', '10101', '10101', '10001', '10001', '10001'];

const D = ['11110', '10001', '10001', '10001', '10001', '10001', '11110'];

const columns = 5 + 1 + 5;
const cells = Array.from({ length: columns * 7 }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);

    if (column === 5) {
        return null;
    }

    const pattern = column < 5 ? M[row] : D[row];
    const patternColumn = column < 5 ? column : column - 6;

    return pattern[patternColumn] === '1' ? { column, row } : null;
}).filter((cell): cell is { column: number; row: number } => cell !== null);

export function MidMark({
    className,
    title,
}: {
    className?: string;
    title?: string;
}) {
    return (
        <svg
            viewBox={`0 0 ${columns} 7`}
            className={cn('mid-mark h-7 w-auto', className)}
            role={title ? 'img' : undefined}
            aria-hidden={title ? undefined : true}
            focusable="false"
        >
            {title ? <title>{title}</title> : null}
            {cells.map((cell) => (
                <rect
                    key={`${cell.column}-${cell.row}`}
                    x={cell.column}
                    y={cell.row}
                    width={0.84}
                    height={0.84}
                    fill="currentColor"
                />
            ))}
        </svg>
    );
}
