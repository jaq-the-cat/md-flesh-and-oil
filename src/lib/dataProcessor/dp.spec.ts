import { test } from 'vitest'
import { DataManager, ObjectLink } from './manager/data.manager';
import { Character } from '$lib/game/character.svelte';

test('species', () => {
    const manager = DataManager.get();
    const char = new Character(manager.species.getDefinitions.get('human')!)
    // console.log(char)
    console.log(char.getNumberValue(char.bars.hp[1]));
})