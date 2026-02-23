"use client";

import { IconButton } from "@/components/buttons/IconButton";
import { MobileTranslatorDivider } from "@/components/dividers/MobileTranslatorDivider";
import { TextArea } from "@/components/inputs/TextArea";
import { useTranslateStore } from "@/stores/useTranslateStore";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface ExtendedWindow extends Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
}

export function TranslateTextBox() {
    const [interimText, setInterimText] = useState('');
    const [fullText, setFullText] = useState('');
    const {
        sourceLang,
        targetLang,
        model,
        textInput,
        setTextInput,
        translationResult,
        isLoading,
        setTranslationResult,
        setIsLoading,
        isMic,
        setIsMic
    } = useTranslateStore();

    const recognitionRef = useRef<any>(null);
    const fullTextRef = useRef('');

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
                    model: model
                });

                if (response.data.gloss) {
                    // Extract text from <tsl>...</tsl> tag using regex
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
    }, [textInput, model, setTranslationResult, setIsLoading]);

    const handleCopy = async () => {
        if (translationResult) {
            try {
                await navigator.clipboard.writeText(translationResult);
                // TODO: Add a toast notification here
            } catch (error) {
                console.error('Failed to copy:', error);
            }
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // ดึง window มาใส่ตัวแปรที่เราระบุกฎไว้แล้ว
            const win = window as unknown as ExtendedWindow;
            const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

            if (!SpeechRecognition) {
                // TODO: Add notification for unsupported browser.
                return;
            }

            const recognition = new SpeechRecognition();

            recognition.lang = 'th-TH';
            recognition.interimResults = true;
            recognition.continuous = false;

            recognition.onstart = () => {
                setIsMic(true);
            };

            recognition.onend = () => {
                setIsMic(false);
                setTextInput(fullTextRef.current);
            };

            recognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsMic(false);
                if (event.error === 'not-allowed') {
                    // TODO: แจ้งเตือนให้ผู้ใช้อนุญาตไมโครโฟน
                } else {
                    // TODO: แจ้งเตือนเกิดข้อผิดพลาดในการรับเสียง
                }
            };

            recognition.onresult = (event: any) => {
                let currentInterim = "";
                let currentFinal = "";

                // วนลูปอ่านผลลัพธ์ที่ล่ามจดมาได้
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        currentFinal += transcript + " ";
                    } else {
                        currentInterim += transcript;
                    }
                }

                setFullText((prevText) => {
                    const newFullText = prevText + currentFinal;
                    fullTextRef.current = newFullText;
                    return newFullText;
                });
                setInterimText(currentInterim);
            };

            recognitionRef.current = recognition;
        }
    }, []);

    useEffect(() => {
        if (recognitionRef.current) {
            if (isMic) {
                recognitionRef.current.start();
                setInterimText('');
                setFullText('');
                fullTextRef.current = '';
                setTextInput('');
            } else {
                recognitionRef.current.stop();
            }
        }
    }, [isMic]);

    return (
        <>
            <div className="min-h-35 py-2 gap-4">
                {/* Source */}
                <div className="flex flex-col px-3 min-h-35">
                    {textInput && <div className="flex flex-row">
                        <span className="text-sm">{sourceLang.text}</span>
                        {/* TODO: Add chip here */}
                        <span className="ml-auto text-sm font-medium text-(--chip-brand-content-label) px-2 py-1" onClick={() => setTextInput("")}>clear</span>
                    </div>}
                    <div className="flex flex-row">
                        <TextArea
                            value={textInput}
                            onChange={setTextInput}
                            placeholder={isMic ? fullText + interimText || "Listening..." : "Enter text to translate"}
                            disabled={isMic}
                        />
                    </div>
                    <div className="flex flex-row mt-6"></div>
                </div>

                {textInput && <>
                    <MobileTranslatorDivider />

                    {/* Target */}
                    <div className="flex flex-col px-3 min-h-35">
                        <div className="flex flex-row gap-1 text-(--text-box-content-title-selected)">
                            <Icon icon="material-symbols:sign-language" className="text-[16px]" />
                            <span className="text-sm">
                                {targetLang.text}
                            </span>
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
                        <div className="flex flex-row mt-6">
                            <IconButton icon="material-symbols:tune-rounded" size={24} pattern="brand-primary" />
                            <div className="w-full">
                                {/* TODO: Tag here */}

                            </div>
                            <IconButton
                                icon="material-symbols:content-copy-outline"
                                size={24}
                                pattern="brand-primary"
                                onClick={handleCopy}
                            />
                        </div>
                    </div>
                </>}
            </div>
        </>
    );
}