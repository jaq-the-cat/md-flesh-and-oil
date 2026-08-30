import { Skills } from "$lib/rpg_new/config";
import type { SPECIES } from "../species/registry";
import type { AbilityTemplate } from "./types";

const weapon = (name: string, hit: Skills, damage: string, range: number, info = "") =>
  ({ kind: "weapon", name, hit, damage, range, info }) satisfies AbilityTemplate;

const melee = (name: string, damage: string, info = "", range = 1) => weapon(name, Skills.melee, damage, range, info);

const solver = (name: string, damage: string, range: number, info = "") =>
  weapon(name, Skills.absolute_solver, damage, range, info);

/** The abilities each species offers. Adding a species fails here first. */
export const ABILITY_PREFABS: Record<keyof typeof SPECIES, AbilityTemplate[]> = {
  human: [
    melee(
      "Human Bite",
      "1d20 + Melee + 10 Pierce",
      "When used on a Human, drain 2 Blood. When used on a Drone, damage is 1 and you take 1d20 + 2 Blunt instead. If target consents, damage is 1.",
    ),
  ],
  worker_drone: [
    melee(
      "Worker Bite",
      "1d20 + Melee + 20 Pierce",
      "If used on a Worker Drone, drain 2 Fresh Oil. If used on a Human, remove 2 Blood. If target consents, damage is 1.",
    ),
    melee("Knife Tail", "1d20 + Melee + 30 Slash", "+1 Successful Hits on hit."),
  ],
  solver_drone: [
    melee(
      "Solver Bite",
      "1d30 + Melee + 30 Pierce",
      "If used on a Worker Drone, remove 1 Fresh Oil and drain 2 Used Oil. If used on a Human, remove 1 Blood and drain 1 Blood. If target consents, damage is 1. +1 Heat on success.",
    ),
    melee(
      "Solver Tail",
      "1d30 + Melee + 20 Slash",
      "+1 Successful Hits on hit. May be used as an extra limb, flashlight or weapon. Lights up to 10m in front of the user in a cone.",
      2,
    ),
    melee("Solver Claws", "1d40 + Melee + 20 Slash", "Rate up to 2. If both hands are claws, disable Solver Powers."),
    melee("Solver Stabbies", "1d40 + Melee + 30 Pierce", "Rate 2. +1 Successful Hits on hit."),
    solver(
      "Solver Translate",
      "None",
      5,
      "Move any object up to 5 meters from your position or throw it up to 10 meters from its position.",
    ),
    solver(
      "Solver Transform",
      "1d30 + Absolute Solver Energy",
      5,
      "Crush any object, damaging or destroying it or dealing Energy damage to enemies.",
    ),
    solver(
      "Solver Teleport",
      "None",
      15,
      "During Combat, teleport anywhere you can see within 15m with an Absolute Solver roll of difficulty 5 + distance in meters. Out of Combat, teleport anywhere you can see within 15m for free, or anywhere you have been before with an Absolute Solver roll of 16 difficulty.",
    ),
    solver(
      "[null]",
      "(Absolute Solver)d10 + 10 Energy",
      5,
      "Instantly erases any non-Enemy object. Increases Heat and Absolute Solver by 1 each time it is used.",
    ),
  ],
};
