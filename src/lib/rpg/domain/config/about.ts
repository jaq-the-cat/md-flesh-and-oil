import { names } from "$lib/rpg/helpers";

export const About = names("name", "height", "weight", "gender", "alignment", "biography");
export type About = keyof typeof About;

export const Alignment = names(
  "lawful_good",
  "neutral_good",
  "chaotic_good",
  "lawful_neutral",
  "true_neutral",
  "chaotic_neutral",
  "lawful_evil",
  "neutral_evil",
  "chaotic_evil",
);
export type Alignment = keyof typeof Alignment;

export const Height = names("giant", "tall", "average", "small", "tiny");
export type Height = keyof typeof Height;

export const Weight = names("massive", "heavy", "average", "light", "very_light");
export type Weight = keyof typeof Weight;
