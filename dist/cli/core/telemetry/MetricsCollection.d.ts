import { TelemetryEvent, MetricsFilter, MetricsReport } from './TelemetryTypes';
export declare class MetricsCollection {
    private metrics;
    add(name: string, data: Record<string, any>): void;
    getReport(filter?: MetricsFilter): MetricsReport;
    getCount(): number;
    export(): TelemetryEvent[];
    import(data: TelemetryEvent[]): void;
    private calculateAverages;
    private calculateMinValues;
    private calculateMaxValues;
}
//# sourceMappingURL=MetricsCollection.d.ts.map