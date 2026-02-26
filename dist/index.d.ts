type PrimitiveValue = string | number | boolean | null;
type ArrayValue = PrimitiveValue[];
type DocumentValue = PrimitiveValue | ArrayValue | Record<string, unknown>;
interface DocumentContent {
    [key: string]: DocumentValue | DocumentContent | undefined;
    text?: DocumentValue | DocumentContent;
}
interface DocumentMetadata {
    author?: string;
    tags?: string[];
    version?: string;
    lastModified: number;
    indexed?: number;
    fileType?: string;
    fileSize?: number;
    status?: string;
    [key: string]: unknown;
}
interface NexusDocumentMetadata extends DocumentMetadata {
    indexed: number;
    lastModified: number;
    checksum?: string;
    permissions?: string[];
    workflow?: DocumentWorkflow;
}
interface BaseFields {
    title: string;
    content: DocumentContent;
    author: string;
    tags: string[];
    version: string;
    modified?: string;
    [key: string]: DocumentValue | undefined;
}
interface IndexableFields extends BaseFields {
    content: DocumentContent;
}
interface NexusFields extends IndexableFields {
    type: string;
    category?: string;
    created: string;
    status: DocumentStatus;
    locale?: string;
}
interface DocumentBase {
    id: string;
    title: string;
    author: string;
    tags: string[];
    version: string;
    metadata?: DocumentMetadata;
    versions: DocumentVersion[];
    relations: DocumentRelation[];
}
interface IndexedDocument$1 {
    id: string;
    title: string;
    author: string;
    tags: string[];
    version: string;
    fields: IndexableFields;
    content: DocumentContent;
    metadata?: DocumentMetadata;
    links?: DocumentLink$1[];
    ranks?: DocumentRank[];
    versions: DocumentVersion[];
    relations: DocumentRelation[];
    document(): IndexedDocument$1;
    base(): DocumentBase;
}
interface IndexedDocumentData {
    id: string;
    title: string;
    author: string;
    tags: string[];
    version: string;
    fields: BaseFields;
    metadata?: DocumentMetadata;
    versions: Array<DocumentVersion>;
    relations: Array<DocumentRelation>;
}
interface DocumentLink$1 {
    fromId: string | ((fromId: string) => string);
    toId: string | ((toId: string) => string);
    weight: number;
    url: string;
    source: string;
    target: string;
    type: string;
}
interface DocumentRelation {
    sourceId: string;
    targetId: string;
    type: RelationType;
    metadata?: Record<string, unknown>;
}
interface DocumentVersion {
    version: number;
    content: DocumentContent;
    modified: Date;
    author: string;
    changelog?: string;
}
interface DocumentRank {
    id: string;
    rank: number;
    incomingLinks: number;
    outgoingLinks: number;
    content: Record<string, unknown>;
    metadata?: DocumentMetadata;
}
interface DocumentWorkflow {
    status: string;
    assignee?: string;
    dueDate?: string;
}
interface IndexConfig$1 {
    name: string;
    version: number;
    fields: string[];
    options?: IndexOptions$2;
}
interface DocumentConfig$1 {
    fields?: string[];
    storage?: StorageConfig$1;
    versioning?: VersioningConfig$1;
    validation?: ValidationConfig$1;
}
interface StorageConfig$1 {
    type: 'memory' | 'indexeddb';
    options?: Record<string, unknown>;
}
interface VersioningConfig$1 {
    enabled: boolean;
    maxVersions?: number;
}
interface ValidationConfig$1 {
    required?: string[];
    customValidators?: Record<string, (value: unknown) => boolean>;
}
interface IndexOptions$2 {
    caseSensitive?: boolean;
    stemming?: boolean;
    stopWords?: string[];
    minWordLength?: number;
    maxWordLength?: number;
    fuzzyThreshold?: number;
}
interface CreateDocumentOptions {
    title: string;
    content: DocumentContent;
    type: string;
    tags?: string[];
    category?: string;
    author: string;
    status?: DocumentStatus;
    locale?: string;
    metadata?: Partial<NexusDocumentMetadata>;
}
interface AdvancedSearchOptions extends SearchOptions$1 {
    filters?: SearchFilters;
    sort?: SortConfig;
}
type DocumentStatus = 'draft' | 'published' | 'archived';
type RelationType = 'reference' | 'parent' | 'child' | 'related';
interface SearchFilters {
    status?: DocumentStatus[];
    dateRange?: {
        start: Date;
        end: Date;
    };
    categories?: string[];
    types?: string[];
    authors?: string[];
}
interface SortConfig {
    field: keyof NexusFields;
    order: 'asc' | 'desc';
}
interface NexusDocument extends IndexedDocument$1 {
    fields: NexusFields;
    metadata?: NexusDocumentMetadata;
    links?: DocumentLink$1[];
    ranks?: DocumentRank[];
    document(): NexusDocument;
}
interface NexusDocumentInput extends Partial<NexusDocument> {
    id?: string;
    content?: DocumentContent;
}
interface NormalizedDocument {
    id: string;
    fields: {
        title: string;
        content: string | DocumentContent;
        author: string;
        tags: string[];
        version: string;
    };
    metadata: {
        indexed: number;
        lastModified: number;
        [key: string]: unknown;
    };
}
/**
 * Plugin configuration for NexusDocument
 */
interface NexusDocumentPluginConfig {
    name?: string;
    version?: number;
    fields?: string[];
    storage?: {
        type: 'memory' | 'indexeddb';
        options?: Record<string, unknown>;
    };
    versioning?: {
        enabled?: boolean;
        maxVersions?: number;
    };
    validation?: {
        required?: string[];
        customValidators?: Record<string, (value: unknown) => boolean>;
    };
}

interface SearchResult<T = unknown> {
    docId: string;
    term: string;
    distance?: number;
    id: string;
    document: IndexedDocument$1;
    item: T;
    score: number;
    matches: string[];
    metadata?: DocumentMetadata;
}
interface Search {
    search(query: string, options?: SearchOptions$1): Promise<SearchResult[]>;
}
interface SearchOptions$1 {
    fuzzy?: boolean;
    fields?: string[];
    boost?: Record<string, number>;
    maxResults?: number;
    threshold?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
    enableRegex?: boolean;
    maxDistance?: number;
    regex?: string | RegExp;
    highlight?: boolean;
    includeMatches?: boolean;
    includeScore?: boolean;
    includeStats?: boolean;
    prefixMatch?: boolean;
    minScore?: number;
    includePartial?: boolean;
    caseSensitive?: boolean;
}
interface SearchContext {
    query: string;
    options: SearchOptions$1;
    startTime: number;
    results: SearchResult[];
    stats: SearchStats;
}
interface SearchStats {
    totalResults: number;
    searchTime: number;
    indexSize: number;
    queryComplexity: number;
}
interface SearchableDocument {
    id: string;
    content: Record<string, DocumentValue>;
    metadata?: DocumentMetadata;
    [key: string]: unknown;
    version: string;
    indexed?: number;
}
interface SearchableField {
    value: DocumentValue;
    weight?: number;
    metadata?: DocumentMetadata;
}
interface SearchNode {
    id?: string;
    score: number;
    value?: DocumentValue;
    children: Map<string, SearchNode>;
    metadata?: DocumentMetadata;
}
interface SearchScoreParams {
    term: string;
    documentId: string;
    options: SearchOptions$1;
}
interface SearchMatch {
    field: string;
    value: string;
    indices: number[];
}
interface SearchEngineOptions {
    fuzzyMatchingEnabled?: boolean;
    regexSearchEnabled?: boolean;
    maxSearchResults?: number;
    defaultThreshold?: number;
    defaultBoost?: Record<string, number>;
}
interface SearchPagination {
    page: number;
    pageSize: number;
    totalPages: number;
    totalResults: number;
}
interface SearchEngineConfig extends IndexConfig$1 {
    version: number;
    documentSupport?: {
        enabled: boolean;
        versioning?: {
            enabled?: boolean;
            maxVersions?: number;
        };
    };
    storage: {
        type: string;
        options?: object;
    };
    search?: {
        defaultOptions?: SearchOptions$1;
    };
    fields: string[];
    indexing: {
        enabled: boolean;
        fields: string[];
        options: {
            tokenization: boolean;
            caseSensitive: boolean;
            stemming: boolean;
        };
    };
}
/**
 * Enhanced regex search configuration
 */
interface RegexSearchConfig {
    maxDepth?: number;
    timeoutMs?: number;
    caseSensitive?: boolean;
    wholeWord?: boolean;
}
/**
 * Search result with regex matching details
 */
interface RegexSearchResult {
    id: string;
    score: number;
    matches: string[];
    path: string[];
    positions: Array<[number, number]>;
    matched?: string;
}
interface ExtendedSearchOptions extends SearchOptions$1 {
    regexConfig?: RegexSearchConfig;
}

