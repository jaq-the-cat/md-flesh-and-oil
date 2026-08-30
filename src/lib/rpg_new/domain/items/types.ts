export type Slot = "left_hand" | "right_hand" | "left_shoulder" | "right_shoulder" | "front" | "back";

export const SLOTS: Slot[] = ["left_hand", "right_hand", "left_shoulder", "right_shoulder", "front", "back"];

type Details =
  | { kind: "plain" }
  | { kind: "melee"; damage: string; twoHanded: boolean; info: string | null }
  | {
      kind: "ranged";
      hit: string;
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

export type ContainerTemplate = { name: string; carry: number };
export type Container = ContainerTemplate & { id: string; items: Item[] };

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
