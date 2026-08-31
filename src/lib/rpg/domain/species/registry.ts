import type { Species } from "$lib/rpg/infra/species/species.svelte";
import { Human } from "./human";
import { SolverDrone } from "./solver_drone";
import { WorkerDrone } from "./worker_drone";

export const SPECIES = {
  human: Human,
  worker_drone: WorkerDrone,
  solver_drone: SolverDrone,
};

export type SpeciesId = keyof typeof SPECIES;

export function speciesIdOf(species: Species): SpeciesId {
  return (Object.keys(SPECIES) as SpeciesId[]).find((id) => species instanceof SPECIES[id])!;
}
