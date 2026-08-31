import { names } from "$lib/rpg/helpers";

export const Bars = names("health", "blood", "oil", "solver", "sanity");
export type Bars = keyof typeof Bars;
