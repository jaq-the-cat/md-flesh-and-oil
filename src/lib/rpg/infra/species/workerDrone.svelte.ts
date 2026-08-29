import type { Bars, Speed } from "../attributes.svelte";
import { Character, Species } from "../character.svelte";

export class WorkerDrone extends Character {
  species = $state(Species.Worker);

  modifiers = [
    "-10 Stealth while Visor is turned on. Toggle with an Action. Limits vision to 3m.",
    "+1 Expertises during Character Creation and increase limit from 2 to 3.",
  ];

  override bars: Bars = $state({
    "Fresh Oil": 10,
    "Used Oil": 0,
    Sanity: 10,
  });

  override speed: Speed = $state({
    Walk: 5,
    Run: 10,
    Jump: 2,
  });

  override getMaxHp() {
    return Math.floor(20 + this.stats.Vitality * 1.6);
  }

  override getBaseMaxWeight() {
    return Math.floor(this.stats.Strength / 8);
  }

  constructor() {
    super();
    delete this.proficiencies.Flying;
  }
}
