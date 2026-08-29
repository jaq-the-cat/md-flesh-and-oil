export enum About {
  name,
  height,
  weight,
  gender,
  alignment,
}
export enum Bars {
  health,
  blood,
  oil,
  solver,
  sanity,
}
export enum Stats {
  vitality,
  agility,
  strength,
  dexterity,
  charisma,
  perception,
  intelligence,
}
export const MAX_STAT_VALUE = 100;
export enum Skills {
  vigor,
  athletics,
  stealth,
  finesse,
  firearms,
  persuasion,
  intimidation,
  insight,
  investigation,
  knowledge,
  technology,
  wit,
  melee,
  explosives,
  medicine,
  mechanics,
  willpower,
  flying,
}
export enum SkillModifiers {
  average = 1,
  proficient = 1.2,
  expert = 1.4,
}
export const DEFAULT_SKILLS: Skills[] = [
  Skills.vigor,
  Skills.athletics,
  Skills.stealth,
  Skills.finesse,
  Skills.firearms,
  Skills.persuasion,
  Skills.intimidation,
  Skills.insight,
  Skills.investigation,
  Skills.knowledge,
  Skills.technology,
  Skills.wit,
  Skills.melee,
  Skills.explosives,
  Skills.medicine,
  Skills.mechanics,
  Skills.willpower,
];
export enum Movement {
  walking,
  running,
  flying,
  swimming,
  crawling,
  jump_height,
}
export const SkillStats: Record<Skills, Stats[]> = {
  [Skills.vigor]: [Stats.vitality],
  [Skills.athletics]: [Stats.vitality, Stats.strength],

  [Skills.stealth]: [Stats.agility],
  [Skills.finesse]: [Stats.dexterity, Stats.agility],
  [Skills.flying]: [Stats.dexterity, Stats.agility],

  [Skills.persuasion]: [Stats.charisma],
  [Skills.intimidation]: [Stats.charisma],

  [Skills.insight]: [Stats.perception],
  [Skills.investigation]: [Stats.perception],

  [Skills.knowledge]: [Stats.intelligence],
  [Skills.technology]: [Stats.intelligence],

  [Skills.wit]: [Stats.intelligence, Stats.charisma],

  [Skills.melee]: [Stats.strength, Stats.dexterity],
  [Skills.firearms]: [Stats.intelligence, Stats.dexterity],

  [Skills.explosives]: [Stats.intelligence, Stats.dexterity],
  [Skills.medicine]: [Stats.intelligence, Stats.dexterity],
  [Skills.mechanics]: [Stats.intelligence, Stats.dexterity],

  [Skills.willpower]: [Stats.vitality, Stats.charisma, Stats.perception, Stats.intelligence],
};
