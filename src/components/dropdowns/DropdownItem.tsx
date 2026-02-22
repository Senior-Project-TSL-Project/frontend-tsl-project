"use client";

import { useInteractionState } from "@/hooks/useInteractionState";
import { useMergedHandlers } from "@/hooks/useMergedHandlers";
import { Icon } from "@iconify/react";
import { Text } from "@/components/typography/Text";

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Unique identifier for the item
     */
    id?: string;
    /**
     * Browse icons at: https://icon-sets.iconify.design/
     */
    icon?: string;
    pattern?: "primary";
    state?: "default" | "hovered" | "pressed" | "focused" | "disabled";
    text: string;
    isSelected?: boolean;
}

export function DropdownItem({
    icon,
    pattern = "primary",
    state: externalState,
    disabled,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur,
    className = "",
    text,
    isSelected = false,
    ...props
}: DropdownItemProps) {
    const { currentState, handlers } = useInteractionState({
        disabled,
        externalState
    })
    const mergedHandlers = useMergedHandlers<HTMLButtonElement>(handlers, {
        onMouseEnter,
        onMouseLeave,
        onMouseDown,
        onMouseUp,
        onFocus,
        onBlur
    })

    // Pattern styles using CSS variables from design tokens
    const patternStyles = {
        "primary": {
            default: "bg-transparent text-[var(--dropdown-menu-item-shared-content-title)]",
            hovered: "bg-[var(--dropdown-menu-item-state-hovered)] text-[var(--dropdown-menu-item-shared-content-title)]",
            pressed: "bg-[var(--dropdown-menu-item-state-pressed)] text-[var(--dropdown-menu-item-shared-content-title)]",
            focused: "bg-[var(--dropdown-menu-item-state-focused)] text-[var(--dropdown-menu-item-shared-content-title)]",
            disabled: "bg-transparent text-[var(--dropdown-menu-item-shared-content-title)]"
        }
    }

    const dropdownClasses = `
        ${patternStyles[pattern][currentState]}
        ${className}
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        rounded-[var(--dropdown-menu-item-shared-radius)]
        gap-[var(--dropdown-menu-item-shared-spacing-gap)]
        px-[var(--dropdown-menu-item-shared-spacing-p-x)]
        py-[var(--dropdown-menu-item-shared-spacing-p-y)]
        w-full
        h-[48px]
        text-left
        flex
        items-center
        transition-all
        duration-200
    `.trim().replace(/\s+/g, ' ');
    return (
        <button
            className={dropdownClasses}
            disabled={disabled}
            {...mergedHandlers}
            {...props}
        >
            {icon && <Icon icon={icon} width={20} height={20} />}
            <Text size="small" weight="medium" className="flex-1 px-1">{text}</Text>
            {isSelected && <Icon icon="material-symbols:check-small-rounded" width={20} height={20} />}
        </button>
    )
}