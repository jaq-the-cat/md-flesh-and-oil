<script lang="ts">
  import { ABILITY_PREFABS } from "$lib/rpg_new/domain/abilities/prefabs";
  import { createAbility, type Ability, type AbilityTemplate } from "$lib/rpg_new/domain/abilities/types";
  import type { SPECIES } from "$lib/rpg_new/domain/species/registry";
  import { label } from "../labels";
  import InspectAbility from "./dialogs/InspectAbility.svelte";
  import NewAbility from "./dialogs/NewAbility.svelte";

  let { speciesId }: { speciesId: keyof typeof SPECIES } = $props();

  // Two lists rather than one, so a species change can replace the innate half and leave the rest alone.
  let innate = $state<Ability[]>(ABILITY_PREFABS[speciesId].map(createAbility));
  let custom = $state<Ability[]>([]);
  let abilities = $derived([...innate, ...custom]);

  $effect(() => {
    innate = ABILITY_PREFABS[speciesId].map(createAbility);
  });

  let available = $derived(
    ABILITY_PREFABS[speciesId].filter((prefab) => !innate.some((ability) => ability.name === prefab.name)),
  );
  let prefabIndex = $state(0);

  let inspecting = $state<Ability | null>(null);
  let creating = $state(false);

  function addPrefab() {
    const prefab = available[prefabIndex];
    if (prefab) innate.push(createAbility(prefab));
    prefabIndex = 0;
  }

  function addCustom(template: AbilityTemplate) {
    custom.push(createAbility(template));
  }

  function remove(ability: Ability) {
    innate = innate.filter((other) => other.id !== ability.id);
    custom = custom.filter((other) => other.id !== ability.id);
    if (inspecting?.id === ability.id) inspecting = null;
  }
</script>

<div id="innate">
  <h2 class="cardTitle">{label("innate")}</h2>

  <button onclick={() => (creating = true)}>{label("add_custom")}</button>

  {#if available.length > 0}
    <div class="restore">
      <select bind:value={prefabIndex}>
        {#each available as prefab, index}
          <option value={index}>{prefab.name}</option>
        {/each}
      </select>
      <button onclick={addPrefab}>{label("add")}</button>
    </div>
  {/if}

  <div class="abilities">
    {#each abilities as ability (ability.id)}
      <button class="ability" onclick={() => (inspecting = ability)}>{ability.name}</button>
      <button class="delete" onclick={() => remove(ability)}>{label("delete")}</button>
    {/each}
  </div>
</div>

<InspectAbility bind:ability={inspecting} />
<NewAbility bind:open={creating} onCreate={addCustom} />

<style lang="scss">
  #innate {
    grid-area: innate;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .restore {
    display: flex;
    gap: 5px;

    select {
      flex-grow: 1;
      min-width: 0;
    }
  }

  .abilities {
    display: grid;
    grid-template-columns: auto min-content;
    gap: 5px;
  }

  .ability {
    text-align: start;
    padding: 5px;
  }

  .delete {
    padding: 5px 15px;
  }
</style>
