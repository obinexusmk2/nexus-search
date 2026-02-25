import { IndexNode, RegexSearchConfig, RegexSearchResult } from '@/types';
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
export declare function dfsTraversal(root: IndexNode, query: string, maxResults?: number, config?: RegexSearchConfig): RegexSearchResult[];
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
export declare function dfsRegexTraversal(root: IndexNode, regex: RegExp, maxResults?: number, config?: RegexSearchConfig): RegexSearchResult[];
//# sourceMappingURL=DFS.d.ts.map