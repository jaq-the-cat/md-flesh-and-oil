import type { Species } from "$lib/rpg/infra/species.svelte";
import { AvianDrone } from "./avian_drone";
import { DisassemblyDrone } from "./disassembly_drone";
import { Human } from "./human";
import { PredatorDrone } from "./predator_drone";
import { SolverDrone } from "./solver_drone";
import { WorkerDrone } from "./worker_drone";

export const SPECIES = {
  human: Human,
  worker_drone: WorkerDrone,
  solver_drone: SolverDrone,
  predator_drone: PredatorDrone,
  avian_drone: AvianDrone,
  disassembly_drone: DisassemblyDrone,
};

export type SpeciesId = keyof typeof SPECIES;

export function speciesIdOf(species: Species): SpeciesId {
  return (Object.keys(SPECIES) as SpeciesId[]).find((id) => species instanceof SPECIES[id])!;
}
