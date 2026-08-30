import { Skills } from "$lib/rpg_new/config";

export type Slot = "left_hand" | "right_hand" | "left_shoulder" | "right_shoulder" | "front" | "back";

export const SLOTS: Slot[] = ["left_hand", "right_hand", "left_shoulder", "right_shoulder", "front", "back"];

type Details =
  | { kind: "plain" }
  | { kind: "melee"; damage: string; twoHanded: boolean; info: string | null }
  | {
      kind: "ranged";
      hit: Skills;
      damage: string;
      range: number;
      rate: number;
      magazine: number;
      reloadTurns: number;
      info: string | null;
    }
  | { kind: "throwable"; damage: string; range: string; info: string | null }
  | {
      kind: "healing";
      heal: string;
      worksOn: "humans" | "drones" | "both";
      revive: string | null;
      requirements: string | null;
    }
  | { kind: "liquid"; capacity: number; weightPerUnit: number; current: number };

export type ItemTemplate = { name: string; weight: number } & Details;
export type Item = ItemTemplate & { id: string };
export type ItemKind = Item["kind"];

export type ContainerTemplate = { name: string; carry: number };
export type Container = ContainerTemplate & { id: string; items: Item[] };

/** Kinds a player can build by hand. Healing items are catalogue-only. */
export type CustomKind = Exclude<ItemKind, "healing">;

/** What a freshly picked kind looks like in the custom-item form. Adding a kind fails here first. */
export const BLANK_ITEMS: Record<CustomKind, ItemTemplate> = {
  plain: { kind: "plain", name: "", weight: 1 },
  melee: { kind: "melee", name: "", weight: 1, damage: "", twoHanded: false, info: "" },
  ranged: {
    kind: "ranged",
    name: "",
    weight: 1,
    hit: Skills.firearms,
    damage: "",
    range: 10,
    rate: 1,
    magazine: 1,
    reloadTurns: 1,
    info: "",
  },
  throwable: { kind: "throwable", name: "", weight: 1, damage: "", range: "", info: "" },
  liquid: { kind: "liquid", name: "", weight: 1, capacity: 1, weightPerUnit: 1, current: 0 },
};

export const ITEM_KINDS = Object.keys(BLANK_ITEMS) as CustomKind[];

export function createItem(template: ItemTemplate): Item {
  return { ...template, id: crypto.randomUUID() };
}

export function createContainer(template: ContainerTemplate): Container {
  return { ...template, id: crypto.randomUUID(), items: [] };
}

/** A liquid's contents count toward its weight; every other kind is a fixed figure. */
export function itemWeight(item: Item) {
  const contents = item.kind === "liquid" ? item.current * item.weightPerUnit : 0;
  return round(item.weight + contents);
}

export function containerWeight(container: Container) {
  return round(container.items.reduce((total, item) => total + itemWeight(item), 0));
}

function round(value: number) {
  return parseFloat(value.toFixed(2));
}
