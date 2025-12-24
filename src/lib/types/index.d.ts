export {};

declare global {
    interface ObjectConstructor {
        filterMap<V, V2>(o: Record<string, V>, fn: (e: [string, V]) => [string, V2] | null): Record<string, V2>;
        map<V, V2>(o: Record<string, V>, fn: (e: [string, V]) => [string, V2]): Record<string, V2>;
    }
}