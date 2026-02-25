export declare class PathUtils {
    private readonly rootDir;
    constructor(rootDir?: string);
    /**
     * Static method to join path segments
     */
    static join(...paths: string[]): string;
    /**
     * Get file extension
     */
    static getExtension(path: string): string;
    /**
     * Get filename without extension
     */
    static getBasename(path: string, includeExtension?: boolean): string;
    /**
     * Get directory name
     */
    static getDirname(path: string): string;
    /**
     * Normalize path separators
     */
    static normalizePath(path: string): string;
    /**
     * Check if path is absolute
     */
    static isAbsolute(path: string): boolean;
    /**
     * Get relative path
     */
    static relative(from: string, to: string): string;
    /**
     * Instance method to resolve path relative to root directory
     */
    resolve(...paths: string[]): string;
}
//# sourceMappingURL=PathUtils.d.ts.map