import { type Item } from "./items.svelte";

export class Enemy {
  maxHp: number;
  description?: string;
  guaranteedWeapons: Item[];
  possibleWeapons: Item[];
  attributes: [string, number][];
  passive: [string, number][];

  constructor(
    maxHp: number,
    guaranteedWeapons: Item[],
    possibleWeapons: Item[],
    attributes: { [key: string]: number },
    passive: { [key: string]: number },
    description?: string,
  ) {
    this.maxHp = maxHp;
    this.guaranteedWeapons = guaranteedWeapons;
    this.possibleWeapons = possibleWeapons;
    this.attributes = Object.entries(attributes);
    this.passive = Object.entries(passive);
    this.description = description;
  }
}
