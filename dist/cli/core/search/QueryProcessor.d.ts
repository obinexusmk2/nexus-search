/**
 * QueryProcessor handles normalization, tokenization, and processing of search queries
 * to optimize search effectiveness and performance.
 */
export declare class QueryProcessor {
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
//# sourceMappingURL=QueryProcessor.d.ts.map