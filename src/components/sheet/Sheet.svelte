<script lang="ts">
  import { SPECIES } from "$lib/rpg_new/domain/species/registry";
  import { Species } from "$lib/rpg_new/infra/species/species.svelte";
  import { label } from "./labels";
  import About from "./cards/About.svelte";
  import Bars from "./cards/Bars.svelte";
  import Equipment from "./cards/Equipment.svelte";
  import Innate from "./cards/Innate.svelte";
  import Movement from "./cards/Movement.svelte";
  import Skills from "./cards/Skills.svelte";
  import Attributes from "./cards/Attributes.svelte";
  import RulebookSnippet from "./cards/dialogs/RulebookSnippet.svelte";
  import SpeciesRulebook from "../rulebook/snippets/species/species.svelte";

  let { species = $bindable() }: { species: Species } = $props();

  let selected = $derived(
    Object.entries(SPECIES).find(([, kind]) => species instanceof kind)![0] as keyof typeof SPECIES,
  );

  function change(id: string) {
    const Chosen = SPECIES[id as keyof typeof SPECIES];
    species = Species.from(new Chosen(), species);
  }

  let rulebook = $state(false);
</script>

<main id="sheet">
  <div id="species">
    <RulebookSnippet title={label("species")} bind:open={rulebook}>
      <SpeciesRulebook />
    </RulebookSnippet>
    <select value={selected} onchange={(event) => change(event.currentTarget.value)}>
      {#each Object.keys(SPECIES) as id}
        <option value={id}>{label(id)}</option>
      {/each}
    </select>
  </div>
  <About {species} />
  <Attributes {species} />
  <Skills {species} />
  <Bars {species} />
  <Movement {species} />
  <Innate speciesId={selected} />
  <Equipment />
</main>

<style lang="scss">
  #species {
    grid-area: species;

    select {
      width: 100%;
    }
  }

  main {
    grid-template-columns: 1fr 1fr 2fr 2fr;
    grid-template-areas:
      "species species   movement  bars     "
      "about   about     attributes     skills   "
      "innate  equipment equipment equipment";
  }

  @media (max-width: 1720px) {
    main {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-areas:
        "species   bars      movement"
        "species   innate    movement"
        "about     attributes     skills  "
        "about     attributes     skills  "
        "equipment equipment equipment";
    }
  }

  @media (max-width: 1300px) {
    main {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: min-content max-content auto;
      grid-template-areas:
        "species   attributes"
        "about     attributes"
        "about     attributes"
        "about     skills"
        "about     skills"
        "bars      movement"
        "innate    movement"
        "equipment equipment";
    }
  }

  @media (max-width: 930px) {
    main {
      grid-template-columns: auto;
      grid-template-rows: auto;
      grid-template-areas:
        "species"
        "about"
        "movement"
        "attributes"
        "skills"
        "bars"
        "innate"
        "equipment";
    }
  }
</style>
