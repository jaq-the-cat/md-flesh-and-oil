import { About, Alignment, Attributes, Bars, Movement, SkillModifiers, Skills } from "$lib/rpg/config";
import type { AbilityKind } from "$lib/rpg/domain/abilities/types";
import type { ItemKind, Slot } from "$lib/rpg/domain/items/types";
import type { SPECIES } from "$lib/rpg/domain/species/registry";

export const en_us = {
  cards: {
    species: "Species",
    about: "About",
    attributes: "Attributes",
    skills: "Skills",
    proficiencies: "Proficiency & Expertise",
    bars: "Bars",
    movement: "Speed",
    equipment: "Equipment",
    abilities: "Abilities",
  },

  species: {
    human: "Human",
    worker_drone: "Worker Drone",
    solver_drone: "Solver Drone",
  } satisfies Record<keyof typeof SPECIES, string>,

  about: {
    [About.name]: "Name",
    [About.height]: "Height",
    [About.weight]: "Weight",
    [About.gender]: "Gender",
    [About.alignment]: "Alignment",
    [About.biography]: "Biography",
  } satisfies Record<About, string>,

  alignments: {
    [Alignment.lawful_good]: "Lawful Good",
    [Alignment.neutral_good]: "Neutral Good",
    [Alignment.chaotic_good]: "Chaotic Good",
    [Alignment.lawful_neutral]: "Lawful Neutral",
    [Alignment.true_neutral]: "True Neutral",
    [Alignment.chaotic_neutral]: "Chaotic Neutral",
    [Alignment.lawful_evil]: "Lawful Evil",
    [Alignment.neutral_evil]: "Neutral Evil",
    [Alignment.chaotic_evil]: "Chaotic Evil",
  } satisfies Record<Alignment, string>,

  attributes: {
    [Attributes.vitality]: "Vitality",
    [Attributes.agility]: "Agility",
    [Attributes.strength]: "Strength",
    [Attributes.dexterity]: "Dexterity",
    [Attributes.charisma]: "Charisma",
    [Attributes.perception]: "Perception",
    [Attributes.intelligence]: "Intelligence",
  } satisfies Record<Attributes, string>,

  bars: {
    [Bars.health]: "HP",
    [Bars.blood]: "Blood",
    [Bars.oil]: "Oil",
    [Bars.solver]: "Absolute Solver",
    [Bars.sanity]: "Sanity",
  } satisfies Record<Bars, string>,

  skills: {
    [Skills.vigor]: "Vigor",
    [Skills.athletics]: "Athletics",
    [Skills.stealth]: "Stealth",
    [Skills.finesse]: "Finesse",
    [Skills.firearms]: "Firearms",
    [Skills.persuasion]: "Persuasion",
    [Skills.intimidation]: "Intimidation",
    [Skills.insight]: "Insight",
    [Skills.investigation]: "Investigation",
    [Skills.knowledge]: "Knowledge",
    [Skills.technology]: "Technology",
    [Skills.wit]: "Wit",
    [Skills.melee]: "Melee",
    [Skills.explosives]: "Explosives",
    [Skills.medicine]: "Medicine",
    [Skills.mechanics]: "Mechanics",
    [Skills.willpower]: "Willpower",
    [Skills.flying]: "Flying",
    [Skills.absolute_solver]: "Absolute Solver",
  } satisfies Record<Skills, string>,

  modifiers: {
    single: {
      [SkillModifiers.average]: "Average",
      [SkillModifiers.proficient]: "Proficient",
      [SkillModifiers.expert]: "Expert",
    } satisfies Record<SkillModifiers, string>,
    plural: {
      [SkillModifiers.average]: "Averages",
      [SkillModifiers.proficient]: "Proficiencies",
      [SkillModifiers.expert]: "Expertises",
    } satisfies Record<SkillModifiers, string>,
    codes: {
      [SkillModifiers.average]: " ",
      [SkillModifiers.proficient]: "P",
      [SkillModifiers.expert]: "E",
    } satisfies Record<SkillModifiers, string>,
  },

  movement: {
    [Movement.walking]: "Walk",
    [Movement.running]: "Run",
    [Movement.flying]: "Flying",
    [Movement.swimming]: "Swim",
    [Movement.crawling]: "Crawl",
    [Movement.jump_height]: "Jump Height",
  } satisfies Record<Movement, string>,

  slots: {
    left_hand: "Left Hand",
    right_hand: "Right Hand",
    left_shoulder: "Left Shoulder",
    right_shoulder: "Right Shoulder",
    front: "Front",
    back: "Back",
  } satisfies Record<Slot, string>,

  itemKinds: {
    plain: "Item",
    melee: "Melee",
    ranged: "Ranged",
    throwable: "Throwable",
    healing: "Healing",
    liquid: "Liquid",
    container: "Container",
  } satisfies Record<ItemKind | "container", string>,

  abilityKinds: {
    weapon: "Weapon",
    attribute_modifier: "Attribute Modifier",
    skill_modifier: "Skill Modifier",
    text: "Description Only",
  } satisfies Record<AbilityKind, string>,

  worksOn: {
    humans: "Humans",
    drones: "Drones",
    both: "Both",
  },

  fields: {
    name: "Name",
    kind: "Kind",
    amount: "Amount",
    attribute: "Attribute",
    skill: "Skill",
    total_points: "Total Points",
    weight: "Weight",
    carry: "Carry",
    weight_per_unit: "Weight / Unit",
    damage: "Damage",
    info: "Info",
    two_handed: "Two-Handed",
    hit: "Hit",
    range: "Range",
    rate: "Rate",
    magazine: "Magazine",
    reload: "Reload",
    heal: "Heal",
    works_on: "Works On",
    revive: "Revive",
    requirements: "Requirements",
    capacity: "Capacity",
    current: "Current",
    container: "Container",
  },

  units: {
    turn: "Turn",
    turns: "Turns",
  },

  ui: {
    add: "Add",
    add_custom: "Add Custom",
    add_prefab: "Add Prefab",
    cancel: "Cancel",
    close: "Close",
    delete: "DEL",
    transfer: "Transfer",
    equipped: "Equipped",
    yes: "Yes",
    nothing_available: "Nothing left to add.",
  },
};
