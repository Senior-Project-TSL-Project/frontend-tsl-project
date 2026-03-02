import { useRef, useEffect } from 'react';

interface TextAreaProps {
    value: string;
    onChange?: (value: string) => void;
    onSubmit?: () => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    isLoading?: boolean;
}
export function TextArea({
    value,
    onChange,
    onSubmit,
    placeholder = "Enter text to translate",
    disabled = false,
    className = "",
    isLoading = false
}: TextAreaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const auto_grow = (element: HTMLTextAreaElement) => {
        element.style.height = "23px";
        element.style.height = (element.scrollHeight) + "px";
    }

    useEffect(() => {
        if (textareaRef.current) {
            auto_grow(textareaRef.current);
        }
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.blur();
            onSubmit?.();
        }
    };

    return (
        <>
            {isLoading ? (
                <div className={`w-full h-5.75 rounded-(--loading-radius) animate-pulse bg-(--loading-bg-first) ${className}`} />
             ) :
            <textarea
                ref={textareaRef}
                className={`w-full h-5.75 resize-none overflow-hidden focus:outline-none text-[18px] placeholder:text(--text-box-content-body-state-empty) caret-(--text-box-content-body-state-typing)  ${className}`}
                onInput={(e) => auto_grow(e.target as HTMLTextAreaElement)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)
               }
                disabled={disabled}>
            </textarea>}
        </>
    );
}