/**
 * Registry for IoC container
 * Stores provider definitions
 */
export declare class Registry {
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
//# sourceMappingURL=registry.d.ts.map