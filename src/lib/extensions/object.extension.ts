Object.map = function <V, V2>(o: Record<string, V>, fn: (e: [string, V]) => [string, V2]): Record<string, V2> {
    return Object.fromEntries(Object.entries<any>(o).map(fn));
}
Object.filterMap = function <V, V2>(o: Record<string, V>, fn: (e: [string, V]) => [string, V2] | null): Record<string, V2> {
    return Object.fromEntries(Object.entries<any>(o).map(fn).filter(e => e !== null));
}

export {};