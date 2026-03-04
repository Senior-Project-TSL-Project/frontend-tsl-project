// useSearchFilter Hook (Single Responsibility Principle)
// Handles search/filter logic

import { useState, useMemo } from "react";

interface Filterable {
    label: string;
    [key: string]: unknown;
}

export function useSearchFilter<T extends Filterable>(
    items: T[],
    searchable: boolean = true
) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = useMemo(() => {
        if (!searchable || !searchQuery) {
            return items;
        }

        return items.filter(item => 
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [items, searchQuery, searchable]);

    const clearSearch = () => setSearchQuery("");

    return {
        searchQuery,
        setSearchQuery,
        clearSearch,
        filteredItems,
        hasResults: filteredItems.length > 0
    };
}
