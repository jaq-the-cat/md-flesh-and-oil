export function clone<T extends object>(obj: T): T {
  return Object.fromEntries(Object.entries(obj)) as T;
}

/** Each name becomes both key and value, so `Skills.melee === "melee"` without repeating it. */
export function names<const T extends readonly string[]>(...values: T) {
  return Object.fromEntries(values.map((value) => [value, value])) as { [K in T[number]]: K };
}

/** Numeric enums carry a reverse mapping, so their names have to be filtered out. */
export function enumValues<T extends number>(enumeration: Record<string, string | number>): T[] {
  return Object.values(enumeration).filter((value) => typeof value === "number") as T[];
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
