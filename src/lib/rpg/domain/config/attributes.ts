import { names } from "$lib/rpg/helpers";

export const Attributes = names(
  "vitality",
  "agility",
  "strength",
  "dexterity",
  "charisma",
  "perception",
  "intelligence",
);
export type Attributes = keyof typeof Attributes;

export const MAX_ATTR_VALUE = 100;
export const DEFAULT_ATTR_VALUE = 25;
