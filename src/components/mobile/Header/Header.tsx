"use client";

export function Header() {
    return (
        <header className="h-16 px-4 flex items-center justify-between bg-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                {/* Logo or title */}
                <h1 className="text-xl font-bold text-white">Translator</h1>
            </div>
            
            <div className="flex items-center gap-2">
                {/* Header actions */}
            </div>
        </header>
    );
}
