import type { Bars, Speed } from "../attributes.svelte";
import { Character, Species } from "../character.svelte";

export class PredatorDrone extends Character {
  species = $state(Species.Predator);

  modifiers = ["+15 Stealth."];

  override bars: Bars = $state({
    "Fresh Oil": 10,
    "Used Oil": 0,
    Sanity: 10,
  });

  override speed: Speed = $state({
    Walk: 5,
    Run: 12,
    Jump: 4,
  });

  override getMaxHp() {
    return Math.floor(30 + this.stats.Vitality * 1.6);
  }

  override getBaseMaxWeight() {
    return Math.floor(this.stats.Strength / 8);
  }

  constructor() {
    super();
    delete this.proficiencies.Flying;
  }
}
