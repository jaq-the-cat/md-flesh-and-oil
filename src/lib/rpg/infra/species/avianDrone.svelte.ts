import type { Bars, Speed } from "../attributes.svelte";
import { Character, Species } from "../character.svelte";

export class AvianDrone extends Character {
  species = $state(Species.Avian);

  modifiers = [
    "-10 Stealth while Visor is turned on. Toggle with an Action. Limits vision to 3m.",
    "+10 Stealth and Flying.",
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
    Flying: 15,
  });

  override getMaxHp() {
    return Math.floor(20 + this.stats.Vitality * 1.5);
  }

  override getBaseMaxWeight() {
    return Math.floor(this.stats.Strength / 8);
  }

  constructor() {
    super();
  }
}
