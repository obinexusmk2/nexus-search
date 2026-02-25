import { IndexConfig, MetricsResult, SerializedIndex } from "@/types";
import { PerformanceMonitor } from "@/utils/PerformanceMonitor";
import { StorageAdapter } from "@/storage/StorageAdapter";
/**
 * Options for configuring FileSystemAdapter
 */
export interface FileSystemOptions {
    basePath?: string;
    encoding?: string;
    createIfMissing?: boolean;
    throttleWrites?: boolean;
    throttleDelay?: number;
}
/**
 * Common interface for file handling operations
 * This is implemented by both browser and node implementations
 */
export interface FileHandler {
    readFile(filePath: string, options?: {
        encoding?: string;
    }): Promise<string | Uint8Array>;
    writeFile(filePath: string, data: string | Uint8Array, options?: {
        encoding?: string;
    }): Promise<void>;
    exists(filePath: string): Promise<boolean>;
    mkdir(dirPath: string, options?: {
        recursive?: boolean;
    }): Promise<void>;
    readdir(dirPath: string): Promise<string[]>;
    unlink(filePath: string): Promise<void>;
    stat(filePath: string): Promise<{
        size: number;
        lastModified: number;
    }>;
}
/**
 * Abstract base class for FileSystemAdapter implementations
 * This provides common functionality while delegating platform-specific
 * operations to implementations for browser and Node environments
 */
export declare abstract class BaseFileSystemAdapter implements StorageAdapter {
    protected basePath: string;
    protected encoding: string;
    protected createIfMissing: boolean;
    protected performanceMonitor: PerformanceMonitor;
    protected throttleWrites: boolean;
    protected throttleDelay: number;
    protected writeQueue: Map<string, Promise<void>>;
    protected initialized: boolean;
    constructor(options?: FileSystemOptions);
    /**
     * Initialize the adapter - must be called before any operations
     */
    initialize(): Promise<void>;
    /**
     * Ensure a directory exists, creating it if necessary
     */
    protected ensureDirectory(dirPath: string): Promise<void>;
    /**
     * Store an index
     */
    storeIndex(name: string, data: SerializedIndex): Promise<void>;
    /**
     * Retrieve an index
     */
    getIndex(name: string): Promise<SerializedIndex | null>;
    /**
     * Update metadata for an index
     */
    updateMetadata(name: string, config: IndexConfig): Promise<void>;
    /**
     * Retrieve metadata for an index
     */
    getMetadata(name: string): Promise<IndexConfig | null>;
    /**
     * Remove an index and its metadata
     */
    removeIndex(name: string): Promise<void>;
    /**
     * Clear all indices
     */
    clearIndices(): Promise<void>;
    /**
     * Check if an index exists
     */
    hasIndex(name: string): Promise<boolean>;
    /**
     * List all available indices
     */
    listIndices(): Promise<string[]>;
    /**
     * Close the adapter
     */
    close(): Promise<void>;
    /**
     * Get metrics for the adapter
     */
    getMetrics(): MetricsResult;
    /**
     * Get the full file path for a filename
     */
    protected getFilePath(filename: string): string;
    /**
     * Ensure the adapter is initialized
     */
    protected ensureInitialized(): Promise<void>;
    /**
     * Write with throttling to prevent file system contention
     */
    protected throttledWrite(filePath: string, data: string): Promise<void>;
    /**
     * Get the file handler implementation - must be provided by subclasses
     */
    protected abstract getFileHandler(): FileHandler;
}
//# sourceMappingURL=FileSystemAdapter.d.ts.map