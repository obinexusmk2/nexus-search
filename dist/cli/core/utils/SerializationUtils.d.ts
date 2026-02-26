import { IndexedDocument } from '@/types';
import { TrieNode } from '@/algorithms/trie/TrieNode';
export declare class SerializationUtils {
    private compressionEnabled;
    private static readonly SERIALIZATION_VERSION;
    constructor(compressionEnabled?: boolean);
    /**
     * Memory-optimized trie serialization
     */
    static serializeTrie(node: TrieNode): unknown;
    /**
     * Helper method to serialize a single node
     */
    private static serializeNode;
    /**
     * Type-safe deserialization of trie
     */
    static deserializeTrie(data: unknown): TrieNode;
    /**
     * Helper method to deserialize a single node
     */
    private static deserializeNode;
    /**
     * Memory-efficient document serialization
     */
    static serializeDocuments(documents: Map<string, IndexedDocument>): unknown;
    /**
     * Helper for field serialization
     */
    private static serializeFields;
    /**
     * Helper for metadata serialization
     */
    private static serializeMetadata;
    /**
     * Version serialization
     */
    private static serializeVersion;
    /**
     * Instance method to serialize with compression option
     */
    serializeWithCompression(data: any): string;
}
//# sourceMappingURL=SerializationUtils.d.ts.map