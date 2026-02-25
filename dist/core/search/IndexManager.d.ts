import { IndexConfig, IndexedDocument, SearchOptions, SearchResult } from '@/types';
import { SearchCursor } from './SearchCursor';
import { CursorOptions } from '../telemetry/TelemetryTypes';
export declare class IndexManager {
    private trieSpatialIndex;
    private documents;
    private config;
    private telemetry;
    constructor(config: IndexConfig);
    initialize(): void;
    createSearchCursor(options?: CursorOptions): SearchCursor;
    addDocument(document: IndexedDocument): void;
    search(query: string, options?: SearchOptions): SearchResult[];
    private indexDocumentContent;
    private processFieldForIndexing;
    private normalizeValue;
    private tokenizeText;
    private createSearchSpaceFromOptions;
}
//# sourceMappingURL=IndexManager.d.ts.map