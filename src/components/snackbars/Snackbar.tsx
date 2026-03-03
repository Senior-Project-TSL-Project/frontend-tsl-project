"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Toast } from "@/stores/useToastStore";
import { Text } from "../typography/Text";

interface SnackbarProps {
    toast: Toast;
    onClose: () => void;
}

export function Snackbar({ toast, onClose }: SnackbarProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Fade in
        setTimeout(() => setIsVisible(true), 10);

        // Auto fade out before duration ends
        const duration = toast.duration ?? 3000;
        const fadeOutTimer = setTimeout(() => {
            setIsVisible(false);
        }, duration - 300); // Start fade out 300ms before removal

        return () => {
            clearTimeout(fadeOutTimer);
        };
    }, [toast.duration]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation
    };

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return "mdi:check-circle";
            case 'error':
                return "mdi:alert-circle";
            case 'warning':
                return "mdi:alert";
            case 'info':
            default:
                return "mdi:information";
        }
    };

    return (
        <div
            className={`
                flex items-center gap-3
                px-(--snackbar-spacing-p-x)
                h-12
                bg-(--snackbar-bg)
                text-(--snackbar-label)
                rounded-(--snackbar-border-radius)
                shadow-lg
                transition-all duration-300 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
            `}
        >
            <Text size="small" weight="small" type="body" className="flex-1">{toast.message}</Text>
        </div>
    );
}
