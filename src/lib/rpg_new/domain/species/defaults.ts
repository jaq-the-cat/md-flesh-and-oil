import { Skills } from "$lib/rpg_new/config/skills";
import type { Species } from "$lib/rpg_new/infra/species/species.svelte";
import { NumberField } from "$lib/rpg_new/infra/types.svelte";

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

export function sanityField<T extends Species>() {
  return new NumberField(0, (obj: T) => Math.min(100, obj.getSkillValue(Skills.willpower)));
}
