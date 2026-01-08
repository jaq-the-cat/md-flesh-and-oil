import { Species, Character } from "../character.svelte"
import { AvianDrone } from "./avianDrone.svelte"
import { DisassemblyDrone } from "./disassemblyDrone.svelte"
import { Human } from "./human.svelte"
import { SolverDrone } from "./solverDrone.svelte"
import { WorkerDrone } from "./workerDrone.svelte"

export function initializeFromSpecies(species: Species): Character | undefined {
  switch (species) {
    case Species.Avian:
      return new AvianDrone()
    case Species.Disassembly:
      return new DisassemblyDrone()
    case Species.Human:
      return new Human()
    case Species.Solver:
      return new SolverDrone()
    case Species.Worker:
      return new WorkerDrone()
  }
}
export function initializeFromCharacterAndSpecies(character: Character, species: Species) {
  let base = initializeFromSpecies(species);
  if (!base) return
  return Character.trans(base, character);
}