// Dropdown Style Utilities (Open/Closed Principle)

import { DropdownPattern, DropdownSize } from "../types";

type InteractionState = "default" | "hovered" | "pressed" | "focused" | "disabled";

// Pattern styles using CSS variables from design tokens
export const DROPDOWN_PATTERN_STYLES: Record<DropdownPattern, Record<InteractionState, string>> = {
    "primary": {
        default: "bg-transparent text-[var(--dropdown-input-primary-label)]",
        hovered: "bg-[var(--dropdown-input-primary-bg-state-hovered)] text-[var(--dropdown-input-primary-label)]",
        pressed: "bg-[var(--dropdown-input-primary-bg-state-pressed)] text-[var(--dropdown-input-primary-label)]",
        focused: "bg-[var(--dropdown-input-primary-bg-state-focused)] text-[var(--dropdown-input-primary-label)]",
        disabled: "bg-transparent text-[var(--dropdown-input-primary-label)] opacity-50 cursor-not-allowed"
    },
    "secondary": {
        default: "bg-[var(--dropdown-input-secondary-bg-default)] text-[var(--dropdown-input-secondary-label-default)]",
        hovered: "bg-[var(--dropdown-input-secondary-bg-state-hovered)] text-[var(--dropdown-input-secondary-label-default)]",
        pressed: "bg-[var(--dropdown-input-secondary-bg-state-pressed)] text-[var(--dropdown-input-secondary-label-default)]",
        focused: "bg-[var(--dropdown-input-secondary-bg-state-focused)] text-[var(--dropdown-input-secondary-label-default)]",
        disabled: "bg-[var(--dropdown-input-secondary-bg-state-disabled)] text-[var(--dropdown-input-secondary-label-disabled)] cursor-not-allowed"
    },
    "tertiary": {
        default: "bg-[var(--dropdown-input-tertiary-bg-default)] text-[var(--dropdown-input-tertiary-label)]",
        hovered: "bg-[var(--dropdown-input-tertiary-bg-state-hovered)] text-[var(--dropdown-input-tertiary-label)]",
        pressed: "bg-[var(--dropdown-input-tertiary-bg-state-pressed)] text-[var(--dropdown-input-tertiary-label)]",
        focused: "bg-[var(--dropdown-input-tertiary-bg-state-focused)] text-[var(--dropdown-input-tertiary-label)]",
        disabled: "bg-[var(--dropdown-input-tertiary-bg-default)] text-[var(--dropdown-input-tertiary-label)] opacity-50 cursor-not-allowed"
    }
};

// Size-specific spacing
export const DROPDOWN_SIZE_STYLES: Record<DropdownSize, {
    height: string;
    gap: string;
    px: string;
    py: string;
}> = {
    36: {
        height: "h-9",
        gap: "gap-[var(--dropdown-input-shared-size-36-spacing-gap)]",
        px: "px-[var(--dropdown-input-shared-size-36-spacing-p-x)]",
        py: "py-[var(--dropdown-input-shared-size-36-spacing-p-y)]"
    },
    48: {
        height: "h-12",
        gap: "gap-[var(--dropdown-input-shared-size-48-spacing-gap)]",
        px: "px-[var(--dropdown-input-shared-size-48-spacing-p-x)]",
        py: "py-[var(--dropdown-input-shared-size-48-spacing-p-y)]"
    }
};

// Get icon color based on pattern
export function getDropdownIconColor(pattern: DropdownPattern): string {
    const colorMap: Record<DropdownPattern, string> = {
        primary: "var(--dropdown-input-primary-icon)",
        secondary: "var(--dropdown-input-secondary-icon)",
        tertiary: "var(--dropdown-input-tertiary-icon)"
    };
    return colorMap[pattern];
}

// Build button class names
export function buildDropdownButtonClasses(
    pattern: DropdownPattern,
    size: DropdownSize,
    state: InteractionState,
    disabled: boolean,
    className: string = ""
): string {
    const patternStyle = DROPDOWN_PATTERN_STYLES[pattern][state];
    const sizeStyle = DROPDOWN_SIZE_STYLES[size];

    return `
        ${patternStyle}
        ${sizeStyle.height}
        ${sizeStyle.px}
        ${sizeStyle.py}
        ${sizeStyle.gap}
        ${className}
        ${disabled ? "" : "cursor-pointer"}
        rounded-[var(--dropdown-input-radius)]
        w-full
        flex
        items-center
        justify-between
        text-left
        transition-all
        duration-200
        border-none
        outline-none
    `.trim().replace(/\s+/g, ' ');
}
