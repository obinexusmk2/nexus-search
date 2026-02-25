import { TelemetryEvent, ErrorFilter, ErrorReport } from './TelemetryTypes';
export declare class ErrorCollection {
    private errors;
    add(name: string, data: Record<string, any>): void;
    getReport(filter?: ErrorFilter): ErrorReport;
    getCount(): number;
    export(): TelemetryEvent[];
    import(data: TelemetryEvent[]): void;
}
//# sourceMappingURL=ErrorCollection.d.ts.map