import { useState } from "react";

type InteractionState = "default" | "hovered" | "pressed" | "focused";

interface UseInteractionStateProps {
    disabled?: boolean;
    externalState?: InteractionState | "disabled";
}

interface UseInteractionStateReturn {
    currentState: InteractionState | "disabled";
    handlers: {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onMouseDown: () => void;
        onMouseUp: () => void;
        onFocus: () => void;
        onBlur: () => void;
    };
}

/**
 * Custom hook for managing interactive component states (hover, press, focus)
 * Can be used in controlled or uncontrolled mode
 * 
 * @param disabled - Whether the component is disabled
 * @param externalState - External state control (controlled mode)
 * @returns Current state and event handlers
 */
export function useInteractionState({ 
    disabled = false, 
    externalState 
}: UseInteractionStateProps = {}): UseInteractionStateReturn {
    const [internalState, setInternalState] = useState<InteractionState>("default");
    
    // Use external state if provided, otherwise use internal state
    const currentState = disabled ? "disabled" : (externalState || internalState);
    
    const handlers = {
        onMouseEnter: () => {
            if (!disabled && !externalState) {
                setInternalState("hovered");
            }
        },
        onMouseLeave: () => {
            if (!disabled && !externalState) {
                setInternalState("default");
            }
        },
        onMouseDown: () => {
            if (!disabled && !externalState) {
                setInternalState("pressed");
            }
        },
        onMouseUp: () => {
            if (!disabled && !externalState) {
                setInternalState("hovered");
            }
        },
        onFocus: () => {
            if (!disabled && !externalState) {
                setInternalState("focused");
            }
        },
        onBlur: () => {
            if (!disabled && !externalState) {
                setInternalState("default");
            }
        }
    };
    
    return {
        currentState,
        handlers
    };
}
