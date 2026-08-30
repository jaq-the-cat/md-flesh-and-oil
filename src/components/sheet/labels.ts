import { enumValues } from "$lib/rpg_new/helpers";
import localization from "../../i18n/en_us.json";

export function label(key: string): string {
  return (localization as Record<string, string>)[key] ?? key;
}

/** The enum members `record` has an entry for, in declaration order, ready to render. */
export function fields<K extends number, V>(
  enumeration: Record<string, string | number>,
  record: Partial<Record<K, V>>,
): { key: K; label: string; value: V }[] {
  return enumValues<K>(enumeration)
    .filter((key) => record[key] !== undefined)
    .map((key) => ({ key, label: label(String(enumeration[key])), value: record[key]! }));
}