interface IndexOptions$1 {
    caseSensitive?: boolean;
    stemming?: boolean;
    stopWords?: string[];
    minWordLength?: number;
    maxWordLength?: number;
    fuzzyThreshold?: number;
}
interface IndexConfig {
    name: string;
    version: number;
    fields: string[];
    options?: IndexOptions$1;
}

interface IndexNode {
    depth: number;
    id: string;
    value: unknown;
    score: number;
    children: Map<string, IndexNode>;
}
interface TokenInfo {
    value: string;
    type: 'word' | 'operator' | 'modifier' | 'delimiter';
    position: number;
    length: number;
}
interface SerializedIndex {
    documents: Array<{
        key: string;
        value: IndexedDocument$1;
    }>;
    indexState: unknown;
    config: IndexConfig;
}

interface DBSchema {
    [s: string]: DBSchemaValue;
}
interface IndexKeys {
    [s: string]: IDBValidKey;
}
interface DBSchemaValue {
    key: IDBValidKey;
    value: any;
    indexes?: IndexKeys;
}

interface SearchDBSchema extends DBSchema {
    searchIndices: {
        key: string;
        value: {
            id: string;
            data: unknown;
            timestamp: number;
        };
        indexes: {
            'timestamp': number;
        };
    };
    metadata: {
        key: string;
        value: MetadataEntry;
        indexes: {
            'lastUpdated': number;
        };
    };
}
interface MetadataEntry {
    id: string;
    config: IndexConfig;
    lastUpdated: number;
}
interface DatabaseConfig {
    name: string;
    version: number;
    stores: Array<{
        name: string;
        keyPath: string;
        indexes: Array<{
            name: string;
            keyPath: string;
            options?: IDBIndexParameters;
        }>;
    }>;
}

type SearchEventType$1 = 'error' | 'warning' | 'info';
declare class SearchError extends Error {
    constructor(message: string);
}
declare class IndexError extends Error {
    constructor(message: string);
}
declare class ValidationError extends Error {
    constructor(message: string);
}
declare class StorageError extends Error {
    constructor(message: string);
}
declare class CacheError extends Error {
    constructor(message: string);
}
declare class MapperError extends Error {
    constructor(message: string);
}
declare class PerformanceError extends Error {
    constructor(message: string);
}
declare class ConfigError extends Error {
    constructor(message: string);
}
declare class SearchEventError extends Error {
    readonly type: SearchEventType$1;
    readonly details?: unknown | undefined;
    constructor(message: string, type: SearchEventType$1, details?: unknown | undefined);
}

type SearchEventType = 'engine:initialized' | 'engine:closed' | 'index:start' | 'index:complete' | 'index:error' | 'index:clear' | 'index:clear:error' | 'search:start' | 'search:complete' | 'search:error' | 'update:start' | 'update:complete' | 'update:error' | 'remove:start' | 'remove:complete' | 'remove:error' | 'bulk:update:start' | 'bulk:update:complete' | 'bulk:update:error' | 'import:start' | 'import:complete' | 'import:error' | 'export:start' | 'export:complete' | 'export:error' | 'optimize:start' | 'optimize:complete' | 'optimize:error' | 'reindex:start' | 'reindex:complete' | 'reindex:error' | 'storage:error' | 'storage:clear' | 'storage:clear:error';
interface BaseEvent {
    timestamp: number;
    region?: string;
}
interface SuccessEvent extends BaseEvent {
    data?: {
        documentCount?: number;
        searchTime?: number;
        resultCount?: number;
        documentId?: string;
        updateCount?: number;
        query?: string;
        options?: unknown;
    };
}
interface ErrorEvent extends BaseEvent {
    error: Error;
    details?: {
        documentId?: string;
        operation?: string;
        phase?: string;
    };
}
interface SearchEvent extends BaseEvent {
    type: SearchEventType;
    data?: unknown;
    error?: Error;
    regex?: RegExp;
}
interface SearchEventListener {
    (event: SearchEvent): void;
}
interface SearchEventEmitter {
    addEventListener(listener: SearchEventListener): void;
    removeEventListener(listener: SearchEventListener): void;
    emitEvent(event: SearchEvent): void;
}

interface MapperState {
    trie: unknown;
    dataMap: Record<string, string[]>;
    documents: Array<{
        key: string;
        value: IndexedDocument$1;
    }>;
    config: IndexConfig;
}
interface MapperOptions {
    caseSensitive?: boolean;
    normalization?: boolean;
}

interface StorageEntry<T> {
    id: string;
    data: T;
    timestamp: number;
}
interface StorageOptions$1 {
    type: 'memory' | 'indexeddb';
    options?: StorageOptionsConfig;
    maxSize?: number;
    ttl?: number;
}
interface StorageOptionsConfig {
    prefix?: string;
    compression?: boolean;
    encryption?: boolean;
    backupEnabled?: boolean;
}

interface CacheOptions {
    maxSize: number;
    ttlMinutes: number;
    strategy?: CacheStrategyType;
}
interface CacheEntry {
    data: SearchResult<unknown>[];
    timestamp: number;
    lastAccessed: number;
    accessCount: number;
}
declare enum CacheStrategyType {
    LRU = "LRU",
    MRU = "MRU"
}
type CacheStrategy = keyof typeof CacheStrategyType;
interface CacheStatus {
    size: number;
    maxSize: number;
    strategy: CacheStrategy;
    ttl: number;
    utilization: number;
    oldestEntryAge: number | null;
    newestEntryAge: number | null;
    memoryUsage: {
        bytes: number;
        formatted: string;
    };
}

interface DocumentScore {
    textScore: number;
    documentRank: number;
    termFrequency: number;
    inverseDocFreq: number;
}
interface TextScore {
    termFrequency: number;
    documentFrequency: number;
    score: number;
}
interface TextScore {
    termFrequency: number;
    documentFrequency: number;
    score: number;
}
interface ScoringMetrics {
    textScore: number;
    documentRank: number;
    termFrequency: number;
    inverseDocFreq: number;
}

interface PerformanceMetric {
    avg: number;
    min: number;
    max: number;
    count: number;
}
interface MetricsResult {
    [key: string]: PerformanceMetric;
}

interface OptimizationOptions {
    deduplication?: boolean;
    sorting?: boolean;
    compression?: boolean;
}
interface OptimizationResult<T> {
    data: T[];
    stats: {
        originalSize: number;
        optimizedSize: number;
        compressionRatio?: number;
    };
}

interface SerializedTrieNode {
    isEndOfWord: boolean;
    documentRefs: string[];
    weight: number;
    children: {
        [key: string]: SerializedTrieNode;
    };
}
interface SerializedState {
    trie: SerializedTrieNode;
    documents: [string, IndexedDocument$1][];
    documentLinks: [string, DocumentLink$1[]][];
}

interface QueryToken {
    type: 'operator' | 'modifier' | 'term';
    value: string;
    original: string;
    field?: string;
}

declare class CacheManager {
    getSize(): number;
    getStatus(): CacheStatus;
    private calculateMemoryUsage;
    private estimateDataSize;
    private formatBytes;
    private cache;
    private readonly maxSize;
    private readonly ttl;
    private strategy;
    private accessOrder;
    private stats;
    constructor(maxSize?: number, ttlMinutes?: number, initialStrategy?: CacheStrategy);
    set(key: string, data: SearchResult<unknown>[]): void;
    get(key: string): SearchResult<unknown>[] | null;
    clear(): void;
    getStats(): {
        size: number;
        maxSize: number;
        hitRate: number;
        strategy: "LRU" | "MRU";
        hits: number;
        misses: number;
        evictions: number;
    };
    private isExpired;
    private evict;
    private findLRUKey;
    private findMRUKey;
    private updateAccessOrder;
    private removeFromAccessOrder;
    setStrategy(newStrategy: CacheStrategy): void;
    prune(): number;
    analyze(): {
        hitRate: number;
        averageAccessCount: number;
        mostAccessedKeys: Array<{
            key: string;
            count: number;
        }>;
    };
}

declare class IndexedDB {
    private db;
    private readonly DB_NAME;
    private readonly DB_VERSION;
    private initPromise;
    constructor();
    initialize(): Promise<void>;
    private ensureConnection;
    storeIndex(key: string, data: unknown): Promise<void>;
    getIndex(key: string): Promise<unknown | null>;
    updateMetadata(config: IndexConfig): Promise<void>;
    getMetadata(): Promise<MetadataEntry | null>;
    clearIndices(): Promise<void>;
    deleteIndex(key: string): Promise<void>;
    close(): Promise<void>;
}

declare class SearchStorage {
    private db;
    private memoryStorage;
    private storageType;
    constructor(options?: StorageOptions$1);
    private determineStorageType;
    private isIndexedDBAvailable;
    initialize(): Promise<void>;
    storeIndex(name: string, data: unknown): Promise<void>;
    getIndex(name: string): Promise<unknown>;
    clearIndices(): Promise<void>;
    close(): Promise<void>;
}

