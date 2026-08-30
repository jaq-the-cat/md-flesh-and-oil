import { enumValues } from "$lib/rpg_new/helpers";

/** The enum members `record` has an entry for, in declaration order, ready to render. */
export function fields<K extends number, V>(
  enumeration: Record<string, string | number>,
  record: Partial<Record<K, V>>,
  labels: Record<K, string>,
): { key: K; label: string; value: V }[] {
  return enumValues<K>(enumeration)
    .filter((key) => record[key] !== undefined)
    .map((key) => ({ key, label: labels[key], value: record[key]! }));
}
