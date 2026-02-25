import type { SearchEngine } from '../search/SearchEngine';

declare global {
    interface Window {
        NexusSearch: typeof SearchEngine;
    }
}

export {};