<script lang="ts">
  import { Movement } from "$lib/rpg_new/config";
  import type { Species } from "$lib/rpg_new/infra/species/species.svelte";
  import NumberInput from "../NumberInput.svelte";
  import { localization } from "$i18n";
  import { fields } from "../fields";

  let { species }: { species: Species } = $props();
</script>

<div id="movement">
  <h2 class="cardTitle">{localization().cards.movement}</h2>
  <ul>
    {#each fields(Movement, species.movement, localization().movement) as field (field.key)}
      <li>
        <span>{field.label}</span>
        <NumberInput {species} field={field.value} />
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  #movement {
    grid-area: movement;
  }

  ul {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
  }
</style>
