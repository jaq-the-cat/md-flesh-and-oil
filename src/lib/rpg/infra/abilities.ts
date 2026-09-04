import { Attributes, Skills } from "$lib/rpg/domain/config";
import type { ItemId } from "$lib/rpg/domain/items/prefabs";
import { blankDamage, type Damage, type ItemTemplate } from "$lib/rpg/infra/items";

type Details =
  | { kind: "weapon"; hit: Skills; damage: Damage; range: number }
  | { kind: "skill_modifier"; skill: Skills; amount: number }
  | { kind: "text" };
// | { kind: "attribute_modifier"; attribute: Attributes; amount: number }

/** Every ability can carry free text, so a `text` ability is simply one with nothing else. */
export type AbilityTemplate = { name: string; info: string } & Details;

/** What a species lists: a catalogue weapon written directly, or an ability of its own. */
export type AbilityEntry = ItemTemplate | AbilityTemplate;

/** What a character holds. A catalogue weapon is kept as the id it refers to. */
export type Ability = ItemId | (AbilityTemplate & { id: string });

export type AbilityKind = AbilityTemplate["kind"];

/** What a freshly picked kind looks like in the custom-ability form. Adding a kind fails here first. */
export const BLANK_ABILITIES: Record<AbilityKind, AbilityTemplate> = {
  weapon: { kind: "weapon", name: "", info: "", hit: Skills.melee, damage: blankDamage(), range: 1 },
  skill_modifier: { kind: "skill_modifier", name: "", info: "", skill: Skills.melee, amount: 1 },
  text: { kind: "text", name: "", info: "" },
  // attribute_modifier: {
  //   kind: "attribute_modifier",
  //   name: "",
  //   info: "",
  //   attribute: Attributes.vitality,
  //   amount: 1,
  // },
};

export const ABILITY_KINDS = Object.keys(BLANK_ABILITIES) as AbilityKind[];

/** A catalogue weapon reduces to its id; a written ability gets an instance of its own. */
export function createAbility(entry: AbilityEntry): Ability {
  // The entry came from the catalogue, so its id is one of its keys.
  return "id" in entry ? (entry.id as ItemId) : { ...entry, id: crypto.randomUUID() };
}

export function isWeapon(ability: Ability): ability is ItemId {
  return typeof ability === "string";
}

/** Whether a held ability came from this catalogue entry. */
export function matches(ability: Ability, entry: AbilityEntry) {
  return isWeapon(ability)
    ? "id" in entry && entry.id === ability
    : !("id" in entry) && entry.name === ability.name;
}
