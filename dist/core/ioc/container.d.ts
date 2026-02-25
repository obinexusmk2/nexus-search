import { Registry } from './registry';
type ProviderFactory<T> = () => T;
type ProviderType<T> = {
    new (...args: any[]): T;
} | ProviderFactory<T>;
/**
 * Container for dependency injection
 * Manages the instantiation and retrieval of services
 */
export declare class Container {
    private registry;
    private instances;
    private singletons;
    constructor(registry?: Registry);
    /**
     * Register a provider with the container
     * @param token Identifier for the provider
     * @param provider Constructor or factory function for the provider
     * @param singleton Whether the provider should be a singleton
     */
    register<T>(token: string, provider: ProviderType<T>, singleton?: boolean): void;
    /**
     * Get an instance of a registered provider
     * @param token Identifier for the provider
     * @param args Optional arguments to pass to the constructor or factory
     */
    get<T>(token: string, ...args: any[]): T;
    /**
     * Remove a provider from the container
     * @param token Identifier for the provider
     */
    unregister(token: string): boolean;
    /**
     * Check if a provider is registered
     * @param token Identifier for the provider
     */
    has(token: string): boolean;
    /**
     * Clear all providers and instances
     */
    clear(): void;
    /**
     * Check if a function is a constructor
     * @param fn Function to check
     */
    private isConstructor;
}
export {};
//# sourceMappingURL=container.d.ts.map