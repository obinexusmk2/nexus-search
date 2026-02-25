import { IndexedDocument, SearchOptions, SearchResult } from "@/types";
import { TrieNode } from "../algorithms";
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
export declare class TrieSpatialIndex {
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
    addDocument(document: IndexedDocument, coordinates?: Record<string, number[]>): void;
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
    search(query: string, region?: SpatialRegion, options?: SearchOptions): SearchResult<string>[];
    /**
     * Perform spatial-only search within a region
     * @param region Spatial region to search within
     * @param maxResults Maximum number of results
     * @returns Array of documents within the region
     */
    spatialSearch(region: SpatialRegion, maxResults?: number): IndexedDocument[];
    /**
     * Find the nearest neighbors to a point in the spatial index
     * @param point Reference point
     * @param k Number of neighbors to find
     * @param dimension Optional dimension to search in (defaults to all)
     * @returns Array of nearest documents and their distances
     */
    findNearestNeighbors(point: number[], k?: number, dimension?: string): Array<{
        document: IndexedDocument;
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
export {};
//# sourceMappingURL=TrieSpatialIndex.d.ts.map