import type { Build } from "./defaults";
import type { Species } from "$lib/rpg/infra/species.svelte";
import { NumberField } from "$lib/rpg/infra/types.svelte";
import { MAX_ATTR_VALUE, Skills } from "../config";

export function healthField<T extends Species>({ base, multiplier }: Build) {
  return new NumberField(
    0,
    (obj: T) => (MAX_ATTR_VALUE / 2 + obj.getSkillBonus(Skills.vigor)) * multiplier + base,
  );
} /** The health formula keyed to Athletics rather than Vigor, scaled down by five. */

export function carryWeight({ base, multiplier }: Build) {
  return (obj: Species) => ((MAX_ATTR_VALUE / 2 + obj.getSkillBonus(Skills.athletics)) * multiplier + base) / 5;
}

export function sanityField<T extends Species>() {
  return new NumberField(0, (obj: T) => Math.min(100, obj.getSkillBonus(Skills.willpower)));
}
