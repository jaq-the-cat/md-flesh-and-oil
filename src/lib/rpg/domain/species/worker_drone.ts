import { Bars, Movement, Skills } from "$lib/rpg/config";
import { NumberField } from "$lib/rpg/infra/types.svelte";
import { Species } from "$lib/rpg/infra/species/species.svelte";
import { healthField, sanityField } from "./defaults";

export class WorkerDrone extends Species {
  constructor() {
    super({
      bars: {
        [Bars.health]: healthField(40, 1.6),
        [Bars.oil]: new NumberField(0, 100),
        [Bars.sanity]: sanityField(),
      },
      skills: [],
      movement: {
        [Movement.walking]: 5,
        [Movement.running]: 10,
        [Movement.crawling]: 2,
        [Movement.jump_height]: 1,
      },
    });
  }
}
