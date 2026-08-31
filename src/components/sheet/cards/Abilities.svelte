<script lang="ts">
  import { createAbility, matches, type Ability, type AbilityEntry } from "$lib/rpg/infra/abilities";
  import type { Species } from "$lib/rpg/infra/species.svelte";
  import { localization } from "$i18n";
  import { abilityKey, abilityName } from "../abilities";
  import InspectAbility from "./dialogs/InspectAbility.svelte";
  import NewAbility from "./dialogs/NewAbility.svelte";
  import PrefabAbility from "./dialogs/PrefabAbility.svelte";

  let { species }: { species: Species } = $props();

  // The species owns both lists; swapping species replaces `innate` and keeps `custom`.
  let abilities = $derived([...species.innate, ...species.custom]);

  let available = $derived(
    species.catalogue.filter((entry) => !species.innate.some((ability) => matches(ability, entry))),
  );
  let inspecting = $state<Ability | null>(null);
  let creating = $state(false);
  let picking = $state(false);

  function addPrefab(entry: AbilityEntry) {
    species.innate.push(createAbility(entry));
  }

  function addCustom(entry: AbilityEntry) {
    species.custom.push(createAbility(entry));
  }

  function remove(ability: Ability) {
    const key = abilityKey(ability);
    species.innate = species.innate.filter((other) => abilityKey(other) !== key);
    species.custom = species.custom.filter((other) => abilityKey(other) !== key);
    if (inspecting && abilityKey(inspecting) === key) inspecting = null;
  }
</script>

<div id="abilities">
  <h2 class="cardTitle">{localization().cards.abilities}</h2>

  <div class="actions">
    <button onclick={() => (creating = true)}>{localization().ui.add_custom}</button>
    <button onclick={() => (picking = true)}>{localization().ui.add_prefab}</button>
  </div>

  <div class="abilityList">
    {#each abilities as ability (abilityKey(ability))}
      <button class="ability" onclick={() => (inspecting = ability)}>{abilityName(ability)}</button>
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
