"use client";

import { IconButton } from "@/components/buttons/IconButton";
import { DropdownInput } from "@/components/dropdowns/DropdownInput";
import { useTranslateStore } from "@/stores/useTranslateStore";
import { useState } from "react";

export function TranslatorSwap() {
    const [selectedLanguageSource, setSelectedLanguageSource] = useState<string | null>(null);
    const [selectedLanguageTarget, setSelectedLanguageTarget] = useState<string | null>(null);
    const { isMic } = useTranslateStore();
    const languageSourceOptions = [
        {
            id: "th",
            label: "Thai",
        },
    ]

    const languageTargetOptions = [
        {
            id: "tsl",
            label: "TSL (mT5)",
            disabled: true,
        },
        {
            id: "llm",
            label: "TSL (LLM)",
            disabled: true,
        },
    ]

    return (
        <div className="flex flex-row px-3 w-full">
            <DropdownInput
                pattern="secondary"
                size={48}
                selectedId={selectedLanguageSource}
                onSelectionChange={setSelectedLanguageSource}
                items={languageSourceOptions}
                groupLabel="All Languages"
                useMobileMode
                searchable
                disabled={isMic}
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
                selectedId={selectedLanguageTarget}
                onSelectionChange={setSelectedLanguageTarget}
                items={languageTargetOptions}
                groupLabel="All Languages"
                useMobileMode
                searchable
                disabled={isMic}
                // getApi="/models-dropdown"
            />
        </div>
    );
}