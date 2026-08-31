<script lang="ts">
  import { SPECIES } from "$lib/rpg/domain/species/registry";
  import { Species } from "$lib/rpg/infra/species.svelte";
  import About from "./cards/About.svelte";
  import SpeciesCard from "./cards/Species.svelte";
  import Equipment from "./cards/Equipment.svelte";
  import Abilities from "./cards/Abilities.svelte";
  import Skills from "./cards/Skills.svelte";
  import Attributes from "./cards/Attributes.svelte";
  import Rules from "./cards/Rules.svelte";

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
  <About {species} />
  <Attributes {species} />
  <SpeciesCard speciesId={selected} {speciesIds} onSpeciesChange={change} {species} />
  <Abilities {species} />
  <Skills {species} />
  <Rules />
  <Equipment {species} />
</main>

<style lang="scss">
  main {
    max-width: 1600px;
    margin-inline: auto;

    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "about      attributes rules"
      "species    abilities  skills"
      "equipment  equipment  skills";
  }

  @media (max-width: 1300px) {
    main {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "about     attributes"
        "about     species"
        "equipment abilities"
        "equipment rules"
        "skills    skills";
    }
  }

  @media (max-width: 930px) {
    main {
      grid-template-columns: auto;
      grid-template-areas:
        "about"
        "attributes"
        "species"
        "skills"
        "abilities"
        "rules"
        "equipment";
    }
  }
</style>
