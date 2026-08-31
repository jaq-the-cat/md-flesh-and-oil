import { DamageTypes, Skills } from "$lib/rpg/config";

export type Slot = "left_hand" | "right_hand" | "left_shoulder" | "right_shoulder" | "front" | "back";

export const SLOTS: Slot[] = ["left_hand", "right_hand", "left_shoulder", "right_shoulder", "front", "back"];

export type Dice = { count: number; sides: number };

/** Structured so the numbers stay here and only the words need translating. */
export type Damage = {
  dice?: Dice;
  flat?: number;
  bonus?: Skills;
  type: DamageTypes;
};

/** The mechanical half of an item. Its prose lives in the localization file, keyed by id. */
export type Details =
  | { kind: "plain" }
  | { kind: "melee"; damage: Damage; twoHanded: boolean }
  | {
      kind: "ranged";
      hit: Skills;
      damage: Damage;
      range: number;
      rate: number;
      magazine: number;
      reloadTurns: number;
    }
  | { kind: "innate"; hit: Skills; damage: Damage; range: number }
  | { kind: "throwable"; damage: Damage; range: string }
  | { kind: "healing"; worksOn: "humans" | "drones" | "both" }
  | { kind: "liquid"; capacity: number; weightPerUnit: number };

/** Everything about an item that is prose, and therefore translated. */
export type ItemText = {
  name: string;
  info?: string;
  heal?: string;
  revive?: string;
  requirements?: string;
};

export type ItemTemplate = { id: string; weight: number } & Details;
export type ItemKind = ItemTemplate["kind"];

/** Kinds a player can build by hand. Healing and innate weapons are catalogue-only. */
export type CustomKind = Exclude<ItemKind, "healing" | "innate">;

/** A one-off the player wrote: it carries its own prose, having no catalogue entry. */
export type CustomTemplate = { name: string; info: string | null; weight: number } & Details;

/** An item in a container: a catalogue entry by id, or a custom one. */
export type Item = {
  id: string;
  template: string | CustomTemplate;
  /** Liquid level, the only part of an item that changes while it is carried. */
  current?: number;
};

/** A null carry means the species' own carry weight, which tracks Athletics. */
export type ContainerTemplate = { name: string; carry: number | null };
export type Container = ContainerTemplate & { id: string; items: Item[] };

/** A blank of each kind a player can author. Adding a custom kind fails here first. */
export const BLANK_CUSTOM: Record<CustomKind, CustomTemplate> = {
  plain: { kind: "plain", name: "", info: null, weight: 1 },
  melee: { kind: "melee", name: "", info: null, weight: 1, damage: blankDamage(), twoHanded: false },
  ranged: {
    kind: "ranged",
    name: "",
    info: null,
    weight: 1,
    hit: Skills.firearms,
    damage: blankDamage(),
    range: 10,
    rate: 1,
    magazine: 1,
    reloadTurns: 1,
  },
  throwable: { kind: "throwable", name: "", info: null, weight: 1, damage: blankDamage(), range: "" },
  liquid: { kind: "liquid", name: "", info: null, weight: 1, capacity: 1, weightPerUnit: 1 },
};

export const ITEM_KINDS = Object.keys(BLANK_CUSTOM) as CustomKind[];

/** Fully populated so the form can bind to it; the zeroes are stripped on save. */
export function blankDamage(): Damage {
  return { dice: { count: 0, sides: 0 }, flat: 0, type: DamageTypes.strike };
}

/** Drops the parts a player left empty, so stored damage says only what it has. */
export function tidyDamage(damage: Damage): Damage {
  const tidied: Damage = { type: damage.type };
  if (damage.dice && damage.dice.count > 0 && damage.dice.sides > 0) tidied.dice = { ...damage.dice };
  if (damage.flat) tidied.flat = damage.flat;
  if (damage.bonus) tidied.bonus = damage.bonus;
  return tidied;
}

export function createItem(template: string | CustomTemplate, current?: number): Item {
  return { id: crypto.randomUUID(), template, ...(current === undefined ? {} : { current }) };
}

export function createContainer(template: ContainerTemplate): Container {
  return { ...template, id: crypto.randomUUID(), items: [] };
}

export function isCustom(template: string | CustomTemplate): template is CustomTemplate {
  return typeof template !== "string";
}

