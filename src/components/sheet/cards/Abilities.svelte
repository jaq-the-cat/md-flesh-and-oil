<script lang="ts">
  import { ABILITY_PREFABS } from "$lib/rpg/domain/abilities/prefabs";
  import { createAbility, type Ability, type AbilityTemplate } from "$lib/rpg/domain/abilities/types";
  import type { SPECIES } from "$lib/rpg/domain/species/registry";
  import { localization } from "$i18n";
  import InspectAbility from "./dialogs/InspectAbility.svelte";
  import NewAbility from "./dialogs/NewAbility.svelte";
  import PrefabAbility from "./dialogs/PrefabAbility.svelte";

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
  let inspecting = $state<Ability | null>(null);
  let creating = $state(false);
  let picking = $state(false);

  function addPrefab(template: AbilityTemplate) {
    innate.push(createAbility(template));
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
    gap: 5px;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }

  .abilityList {
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
