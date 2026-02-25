import { TelemetryEvent, EventFilter, EventReport } from './TelemetryTypes';
export declare class EventCollection {
    private events;
    add(name: string, data: Record<string, any>): void;
    getReport(filter?: EventFilter): EventReport;
    getCount(): number;
    export(): TelemetryEvent[];
    import(data: TelemetryEvent[]): void;
}
//# sourceMappingURL=EventCollection.d.ts.map