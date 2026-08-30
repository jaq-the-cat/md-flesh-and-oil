import { Bars, Movement, Skills } from "$lib/rpg_new/config";
import { NumberField } from "$lib/rpg_new/infra/types.svelte";
import { Species } from "$lib/rpg_new/infra/species/species.svelte";
import { healthField, sanityField } from "./defaults";

export class Human extends Species {
  constructor() {
    super({
      bars: {
        [Bars.health]: healthField(25, 1.5),
        [Bars.blood]: new NumberField(0, 100),
        [Bars.sanity]: sanityField(),
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
