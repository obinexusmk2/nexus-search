// src/core/index.d.ts
// Type-only declaration barrel for the core module.
// Mirrors src/core/index.ts but uses `export type` to prevent value emission.

// ─── Types ───────────────────────────────────────────────────────────────────
export type * from './types';

// ─── IoC Container ───────────────────────────────────────────────────────────
export type * from './ioc';

// ─── Algorithms ──────────────────────────────────────────────────────────────
export type { TrieNode } from './algorithms/trie/TrieNode';
export type { TrieSearch } from './algorithms/trie/TrieSearch';

// ─── Search Engine ───────────────────────────────────────────────────────────
export type { SearchEngine } from './search/SearchEngine';
export type { IndexManager } from './search/IndexManager';
export type { QueryProcessor } from './search/QueryProcessor';
export type { SearchCursor } from './search/SearchCursor';
export type { TrieSpatialIndex } from './search/TrieSpatialIndex';
export type { IndexTelemetry } from './search/IndexTelemetry';
export type { DocumentLink } from './search/DocumentLink';

// ─── Storage ─────────────────────────────────────────────────────────────────
export type * from './storage';

// ─── Document Processors ─────────────────────────────────────────────────────
export type { DocumentProcessor } from './documents/DocumentProcessor';
export type { DocumentProcessorFactory } from './documents/DocumentProccessorFactory';
export type { PlainTextProcessor } from './documents/PlainTextProcessor';
export type { HTMLProcessor } from './documents/HTMLProcessor';
export type { MarkdownProcessor } from './documents/MarkdownProcessor';
export type { BinaryProcessor } from './documents/BinaryProcessor';

// ─── Adapters ────────────────────────────────────────────────────────────────
export type * from './adapters';

// ─── Configuration ───────────────────────────────────────────────────────────
export type * from './config';

// ─── Mappers ─────────────────────────────────────────────────────────────────
export type * from './mappers';

// ─── Telemetry ───────────────────────────────────────────────────────────────
export type * from './telemetry';

// ─── Utils ───────────────────────────────────────────────────────────────────
export type * from './utils';
