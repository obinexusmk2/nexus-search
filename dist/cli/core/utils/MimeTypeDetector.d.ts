export declare class MimeTypeDetector {
    private static readonly DEFAULT_TYPE;
    private readonly customMimeTypes;
    constructor(customTypes?: Record<string, string>);
    /**
     * Static detection by file extension
     */
    static detectFromExtension(filename: string): string;
    /**
     * Detect from file content (magic numbers)
     */
    static detectFromBuffer(buffer: Buffer): string;
    /**
     * Instance method with custom type support
     */
    detectType(filename: string, buffer?: Buffer): string;
    /**
     * Add custom mime type
     */
    addCustomType(extension: string, mimeType: string): void;
}
//# sourceMappingURL=MimeTypeDetector.d.ts.map