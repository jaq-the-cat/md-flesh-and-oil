/** The members `record` has an entry for, in declaration order, ready to render. */
export function fields<K extends string, V>(
  names: Record<K, K>,
  record: Partial<Record<K, V>>,
  labels: Record<K, string>,
): { key: K; label: string; value: V }[] {
  return Object.values<K>(names)
    .filter((key) => record[key] !== undefined)
    .map((key) => ({ key, label: labels[key], value: record[key]! }));
}
