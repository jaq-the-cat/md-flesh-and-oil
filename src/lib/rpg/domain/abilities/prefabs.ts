import { Skills } from "$lib/rpg/config";
import { ITEMS } from "$lib/rpg/domain/items/prefabs";
import type { AbilityEntry } from "./types";

export const HUMAN_ABILITIES: AbilityEntry[] = [
  {
    kind: "text",
    name: "Adaptable",
    info: "+1 Expertises available during character creation. Cap increases to 3.",
  },
  ITEMS.human_bite,
];

export const WORKER_DRONE_ABILITIES: AbilityEntry[] = [
  {
    kind: "text",
    name: "Adaptable",
    info: "+1 Expertises available during character creation. Cap increases to 3.",
  },
  ITEMS.worker_bite,
  ITEMS.knife_tail,
];

export const SOLVER_DRONE_ABILITIES: AbilityEntry[] = [
  ITEMS.solver_bite,
  ITEMS.solver_tail,
  ITEMS.solver_claws,
  ITEMS.solver_stabbies,
  ITEMS.solver_translate,
  ITEMS.solver_transform,
  ITEMS.solver_teleport,
  ITEMS.null_item,
];

export const PREDATOR_DRONE_ABILITIES: AbilityEntry[] = [
  {
    kind: "skill_modifier",
    name: "Ambush Predator",
    info: "Predator Drones are built to go unnoticed until they choose otherwise.",
    skill: Skills.stealth,
    amount: 15,
  },
  ITEMS.predator_bite,
  ITEMS.predator_claws,
];

export const AVIAN_DRONE_ABILITIES: AbilityEntry[] = [
  {
    kind: "skill_modifier",
    name: "Wings",
    info: "Activated without spending an Action. Permits flight, but may not be used as a weapon or shield.",
    skill: Skills.finesse,
    amount: 10,
  },
  {
    kind: "skill_modifier",
    name: "Silent Feathers",
    info: "Avian Drones move quietly, in the air and on the ground.",
    skill: Skills.stealth,
    amount: 10,
  },
  {
    kind: "skill_modifier",
    name: "Natural Flier",
    info: "Built as long-distance messengers.",
    skill: Skills.flying,
    amount: 10,
  },
  ITEMS.avian_bite,
  ITEMS.small_claws,
  ITEMS.talon_dive,
  ITEMS.talon_strike,
];

export const DISASSEMBLY_DRONE_ABILITIES: AbilityEntry[] = [
  {
    kind: "text",
    name: "Visor and Sensors",
    info: "+10 Passive Perception and -10 Stealth while the Visor and Sensors are on. Toggle with an Action; limits vision to 10m when off",
  },
  {
    kind: "text",
    name: "Built for Killing",
    info: "+10 to all damage rolls.",
  },
  ITEMS.disassembly_bite,
  ITEMS.sword_innate,
  ITEMS.disassembly_claws,
  ITEMS.chainsaw_innate,
  ITEMS.submachine_gun_innate,
  ITEMS.laser,
  ITEMS.missile,
  ITEMS.ninja_star_innate,
  ITEMS.emp,
];
