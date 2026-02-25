import { Container } from './container';
/**
 * Service identifiers for dependency injection
 */
export declare const ServiceIdentifiers: {
    CACHE_MANAGER: string;
    INDEX_MANAGER: string;
    SEARCH_ENGINE: string;
    QUERY_PROCESSOR: string;
    INDEX_MAPPER: string;
    STORAGE_ADAPTER: string;
    PERSISTENCE_MANAGER: string;
};
/**
 * Register core services with the IoC container
 * @param container IoC container
 * @param config Configuration object for services
 */
export declare function registerCoreServices(container: Container, config?: {
    storage?: 'memory' | 'indexeddb';
    indexConfig?: any;
    cacheOptions?: any;
}): void;
//# sourceMappingURL=providers.d.ts.map