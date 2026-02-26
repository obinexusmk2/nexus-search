import { MetricsResult } from "@/types";
export type TimingRecord = {
    count: number;
    totalTime: number;
    maxTime: number;
    minTime: number;
    avgTime: number;
};
export declare class PerformanceMonitor {
    private metrics;
    private active;
    constructor(active?: boolean);
    /**
     * Static method to time a function execution
     */
    static time<T>(name: string, fn: () => Promise<T> | T): Promise<T>;
    /**
     * Measure execution time of a function
     */
    measure<T>(name: string, fn: () => Promise<T> | T): Promise<T>;
    /**
     * Record a performance metric
     */
    private recordMetric;
    /**
     * Get performance metrics
     */
    getMetrics(): MetricsResult;
    /**
     * Get metrics for a specific operation
     */
    getMetric(name: string): TimingRecord | undefined;
    /**
     * Reset all metrics
     */
    resetMetrics(): void;
    clear(): void;
    /**
     * Enable or disable performance monitoring
     */
    setActive(active: boolean): void;
}
//# sourceMappingURL=PerformanceMonitor.d.ts.map