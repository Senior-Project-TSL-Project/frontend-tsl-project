"use client";

import { DropdownItem, DropdownItemProps } from "./DropdownItem";
import { useCallback } from "react";
import { Text } from "../typography/Text";
import { useSelectionState, useSearchFilter } from "./hooks";
import { SearchInput } from "../search/SearchInput";

interface DropdownItemGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    items: DropdownItemProps[];
    groupLabel?: string;
    selectedId?: string | null;
    onSelectionChange?: (selectedId: string | null) => void;
    canClearSelected?: boolean;
    defaultSelectedId?: string;
    searchable?: boolean;
    searchPlaceholder?: string;
    isMobile?: boolean;
}

export function DropdownItemGroup({
    items,
    groupLabel,
    selectedId: controlledSelectedId,
    onSelectionChange,
    canClearSelected = false,
    defaultSelectedId,
    searchable = true,
    searchPlaceholder = "Search",
    className = "",
    isMobile = false,
}: DropdownItemGroupProps) {
    // Custom hooks (Single Responsibility Principle)
    const { searchQuery, setSearchQuery, filteredItems } = useSearchFilter(items, searchable);
    
    const { selectedId, handleSelect } = useSelectionState({
        items,
        selectedId: controlledSelectedId,
        onSelectionChange,
        canClearSelected,
        defaultSelectedId
    });

    // Item click handler
    const handleItemClick = useCallback((item: DropdownItemProps) => {
        if (!item.id) {
            item.onClick?.(null as unknown as React.MouseEvent<HTMLButtonElement>);
            return;
        }

        const isCurrentlySelected = selectedId === item.id;
        
        if (isCurrentlySelected && canClearSelected) {
            handleSelect(null);
        } else if (!isCurrentlySelected) {
            handleSelect(item.id);
        }

        item.onClick?.(null as unknown as React.MouseEvent<HTMLButtonElement>);
    }, [selectedId, canClearSelected, handleSelect]);
    
    return (
        <div className={`${className}`}>
            {/* Search Input */}
            {searchable && (
                <div className={`pb-3 px-3 ${isMobile ? "pt-0" : "pt-3 border-b-[0.5px] border-(--dropdown-menu-menu-border-color)"} bg-white`}>
                    <SearchInput
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                        placeholder={searchPlaceholder}
                    />
                </div>
            )}

            <div className="px-3 py-4">
                {groupLabel && <Text size="small" weight="medium" className="px-4 mb-2 text-gray-600">{groupLabel}</Text>}
                
                <div className="space-y-1 px-1 py-0.5 rounded-2xl bg-(--dropdown-input-secondary-bg-default)">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                            <DropdownItem
                                key={item.id || index}
                                {...item}
                                isSelected={item.id ? selectedId === item.id : item.isSelected}
                                onClick={() => handleItemClick(item)}
                            />
                        ))
                    ) : <></> }
                </div>
            </div>
        </div>
    );
}