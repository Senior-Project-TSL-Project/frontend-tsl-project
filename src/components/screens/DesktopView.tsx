"use client";

import { IconButton } from "../buttons/IconButton";

export default function DesktopView() {
    return (
        <div className="max-w-5xl mx-auto min-h-screen border p-8">
            <h1 className="text-3xl font-bold mb-8">IconButton Examples</h1>
            
            {/* Primary Pattern */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Primary Pattern</h2>
                <div className="flex gap-4 items-center">
                    <IconButton
                        icon="material-symbols:home-pin-outline-rounded"
                        pattern="primary"
                    />
                    <IconButton
                        icon="mdi:heart-outline"
                        pattern="primary"
                    />
                    <IconButton
                        icon="mdi:share-variant"
                        pattern="primary"
                    />
                    <IconButton
                        icon="mdi:bookmark-outline"
                        pattern="primary"
                    />
                    <IconButton
                        icon="mdi:dots-vertical"
                        pattern="primary"
                        disabled
                    />
                </div>
            </section>

            {/* Brand Primary Pattern */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Brand Primary Pattern</h2>
                <div className="flex gap-4 items-center">
                    <IconButton
                        icon="mdi:play"
                        pattern="brand-primary"
                    />
                    <IconButton
                        icon="mdi:pause"
                        pattern="brand-primary"
                    />
                    <IconButton
                        icon="mdi:stop"
                        pattern="brand-primary"
                    />
                    <IconButton
                        icon="mdi:skip-next"
                        pattern="brand-primary"
                    />
                    <IconButton
                        icon="mdi:skip-previous"
                        pattern="brand-primary"
                        disabled
                    />
                </div>
            </section>

            {/* Brand Inverted Pattern */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Brand Inverted Pattern</h2>
                <div className="flex gap-4 items-center">
                    <IconButton
                        icon="mdi:plus"
                        pattern="brand-inverted"
                    />
                    <IconButton
                        icon="mdi:minus"
                        pattern="brand-inverted"
                    />
                    <IconButton
                        icon="mdi:close"
                        pattern="brand-inverted"
                    />
                    <IconButton
                        icon="mdi:check"
                        pattern="brand-inverted"
                    />
                    <IconButton
                        icon="mdi:pencil"
                        pattern="brand-inverted"
                        disabled
                    />
                </div>
            </section>

            {/* Different Sizes */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Different Sizes</h2>
                <div className="flex gap-4 items-center">
                    <IconButton
                        icon="mdi:star"
                        pattern="brand-primary"
                        size={20}
                    />
                    <IconButton
                        icon="mdi:star"
                        pattern="brand-primary"
                        size={40}
                    />
                </div>
            </section>

            {/* With Click Handlers */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Interactive Examples</h2>
                <div className="flex gap-4 items-center">
                    <IconButton
                        icon="mdi:bell"
                        pattern="primary"
                        onClick={() => alert('Notification clicked!')}
                    />
                    <IconButton
                        icon="mdi:email"
                        pattern="brand-primary"
                        onClick={() => alert('Email clicked!')}
                    />
                    <IconButton
                        icon="mdi:cog"
                        pattern="brand-inverted"
                        onClick={() => alert('Settings clicked!')}
                    />
                </div>
            </section>

            {/* Controlled State Demo */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Controlled States</h2>
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-center gap-2">
                        <IconButton
                            icon="mdi:thumb-up"
                            pattern="brand-primary"
                            state="default"
                        />
                        <span className="text-xs">Default</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <IconButton
                            icon="mdi:thumb-up"
                            pattern="brand-primary"
                            state="hovered"
                        />
                        <span className="text-xs">Hovered</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <IconButton
                            icon="mdi:thumb-up"
                            pattern="brand-primary"
                            state="pressed"
                        />
                        <span className="text-xs">Pressed</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <IconButton
                            icon="mdi:thumb-up"
                            pattern="brand-primary"
                            state="focused"
                        />
                        <span className="text-xs">Focused</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <IconButton
                            icon="mdi:thumb-up"
                            pattern="brand-primary"
                            disabled
                        />
                        <span className="text-xs">Disabled</span>
                    </div>
                </div>
            </section>
        </div>
    );
}