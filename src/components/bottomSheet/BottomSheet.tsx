"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { useClickOutside } from "@/components/dropdowns/hooks";
import { HeaderBottomSheet } from "../screen/Header/HeaderBottomSheet";

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
    height = "75vh"
}: BottomSheetProps) {
    const sheetRef = useRef<HTMLDivElement>(null);

    // Close on backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useClickOutside(sheetRef, onClose, isOpen);
    
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
                <HeaderBottomSheet title={title} onClose={onClose} />

                {/* Content */}
                <div className="overflow-y-auto" style={{ height: `calc(${height} - 80px)` }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
