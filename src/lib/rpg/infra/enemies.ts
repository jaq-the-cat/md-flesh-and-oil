import { ITEMS, type ItemId } from "$lib/rpg/domain/items/prefabs";
import type { ItemTemplate } from "$lib/rpg/infra/items";

/** Stat and passive labels are free text: many are resistances rather than skills. */
export type EnemyStat = { label: string; value: number };

export type EnemyTemplate = {
  name: string;
  maxHp: number;
  description: string | null;
  guaranteed: ItemId[];
  possible: ItemId[];
  stats: EnemyStat[];
  passive: EnemyStat[];
};

export function enemyWeapon(id: ItemId): ItemTemplate | undefined {
  return ITEMS[id];
}
