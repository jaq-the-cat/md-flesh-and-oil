import {
  About,
  Alignment,
  Bars,
  Attributes,
  Skills,
  SkillModifiers,
  Movement,
  MAX_ATTR_VALUE,
  SkillStats,
  MIN_SKILL_BONUS,
  STAT_SPAN,
  DEFAULT_ATTR_VALUE,
} from "$lib/rpg/config";
import { DEFAULT_SKILLS } from "$lib/rpg/domain/species/defaults";
import { clamp, clone } from "$lib/rpg/helpers";
import { NumberField, type NumberLike } from "../types.svelte";

export abstract class Species {
  public readonly about: Record<About, string> = $state({} as Record<About, string>);
  public readonly bars: Partial<Record<Bars, NumberField<Species>>> = $state({});
  public readonly attributes: Partial<Record<Attributes, NumberField<Species>>> = $state({});
  public readonly skills: Partial<Record<Skills, SkillModifiers>> = $state({});
  public readonly movement: Partial<Record<Movement, NumberField<Species>>> = $state({});

  constructor(enabled: {
    bars: Partial<Record<Bars, NumberField<Species>>>;
    skills: Skills[];
    movement: Partial<Record<Movement, number>>;
  }) {
    this.about = Object.fromEntries(Object.values(About).map((about) => [about, ""])) as Record<About, string>;
    this.about[About.alignment] = Alignment.true_neutral;
    this.bars = clone(enabled.bars);
    this.attributes = Object.fromEntries(
      Object.values(Attributes).map((stat) => [stat, new NumberField(0, MAX_ATTR_VALUE, DEFAULT_ATTR_VALUE)]),
    );
    this.skills = Object.fromEntries(
      [...DEFAULT_SKILLS, ...enabled.skills].map((skill) => [skill, SkillModifiers.average]),
    );
    this.movement = Object.fromEntries(
      Object.entries(enabled.movement).map(([key, value]) => [key, new NumberField(0, value * 2, value)]),
    );
  }

  getSkillBonus(skill: Skills) {
    const skillModifier = this.skills[skill];
    if (skillModifier == null) return 0;

    let values = [];
    for (const stat of SkillStats[skill]) {
      let statEntry = this.attributes[stat];
      if (statEntry != null) values.push(statEntry.getValue());
    }
    if (values.length === 0) return 0;
    const statAverage = values.reduce((a, b) => a + b, 0) / values.length;
    const normalized = Math.sqrt(statAverage / MAX_ATTR_VALUE);
    return MIN_SKILL_BONUS + normalized * STAT_SPAN + skillModifier;
  }

  /** Copies into `target` every value it shares with `source`, leaving the rest at its defaults. */
  static from<T extends Species>(target: T, source: Species): T {
    for (const about of Object.values(About)) {
      target.about[about] = source.about[about];
    }
    for (const stat of Object.values(Attributes)) {
      copyField(target, target.attributes[stat], source.attributes[stat]);
    }
    for (const skill of Object.values(Skills)) {
      const modifier = source.skills[skill];
      if (modifier != null && target.skills[skill] != null) target.skills[skill] = modifier;
    }
    // Bars and movement come last: their maximums are derived from the attributes and skills above.
    for (const bar of Object.values(Bars)) {
      copyField(target, target.bars[bar], source.bars[bar]);
    }
    for (const movement of Object.values(Movement)) {
      copyField(target, target.movement[movement], source.movement[movement]);
    }
    return target;
  }
}

function copyField(target: Species, field?: NumberField<Species>, source?: NumberField<Species>) {
  if (field == null || source == null) return;
  field.setValue(target, clamp(source.getValue(), field.min, field.getMaxValue(target)));
}
