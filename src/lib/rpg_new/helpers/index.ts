export function clone<T extends object>(obj: T): T {
  return Object.fromEntries(Object.entries(obj)) as T;
}
