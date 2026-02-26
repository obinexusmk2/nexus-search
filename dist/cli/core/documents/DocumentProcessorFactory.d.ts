import { IndexedDocument } from '@/types';
import { DocumentProcessor } from './DocumentProcessor';
export declare class DocumentProcessorFactory {
    private processors;
    constructor();
    /**
     * Get the appropriate processor for a file
     */
    getProcessorForFile(filePath: string, mimeType?: string): DocumentProcessor;
    /**
     * Process a document with the appropriate processor
     */
    processDocument(filePath: string, content: Buffer | string, metadata?: any): Promise<IndexedDocument>;
}
//# sourceMappingURL=DocumentProcessorFactory.d.ts.map