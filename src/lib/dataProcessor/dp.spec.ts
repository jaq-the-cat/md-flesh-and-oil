import { test } from 'vitest'
import { DataManager, ObjectLink } from './manager/data.manager';
import { Character } from '$lib/game/character.svelte';

test('species', () => {
    const manager = DataManager.get();
    const char = new Character(manager.species.getDefinitions.get('human')!)
    char.evalMathString(char.bars.hp[1] as string);
    // console.log(DataManager.linkToValue(char, 'bars.hp'));
})