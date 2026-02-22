"use client";

import { Icon } from "@iconify/react";

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
                className="w-full pl-10 pr-10 py-2 bg-(--input-tertiary-bg-default) rounded-full focus:outline-none focus:border-transparent placeholder:text-gray-600"
                {...props}
            />
            {value && (
                <button
                    onClick={() => onValueChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    type="button"
                >
                    <Icon icon="mdi:close" width={20} height={20} />
                </button>
            )}
        </div>
    );
}
