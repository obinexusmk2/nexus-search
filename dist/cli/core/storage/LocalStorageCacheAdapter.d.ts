import { KeyValueStorageAdapter } from './StorageAdapter';
import { MetricsResult } from '@/types';
/**
 * LocalStorage implementation of the KeyValueStorageAdapter interface
 * Provides persistent cache storage in browser environments using localStorage
 */
export declare class LocalStorageCacheAdapter implements KeyValueStorageAdapter {
    private readonly prefix;
    private isAvailable;
    private performanceMonitor;
    /**
     * Create a new LocalStorageCacheAdapter
     * @param prefix - Prefix for all keys to avoid collisions
     */
    constructor(prefix?: string);
    /**
     * Check if localStorage is available in this environment
     */
    private checkAvailability;
    /**
     * Initialize the adapter
     */
    initialize(): Promise<void>;
    /**
     * Get a value from localStorage
     * @param key - The key to look up
     * @returns The stored value or undefined if not found
     */
    get(key: string): Promise<string | undefined>;
    /**
     * Set a value in localStorage
     * @param key - The key to store under
     * @param value - The value to store
     */
    set(key: string, value: string): Promise<void>;
    /**
     * Remove a value from localStorage
     * @param key - The key to remove
     */
    remove(key: string): Promise<void>;
    /**
     * Get all keys in localStorage that match our prefix
     * @returns Array of keys with the prefix removed
     */
    keys(): Promise<string[]>;
    /**
     * Clear all values in localStorage that match our prefix
     */
    clear(): Promise<void>;
    /**
     * Close the adapter - no specific action needed for localStorage
     */
    close(): Promise<void>;
    /**
     * Get the estimated total size of localStorage in bytes
     */
    getTotalSize(): number;
    /**
     * Get the current used size of our prefixed entries in bytes
     */
    getUsedSize(): number;
    /**
     * Prune old entries if storage is getting full
     */
    private pruneOldEntries;
    /**
     * Check if localStorage is getting full (over 80% capacity)
     */
    isStorageNearlyFull(): boolean;
    /**
     * Get performance metrics
     */
    getMetrics(): MetricsResult;
}
//# sourceMappingURL=LocalStorageCacheAdapter.d.ts.map