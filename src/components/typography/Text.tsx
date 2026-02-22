interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    size?: "small" | "medium" | "large";
    weight?: "normal" | "medium" | "bold";
}

export function Text({ children, size = "medium", weight = "normal", className = "" }: TextProps) {
    const sizeClasses = {
        small: "text-[var(--typography-label-small-size)]",
        medium: "text-[var(--typography-label-medium-size)]",
        large: "text-[var(--typography-label-large-size)]"
    };

    const weightClasses = {
        normal: "font-normal",
        medium: "font-medium",
        bold: "font-bold"
    };

    return (
        <span className={`${sizeClasses[size]} ${weightClasses[weight]} ${className} flex-1 block`}>
            {children}
        </span>
    );
}