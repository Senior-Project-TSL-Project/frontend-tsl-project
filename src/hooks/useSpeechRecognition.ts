import { useEffect, useRef, useState } from 'react';

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
}

interface SpeechRecognitionInstance {
    lang: string;
    interimResults: boolean;
    continuous: boolean;
    onstart: () => void;
    onend: () => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    start: () => void;
    stop: () => void;
}

interface ExtendedWindow extends Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
}

interface UseSpeechRecognitionOptions {
    lang?: string;
    continuous?: boolean;
    interimResults?: boolean;
    onEnd?: (finalText: string) => void;
    onError?: (error: string) => void;
}

export function useSpeechRecognition(options: UseSpeechRecognitionOptions = {}) {
    const {
        lang = 'th-TH',
        continuous = false,
        interimResults = true,
        onEnd,
        onError
    } = options;

    const [isListening, setIsListening] = useState(false);
    const [interimText, setInterimText] = useState('');
    const [finalText, setFinalText] = useState('');
    const [isSupported, setIsSupported] = useState(true);

    const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
    const finalTextRef = useRef('');

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const win = window as unknown as ExtendedWindow;
            const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

            if (!SpeechRecognition) {
                setIsSupported(false);
                return;
            }

            const recognition = new SpeechRecognition();

            recognition.lang = lang;
            recognition.interimResults = interimResults;
            recognition.continuous = continuous;

            recognition.onstart = () => {
                console.log("Speech recognition started");
            };

            recognition.onend = () => {
                console.log("Speech recognition ended");
                const text = finalTextRef.current.trim();
                if (onEnd && text) {
                    onEnd(text);
                }
                setIsListening(false);
            };

            recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
                
                if (event.error === 'not-allowed') {
                    if (onError) {
                        onError('Microphone permission denied');
                    }
                } else if (event.error !== 'aborted') {
                    if (onError) {
                        onError(`Speech recognition error: ${event.error}`);
                    }
                }
            };

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                let interim = "";
                let final = "";

                // รวม transcript ทั้งหมด
                for (let i = 0; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        final += transcript + " ";
                    } else {
                        interim += transcript;
                    }
                }

                finalTextRef.current = final;
                setFinalText(final);
                setInterimText(interim);
            };

            recognitionRef.current = recognition;
        }

        return () => {
            if (recognitionRef.current) {
                try {
                    recognitionRef.current.stop();
                } catch (error) {
                    console.error("Error stopping recognition:", error);
                }
            }
        };
    }, [lang, continuous, interimResults, onEnd, onError]);

    const start = () => {
        if (!isSupported) {
            console.error("Speech recognition is not supported in this browser");
            return;
        }

        if (recognitionRef.current && !isListening) {
            try {
                recognitionRef.current.start();
                setInterimText('');
                setFinalText('');
                finalTextRef.current = '';
                setIsListening(true);
            } catch (error) {
                console.error("Error starting recognition:", error);
            }
        }
    };

    const stop = () => {
        if (recognitionRef.current && isListening) {
            try {
                recognitionRef.current.stop();
            } catch (error) {
                console.error("Error stopping recognition:", error);
            }
        }
    };

    const toggle = () => {
        if (isListening) {
            stop();
        } else {
            start();
        }
    };

    return {
        isListening,
        interimText,
        finalText,
        isSupported,
        start,
        stop,
        toggle
    };
}
