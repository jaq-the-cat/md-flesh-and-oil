import {
  About,
  Bars,
  Stats,
  Skills,
  Movement,
  SkillStats,
  MAX_STAT_VALUE,
  SkillModifiers,
  DEFAULT_SKILLS,
} from "../config.svelte";
import { clone } from "../../helpers";
import { NumberField, type NumberLike } from "../types.svelte";

export abstract class Species {
  public readonly about: Record<About, string>;
  public readonly bars: Partial<Record<Bars, NumberField<Species>>>;
  public readonly stats: Partial<Record<Stats, NumberField<Species>>>;
  public readonly skills: Partial<Record<Skills, SkillModifiers>>;
  public readonly movement: Partial<Record<Movement, NumberField<Species>>>;

  constructor(enabled: {
    bars: Partial<Record<Bars, NumberField<Species>>>;
    skills: Skills[];
    movement: Partial<Record<Movement, NumberLike<Species>>>;
  }) {
    this.about = Object.fromEntries(Object.entries(About).map((about) => [about, ""]));
    this.bars = clone(enabled.bars);
    this.stats = Object.fromEntries(Object.keys(Stats).map((stat) => [stat, new NumberField(0, MAX_STAT_VALUE)]));
    this.skills = Object.fromEntries(
      [DEFAULT_SKILLS, ...enabled.skills].map((skill) => [skill, SkillModifiers.average]),
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
    return (values.reduce((a, b) => a + b) / values.length) * modifier;
  }
}
