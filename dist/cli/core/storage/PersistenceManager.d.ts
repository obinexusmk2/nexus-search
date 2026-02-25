import { IndexConfig, SerializedIndex, StorageOptions } from "@/types";
import { CacheManager } from "./CacheManager";
/**
 * Options for PersistenceManager
 */
export interface PersistenceOptions {
    /**
     * Storage options
     */
    storage?: StorageOptions;
    /**
     * Cache options
     */
    cache?: {
        enabled: boolean;
        maxSize?: number;
        ttlMinutes?: number;
    };
    /**
     * Automatic fallback to in-memory storage if persistent storage fails
     */
    autoFallback?: boolean;
}
/**
 * PersistenceManager provides a unified interface for data persistence
 * with caching capabilities and fallback mechanisms.
 */
export declare class PersistenceManager {
    private adapter;
    private fallbackAdapter;
    private cache;
    private readonly options;
    private initialized;
    /**
     * Creates a new PersistenceManager instance.
     * @param options - Configuration options
     */
    constructor(options?: PersistenceOptions);
    /**
     * Creates a storage adapter based on the specified type.
     * @param type - Storage type ('memory' or 'indexeddb')
     * @returns The created storage adapter
     */
    private createAdapter;
    /**
     * Initializes the persistence manager and its components.
     */
    initialize(): Promise<void>;
    /**
     * Ensures the manager is initialized before operations.
     */
    private ensureInitialized;
    /**
     * Stores an index with caching.
     * @param name - Index name
     * @param data - Serialized index data
     */
    storeIndex(name: string, data: SerializedIndex): Promise<void>;
    /**
     * Retrieves an index with caching.
     * @param name - Index name
     * @returns The serialized index or null if not found
     */
    getIndex(name: string): Promise<SerializedIndex | null>;
    /**
     * Updates metadata for a specific index with caching.
     * @param name - Index name
     * @param config - Index configuration
     */
    updateMetadata(name: string, config: IndexConfig): Promise<void>;
    /**
     * Retrieves metadata for a specific index with caching.
     * @param name - Index name
     * @returns The index configuration or null if not found
     */
    getMetadata(name: string): Promise<IndexConfig | null>;
    /**
     * Removes an index and its metadata.
     * @param name - Index name
     */
    removeIndex(name: string): Promise<void>;
    /**
     * Clears all indices and metadata.
     */
    clearIndices(): Promise<void>;
    /**
     * Checks if an index exists.
     * @param name - Index name
     * @returns Boolean indicating whether the index exists
     */
    hasIndex(name: string): Promise<boolean>;
    /**
     * Lists all available indices.
     * @returns Array of index names
     */
    listIndices(): Promise<string[]>;
    /**
     * Gets cache statistics if caching is enabled.
     * @returns Cache statistics or null if caching is disabled
     */
    getCacheStats(): ReturnType<CacheManager['getStats']> | null;
    /**
     * Closes the persistence manager and releases resources.
     */
    close(): Promise<void>;
}
//# sourceMappingURL=PersistenceManager.d.ts.map