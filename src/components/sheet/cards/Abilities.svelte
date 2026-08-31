<script lang="ts">
  import { createAbility, type Ability, type AbilityTemplate } from "$lib/rpg/domain/abilities/types";
  import type { Species } from "$lib/rpg/infra/species/species.svelte";
  import { localization } from "$i18n";
  import InspectAbility from "./dialogs/InspectAbility.svelte";
  import NewAbility from "./dialogs/NewAbility.svelte";
  import PrefabAbility from "./dialogs/PrefabAbility.svelte";

  let { species }: { species: Species } = $props();

  // The species owns both lists; swapping species replaces `innate` and keeps `custom`.
  let abilities = $derived([...species.innate, ...species.custom]);

  let available = $derived(
    species.catalogue.filter((prefab) => !species.innate.some((ability) => ability.name === prefab.name)),
  );
  let inspecting = $state<Ability | null>(null);
  let creating = $state(false);
  let picking = $state(false);

  function addPrefab(template: AbilityTemplate) {
    species.innate.push(createAbility(template));
  }

  function addCustom(template: AbilityTemplate) {
    species.custom.push(createAbility(template));
  }

  function remove(ability: Ability) {
    species.innate = species.innate.filter((other) => other.id !== ability.id);
    species.custom = species.custom.filter((other) => other.id !== ability.id);
    if (inspecting?.id === ability.id) inspecting = null;
  }
</script>

<div id="abilities">
  <h2 class="cardTitle">{localization().cards.abilities}</h2>

  <div class="actions">
    <button onclick={() => (creating = true)}>{localization().ui.add_custom}</button>
    <button onclick={() => (picking = true)}>{localization().ui.add_prefab}</button>
  </div>

  <div class="abilityList">
    {#each abilities as ability (ability.id)}
      <button class="ability" onclick={() => (inspecting = ability)}>{ability.name}</button>
      <button class="delete" onclick={() => remove(ability)}>{localization().ui.delete}</button>
    {/each}
  </div>
</div>

<InspectAbility bind:ability={inspecting} />
<NewAbility bind:open={creating} onCreate={addCustom} />
<PrefabAbility bind:open={picking} {available} onAdd={addPrefab} />

<style lang="scss">
  #abilities {
    grid-area: abilities;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .abilityList {
    display: grid;
    grid-template-columns: auto min-content;
    gap: 10px;
  }

  .ability {
    text-align: start;
    padding: 5px;
  }

  .delete {
    padding: 5px 15px;
  }
</style>
