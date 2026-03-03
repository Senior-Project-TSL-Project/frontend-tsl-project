// Dropdown Data Service (Single Responsibility + Dependency Inversion)

import axios from "axios";
import { DropdownItemProps } from "../DropdownItem";
import { IDropdownDataFetcher, IDropdownDataTransformer } from "../types";

// Default transformer
export class DefaultDropdownDataTransformer implements IDropdownDataTransformer {
    constructor(
        private valueKey?: string,
        private labelKey?: string
    ) {}

    transform(item: unknown): DropdownItemProps {
        const data = item as Record<string, unknown>;
        return {
            id: this.valueKey ? String(data[this.valueKey] ?? '') : String(data.id ?? ''),
            label: this.labelKey ? String(data[this.labelKey] ?? '') : String(data.label ?? ''),
            icon: data.icon as string | undefined,
            disabled: data.disabled as boolean | undefined
        };
    }
}

// Axios-based fetcher (can be replaced with other implementations)
export class AxiosDropdownDataFetcher implements IDropdownDataFetcher {
    async fetch(endpoint: string): Promise<unknown[]> {
        const response = await axios.get('/api' + endpoint);
        return response.data as unknown[];
    }
}

// Main data service (Open/Closed Principle - extendable)
export class DropdownDataService {
    constructor(
        private fetcher: IDropdownDataFetcher,
        private transformer: IDropdownDataTransformer
    ) {}

    async fetchAndTransform(endpoint: string): Promise<DropdownItemProps[]> {
        const rawData = await this.fetcher.fetch(endpoint);
        return rawData.map(item => this.transformer.transform(item));
    }

    // Factory method for easy creation
    static createDefault(valueKey?: string, labelKey?: string): DropdownDataService {
        return new DropdownDataService(
            new AxiosDropdownDataFetcher(),
            new DefaultDropdownDataTransformer(valueKey, labelKey)
        );
    }
}
