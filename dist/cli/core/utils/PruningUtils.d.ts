import { TrieNode } from '@/types';
export declare class PruningUtils {
    private readonly pruningThreshold;
    constructor(pruningThreshold?: number);
    /**
     * Generic node pruning algorithm for any tree-like structure
     */
    static pruneNode<T>(node: {
        children: Map<string, T>;
    }, shouldPruneFn: (node: T) => boolean): boolean;
    /**
     * Prunes a Trie structure based on document frequency
     */
    static pruneTrieByFrequency(root: TrieNode, minFrequency: number): void;
    /**
     * Prunes a Trie by weight threshold
     */
    static pruneTrieByWeight(root: TrieNode, minWeight: number): void;
    /**
     * Prunes a Trie by recency
     */
    static pruneTrieByRecency(root: TrieNode, maxAgeMs: number): void;
    /**
     * Instance method for customized pruning
     */
    pruneWithThreshold(root: TrieNode, evaluationFn: (node: TrieNode) => number): void;
}
//# sourceMappingURL=PruningUtils.d.ts.map