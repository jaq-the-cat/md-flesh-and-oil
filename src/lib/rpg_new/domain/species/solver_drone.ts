import { Bars, Skills, Movement } from "$lib/rpg_new/infra/config.svelte";
import { Species } from "$lib/rpg_new/infra/species/species.svelte";
import { NumberField } from "$lib/rpg_new/infra/types.svelte";

export class SolverDrone extends Species {
  constructor() {
    super({
      bars: {
        [Bars.health]: new NumberField(0, (obj: SolverDrone) => obj.getSkillValue(Skills.vigor) * 2),
        [Bars.oil]: new NumberField(0, 100),
        [Bars.solver]: new NumberField(0, 100),
        [Bars.sanity]: new NumberField(10, (obj: SolverDrone) =>
          Math.min(100, obj.getSkillValue(Skills.willpower)),
        ),
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
