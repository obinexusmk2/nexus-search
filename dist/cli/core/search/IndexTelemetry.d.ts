import { MetricsFilter, MetricsReport, EventFilter, EventReport, ErrorFilter, ErrorReport } from '../telemetry/TelemetryTypes';
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
}
//# sourceMappingURL=IndexTelemetry.d.ts.map