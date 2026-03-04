"use client";

interface BodyProps {
    children?: React.ReactNode;
}

export function Body({ children }: BodyProps) {
    return (
        <main className="flex flex-col flex-1 overflow-y-auto px-1 py-2 md:px-2 md:py-4 bg-(--page-bg-primary) rounded-2xl gap-4 md:mx-4 md:mb-4">
            {children}
        </main>
    );
}
