<script lang="ts">
  import { Bars } from "$lib/rpg_new/config";
  import type { Species } from "$lib/rpg_new/infra/species/species.svelte";
  import NumberInput from "../NumberInput.svelte";
  import { localization } from "$i18n";
  import { fields } from "../fields";

  let { species }: { species: Species } = $props();
</script>

<div id="bars">
  <h2 class="cardTitle">{localization().cards.bars}</h2>
  <ul>
    {#each fields(Bars, species.bars, localization().bars) as field (field.key)}
      <li>
        <span>{field.label}</span>
        <NumberInput {species} field={field.value} />
        <span>/ {Math.floor(field.value.getMaxValue(species))}</span>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  #bars {
    grid-area: bars;
  }

  ul {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  li > :first-child {
    flex-grow: 1;
  }
</style>
