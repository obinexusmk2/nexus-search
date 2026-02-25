// src/core/index.ts

// ─── Types (foundational — must come first) ──────────────────────────────────
export * from './types';

// ─── IoC Container ───────────────────────────────────────────────────────────
export * from './ioc';

// ─── Algorithms ──────────────────────────────────────────────────────────────
// Trie (canonical from trie/ subdirectory — avoids duplicate root-level copies)
export { TrieNode } from './algorithms/trie/TrieNode';
export { TrieSearch } from './algorithms/trie/TrieSearch';
// BFS / DFS traversal
export { bfsTraversal, bfsRegexTraversal } from './algorithms/BFS';
export { dfsTraversal, dfsRegexTraversal } from './algorithms/DFS';
// Fuzzy matching
export * from './algorithms/FuzzySearch';

// ─── Search Engine ───────────────────────────────────────────────────────────
export { SearchEngine } from './search/SearchEngine';
export { IndexManager } from './search/IndexManager';
export { QueryProcessor } from './search/QueryProcessor';
export { SearchCursor } from './search/SearchCursor';
export { TrieSpatialIndex } from './search/TrieSpatialIndex';
export { IndexTelemetry } from './search/IndexTelemetry';
export { DocumentLink } from './search/DocumentLink';

// ─── Storage ─────────────────────────────────────────────────────────────────
export { CacheManager } from './storage/CacheManager';
export { IndexedDB } from './storage/IndexedDBService';
export { SearchStorage } from './storage/SearchStorage';
export { IndexedDocument } from './storage/IndexedDocument';
export { IndexManager as StorageIndexManager } from './storage/IndexManager';
export { BaseDocument } from './storage/BaseDocument';

// ─── Document Processors ─────────────────────────────────────────────────────
// Imported directly — documents/index.ts has a self-referential export bug
export { DocumentProcessor } from './documents/DocumentProcessor';
export { DocumentProcessorFactory } from './documents/DocumentProcessorFactory';
export { PlainTextProcessor } from './documents/PlainTextProcessor';
export { HTMLProcessor } from './documents/HTMLProcessor';
export { MarkdownProcessor } from './documents/MarkdownProcessor';
export { BinaryProcessor } from './documents/BinaryProcessor';

// ─── Adapters ────────────────────────────────────────────────────────────────
export * from './adapters';

// ─── Configuration ───────────────────────────────────────────────────────────
export { NexusSearchConfig } from './config/NexusSearchConfig';
export { defaultConfig as defaults } from './config/defaults';
export { validateConfigWithDetails as ConfigValidator } from './config/ConfigValidator';
export type { IndexingConfig, SearchConfig, PluginConfig, ConfigValidationResult } from './config/interfaces';

// ─── Mappers ─────────────────────────────────────────────────────────────────
export * from './mappers';

// ─── Telemetry ───────────────────────────────────────────────────────────────
export * from './telemetry';

// ─── Utils ───────────────────────────────────────────────────────────────────
export {
    bfsRegexTraversal as utilBfsRegexTraversal,
    dfsRegexTraversal as utilDfsRegexTraversal,
    optimizeIndex,
    sortObjectKeys,
    generateSortKey,
    createSearchableFields,
    normalizeFieldValue,
    getNestedValue,
    calculateScore,
    extractMatches
} from './utils/SearchUtils';
export { PerformanceMonitor } from './utils/PerformanceUtils';
export { validateSearchOptions, validateIndexConfig, validateDocument } from './utils/ValidationUtils';
export { AlgoUtils } from './utils/AlgoUtils';
export { ScoringUtils } from './utils/ScoringUtils';
export * from './utils/StorageUtils';
export { createMockDocument, createMockDocuments, createIndexedDocument, createTestDocument } from './utils/createMockDocument';
