import { DataManager } from '$lib/data/server/data.manager';
import { error, json, type RequestHandler } from '@sveltejs/kit';

// INPUT:
// type = 'list' | 'species'
// if type == 'species':
//    name = <name: string>
export const GET: RequestHandler = (event) => {
  const params = new URL(event.url).searchParams;
  const type = params.get('type');
  if (!type)
    return error(400, 'missing `type` argument')

  const manager = DataManager.get();
  if (type === 'list') {
    return json({ definitions: Object.fromEntries(manager.species.getDefinitions.entries()) })
  }

  if (type === 'species') {
    const name = params.get('name')!;
    if (!name) return error(400, 'missing `name` argument');
    const definition = manager.species.getDefinitions.get(name);
    if (!definition) return error(404, `species "${name}" does not exist`)
    return json({ definition })
  }

  return error(500);
}