export type BenchmarkResult = {
    algorithm: string;
    avgTime: number;
    maxTime: number;
    minTime: number;
    resultsCount: number;
    memoryUsage?: number;
};
export declare class AlgorithmBenchmark {
    private readonly iterations;
    private readonly warmupIterations;
    constructor(iterations?: number, warmupIterations?: number);
    /**
     * Static method to benchmark a single algorithm
     */
    static benchmark<T, R>(name: string, algorithm: (input: T) => Promise<R> | R, input: T, iterations?: number): Promise<BenchmarkResult>;
    /**
     * Benchmark multiple algorithms against the same input
     */
    compareAlgorithms<T, R>(algorithms: Array<{
        name: string;
        fn: (input: T) => Promise<R> | R;
    }>, input: T): Promise<BenchmarkResult[]>;
    /**
     * Benchmark search algorithms specifically
     */
    benchmarkSearchAlgorithms<T>(searchEngine: {
        search: (query: string, options?: any) => Promise<T[]> | T[];
    }, queries: string[], algorithms: Array<{
        name: string;
        options: any;
    }>): Promise<Record<string, BenchmarkResult>>;
    /**
     * Memory usage benchmark
     */
    static benchmarkMemoryUsage<T>(operation: () => Promise<T> | T): Promise<{
        result: T;
        memoryUsageMB: number;
    }>;
}
//# sourceMappingURL=AlgorithmBencmark.d.ts.map