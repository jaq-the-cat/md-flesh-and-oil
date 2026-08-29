import type { Bars, Speed } from "../attributes.svelte";
import { Character, Species } from "../character.svelte";

export class SolverDrone extends Character {
  species = $state(Species.Solver);

  modifiers = ["-10 Stealth while Visor is turned on. Toggle with an Action. Limits vision to 3m."];

  override bars: Bars = $state({
    "Used Oil": 9,
    "Absolute Solver": 1,
    Heat: 0,
  });

  override speed: Speed = $state({
    Walk: 5,
    Run: 10,
    Jump: 2,
    Flying: 20,
  });

  patched = $state(false);

  override getMaxHp() {
    return Math.floor(20 + this.stats.Vitality * 1.8);
  }

  override getBaseMaxWeight() {
    return Math.floor(this.stats.Strength / 8);
  }

  override serializeExtra() {
    return {
      patched: this.patched,
    };
  }

  override deserializeExtra(doc: any) {
    this.patched = doc.patched ?? false;
  }

  constructor() {
    super();
  }
}
