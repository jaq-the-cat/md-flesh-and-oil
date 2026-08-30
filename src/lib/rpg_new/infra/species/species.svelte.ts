import {
  About,
  Bars,
  Stats,
  Skills,
  SkillModifiers,
  Movement,
  MAX_STAT_VALUE,
  SkillStats,
} from "$lib/rpg_new/config";
import { DEFAULT_SKILLS } from "$lib/rpg_new/domain/species/defaults";
import { clamp, clone, enumValues } from "$lib/rpg_new/helpers";
import { NumberField, type NumberLike } from "../types.svelte";

export abstract class Species {
  public readonly about: Record<About, string> = $state({} as Record<About, string>);
  public readonly bars: Partial<Record<Bars, NumberField<Species>>> = $state({});
  public readonly stats: Partial<Record<Stats, NumberField<Species>>> = $state({});
  public readonly skills: Partial<Record<Skills, SkillModifiers>> = $state({});
  public readonly movement: Partial<Record<Movement, NumberField<Species>>> = $state({});

  constructor(enabled: {
    bars: Partial<Record<Bars, NumberField<Species>>>;
    skills: Skills[];
    movement: Partial<Record<Movement, NumberLike<Species>>>;
  }) {
    this.about = Object.fromEntries(enumValues(About).map((about) => [about, ""])) as Record<About, string>;
    this.bars = clone(enabled.bars);
    this.stats = Object.fromEntries(enumValues(Stats).map((stat) => [stat, new NumberField(0, MAX_STAT_VALUE)]));
    this.skills = Object.fromEntries(
      [...DEFAULT_SKILLS, ...enabled.skills].map((skill) => [skill, SkillModifiers.average]),
    );
    this.movement = Object.fromEntries(
      Object.entries(enabled.movement).map(([key, max]) => [key, new NumberField(0, max)]),
    );
  }

  getSkillValue(skill: Skills) {
    const modifier = this.skills[skill];
    if (modifier == null) return 0;

    let values = [];
    for (const stat of SkillStats[skill]) {
      let statEntry = this.stats[stat];
      if (statEntry != null) values.push(statEntry.getValue());
    }
    if (values.length === 0) return 0;
    return (values.reduce((a, b) => a + b, 0) / values.length) * modifier;
  }

  /** Copies into `target` every value it shares with `source`, leaving the rest at its defaults. */
  static from<T extends Species>(target: T, source: Species): T {
    for (const about of enumValues<About>(About)) {
      target.about[about] = source.about[about];
    }
    for (const stat of enumValues<Stats>(Stats)) {
      copyField(target, target.stats[stat], source.stats[stat]);
    }
    for (const skill of enumValues<Skills>(Skills)) {
      const modifier = source.skills[skill];
      if (modifier != null && target.skills[skill] != null) target.skills[skill] = modifier;
    }
    // Bars and movement come last: their maximums are derived from the stats and skills above.
    for (const bar of enumValues<Bars>(Bars)) {
      copyField(target, target.bars[bar], source.bars[bar]);
    }
    for (const movement of enumValues<Movement>(Movement)) {
      copyField(target, target.movement[movement], source.movement[movement]);
    }
    return target;
  }
}

function copyField(target: Species, field?: NumberField<Species>, source?: NumberField<Species>) {
  if (field == null || source == null) return;
  field.setValue(target, clamp(source.getValue(), field.min, field.getMaxValue(target)));
}
