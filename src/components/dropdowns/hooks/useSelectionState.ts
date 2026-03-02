// useSelectionState Hook (Single Responsibility Principle)
// Handles selection state management with controlled/uncontrolled pattern

import { useState, useEffect, useRef } from "react";
import { DropdownItemProps } from "../DropdownItem";

interface UseSelectionStateOptions {
    items: DropdownItemProps[] | null;
    selectedId?: string | null;
    onSelectionChange?: (selectedId: string | null) => void;
    canClearSelected?: boolean;
    defaultSelectedId?: string;
}

export function useSelectionState({
    items,
    selectedId: controlledSelectedId,
    onSelectionChange,
    canClearSelected = false,
    defaultSelectedId
}: UseSelectionStateOptions) {
    const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);
    const hasSetDefaultRef = useRef(false);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const isControlled = controlledSelectedId !== undefined;

    // Keep ref updated
    useEffect(() => {
        onSelectionChangeRef.current = onSelectionChange;
    }, [onSelectionChange]);

    // Auto-select first item if not clearable
    useEffect(() => {
        if (!hasSetDefaultRef.current && !isControlled && !canClearSelected && items && items.length > 0) {
            const defaultId = defaultSelectedId || items.find(item => item.id && !item.disabled)?.id || null;
            if (defaultId) {
                hasSetDefaultRef.current = true;
                setInternalSelectedId(defaultId);
                onSelectionChangeRef.current?.(defaultId);
            }
        }
    }, [items, canClearSelected, defaultSelectedId, isControlled]);

    // For controlled mode, trigger callback if selectedId is null and should auto-select
    useEffect(() => {
        if (isControlled && controlledSelectedId === null && !canClearSelected && items && !hasSetDefaultRef.current) {
            const defaultId = defaultSelectedId || items.find(item => item.id && !item.disabled)?.id || null;
            if (defaultId) {
                hasSetDefaultRef.current = true;
                onSelectionChangeRef.current?.(defaultId);
            }
        }
    }, [controlledSelectedId, canClearSelected, defaultSelectedId, items, isControlled]);

    const currentSelectedId = isControlled ? controlledSelectedId : internalSelectedId;
    const selectedItem = items?.find(item => item.id === currentSelectedId && !item.disabled) || null;

    const handleSelect = (newSelectedId: string | null) => {
        if (!isControlled) {
            setInternalSelectedId(newSelectedId);
        }
        onSelectionChange?.(newSelectedId);
    };

    return {
        selectedId: currentSelectedId,
        selectedItem,
        handleSelect,
        isControlled
    };
}
