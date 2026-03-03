"use client";

import { IconButton } from "@/components/buttons/IconButton";
import { DropdownInput } from "@/components/dropdowns/DropdownInput";
import { useTranslateStore } from "@/stores/useTranslateStore";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export function TranslatorSwap() {
    const [selectedLanguageSource, setSelectedLanguageSource] = useState<string | null>(null);
    const [selectedLanguageTarget, setSelectedLanguageTarget] = useState<string | null>(null);
    const [isTargetLoading, setIsTargetLoading] = useState(false);
    const { setSourceLang, setTargetLang, isMic } = useTranslateStore();
    const languageSourceOptions = [
        {
            id: "th",
            label: "Thai",
        },
    ]

    const [languageTargetOptions, setLanguageTargetOptions] = useState<{ id: string; label: string; disabled: boolean }[]>([]);

    useEffect(() => {
        if (selectedLanguageSource) {
            setSourceLang({
                id: selectedLanguageSource,
                label: languageSourceOptions.find(option => option.id === selectedLanguageSource)?.label || "",
            });
        }
        if (selectedLanguageTarget) {
            setTargetLang({
                id: selectedLanguageTarget,
                label: languageTargetOptions.find(option => option.id === selectedLanguageTarget)?.label || "",
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLanguageSource, selectedLanguageTarget, languageTargetOptions, setSourceLang, setTargetLang]);

    return (
        <div className="flex flex-row px-3 w-full">
            <DropdownInput
                pattern="secondary"
                bottomSheetTitle="Translate from"
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
                icon="material-symbols:arrow-right-alt-rounded"
                size={20}
                pattern="primary"
                justIcon
            />
            <DropdownInput
                pattern="secondary"
                bottomSheetTitle="Translate to"
                size={48}
                selectedId={selectedLanguageTarget}
                onSelectionChange={setSelectedLanguageTarget}
                groupLabel="All Languages"
                useMobileMode
                searchable
                disabled={isMic || isTargetLoading}
                endpoint="/models-dropdown"
                onLoading={setIsTargetLoading}
                onLoadComplete={(data: any[]) => {
                    console.log(data)
                    setLanguageTargetOptions(data)
                }}
                valueKey="id"
                labelKey="model"
            />
        </div>
    );
}