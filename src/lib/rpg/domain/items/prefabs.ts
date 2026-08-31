import { Skills } from "$lib/rpg/config";
import type { ContainerTemplate, ItemTemplate } from "./types";

const melee = (name: string, weight: number, damage: string, info: string | null = null, twoHanded = false) =>
  ({ kind: "melee", name, weight, damage, info, twoHanded }) satisfies ItemTemplate;

const ranged = (
  name: string,
  weight: number,
  hit: Skills,
  damage: string,
  range: number,
  rate: number,
  magazine: number,
  reloadTurns: number,
  info: string | null = null,
) =>
  ({ kind: "ranged", name, weight, hit, damage, range, rate, magazine, reloadTurns, info }) satisfies ItemTemplate;

const RANGED = [
  ranged("Pistol", 1, Skills.firearms, "40 Pierce", 10, 1, 12, 1),
  ranged("Revolver", 1, Skills.firearms, "50 Pierce", 10, 1, 6, 2),
  ranged("Submachine Gun", 2, Skills.firearms, "25 Pierce", 12, 6, 30, 1, "-10 Hit every 3 meters"),
  ranged("Semi-Auto Shotgun", 2, Skills.firearms, "65 Pierce", 12, 2, 10, 1, "-10 Damage per meter"),
  ranged("Pump Shotgun", 2, Skills.firearms, "80 Pierce", 12, 1, 6, 1, "-20 Damage per meter"),
  ranged("Rifle", 2, Skills.firearms, "35 Pierce", 20, 1, 6, 1),
  ranged("Assault Rifle", 3, Skills.firearms, "40 Pierce", 30, 4, 32, 1),
  ranged("Battle Rifle", 3, Skills.firearms, "50 Pierce", 30, 3, 24, 1),
  ranged(
    "Sniper Rifle",
    5,
    Skills.firearms,
    "80 Pierce",
    50,
    1,
    4,
    1,
    "+2 Hit under 10m, -10 Hit above 10m, -20 Hit above 20m",
  ),
  ranged("Improvised Railgun", 1, Skills.technology, "75 Energy", 15, 1, 1, 4),
  ranged("JCJ Railgun", 2, Skills.technology, "100 Energy", 15, 1, 1, 2),
  ranged(
    "Sentinel Gun",
    4,
    Skills.technology,
    "Bootloops in a 5m cone",
    5,
    1,
    1,
    1,
    "Looking away costs 2 Reactions",
  ),
];

/** Innate weapons: parts of a body rather than gear, shared by species and enemies. */
const innate = (name: string, hit: Skills, damage: string, range: number, info: string | null = null) =>
  ({ kind: "innate", name, weight: 0, hit, damage, range, info }) satisfies ItemTemplate;

const bite = (name: string, damage: string, info: string | null = null, range = 1) =>
  innate(name, Skills.melee, damage, range, info);

const power = (name: string, damage: string, range: number, info: string | null = null) =>
  innate(name, Skills.absolute_solver, damage, range, info);

