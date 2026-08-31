import { names } from "$lib/rpg/helpers";

export const DamageTypes = names("strike", "pierce", "slash", "energy", "hunger", "blunt", "explosive", "none");
export type DamageTypes = keyof typeof DamageTypes;
