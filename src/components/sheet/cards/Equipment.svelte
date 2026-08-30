<script lang="ts">
  import { CONTAINER_PREFABS, ITEM_PREFABS, POCKETS } from "$lib/rpg_new/domain/items/prefabs";
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
  } from "$lib/rpg_new/domain/items/types";
  import { label } from "../labels";
  import InspectItem from "./dialogs/InspectItem.svelte";

  // The inventory lives here until the species owns it, as planned in rpg_new/infra/PLAN.md.
  let containers = $state<Container[]>([createContainer(POCKETS)]);
  let selectedIndex = $state(0);
  let selected = $derived(containers[selectedIndex]);

  let equipped = $state<Record<Slot, string | null>>({
    left_hand: null,
    right_hand: null,
    left_shoulder: null,
    right_shoulder: null,
    front: null,
    back: null,
  });

  /** Anything that can go in a slot, so it can never fall out of sync with the containers. */
  let equippable = $derived(containers.flatMap((container) => [container, ...container.items]).slice(1));

  let inspecting = $state<Item | null>(null);

  let custom = $state({ name: "", weight: 1 });

  const CONTAINERS = "Containers";
  const categories = [CONTAINERS, ...Object.keys(ITEM_PREFABS)];
  let category = $state(CONTAINERS);
  let prefabIndex = $state(0);
  let prefabs = $derived<(ContainerTemplate | ItemTemplate)[]>(
    category === CONTAINERS ? CONTAINER_PREFABS : ITEM_PREFABS[category],
  );

  function addContainer(template: ContainerTemplate) {
    containers.push(createContainer(template));
    selectedIndex = containers.length - 1;
  }

  function addPrefab() {
    const prefab = prefabs[prefabIndex];
    if ("carry" in prefab) addContainer(prefab);
    else selected.items.push(createItem(prefab));
  }

  function addCustom(asContainer: boolean) {
    if (custom.name === "") return;
    if (asContainer) addContainer({ name: custom.name, carry: custom.weight });
    else selected.items.push(createItem({ kind: "plain", name: custom.name, weight: custom.weight }));
    custom = { name: "", weight: 1 };
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

  function prefabLabel(prefab: ContainerTemplate | ItemTemplate) {
    const kg = "carry" in prefab ? prefab.carry : prefab.weight;
    return kg ? `${prefab.name} [${kg}kg]` : prefab.name;
  }
</script>

<div id="equipment">
  <h2 class="cardTitle">{label("equipment")}</h2>

  <h2>{label("add_custom")}</h2>
  <div class="custom">
    <div class="inputs">
      <input class="name" type="text" bind:value={custom.name} />
      <input class="weight" type="number" min="0" step="0.1" bind:value={custom.weight} />
    </div>
    <button onclick={() => addCustom(false)}>{label("add_as_item")}</button>
    <button onclick={() => addCustom(true)}>{label("add_as_container")}</button>
  </div>

  <h2>{label("add_prefab")}</h2>
  <div class="prefabs">
    <select class="prefab" bind:value={prefabIndex}>
      {#each prefabs as prefab, index}
        <option value={index}>{prefabLabel(prefab)}</option>
      {/each}
    </select>
    <select bind:value={category} onchange={() => (prefabIndex = 0)}>
      {#each categories as name}
        <option value={name}>{name}</option>
      {/each}
    </select>
    <button onclick={addPrefab}>{label("add")}</button>
  </div>

  <h2>{label("container")}</h2>
  <div class="containers">
    <select bind:value={selectedIndex}>
      {#each containers as container, index}
        <option value={index}>
          {container.name} [{containerWeight(container)}/{container.carry}kg]
        </option>
      {/each}
    </select>
    <button class="delete" onclick={removeSelectedContainer}>{label("delete")}</button>
  </div>

  <div class="items">
    {#each selected.items as item (item.id)}
      <button class="item" onclick={() => (inspecting = item)}>
        <span>{item.name}</span>
        <span>{itemWeight(item)}kg</span>
      </button>
      <button class="delete" onclick={() => removeItem(item)}>{label("delete")}</button>
    {/each}
  </div>

  <h2>{label("equipped")}</h2>
  <div class="equipped">
    {#each SLOTS as slot}
      <span>{label(slot)}</span>
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

<style lang="scss">
  #equipment {
    grid-area: equipment;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  h2 {
    margin: 0;
  }

  .custom,
  .prefabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
  }

  .custom .inputs {
    grid-column: 1 / 3;
    display: flex;
    gap: 5px;

    .name {
      flex-grow: 1;
      min-width: 0;
    }

    .weight {
      width: 8ch;
    }
  }

  .prefabs .prefab {
    grid-column: 1 / 3;
  }

  .containers {
    display: flex;
    gap: 5px;

    select {
      flex-grow: 1;
    }
  }

  .items {
    display: grid;
    grid-template-columns: auto min-content;
    gap: 5px;
    max-height: 40vh;
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
    gap: 5px;
  }
</style>
