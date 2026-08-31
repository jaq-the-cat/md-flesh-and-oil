import { Skills } from "$lib/rpg/domain/config/skills";

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

/** How solidly a species is built. Drives both its health and what it can carry. */
export type Build = { base: number; multiplier: number };
