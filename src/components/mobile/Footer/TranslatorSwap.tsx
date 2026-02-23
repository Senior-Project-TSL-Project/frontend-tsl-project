"use client";

import { IconButton } from "@/components/buttons/IconButton";
import { DropdownInput } from "@/components/dropdowns/DropdownInput";
import { useTranslateStore } from "@/stores/useTranslateStore";
import { useEffect, useState } from "react";

export function TranslatorSwap() {
    const [selectedLanguageSource, setSelectedLanguageSource] = useState<string | null>(null);
    const [selectedLanguageTarget, setSelectedLanguageTarget] = useState<string | null>(null);
    const { setSourceLang, setTargetLang, isMic } = useTranslateStore();
    const languageSourceOptions = [
        {
            id: "th",
            text: "Thai",
        },
    ]

    const languageTargetOptions = [
        {
            id: "tsl",
            text: "TSL (Thai)",
        },
    ]

    useEffect(() => {
        if (selectedLanguageSource) {
            setSourceLang({
                id: selectedLanguageSource,
                text: languageSourceOptions.find(option => option.id === selectedLanguageSource)?.text || "",
            });
        }
        if (selectedLanguageTarget) {
            setTargetLang({
                id: selectedLanguageTarget,
                text: languageTargetOptions.find(option => option.id === selectedLanguageTarget)?.text || "",
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLanguageSource, selectedLanguageTarget, setSourceLang, setTargetLang]);

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
            />
        </div>
    );
}