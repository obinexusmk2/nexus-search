import { MetricsFilter, EventFilter, ErrorFilter, MetricsReport, EventReport, ErrorReport } from './TelemetryTypes';
export declare class IndexTelemetry {
    private readonly indexName;
    private metrics;
    private events;
    private errors;
    constructor(indexName: string);
    recordMetric(name: string, data: Record<string, any>): void;
    recordEvent(name: string, data: Record<string, any>): void;
    recordError(name: string, data: Record<string, any>): void;
    getMetrics(filter?: MetricsFilter): MetricsReport;
    getEvents(filter?: EventFilter): EventReport;
    getErrors(filter?: ErrorFilter): ErrorReport;
    export(): Record<string, any>;
    import(data: Record<string, any>): void;
}
//# sourceMappingURL=IndexTelemetry.d.ts.map