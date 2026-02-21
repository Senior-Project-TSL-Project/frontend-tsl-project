"use client";

import { DropdownItem, DropdownItemProps } from "./DropdownItem";
import { useCallback, useState } from "react";
import { Text } from "../typography/Text";

interface DropdownItemGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    items: DropdownItemProps[];
    groupLabel?: string;
    selectedId?: string | null;
    onSelectionChange?: (selectedId: string | null) => void;
    canClearSelected?: boolean;
    defaultSelectedId?: string;
}

export function DropdownItemGroup({
    items,
    groupLabel,
    selectedId: controlledSelectedId,
    onSelectionChange,
    canClearSelected = false,
    defaultSelectedId,
    className = ""
}: DropdownItemGroupProps) {
    const [internalSelectedId, setInternalSelectedId] = useState<string | null>(() => {
        if (defaultSelectedId) return defaultSelectedId;
        if (!canClearSelected) {
            const firstItemWithId = items.find(item => item.id);
            return firstItemWithId?.id || null;
        }
        return null;
    });

    const isControlled = controlledSelectedId !== undefined;
    const selectedId = isControlled ? controlledSelectedId : internalSelectedId;

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

    return (
        <div className={`${className}`}>
            {groupLabel && <Text size="small" weight="medium" className="px-4">{groupLabel}</Text>}
            <div className="space-y-1 pt-2 rounded-2xl py-0.5 bg-(--dropdown-input-secondary-bg-default)">
                {items.map((item, index) => (
                    <DropdownItem
                        key={item.id || index}
                        {...item}
                        isSelected={item.id ? selectedId === item.id : item.isSelected}
                        onClick={() => handleItemClick(item)}
                    />
                ))}
            </div>
        </div>
    );
}