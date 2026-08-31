import { Bars, Movement, Skills } from "$lib/rpg/config";
import { NumberField } from "$lib/rpg/infra/types.svelte";
import { Species } from "$lib/rpg/infra/species/species.svelte";
import { carryWeight, healthField, sanityField, type Build } from "./defaults";
import { AVIAN_DRONE_ABILITIES } from "$lib/rpg/domain/abilities/prefabs";

const BUILD: Build = { base: 30, multiplier: 1.5 };

export class AvianDrone extends Species {
  constructor() {
    super({
      bars: {
        [Bars.health]: healthField(BUILD),
        [Bars.sanity]: sanityField(),
        [Bars.oil]: new NumberField(0, 100),
      },
      skills: [Skills.flying],
      movement: {
        [Movement.walking]: 5,
        [Movement.running]: 10,
        [Movement.crawling]: 4,
        [Movement.jump_height]: 2,
        [Movement.flying]: 15,
      },
      abilities: AVIAN_DRONE_ABILITIES,
      carry: carryWeight(BUILD),
    });
  }
}
