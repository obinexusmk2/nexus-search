import { MetricsResult, SearchableDocument } from "@/types";
/**
 * Options for configuring the BlobHandler
 */
export interface BlobHandlerOptions {
    /**
     * Default chunk size for reading large files (in bytes)
     */
    chunkSize?: number;
    /**
     * Default encoding for text operations
     */
    defaultEncoding?: string;
    /**
     * Whether to collect detailed metrics
     */
    detailedMetrics?: boolean;
}
/**
 * Blob processing result with metadata
 */
export interface BlobProcessingResult {
    /**
     * The processed content as string
     */
    content: string;
    /**
     * Metadata extracted from the blob
     */
    metadata: {
        /**
         * MIME type
         */
        type: string;
        /**
         * File size in bytes
         */
        size: number;
        /**
         * Last modified timestamp (if available)
         */
        lastModified?: number;
        /**
         * Original filename (if available)
         */
        name?: string;
        /**
         * Content encoding
         */
        encoding?: string;
        /**
         * Additional properties
         */
        [key: string]: unknown;
    };
}
/**
 * BlobHandler provides utilities for working with Blob objects and Files in browser environments
 * It includes methods for reading, processing, and converting blobs to searchable documents
 */
export declare class BlobHandler {
    private performanceMonitor;
    private chunkSize;
    private defaultEncoding;
    private detailedMetrics;
    /**
     * Create a new BlobHandler
     * @param options Configuration options
     */
    constructor(options?: BlobHandlerOptions);
    /**
     * Read a blob as text
     * @param blob The blob to read
     * @param encoding Optional encoding (defaults to UTF-8)
     * @returns Promise resolving to the text content
     */
    readBlobAsText(blob: Blob, encoding?: string): Promise<string>;
    /**
     * Read a blob as an ArrayBuffer
     * @param blob The blob to read
     * @returns Promise resolving to the ArrayBuffer
     */
    readBlobAsArrayBuffer(blob: Blob): Promise<ArrayBuffer>;
    /**
     * Read a blob as a data URL
     * @param blob The blob to read
     * @returns Promise resolving to the data URL
     */
    readBlobAsDataURL(blob: Blob): Promise<string>;
    /**
     * Process a blob to extract content and metadata based on its type
     * @param blob The blob to process
     * @param options Processing options
     * @returns Promise resolving to processing result
     */
    processBlob(blob: Blob, options?: {
        encoding?: string;
        extractMetadata?: boolean;
        parseJSON?: boolean;
        detectEncoding?: boolean;
    }): Promise<BlobProcessingResult>;
    /**
     * Create a searchable document from a blob
     * @param blob The blob to process
     * @param id Document ID
     * @param customMetadata Additional metadata to include
     * @returns Promise resolving to a searchable document
     */
    createDocumentFromBlob(blob: Blob, id: string, customMetadata?: Record<string, unknown>): Promise<SearchableDocument>;
    private toBlobPart;
    /**
     * Create a Blob from a string or Uint8Array
     * @param data Data to convert to blob
     * @param options Blob creation options
     * @returns The created Blob
     */
    createBlob(data: string | Uint8Array, options?: {
        type?: string;
        endings?: 'transparent' | 'native';
    }): Blob;
    /**
     * Create a File from a string or Uint8Array
     * @param data Data to convert to file
     * @param name Filename
     * @param options File creation options
     * @returns The created File
     */
    createFile(data: string | Uint8Array, name: string, options?: {
        type?: string;
        lastModified?: number;
        endings?: 'transparent' | 'native';
    }): File;
    /**
     * Convert a blob to a different format
     * @param blob The blob to convert
     * @param options Conversion options
     * @returns Promise resolving to the converted blob
     */
    convertBlob(blob: Blob, options: {
        toType?: string;
        encoding?: string;
    }): Promise<Blob>;
    /**
     * Get dimensions of an image blob
     * @param blob The image blob
     * @returns Promise resolving to image dimensions or undefined if not an image
     */
    private getImageDimensions;
    /**
     * Split a large blob into smaller chunks
     * @param blob The blob to split
     * @param chunkSize Size of each chunk in bytes
     * @returns Array of blob chunks
     */
    splitBlob(blob: Blob, chunkSize?: number): Blob[];
    /**
     * Download a blob as a file
     * @param blob The blob to download
     * @param filename Suggested filename
     */
    downloadBlob(blob: Blob, filename: string): void;
    /**
     * Get performance metrics
     */
    getMetrics(): MetricsResult;
}
//# sourceMappingURL=BlobHandler.d.ts.map