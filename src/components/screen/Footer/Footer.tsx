interface FooterProps {
    children?: React.ReactNode;
    className?: string;
}

export function Footer({ children, className }: FooterProps) {
    return (
        <footer className={`flex flex-col items-center justify-center h-51 gap-6 ${className}`}>
            {children}
        </footer>
    );
}