/**
 * Enhanced IndexedDocument implementation with proper type handling
 * and versioning support
 */
declare class IndexedDocument implements IndexedDocument$1 {
    readonly id: string;
    fields: BaseFields;
    metadata?: DocumentMetadata;
    versions: Array<DocumentVersion>;
    relations: Array<DocumentRelation>;
    content: DocumentContent;
    links?: DocumentLink$1[];
    ranks?: DocumentRank[];
    title: string;
    author: string;
    tags: string[];
    version: string;
    constructor(id: string, fields: BaseFields, metadata?: DocumentMetadata, versions?: Array<DocumentVersion>, relations?: Array<DocumentRelation>);
    /**
     * Implement required document() method from interface
     */
    document(): IndexedDocument$1;
    /**
     * Implement required base() method from interface
     */
    base(): DocumentBase;
    /**
     * Normalize document fields ensuring required fields exist
     */
    private normalizeFields;
    private normalizeContent;
    /**
     * Normalize document metadata with timestamps
     */
    private normalizeMetadata;
    /**
     * Create a deep clone of the document
     */
    clone(): IndexedDocument;
    /**
     * Update document fields and metadata
     */
    update(updates: Partial<IndexedDocumentData>): IndexedDocument;
    /**
     * Get a specific field value
     */
    getField<T extends keyof BaseFields>(field: T): BaseFields[T];
    /**
     * Set a specific field value
     */
    setField<T extends keyof BaseFields>(field: T, value: BaseFields[T]): void;
    /**
     * Add a new version of the document
     */
    addVersion(version: Omit<DocumentVersion, 'version'>): void;
    /**
     * Add a relationship to another document
     */
    addRelation(relation: DocumentRelation): void;
    /**
     * Convert to plain object representation
     */
    toObject(): IndexedDocumentData;
    /**
     * Convert to JSON string
     */
    toJSON(): string;
    /**
     * Create string representation
     */
    toString(): string;
    /**
     * Create new document instance
     */
    static create(data: IndexedDocumentData): IndexedDocument;
    /**
     * Create from plain object
     */
    static fromObject(obj: Partial<IndexedDocumentData> & {
        id: string;
        fields: BaseFields;
    }): IndexedDocument;
    /**
     * Create from raw data
     */
    static fromRawData(id: string, content: string | DocumentContent, metadata?: DocumentMetadata): IndexedDocument;
}

declare class IndexManager$1 {
    initialize(): void;
    importDocuments(documents: IndexedDocument$1[]): void;
    getSize(): number;
    getAllDocuments(): Map<string, IndexedDocument$1>;
    private indexMapper;
    private config;
    private documents;
    constructor(config: IndexConfig);
    addDocument<T extends IndexedDocument$1>(document: T): void;
    getDocument(id: string): IndexedDocument$1 | undefined;
    exportIndex(): SerializedIndex;
    importIndex(data: unknown): void;
    clear(): void;
    private generateDocumentId;
    private isValidIndexData;
    private isValidIndexState;
    private serializeDocument;
    addDocuments<T extends IndexedDocument$1>(documents: T[]): Promise<void>;
    updateDocument<T extends IndexedDocument$1>(document: T): Promise<void>;
    removeDocument(documentId: string): Promise<void>;
    search<T extends IndexedDocument$1>(query: string, options?: SearchOptions$1): Promise<SearchResult<T>[]>;
    hasDocument(id: string): boolean;
}

declare class BaseDocument implements IndexedDocument$1 {
    readonly id: string;
    fields: IndexableFields;
    metadata?: DocumentMetadata;
    versions: DocumentVersion[];
    relations: DocumentRelation[];
    content: DocumentContent;
    links?: DocumentLink$1[];
    ranks?: DocumentRank[];
    title: string;
    author: string;
    tags: string[];
    version: string;
    constructor(doc: Partial<BaseDocument>);
    base(): DocumentBase;
    private generateId;
    private normalizeFields;
    private normalizeMetadata;
    private normalizeContent;
    private normalizeContentObject;
    private normalizePrimitiveArray;
    private normalizePrimitive;
    private normalizeRelations;
    private normalizeLinks;
    private normalizeRanks;
    private normalizeRelationType;
    document(): IndexedDocument$1;
    clone(): IndexedDocument$1;
    toObject(): IndexedDocument$1;
    update(updates: Partial<IndexedDocument$1>): IndexedDocument$1;
    private isContentEqual;
}

declare class SearchEngine {
    private readonly indexManager;
    private readonly queryProcessor;
    private readonly storage;
    private readonly cache;
    private readonly trie;
    private readonly config;
    private readonly documentSupport;
    private isInitialized;
    private readonly documents;
    private readonly eventListeners;
    private readonly trieRoot;
    constructor(config: SearchEngineConfig);
    /**
     * Initialize the search engine and its components
     */
    initialize(): Promise<void>;
    /**
     * Load existing indexes from storage
     */
    private loadExistingIndexes;
    private extractRegexMatches;
    addDocument(document: IndexedDocument): Promise<void>;
    addDocuments(documents: IndexedDocument[]): Promise<void>;
    search<T>(query: string, options?: SearchOptions$1): Promise<SearchResult<T>[]>;
    private validateDocument;
    /**
     * Helper method to normalize document content
     */
    normalizeContent(content: unknown): DocumentContent;
    /**
     * Helper method to normalize date strings
     */
    normalizeDate(date: unknown): string | undefined;
    /**
     * Helper method to normalize document status
     */
    normalizeStatus(status: unknown): DocumentStatus | undefined;
    normalizeDocument(doc: IndexedDocument): IndexedDocument;
    updateDocument(document: IndexedDocument): Promise<void>;
    /**
     * Performs regex-based search using either BFS or DFS traversal
     */
    performRegexSearch(query: string, options: ExtendedSearchOptions): Promise<SearchResult<IndexedDocument>[]>;
    performBasicSearch(searchTerms: string[], options: SearchOptions$1): Promise<Array<{
        id: string;
        score: number;
    }>>;
    /**
 * Creates a RegExp object from various input types
 */
    createRegexFromOption(regexOption: string | RegExp | object): RegExp;
    /**
     * Determines if a regex pattern is complex
     */
    private isComplexRegex;
    processSearchResults(results: RegexSearchResult[] | Array<{
        id: string;
        score: number;
    }>, options: SearchOptions$1): Promise<SearchResult<IndexedDocument>[]>;
    getTrieState(): unknown;
    removeDocument(documentId: string): Promise<void>;
    clearIndex(): Promise<void>;
    private calculateTermScore;
    private normalizeScore;
    private extractMatches;
    private applyPagination;
    loadIndexes(): Promise<void>;
    generateCacheKey(query: string, options: SearchOptions$1): string;
    addEventListener(listener: SearchEventListener): void;
    removeEventListener(listener: SearchEventListener): void;
    /**
      * Emit search engine events
      */
    private emitEvent;
    close(): Promise<void>;
    getIndexedDocumentCount(): number;
    bulkUpdate(updates: Map<string, Partial<IndexedDocument>>): Promise<void>;
    importIndex(indexData: unknown): Promise<void>;
    exportIndex(): unknown;
    getDocument(id: string): IndexedDocument | undefined;
    getAllDocuments(): IndexedDocument[];
    reindexAll(): Promise<void>;
    optimizeIndex(): Promise<void>;
    handleVersioning(doc: IndexedDocument): Promise<void>;
    restoreVersion(id: string, version: number): Promise<void>;
    getDocumentVersion(id: string, version: number): Promise<unknown | undefined>;
    getStats(): {
        documentCount: number;
        indexSize: number;
        cacheSize: number;
        initialized: boolean;
    };
    isReady(): boolean;
}

declare global {
    interface Window {
        NexusSearch: typeof SearchEngine;
    }
}

interface TrieSearchOptions {
    caseSensitive?: boolean;
    fuzzy?: boolean;
    maxDistance?: number;
}

/**
 * Registry for IoC container
 * Stores provider definitions
 */
declare class Registry {
    private providers;
    constructor();
    /**
     * Set a provider in the registry
     * @param token Identifier for the provider
     * @param provider Constructor or factory function for the provider
     */
    set<T>(token: string, provider: any): void;
    /**
     * Get a provider from the registry
     * @param token Identifier for the provider
     */
    get<T>(token: string): any;
    /**
     * Check if a provider exists in the registry
     * @param token Identifier for the provider
     */
    has(token: string): boolean;
    /**
     * Remove a provider from the registry
     * @param token Identifier for the provider
     */
    delete(token: string): boolean;
    /**
     * Get all provider tokens
     */
    keys(): string[];
    /**
     * Clear all providers
     */
    clear(): void;
}

