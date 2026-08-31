import { Skills } from "$lib/rpg/config";
import type { AbilityTemplate } from "./types";

export const HUMAN_ABILITIES: AbilityTemplate[] = [
  {
    kind: "text",
    name: "Adaptable",
    info: "+1 Expertises available during character creation. Cap increases to 3.",
  },
  { kind: "innate_weapon", name: "Human Bite", info: "" },
];

export const WORKER_DRONE_ABILITIES: AbilityTemplate[] = [
  {
    kind: "text",
    name: "Adaptable",
    info: "+1 Expertises available during character creation. Cap increases to 3.",
  },
  { kind: "innate_weapon", name: "Worker Bite", info: "" },
  { kind: "innate_weapon", name: "Knife Tail", info: "" },
];

export const SOLVER_DRONE_ABILITIES: AbilityTemplate[] = [
  { kind: "innate_weapon", name: "Solver Bite", info: "" },
  { kind: "innate_weapon", name: "Solver Tail", info: "" },
  { kind: "innate_weapon", name: "Solver Claws", info: "" },
  { kind: "innate_weapon", name: "Solver Stabbies", info: "" },
  { kind: "innate_weapon", name: "Solver Translate", info: "" },
  { kind: "innate_weapon", name: "Solver Transform", info: "" },
  { kind: "innate_weapon", name: "Solver Teleport", info: "" },
  { kind: "innate_weapon", name: "[null]", info: "" },
];

export const PREDATOR_DRONE_ABILITIES: AbilityTemplate[] = [
  {
    kind: "skill_modifier",
    name: "Ambush Predator",
    info: "Predator Drones are built to go unnoticed until they choose otherwise.",
    skill: Skills.stealth,
    amount: 15,
  },
  { kind: "innate_weapon", name: "Predator Bite", info: "" },
  { kind: "innate_weapon", name: "Predator Claws", info: "" },
];

export const AVIAN_DRONE_ABILITIES: AbilityTemplate[] = [
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
  { kind: "innate_weapon", name: "Avian Bite", info: "" },
  { kind: "innate_weapon", name: "Small Claws", info: "" },
  { kind: "innate_weapon", name: "Talon Dive", info: "" },
  { kind: "innate_weapon", name: "Talon Strike", info: "" },
];

export const DISASSEMBLY_DRONE_ABILITIES: AbilityTemplate[] = [
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
  { kind: "innate_weapon", name: "Disassembly Bite", info: "" },
  { kind: "innate_weapon", name: "Sword", info: "" },
  { kind: "innate_weapon", name: "Disassembly Claws", info: "" },
  { kind: "innate_weapon", name: "Chainsaw", info: "" },
  { kind: "innate_weapon", name: "Submachine Gun", info: "" },
  { kind: "innate_weapon", name: "Laser", info: "" },
  { kind: "innate_weapon", name: "Missile", info: "" },
  { kind: "innate_weapon", name: "Ninja Star", info: "" },
  { kind: "innate_weapon", name: "EMP", info: "" },
];
