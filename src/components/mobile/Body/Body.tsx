"use client";

interface BodyProps {
    children?: React.ReactNode;
}

export function Body({ children }: BodyProps) {
    return (
        <main className="flex-1 overflow-y-auto px-1 py-2 bg-(--page-bg-primary) rounded-2xl">
            {children || (
                <div className="flex items-center justify-center h-full">
                    <p className="text-white/60">Body Content</p>
                </div>
            )}
        </main>
    );
}
