import { useEffect, useRef, useState, useCallback } from 'react';

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
    const [isSupported] = useState(() => {
    if (typeof window !== 'undefined') {
        const win = window as unknown as ExtendedWindow;
        const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
        return !!SpeechRecognition; 
    }
    return false;
});

    const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
    const finalTextRef = useRef('');
    const interimTextRef = useRef('');

    const onEndRef = useRef(onEnd);
    const onErrorRef = useRef(onError);

    useEffect(() => {
        onEndRef.current = onEnd;
        onErrorRef.current = onError;
    }, [onEnd, onError]);

    // Initialize speech recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const win = window as unknown as ExtendedWindow;
            const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

            if (!SpeechRecognition) {
                return;
            }

            const recognition = new SpeechRecognition();

            recognition.lang = lang;
            recognition.interimResults = interimResults;
            recognition.continuous = continuous;

            recognition.onstart = () => {
                console.log("Speech recognition started");
                setIsListening(true); 
            };

            recognition.onend = () => {
                console.log("Speech recognition ended");
                setIsListening(false);
                const text = finalTextRef.current.trim();
                // เรียกใช้งานผ่าน Ref แทน
                if (onEndRef.current && text) {
                    onEndRef.current(text);
                }
            };

            recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                setIsListening(false);
                
                if (event.error === 'not-allowed') {
                    const message = 'ไม่ได้รับอนุญาตให้ใช้ไมโครโฟน กรุณาตั้งค่าในการตั้งค่าเบราว์เซอร์';
                    if (onErrorRef.current) onErrorRef.current(message);
                } else if (event.error === 'no-speech') {
                    console.log('No speech detected');
                } else if (event.error === 'aborted') {
                    console.log('Speech recognition aborted');
                } else {
                    console.error('Speech recognition error:', event.error);
                    const message = `เกิดข้อผิดพลาด: ${event.error}`;
                    if (onErrorRef.current) onErrorRef.current(message);
                }
            };

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                let interim = "";
                let final = "";

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
                interimTextRef.current = interim;
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
    }, [lang, continuous, interimResults]); 

    const start = useCallback(() => {
        if (!isSupported) {
            console.error("Speech recognition is not supported in this browser");
            return;
        }

        if (recognitionRef.current && !isListening) {
            try {
                setInterimText('');
                setFinalText('');
                finalTextRef.current = ''; 
                
                recognitionRef.current.start();
            } catch (error) {
                console.error("Error starting recognition:", error);
            }
        }
    }, [isSupported, isListening]);

    const stop = useCallback(() => {
        if (recognitionRef.current && isListening) {
            try {
                recognitionRef.current.stop();
            } catch (error) {
                console.error("Error stopping recognition:", error);
            }
        }
    }, [isListening]);

    const toggle = useCallback(() => {
        if (isListening) {
            stop();
        } else {
            start();
        }
    }, [isListening, start, stop]);

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