type ProviderFactory<T> = () => T;
type ProviderType<T> = {
    new (...args: any[]): T;
} | ProviderFactory<T>;
/**
 * Container for dependency injection
 * Manages the instantiation and retrieval of services
 */
declare class Container {
    private registry;
    private instances;
    private singletons;
    constructor(registry?: Registry);
    /**
     * Register a provider with the container
     * @param token Identifier for the provider
     * @param provider Constructor or factory function for the provider
     * @param singleton Whether the provider should be a singleton
     */
    register<T>(token: string, provider: ProviderType<T>, singleton?: boolean): void;
    /**
     * Get an instance of a registered provider
     * @param token Identifier for the provider
     * @param args Optional arguments to pass to the constructor or factory
     */
    get<T>(token: string, ...args: any[]): T;
    /**
     * Remove a provider from the container
     * @param token Identifier for the provider
     */
    unregister(token: string): boolean;
    /**
     * Check if a provider is registered
     * @param token Identifier for the provider
     */
    has(token: string): boolean;
    /**
     * Clear all providers and instances
     */
    clear(): void;
    /**
     * Check if a function is a constructor
     * @param fn Function to check
     */
    private isConstructor;
}

/**
 * Service identifiers for dependency injection
 */
declare const ServiceIdentifiers: {
    CACHE_MANAGER: string;
    INDEX_MANAGER: string;
    SEARCH_ENGINE: string;
    QUERY_PROCESSOR: string;
    INDEX_MAPPER: string;
    STORAGE_ADAPTER: string;
    PERSISTENCE_MANAGER: string;
};
/**
 * Register core services with the IoC container
 * @param container IoC container
 * @param config Configuration object for services
 */
declare function registerCoreServices(container: Container, config?: {
    storage?: 'memory' | 'indexeddb';
    indexConfig?: any;
    cacheOptions?: any;
}): void;

declare const defaultContainer: Container;

declare class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;
    documentRefs: Set<string>;
    weight: number;
    frequency: number;
    lastAccessed: number;
    prefixCount: number;
    depth: number;
    constructor(depth?: number);
    addChild(char: string): TrieNode;
    getChild(char: string): TrieNode | undefined;
    hasChild(char: string): boolean;
    incrementWeight(value?: number): void;
    decrementWeight(value?: number): void;
    clearChildren(): void;
    shouldPrune(): boolean;
    getScore(): number;
    getWeight(): number;
}

declare class TrieSearch {
    private root;
    private documents;
    private documentLinks;
    private totalDocuments;
    private maxWordLength;
    constructor(maxWordLength?: number);
    /**
     * Insert a word into the trie with document reference
     */
    insert(word: string, id: string): void;
    /**
     * Remove a document and all its references
     */
    removeData(id: string): void;
    /**
     * Add a document to the search index
     */
    addDocument(document: IndexedDocument$1): void;
    /**
     * Search for a single term
     */
    searchWord(term: string): SearchResult<string>[];
    /**
     * Perform search with various options
     */
    search(query: string, options?: SearchOptions$1): SearchResult<string>[];
    /**
     * Export trie state for serialization (legacy method)
     */
    exportState(): unknown;
    /**
     * Serialize trie state
     */
    serializeState(): unknown;
    /**
     * Deserialize trie state
     */
    deserializeState(state: unknown): void;
    /**
     * Add document data
     *
     * Creates a new document with provided content and adds it to the search index
     *
     * @param documentId Document ID
     * @param content Text content for the document
     * @param document Base document with other metadata
     */
    addData(documentId: string, content: string, document: IndexedDocument$1): void;
    /**
     * Perform fuzzy search with edit distance
     */
    fuzzySearch(word: string, maxDistance: number): SearchResult<string>[];
    /**
     * Remove a document from the index
     */
    removeDocument(documentId: string): void;
    /**
     * Get autocomplete suggestions for a prefix
     */
    getSuggestions(prefix: string, maxResults?: number): string[];
    /**
     * Clear the trie and all its data
     */
    clear(): void;
    /*** PRIVATE METHODS ***/
    private indexText;
    private insertWord;
    private exactSearch;
    private prefixSearch;
    private collectWords;
    private fuzzySearchRecursive;
    private calculateScore;
    private calculateFuzzyScore;
    private calculateLevenshteinDistance;
    private tokenize;
    private removeDocumentRefs;
    private pruneEmptyNodes;
    private collectSuggestions;
    private serializeTrie;
    private deserializeTrie;
}

/**
 * Breadth-First Search traversal for trie data structure
 * Optimized for relevance-focused search results
 *
 * @param root The root node of the trie
 * @param query The search query
 * @param maxResults Maximum number of results to return (default: 10)
 * @param config Optional configuration for the traversal
 * @returns Array of search results with document IDs and scores
 */
declare function bfsTraversal(root: IndexNode, query: string, maxResults?: number, config?: RegexSearchConfig): RegexSearchResult[];
/**
 * Specialized BFS traversal for regex pattern matching
 *
 * @param root The root node of the trie
 * @param regex Regular expression pattern to match
 * @param maxResults Maximum number of results to return
 * @param config Optional configuration
 * @returns Array of search results matching the regex pattern
 */
declare function bfsRegexTraversal$1(root: IndexNode, regex: RegExp, maxResults?: number, config?: RegexSearchConfig): RegexSearchResult[];

/**
 * Depth-First Search traversal for trie data structure
 * Optimized for speed-focused search results and complex pattern matching
 *
 * @param root The root node of the trie
 * @param query The search query
 * @param maxResults Maximum number of results to return (default: 10)
 * @param config Optional configuration for the traversal
 * @returns Array of search results with document IDs and scores
 */
declare function dfsTraversal(root: IndexNode, query: string, maxResults?: number, config?: RegexSearchConfig): RegexSearchResult[];
/**
 * Specialized DFS traversal for regex pattern matching
 * Better suited for complex regex patterns than BFS
 *
 * @param root The root node of the trie
 * @param regex Regular expression pattern to match
 * @param maxResults Maximum number of results to return
 * @param config Optional configuration
 * @returns Array of search results matching the regex pattern
 */
declare function dfsRegexTraversal$1(root: IndexNode, regex: RegExp, maxResults?: number, config?: RegexSearchConfig): RegexSearchResult[];

/**
 * FuzzySearch.ts
 * Implements fuzzy matching algorithms for the NexusSearch engine
 */

/**
 * Calculates the Levenshtein distance between two strings
 * This is the minimum number of single-character edits required to change one string into the other
 *
 * @param s1 First string
 * @param s2 Second string
 * @returns Edit distance value
 */
declare function calculateLevenshteinDistance(s1: string, s2: string): number;
/**
 * Recursive fuzzy search implementation for tries
 * Uses depth-first search to find approximate matches
 *
 * @param node Current trie node
 * @param current Current accumulated string
 * @param currentDistance Current edit distance
 * @param depth Current depth in the trie
 * @param state Search state object containing parameters and results
 */
declare function fuzzySearchRecursive(node: TrieNode, current: string, currentDistance: number, depth: number, state: {
    word: string;
    maxDistance: number;
    results: Array<SearchResult<string>>;
}): void;
/**
 * Calculate score for fuzzy match based on node properties and edit distance
 *
 * @param node The matching trie node
 * @param term The matched term
 * @param distance Edit distance between query and term
 * @returns Normalized score between 0 and 1
 */
declare function calculateFuzzyScore(node: TrieNode, term: string, distance: number): number;
/**
 * Priority-based fuzzy search that optimizes for specific fuzzy matching scenarios
 *
 * @param targetWord Word to search for
 * @param candidates Array of candidate words to match against
 * @param maxDistance Maximum Levenshtein distance to consider
 * @returns Array of matches with distances and similarities
 */
declare function priorityFuzzyMatch(targetWord: string, candidates: string[], maxDistance?: number): Array<{
    word: string;
    distance: number;
    similarity: number;
}>;
/**
 * Utility function to determine if a word is a potential fuzzy match
 * Can be used to quickly filter candidates before full distance calculation
 *
 * @param target Target word
 * @param candidate Candidate word
 * @param maxDistance Maximum allowed distance
 * @returns Boolean indicating if the candidate could be a fuzzy match
 */
declare function isPotentialFuzzyMatch(target: string, candidate: string, maxDistance: number): boolean;

interface SpatialRegion {
    bounds: Array<[number, number]>;
}
/**
 * TrieSpatialIndex extends the standard trie structure to support
 * spatial/dimensional search capabilities in addition to text search.
 *
 * This allows for queries that combine text matching with spatial constraints,
 * such as finding documents within a geographic region, conceptual space,
 * or any multi-dimensional attribute space.
 */
