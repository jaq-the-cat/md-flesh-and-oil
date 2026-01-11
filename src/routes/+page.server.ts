import { DataManager } from '$lib/data/server/data.manager';
import { Character } from '$lib/game/character.svelte';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
  const manager = DataManager.get();

	return { human: manager.species.getDefinitions.get('human') };
};