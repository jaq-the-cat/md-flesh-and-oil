import { Bars, Movement, Skills } from "$lib/rpg/config";
import { NumberField } from "$lib/rpg/infra/types.svelte";
import { Species } from "$lib/rpg/infra/species/species.svelte";
import { carryWeight, healthField, sanityField, type Build } from "./defaults";
import { HUMAN_ABILITIES } from "$lib/rpg/domain/abilities/prefabs";

const BUILD: Build = { base: 25, multiplier: 1.5 };

export class Human extends Species {
  constructor() {
    super({
      bars: {
        [Bars.health]: healthField(BUILD),
        [Bars.sanity]: sanityField(),
        [Bars.blood]: new NumberField(0, 100),
      },
      skills: [],
      movement: {
        [Movement.walking]: 5,
        [Movement.running]: 8,
        [Movement.crawling]: 2,
        [Movement.swimming]: 4,
        [Movement.jump_height]: 1,
      },
      abilities: HUMAN_ABILITIES,
      carry: carryWeight(BUILD),
    });
  }
}
