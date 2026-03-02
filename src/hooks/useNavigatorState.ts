import { useState, useEffect } from 'react';

export function useNavigatorState() {
    const [isClipboardSupported, setIsClipboardSupported] = useState(false);
    const [clipboardText, setClipboardText] = useState<string | null>(null);
    const [isShowPaste, setIsShowPaste] = useState<boolean | null>(null);

    useEffect(() => {
        setIsClipboardSupported(!!navigator.clipboard && !!navigator.clipboard.writeText);
        updatePasteStatus();

        const handleClipboardChange = () => {
            updatePasteStatus();
        };

        window.addEventListener('focus', handleClipboardChange);

        return () => {
            window.removeEventListener('focus', handleClipboardChange);
        }
    }, []);

    const updatePasteStatus = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setIsShowPaste(text.length > 0);
        } catch (err) {
            setIsShowPaste(false); 
        }
    };

    const writeToClipboard = async (text: string) => {
        if (!isClipboardSupported) {
            alert("Clipboard API is not supported in this browser.");
            // TODO: Add "Clipboard API is not supported in this browser."
            return;
        }

        try {
            await navigator.clipboard.writeText(text).then(() => {
                alert("Text copied to clipboard!");
                // TODO: Add a toast notification here
            });
        } catch (error) {
            alert("Failed to copy to clipboard.");
            // TODO: Add "Failed to copy to clipboard." toast notification here
        }
    } 

    const readToClipboard = async () => {
        if (!isClipboardSupported) {
            alert("Clipboard API is not supported in this browser.");
            // TODO: Add "Clipboard API is not supported in this browser."
            return null;
        }

        try {
            const text = await navigator.clipboard.readText();
            setClipboardText(text);
            return text;
        } catch (error) {
            alert("Failed to read from clipboard.");
            // TODO: Add "Failed to read from clipboard." toast notification here
            return null;
        }
    }

    return { isClipboardSupported, isShowPaste, clipboardText, writeToClipboard, readToClipboard };
}