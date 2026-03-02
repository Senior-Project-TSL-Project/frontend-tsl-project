import { useState, useEffect } from 'react';

export function useNavigatorState() {
    const [isClipboardSupported, setIsClipboardSupported] = useState(false);
    const [clipboardText, setClipboardText] = useState<string | null>(null);

    useEffect(() => {
        setIsClipboardSupported(!!navigator.clipboard && !!navigator.clipboard.writeText);
    }, []);

    const writeToClipboard = async (text: string) => {
        if (!isClipboardSupported) {
            // TODO: Add "Clipboard API is not supported in this browser."
            return;
        }

        try {
            await navigator.clipboard.writeText(text).then(() => {
                // TODO: Add a toast notification here
            });
        } catch (error) {
            // TODO: Add "Failed to copy to clipboard." toast notification here
        }
    } 

    const readToClipboard = async () => {
        if (!isClipboardSupported) {
            // TODO: Add "Clipboard API is not supported in this browser."
            return null;
        }

        try {
            const text = await navigator.clipboard.readText();
            setClipboardText(text);
            return text;
        } catch (error) {
            // TODO: Add "Failed to read from clipboard." toast notification here
            return null;
        }
    }

    return { isClipboardSupported, clipboardText, writeToClipboard, readToClipboard };
}