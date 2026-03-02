// Dropdown Types and Interfaces (Interface Segregation Principle)

import { DropdownItemProps } from "./DropdownItem";

// Core dropdown types
export type DropdownPattern = "primary" | "secondary" | "tertiary";
export type DropdownSize = 36 | 48;
export type DropdownPosition = "top" | "bottom";

// Base dropdown configuration
export interface DropdownBaseConfig {
    pattern?: DropdownPattern;
    size?: DropdownSize;
    placeholder?: string;
}

// Selection management
export interface DropdownSelectionConfig {
    selectedId?: string | null;
    onSelectionChange?: (selectedId: string | null) => void;
    canClearSelected?: boolean;
    defaultSelectedId?: string;
}

// Data source configuration
export interface DropdownDataConfig {
    items?: DropdownItemProps[];
    endpoint?: string;
    valueKey?: string;
    labelKey?: string;
}

// Data loading callbacks
export interface DropdownDataCallbacks {
    onLoading?: (isLoading: boolean) => void;
    onLoadComplete?: (data: DropdownItemProps[]) => void;
}

// Display configuration
export interface DropdownDisplayConfig {
    useMobileMode?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
    bottomSheetTitle?: string;
    groupLabel?: string;
}

// Style configuration
export interface DropdownStyleConfig {
    className?: string;
    state?: "default" | "hovered" | "pressed" | "focused" | "disabled";
}

// Data transformation interface (Dependency Inversion)
export interface IDropdownDataTransformer {
    transform(item: unknown): DropdownItemProps;
}

// Data fetcher interface (Dependency Inversion)
export interface IDropdownDataFetcher {
    fetch(endpoint: string): Promise<unknown[]>;
}
