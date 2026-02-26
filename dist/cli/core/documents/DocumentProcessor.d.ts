import { IndexedDocument, DocumentContent, DocumentMetadata } from '@/types';
import { MimeTypeDetector } from '../utils/MimeTypeDetector';
import * as ValidationUtils from '../utils/ValidationUtils';
import { PerformanceMonitor } from '../utils/PerformanceMonitor';
export declare abstract class DocumentProcessor {
    protected readonly performanceMonitor: PerformanceMonitor;
    protected readonly mimeDetector: MimeTypeDetector;
    protected readonly validator: typeof ValidationUtils;
    constructor();
    /**
     * Process a document and convert it to an indexed document
     * @param filePath Path to the document
     * @param content Raw content of the document
     * @param metadata Optional metadata
     */
    abstract process(filePath: string, content: Buffer | string, metadata?: DocumentMetadata): Promise<IndexedDocument>;
    /**
     * Extract text content from the document
     * @param content Raw document content
     */
    abstract extractContent(content: Buffer | string): Promise<DocumentContent>;
    /**
     * Check if this processor can handle the given file type
     * @param filePath Path to the document
     * @param mimeType Optional mime type
     */
    abstract canProcess(filePath: string, mimeType?: string): boolean;
    /**
     * Generate a unique document ID
     * @param filePath Path to the document
     */
    protected generateDocumentId(filePath: string): string;
    /**
     * Extract basic metadata from file path and content
     */
    protected extractBasicMetadata(filePath: string, content: Buffer | string): Promise<DocumentMetadata>;
}
//# sourceMappingURL=DocumentProcessor.d.ts.map