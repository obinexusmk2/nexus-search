import { TrieSpatialIndex } from './TrieSpatialIndex';
import { CursorOptions, SearchSpaceBounds } from '../telemetry/TelemetryTypes';
import { SearchResult } from '../types';
export declare class SearchCursor {
    private index;
    private currentPosition;
    private searchSpace;
    private algorithm;
    private regexEnabled;
    constructor(index: TrieSpatialIndex, options?: CursorOptions);
    setAlgorithm(algorithm: 'bfs' | 'dfs'): void;
    setRegexEnabled(enabled: boolean): void;
    search(query: string): SearchResult[];
    limitSearchSpace(bounds: SearchSpaceBounds): void;
    resetSearchSpace(): void;
    private initializeSearchSpace;
    private createBoundedSearchSpace;
    private searchBFS;
    private searchDFS;
    private searchWithRegex;
    private isWithinSearchSpace;
    private matchesQuery;
    private getNodeChildren;
    private getNodeId;
    private createSearchResult;
}
//# sourceMappingURL=SearchCursor.d.ts.map