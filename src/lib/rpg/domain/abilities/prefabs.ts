import { Attributes, Skills } from "$lib/rpg/config";
import type { AbilityTemplate } from "./types";

const weapon = (name: string, hit: Skills, damage: string, range: number, info = "") =>
  ({ kind: "weapon", name, hit, damage, range, info }) satisfies AbilityTemplate;

const melee = (name: string, damage: string, info = "", range = 1) =>
  weapon(name, Skills.melee, damage, range, info);

const solver = (name: string, damage: string, range: number, info = "") =>
  weapon(name, Skills.absolute_solver, damage, range, info);

export const HUMAN_ABILITIES: AbilityTemplate[] = [
  {
    kind: "text",
    name: "Adaptable",
    info: "+1 Expertises available during character creation. Cap increases to 3.",
  },
  melee(
    "Human Bite",
    "1d20 + Melee Pierce",
    "When used on a Human, drain 2 Blood. When used on a Drone, damage is 1 and you take 1d20 + 2 Blunt instead. If target consents, damage is 1.",
  ),
];

export const WORKER_DRONE_ABILITIES: AbilityTemplate[] = [
  {
    kind: "text",
    name: "Adaptable",
    info: "+1 Expertises available during character creation. Cap increases to 3.",
  },
  melee(
    "Worker Bite",
    "1d20 + Melee Pierce",
    "If used on a Worker Drone, drain 10 Fresh Oil. If used on a Human, remove 10 Blood. If target consents, damage is 1.",
  ),
  melee("Knife Tail", "1d20 + Melee Slash", "+1 Successful Hits on hit."),
];

export const SOLVER_DRONE_ABILITIES: AbilityTemplate[] = [
  melee(
    "Solver Bite",
    "1d30 + Melee Pierce",
    "If used on a Worker Drone, remove 10 Fresh Oil and drain 20 Used Oil. If used on a Human, remove 1 Blood and drain 1 Blood. If target consents, damage is 1. +1 Absolute Solver on success.",
  ),
  melee(
    "Solver Tail",
    "1d30 + Melee Slash",
    "+1 Successful Hits on hit. May be used as an extra limb, flashlight or weapon. Lights up to 5m in front of the user in a cone.",
    2,
  ),
  melee("Solver Claws", "1d40 + Melee Slash", "Rate up to 2. If both hands are claws, disable Solver Powers."),
  melee("Solver Stabbies", "1d20 + Melee Pierce", "Rate 2. +1 Successful Hits on hit."),
  solver(
    "Solver Translate",
    "None",
    5,
    "Move any object up to 5 meters from your position or throw it up to 10 meters from its position.",
  ),
  solver(
    "Solver Transform",
    "1d20 + Absolute Solver Energy",
    5,
    "Crush any object, damaging or destroying it or dealing Energy damage to enemies.",
  ),
  solver(
    "Solver Teleport",
    "None",
    15,
    "During Combat, teleport anywhere you can see within 15m with an Absolute Solver roll of difficulty equal to the distance in meters multiplied by 2. Out of Combat, teleport anywhere you can see within 15m for free, or anywhere you have been before with an Absolute Solver roll of difficulty equal to your 100 - your Willpower bonus",
  ),
  solver(
    "[null]",
    "1d100 + Absolute Solver Energy",
    5,
    "Instantly erases any non-Enemy object. Increases Absolute Solver by 20 each time it is used.",
  ),
];

export const PREDATOR_DRONE_ABILITIES: AbilityTemplate[] = [
  {
    kind: "skill_modifier",
    name: "Ambush Predator",
    info: "Predator Drones are built to go unnoticed until they choose otherwise.",
    skill: Skills.stealth,
    amount: 15,
  },
  melee(
    "Predator Bite",
    "1d20 + Melee Pierce",
    "If used on a Worker Drone, drain 20 Oil. If used on a Human, remove 20 Blood. If target consents, damage is 1.",
  ),
  melee("Claws", "1d30 + Melee Slash"),
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
  melee(
    "Worker Bite",
    "1d20 + Melee Pierce",
    "If used on a Worker Drone, drain 20 Oil. If used on a Human, remove 20 Blood. If target consents, damage is 1.",
  ),
  melee("Small Claws", "1d30 + Melee Slash"),
  melee(
    "Talon Dive",
    "1d30 + Melee Slash",
    "Must be initiated from flight. When used, move a maximum of 20 meters horizontally in the direction of the target.",
  ),
  melee("Talon Strike", "1d30 + Melee Slash"),
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
  melee(
    "Disassembly Bite",
    "1d40 + Melee Pierce",
    "If used on a Worker Drone, remove 10 Fresh Oil and drain 20 Used Oil. If used on a Human, remove 10 Blood and drain 10 Blood. If target consents, damage is 1. +1 Absolute Solver on success.",
  ),
  melee("Sword", "1d30 + Melee Slash", "-20 Hit, -20 Block."),
  melee("Claws", "1d30 + Melee Slash", "Rate up to 2."),
  melee("Chainsaw", "1d60 + Melee Slash", "+1 Hit, uses 1L Oil per Hit."),
  weapon("Submachine Gun", Skills.firearms, "20 Pierce", 10, "Rate 6. Magazine of 30, 1 turn to reload."),
  weapon("Laser", Skills.firearms, "25 Energy", 20, "Magazine of 2, 1 turn to reload."),
  weapon("Missile", Skills.firearms, "16 Explosive", 20, "Deals damage in a 1m radius."),
  weapon("Ninja Star", Skills.athletics, "20 + Melee Pierce", 10),
  weapon(
    "EMP",
    Skills.technology,
    "Bootloops all drones within 5 meters",
    5,
    "Bootloops self on failure. May only be used once per fight. Difficulty is 25 + Missing Health.",
  ),
];
