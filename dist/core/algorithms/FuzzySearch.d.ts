/**
 * FuzzySearch.ts
 * Implements fuzzy matching algorithms for the NexusSearch engine
 */
import { TrieNode } from "./trie/TrieNode";
import { SearchResult } from "@/types";
/**
 * Calculates the Levenshtein distance between two strings
 * This is the minimum number of single-character edits required to change one string into the other
 *
 * @param s1 First string
 * @param s2 Second string
 * @returns Edit distance value
 */
export declare function calculateLevenshteinDistance(s1: string, s2: string): number;
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
export declare function fuzzySearchRecursive(node: TrieNode, current: string, currentDistance: number, depth: number, state: {
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
export declare function calculateFuzzyScore(node: TrieNode, term: string, distance: number): number;
/**
 * Priority-based fuzzy search that optimizes for specific fuzzy matching scenarios
 *
 * @param targetWord Word to search for
 * @param candidates Array of candidate words to match against
 * @param maxDistance Maximum Levenshtein distance to consider
 * @returns Array of matches with distances and similarities
 */
export declare function priorityFuzzyMatch(targetWord: string, candidates: string[], maxDistance?: number): Array<{
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
export declare function isPotentialFuzzyMatch(target: string, candidate: string, maxDistance: number): boolean;
//# sourceMappingURL=FuzzySearch.d.ts.map