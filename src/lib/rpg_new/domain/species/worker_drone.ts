import { Bars, Movement, Skills } from "$lib/rpg_new/config";
import { NumberField } from "$lib/rpg_new/infra/types.svelte";
import { Species } from "$lib/rpg_new/infra/species/species.svelte";
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
