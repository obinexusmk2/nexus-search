import { IndexedDocument, DocumentContent, DocumentMetadata } from '@/types';
import { DocumentProcessor } from './DocumentProcessor';
export declare class MarkdownProcessor extends DocumentProcessor {
    private readonly supportedExtensions;
    process(filePath: string, content: Buffer | string, metadata?: DocumentMetadata): Promise<IndexedDocument>;
    extractContent(content: Buffer | string): Promise<DocumentContent>;
    canProcess(filePath: string, mimeType?: string): boolean;
    private extractFrontmatter;
}
//# sourceMappingURL=MarkdownProcessor.d.ts.map