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
    const auto_grow = (element: HTMLTextAreaElement) => {
        element.style.height = "27px";
        element.style.height = (element.scrollHeight) + "px";
    }

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
                // TODO: Do loading here
                <div className={`w-full h-6.75 animate-pulse bg-(--loading-bg-first) ${className}`} />
             ) :
            <textarea
                className={`w-full h-6.75 resize-none overflow-hidden focus:outline-none text-[18px] placeholder:text(--text-box-content-body-state-empty) ${className}`}
                onInput={(e) => auto_grow(e.target as HTMLTextAreaElement)}
                onKeyDown={handleKeyDown}
                placeholder={disabled ? "" : placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}>
            </textarea>}
        </>
    );
}