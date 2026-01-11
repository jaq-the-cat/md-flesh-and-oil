import { db, objectToOrdered, orderedToObject, orderedToSvelte, svelteToOrdered, type OrderedMap } from "$lib/db";
import { SvelteMap } from "svelte/reactivity";
import { Container, pockets } from "./items.svelte";
import { doc, setDoc, type Firestore } from "firebase/firestore";
import { ItemDisplayList } from "./itemDisplayList.svelte";
import type { About, Attribute, Bars, Proficiencies, Speed, Stats } from "./attributes.svelte";

export enum Species {
  Human = "Human",
  Avian = "Avian Drone",
  Disassembly = "Disassembly Drone",
  Solver = "Solver Drone",
  Worker = "Worker Drone",
}

export abstract class Character {
  firestore?: Firestore
  id: string | undefined = $state(undefined);

  async upload(field: string, value: string | number | SvelteMap<string, any> | Attribute | Container[] | null) {
    if (!this.id || !db.firestore) return;
    let data
    if (value == null || typeof value !== 'object') {
      data = { [field]: value }
    } else if (Array.isArray(value)) {
      data = { [field]: Container.serializeList(value) }
    } else if (value instanceof SvelteMap) {
      data = { [field]: svelteToOrdered(value) }
    } else {
      data = { [field]: objectToOrdered(value) }
    }
    setDoc(doc(db.firestore, "sheets", this.id), data, { merge: true });
  }

  async uploadMultiple(data: { [field: string]: string | number | boolean | SvelteMap<string, any> | object | any[] | null }) {
    if (!this.id || !db.firestore) return;
    for (const key in data) {
      const el = data[key]
      if (el && typeof el === 'object') {
        if (Array.isArray(el))
          data[key] = Container.serializeList(el)
        else if (el instanceof SvelteMap)
          data[key] = svelteToOrdered(el)
        else
          data[key] = objectToOrdered(el)
      }
    }
    setDoc(doc(db.firestore, "sheets", this.id), data, { merge: true });
  }

  checkItemWasRemoved(itemId: string) {
    if (!this.id || !db.firestore) return;

    let data: { [key: string]: null } = {}
    if (this.left === itemId) {
      data.left = null;
    }
    if (this.leftShoulder === itemId) {
      data.leftShoulder = null;
    }
    if (this.right === itemId) {
      data.right = null;
    }
    if (this.rightShoulder === itemId) {
      data.rightShoulder = null;
    }
    if (this.front === itemId) {
      data.front = null;
    }
    if (this.back === itemId) {
      data.back = null;
    }
    return data;
  }

  overrides: { [key: string]: number | string | null } = {
    maxHp: null,
  }

  currentHp = $state(0);

  species = $state(Species.Worker);

  about: About = $state({
    "Name": "",
    "Height": "",
    "Weight": "",
    "Gender": "",
    "Alignment": "",
  });

  biography: string = $state("");
  appearance: string = $state("");
  fna: string = $state("");

  modifiers: string[] = []

  stats: Stats = $state({
    "Vitality": 6,
    "Agility": 6,
    "Strength": 6,
    "Dexterity": 6,
    "Charisma": 6,
    "Perception": 6,
    "Intelligence": 6,
  })

  proficiencies: Proficiencies = $state({
    // VIT
    // AGL
    "Acrobatics": " ",
    "Stealth": " ",
    "Flying": " ",
    // STR
    "Athletics": " ",
    "Climb": " ",
    "Grapple": " ",
    // DEX
    "Craft": " ",
    "Firearms": " ",
    // STR+DEX
    "Melee": " ",
    // CHA
    "Disguise": " ",
    "Persuasion": " ",
    "Intimidation": " ",
    // PER
    "Animal Handling": " ",
    "Investigation": " ",
    // INT
    "Knowledge": " ",
    "Technology": " ",
    "Religion": " ",
    "Nature": " ",

    // INT+DEX,
    "Explosives": " ",
    "Medicine": " ",
    "Mechanics": " ",

    // STR+CHA+INT
    "Willpower": " "
  })

  abstract bars: Bars
  abstract speed: Speed

  twoHanding = $state(false);

  containers: Container[] = $state([
    pockets(this)
  ]);

  itemList: ItemDisplayList = $state(new ItemDisplayList(this.containers))

  left: string | null = $state(null);
  leftShoulder: string | null = $state(null);
  right: string | null = $state(null);
  rightShoulder: string | null = $state(null);
  front: string | null = $state(null);
  back: string | null = $state(null);

  maxWeight = $state(this.getMaxWeight());

  get weight() {
    const value = this.containers.reduce((totalWeight, value) => totalWeight + (value.weight ?? 0), 0);
    return parseFloat(value.toFixed(2));
  }

  getMaxWeight() {
    const value = this.containers.reduce((totalCapacity, value) => totalCapacity + (value.carry ?? 0), 0);
    return parseFloat(value.toFixed(2));
  }

  refresh() {
    this.maxWeight = this.getMaxWeight();
  }

  serializeExtra(): { [key: string]: any } {
    return {}
  }

  abstract getMaxHp(): number
  abstract getBaseMaxWeight(): number

  static trans(target: Character, source: Character) {
    for (let k in target.proficiencies) {
      if (k in source.proficiencies)
        target.proficiencies[k] = source.proficiencies[k]
    }
    for (let k in target.bars) {
      if (k in source.bars)
        target.bars[k] = source.bars[k]
    }
    target.stats = source.stats
    target.about = source.about
    target.biography = source.biography
    target.appearance = source.appearance
    target.fna = source.fna

    target.twoHanding = source.twoHanding
    target.containers = source.containers
    target.itemList = source.itemList

    target.left = source.left
    target.leftShoulder = source.leftShoulder
    target.right = source.right
    target.rightShoulder = source.rightShoulder
    target.front = source.front
    target.back = source.back

    return target;
  };

