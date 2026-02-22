"use client";

import { DropdownItemGroup } from "./DropdownItemGroup";
import { DropdownItemProps } from "./DropdownItem";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Icon } from "@iconify/react";
import { useInteractionState } from "@/hooks/useInteractionState";
import { useMergedHandlers } from "@/hooks/useMergedHandlers";
import { Text } from "@/components/typography/Text";
import { BottomSheet } from "@/components/mobile/BottomSheet/BottomSheet";

interface DropdownInputProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
    items: DropdownItemProps[];
    pattern?: "primary" | "secondary" | "tertiary";
    size?: 36 | 48;
    placeholder?: string;
    selectedId?: string | null;
    onSelectionChange?: (selectedId: string | null) => void;
    canClearSelected?: boolean;
    defaultSelectedId?: string;
    state?: "default" | "hovered" | "pressed" | "focused" | "disabled";
    className?: string;
    useMobileMode?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
    bottomSheetTitle?: string;
    groupLabel?: string;
}

export function DropdownInput({
    items,
    pattern = "primary",
    size = 48,
    placeholder = "Select an option",
    selectedId,
    onSelectionChange,
    canClearSelected = false,
    defaultSelectedId,
    state: externalState,
    disabled,
    className = "",
    useMobileMode = false,
    searchable = false,
    searchPlaceholder = "Search",
    bottomSheetTitle = "Select an option",
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur,
    groupLabel,
    ...props
}: DropdownInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">("top");
    const [isPositionCalculated, setIsPositionCalculated] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const hasSetDefaultRef = useRef(false);

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

    useEffect(() => {
        if (!hasSetDefaultRef.current && selectedId === null && !canClearSelected && onSelectionChange) {
            const defaultId = defaultSelectedId || items.find(item => item.id)?.id || null;
            if (defaultId) {
                hasSetDefaultRef.current = true;
                onSelectionChange(defaultId);
            }
        }
    }, [selectedId, canClearSelected, onSelectionChange, defaultSelectedId, items]);

    const selectedItem = items.find(item => item.id === selectedId);

    // Toggle dropdown or bottom sheet
    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(prev => {
                if (prev) {
                    setIsPositionCalculated(false);
                }
                return !prev;
            });
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useLayoutEffect(() => {
        if (isOpen && containerRef.current && dropdownRef.current && !isPositionCalculated) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const dropdownHeight = dropdownRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;

            const spaceAbove = containerRect.top;
            const spaceBelow = viewportHeight - containerRect.bottom;

            const newPosition =
                spaceAbove >= dropdownHeight ? "top" :
                    spaceBelow >= dropdownHeight ? "bottom" :
                        spaceAbove > spaceBelow ? "top" : "bottom";

            requestAnimationFrame(() => {
                setDropdownPosition(newPosition);
                setIsPositionCalculated(true);
            });
        }
    }, [isOpen, isPositionCalculated]);

    // Handle item slection
    const handleSelectionChange = (newSelectedId: string | null) => {
        onSelectionChange?.(newSelectedId);
        setIsOpen(false);
    };

    // Pattern styles using CSS variables from design tokens
    const patternStyles = {
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

    // Get icon color based on pattern
    const getIconColor = () => {
        if (pattern === "primary") return "var(--dropdown-input-primary-icon)";
        if (pattern === "secondary") return "var(--dropdown-input-secondary-icon)";
        return "var(--dropdown-input-tertiary-icon)";
    };

    // Size-specific spacing
    const sizeStyles = {
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

    const currentSizeStyle = sizeStyles[size];

    const buttonClasses = `
        ${patternStyles[pattern][currentState]}
        ${currentSizeStyle.height}
        ${currentSizeStyle.px}
        ${currentSizeStyle.py}
        ${currentSizeStyle.gap}
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

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Input Button */}
            <button
                ref={buttonRef}
                type="button"
                onClick={handleToggle}
                disabled={disabled}
                className={buttonClasses}
                {...mergedHandlers}
                {...props}
            >
                <div className={`flex items-center ${currentSizeStyle.gap} flex-1`}>
                    {selectedItem?.icon && (
                        <Icon
                            icon={selectedItem.icon}
                            width={20}
                            height={20}
                            style={{ color: getIconColor() }}
                        />
                    )}
                    <Text size="small" weight="medium" className="text-center">
                        {selectedItem?.text || placeholder}
                    </Text>
                </div>
                <Icon
                    icon="mdi:chevron-down"
                    width={20}
                    height={20}
                    style={{ color: getIconColor() }}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Mobile Mode - BottomSheet */}
            {useMobileMode ? (
                <BottomSheet
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title={bottomSheetTitle}
                >
                    <DropdownItemGroup
                        items={items}
                        selectedId={selectedId}
                        onSelectionChange={handleSelectionChange}
                        canClearSelected={canClearSelected}
                        defaultSelectedId={defaultSelectedId}
                        searchable={searchable}
                        groupLabel={groupLabel}
                        searchPlaceholder={searchPlaceholder}
                        isMobile={useMobileMode}
                    />
                </BottomSheet>
            ) : (
                /* Desktop Mode - Dropdown */
                isOpen && (
                    <div
                        ref={dropdownRef}
                        className={`
                            absolute left-0 right-0 z-50
                            bg-white border border-(--dropdown-menu-menu-border-color) rounded-2xl shadow-lg
                            max-h-60 overflow-y-auto
                            ${dropdownPosition === "top" ? "bottom-full mb-2" : "top-full mt-2"}
                        `.trim().replace(/\s+/g, ' ')}
                        style={{
                            // Ensure dropdown shows 5 items max (48px per item * 5 = 240px)
                            maxHeight: "240px"
                        }}
                    >
                        <DropdownItemGroup
                            items={items}
                            selectedId={selectedId}
                            onSelectionChange={handleSelectionChange}
                            canClearSelected={canClearSelected}
                            defaultSelectedId={defaultSelectedId}
                            groupLabel={groupLabel}
                            isMobile={useMobileMode}
                        />
                    </div>
                )
            )}
        </div>
    );
}
