// useDropdownData Hook (Single Responsibility Principle)
// Handles data fetching and transformation

import { useState, useEffect, useRef } from "react";
import { DropdownItemProps } from "../DropdownItem";
import { DropdownDataService } from "../services/DropdownDataService";

interface UseDropdownDataOptions {
    items?: DropdownItemProps[];
    endpoint?: string;
    valueKey?: string;
    labelKey?: string;
    onLoading?: (isLoading: boolean) => void;
    onLoadComplete?: (data: DropdownItemProps[]) => void;
    dataService?: DropdownDataService; // Dependency Injection
}

export function useDropdownData({
    items,
    endpoint,
    valueKey,
    labelKey,
    onLoading,
    onLoadComplete,
    dataService
}: UseDropdownDataOptions) {
    const [data, setData] = useState<DropdownItemProps[] | null>(items || null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Use refs to avoid re-fetching when callbacks change
    const onLoadingRef = useRef(onLoading);
    const onLoadCompleteRef = useRef(onLoadComplete);

    useEffect(() => {
        onLoadingRef.current = onLoading;
        onLoadCompleteRef.current = onLoadComplete;
    }, [onLoading, onLoadComplete]);

    useEffect(() => {
        const fetchData = async () => {
            if (!endpoint) return;

            try {
                onLoadingRef.current?.(true);
                setIsLoading(true);
                setError(null);

                // Use injected service or create default one
                const service = dataService || DropdownDataService.createDefault(valueKey, labelKey);
                const result = await service.fetchAndTransform(endpoint);

                setData(result);
                onLoadCompleteRef.current?.(result);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error'));
                console.error('Error fetching dropdown data:', err);
            } finally {
                onLoadingRef.current?.(false);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [endpoint, valueKey, labelKey, dataService]);

    return { data, isLoading, error };
}
