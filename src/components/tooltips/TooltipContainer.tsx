interface TooltipProps {
    children: React.ReactNode;
    x: number;
    y: number;
    contentRef: React.RefObject<HTMLDivElement | null>;
}

export default function TooltipContainer({ children, x, y, contentRef }: TooltipProps) {
    return (
        <div
            className=""
            style={{
                position: 'absolute',
                pointerEvents: 'none',
                left: 0,
                top: 0,
                transform: `translate3d(${x}px, ${y}px, 0) translateX(-50%)`,
                backgroundColor: 'var(--tooltip-bg)',
                borderRadius: 'var(--tooltip-border-radius)',
                color: 'var(--tooltip-label)',
                padding: 'var(--tooltip-spacing-p-y) var(--tooltip-spacing-p-x)',
                overflow: 'hidden',
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.24)',
                
            }}
        >
            <div ref={contentRef} className="text-[--tooltip-label]">
                {children}
            </div>
        </div>
    );
}