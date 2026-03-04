"use client";

import { IconButton } from "@/components/buttons/IconButton";
import { DropdownInput } from "@/components/dropdowns/DropdownInput";
import { DropdownPattern } from "@/components/dropdowns/types";
import { useTranslateStore } from "@/stores/useTranslateStore";
import { useState } from "react";

interface TranslatorSwapProps {
    pattern?: DropdownPattern;
    width?: number | string;
    align?: "left" | "center" | "right";
    useMobileMode?: boolean;
}

export function TranslatorSwap({ pattern = "primary", width = "100%", align = "left", useMobileMode }: TranslatorSwapProps) {
    const [isTargetLoading, setIsTargetLoading] = useState(false);
    const { sourceLang, targetLang, setSourceLang, setTargetLang, isMic } = useTranslateStore();
    const languageSourceOptions = [
        {
            id: "th",
            label: "Thai",
        },
    ]

    const [languageTargetOptions, setLanguageTargetOptions] = useState<{ id: string; label: string; disabled: boolean }[]>([]);

    const handleSourceChange = (id: string | null) => {
        if (id) {
            setSourceLang({
                id: id,
                label: languageSourceOptions.find(option => option.id === id)?.label || "",
            });
        }
    };

    const handleTargetChange = (id: string | null) => {
        if (id) {
            setTargetLang({
                id: id,
                label: languageTargetOptions.find(option => option.id === id)?.label || "",
            });
        }
    };

    const alignmentClass = align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : "";

    return (
        <div className={`flex flex-row px-3 ${alignmentClass}`} style={{ width }}>
            <DropdownInput
                pattern={pattern}
                bottomSheetTitle="Translate from"
                size={48}
                selectedId={sourceLang.id || null}
                onSelectionChange={handleSourceChange}
                items={languageSourceOptions}
                groupLabel="All Languages"
                useMobileMode={useMobileMode}
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
                pattern={pattern}
                bottomSheetTitle="Translate to"
                size={48}
                selectedId={targetLang.id || null}
                onSelectionChange={handleTargetChange}
                groupLabel="All Languages"
                useMobileMode={useMobileMode}
                searchable
                disabled={isMic || isTargetLoading}
                endpoint="/models-dropdown"
                onLoading={setIsTargetLoading}
                onLoadComplete={(data: any[]) => {
                    setLanguageTargetOptions(data)
                }}
                valueKey="id"
                labelKey="model"
            />
        </div>
    );
}