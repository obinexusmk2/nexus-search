import { BaseFileSystemAdapter, FileHandler, FileSystemOptions } from "../common/FileSystemAdapter";
/**
 * Node.js-specific implementation of the FileSystemAdapter
 * Uses Node.js fs/promises module for file system operations
 */
export declare class NodeFileSystemAdapter extends BaseFileSystemAdapter {
    private fileHandler;
    constructor(options?: FileSystemOptions);
    /**
     * Get the Node.js-specific file handler
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
//# sourceMappingURL=NodeFileSystemAdapter.d.ts.map