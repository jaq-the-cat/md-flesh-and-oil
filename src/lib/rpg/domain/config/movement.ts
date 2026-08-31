import { names } from "$lib/rpg/helpers";

export const Movement = names("walking", "running", "flying", "swimming", "crawling", "jump_height");
export type Movement = keyof typeof Movement;
