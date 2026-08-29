import { Enemy } from "../infra/enemy.svelte";
import { innate } from "./innate.svelte";
import { weapons } from "./weapons.svelte";

export const enemyLists: { [category: string]: { [enemy: string]: Enemy } } = {
  Humans: {
    "Human Civilian": new Enemy(
      40,
      [],
      [weapons.Melee.Knife, weapons.Ranged.Pistol, weapons.Ranged.Revolver, weapons.Ranged.SMG],
      {},
      {
        "Passive Perception": 20,
        "Intimidation Resistance (Drones)": 20,
      },
    ),
    "JCJ Security [NC]": new Enemy(
      50,
      [weapons.Ranged.Pistol],
      [],
      {},
      {
        "Passive Perception": 40,
      },
    ),
    "JCJ Mercenary [NC]": new Enemy(
      60,
      [weapons.Melee.Knife, weapons.Ranged.Pistol, weapons.Ranged.Rifle, weapons.Ranged["Pump Shotgun"]],
      [],
      {
        Melee: 20,
        Firearms: 20,
      },
      {
        "Passive Perception": 50,
      },
    ),
    "JCJ Private Soldier [NC]": new Enemy(
      70,
      [
        weapons.Melee.Knife,
        weapons.Ranged.Revolver,
        weapons.Ranged["Assault Rifle"],
        weapons.Ranged["Semi-Auto Shotgun"],
      ],
      [],
      {
        Melee: 20,
        "Against Solver Drones": 10,
        Firearms: 30,
      },
      {
        "Passive Perception": 40,
        "Persuasion Resistance": 60,
        "Intimidation Resistance": 60,
      },
      "Private Military Security soldier hired by JCJenson after the Gala Incident and the discovery of the AbsoluteSolver Anomaly. Received Special Training against Solver Drones.",
    ),
    "JCJ Private Commander [NC]": new Enemy(
      100,
      [
        weapons.Melee.Knife,
        weapons.Ranged.Revolver,
        weapons.Ranged["Assault Rifle"],
        weapons.Ranged["Semi-Auto Shotgun"],
        weapons.Ranged["JCJ Railgun"],
      ],
      [],
      {
        Melee: 20,
        "Against Solver Drones": 10,
        "Against Disassembly Drones": 10,
        Firearms: 40,
      },
      {
        "Passive Perception": 33,
        "Persuasion Resistance": 70,
        "Intimidation Resistance": 60,
      },
      "Private Military Security commander hired by JCJenson after the Gala Incident and the discovery of the AbsoluteSolver Anomaly. Received Special Training against Solver Drones and Disassembly Drones.",
    ),
    Marine: new Enemy(
      120,
      [
        weapons.Melee.Knife,
        weapons.Ranged.Pistol,
        weapons.Ranged["Assault Rifle"],
        weapons.Ranged["Semi-Auto Shotgun"],
      ],
      [],
      {
        Melee: 25,
        Firearms: 30,
      },
      {
        "Passive Perception": 40,
        "Persuasion Resistance": 70,
        "Intimidation Resistance": 70,
      },
    ),
    "Marine Captain": new Enemy(
      150,
      [
        weapons.Melee.Knife,
        weapons.Ranged.Pistol,
        weapons.Ranged["Assault Rifle"],
        weapons.Ranged["Semi-Auto Shotgun"],
      ],
      [],
      {
        Melee: 25,
        Firearms: 30,
      },
      {
        "Passive Perception": 50,
        "Persuasion Resistance": 70,
        "Intimidation Resistance": 70,
      },
    ),
    "Marine Commander": new Enemy(
      200,
      [
        weapons.Melee.Knife,
        weapons.Ranged.Revolver,
        weapons.Ranged["Assault Rifle"],
        weapons.Ranged["Semi-Auto Shotgun"],
      ],
      [],
      {
        Melee: 10,
        Firearms: 40,
      },
      {
        "Passive Perception": 16,
        "Persuasion Resistance": 18,
        "Intimidation Resistance": 18,
      },
    ),
    "Marine Sniper": new Enemy(
      100,
      [weapons.Ranged.Pistol, weapons.Ranged["Sniper Rifle"]],
      [],
      {
        Firearms: 50,
        Stealth: 50,
      },
      {
        "Passive Perception (Sniper Rifle equipped)": 10,
        "Persuasion Resistance": 70,
        "Intimidation Resistance": 70,
      },
    ),
  },
  "Worker Drones": {
    "Worker Drone": new Enemy(
      70,
      [],
      [weapons.Melee.Knife, weapons.Ranged.Pistol, weapons.Ranged["Pump Shotgun"]],
      {
        Firearms: 10,
        Stealth: 10,
      },
      {
        "Passive Perception": 30,
      },
    ),
    "Trader Worker Drone [NC]": new Enemy(
      100,
      [weapons.Melee.Knife],
      [
        weapons.Ranged.Pistol,
        weapons.Ranged.Revolver,
        weapons.Ranged.SMG,
        weapons.Ranged.Rifle,
        weapons.Ranged["Pump Shotgun"],
        weapons.Ranged["Assault Rifle"],
        weapons.Ranged["Improvised Railgun"],
      ],
      {
        Firearms: 20,
        Stealth: 32,
      },
      {
        "Passive Perception": 50,
        "Persuasion Resistance": 40,
      },
    ),
    "WDF Worker Drone": new Enemy(
      120,
      [weapons.Melee.Knife],
      [
        weapons.Ranged.Pistol,
        weapons.Ranged.Revolver,
        weapons.Ranged.SMG,
        weapons.Ranged.Rifle,
        weapons.Ranged["Pump Shotgun"],
        weapons.Ranged["Semi-Auto Shotgun"],
        weapons.Ranged["Assault Rifle"],
        weapons.Ranged["Battle Rifle"],
        weapons.Ranged["Sniper Rifle"],
        weapons.Ranged["Improvised Railgun"],
        weapons.Ranged["JCJ Railgun"],
      ],
      {
        Melee: 16,
        Firearms: 30,
        "Attack Bonus against DDs & JCJ": 1,
      },
      {
        "Passive Perception": 60,
        "Persuasion Resistance": 50,
        "Persuasion Resistance (against DDs & JCJ)": 70,
        "Intimidation Resistance": 40,
      },
    ),
    "Insane Worker Drone": new Enemy(
      120,
      [],
      [
        weapons.Melee.Knife,
        weapons.Melee.Machete,
        weapons.Melee.Axe,
        weapons.Ranged["Sentinel Gun"],
        weapons.Throwable["EMP Grenade"],
        innate["Worker Drone"]["Knife Tail"],
      ],
      {
        Melee: 30,
        Stealth: 25,
      },
      {
        "Passive Perception": 30,
        "Persuasion Resistance": 99,
        "Intimidation Resistance": 40,
      },
    ),
  },
  "Solver Drones": {
    "Solver Drone": new Enemy(
      140,
      [
        innate["Solver Drone"]["Solver Translate"],
        innate["Solver Drone"]["Solver Transform"],
        innate["Solver Drone"]["Solver Teleport"],
      ],
      [],
      {
        "Absolute Solver": 2,
        Stealth: 30,
      },
      {
        "Passive Perception": 40,
        "Persuasion Resistance": 30,
        "Intimidation Resistance": 30,
      },
    ),
    "Controlled Solver Drone": new Enemy(
      150,
      [innate["Solver Drone"]["Solver Tail"], innate["Solver Drone"]["Solver Stabbies"]],
      [innate["Solver Drone"]["Solver Claws"]],
      {
        Melee: 30,
        Stealth: 40,
        "Absolute Solver": 5,
      },
      {
        "Passive Perception": 60,
        "Persuasion Resistance": 30,
        "Intimidation Resistance": 30,
      },
    ),
    "Centipede Drone": new Enemy(
      250,
      [],
      [
        innate["Solver Drone"]["Solver Translate"],
        innate["Solver Drone"]["Solver Transform"],
        innate["Solver Drone"]["[null]"],
        innate["Solver Drone"]["Solver Stabbies"],
      ],
      {
        Melee: 60,
        "Absolute Solver": 5,
      },
      {
        "Passive Perception": 60,
        "Persuasion Resistance": 99,
        "Intimidation Resistance": 99,
      },
      "Can create holograms to hide itself and make you see anything it’d like, using its Absolute Solver bonus as the Stealth roll.",
    ),
  },
  "Disassembly Drones": {
    "Disassembly Drone": new Enemy(
      200,
      [
        innate["Disassembly Drone"].Claws,
        innate["Disassembly Drone"].Sword,
        innate["Disassembly Drone"].Chainsaw,
        innate["Disassembly Drone"].SMG,
        innate["Disassembly Drone"].Laser,
        innate["Disassembly Drone"].Missile,
        innate["Disassembly Drone"]["Ninja Star"],
        innate["Disassembly Drone"].EMP,
      ],
      [],
      {
        Melee: 60,
        Firearms: 30,
        "Absolute Solver": 3,
        "Against Worker and Solver Drones": 25,
      },
      {
        "Passive Perception": 70,
        "Persuasion Resistance": 40,
        "Intimidation Resistance": 60,
      },
      "If Blood or Oil has been spilled during combat, increase Persuasion & Intimidation resistance to 75.",
    ),
  },
  "Non-Canon Species": {
    "Avian Drone": new Enemy(
      90,
      [
        innate["Avian Drone"].Wings,
        innate["Avian Drone"]["Small Claws"],
        innate["Avian Drone"]["Talon Dive"],
        innate["Avian Drone"]["Talon Strike"],
      ],
      [],
      {
        Melee: 60,
        Flying: 40,
        Stealth: 50,
      },
      {
        "Passive Perception": 40,
      },
    ),
    "Wasp Drone (Worker)": new Enemy(
      250,
      [innate["Avian Drone"].Wings, weapons.Wasp.Stinger, weapons.Wasp["Wasp Bite"]],
      [],
      {
        Melee: 60,
        Flying: 40,
        Stealth: 30,
      },
      {
        "Passive Perception": 40,
      },
      "Hive Mind",
    ),
    "Wasp Drone (Disassembly)": new Enemy(
      300,
      [
        innate["Avian Drone"].Wings,
        weapons.Wasp.Stinger,
        weapons.Wasp["Wasp Bite"],
        innate["Disassembly Drone"].Claws,
        innate["Disassembly Drone"].Sword,
        innate["Disassembly Drone"].Chainsaw,
        innate["Disassembly Drone"].SMG,
        innate["Disassembly Drone"].Laser,
        innate["Disassembly Drone"].Missile,
        innate["Disassembly Drone"]["Ninja Star"],
        innate["Disassembly Drone"].EMP,
      ],
      [],
      {
        Melee: 70,
        Flying: 40,
        Stealth: 30,
      },
      {
        "Passive Perception": 40,
      },
      "Hive Mind",
    ),
  },
  Sentinel: {
    Sentinel: new Enemy(
      100,
      [weapons.Sentinel["Sentinel Flash"], weapons.Sentinel["Sentinel Bite"]],
      [],
      {
        Melee: 20,
        Technology: 10,
        Stealth: -1,
        Acrobatics: 20,
        "All Drones": 25,
      },
      {
        "Passive Perception": 66,
        "Persuasion Resistance": 18,
        "Intimidation Resistance": 99,
      },
    ),
  },
  Unique: {
    // "name": new Enemy(14, [weapons.Melee.Knife], [
    //     weapons.Ranged.Pistol,
    //     weapons.Ranged.Revolver,
    // ], {
    //     "Melee": 1,
    //     "Firearms": 3,
    // }, {
    //     "Passive Perception": 14,
    //     "Persuasion Resistance": 16,
    //     "Intimidation Resistance": 16,
    // }),
    // "name": new Enemy(14, [weapons.Melee.Knife], [
    //     weapons.Ranged.Pistol,
    //     weapons.Ranged.Revolver,
    // ], {
    //     "Melee": 1,
    //     "Firearms": 3,
    // }, {
    //     "Passive Perception": 14,
    //     "Persuasion Resistance": 16,
    //     "Intimidation Resistance": 16,
    // }),
    // "name": new Enemy(14, [weapons.Melee.Knife], [
    //     weapons.Ranged.Pistol,
    //     weapons.Ranged.Revolver,
    // ], {
    //     "Melee": 1,
    //     "Firearms": 3,
    // }, {
    //     "Passive Perception": 14,
    //     "Persuasion Resistance": 16,
    //     "Intimidation Resistance": 16,
    // }),
  },
};
