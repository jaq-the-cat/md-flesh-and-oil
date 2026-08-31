import { About, Attributes, Bars, Movement, Skills, type SkillModifiers } from "$lib/rpg/domain/config";
import type { Ability } from "$lib/rpg/infra/abilities";
import type { Container, CustomTemplate, Item, Slot } from "$lib/rpg/infra/items";
import { SPECIES, speciesIdOf, type SpeciesId } from "$lib/rpg/domain/species/registry";
import { clamp } from "$lib/rpg/helpers";
import type { NumberField } from "$lib/rpg/infra/types.svelte";
import type { Species } from "$lib/rpg/infra/species.svelte";

/** Written alongside a sheet, but not part of the sheet itself. */
export type SheetMeta = {
  author: string;
  updatedAt: number;
};

/** One Firestore document per sheet. Items and abilities are already plain data. */
export type SheetDocument = Partial<SheetMeta> & {
  species: SpeciesId;
  about: Record<About, string>;
  attributes: Partial<Record<Attributes, number>>;
  skills: Partial<Record<Skills, SkillModifiers>>;
  bars: Partial<Record<Bars, number>>;
  movement: Partial<Record<Movement, number>>;
  containers: Container[];
  equipped: Record<Slot, string | null>;
  innate: Ability[];
  custom: Ability[];
};

/**
 * Key-order-independent JSON, so a document read back from Firestore compares equal to the
 * one we sent. Used to recognise our own writes echoing back.
 */
/** A sheet as it comes back from a collection query, which carries its document id. */
export type StoredSheet = SheetDocument & { id: string };

export function stableJson(value: unknown): string {
  return JSON.stringify(value, (_, item) =>
    item && typeof item === "object" && !Array.isArray(item)
      ? Object.fromEntries(Object.entries(item).sort(([a], [b]) => a.localeCompare(b)))
      : item,
  );
}

/**
 * The sheet without its metadata, so a document read back compares equal to the one we sent
 * even though `updatedAt` changes on every write.
 */
export function sheetJson(document: SheetDocument): string {
  const { author, updatedAt, ...sheet } = document;
  return stableJson(sheet);
}

export function toDocument(species: Species): SheetDocument {
  return {
    species: speciesIdOf(species),
    about: { ...species.about },
    attributes: valuesOf(species.attributes),
    skills: { ...species.skills },
    bars: valuesOf(species.bars),
    movement: valuesOf(species.movement),
    containers: species.containers,
    equipped: { ...species.equipped },
    innate: species.innate,
    custom: species.custom,
  };
}

export function fromDocument(document: SheetDocument): Species {
  // An unknown species id would otherwise throw; fall back rather than lose the sheet.
  const kind = SPECIES[document.species] ?? SPECIES.human;
  const species = new kind();

  for (const about of Object.values(About)) {
    species.about[about] = document.about?.[about] ?? species.about[about];
  }
  for (const attribute of Object.values(Attributes)) {
    applyField(species, species.attributes[attribute], document.attributes?.[attribute]);
  }
  for (const skill of Object.values(Skills)) {
    const modifier = document.skills?.[skill];
    if (modifier != null && species.skills[skill] != null) species.skills[skill] = modifier;
  }
  // Bars and movement last: their maximums derive from the attributes and skills above.
  for (const bar of Object.values(Bars)) {
    applyField(species, species.bars[bar], document.bars?.[bar]);
  }
  for (const movement of Object.values(Movement)) {
    applyField(species, species.movement[movement], document.movement?.[movement]);
  }

  if (document.containers) species.containers = document.containers.map(adoptContainer);
  if (document.equipped) species.equipped = { ...species.equipped, ...document.equipped };
  if (document.innate) species.innate = document.innate;
  species.custom = document.custom ?? [];
  return species;
}

function valuesOf<K extends string>(fields: Partial<Record<K, NumberField<Species>>>) {
  return Object.fromEntries(
    Object.entries(fields).map(([key, field]) => [key, (field as NumberField<Species>).getValue()]),
  ) as Partial<Record<K, number>>;
}

function applyField(species: Species, field?: NumberField<Species>, value?: number) {
  if (field == null || value == null) return;
  field.setValue(species, clamp(value, field.min, field.getMaxValue(species)));
}

/**
 * Sheets saved before items became catalogue references stored the whole template inline.
 * Those still load: the old shape simply becomes a custom item.
 */
function adoptContainer(container: Container): Container {
  return { ...container, items: container.items.map(adoptItem) };
}

function adoptItem(item: Item): Item {
  if (item.template !== undefined) return item;
  const { id, current, ...legacy } = item as Item & Record<string, unknown>;
  return { id, template: legacy as unknown as CustomTemplate, ...(current === undefined ? {} : { current }) };
}
