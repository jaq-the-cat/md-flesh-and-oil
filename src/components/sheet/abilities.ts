import type { Ability, AbilityEntry, AbilityTemplate } from "$lib/rpg/infra/abilities";
import { ITEMS } from "$lib/rpg/domain/items/prefabs";
import type { ItemTemplate } from "$lib/rpg/infra/items";
import { itemText } from "./items";

/**
 * The weapon behind a value, if it is one. Only an item has a weight, which is what
 * separates the two: a written ability carries an instance id of its own.
 */
export function weaponOf(value: Ability | AbilityEntry): ItemTemplate | undefined {
  if (typeof value === "string") return ITEMS[value] as ItemTemplate;
  return "weight" in value ? (value as ItemTemplate) : undefined;
}

export function writtenOf(value: Ability | AbilityEntry): AbilityTemplate | undefined {
  return typeof value === "string" || "weight" in value ? undefined : (value as AbilityTemplate);
}

export function abilityName(value: Ability | AbilityEntry): string {
  const weapon = weaponOf(value);
  return weapon ? itemText(weapon).name : (value as AbilityTemplate).name;
}

/** Weapons key on their catalogue id, written abilities on their instance. */
export function abilityKey(ability: Ability): string {
  return typeof ability === "string" ? ability : ability.id;
}
