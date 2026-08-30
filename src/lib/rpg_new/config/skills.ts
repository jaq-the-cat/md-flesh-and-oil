import { Attributes } from "./attributes";

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
  average = 0,
  proficient = 12,
  expert = 25,
}

export const MIN_SKILL_BONUS = -50;
export const MAX_SKILL_BONUS = 75;
export const STAT_SPAN = MAX_SKILL_BONUS - MIN_SKILL_BONUS - SkillModifiers.expert;

export const SkillStats: Record<Skills, Attributes[]> = {
  [Skills.vigor]: [Attributes.vitality],
  [Skills.athletics]: [Attributes.vitality, Attributes.strength],

  [Skills.stealth]: [Attributes.agility],
  [Skills.finesse]: [Attributes.dexterity, Attributes.agility],
  [Skills.flying]: [Attributes.dexterity, Attributes.agility],

  [Skills.persuasion]: [Attributes.charisma],
  [Skills.intimidation]: [Attributes.charisma],

  [Skills.insight]: [Attributes.perception],
  [Skills.investigation]: [Attributes.perception],

  [Skills.knowledge]: [Attributes.intelligence],
  [Skills.technology]: [Attributes.intelligence],

  [Skills.wit]: [Attributes.intelligence, Attributes.charisma],

  [Skills.melee]: [Attributes.strength, Attributes.dexterity],
  [Skills.firearms]: [Attributes.intelligence, Attributes.dexterity],

  [Skills.explosives]: [Attributes.intelligence, Attributes.dexterity],
  [Skills.medicine]: [Attributes.intelligence, Attributes.dexterity],
  [Skills.mechanics]: [Attributes.intelligence, Attributes.dexterity],

  [Skills.willpower]: [Attributes.vitality, Attributes.charisma, Attributes.perception, Attributes.intelligence],
};
