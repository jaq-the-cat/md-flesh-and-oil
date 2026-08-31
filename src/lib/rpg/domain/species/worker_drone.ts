import { Bars, Movement, Skills } from "$lib/rpg/domain/config";
import { NumberField } from "$lib/rpg/infra/types.svelte";
import { Species } from "$lib/rpg/infra/species.svelte";
import { type Build } from "./defaults";
import { carryWeight, sanityField } from "./helpers";
import { healthField } from "./helpers";
import { WORKER_DRONE_ABILITIES } from "$lib/rpg/domain/abilities/prefabs";

const BUILD: Build = { base: 40, multiplier: 1.6 };

export class WorkerDrone extends Species {
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
        [Movement.running]: 10,
        [Movement.crawling]: 2,
        [Movement.jump_height]: 1,
      },
      abilities: WORKER_DRONE_ABILITIES,
      carry: carryWeight(BUILD),
    });
  }
}