declare class TrieSpatialIndex {
    private root;
    private dimensions;
    private dimensionMap;
    private documents;
    private spatialIndex;
    private maxWordLength;
    /**
     * Creates a new TrieSpatialIndex
     * @param dimensions Number of spatial dimensions to support (default: 3)
     * @param maxWordLength Maximum word length to index (default: 50)
     */
    constructor(dimensions?: number, maxWordLength?: number);
    /**
     * Initialize or reset the index
     */
    initialize(): void;
    /**
     * Get the root node of the trie
     * @returns Root TrieNode
     */
    getRoot(): TrieNode;
    /**
     * Insert a token into the trie with dimensional metadata
     * @param token Text token to insert
     * @param docId Document ID
     * @param field Field name (used for dimensional mapping)
     * @param coordinates Optional spatial coordinates for this token
     */
    insert(token: string, docId: string, field: string, coordinates?: number[]): void;
    /**
     * Add a document with spatial coordinates to the index
     * @param document Document to add
     * @param coordinates Spatial coordinates for each dimension
     */
    addDocument(document: IndexedDocument$1, coordinates?: Record<string, number[]>): void;
    /**
     * Remove a document from the index
     * @param docId Document ID to remove
     */
    removeDocument(docId: string): void;
    /**
     * Search for documents with combined text and spatial constraints
     * @param query Text query
     * @param region Optional spatial region constraint
     * @param options Search options
     * @returns Array of search results with spatial relevance
     */
    search(query: string, region?: SpatialRegion, options?: SearchOptions$1): SearchResult<string>[];
    /**
     * Perform spatial-only search within a region
     * @param region Spatial region to search within
     * @param maxResults Maximum number of results
     * @returns Array of documents within the region
     */
    spatialSearch(region: SpatialRegion, maxResults?: number): IndexedDocument$1[];
    /**
     * Find the nearest neighbors to a point in the spatial index
     * @param point Reference point
     * @param k Number of neighbors to find
     * @param dimension Optional dimension to search in (defaults to all)
     * @returns Array of nearest documents and their distances
     */
    findNearestNeighbors(point: number[], k?: number, dimension?: string): Array<{
        document: IndexedDocument$1;
        distance: number;
    }>;
    /**
     * Export the spatial index state for serialization
     */
    exportState(): unknown;
    /**
     * Import a previously serialized state
     * @param state Serialized state
     */
    importState(state: unknown): void;
    /**
     * Clear the index and all its data
     */
    clear(): void;
    /**
     * Set dimensional data for a document token
     */
    private setDimensionalData;
    /**
     * Perform text search component
     */
    private performTextSearch;
    /**
     * Perform exact text search
     */
    private exactSearch;
    /**
     * Perform fuzzy search with tolerance for typos
     */
    private fuzzySearch;
    /**
     * Recursive implementation of fuzzy search
     */
    private fuzzySearchRecursive;
    /**
     * Apply spatial constraints to text search results
     */
    private applySpatialConstraints;
    /**
     * Calculate spatial score based on position in region
     * Higher score for points closer to center of region
     */
    private calculateSpatialScore;
    /**
     * Check if a point is within a spatial region
     */
    private isPointInRegion;
    /**
     * Calculate how central a point is within a region (0-1)
     * 1.0 = at exact center, 0.0 = at boundary
     */
    private calculateCentrality;
    /**
     * Calculate Euclidean distance between two points
     */
    private calculateEuclideanDistance;
    /**
     * Calculate Levenshtein distance between two strings
     */
    private calculateLevenshteinDistance;
    /**
     * Calculate score for a node match
     */
    private calculateScore;
    /**
     * Calculate score for fuzzy matches
     */
    private calculateFuzzyScore;
    /**
     * Split text into tokens
     */
    private tokenize;
    /**
     * Remove document references from trie
     */
    private removeDocumentRefs;
    /**
     * Prune empty nodes to save memory
     */
    private pruneEmptyNodes;
    /**
     * Serialize the trie structure
     */
    private serializeTrie;
    /**
     * Deserialize a trie structure
     */
    private deserializeTrie;
    /**
     * Serialize the spatial index
     */
    private serializeSpatialIndex;
    /**
     * Serialize the dimension map
     */
    private serializeDimensionMap;
}

interface TelemetryEvent {
    name: string;
    timestamp: number;
    indexName: string;
    [key: string]: any;
}
interface MetricsFilter {
    startTime?: number;
    endTime?: number;
    names?: string[];
}
interface EventFilter {
    startTime?: number;
    endTime?: number;
    names?: string[];
}
interface ErrorFilter {
    startTime?: number;
    endTime?: number;
    names?: string[];
}
interface MetricsReport {
    metrics: TelemetryEvent[];
    summary: {
        count: number;
        averages: Record<string, number>;
        min: Record<string, number>;
        max: Record<string, number>;
    };
}
interface EventReport {
    events: TelemetryEvent[];
    summary: {
        count: number;
        groupedCounts: Record<string, number>;
    };
}
interface ErrorReport {
    errors: TelemetryEvent[];
    summary: {
        count: number;
        groupedCounts: Record<string, number>;
    };
}
interface CursorPosition {
    depth: number;
    breadth: number;
    dimension: number;
}
interface SearchSpace {
    maxDepth: number;
    maxBreadth: number;
    dimensions: number;
    maxResults: number;
    bounds: {
        min: [number, number, number];
        max: [number, number, number];
    };
}
interface SearchSpaceBounds {
    min: [number, number, number];
    max: [number, number, number];
}
interface CursorOptions {
    algorithm?: 'bfs' | 'dfs';
    regexEnabled?: boolean;
    initialSpace?: SearchSpace;
}

declare class SearchCursor {
    private index;
    private currentPosition;
    private searchSpace;
    private algorithm;
    private regexEnabled;
    constructor(index: TrieSpatialIndex, options?: CursorOptions);
    setAlgorithm(algorithm: 'bfs' | 'dfs'): void;
    setRegexEnabled(enabled: boolean): void;
    search(query: string): SearchResult[];
    limitSearchSpace(bounds: SearchSpaceBounds): void;
    resetSearchSpace(): void;
    private initializeSearchSpace;
    private createBoundedSearchSpace;
    private searchBFS;
    private searchDFS;
    private searchWithRegex;
    private isWithinSearchSpace;
    private matchesQuery;
    private getNodeChildren;
    private getNodeId;
    private createSearchResult;
}

declare class IndexManager {
    private trieSpatialIndex;
    private documents;
    private config;
    private telemetry;
    constructor(config: IndexConfig);
    initialize(): void;
    createSearchCursor(options?: CursorOptions): SearchCursor;
    addDocument(document: IndexedDocument$1): void;
    search(query: string, options?: SearchOptions$1): SearchResult[];
    private indexDocumentContent;
    private processFieldForIndexing;
    private normalizeValue;
    private tokenizeText;
    private createSearchSpaceFromOptions;
}

/**
 * QueryProcessor handles normalization, tokenization, and processing of search queries
 * to optimize search effectiveness and performance.
 */
declare class QueryProcessor {
    /**
     * Common stop words that are often excluded from search queries to improve relevance
     */
    private readonly STOP_WORDS;
    /**
     * Common word endings for normalization (stemming)
     */
    private readonly WORD_ENDINGS;
    /**
     * Special characters to handle in queries
     */
    private readonly SPECIAL_CHARS;
    /**
     * Process a search query to optimize for search effectiveness
     *
     * @param query The raw search query
     * @returns Processed query string
     */
    process(query: string | null | undefined): string;
    /**
     * Sanitize a query by trimming and normalizing spaces
     */
    private sanitizeQuery;
    /**
     * Extract quoted phrases from a query
     */
    private extractPhrases;
    /**
     * Tokenize text into separate terms
     */
    private tokenize;
    /**
     * Create a token from a term
     */
    private createToken;
    /**
     * Process array of tokens
     */
    private processTokens;
    /**
     * Determine if a token should be kept
     */
    private shouldKeepToken;
    /**
     * Normalize a token
     */
    private normalizeToken;
    /**
     * Normalize word endings for stemming
     */
    private normalizeWordEndings;
    /**
     * Check if a word is an exception for normalization
     */
    private isNormalizationException;
    /**
     * Normalize gerund form (-ing)
     */
    private normalizeGerund;
    /**
     * Normalize past tense (-ed)
     */
    private normalizePastTense;
    /**
     * Normalize plural forms (-s, -es, -ies)
     */
    private normalizePlural;
    /**
     * Reconstruct the query from processed tokens and phrases
     */
    private reconstructQuery;
}

declare class IndexTelemetry$1 {
    private readonly indexName;
    private metrics;
    private events;
    private errors;
    constructor(indexName: string);
    recordMetric(name: string, data: Record<string, any>): void;
    recordEvent(name: string, data: Record<string, any>): void;
    recordError(name: string, data: Record<string, any>): void;
    getMetrics(filter?: MetricsFilter): MetricsReport;
    getEvents(filter?: EventFilter): EventReport;
    getErrors(filter?: ErrorFilter): ErrorReport;
}

