<script lang="ts">
  import { SPECIES } from "$lib/rpg/domain/species/registry";
  import { Species } from "$lib/rpg/infra/species/species.svelte";
  import About from "./cards/About.svelte";
  import Status from "./cards/Status.svelte";
  import Equipment from "./cards/Equipment.svelte";
  import Abilities from "./cards/Abilities.svelte";
  import Skills from "./cards/Skills.svelte";
  import Attributes from "./cards/Attributes.svelte";

  type SpeciesId = keyof typeof SPECIES;

  let { species = $bindable() }: { species: Species } = $props();

  let selected = $derived(
    Object.entries(SPECIES).find(([, kind]) => species instanceof kind)![0] as SpeciesId,
  );

  const speciesIds = Object.keys(SPECIES) as SpeciesId[];

  function change(id: SpeciesId) {
    species = Species.from(new SPECIES[id](), species);
  }
</script>

<main id="sheet">
  <About {species} speciesId={selected} {speciesIds} onSpeciesChange={change} />
  <Attributes {species} />
  <Status {species} />
  <Abilities speciesId={selected} />
  <Skills {species} />
  <Equipment />
</main>

<style lang="scss">
  main {
    max-width: 1600px;
    margin-inline: auto;

    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "about      attributes skills"
      "about      status     skills"
      "equipment  equipment  abilities";
  }

  @media (max-width: 1300px) {
    main {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "about     attributes"
        "about     status"
        "equipment abilities"
        "skills    skills";
    }
  }

  @media (max-width: 930px) {
    main {
      grid-template-columns: auto;
      grid-template-areas:
        "about"
        "attributes"
        "status"
        "skills"
        "abilities"
        "equipment";
    }
  }
</style>
