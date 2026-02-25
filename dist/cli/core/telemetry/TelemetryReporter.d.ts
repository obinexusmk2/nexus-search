import { IndexTelemetry } from './IndexTelemetry';
import { MetricsFilter, EventFilter, ErrorFilter } from './TelemetryTypes';
export declare class TelemetryReporter {
    private telemetry;
    constructor(telemetry: IndexTelemetry);
    generateMetricsReport(filter?: MetricsFilter): string;
    generateEventReport(filter?: EventFilter): string;
    generateErrorReport(filter?: ErrorFilter): string;
    generateFullReport(): string;
}
//# sourceMappingURL=TelemetryReporter.d.ts.map