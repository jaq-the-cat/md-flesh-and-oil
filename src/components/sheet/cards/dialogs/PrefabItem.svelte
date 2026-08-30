<script lang="ts">
  import { CONTAINER_PREFABS, ITEM_PREFABS } from "$lib/rpg_new/domain/items/prefabs";
  import type { ContainerTemplate, ItemTemplate } from "$lib/rpg_new/domain/items/types";
  import { label } from "../../labels";
  import ItemDetails from "./ItemDetails.svelte";

  let {
    open = $bindable(),
    onAdd,
  }: {
    open: boolean;
    onAdd: (template: ContainerTemplate | ItemTemplate) => void;
  } = $props();

  const CONTAINERS = "Containers";
  const categories = [CONTAINERS, ...Object.keys(ITEM_PREFABS)];
  let category = $state(CONTAINERS);
  let prefabs = $derived<(ContainerTemplate | ItemTemplate)[]>(
    category === CONTAINERS ? CONTAINER_PREFABS : ITEM_PREFABS[category],
  );

  let previewing = $state<ContainerTemplate | ItemTemplate | null>(null);

  // For a container the figure is what it holds, for an item what it weighs.
  const kilos = (prefab: ContainerTemplate | ItemTemplate) => ("carry" in prefab ? prefab.carry : prefab.weight);
</script>

{#if open}
  <div class="picker">
    <h2 class="title">{label("add_prefab")}</h2>

    <div class="categories">
      {#each categories as name}
        <button class:selected={name === category} onclick={() => (category = name)}>{name}</button>
      {/each}
    </div>

    <div class="list">
      {#each prefabs as prefab}
        <button class="prefab" onclick={() => (previewing = prefab)}>
          <span>{prefab.name}</span>
          <span>{kilos(prefab)}kg</span>
        </button>
        <button class="quickAdd" onclick={() => onAdd(prefab)}>+</button>
      {/each}
    </div>

    <button onclick={() => (open = false)}>{label("close")}</button>
  </div>
{/if}

{#if previewing}
  <div class="preview">
    <h2 class="title">{previewing.name}</h2>
    {#if "carry" in previewing}
      <dl>
        <dt>{label("carry")}</dt>
        <dd>{previewing.carry}kg</dd>
      </dl>
    {:else}
      <ItemDetails item={previewing} />
    {/if}
    <button onclick={() => onAdd(previewing!)}>{label("add")}</button>
    <button onclick={() => (previewing = null)}>{label("close")}</button>
  </div>
{/if}

<style lang="scss">
  .picker {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: min(90vw, 60ch);
    max-height: 90vh;
    background-color: #070c01;

    padding: 30px;
    border: 1px solid #9fe644;
    box-shadow: 2px 2px 4px 0 #9fe644;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  .title {
    margin: 0;
    font-size: 2rem;
    text-align: center;
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;

    .selected {
      background-color: #142105;
    }
  }

  .list {
    display: grid;
    grid-template-columns: auto min-content;
    gap: 5px;
    overflow-y: auto;
  }

  .prefab {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    text-align: start;
  }

  button {
    padding: 10px 0;
  }

  .categories button,
  .prefab {
    padding: 5px 10px;
  }

  .quickAdd {
    padding: 5px 15px;
  }

  .preview {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: 50ch;
    max-width: min(40%, 40ch);
    max-height: 90vh;
    overflow-y: auto;
    background-color: #070c01;

    padding: 30px;
    border: 1px solid #9fe644;
    box-shadow: 2px 2px 4px 0 #9fe644;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  dl {
    display: grid;
    grid-template-columns: max-content auto;
    margin: 0;
    gap: 5px 15px;
  }

  dt {
    font-size: 0.9em;
    opacity: 0.8;
  }

  dd {
    margin: 0;
  }
</style>
