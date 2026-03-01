"use client";
import { IconButton } from "@/components/buttons/IconButton";
import { Text } from "@/components/typography/Text";
import { Icon } from "@iconify/react";


export function Header() {
    return (
        <header className="h-16 px-4 flex items-center justify-between bg-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-(--topbar-shared-spacing-gap)">
                <Icon icon="material-symbols:sign-language-rounded" width="20" height="20" className="text-(--topbar-content-icon)"/>
                <Text size="large" weight="medium" className="text-(--topbar-content-label)">Sign Translate</Text>
            </div>
            <div className="flex items-center">
                <IconButton icon="material-symbols:settings-outline-rounded" pattern="primary" size={24}/>
            </div>
        </header>
    );
}
