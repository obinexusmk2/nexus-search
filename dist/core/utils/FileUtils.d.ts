declare global {
    interface Window {
        fs?: {
            readFile: (path: string, options?: {
                encoding?: string;
            }) => Promise<Buffer | string>;
            writeFile: (path: string, content: string | Buffer, options?: {
                encoding?: string;
            }) => Promise<void>;
            stat: (path: string) => Promise<unknown>;
        };
    }
}
export declare class FileUtils {
    private readonly maxFileSize;
    constructor(maxFileSize?: number);
    /**
     * Static method to read a file asynchronously
     */
    static readFile(path: string, options?: {
        encoding?: string;
    }): Promise<Buffer | string>;
    /**
     * Read text file with proper encoding detection
     */
    static readTextFile(path: string): Promise<string>;
    /**
     * Detect file encoding
     */
    private static detectEncoding;
    /**
     * Instance method to read file with size validation
     */
    readFileWithSizeCheck(path: string): Promise<Buffer>;
    /**
     * Write content to file
     */
    static writeFile(path: string, content: string | Buffer, options?: {
        encoding?: string;
    }): Promise<void>;
    /**
     * Check if file exists
     */
    static fileExists(path: string): Promise<boolean>;
}
//# sourceMappingURL=FileUtils.d.ts.map