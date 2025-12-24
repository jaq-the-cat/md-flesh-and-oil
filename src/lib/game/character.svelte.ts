import type { SpeciesDefinition } from "$lib/dataProcessor/types/definition.types";
import type { NumberValue } from "$lib/dataProcessor/types/base.types";
import type { AttributeValues } from "./bars.svelte";
import { Inventory } from "./inventory.svelte";
import '$lib/extensions/object.extension';
import { ObjectLink } from "$lib/dataProcessor/manager/data.manager";

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

    evalMathString(s: string) {
        s = '6 + stats.vitality * 2';
        let process = s.trim().replace(/ /g, '');
        const values = process.split(/[\+\-\*\/]/).map(v => {
            if (!isNaN(+v)) return +v;
            const linked = ObjectLink.linkToValue(this, v);
            if (!linked || isNaN(+linked)) return 0;
            return +linked;
        });
        const operators = process.matchAll(/[\+\-\*\/]/g).map(m => m[0]).toArray();
        for (let opIndex in operators) {
            console.log(opIndex)
        }
        // console.log(values, operators)
    }

    print() {
        const {_definition, ...rest} = this;
        console.dir(rest, { depth: null });
    }
}