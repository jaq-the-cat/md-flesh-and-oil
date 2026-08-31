import { Bars, Movement } from "$lib/rpg/config";
import { NumberField } from "$lib/rpg/infra/types.svelte";
import { Species } from "$lib/rpg/infra/species/species.svelte";
import { carryWeight, healthField, sanityField, type Build } from "./defaults";
import { PREDATOR_DRONE_ABILITIES } from "$lib/rpg/domain/abilities/prefabs";

const BUILD: Build = { base: 40, multiplier: 2 };

export class PredatorDrone extends Species {
  constructor() {
    super({
      bars: {
        [Bars.health]: healthField(BUILD),
        [Bars.sanity]: sanityField(),
        [Bars.oil]: new NumberField(0, 100),
      },
      skills: [],
      movement: {
        [Movement.walking]: 5,
        [Movement.running]: 12,
        [Movement.crawling]: 4,
        [Movement.jump_height]: 4,
      },
      abilities: PREDATOR_DRONE_ABILITIES,
      carry: carryWeight(BUILD),
    });
  }
}
