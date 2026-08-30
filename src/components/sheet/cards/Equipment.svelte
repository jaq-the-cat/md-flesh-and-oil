<script lang="ts">
  import type { Species } from "$lib/rpg/infra/species/species.svelte";
  import {
    containerWeight,
    createContainer,
    createItem,
    itemWeight,
    SLOTS,
    type Container,
    type ContainerTemplate,
    type Item,
    type ItemTemplate,
    type Slot,
  } from "$lib/rpg/domain/items/types";
  import { localization } from "$i18n";
  import InspectItem from "./dialogs/InspectItem.svelte";
  import NewItem from "./dialogs/NewItem.svelte";
  import PrefabItem from "./dialogs/PrefabItem.svelte";

  let { species }: { species: Species } = $props();

  let containers = $derived(species.containers);
  let equipped = $derived(species.equipped);
  let selectedIndex = $state(0);
  let selected = $derived(containers[selectedIndex]);

  /** Anything that can go in a slot, so it can never fall out of sync with the containers. */
  let equippable = $derived(containers.flatMap((container) => [container, ...container.items]).slice(1));

  let inspecting = $state<Item | null>(null);

  let creating = $state(false);
  let picking = $state(false);

  function addContainer(template: ContainerTemplate) {
    containers.push(createContainer(template));
    selectedIndex = containers.length - 1;
  }

  function add(template: ContainerTemplate | ItemTemplate) {
    if ("carry" in template) addContainer(template);
    else selected.items.push(createItem(template));
  }

  function removeSelectedContainer() {
    if (selectedIndex === 0) return; // the first container is what you carry on your person
    const [removed] = containers.splice(selectedIndex, 1);
    unequip([removed.id, ...removed.items.map((item) => item.id)]);
    selectedIndex -= 1;
  }

  function removeItem(item: Item) {
    selected.items = selected.items.filter((other) => other.id !== item.id);
    unequip([item.id]);
    if (inspecting?.id === item.id) inspecting = null;
  }

  function moveItem(item: Item, target: Container) {
    selected.items = selected.items.filter((other) => other.id !== item.id);
    target.items.push(item);
    inspecting = null;
  }

  function unequip(ids: string[]) {
    for (const slot of SLOTS) {
      const id = equipped[slot];
      if (id !== null && ids.includes(id)) equipped[slot] = null;
    }
  }
</script>

<div id="equipment">
  <h2 class="cardTitle">{localization().cards.equipment}</h2>

  <div class="actions">
    <button onclick={() => (creating = true)}>{localization().ui.add_custom}</button>
    <button onclick={() => (picking = true)}>{localization().ui.add_prefab}</button>
  </div>

  <h2>{localization().fields.container}</h2>
  <div class="containers">
    <select bind:value={selectedIndex}>
      {#each containers as container, index}
        <option value={index}>
          {container.name} [{containerWeight(container)}/{container.carry ?? Math.floor(species.carryWeight)}kg]
        </option>
      {/each}
    </select>
    <button class="delete" onclick={removeSelectedContainer}>{localization().ui.delete}</button>
  </div>

  <div class="items">
    {#each selected.items as item (item.id)}
      <button class="item" onclick={() => (inspecting = item)}>
        <span>{item.name}</span>
        <span>{itemWeight(item)}kg</span>
      </button>
      <button class="delete" onclick={() => removeItem(item)}>{localization().ui.delete}</button>
    {/each}
  </div>

  <h2>{localization().ui.equipped}</h2>
  <div class="equipped">
    {#each SLOTS as slot}
      <span>{localization().slots[slot]}</span>
      <select bind:value={equipped[slot]}>
        <option value={null}></option>
        {#each equippable as entry (entry.id)}
          <option value={entry.id}>{entry.name}</option>
        {/each}
      </select>
    {/each}
  </div>
</div>

<InspectItem bind:item={inspecting} {containers} {moveItem} />
<NewItem bind:open={creating} onCreate={add} />
<PrefabItem bind:open={picking} onAdd={add} />

<style lang="scss">
  #equipment {
    grid-area: equipment;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  h2 {
    margin: 0;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .containers {
    display: flex;
    gap: 10px;

    select {
      flex-grow: 1;
    }
  }

  .items {
    display: grid;
    grid-template-columns: auto min-content;
    align-content: start;
    gap: 10px;
    flex-grow: 1;
    min-height: 6lh;
    overflow-y: auto;
  }

  .item {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 5px;
  }

  .delete {
    padding: 5px 15px;
  }

  .equipped {
    display: grid;
    grid-template-columns: max-content auto;
    align-items: center;
    gap: 10px;
  }
</style>
