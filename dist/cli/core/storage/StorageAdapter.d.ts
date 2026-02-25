import { IndexConfig, SerializedIndex, MetricsResult } from "@/types";
import { PerformanceMonitor } from "@/utils/PerformanceMonitor";
/**
 * Core StorageAdapter interface that defines the contract for all storage implementations
 * used by the NexusSearch engine. All specific storage adapters should implement
 * this interface to ensure consistent behavior across different storage mechanisms.
 */
export interface StorageAdapter {
    /**
     * Initializes the storage adapter.
     * @returns A promise that resolves when initialization is complete
     */
    initialize(): Promise<void>;
    /**
     * Stores an index with the given name.
     * @param name - Unique identifier for the index
     * @param data - The serialized index data to store
     * @returns A promise that resolves when the operation is complete
     */
    storeIndex(name: string, data: SerializedIndex): Promise<void>;
    /**
     * Retrieves an index by its name.
     * @param name - Unique identifier for the index
     * @returns A promise that resolves with the index data, or null if not found
     */
    getIndex(name: string): Promise<SerializedIndex | null>;
    /**
     * Updates the metadata for a specific index.
     * @param name - Unique identifier for the index
     * @param config - The configuration to update
     * @returns A promise that resolves when the operation is complete
     */
    updateMetadata(name: string, config: IndexConfig): Promise<void>;
    /**
     * Retrieves the metadata for a specific index.
     * @param name - Unique identifier for the index
     * @returns A promise that resolves with the metadata, or null if not found
     */
    getMetadata(name: string): Promise<IndexConfig | null>;
    /**
     * Removes an index from storage.
     * @param name - Unique identifier for the index to remove
     * @returns A promise that resolves when the operation is complete
     */
    removeIndex(name: string): Promise<void>;
    /**
     * Clears all indices from storage.
     * @returns A promise that resolves when the operation is complete
     */
    clearIndices(): Promise<void>;
    /**
     * Checks if an index exists in storage.
     * @param name - Unique identifier for the index
     * @returns A promise that resolves with a boolean indicating existence
     */
    hasIndex(name: string): Promise<boolean>;
    /**
     * Lists all available indices in storage.
     * @returns A promise that resolves with an array of index names
     */
    listIndices(): Promise<string[]>;
    /**
     * Closes the storage adapter and releases any resources.
     * @returns A promise that resolves when the operation is complete
     */
    close(): Promise<void>;
    /**
     * Generic key-value storage methods for cache and other purposes
     */
    get?(key: string): Promise<string | undefined>;
    set?(key: string, value: string): Promise<void>;
    remove?(key: string): Promise<void>;
    keys?(): Promise<string[]>;
}
/**
 * Interface for key-value storage primarily used by CacheManager
 */
export interface KeyValueStorageAdapter {
    /**
     * Initializes the storage adapter.
     */
    initialize(): Promise<void>;
    /**
     * Retrieves a value from storage by its key
     * @param key - The unique key to look up
     * @returns The stored value or undefined if not found
     */
    get(key: string): Promise<string | undefined>;
    /**
     * Stores a value in storage with the given key
     * @param key - The unique key to store under
     * @param value - The value to store (serialized as string)
     */
    set(key: string, value: string): Promise<void>;
    /**
     * Removes a value from storage by its key
     * @param key - The unique key to remove
     */
    remove(key: string): Promise<void>;
    /**
     * Lists all available keys in storage
     * @returns An array of keys
     */
    keys(): Promise<string[]>;
    /**
     * Closes the storage adapter and releases any resources
     */
    close(): Promise<void>;
}
/**
 * Base implementation for storage adapters with common functionality
 */
export declare abstract class BaseStorageAdapter implements StorageAdapter {
    protected performanceMonitor: PerformanceMonitor;
    protected initialized: boolean;
    constructor();
    /**
     * Get performance metrics for the storage adapter
     */
    getMetrics(): MetricsResult;
    abstract initialize(): Promise<void>;
    abstract storeIndex(name: string, data: SerializedIndex): Promise<void>;
    abstract getIndex(name: string): Promise<SerializedIndex | null>;
    abstract updateMetadata(name: string, config: IndexConfig): Promise<void>;
    abstract getMetadata(name: string): Promise<IndexConfig | null>;
    abstract removeIndex(name: string): Promise<void>;
    abstract clearIndices(): Promise<void>;
    abstract hasIndex(name: string): Promise<boolean>;
    abstract listIndices(): Promise<string[]>;
    abstract close(): Promise<void>;
}
/**
 * Factory function that creates appropriate storage adapter based on environment
 * @param type - Type of storage adapter to create
 * @param options - Options for configuring the storage adapter
 * @returns A StorageAdapter instance
 */
export declare function createStorageAdapter(type: 'memory' | 'indexeddb' | 'filesystem' | 'localstorage', options?: Record<string, unknown>): StorageAdapter;
/**
 * Factory function specifically for key-value storage adapters
 * @param options - Options for configuring the storage adapter
 * @returns A KeyValueStorageAdapter instance
 */
export declare function createKeyValueStorageAdapter(options?: {
    type?: 'memory' | 'indexeddb' | 'localstorage';
    prefix?: string;
}): KeyValueStorageAdapter;
//# sourceMappingURL=StorageAdapter.d.ts.map