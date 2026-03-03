import { useState, useEffect } from 'react';
import { toast } from '@/stores/useToastStore';

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
            toast("Clipboard is not supported", { type: 'error' });
            return;
        }

        try {
            await navigator.clipboard.writeText(text).then(() => {
                toast("Copied to clipboard", { type: 'success' });
            });
        } catch (error) {
            toast("Failed to copy", { type: 'error' });
        }
    } 

    const readToClipboard = async () => {
        if (!isClipboardSupported) {
            toast("Clipboard is not supported", { type: 'error' });
            return null;
        }

        try {
            const text = await navigator.clipboard.readText();
            setClipboardText(text);
            return text;
        } catch (error) {
            toast("Failed to read", { type: 'error' });
            return null;
        }
    }

    return { isClipboardSupported, isShowPaste, clipboardText, writeToClipboard, readToClipboard };
}