import { Stats } from "./stats";

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
  average = 0.5,
  proficient = 0.85,
  expert = 1.2,
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
