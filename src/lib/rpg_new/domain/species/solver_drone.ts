import { Bars, Movement, Skills } from "$lib/rpg_new/config";
import { NumberField } from "$lib/rpg_new/infra/types.svelte";
import { Species } from "$lib/rpg_new/infra/species/species.svelte";
import { healthField, sanityField } from "./defaults";

export class SolverDrone extends Species {
  constructor() {
    super({
      bars: {
        [Bars.health]: healthField(50, 1.8),
        [Bars.oil]: new NumberField(0, 100),
        [Bars.solver]: new NumberField(0, 100),
        [Bars.sanity]: sanityField(),
      },
      skills: [Skills.flying],
      movement: {
        [Movement.walking]: 5,
        [Movement.running]: 10,
        [Movement.crawling]: 4,
        [Movement.jump_height]: 2,
        [Movement.flying]: 15,
      },
    });
  }
}
