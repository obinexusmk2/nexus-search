import { KeyValueStorageAdapter } from './StorageAdapter';
import { MetricsResult } from '@/types';
/**
 * IndexedDB implementation of the KeyValueStorageAdapter interface
 * Provides persistent cache storage in browser environments using IndexedDB
 * This offers greater storage capacity than localStorage and better performance for larger datasets
 */
export declare class IndexedDBCacheAdapter implements KeyValueStorageAdapter {
    private readonly prefix;
    private readonly dbName;
    private readonly storeName;
    private readonly version;
    private db;
    private isAvailable;
    private initPromise;
    private performanceMonitor;
    /**
     * Create a new IndexedDBCacheAdapter
     * @param prefix - Prefix for all keys to avoid collisions
     * @param dbName - Name of the IndexedDB database
     * @param storeName - Name of the object store
     * @param version - Database version
     */
    constructor(prefix?: string, dbName?: string, storeName?: string, version?: number);
    /**
     * Check if IndexedDB is available in this environment
     */
    private checkAvailability;
    /**
     * Initialize the adapter by opening the IndexedDB connection
     */
    initialize(): Promise<void>;
    /**
     * Ensure database is initialized before operations
     */
    private ensureInitialized;
    /**
     * Get a value from IndexedDB
     * @param key - The key to look up
     * @returns The stored value or undefined if not found
     */
    get(key: string): Promise<string | undefined>;
    /**
     * Set a value in IndexedDB
     * @param key - The key to store under
     * @param value - The value to store
     */
    set(key: string, value: string): Promise<void>;
    /**
     * Remove a value from IndexedDB
     * @param key - The key to remove
     */
    remove(key: string): Promise<void>;
    /**
     * Get all keys in IndexedDB that match our prefix
     * @returns Array of keys with the prefix removed
     */
    keys(): Promise<string[]>;
    /**
     * Clear all values in IndexedDB that match our prefix
     */
    clear(): Promise<void>;
    /**
     * Close the IndexedDB connection
     */
    close(): Promise<void>;
    /**
     * Prune old entries from the cache based on timestamp
     * @param maxAge - Maximum age in milliseconds
     */
    pruneOldEntries(maxAge?: number): Promise<number>;
    /**
     * Get database statistics
     * @returns Statistics about the cache database
     */
    getStats(): Promise<{
        entryCount: number;
        totalSize: number;
        oldestEntryAge: number | null;
        newestEntryAge: number | null;
    }>;
    /**
     * Get performance metrics
     */
    getMetrics(): MetricsResult;
}
//# sourceMappingURL=IndexedDBCacheAdapter.d.ts.map