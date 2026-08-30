import { Bars, Movement, Skills } from "$lib/rpg/config";
import { NumberField } from "$lib/rpg/infra/types.svelte";
import { Species } from "$lib/rpg/infra/species/species.svelte";
import { healthField, sanityField } from "./defaults";

export class SolverDrone extends Species {
  constructor() {
    super({
      bars: {
        [Bars.health]: healthField(50, 1.8),
        [Bars.sanity]: sanityField(),
        [Bars.oil]: new NumberField(0, 100),
        [Bars.solver]: new NumberField(0, 100),
      },
      skills: [Skills.flying, Skills.absolute_solver],
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
