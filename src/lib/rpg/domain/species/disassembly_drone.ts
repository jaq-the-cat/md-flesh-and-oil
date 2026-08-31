import { Bars, Movement, Skills } from "$lib/rpg/domain/config";
import { NumberField } from "$lib/rpg/infra/types.svelte";
import { Species } from "$lib/rpg/infra/species.svelte";
import { type Build } from "./defaults";
import { carryWeight } from "./helpers";
import { healthField } from "./helpers";
import { DISASSEMBLY_DRONE_ABILITIES } from "$lib/rpg/domain/abilities/prefabs";

const BUILD: Build = { base: 60, multiplier: 2 };

export class DisassemblyDrone extends Species {
  constructor() {
    super({
      bars: {
        [Bars.health]: healthField(BUILD),
        [Bars.oil]: new NumberField(0, 100),
        [Bars.solver]: new NumberField(0, 100),
      },
      skills: [Skills.flying, Skills.absolute_solver],
      movement: {
        [Movement.walking]: 5,
        [Movement.running]: 12,
        [Movement.crawling]: 4,
        [Movement.jump_height]: 2,
        [Movement.flying]: 20,
      },
      abilities: DISASSEMBLY_DRONE_ABILITIES,
      carry: carryWeight(BUILD),
    });
  }
}
