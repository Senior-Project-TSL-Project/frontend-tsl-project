interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    size?: "small" | "medium" | "large";
    weight?: "small" | "medium" | "large";
    type?: "display" | "headline" | "title" | "body" | "label";
}

export function Text({ children, size = "medium", weight = "small", type = "label", className = "" }: TextProps) {
    return (
        <span className={`${className} flex-1 block`}
            style={
                {
                    fontSize: `var(--typography-${type}-${size}-size)`,
                    fontWeight: `var(--typography-${type}-${weight}-weight)`
                }
            }
        >
            {children}
        </span>
    );
}