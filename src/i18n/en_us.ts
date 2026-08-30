import { About, Attributes, Bars, Movement, SkillModifiers, Skills } from "$lib/rpg_new/config";
import type { AbilityKind } from "$lib/rpg_new/domain/abilities/types";
import type { ItemKind, Slot } from "$lib/rpg_new/domain/items/types";
import type { SPECIES } from "$lib/rpg_new/domain/species/registry";

/**
 * The reference locale. Every group keyed by an enum is checked for completeness, so
 * adding a skill, bar or slot fails to compile until it has a label here.
 * Other locales are typed `Localization`, which holds them to this same shape.
 */
export const en_us = {
  cards: {
    species: "Species",
    about: "About",
    attributes: "Attributes",
    skills: "Skills",
    proficiencies: "Proficiencies",
    bars: "Bars",
    movement: "Speed",
    equipment: "Equipment",
    innate: "Innate",
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
  } satisfies Record<About, string>,

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
    [SkillModifiers.average]: "Average",
    [SkillModifiers.proficient]: "Proficient",
    [SkillModifiers.expert]: "Expert",
  } satisfies Record<SkillModifiers, string>,

  /** The one-character codes shown in the skill selects. */
  modifierCodes: {
    [SkillModifiers.average]: " ",
    [SkillModifiers.proficient]: "P",
    [SkillModifiers.expert]: "E",
  } satisfies Record<SkillModifiers, string>,

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