/**
 * Implements a link/relationship between two documents
 */
declare class DocumentLink implements DocumentLink$1 {
    readonly source: string;
    readonly target: string;
    readonly type: string;
    weight: number;
    url: string;
    /**
     * Create a new document link
     * @param source The source document ID
     * @param target The target document ID
     * @param type The type of relationship
     * @param weight Optional weight of the relationship (default: 1.0)
     * @param url Optional URL reference
     */
    constructor(source: string, target: string, type: string, weight?: number, url?: string);
    /**
     * Get the source document ID
     */
    fromId(fromId: string): string;
    /**
     * Get the target document ID
     */
    toId(toId: string): string;
    /**
     * Check if link is bidirectional based on type
     */
    isBidirectional(): boolean;
    /**
     * Update the weight of the link
     */
    setWeight(weight: number): void;
    /**
     * Update the URL reference
     */
    setUrl(url: string): void;
    /**
     * Check if this link connects two specific documents
     */
    connects(docId1: string, docId2: string): boolean;
    /**
     * Check if this link involves a specific document
     */
    involves(docId: string): boolean;
    /**
     * Get the other document ID in the relationship given one ID
     */
    getOtherId(docId: string): string;
    /**
     * Create a reversed version of this link
     */
    reverse(): DocumentLink;
    /**
     * Clone this link
     */
    clone(): DocumentLink;
    /**
     * Convert to a human-readable string
     */
    toString(): string;
    /**
     * Convert to a JSON object
     */
    toJSON(): object;
}

declare class MimeTypeDetector {
    private static readonly DEFAULT_TYPE;
    private readonly customMimeTypes;
    constructor(customTypes?: Record<string, string>);
    /**
     * Static detection by file extension
     */
    static detectFromExtension(filename: string): string;
    /**
     * Detect from file content (magic numbers)
     */
    static detectFromBuffer(buffer: Buffer): string;
    /**
     * Instance method with custom type support
     */
    detectType(filename: string, buffer?: Buffer): string;
    /**
     * Add custom mime type
     */
    addCustomType(extension: string, mimeType: string): void;
}

declare function validateSearchOptions(options: SearchOptions$1): void;
declare function validateIndexConfig(config: IndexConfig): void;
declare function validateDocument(document: SearchableDocument, fields: string[]): boolean;

declare const ValidationUtils_validateDocument: typeof validateDocument;
declare const ValidationUtils_validateIndexConfig: typeof validateIndexConfig;
declare const ValidationUtils_validateSearchOptions: typeof validateSearchOptions;
declare namespace ValidationUtils {
  export {
    ValidationUtils_validateDocument as validateDocument,
    ValidationUtils_validateIndexConfig as validateIndexConfig,
    ValidationUtils_validateSearchOptions as validateSearchOptions,
  };
}

type TimingRecord = {
    count: number;
    totalTime: number;
    maxTime: number;
    minTime: number;
    avgTime: number;
};
declare class PerformanceMonitor$1 {
    private metrics;
    private active;
    constructor(active?: boolean);
    /**
     * Static method to time a function execution
     */
    static time<T>(name: string, fn: () => Promise<T> | T): Promise<T>;
    /**
     * Measure execution time of a function
     */
    measure<T>(name: string, fn: () => Promise<T> | T): Promise<T>;
    /**
     * Record a performance metric
     */
    private recordMetric;
    /**
     * Get performance metrics
     */
    getMetrics(): MetricsResult;
    /**
     * Get metrics for a specific operation
     */
    getMetric(name: string): TimingRecord | undefined;
    /**
     * Reset all metrics
     */
    resetMetrics(): void;
    clear(): void;
    /**
     * Enable or disable performance monitoring
     */
    setActive(active: boolean): void;
}

declare abstract class DocumentProcessor {
    protected readonly performanceMonitor: PerformanceMonitor$1;
    protected readonly mimeDetector: MimeTypeDetector;
    protected readonly validator: typeof ValidationUtils;
    constructor();
    /**
     * Process a document and convert it to an indexed document
     * @param filePath Path to the document
     * @param content Raw content of the document
     * @param metadata Optional metadata
     */
    abstract process(filePath: string, content: Buffer | string, metadata?: DocumentMetadata): Promise<IndexedDocument$1>;
    /**
     * Extract text content from the document
     * @param content Raw document content
     */
    abstract extractContent(content: Buffer | string): Promise<DocumentContent>;
    /**
     * Check if this processor can handle the given file type
     * @param filePath Path to the document
     * @param mimeType Optional mime type
     */
    abstract canProcess(filePath: string, mimeType?: string): boolean;
    /**
     * Generate a unique document ID
     * @param filePath Path to the document
     */
    protected generateDocumentId(filePath: string): string;
    /**
     * Extract basic metadata from file path and content
     */
    protected extractBasicMetadata(filePath: string, content: Buffer | string): Promise<DocumentMetadata>;
}

declare class DocumentProcessorFactory {
    private processors;
    constructor();
    /**
     * Get the appropriate processor for a file
     */
    getProcessorForFile(filePath: string, mimeType?: string): DocumentProcessor;
    /**
     * Process a document with the appropriate processor
     */
    processDocument(filePath: string, content: Buffer | string, metadata?: any): Promise<IndexedDocument$1>;
}

declare class PlainTextProcessor extends DocumentProcessor {
    private readonly supportedExtensions;
    process(filePath: string, content: Buffer | string, metadata?: DocumentMetadata): Promise<IndexedDocument$1>;
    extractContent(content: Buffer | string): Promise<DocumentContent>;
    canProcess(filePath: string, mimeType?: string): boolean;
}

declare class HTMLProcessor extends DocumentProcessor {
    private readonly supportedExtensions;
    process(filePath: string, content: Buffer | string, metadata?: DocumentMetadata): Promise<IndexedDocument$1>;
    extractContent(content: Buffer | string): Promise<DocumentContent>;
    canProcess(filePath: string, mimeType?: string): boolean;
    private extractMetaTags;
}

declare class MarkdownProcessor extends DocumentProcessor {
    private readonly supportedExtensions;
    process(filePath: string, content: Buffer | string, metadata?: DocumentMetadata): Promise<IndexedDocument$1>;
    extractContent(content: Buffer | string): Promise<DocumentContent>;
    canProcess(filePath: string, mimeType?: string): boolean;
    private extractFrontmatter;
}

declare class BinaryProcessor extends DocumentProcessor {
    private readonly maxTextExtraction;
    process(filePath: string, content: Buffer | string, metadata?: DocumentMetadata): Promise<IndexedDocument$1>;
    extractContent(content: Buffer): Promise<DocumentContent>;
    canProcess(filePath: string, mimeType?: string): boolean;
    /**
     * Extract enhanced metadata for binary files
     */
    private extractEnhancedMetadata;
    /**
     * Calculate a simple hash for content identification
     */
    private calculateHash;
}

/**
 * Storage method interfaces
 */
interface StorageAdapter {
    initialize(): Promise<void>;
    store(key: string, data: unknown): Promise<void>;
    retrieve(key: string): Promise<unknown>;
    clear(): Promise<void>;
    close(): Promise<void>;
}
/**
 * Memory-based storage adapter implementation
 */
declare class MemoryStorageAdapter implements StorageAdapter {
    private storage;
    private performanceMonitor;
    private initialized;
    constructor();
    initialize(): Promise<void>;
    store(key: string, data: unknown): Promise<void>;
    retrieve(key: string): Promise<unknown>;
    clear(): Promise<void>;
    close(): Promise<void>;
    getMetrics(): MetricsResult;
}
/**
 * IndexedDB storage adapter implementation
 */
declare class IndexedDBAdapter implements StorageAdapter {
    private db;
    private readonly dbName;
    private readonly storeName;
    private readonly version;
    private performanceMonitor;
    private initialized;
    constructor(dbName: string, storeName?: string, version?: number);
    initialize(): Promise<void>;
    store(key: string, data: unknown): Promise<void>;
    retrieve(key: string): Promise<unknown>;
    clear(): Promise<void>;
    close(): Promise<void>;
    getMetrics(): MetricsResult;
}
/**
 * Factory to create the appropriate storage adapter based on environment
 */
declare class StorageAdapterFactory {
    static createAdapter(type: 'memory' | 'indexeddb' | 'filesystem', options?: Record<string, unknown>): StorageAdapter;
    static createManager(_type: 'memory' | 'indexeddb' | 'filesystem', _options?: Record<string, unknown>): StorageManager;
}

/**
 * File system storage adapter implementation for Node.js environments
 */
