import { IndexConfig, SearchOptions, SearchResult, IndexedDocument } from "@/types";
import { PersistenceOptions } from "./PersistenceManager";
/**
 * Options for IncrementalIndexManager
 */
export interface IncrementalIndexOptions {
    /**
     * Index configuration
     */
    config: IndexConfig;
    /**
     * Persistence options
     */
    persistence?: PersistenceOptions;
    /**
     * Auto-save configuration
     */
    autoSave?: {
        enabled: boolean;
        interval?: number;
        threshold?: number;
    };
    /**
     * Batch processing options
     */
    batch?: {
        enabled: boolean;
        size?: number;
        concurrency?: number;
    };
}
/**
 * IncrementalIndexManager provides incremental document indexing capabilities
 * with persistence support. It allows for efficient indexing of large document sets
 * through batching and incremental updates.
 */
export declare class IncrementalIndexManager {
    private indexMapper;
    private documents;
    private config;
    private persistenceManager;
    private pendingChanges;
    private autoSaveTimer;
    private options;
    private initialized;
    private isSaving;
    private lastSaved;
    /**
     * Creates a new IncrementalIndexManager instance.
     * @param options - Configuration options
     */
    constructor(options: IncrementalIndexOptions);
    /**
     * Initializes the index manager.
     */
    initialize(): Promise<void>;
    /**
     * Ensures the manager is initialized before operations.
     */
    private ensureInitialized;
    /**
     * Loads an index from storage.
     * @param storedIndex - The serialized index
     */
    private loadFromStorage;
    /**
     * Starts the auto-save timer.
     */
    private startAutoSave;
    /**
     * Checks if auto-save should be triggered and saves if needed.
     */
    private checkAndSave;
    /**
     * Saves the current index state to storage.
     */
    saveIndex(): Promise<void>;
    /**
     * Adds a document to the index.
     * @param document - The document to add
     * @returns Promise resolving to the document ID
     */
    addDocument<T extends IndexedDocument>(document: T): Promise<string>;
    /**
     * Adds multiple documents to the index with optional batching.
     * @param documents - Array of documents to add
     * @returns Promise resolving to an array of document IDs
     */
    addDocuments<T extends IndexedDocument>(documents: T[]): Promise<string[]>;
    /**
     * Processes a batch of documents.
     * @param batch - Array of documents to process
     * @returns Promise resolving to an array of document IDs
     */
    private processBatch;
    /**
     * Creates a searchable document from an indexed document.
     * @param document - The indexed document
     * @param id - Document ID
     * @returns A searchable document
     */
    private createSearchableDocument;
    /**
     * Updates an existing document in the index.
     * @param document - The document to update
     * @returns Promise resolving when the update is complete
     */
    updateDocument<T extends IndexedDocument>(document: T): Promise<void>;
    /**
     * Removes a document from the index.
     * @param documentId - ID of the document to remove
     * @returns Promise resolving when the removal is complete
     */
    removeDocument(documentId: string): Promise<void>;
    /**
     * Searches the index for documents matching the query.
     * @param query - Search query
     * @param options - Search options
     * @returns Promise resolving to search results
     */
    search<T extends IndexedDocument>(query: string, options?: SearchOptions): Promise<SearchResult<T>[]>;
    /**
     * Gets a document by ID.
     * @param id - Document ID
     * @returns The document or undefined if not found
     */
    getDocument(id: string): IndexedDocument | undefined;
    /**
     * Gets all documents in the index.
     * @returns Map of document IDs to documents
     */
    getAllDocuments(): Map<string, IndexedDocument>;
    /**
     * Gets the count of documents in the index.
     * @returns Number of documents
     */
    getSize(): number;
    /**
     * Gets the current index configuration.
     * @returns Index configuration
     */
    getConfig(): IndexConfig;
    /**
     * Clears the index.
     * @returns Promise resolving when clearing is complete
     */
    clear(): Promise<void>;
    /**
     * Generates a document ID.
     * @param index - Current index
     * @returns Generated document ID
     */
    private generateDocumentId;
    /**
     * Closes the index manager and releases resources.
     * @returns Promise resolving when closing is complete
     */
    close(): Promise<void>;
}
//# sourceMappingURL=IncrementalIndexManager.d.ts.map