import { ITEM_PREFABS } from "$lib/rpg/domain/items/prefabs";
import type { ItemTemplate } from "$lib/rpg/domain/items/types";

/** Names a weapon in the item catalogue, so an enemy shares one definition with everything else. */
export type EnemyWeapon = { category: string; name: string };

/** Stat and passive labels are free text: many are resistances rather than skills. */
export type EnemyStat = { label: string; value: number };

export type EnemyTemplate = {
  name: string;
  maxHp: number;
  description: string | null;
  guaranteed: EnemyWeapon[];
  possible: EnemyWeapon[];
  stats: EnemyStat[];
  passive: EnemyStat[];
};

export function enemyWeapon(reference: EnemyWeapon): ItemTemplate | undefined {
  return ITEM_PREFABS[reference.category]?.find((item) => item.name === reference.name);
}
