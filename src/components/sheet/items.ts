import { localization } from "$i18n";
import type { ItemId } from "$lib/rpg/domain/items/prefabs";
import type { CustomTemplate, Damage, ItemTemplate, ItemText } from "$lib/rpg/infra/items";

/** A catalogue item reads its prose from the localization file; a custom one carries its own. */
export function itemText(template: ItemTemplate | CustomTemplate): ItemText {
  if ("id" in template) return localization().items[template.id as ItemId];
  return { name: template.name, info: template.info ?? undefined };
}

/** Renders "1d20 + Melee Slash" from its parts, so only the words are ever translated. */
export function damageText(damage: Damage): string {
  const parts: string[] = [];
  if (damage.dice) parts.push(`${damage.dice.count}d${damage.dice.sides}`);
  if (damage.bonus) parts.push(localization().skills[damage.bonus]);
  if (damage.flat) parts.push(String(damage.flat));

  const type = localization().damageTypes[damage.type];
  return parts.length > 0 ? `${parts.join(" + ")} ${type}` : type;
}