const INNATE = [
  bite(
    "Human Bite",
    "1d20 + Melee Pierce",
    "When used on a Human, drain 2 Blood. When used on a Drone, damage is 1 and you take 1d20 + 2 Blunt instead. If target consents, damage is 1.",
  ),
  bite(
    "Worker Bite",
    "1d20 + Melee Pierce",
    "If used on a Worker Drone, drain 10 Oil. If used on a Human, remove 10 Blood. If target consents, damage is 1.",
  ),
  bite("Knife Tail", "1d20 + Melee Slash", "+1 Successful Hits on hit."),
  bite(
    "Solver Bite",
    "1d30 + Melee Pierce",
    "If used on a Worker Drone, drain 20 Oil. If used on a Human, drain 10 Blood. If target consents, damage is 1. +1 Absolute Solver on success.",
  ),
  bite(
    "Solver Tail",
    "1d30 + Melee Slash",
    "+1 Successful Hits on hit. May be used as an extra limb, flashlight or weapon. Lights up to 5m in front of the user in a cone.",
    2,
  ),
  bite("Solver Claws", "1d40 + Melee Slash", "Rate up to 2. If both hands are claws, disable Solver Powers."),
  bite("Solver Stabbies", "1d20 + Melee Pierce", "Rate 2. +1 Successful Hits on hit."),
  power(
    "Solver Translate",
    "None",
    5,
    "Move any object up to 5 meters from your position or throw it up to 10 meters from its position.",
  ),
  power(
    "Solver Transform",
    "1d20 + Absolute Solver Energy",
    5,
    "Crush any object, damaging or destroying it or dealing Energy damage to enemies.",
  ),
  power(
    "Solver Teleport",
    "None",
    15,
    "During Combat, teleport anywhere you can see within 15m with an Absolute Solver roll of difficulty equal to the distance in meters multiplied by 2. Out of Combat, teleport anywhere you can see within 15m for free, or anywhere you have been before with an Absolute Solver roll of difficulty equal to your 100 - your Willpower bonus",
  ),
  power(
    "[null]",
    "1d100 + Absolute Solver Energy",
    5,
    "Instantly erases any non-Enemy object. Increases Absolute Solver by 20 each time it is used.",
  ),
  bite(
    "Predator Bite",
    "1d20 + Melee Pierce",
    "If used on a Worker Drone, drain 20 Oil. If used on a Human, remove 20 Blood. If target consents, damage is 1.",
  ),
  bite("Predator Claws", "1d30 + Melee Slash"),
  bite(
    "Avian Bite",
    "1d20 + Melee Pierce",
    "If used on a Worker Drone, drain 20 Oil. If used on a Human, remove 20 Blood. If target consents, damage is 1.",
  ),
  bite("Wings", "None", "Permits flight. May not be used as a weapon or shield. Increases Agility while active."),
  bite("Small Claws", "1d30 + Melee Slash"),
  bite(
    "Talon Dive",
    "1d30 + Melee Slash",
    "Must be initiated from flight. When used, move a maximum of 20 meters horizontally in the direction of the target.",
  ),
  bite("Talon Strike", "1d30 + Melee Slash"),
  bite(
    "Disassembly Bite",
    "1d40 + Melee Pierce",
    "If used on a Worker Drone, drain 20 Oil. If used on a Human, drain 10 Blood. If target consents, damage is 1. +1 Absolute Solver on success.",
  ),
  bite("Sword", "1d30 + Melee Slash", "-20 Hit, -20 Block."),
  bite("Disassembly Claws", "1d30 + Melee Slash", "Rate up to 2."),
  bite("Chainsaw", "1d60 + Melee Slash", "+1 Hit, uses 1L Oil per Hit."),
  innate("Submachine Gun", Skills.firearms, "20 Pierce", 10, "Rate 6. Magazine of 30, 1 turn to reload."),
  innate("Laser", Skills.firearms, "25 Energy", 20, "Magazine of 2, 1 turn to reload."),
  innate("Missile", Skills.firearms, "16 Explosive", 20, "Deals damage in a 1m radius."),
  innate("Ninja Star", Skills.athletics, "20 + Melee Pierce", 10),
  innate(
    "EMP",
    Skills.technology,
    "Bootloops all drones within 5 meters",
    5,
    "Bootloops self on failure. May only be used once per fight. Difficulty is 25 + Missing Health.",
  ),
  innate("Sentinel Flash", Skills.technology, "Bootloops in a 5m cone", 5, "Looking away costs 2 Reactions."),
  bite("Sentinel Bite", "1d30 + 20 Pierce"),
  bite("Wasp Bite", "6 + Strength Pierce", "+1d60 if attacking a Drone."),
  bite("Stinger", "6 + Strength Pierce", "+1d60 if attacking a Drone."),
];

/** Innate weapons are addressed by name, from species catalogues and enemy entries alike. */
export function innateWeapon(name: string) {
  return INNATE.find((weapon) => weapon.name === name);
}

