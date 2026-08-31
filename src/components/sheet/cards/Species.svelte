<script lang="ts">
  import { Bars, Movement } from "$lib/rpg/domain/config";
  import type { SPECIES } from "$lib/rpg/domain/species/registry";
  import type { Species } from "$lib/rpg/infra/species.svelte";
  import NumberInput from "../NumberInput.svelte";
  import { localization } from "$i18n";
  import { fields } from "../fields";
  import SpeciesRulebook from "../../rulebook/snippets/species/species.svelte";
  import RulebookSnippet from "./dialogs/RulebookSnippet.svelte";

  type SpeciesId = keyof typeof SPECIES;

  let {
    species,
    speciesId,
    speciesIds,
    onSpeciesChange,
  }: {
    species: Species;
    speciesId: SpeciesId;
    speciesIds: SpeciesId[];
    onSpeciesChange: (id: SpeciesId) => void;
  } = $props();
  let speciesRulebook = $state(false);
</script>

<div id="species">
  <RulebookSnippet title={localization().cards.species} bind:open={speciesRulebook}>
    <SpeciesRulebook />
  </RulebookSnippet>

  <div id="species-select">
    <select
      value={speciesId}
      onchange={(event) => onSpeciesChange(event.currentTarget.value as SpeciesId)}
    >
      {#each speciesIds as id}
        <option value={id}>{localization().species[id]}</option>
      {/each}
    </select>
  </div>

  <h3>{localization().cards.bars}</h3>
  <ul>
    {#each fields(Bars, species.bars, localization().bars) as field (field.key)}
      <li>
        <span class="label">{field.label}</span>
        <NumberInput {species} field={field.value} />
        <span class="max">/ {Math.floor(field.value.getMaxValue(species))}</span>
      </li>
    {/each}
  </ul>

  <h3>{localization().cards.movement}</h3>
  <ul>
    {#each fields(Movement, species.movement, localization().movement) as field (field.key)}
      <li>
        <span class="label">{field.label}</span>
        <NumberInput {species} field={field.value} />
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  #species {
    grid-area: species;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  #species-select {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    gap: 10px;
    margin-bottom: 10px;

    :first-child {
      flex-grow: 1;
      font-size: 1.4rem;
    }
  }

  h3 {
    margin: 0;
    font-size: 1.6rem;
  }

  ul {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: 0;
  }

  li {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .label {
    flex-grow: 1;
  }

  .max {
    margin-left: 1ch;
    width: 5ch;
    text-align: start;
  }
</style>
