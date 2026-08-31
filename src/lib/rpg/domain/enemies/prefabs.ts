import type { EnemyTemplate } from "./types";

/** Ported from the old system unchanged: these numbers were already on the d100 scale. */
export const ENEMY_PREFABS: Record<string, EnemyTemplate[]> = {
  "Humans": [
    {
      name: "Human Civilian",
      maxHp: 40,
      description: null,
      guaranteed: [],
      possible: [
        { category: "Melee", name: "Knife" },
        { category: "Ranged", name: "Pistol" },
        { category: "Ranged", name: "Revolver" },
        { category: "Ranged", name: "Submachine Gun" },
      ],
      stats: [],
      passive: [
        { label: "Passive Perception", value: 20 },
        { label: "Intimidation Resistance (Drones)", value: 20 },
      ],
    },
    {
      name: "JCJ Security [NC]",
      maxHp: 50,
      description: null,
      guaranteed: [
        { category: "Ranged", name: "Pistol" },
      ],
      possible: [],
      stats: [],
      passive: [
        { label: "Passive Perception", value: 40 },
      ],
    },
    {
      name: "JCJ Mercenary [NC]",
      maxHp: 60,
      description: null,
      guaranteed: [
        { category: "Melee", name: "Knife" },
        { category: "Ranged", name: "Pistol" },
        { category: "Ranged", name: "Rifle" },
        { category: "Ranged", name: "Pump Shotgun" },
      ],
      possible: [],
      stats: [
        { label: "Melee", value: 20 },
        { label: "Firearms", value: 20 },
      ],
      passive: [
        { label: "Passive Perception", value: 50 },
      ],
    },
    {
      name: "JCJ Private Soldier [NC]",
      maxHp: 70,
      description: "Private Military Security soldier hired by JCJenson after the Gala Incident and the discovery of the AbsoluteSolver Anomaly. Received Special Training against Solver Drones.",
      guaranteed: [
        { category: "Melee", name: "Knife" },
        { category: "Ranged", name: "Revolver" },
        { category: "Ranged", name: "Assault Rifle" },
        { category: "Ranged", name: "Semi-Auto Shotgun" },
      ],
      possible: [],
      stats: [
        { label: "Melee", value: 20 },
        { label: "Against Solver Drones", value: 10 },
        { label: "Firearms", value: 30 },
      ],
      passive: [
        { label: "Passive Perception", value: 40 },
        { label: "Persuasion Resistance", value: 60 },
        { label: "Intimidation Resistance", value: 60 },
      ],
    },
    {
      name: "JCJ Private Commander [NC]",
      maxHp: 100,
      description: "Private Military Security commander hired by JCJenson after the Gala Incident and the discovery of the AbsoluteSolver Anomaly. Received Special Training against Solver Drones and Disassembly Drones.",
      guaranteed: [
        { category: "Melee", name: "Knife" },
        { category: "Ranged", name: "Revolver" },
        { category: "Ranged", name: "Assault Rifle" },
        { category: "Ranged", name: "Semi-Auto Shotgun" },
        { category: "Ranged", name: "JCJ Railgun" },
      ],
      possible: [],
      stats: [
        { label: "Melee", value: 20 },
        { label: "Against Solver Drones", value: 10 },
        { label: "Against Disassembly Drones", value: 10 },
        { label: "Firearms", value: 40 },
      ],
      passive: [
        { label: "Passive Perception", value: 33 },
        { label: "Persuasion Resistance", value: 70 },
        { label: "Intimidation Resistance", value: 60 },
      ],
    },
    {
      name: "Marine",
      maxHp: 120,
      description: null,
      guaranteed: [
        { category: "Melee", name: "Knife" },
        { category: "Ranged", name: "Pistol" },
        { category: "Ranged", name: "Assault Rifle" },
        { category: "Ranged", name: "Semi-Auto Shotgun" },
      ],
      possible: [],
      stats: [
        { label: "Melee", value: 25 },
        { label: "Firearms", value: 30 },
      ],
      passive: [
        { label: "Passive Perception", value: 40 },
        { label: "Persuasion Resistance", value: 70 },
        { label: "Intimidation Resistance", value: 70 },
      ],
    },
    {
      name: "Marine Captain",
      maxHp: 150,
      description: null,
      guaranteed: [
        { category: "Melee", name: "Knife" },
        { category: "Ranged", name: "Pistol" },
        { category: "Ranged", name: "Assault Rifle" },
        { category: "Ranged", name: "Semi-Auto Shotgun" },
      ],
      possible: [],
      stats: [
        { label: "Melee", value: 25 },
        { label: "Firearms", value: 30 },
      ],
      passive: [
        { label: "Passive Perception", value: 50 },
        { label: "Persuasion Resistance", value: 70 },
        { label: "Intimidation Resistance", value: 70 },
      ],
    },
    {
      name: "Marine Commander",
      maxHp: 200,
      description: null,
      guaranteed: [
        { category: "Melee", name: "Knife" },
        { category: "Ranged", name: "Revolver" },
        { category: "Ranged", name: "Assault Rifle" },
        { category: "Ranged", name: "Semi-Auto Shotgun" },
      ],
      possible: [],
      stats: [
        { label: "Melee", value: 10 },
        { label: "Firearms", value: 40 },
      ],
      passive: [
        { label: "Passive Perception", value: 16 },
        { label: "Persuasion Resistance", value: 18 },
        { label: "Intimidation Resistance", value: 18 },
      ],
    },
    {
      name: "Marine Sniper",
      maxHp: 100,
      description: null,
      guaranteed: [
        { category: "Ranged", name: "Pistol" },
        { category: "Ranged", name: "Sniper Rifle" },
      ],
      possible: [],
      stats: [
        { label: "Firearms", value: 50 },
        { label: "Stealth", value: 50 },
      ],
      passive: [
        { label: "Passive Perception (Sniper Rifle equipped)", value: 10 },
        { label: "Persuasion Resistance", value: 70 },
        { label: "Intimidation Resistance", value: 70 },
      ],
    },
  ],
  "Worker Drones": [
    {
      name: "Worker Drone",
      maxHp: 70,
      description: null,
      guaranteed: [],
      possible: [
        { category: "Melee", name: "Knife" },
        { category: "Ranged", name: "Pistol" },
        { category: "Ranged", name: "Pump Shotgun" },
      ],
      stats: [
        { label: "Firearms", value: 10 },
        { label: "Stealth", value: 10 },
      ],
      passive: [
        { label: "Passive Perception", value: 30 },
      ],
    },
    {
      name: "Trader Worker Drone [NC]",
      maxHp: 100,
      description: null,
      guaranteed: [
        { category: "Melee", name: "Knife" },
      ],
      possible: [
        { category: "Ranged", name: "Pistol" },
        { category: "Ranged", name: "Revolver" },
        { category: "Ranged", name: "Submachine Gun" },
        { category: "Ranged", name: "Rifle" },
        { category: "Ranged", name: "Pump Shotgun" },
        { category: "Ranged", name: "Assault Rifle" },
        { category: "Ranged", name: "Improvised Railgun" },
      ],
      stats: [
        { label: "Firearms", value: 20 },
        { label: "Stealth", value: 32 },
      ],
      passive: [
        { label: "Passive Perception", value: 50 },
        { label: "Persuasion Resistance", value: 40 },
      ],
    },
    {
      name: "WDF Worker Drone",
      maxHp: 120,
      description: null,
      guaranteed: [
        { category: "Melee", name: "Knife" },
      ],
      possible: [
        { category: "Ranged", name: "Pistol" },
        { category: "Ranged", name: "Revolver" },
        { category: "Ranged", name: "Submachine Gun" },
        { category: "Ranged", name: "Rifle" },
        { category: "Ranged", name: "Pump Shotgun" },
        { category: "Ranged", name: "Semi-Auto Shotgun" },
        { category: "Ranged", name: "Assault Rifle" },
        { category: "Ranged", name: "Battle Rifle" },
        { category: "Ranged", name: "Sniper Rifle" },
        { category: "Ranged", name: "Improvised Railgun" },
        { category: "Ranged", name: "JCJ Railgun" },
      ],
      stats: [
        { label: "Melee", value: 16 },
        { label: "Firearms", value: 30 },
        { label: "Attack Bonus against DDs & JCJ", value: 1 },
      ],
      passive: [
        { label: "Passive Perception", value: 60 },
        { label: "Persuasion Resistance", value: 50 },
        { label: "Persuasion Resistance (against DDs & JCJ)", value: 70 },
        { label: "Intimidation Resistance", value: 40 },
      ],
    },
    {
      name: "Insane Worker Drone",
      maxHp: 120,
      description: null,
      guaranteed: [],
      possible: [
        { category: "Melee", name: "Knife" },
        { category: "Melee", name: "Machete" },
        { category: "Melee", name: "Axe" },
        { category: "Ranged", name: "Sentinel Gun" },
        { category: "Throwable", name: "EMP Grenade" },
        { category: "Innate", name: "Knife Tail" },
      ],
      stats: [
        { label: "Melee", value: 30 },
        { label: "Stealth", value: 25 },
      ],
      passive: [
        { label: "Passive Perception", value: 30 },
        { label: "Persuasion Resistance", value: 99 },
        { label: "Intimidation Resistance", value: 40 },
      ],
    },
  ],
  "Solver Drones": [
    {
      name: "Solver Drone",
      maxHp: 140,
      description: null,
      guaranteed: [
        { category: "Innate", name: "Solver Translate" },
        { category: "Innate", name: "Solver Transform" },
        { category: "Innate", name: "Solver Teleport" },
      ],
      possible: [],
      stats: [
        { label: "Absolute Solver", value: 2 },
        { label: "Stealth", value: 30 },
      ],
      passive: [
        { label: "Passive Perception", value: 40 },
        { label: "Persuasion Resistance", value: 30 },
        { label: "Intimidation Resistance", value: 30 },
      ],
    },
    {
      name: "Controlled Solver Drone",
      maxHp: 150,
      description: null,
      guaranteed: [
        { category: "Innate", name: "Solver Tail" },
        { category: "Innate", name: "Solver Stabbies" },
      ],
      possible: [
        { category: "Innate", name: "Solver Claws" },
      ],
      stats: [
        { label: "Melee", value: 30 },
        { label: "Stealth", value: 40 },
        { label: "Absolute Solver", value: 5 },
      ],
      passive: [
        { label: "Passive Perception", value: 60 },
        { label: "Persuasion Resistance", value: 30 },
        { label: "Intimidation Resistance", value: 30 },
      ],
    },
    {
      name: "Centipede Drone",
      maxHp: 250,
      description: "Can create holograms to hide itself and make you see anything it’d like, using its Absolute Solver bonus as the Stealth roll.",
      guaranteed: [],
      possible: [
        { category: "Innate", name: "Solver Translate" },
        { category: "Innate", name: "Solver Transform" },
        { category: "Innate", name: "[null]" },
        { category: "Innate", name: "Solver Stabbies" },
      ],
      stats: [
        { label: "Melee", value: 60 },
        { label: "Absolute Solver", value: 5 },
      ],
      passive: [
        { label: "Passive Perception", value: 60 },
        { label: "Persuasion Resistance", value: 99 },
        { label: "Intimidation Resistance", value: 99 },
      ],
    },
  ],
  "Disassembly Drones": [
    {
      name: "Disassembly Drone",
      maxHp: 200,
      description: "If Blood or Oil has been spilled during combat, increase Persuasion & Intimidation resistance to 75.",
      guaranteed: [
        { category: "Innate", name: "Disassembly Claws" },
        { category: "Innate", name: "Sword" },
        { category: "Innate", name: "Chainsaw" },
        { category: "Innate", name: "Submachine Gun" },
        { category: "Innate", name: "Laser" },
        { category: "Innate", name: "Missile" },
        { category: "Innate", name: "Ninja Star" },
        { category: "Innate", name: "EMP" },
      ],
      possible: [],
      stats: [
        { label: "Melee", value: 60 },
        { label: "Firearms", value: 30 },
        { label: "Absolute Solver", value: 3 },
        { label: "Against Worker and Solver Drones", value: 25 },
      ],
      passive: [
        { label: "Passive Perception", value: 70 },
        { label: "Persuasion Resistance", value: 40 },
        { label: "Intimidation Resistance", value: 60 },
      ],
    },
  ],
  "Non-Canon Species": [
    {
      name: "Avian Drone",
      maxHp: 90,
      description: null,
      guaranteed: [
        { category: "Innate", name: "Wings" },
        { category: "Innate", name: "Small Claws" },
        { category: "Innate", name: "Talon Dive" },
        { category: "Innate", name: "Talon Strike" },
      ],
      possible: [],
      stats: [
        { label: "Melee", value: 60 },
        { label: "Flying", value: 40 },
        { label: "Stealth", value: 50 },
      ],
      passive: [
        { label: "Passive Perception", value: 40 },
      ],
    },
    {
      name: "Predator Drone",
      maxHp: 140,
      description: null,
      guaranteed: [
        { category: "Innate", name: "Predator Claws" },
        { category: "Innate", name: "Predator Bite" },
      ],
      possible: [],
      stats: [
        { label: "Melee", value: 60 },
        { label: "Stealth", value: 60 },
      ],
      passive: [
        { label: "Passive Perception", value: 50 },
      ],
    },
    {
      name: "Wasp Drone (Worker)",
      maxHp: 250,
      description: "Hive Mind",
      guaranteed: [
        { category: "Innate", name: "Wings" },
        { category: "Innate", name: "Stinger" },
        { category: "Innate", name: "Wasp Bite" },
      ],
      possible: [],
      stats: [
        { label: "Melee", value: 60 },
        { label: "Flying", value: 40 },
        { label: "Stealth", value: 30 },
      ],
      passive: [
        { label: "Passive Perception", value: 40 },
      ],
    },
    {
      name: "Wasp Drone (Disassembly)",
      maxHp: 300,
      description: "Hive Mind",
      guaranteed: [
        { category: "Innate", name: "Wings" },
        { category: "Innate", name: "Stinger" },
        { category: "Innate", name: "Wasp Bite" },
        { category: "Innate", name: "Disassembly Claws" },
        { category: "Innate", name: "Sword" },
        { category: "Innate", name: "Chainsaw" },
        { category: "Innate", name: "Submachine Gun" },
        { category: "Innate", name: "Laser" },
        { category: "Innate", name: "Missile" },
        { category: "Innate", name: "Ninja Star" },
        { category: "Innate", name: "EMP" },
      ],
      possible: [],
      stats: [
        { label: "Melee", value: 70 },
        { label: "Flying", value: 40 },
        { label: "Stealth", value: 30 },
      ],
      passive: [
        { label: "Passive Perception", value: 40 },
      ],
    },
  ],
  "Sentinel": [
    {
      name: "Sentinel",
      maxHp: 100,
      description: null,
      guaranteed: [
        { category: "Innate", name: "Sentinel Flash" },
        { category: "Innate", name: "Sentinel Bite" },
      ],
      possible: [],
      stats: [
        { label: "Melee", value: 20 },
        { label: "Technology", value: 10 },
        { label: "Stealth", value: -1 },
        { label: "Finesse", value: 20 },
        { label: "All Drones", value: 25 },
      ],
      passive: [
        { label: "Passive Perception", value: 66 },
        { label: "Persuasion Resistance", value: 18 },
        { label: "Intimidation Resistance", value: 99 },
      ],
    },
  ],
};