export const CONTAINER_PREFABS: ContainerTemplate[] = [
  { name: "Fanny Pack", carry: 6 },
  { name: "Purse", carry: 8 },
  { name: "Suitcase", carry: 10 },
  { name: "Satchel", carry: 20 },
  { name: "Backpack", carry: 30 },
  { name: "Hiking Bag", carry: 40 },
  { name: "Shopping Cart", carry: 100 },
];

export const ITEM_PREFABS: Record<string, ItemTemplate[]> = {
  Innate: INNATE,
  Melee: [
    melee("Bone Saw", 0.1, "1d20 + Melee Slash"),
    melee("Screwdriver", 0.1, "1d20 + Melee Pierce"),
    melee("Work Hammer", 0.1, "1d20 + Melee Blunt"),
    melee(
      "Small Dagger",
      0.1,
      "1d30 + Melee Slash",
      "Can be equipped without using an action. Can be used to perform an Assassination.",
    ),
    melee("Wrench", 0.1, "1d20 + Melee Blunt"),
    melee("Knife", 0.1, "1d20 + Melee + 20 Slash", "Can be used to perform an Assassination."),
    melee("Machete", 0.5, "1d20 + Melee + 30 Slash", "-10 Block"),
    melee("Sword", 1, "1d20 + Melee + 30 Slash", "-20 Hit, -20 Block"),
    melee("Axe", 2, "1d40 + Melee + 20 Slash", null, true),
    melee("Chainsaw", 4, "1d60 + Melee + 40 Slash", "+10 Hit, uses 200mL Oil per Hit", true),
    melee("Improv. Metal Shield", 5, "10 Strike", "-40 Block"),
    melee("JCJ Titanium Shield", 8, "16 Strike", "-60 Block"),
  ],
  Ranged: RANGED,
  Ammo: RANGED.map((weapon) => ({
    kind: "plain",
    name: weapon.name + " Ammo (" + weapon.magazine + ")",
    weight: 0.5,
  })),
  Throwable: [
    {
      kind: "throwable",
      name: "Grenade",
      weight: 1,
      damage: "1d60 + Explosives + 20 Explosive",
      range: "1d75",
      info: "Explodes after 1 Turn.",
    },
    {
      kind: "throwable",
      name: "EMP Grenade",
      weight: 1,
      damage: "Bootloops in a 5m cone",
      range: "1d75",
      info: "Explodes after 1 Turn.",
    },
    { kind: "throwable", name: "Ninja Star", weight: 0, damage: "10 + Melee Pierce", range: "10", info: null },
  ],
  Healing: [
    {
      kind: "healing",
      name: "Bandage",
      weight: 0.05,
      worksOn: "humans",
      heal: "20 HP",
      revive: null,
      requirements: null,
    },
    {
      kind: "healing",
      name: "First Aid Kit",
      weight: 0.5,
      worksOn: "humans",
      heal: "50 HP",
      revive: "Medicine check, difficulty is missing HP",
      requirements: null,
    },
    {
      kind: "healing",
      name: "MedKit",
      weight: 1,
      worksOn: "humans",
      heal: "75 HP",
      revive: "Yes",
      requirements: "Medicine Proficiency",
    },
    {
      kind: "healing",
      name: "Surgical Kit",
      weight: 2,
      worksOn: "humans",
      heal: "100 HP",
      revive: "Yes",
      requirements: "Medicine Expertise",
    },
    {
      kind: "healing",
      name: "Basic Repair Kit",
      weight: 2,
      worksOn: "drones",
      heal: "20 HP",
      revive: null,
      requirements: null,
    },
    {
      kind: "healing",
      name: "Repair Kit",
      weight: 2,
      worksOn: "drones",
      heal: "50 HP",
      revive: "Mechanics check, difficulty is missing HP",
      requirements: null,
    },
    {
      kind: "healing",
      name: "JCJ Sp. WD Repair Kit",
      weight: 3,
      worksOn: "drones",
      heal: "75 HP",
      revive: "Yes",
      requirements: "Mechanics Proficiency",
    },
    {
      kind: "healing",
      name: "Solver Nanite Paste",
      weight: 0,
      worksOn: "both",
      heal: "100% HP + 5 HP for 5 turns",
      revive: "Yes",
      requirements: null,
    },
  ],
  Oil: [
    { kind: "plain", name: "Battery Pack", weight: 1 },
    { kind: "liquid", name: "Oil Bottle (200mL)", weight: 0.1, capacity: 0.2, weightPerUnit: 0.8, current: 0.2 },
    { kind: "liquid", name: "Oil Bottle (500mL)", weight: 0.2, capacity: 0.5, weightPerUnit: 0.8, current: 0.5 },
    { kind: "liquid", name: "Oil Jug (1L)", weight: 0.4, capacity: 1, weightPerUnit: 0.8, current: 1 },
    { kind: "liquid", name: "Oil Jerrycan (10L)", weight: 0.6, capacity: 10, weightPerUnit: 0.8, current: 10 },
    {
      kind: "liquid",
      name: "Gasoline Jerrycan (10L)",
      weight: 0.6,
      capacity: 10,
      weightPerUnit: 0.6,
      current: 10,
    },
    { kind: "liquid", name: "Diesel Jerrycan (10L)", weight: 0.6, capacity: 10, weightPerUnit: 0.7, current: 10 },
  ],
  "Human Food": [
    { kind: "plain", name: "Stale Bread", weight: 0.2 },
    { kind: "plain", name: "Fresh Bread", weight: 0.3 },
    { kind: "plain", name: "Cold Pizza", weight: 0.5 },
    { kind: "plain", name: "Hot Pizza", weight: 0.5 },
    { kind: "plain", name: "Burger", weight: 0.6 },
    { kind: "liquid", name: "Water Bottle (200mL)", weight: 0.1, capacity: 0.2, weightPerUnit: 1, current: 0.2 },
    { kind: "liquid", name: "Water Bottle (500mL)", weight: 0.2, capacity: 0.5, weightPerUnit: 1, current: 0.5 },
    { kind: "liquid", name: "Water Jug (1L)", weight: 0.4, capacity: 1, weightPerUnit: 1, current: 1 },
  ],
  Resources: [
    { kind: "plain", name: "WD Head", weight: 10 },
    { kind: "plain", name: "WD Leg", weight: 5 },
    { kind: "plain", name: "WD Arm", weight: 5 },
    { kind: "plain", name: "WD Body", weight: 40 },
    { kind: "plain", name: "AD Head", weight: 8 },
    { kind: "plain", name: "AD Leg", weight: 4 },
    { kind: "plain", name: "AD Arm", weight: 4 },
    { kind: "plain", name: "AD Body", weight: 30 },
    { kind: "plain", name: "DD Arm", weight: 30 },
    { kind: "plain", name: "DD Leg", weight: 30 },
    { kind: "plain", name: "Industrial-Grade Glue", weight: 0.1 },
    { kind: "plain", name: "Tape", weight: 0.1 },
    { kind: "plain", name: "Box of Screws", weight: 2 },
    { kind: "plain", name: "Silencer", weight: 0.1 },
    { kind: "plain", name: "Metal Sheet", weight: 0.4 },
    { kind: "plain", name: "Metal Rod", weight: 0.1 },
    { kind: "plain", name: "Gun Barrel", weight: 0.2 },
    { kind: "plain", name: "Gun Grip", weight: 0.1 },
    { kind: "plain", name: "Hollow Titanium Tube", weight: 0.1 },
    { kind: "plain", name: "Computer Parts", weight: 0.2 },
    { kind: "plain", name: "Nail", weight: 0.2 },
    { kind: "plain", name: "High Energy Capacitor", weight: 0.2 },
    { kind: "plain", name: "Low Energy Capacitor", weight: 0.2 },
  ],
};

export const POCKETS: ContainerTemplate = { name: "Pockets", carry: null };
