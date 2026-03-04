// useDropdownPosition Hook (Single Responsibility Principle)
// Handles dropdown positioning logic

import { useLayoutEffect, useState, RefObject, useRef } from "react";
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
    const isCalculatedRef = useRef(false);

    useLayoutEffect(() => {
        if (!isOpen) {
            isCalculatedRef.current = false;
            return;
        }

        if (isOpen && containerRef.current && dropdownRef.current && !isCalculatedRef.current) {
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
                isCalculatedRef.current = true;
            });
        }
    }, [isOpen, containerRef, dropdownRef]);

    return { position, isCalculatedRef };
}