declare class FileSystemAdapter implements StorageAdapter {
    private basePath;
    private fs;
    private performanceMonitor;
    private initialized;
    constructor(basePath: string);
    private loadFsModule;
    initialize(): Promise<void>;
    store(key: string, data: unknown): Promise<void>;
    retrieve(key: string): Promise<unknown>;
    clear(): Promise<void>;
    close(): Promise<void>;
    private getFilePath;
    private fileExists;
    getMetrics(): MetricsResult;
}

/**
 * Comprehensive storage manager that can use different adapters
 */
declare class StorageManager$1 {
    private adapter;
    private optimizationEnabled;
    private cache;
    private readonly performanceMonitor;
    constructor(adapter: StorageAdapter, optimizationEnabled?: boolean);
    initialize(): Promise<void>;
    storeDocument(document: IndexedDocument): Promise<void>;
    retrieveDocument(id: string): Promise<IndexedDocument | null>;
    storeIndex(indexName: string, data: SerializedState): Promise<void>;
    retrieveIndex(indexName: string): Promise<SerializedState | null>;
    clearAll(): Promise<void>;
    clearCache(): Promise<void>;
    close(): Promise<void>;
    getMetrics(): MetricsResult;
    setAdapter(adapter: StorageAdapter): void;
    setOptimizationEnabled(enabled: boolean): void;
}

/**
 * Blob reader adapter for handling file uploads in browser environments
 */
declare class BlobReaderAdapter {
    private performanceMonitor;
    constructor();
    readBlob(blob: Blob): Promise<string>;
    createDocumentFromBlob(blob: Blob, id: string, metadata?: Record<string, unknown>): Promise<SearchableDocument>;
    getMetrics(): MetricsResult;
}

interface StorageConfig {
    type: 'memory' | 'indexeddb';
    options?: StorageOptions;
    maxSize?: number;
    ttl?: number;
}
interface StorageOptions {
    prefix?: string;
    compression?: boolean;
    encryption?: boolean;
    backupEnabled?: boolean;
}
interface IndexingConfig {
    enabled: boolean;
    fields: string[];
    options: IndexOptions;
}
interface IndexOptions {
    tokenization: boolean;
    caseSensitive: boolean;
    stemming: boolean;
    stopWords?: string[];
    minWordLength?: number;
    maxWordLength?: number;
    customTokenizer?: (text: string) => string[];
}
interface SearchConfig {
    defaultOptions: SearchOptions;
    fuzzy?: boolean;
    maxResults?: number;
    threshold?: number;
    boost?: Record<string, number>;
}
interface SearchOptions {
    fuzzy?: boolean;
    maxDistance?: number;
    includeMatches?: boolean;
    caseSensitive?: boolean;
    boost?: Record<string, number>;
    fields?: string[];
    maxResults?: number;
    threshold?: number;
    enableRegex?: boolean;
    regex?: string | RegExp;
}
interface DocumentConfig {
    enabled: boolean;
    versioning?: VersioningConfig;
    validation?: ValidationConfig;
    storage?: StorageConfig;
}
interface PluginConfig {
    name: string;
    enabled: boolean;
    options?: Record<string, unknown>;
}
interface ValidationConfig {
    required?: string[];
    customValidators?: Record<string, (value: unknown) => boolean>;
}
interface VersioningConfig {
    enabled: boolean;
    maxVersions?: number;
    strategy?: 'simple' | 'timestamp' | 'semantic';
}
interface ConfigValidationResult {
    valid: boolean;
    errors: string[];
}

declare class NexusSearchConfig {
    readonly name: string;
    readonly version: number;
    readonly fields: string[];
    readonly storage: StorageConfig;
    readonly indexing: IndexingConfig;
    readonly search: SearchConfig;
    readonly documentSupport?: DocumentConfig;
    readonly plugins?: PluginConfig[];
    constructor(config?: Partial<NexusSearchConfig>);
    /**
     * Validates the configuration
     */
    validate(): boolean;
    /**
     * Converts configuration to JSON
     */
    toJSON(): object;
    /**
     * Creates configuration from JSON
     */
    static fromJSON(json: string | object): NexusSearchConfig;
    /**
     * Creates configuration from file
     */
    static fromFile(path: string): Promise<NexusSearchConfig>;
    /**
     * Merges multiple configurations
     */
    static merge(...configs: Partial<NexusSearchConfig>[]): NexusSearchConfig;
    /**
     * Creates a development configuration
     */
    static createDevConfig(options?: Partial<NexusSearchConfig>): NexusSearchConfig;
    /**
     * Creates a production configuration
     */
    static createProdConfig(options?: Partial<NexusSearchConfig>): NexusSearchConfig;
}

declare const defaultConfig: {
    name: string;
    version: number;
    fields: string[];
    storage: StorageConfig;
    indexing: IndexingConfig;
    search: SearchConfig;
    documentSupport: DocumentConfig;
    plugins: never[];
};

declare function validateConfigWithDetails(config: unknown): ConfigValidationResult;

declare class DataMapper {
    private dataMap;
    constructor();
    mapData(key: string, documentId: string): void;
    getDocuments(key: string): Set<string>;
    getDocumentById(documentId: string): Set<string>;
    getAllKeys(): string[];
    removeDocument(documentId: string): void;
    removeKey(key: string): void;
    exportState(): Record<string, string[]>;
    importState(state: Record<string, string[]>): void;
    clear(): void;
}

declare class IndexMapper {
    private dataMapper;
    private trieSearch;
    private documents;
    private documentScores;
    constructor(state?: {
        dataMap?: Record<string, string[]>;
    });
    indexDocument(document: SearchableDocument, id: string, fields: string[]): void;
    search(query: string, options?: {
        fuzzy?: boolean;
        maxResults?: number;
    }): SearchResult<string>[];
    private normalizeValue;
    private tokenizeText;
    private calculateScore;
    private calculateTermFrequency;
    removeDocument(id: string): void;
    addDocument(document: SearchableDocument, id: string, fields: string[]): void;
    updateDocument(document: SearchableDocument, id: string, fields: string[]): void;
    getDocumentById(id: string): IndexedDocument$1 | undefined;
    getAllDocuments(): Map<string, IndexedDocument$1>;
    exportState(): unknown;
    importState(state: {
        trie: SerializedState;
        dataMap: Record<string, string[]>;
        documents?: [string, IndexedDocument$1][];
    }): void;
    clear(): void;
}

declare class IndexTelemetry {
    private readonly indexName;
    private metrics;
    private events;
    private errors;
    constructor(indexName: string);
    recordMetric(name: string, data: Record<string, any>): void;
    recordEvent(name: string, data: Record<string, any>): void;
    recordError(name: string, data: Record<string, any>): void;
    getMetrics(filter?: MetricsFilter): MetricsReport;
    getEvents(filter?: EventFilter): EventReport;
    getErrors(filter?: ErrorFilter): ErrorReport;
    export(): Record<string, any>;
    import(data: Record<string, any>): void;
}

declare class MetricsCollection {
    private metrics;
    add(name: string, data: Record<string, any>): void;
    getReport(filter?: MetricsFilter): MetricsReport;
    getCount(): number;
    export(): TelemetryEvent[];
    import(data: TelemetryEvent[]): void;
    private calculateAverages;
    private calculateMinValues;
    private calculateMaxValues;
}

declare class EventCollection {
    private events;
    add(name: string, data: Record<string, any>): void;
    getReport(filter?: EventFilter): EventReport;
    getCount(): number;
    export(): TelemetryEvent[];
    import(data: TelemetryEvent[]): void;
}

declare class ErrorCollection {
    private errors;
    add(name: string, data: Record<string, any>): void;
    getReport(filter?: ErrorFilter): ErrorReport;
    getCount(): number;
    export(): TelemetryEvent[];
    import(data: TelemetryEvent[]): void;
}

declare class TelemetryReporter {
    private telemetry;
    constructor(telemetry: IndexTelemetry);
    generateMetricsReport(filter?: MetricsFilter): string;
    generateEventReport(filter?: EventFilter): string;
    generateErrorReport(filter?: ErrorFilter): string;
    generateFullReport(): string;
}

/**
 * Performs an optimized Breadth-First Search traversal with regex matching
 */
declare function bfsRegexTraversal(root: IndexNode, pattern: string | RegExp, maxResults?: number, config?: RegexSearchConfig): RegexSearchResult[];
/**
 * Performs an optimized Depth-First Search traversal with regex matching
 */
declare function dfsRegexTraversal(root: IndexNode, pattern: string | RegExp, maxResults?: number, config?: RegexSearchConfig): RegexSearchResult[];
/**
 * Optimizes an array of indexable documents
 */
declare function optimizeIndex<T extends IndexedDocument>(data: T[]): OptimizationResult<T>;
/**
 * Helper function to sort object keys recursively
 */
declare function sortObjectKeys<T extends object>(obj: T): T;
/**
 * Helper function to generate consistent sort keys for documents
 */
