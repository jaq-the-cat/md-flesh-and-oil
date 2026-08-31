import { MAX_ATTR_VALUE } from "$lib/rpg/config";
import { Skills } from "$lib/rpg/config/skills";
import type { Species } from "$lib/rpg/infra/species/species.svelte";
import { NumberField } from "$lib/rpg/infra/types.svelte";

export const DEFAULT_SKILLS: Skills[] = [
  Skills.vigor,
  Skills.athletics,
  Skills.stealth,
  Skills.finesse,
  Skills.firearms,
  Skills.persuasion,
  Skills.intimidation,
  Skills.insight,
  Skills.investigation,
  Skills.knowledge,
  Skills.technology,
  Skills.wit,
  Skills.melee,
  Skills.explosives,
  Skills.medicine,
  Skills.mechanics,
  Skills.willpower,
];

/** How solidly a species is built. Drives both its health and what it can carry. */
export type Build = { base: number; multiplier: number };

export function healthField<T extends Species>({ base, multiplier }: Build) {
  return new NumberField(
    0,
    (obj: T) => (MAX_ATTR_VALUE / 2 + obj.getSkillBonus(Skills.vigor)) * multiplier + base,
  );
}

/** The health formula keyed to Athletics rather than Vigor, scaled down by five. */
export function carryWeight({ base, multiplier }: Build) {
  return (obj: Species) => ((MAX_ATTR_VALUE / 2 + obj.getSkillBonus(Skills.athletics)) * multiplier + base) / 5;
}

export function sanityField<T extends Species>() {
  return new NumberField(0, (obj: T) => Math.min(100, obj.getSkillBonus(Skills.willpower)));
}
