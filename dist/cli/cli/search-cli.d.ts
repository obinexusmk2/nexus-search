/**
 * CLI interface for NexusSearch
 */
export declare class SearchCLI {
    private searchEngine;
    constructor();
    /**
     * Initialize the CLI
     */
    initialize(): Promise<void>;
    /**
     * Perform a search
     * @param query Search query
     * @param options Search options
     */
    search(query: string, options?: any): Promise<any>;
    /**
     * Add a document to the index
     * @param document Document to add
     */
    addDocument(document: any): Promise<void>;
    /**
     * Close the CLI and release resources
     */
    close(): Promise<void>;
}
export default SearchCLI;
//# sourceMappingURL=search-cli.d.ts.map