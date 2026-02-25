type Logic = {
    name: string;
    state: any;
    actions: Record<string, Function>;
    render: Function;
};
/**
 * DOPAdapter enables Data-Oriented Programming integration
 * by adapting between OOP, functional, and data-oriented paradigms
 */
export declare class DOPAdapter<T> {
    private readonly logic;
    constructor(logic: Logic);
    /**
     * Convert to functional programming style
     */
    toFunctional(): (...args: any[]) => any;
    /**
     * Convert to object-oriented programming style
     */
    toOOP(): new (...args: any[]) => any;
    /**
     * Adapt a function to work with both paradigms
     */
    static adaptFunction<T, R>(fn: (data: T, ...args: any[]) => R): {
        func: (data: T, ...args: any[]) => R;
        method: (this: {
            state: T;
        }, ...args: any[]) => R;
    };
    /**
     * Create a search function adapter that works with both paradigms
     */
    static createSearchAdapter(searchEngine: any): DOPAdapter<unknown>;
}
export {};
//# sourceMappingURL=DOPAdapter.d.ts.map