  serialize() {
    return {
      overrides: this.overrides,
      currentHp: this.currentHp,

      species: this.species,
      biography: this.biography,
      appearance: this.appearance,
      fna: this.fna,

      about: objectToOrdered(this.about),
      stats: objectToOrdered(this.stats),
      proficiencies: objectToOrdered(this.proficiencies),
      bars: objectToOrdered(this.bars),
      speed: objectToOrdered(this.speed),

      left: this.left,
      leftShoulder: this.leftShoulder,
      right: this.right,
      rightShoulder: this.rightShoulder,
      back: this.back,
      front: this.front,

      twoHanding: this.twoHanding,
      containers: Container.serializeList(this.containers),

      ...this.serializeExtra()
    }
  }

  deserializeExtra(doc: any) { };

  static deserialize(doc: any, char: Character) {
    if (doc == null) return doc;

    if (doc.id) char.id = doc.id;

    char.overrides = {
      maxHp: doc.overrides?.maxHp ?? null
    };
    char.currentHp = doc.currentHp ?? 0;

    char.species = doc.species ?? Species.Worker;
    char.biography = doc.biography ?? "";
    char.appearance = doc.appearance ?? "";
    char.fna = doc.fna ?? "";
    char.about = orderedToObject(doc.about ?? []);
    char.stats = {
      ...char.stats,
      ...orderedToObject(doc.stats ?? [])
    };
    char.proficiencies = {
      ...char.proficiencies,
      ...orderedToObject(doc.proficiencies ?? {}) as any
    };
    char.bars = orderedToObject(doc.bars ?? []);
    char.speed = orderedToObject(doc.speed ?? []);
    char.containers = Container.deserializeList(doc.containers);

    char.twoHanding = doc.twoHanding ?? false;
    char.maxWeight = char.getMaxWeight()
    char.itemList.refresh(char.containers)

    char.left = doc.left ?? null;
    char.right = doc.right ?? null;

    char.leftShoulder = doc.leftShoulder ?? null;
    char.rightShoulder = doc.rightShoulder ?? null;
    char.front = doc.front ?? null;
    char.back = doc.back ?? null;

    char.deserializeExtra(doc)

    return char;
  }
}

export function getProfModifier(value?: string) {
  if (value === 'P') return 2;
  else if (value === 'E') return 3;
  return 0;
}

export function formatPlusMinus(v: number) {
  if (v >= 0) return `+${v}`;
  if (v < 0) return v;
}

export function getSkillModifier(skill: keyof Proficiencies, character: Character): number {
  switch (skill) {
    // VIT
    // AGL
    case "Acrobatics":
    case "Stealth":
    case "Flying":
      return character.stats.Agility-4 + getProfModifier(character.proficiencies[skill]);
    // STR
    case "Athletics":
    case "Climb":
    case "Grapple":
      return character.stats.Strength-4 + getProfModifier(character.proficiencies[skill]);
    // DEX
    case "Craft":
    case "Firearms":
      return character.stats.Dexterity-4 + getProfModifier(character.proficiencies[skill]);
    // STR+DEX
    case "Melee":
      return Math.max(
        character.stats.Strength,
        character.stats.Dexterity,
      )-4  + getProfModifier(character.proficiencies[skill]);
    // CHA
    case "Disguise":
    case "Persuasion":
    case "Intimidation":
      return character.stats.Charisma-4 + getProfModifier(character.proficiencies[skill]);
    // PER
    case "Animal Handling":
    case "Investigation":
      return character.stats.Perception-4 + getProfModifier(character.proficiencies[skill]);
    // INT
    case "Knowledge":
    case "Technology":
    case "Religion":
    case "Nature":
      return character.stats.Intelligence-4 + getProfModifier(character.proficiencies[skill]);

    // INT+DEX,
    case "Explosives":
    case "Medicine":
    case "Mechanics":
      return Math.max(
        character.stats.Intelligence,
        character.stats.Dexterity,
      )-4  + getProfModifier(character.proficiencies[skill]);

    // STR+CHA+INT
    case "Willpower":
      return Math.max(
        character.stats.Strength,
        character.stats.Charisma,
        character.stats.Intelligence,
      )-4  + getProfModifier(character.proficiencies[skill]);
  }
  return 0;
}

export function getProfStat(skill: keyof Proficiencies) {
  switch (skill) {
    // VIT
    // AGL
    case "Acrobatics":
    case "Stealth":
    case "Flying":
        return `AGL`;
    // STR
    case "Athletics":
    case "Climb":
    case "Grapple":
        return `STR`;
    // DEX
    case "Craft":
    case "Firearms":
        return `DEX`;
    // STR+DEX
    case "Melee":
        return `STR+DEX`;
    // CHA
    case "Disguise":
    case "Persuasion":
    case "Intimidation":
        return `CHA`;
    // PER
    case "Animal Handling":
    case "Investigation":
        return `PER`;
    // INT
    case "Knowledge":
    case "Technology":
    case "Religion":
    case "Nature":
        return `INT`;

    // INT+DEX,
    case "Explosives":
    case "Medicine":
    case "Mechanics":
        return `INT+DEX`;

    // STR+CHA+INT
    case "Willpower":
        return `STR+CHA+INT`;
  }
}