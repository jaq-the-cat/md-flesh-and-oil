import { Attributes, Skills } from "$lib/rpg/config";

type Details =
  | { kind: "weapon"; hit: Skills; damage: string; range: number }
  | { kind: "attribute_modifier"; attribute: Attributes; amount: number }
  | { kind: "skill_modifier"; skill: Skills; amount: number }
  | { kind: "text" };

/** Every ability can carry free text, so a `text` ability is simply one with nothing else. */
export type AbilityTemplate = { name: string; info: string } & Details;
export type Ability = AbilityTemplate & { id: string };
export type AbilityKind = Ability["kind"];

/** What a freshly picked kind looks like in the custom-ability form. Adding a kind fails here first. */
export const BLANK_ABILITIES: Record<AbilityKind, AbilityTemplate> = {
  weapon: { kind: "weapon", name: "", info: "", hit: Skills.melee, damage: "", range: 1 },
  attribute_modifier: {
    kind: "attribute_modifier",
    name: "",
    info: "",
    attribute: Attributes.vitality,
    amount: 1,
  },
  skill_modifier: { kind: "skill_modifier", name: "", info: "", skill: Skills.melee, amount: 1 },
  text: { kind: "text", name: "", info: "" },
};

export const ABILITY_KINDS = Object.keys(BLANK_ABILITIES) as AbilityKind[];

export function createAbility(template: AbilityTemplate): Ability {
  return { ...template, id: crypto.randomUUID() };
}