declare function generateSortKey(doc: IndexedDocument): string;
declare function createSearchableFields(document: SearchableDocument, fields: string[]): Record<string, string>;
declare function normalizeFieldValue(value: DocumentValue): string;
declare function getNestedValue(obj: unknown, path: string): unknown;
declare function calculateScore(document: IndexedDocument, query: string, field: string, options?: {
    fuzzy?: boolean;
    caseSensitive?: boolean;
    exactMatch?: boolean;
    fieldWeight?: number;
}): number;
declare function extractMatches(document: IndexedDocument, query: string, fields: string[], options?: {
    fuzzy?: boolean;
    caseSensitive?: boolean;
}): string[];

declare class PerformanceMonitor {
    private metrics;
    constructor();
    measure<T>(name: string, fn: () => Promise<T>): Promise<T>;
    private recordMetric;
    getMetrics(): MetricsResult;
    private average;
    clear(): void;
}

declare class AlgoUtils {
    /**
     * Performs Breadth-First Search traversal on a trie structure
     * @param root Starting node of the trie
     * @param searchText Text to search for
     * @param maxResults Maximum number of results to return
     * @returns Array of matching document IDs with their scores
     */
    static bfsTraversal(root: IndexNode, searchText: string, maxResults?: number): Array<{
        id: string;
        score: number;
    }>;
    /**
     * Performs Depth-First Search traversal on a trie structure
     * @param root Starting node of the trie
     * @param searchText Text to search for
     * @param maxResults Maximum number of results to return
     * @returns Array of matching document IDs with their scores
     */
    static dfsTraversal(root: IndexNode, searchText: string, maxResults?: number): Array<{
        id: string;
        score: number;
    }>;
    /**
     * Performs fuzzy matching using Levenshtein distance
     * @param root Starting node of the trie
     * @param searchText Text to search for
     * @param maxDistance Maximum edit distance allowed
     * @param maxResults Maximum number of results to return
     * @returns Array of matching document IDs with their scores and distances
     */
    static fuzzySearch(root: IndexNode, searchText: string, maxDistance?: number, maxResults?: number): Array<{
        id: string;
        score: number;
        distance: number;
    }>;
    static enhancedSearch(root: IndexNode, searchText: string, documents: Map<string, IndexedDocument>, documentLinks: DocumentLink$1[]): Array<{
        id: string;
        score: number;
        rank: number;
    }>;
}

declare class ScoringUtils {
    private static readonly DAMPING_FACTOR;
    private static readonly MAX_ITERATIONS;
    private static readonly CONVERGENCE_THRESHOLD;
    /**
     * Calculates document ranks using a PageRank-inspired algorithm
     * @param documents Map of document IDs to their content
     * @param links Array of document links representing relationships
     * @returns Map of document IDs to their calculated ranks
     */
    static calculateDocumentRanks(documents: Map<string, unknown>, links: DocumentLink$1[]): Map<string, DocumentRank>;
    /**
     * Calculates Term Frequency-Inverse Document Frequency (TF-IDF)
     * @param term Search term
     * @param document Current document content
     * @param documents All documents map
     * @returns TF-IDF score
     */
    static calculateTfIdf(term: string, document: unknown, documents: Map<string, unknown>): number;
    /**
     * Calculates term frequency in a document
     */
    private static calculateTermFrequency;
    /**
     * Calculates inverse document frequency
     */
    private static calculateInverseDocumentFrequency;
    /**
     * Combines multiple scoring factors to create a final relevance score
     * @param textScore Base text matching score
     * @param documentRank PageRank-like score for the document
     * @param termFrequency Term frequency in the document
     * @param inverseDocFreq Inverse document frequency
     * @returns Combined relevance score
     */
    static calculateCombinedScore(textScore: number, documentRank: number, termFrequency: number, inverseDocFreq: number): number;
    /**
     * Adjusts scores based on document freshness
     * @param baseScore Original relevance score
     * @param documentDate Document creation/update date
     * @param maxAge Maximum age in days for full score
     * @returns Adjusted score based on freshness
     */
    static adjustScoreByFreshness(baseScore: number, documentDate: Date, maxAge?: number): number;
}

/**
 * Creates a mock IndexedDocument for testing purposes
 * @param id Document ID
 * @param customContent Optional custom content
 * @param customMetadata Optional custom metadata
 */
declare const createMockDocument: (id: string, customContent?: DocumentContent, customMetadata?: DocumentMetadata) => IndexedDocument$1;
/**
 * Creates multiple mock documents
 * @param count Number of documents to create
 * @param prefix ID prefix
 */
declare const createMockDocuments: (count: number, prefix?: string) => IndexedDocument$1[];
declare function createIndexedDocument(id: string, fields: {
    title: string;
    content: DocumentContent;
    author: string;
    tags: string[];
    version: string;
}, metadata?: DocumentMetadata, versions?: DocumentVersion[], relations?: DocumentRelation[]): IndexedDocument$1;
declare function createTestDocument(id: string, title: string, contentText: string): IndexedDocument$1;

export { AlgoUtils, BaseDocument, BinaryProcessor, BlobReaderAdapter, CacheError, CacheManager, CacheStrategyType, ConfigError, validateConfigWithDetails as ConfigValidator, Container, DataMapper, DocumentLink, DocumentProcessor, DocumentProcessorFactory, ErrorCollection, EventCollection, FileSystemAdapter, HTMLProcessor, IndexError, IndexManager, IndexMapper, IndexTelemetry$1 as IndexTelemetry, IndexedDB, IndexedDBAdapter, IndexedDocument, MapperError, MarkdownProcessor, MemoryStorageAdapter, MetricsCollection, NexusSearchConfig, PerformanceError, PerformanceMonitor, PlainTextProcessor, QueryProcessor, Registry, ScoringUtils, SearchCursor, SearchEngine, SearchError, SearchEventError, SearchStorage, ServiceIdentifiers, StorageAdapterFactory, StorageError, IndexManager$1 as StorageIndexManager, StorageManager$1 as StorageManager, TelemetryReporter, TrieNode, TrieSearch, TrieSpatialIndex, ValidationError, bfsRegexTraversal$1 as bfsRegexTraversal, bfsTraversal, calculateFuzzyScore, calculateLevenshteinDistance, calculateScore, createIndexedDocument, createMockDocument, createMockDocuments, createSearchableFields, createTestDocument, defaultContainer, defaultConfig as defaults, dfsRegexTraversal$1 as dfsRegexTraversal, dfsTraversal, extractMatches, fuzzySearchRecursive, generateSortKey, getNestedValue, isPotentialFuzzyMatch, normalizeFieldValue, optimizeIndex, priorityFuzzyMatch, registerCoreServices, sortObjectKeys, bfsRegexTraversal as utilBfsRegexTraversal, dfsRegexTraversal as utilDfsRegexTraversal, validateDocument, validateIndexConfig, validateSearchOptions };
export type { AdvancedSearchOptions, ArrayValue, BaseEvent, BaseFields, CacheEntry, CacheOptions, CacheStatus, CacheStrategy, ConfigValidationResult, CreateDocumentOptions, CursorOptions, CursorPosition, DatabaseConfig, DocumentBase, DocumentConfig$1 as DocumentConfig, DocumentContent, DocumentMetadata, DocumentRank, DocumentRelation, DocumentScore, DocumentStatus, DocumentValue, DocumentVersion, DocumentWorkflow, ErrorEvent, ErrorFilter, ErrorReport, EventFilter, EventReport, ExtendedSearchOptions, IndexConfig, IndexNode, IndexOptions$1 as IndexOptions, IndexableFields, IndexedDocumentData, IndexingConfig, MapperOptions, MapperState, MetadataEntry, MetricsFilter, MetricsReport, MetricsResult, NexusDocument, NexusDocumentInput, NexusDocumentMetadata, NexusDocumentPluginConfig, NexusFields, NormalizedDocument, OptimizationOptions, OptimizationResult, PerformanceMetric, PluginConfig, PrimitiveValue, QueryToken, RegexSearchConfig, RegexSearchResult, RelationType, ScoringMetrics, Search, SearchConfig, SearchContext, SearchDBSchema, SearchEngineConfig, SearchEngineOptions, SearchEvent, SearchEventEmitter, SearchEventListener, SearchEventType, SearchMatch, SearchNode, SearchOptions$1 as SearchOptions, SearchPagination, SearchResult, SearchScoreParams, SearchSpace, SearchSpaceBounds, SearchStats, SearchableDocument, SearchableField, SerializedIndex, SerializedState, SerializedTrieNode, StorageAdapter, StorageConfig$1 as StorageConfig, StorageEntry, StorageOptions$1 as StorageOptions, StorageOptionsConfig, SuccessEvent, TelemetryEvent, TextScore, TokenInfo, TrieSearchOptions, ValidationConfig$1 as ValidationConfig, VersioningConfig$1 as VersioningConfig };
