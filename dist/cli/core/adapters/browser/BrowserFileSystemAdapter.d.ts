import { BaseFileSystemAdapter, FileHandler, FileSystemOptions } from "../common/FileSystemAdapter";
/**
 * Enhanced options for browser file system adapter
 */
export interface BrowserFileSystemOptions extends FileSystemOptions {
    dbName?: string;
    storeName?: string;
}
/**
 * Browser-specific implementation of the FileSystemAdapter
 * Uses IndexedDB for persistent storage
 */
export declare class BrowserFileSystemAdapter extends BaseFileSystemAdapter {
    private fileHandler;
    constructor(options?: BrowserFileSystemOptions);
    /**
     * Get the browser-specific file handler
     */
    protected getFileHandler(): FileHandler;
    /**
     * Override initialize to initialize the file handler
     */
    initialize(): Promise<void>;
    /**
     * Override close to close the file handler
     */
    close(): Promise<void>;
}
//# sourceMappingURL=BrowserFileSystemAdapter.d.ts.map