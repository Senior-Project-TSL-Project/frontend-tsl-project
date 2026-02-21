import { useMemo } from "react";

/**
 * User-provided event handlers that can be merged with interaction state handlers
 */
export interface UserHandlers<T extends HTMLElement = HTMLElement> {
    onMouseEnter?: (e: React.MouseEvent<T>) => void;
    onMouseLeave?: (e: React.MouseEvent<T>) => void;
    onMouseDown?: (e: React.MouseEvent<T>) => void;
    onMouseUp?: (e: React.MouseEvent<T>) => void;
    onFocus?: (e: React.FocusEvent<T>) => void;
    onBlur?: (e: React.FocusEvent<T>) => void;
}

/**
 * Interaction state handlers (from useInteractionState)
 */
export interface InteractionHandlers {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseDown: () => void;
    onMouseUp: () => void;
    onFocus: () => void;
    onBlur: () => void;
}

/**
 * Merged handlers that can be spread directly onto elements
 */
export interface MergedHandlers<T extends HTMLElement = HTMLElement> {
    onMouseEnter: (e: React.MouseEvent<T>) => void;
    onMouseLeave: (e: React.MouseEvent<T>) => void;
    onMouseDown: (e: React.MouseEvent<T>) => void;
    onMouseUp: (e: React.MouseEvent<T>) => void;
    onFocus: (e: React.FocusEvent<T>) => void;
    onBlur: (e: React.FocusEvent<T>) => void;
}

/**
 * Custom hook to merge interaction state handlers with user-provided handlers
 * 
 * @param interactionHandlers - Handlers from useInteractionState hook
 * @param userHandlers - Optional user-provided handlers to merge
 * @returns Merged handlers that call both interaction state and user handlers
 * 
 * @example
 * ```tsx
 * const { handlers } = useInteractionState({ disabled });
 * const mergedHandlers = useMergedHandlers<HTMLButtonElement>(handlers, {
 *   onMouseEnter,
 *   onFocus,
 * });
 * 
 * return <button {...mergedHandlers}>Click me</button>;
 * ```
 */
export function useMergedHandlers<T extends HTMLElement = HTMLElement>(
    interactionHandlers: InteractionHandlers,
    userHandlers?: UserHandlers<T>
): MergedHandlers<T> {
    return useMemo(() => ({
        onMouseEnter: (e: React.MouseEvent<T>) => {
            interactionHandlers.onMouseEnter();
            userHandlers?.onMouseEnter?.(e);
        },
        onMouseLeave: (e: React.MouseEvent<T>) => {
            interactionHandlers.onMouseLeave();
            userHandlers?.onMouseLeave?.(e);
        },
        onMouseDown: (e: React.MouseEvent<T>) => {
            interactionHandlers.onMouseDown();
            userHandlers?.onMouseDown?.(e);
        },
        onMouseUp: (e: React.MouseEvent<T>) => {
            interactionHandlers.onMouseUp();
            userHandlers?.onMouseUp?.(e);
        },
        onFocus: (e: React.FocusEvent<T>) => {
            interactionHandlers.onFocus();
            userHandlers?.onFocus?.(e);
        },
        onBlur: (e: React.FocusEvent<T>) => {
            interactionHandlers.onBlur();
            userHandlers?.onBlur?.(e);
        }
    }), [interactionHandlers, userHandlers]);
}
