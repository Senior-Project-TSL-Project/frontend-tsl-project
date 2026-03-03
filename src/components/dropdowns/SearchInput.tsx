"use client";

import { Icon } from "@iconify/react";
import { IconButton } from "../buttons/IconButton";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function SearchInput({
    value,
    onValueChange,
    placeholder = "Search",
    className = "",
    ...props
}: SearchInputProps) {
    return (
        <div className={`relative ${className}`}>
            <Icon 
                icon="mdi:magnify" 
                width={20} 
                height={20} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-(--dropdown-menu-item-shared-content-icon)"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2 bg-(--input-tertiary-bg-default) text-base font-medium rounded-full focus:outline-none focus:border-transparent placeholder:text-[--input-tertiary-label-empty] caret-(--text-box-content-body-state-typing)"
                {...props}
            />
            {value && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <IconButton
                        icon="material-symbols:close-rounded" 
                        pattern="primary" 
                        size={16} 
                        onClick={() => onValueChange("")}
                    />
                </div>
            )}
        </div>
    );
}
