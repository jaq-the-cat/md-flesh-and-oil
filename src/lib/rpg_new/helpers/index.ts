export function clone<T extends object>(obj: T): T {
  return Object.fromEntries(Object.entries(obj)) as T;
}

export function enumValues<T extends number>(enumeration: Record<string, string | number>): T[] {
  return Object.values(enumeration).filter((value) => typeof value === "number") as T[];
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
