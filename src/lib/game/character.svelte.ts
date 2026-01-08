import type { SpeciesDefinition } from "$lib/dataProcessor/types/definition.types";
import type { NumberValue } from "$lib/dataProcessor/types/base.types";
import { Inventory } from "./inventory.svelte";
import '$lib/extensions/object.extension';
import { ObjectLink } from "$lib/dataProcessor/manager/data.manager";
import * as math from 'mathjs';

enum SkillProficiencies {
    None = ' ',
    Proficient = 'P',
    Expert = 'E',
}

export class Character {
    static DEFAULT_BAR = 0
    static DEFAULT_STAT = 6
    static DEFAULT_SKILL = SkillProficiencies.None
    
    _definition: SpeciesDefinition
    bars: Record<string, [0, NumberValue]> = {}
    speed: Record<string, number> = {}
    inventory: Inventory;
    stats: Record<string, number> = {}
    skills: Record<string, SkillProficiencies> = {}
    
    constructor(definition: SpeciesDefinition) {
        this._definition = definition;
        this.bars = Object.map(definition.bars, ([key, val]) => [key, [0, val]]);
        this.speed = structuredClone(definition.speed);
        this.inventory = new Inventory(this._definition.inventory);
        this.stats = Object.fromEntries(definition.stats.map(stat => [stat, Character.DEFAULT_STAT]));
        this.skills = Object.map(definition.skills, ([skill, _]) => [skill, Character.DEFAULT_SKILL]);
    }

    getNumberValue(n: NumberValue) {
        if (typeof n === 'number') return n;
        const tokens = n.split(' ')
        for (let index in tokens) {
            // console.log(`[${index}] ${tokens[index]}`);
            const value = tokens[index];
            if (!value.match(/[\+\-\*\/]/) && isNaN(+value)) {
                tokens[index] = ObjectLink.linkToValue(this, value) ?? '0';
            }
        }
        const expression = tokens.join('')
        return math.evaluate(expression);
    }

    print() {
        const {_definition, ...rest} = this;
        console.dir(rest, { depth: null });
    }
}