"use client";

import { DropdownItem, DropdownItemProps } from "./DropdownItem";
import { SearchInput } from "./SearchInput";
import { useCallback, useState } from "react";
import { Text } from "../typography/Text";

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
    const [searchQuery, setSearchQuery] = useState("");
    const [internalSelectedId, setInternalSelectedId] = useState<string | null>(() => {
        if (defaultSelectedId) return defaultSelectedId;
        if (!canClearSelected) {
            const firstItemWithId = items.find(item => item.id);
            return firstItemWithId?.id || null;
        }
        return null;
    });

    const isControlled = controlledSelectedId !== undefined;
    
    let selectedId = isControlled ? controlledSelectedId : internalSelectedId;
    
    if (selectedId === null && !canClearSelected) {
        if (defaultSelectedId) {
            selectedId = defaultSelectedId;
        } else {
            const firstItemWithId = items.find(item => item.id);
            selectedId = firstItemWithId?.id || null;
        }
    }

    const handleSelectionChange = useCallback((newSelectedId: string | null) => {
        if (!isControlled) {
            setInternalSelectedId(newSelectedId);
        }
        onSelectionChange?.(newSelectedId);
    }, [isControlled, onSelectionChange]);

    const handleItemClick = (item: DropdownItemProps) => {
        if (!item.id) {
            item.onClick?.(null as unknown as React.MouseEvent<HTMLButtonElement>);
            return;
        }

        const isCurrentlySelected = selectedId === item.id;
        
        if (isCurrentlySelected && canClearSelected) {
            handleSelectionChange(null);
        } else if (!isCurrentlySelected) {
            handleSelectionChange(item.id);
        }

        item.onClick?.(null as unknown as React.MouseEvent<HTMLButtonElement>);
    };

    // Filter items based on search query
    const filteredItems = searchable && searchQuery
        ? items.filter(item => 
            item.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : items;

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
                
                <div className="space-y-1 rounded-2xl bg-(--dropdown-input-secondary-bg-default)">
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