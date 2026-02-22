"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    height?: string;
}

export function BottomSheet({ 
    isOpen, 
    onClose, 
    title = "Select",
    children,
    height = "90vh"
}: BottomSheetProps) {
    const sheetRef = useRef<HTMLDivElement>(null);

    // Close on backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-end"
            onClick={handleBackdropClick}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-(--backdrop-bg) backdrop-blur-sm animate-fade-in" />
            
            {/* Bottom Sheet */}
            <div
                ref={sheetRef}
                className="bg-(--sheet-bg-body-mobile) relative w-full rounded-t-3xl shadow-2xl animate-slide-up"
                style={{ height }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white rounded-t-3xl">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <Icon icon="mdi:close" width={24} height={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto" style={{ height: `calc(${height} - 80px)` }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
