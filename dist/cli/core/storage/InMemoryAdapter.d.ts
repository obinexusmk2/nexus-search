import { BaseStorageAdapter } from './StorageAdapter';
import { IndexConfig, SerializedIndex, MetricsResult } from '@/types';
import { PerformanceMonitor } from '@/utils/PerformanceMonitor';
/**
 * In-memory implementation of the StorageAdapter interface
 * This provides a fast, volatile storage solution suitable for
 * testing, development, and non-persistent use cases.
 */
export declare class InMemoryAdapter extends BaseStorageAdapter {
    private storage;
    private metadataStorage;
    protected performanceMonitor: PerformanceMonitor;
    constructor();
    /**
     * Initialize the storage adapter
     */
    initialize(): Promise<void>;
    /**
     * Store an index with the given name
     * @param name - Unique identifier for the index
     * @param data - The serialized index data to store
     */
    storeIndex(name: string, data: SerializedIndex): Promise<void>;
    /**
     * Retrieve an index by its name
     * @param name - Unique identifier for the index
     * @returns The serialized index or null if not found
     */
    getIndex(name: string): Promise<SerializedIndex | null>;
    /**
     * Update metadata for a specific index
     * @param name - Unique identifier for the index
     * @param config - The configuration to update
     */
    updateMetadata(name: string, config: IndexConfig): Promise<void>;
    /**
     * Retrieve metadata for a specific index
     * @param name - Unique identifier for the index
     * @returns The index configuration or null if not found
     */
    getMetadata(name: string): Promise<IndexConfig | null>;
    /**
     * Remove an index from storage
     * @param name - Unique identifier for the index to remove
     */
    removeIndex(name: string): Promise<void>;
    /**
     * Clear all indices from storage
     */
    clearIndices(): Promise<void>;
    /**
     * Check if an index exists in storage
     * @param name - Unique identifier for the index
     * @returns Boolean indicating existence
     */
    hasIndex(name: string): Promise<boolean>;
    /**
     * List all available indices in storage
     * @returns Array of index names
     */
    listIndices(): Promise<string[]>;
    /**
     * Generic key-value storage get method
     * @param key - The key to look up
     * @returns The stored string value or undefined
     */
    get(key: string): Promise<string | undefined>;
    /**
     * Generic key-value storage set method
     * @param key - The key to store under
     * @param value - The string value to store
     */
    set(key: string, value: string): Promise<void>;
    /**
     * Generic key-value storage remove method
     * @param key - The key to remove
     */
    remove(key: string): Promise<void>;
    /**
     * Generic key-value storage keys method
     * @returns Array of all keys in the key-value store
     */
    keys(): Promise<string[]>;
    /**
     * Clear all data in storage
     */
    clear(): Promise<void>;
    /**
     * Close the storage adapter
     */
    close(): Promise<void>;
    /**
     * Get metrics for the adapter
     */
    getMetrics(): MetricsResult;
}
/**
 * Memory-based implementation of the KeyValueStorageAdapter interface
 * Specifically designed for caching use cases
 */
export declare class MemoryCacheAdapter {
    private storage;
    private readonly prefix;
    private performanceMonitor;
    constructor(prefix?: string);
    /**
     * Initialize the adapter - no-op for memory implementation
     */
    initialize(): Promise<void>;
    /**
     * Get a value from the cache
     * @param key - The key to look up
     * @returns The stored value or undefined
     */
    get(key: string): Promise<string | undefined>;
    /**
     * Set a value in the cache
     * @param key - The key to store under
     * @param value - The value to store
     */
    set(key: string, value: string): Promise<void>;
    /**
     * Remove a value from the cache
     * @param key - The key to remove
     */
    remove(key: string): Promise<void>;
    /**
     * Get all keys in the cache
     * @returns Array of keys (with prefix removed)
     */
    keys(): Promise<string[]>;
    /**
     * Close the adapter - no-op for memory implementation
     */
    close(): Promise<void>;
    /**
     * Clear all values in the cache
     */
    clear(): Promise<void>;
}
//# sourceMappingURL=InMemoryAdapter.d.ts.map