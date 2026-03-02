"use client";

import { IconButton } from "@/components/buttons/IconButton";
import { MobileTranslatorDivider } from "@/components/dividers/MobileTranslatorDivider";
import { TextArea } from "@/components/inputs/TextArea";
import { useTranslateStore } from "@/stores/useTranslateStore";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import axios from "axios";
import { Chip } from "@/components/buttons/Chip";
import { Text } from "@/components/typography/Text";
import { useNavigatorState } from "@/hooks/useNavigatorState";

export function TranslateTextBox() {
    const {
        sourceLang,
        targetLang,
        textInput,
        translationResult,
        isLoading,
        isMic,
        setTextInput,
        setTranslationResult,
        setIsLoading,
        setIsMic
    } = useTranslateStore();

    const {
        isListening,
        interimText,
        finalText,
        isSupported,
        start: startSpeechRecognition,
        stop: stopSpeechRecognition
    } = useSpeechRecognition({
        lang: 'th-TH',
        continuous: false,
        interimResults: true,
        onEnd: (text) => {
            setTextInput(text);
        },
        onError: (error) => {
            // TODO: Add toast notification
        }
    });

    const { writeToClipboard, readToClipboard, isShowPaste } = useNavigatorState();

    // Sync isListening with isMic
    useEffect(() => {
        setIsMic(isListening);
    }, [isListening, setIsMic]);

    // Control speech recognition based on isMic state
    useEffect(() => {
        if (isMic && !isListening) {
            setTextInput('');
            if (!isSupported) {
                alert("Speech recognition is not supported in this browser.");
                setIsMic(false);
                return;
            } else {
                startSpeechRecognition();
            }
        } else if (!isMic && isListening) {
            stopSpeechRecognition();
        }
    }, [isMic]);

    // API call with debounce
    useEffect(() => {
        if (!textInput.trim()) {
            setTranslationResult('', 0);
            return;
        }

        setIsLoading(true);

        const timer = setTimeout(async () => {
            setIsLoading(true);

            try {
                const response = await axios.post('/api/predict', {
                    text: textInput,
                    model: targetLang.id
                });

                if (response.data.gloss) {
                    // Extract text from <tsl>...</tsl> tag using regex
                    const thinkMatch = response.data.gloss.match(/<think>([\s\S]*?)<\/think>/);
                    const tslMatch = response.data.gloss.match(/<tsl>([\s\S]*?)<\/tsl>/);
                    const extractedText = tslMatch ? tslMatch[1].trim() : response.data.gloss;
                    setTranslationResult(extractedText, response.data.confidence || 0);
                }
            } catch (error) {
                console.error('Translation error:', error);
                setTranslationResult('เกิดข้อผิดพลาดในการแปล', 0);
            } finally {
                setIsLoading(false);
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [textInput, targetLang.id, setTranslationResult, setIsLoading]);

    const handleCopy = async (text: string) => {
        if (text) {
            await writeToClipboard(text);
        }
    };

    const handlePaste = async () => {
        const text = await readToClipboard();
        if (text) {
            setTextInput(text);
        }
    };

    return (
        <>
            <div className="min-h-35 py-2 gap-4">
                {/* Source */}
                <div className="flex flex-col px-3 min-h-35 gap-1">
                    {textInput && <div className="flex flex-row content-between items-center">
                        <Text type="label" size="medium" weight="medium">
                            {sourceLang.label}
                        </Text>
                        <Chip pattern="brand" size={26} label="Clear" onClick={() => setTextInput("")} />
                    </div>}
                    <div className="flex flex-row text-(--text-box-content-title-enabled)">
                        <TextArea
                            value={textInput}
                            onChange={setTextInput}
                            placeholder={isMic ? finalText + interimText || "Listening..." : targetLang.id ? "Enter text to translate" : "Please select a target language"}
                            disabled={isMic || !targetLang.id}
                        />
                    </div>
                    {textInput && (
                        <div className="flex flex-row mt-10 w-full justify-end">
                            <IconButton
                                icon="material-symbols:content-copy-outline"
                                size={24}
                                pattern="primary"
                                onClick={() => handleCopy(textInput)}
                            />
                        </div>
                    )}
                    {!textInput && (
                        <div className="flex flex-row mt-10 w-full justify-start">
                            {isShowPaste && <Chip pattern="brand-secondary" size={36} icon="material-symbols:file-copy-rounded" label={"Paste"} onClick={handlePaste} />}
                        </div>
                    )}
                </div>
                {textInput && <>
                    <MobileTranslatorDivider />
                    {/* Target */}
                    <div className="flex flex-col px-3 min-h-35 gap-1">
                        <div className="flex flex-row gap-1 text-(--text-box-content-title-selected) items-center">
                            <Icon icon="material-symbols:sign-language" className="text-[16px]" />
                            <Text type="label" size="medium" weight="medium">
                                {targetLang.label}
                            </Text>
                        </div>
                        <div className="flex flex-row text-(--text-box-content-body-state-selected)">
                            <TextArea
                                value={translationResult}
                                onChange={() => { }}
                                isLoading={isLoading}
                                placeholder=""
                                disabled
                            />
                        </div>
                        <div className="flex flex-row mt-10 justify-end">
                            <IconButton
                                icon="material-symbols:content-copy-outline"
                                size={24}
                                pattern="brand-primary"
                                onClick={() => handleCopy(translationResult)}
                            />
                        </div>
                    </div>
                </>}
            </div>
        </>
    );
}