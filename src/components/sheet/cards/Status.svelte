<script lang="ts">
  import { Bars, Movement } from "$lib/rpg/config";
  import type { Species } from "$lib/rpg/infra/species/species.svelte";
  import NumberInput from "../NumberInput.svelte";
  import { localization } from "$i18n";
  import { fields } from "../fields";

  let { species }: { species: Species } = $props();
</script>

<div id="status">
  <h2 class="cardTitle">{localization().cards.status}</h2>

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
  #status {
    grid-area: status;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
