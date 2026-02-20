"use client";

import { Icon } from "@iconify/react";
import { useInteractionState } from "@/hooks/useInteractionState";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Browse icons at: https://icon-sets.iconify.design/
     */
    icon: string;
    pattern?: "primary" | "brand-primary" | "brand-inverted";
    size?: 20 | 40;
    state?: "default" | "hovered" | "pressed" | "focused" | "disabled";
}

export function IconButton({ 
    icon, 
    pattern = "primary", 
    size = 40, 
    state: externalState,
    disabled,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur,
    className = "",
    ...rest 
}: IconButtonProps) {
    const { currentState, handlers } = useInteractionState({ 
        disabled, 
        externalState 
    });
    
    // Pattern styles using CSS variables from design tokens
    const patternStyles = {
        "primary": {
            default: "bg-transparent text-[var(--icon-button-primary-content)]",
            hovered: "bg-[var(--icon-button-primary-bg-state-hovered)] text-[var(--icon-button-primary-content)]",
            pressed: "bg-[var(--icon-button-primary-bg-state-pressed)] text-[var(--icon-button-primary-content)]",
            focused: "bg-[var(--icon-button-primary-bg-state-focused)] text-[var(--icon-button-primary-content)]",
            disabled: "bg-transparent text-[var(--icon-button-primary-content)] opacity-40 cursor-not-allowed"
        },
        "brand-primary": {
            default: "bg-transparent text-[var(--icon-button-brand-content)]",
            hovered: "bg-[var(--icon-button-brand-bg-state-hovered)] text-[var(--icon-button-brand-content)]",
            pressed: "bg-[var(--icon-button-brand-bg-state-pressed)] text-[var(--icon-button-brand-content)]",
            focused: "bg-[var(--icon-button-brand-bg-state-focused)] text-[var(--icon-button-brand-content)]",
            disabled: "bg-transparent text-[var(--icon-button-brand-content)] opacity-40 cursor-not-allowed"
        },
        "brand-inverted": {
            default: "bg-[var(--icon-button-brand-inverted-bg-default)] text-[var(--icon-button-brand-inverted-content)] border-[var(--icon-button-shared-border-width)] border-transparent",
            hovered: "bg-[var(--icon-button-brand-inverted-bg-default)] text-[var(--icon-button-brand-inverted-content)] border-[var(--icon-button-shared-border-width)] border-[var(--icon-button-brand-inverted-bg-state-hovered)]",
            pressed: "bg-[var(--icon-button-brand-inverted-bg-default)] text-[var(--icon-button-brand-inverted-content)] border-[var(--icon-button-shared-border-width)] border-[var(--icon-button-brand-inverted-bg-state-pressed)]",
            focused: "bg-[var(--icon-button-brand-inverted-bg-default)] text-[var(--icon-button-brand-inverted-content)] border-[var(--icon-button-shared-border-width)] border-[var(--icon-button-brand-inverted-bg-state-focused)]",
            disabled: "bg-[var(--icon-button-brand-inverted-bg-default)] text-[var(--icon-button-brand-inverted-content)] opacity-40 cursor-not-allowed border-[var(--icon-button-shared-border-width)] border-transparent"
        }
    };
    
    // Size styles using CSS variables from design tokens
    const sizeStyles = {
        20: "p-[var(--icon-button-shared-spacing-size-20-p)] w-[calc(20px+var(--icon-button-shared-spacing-size-20-p)*2)] h-[calc(20px+var(--icon-button-shared-spacing-size-20-p)*2)]",
        40: "p-[var(--icon-button-shared-spacing-size-40-p)] w-[calc(40px+var(--icon-button-shared-spacing-size-40-p)*2)] h-[calc(40px+var(--icon-button-shared-spacing-size-40-p)*2)]"
    };
    
    // Merge handlers from hook with user-provided handlers
    const mergeHandlers = {
        onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
            handlers.onMouseEnter();
            onMouseEnter?.(e);
        },
        onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
            handlers.onMouseLeave();
            onMouseLeave?.(e);
        },
        onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => {
            handlers.onMouseDown();
            onMouseDown?.(e);
        },
        onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => {
            handlers.onMouseUp();
            onMouseUp?.(e);
        },
        onFocus: (e: React.FocusEvent<HTMLButtonElement>) => {
            handlers.onFocus();
            onFocus?.(e);
        },
        onBlur: (e: React.FocusEvent<HTMLButtonElement>) => {
            handlers.onBlur();
            onBlur?.(e);
        }
    };
    
    const buttonClasses = `
        ${sizeStyles[size]}
        ${patternStyles[pattern][currentState]}
        ${className}
        rounded-[var(--icon-button-shared-border-radius)]
        inline-flex
        items-center
        justify-center
        transition-all
        duration-200
        outline-none
    `.trim().replace(/\s+/g, ' ');
    
    return (
        <button 
            {...rest}
            disabled={disabled}
            className={buttonClasses}
            onMouseEnter={mergeHandlers.onMouseEnter}
            onMouseLeave={mergeHandlers.onMouseLeave}
            onMouseDown={mergeHandlers.onMouseDown}
            onMouseUp={mergeHandlers.onMouseUp}
            onFocus={mergeHandlers.onFocus}
            onBlur={mergeHandlers.onBlur}
        >
            <Icon icon={icon} width={size} height={size} />
        </button>
    );
}