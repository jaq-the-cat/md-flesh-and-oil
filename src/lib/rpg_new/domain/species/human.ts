import { Bars, Stats, Skills, Movement } from "$lib/rpg_new/infra/config.svelte";
import { Species } from "$lib/rpg_new/infra/species/species.svelte";
import { NumberField } from "$lib/rpg_new/infra/types.svelte";

class Human extends Species {
  constructor() {
    super({
      bars: {
        [Bars.blood]: new NumberField(0, 100),
        [Bars.sanity]: new NumberField(10, (obj: Human) => Math.min(100, obj.getSkillValue(Skills.willpower))),
      },
      skills: [],
      movement: {
        [Movement.walking]: 5,
        [Movement.running]: 8,
        [Movement.crawling]: 2,
        [Movement.swimming]: 4,
        [Movement.jump_height]: 1,
      },
    });
  }
}
