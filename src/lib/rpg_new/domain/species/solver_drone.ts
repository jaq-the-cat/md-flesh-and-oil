import { Bars, Movement, Skills } from "$lib/rpg_new/config";
import { NumberField } from "$lib/rpg_new/infra/types.svelte";
import { Species } from "$lib/rpg_new/infra/species/species.svelte";
import { sanityField } from "./defaults";

export class SolverDrone extends Species {
  constructor() {
    super({
      bars: {
        [Bars.health]: new NumberField(0, (obj: SolverDrone) => 20 + obj.getSkillValue(Skills.vigor) * 1.8),
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
