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
        "knife",
        "pistol",
        "revolver",
        "submachine_gun",
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
        "pistol",
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
        "knife",
        "pistol",
        "rifle",
        "pump_shotgun",
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
        "knife",
        "revolver",
        "assault_rifle",
        "semi_auto_shotgun",
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
        "knife",
        "revolver",
        "assault_rifle",
        "semi_auto_shotgun",
        "jcj_railgun",
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
        "knife",
        "pistol",
        "assault_rifle",
        "semi_auto_shotgun",
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
        "knife",
        "pistol",
        "assault_rifle",
        "semi_auto_shotgun",
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
        "knife",
        "revolver",
        "assault_rifle",
        "semi_auto_shotgun",
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
        "pistol",
        "sniper_rifle",
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
        "knife",
        "pistol",
        "pump_shotgun",
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
        "knife",
      ],
      possible: [
        "pistol",
        "revolver",
        "submachine_gun",
        "rifle",
        "pump_shotgun",
        "assault_rifle",
        "improvised_railgun",
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
        "knife",
      ],
      possible: [
        "pistol",
        "revolver",
        "submachine_gun",
        "rifle",
        "pump_shotgun",
        "semi_auto_shotgun",
        "assault_rifle",
        "battle_rifle",
        "sniper_rifle",
        "improvised_railgun",
        "jcj_railgun",
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
        "knife",
        "machete",
        "axe",
        "sentinel_gun",
        "emp_grenade",
        "knife_tail",
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
        "solver_translate",
        "solver_transform",
        "solver_teleport",
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
        "solver_tail",
        "solver_stabbies",
      ],
      possible: [
        "solver_claws",
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
        "solver_translate",
        "solver_transform",
        "null_item",
        "solver_stabbies",
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
        "disassembly_claws",
        "sword_innate",
        "chainsaw_innate",
        "submachine_gun_innate",
        "laser",
        "missile",
        "ninja_star_innate",
        "emp",
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
        "wings",
        "small_claws",
        "talon_dive",
        "talon_strike",
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
        "predator_claws",
        "predator_bite",
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
        "wings",
        "stinger",
        "wasp_bite",
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
        "wings",
        "stinger",
        "wasp_bite",
        "disassembly_claws",
        "sword_innate",
        "chainsaw_innate",
        "submachine_gun_innate",
        "laser",
        "missile",
        "ninja_star_innate",
        "emp",
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
        "sentinel_flash",
        "sentinel_bite",
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
