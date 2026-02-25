import { IndexConfig, SerializedIndex } from "@/types";
import { StorageAdapter } from "./StorageAdapter";
export declare class IndexedDBAdapter implements StorageAdapter {
    private db;
    private readonly dbName;
    private readonly dbVersion;
    private initPromise;
    constructor(dbName?: string, dbVersion?: number);
    initialize(): Promise<void>;
    private initializeDB;
    storeIndex(name: string, data: SerializedIndex): Promise<void>;
    getIndex(name: string): Promise<SerializedIndex | null>;
    updateMetadata(name: string, config: IndexConfig): Promise<void>;
    getMetadata(name: string): Promise<IndexConfig | null>;
    removeIndex(name: string): Promise<void>;
    clearIndices(): Promise<void>;
    hasIndex(name: string): Promise<boolean>;
    listIndices(): Promise<string[]>;
    close(): Promise<void>;
    private ensureConnection;
}
//# sourceMappingURL=IndexedDBAdapter.d.ts.map