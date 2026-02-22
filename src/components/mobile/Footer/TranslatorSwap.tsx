"use client";

import { IconButton } from "@/components/buttons/IconButton";
import { DropdownInput } from "@/components/dropdowns/DropdownInput";
import { useState } from "react";

export function TranslatorSwap() {
    const [selectedLanguageLeft, setSelectedLanguageLeft] = useState<string | null>(null);
    const [selectedLanguageRight, setSelectedLanguageRight] = useState<string | null>(null);

    const languageLeftOptions = [
        {
            id: "th",
            text: "Thai",
        },
    ]

    const languageRightOptions = [
        {
            id: "tsl",
            text: "TSL (Thai)",
        },
    ]
    return (
        <div className="flex flex-row px-3 w-full">
            <DropdownInput
                pattern="secondary"
                size={48}
                selectedId={selectedLanguageLeft}
                onSelectionChange={setSelectedLanguageLeft}
                items={languageLeftOptions}
                groupLabel="All Languages"
                useMobileMode
                searchable
            />
            <IconButton
                icon="material-symbols:swap-horiz-rounded"
                size={20}
                pattern="primary"
                disabled
            />
            <DropdownInput
                pattern="secondary"
                size={48}
                selectedId={selectedLanguageRight}
                onSelectionChange={setSelectedLanguageRight}
                items={languageRightOptions}
                groupLabel="All Languages"
                useMobileMode
                searchable
            />
        </div>
    );
}