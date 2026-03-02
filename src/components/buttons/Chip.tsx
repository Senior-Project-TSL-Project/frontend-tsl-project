"use client";

import { Icon } from "@iconify/react";
import { useInteractionState } from "@/hooks/useInteractionState";
import { useMergedHandlers } from "@/hooks/useMergedHandlers";

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    pattern?: "brand" | "brand-secondary";
    size?: 26 | 36;
    state?: "default" | "hovered" | "pressed" | "focused" | "disabled";
    icon?: string;
}

export function Chip({ 
    icon,
    label, 
    pattern = "brand-secondary",
    size = 26,
    state: externalState,
    disabled,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur,
    className = "",
    ...props 
}: ChipProps) {
    const { currentState, handlers } = useInteractionState({ 
        disabled, 
        externalState 
    });
    const mergedHandlers = useMergedHandlers<HTMLButtonElement>(handlers, {
        onMouseEnter,
        onMouseLeave,
        onMouseDown,
        onMouseUp,
        onFocus,
        onBlur
    });

    // Pattern styles using CSS variables from design tokens
    const patternStyles = {
        "brand": {
            default: "bg-transparent text-[var(--chip-brand-content-label)]",
            hovered: "bg-[var(--chip-brand-bg-state-hovered)] text-[var(--chip-brand-content-label)]",
            pressed: "bg-[var(--chip-brand-bg-state-pressed)] text-[var(--chip-brand-content-label)]",
            focused: "bg-[var(--chip-brand-bg-state-focused)] text-[var(--chip-brand-content-label)]",
            disabled: "bg-transparent text-[var(--chip-brand-content-label-disabled)]",
        },
        "brand-secondary": {
            default: "bg-[var(--chip-brand-secondary-bg-default)] text-[var(--chip-brand-secondary-content-label)]",
            hovered: "bg-[var(--chip-brand-secondary-bg-default)] text-[var(--chip-brand-secondary-content-label)] relative before:content-[''] before:absolute before:inset-0 before:bg-[var(--chip-brand-secondary-bg-state-hovered)] before:rounded-[var(--chip-radius)]",
            pressed: "bg-[var(--chip-brand-secondary-bg-default)] text-[var(--chip-brand-secondary-content-label)] relative before:content-[''] before:absolute before:inset-0 before:bg-[var(--chip-brand-secondary-bg-state-pressed)] before:rounded-[var(--chip-radius)]",
            focused: "bg-[var(--chip-brand-secondary-bg-default)] text-[var(--chip-brand-secondary-content-label)] relative before:content-[''] before:absolute before:inset-0 before:bg-[var(--chip-brand-secondary-bg-state-focused)] before:rounded-[var(--chip-radius)]",
            disabled: "bg-[var(--chip-brand-secondary-bg-disabled)] text-[var(--chip-brand-secondary-content-label-disabled)]",
        }
    };
    
    const sizeStyles = {
        26: "h-[26px] px-[var(--chip-shared-size-26-spacing-p-x)] py-[var(--chip-shared-size-26-spacing-p-y)] gap-[var(--chip-shared-size-26-spacing-gap)] text-sm",
        36: "h-[36px] px-[var(--chip-shared-size-36-spacing-p-x)] py-[var(--chip-shared-size-36-spacing-p-y)] gap-[var(--chip-shared-size-36-spacing-gap)] text-sm"
    };

    const iconSizeStyles = {
        26: "text-sm",
        36: "text-xl"
    };
    
    const chipClasses = `
        ${sizeStyles[size]}
        ${patternStyles[pattern][currentState]}
        ${className}
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        rounded-[var(--chip-radius)]
        inline-flex
        items-center
        justify-center
        font-medium
        transition-all
        duration-200
        outline-none
    `.trim().replace(/\s+/g, ' ');
    
    return (
        <button 
            {...props}
            disabled={disabled}
            className={chipClasses}
            {...mergedHandlers}
        >
            {icon && <Icon icon={icon} className={`pointer-events-none ${iconSizeStyles[size]} relative z-10`} />}
            {label && <span className="relative z-10">{label}</span>}
        </button>
    );
}