import type { Bars, Speed } from "../attributes.svelte";
import { Character, Species } from "../character.svelte";

export class DisassemblyDrone extends Character {
  species = $state(Species.Disassembly);

  modifiers = [
    "-20 Stealth while Visor and Sensors are turned on. Toggle with an Action. Limits vision to 3m.",
    "+20 to Passive Perception and Investigation rolls while their headband sensors are turned on.",
    "+10 to all Damage rolls.",
  ];

  override bars: Bars = $state({
    "Used Oil": 9,
    "Absolute Solver": 1,
    Heat: 0,
  });

  override speed: Speed = $state({
    Walk: 5,
    Run: 12,
    Jump: 2,
    Flying: 20,
  });

  override getMaxHp() {
    return Math.floor(50 + this.stats.Vitality * 2);
  }

  override getBaseMaxWeight() {
    return Math.floor(this.stats.Strength / 8);
  }

  constructor() {
    super();
  }
}
