// useDropdownPosition Hook (Single Responsibility Principle)
// Handles dropdown positioning logic

import { useLayoutEffect, useState, RefObject } from "react";
import { DropdownPosition } from "../types";

interface UseDropdownPositionOptions {
    isOpen: boolean;
    containerRef: RefObject<HTMLElement | null>;
    dropdownRef: RefObject<HTMLElement | null>;
}

export function useDropdownPosition({
    isOpen,
    containerRef,
    dropdownRef
}: UseDropdownPositionOptions) {
    const [position, setPosition] = useState<DropdownPosition>("bottom");
    const [isCalculated, setIsCalculated] = useState(false);

    useLayoutEffect(() => {
        if (!isOpen) {
            setIsCalculated(false);
            return;
        }

        if (isOpen && containerRef.current && dropdownRef.current && !isCalculated) {
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
                setPosition(newPosition);
                setIsCalculated(true);
            });
        }
    }, [isOpen, isCalculated, containerRef, dropdownRef]);

    return { position, isCalculated };
}
