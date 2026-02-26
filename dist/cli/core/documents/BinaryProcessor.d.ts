import { IndexedDocument, DocumentContent, DocumentMetadata } from '@/types';
import { DocumentProcessor } from './DocumentProcessor';
export declare class BinaryProcessor extends DocumentProcessor {
    private readonly maxTextExtraction;
    process(filePath: string, content: Buffer | string, metadata?: DocumentMetadata): Promise<IndexedDocument>;
    extractContent(content: Buffer): Promise<DocumentContent>;
    canProcess(filePath: string, mimeType?: string): boolean;
    /**
     * Extract enhanced metadata for binary files
     */
    private extractEnhancedMetadata;
    /**
     * Calculate a simple hash for content identification
     */
    private calculateHash;
}
//# sourceMappingURL=BinaryProcessor.d.ts.map