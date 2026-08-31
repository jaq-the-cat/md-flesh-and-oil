import { Bars, Movement, Skills } from "$lib/rpg/domain/config";
import { NumberField } from "$lib/rpg/infra/types.svelte";
import { Species } from "$lib/rpg/infra/species.svelte";
import { type Build } from "./defaults";
import { carryWeight, sanityField } from "./helpers";
import { healthField } from "./helpers";
import { HUMAN_ABILITIES } from "$lib/rpg/domain/abilities/prefabs";

const BUILD: Build = { base: 30, multiplier: 1.5 };

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
