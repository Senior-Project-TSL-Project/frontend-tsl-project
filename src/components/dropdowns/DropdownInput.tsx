"use client";

import { DropdownItemGroup } from "./DropdownItemGroup";
import { DropdownItemProps } from "./DropdownItem";
import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { useInteractionState } from "@/hooks/useInteractionState";
import { useMergedHandlers } from "@/hooks/useMergedHandlers";
import { Text } from "@/components/typography/Text";
import { 
    useDropdownPosition, 
    useDropdownData, 
    useSelectionState, 
    useClickOutside 
} from "./hooks";
import type {
    DropdownBaseConfig,
    DropdownSelectionConfig,
    DropdownDataConfig,
    DropdownDataCallbacks,
    DropdownDisplayConfig,
    DropdownStyleConfig
} from "./types";
import { 
    buildDropdownButtonClasses, 
    getDropdownIconColor,
    DROPDOWN_SIZE_STYLES,
    DROPDOWN_PATTERN_STYLES
} from "./utils/styles";
import { BottomSheet } from "../bottomSheet/BottomSheet";

// Consolidated interface using smaller interfaces (Interface Segregation Principle)
interface DropdownInputProps extends 
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'>,
    DropdownBaseConfig,
    DropdownSelectionConfig,
    DropdownDataConfig,
    DropdownDataCallbacks,
    DropdownDisplayConfig,
    DropdownStyleConfig {}

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
    endpoint,
    onLoading,
    onLoadComplete,
    valueKey,
    labelKey,
    ...props
}: DropdownInputProps) {
    // State
    const [isOpen, setIsOpen] = useState(false);
    
    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Custom hooks (Single Responsibility Principle)
    const { data: itemOptions, isLoading } = useDropdownData({
        items,
        endpoint,
        valueKey,
        labelKey,
        onLoading,
        onLoadComplete
    });

    const { selectedItem, handleSelect } = useSelectionState({
        items: itemOptions,
        selectedId,
        onSelectionChange,
        canClearSelected,
        defaultSelectedId
    });

    const { position: dropdownPosition, isCalculatedRef: isPositionCalculated } = useDropdownPosition({
        isOpen,
        containerRef,
        dropdownRef
    });

    useClickOutside(containerRef, () => setIsOpen(false), isOpen);

    // Interaction state
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

    // Handlers
    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(prev => !prev);
        }
    };

    const handleSelectionChange = (newSelectedId: string | null) => {
        handleSelect(newSelectedId);
        setIsOpen(false);
    };

    // Styles (using utility functions - Open/Closed Principle)
    const buttonClasses = buildDropdownButtonClasses(pattern, size, currentState, !!disabled, className);
    const iconColor = getDropdownIconColor(pattern);
    const currentSizeStyle = DROPDOWN_SIZE_STYLES[size];

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
                            style={{ color: iconColor }}
                        />
                    )}
                    <Text size="medium" weight="medium" className="text-center">
                        {isLoading ? "Loading..." : selectedItem?.label || placeholder}
                    </Text>
                </div>
                <Icon
                    icon="mdi:chevron-down"
                    width={20}
                    height={20}
                    style={{ color: iconColor }}
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
                        items={itemOptions || []}
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
                            items={itemOptions || []}
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
