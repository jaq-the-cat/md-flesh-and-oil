<script lang="ts">
  import { CONTAINER_PREFABS, ITEM_CATEGORIES, ITEMS, type ItemId } from "$lib/rpg/domain/items/prefabs";
  import type { ContainerTemplate } from "$lib/rpg/domain/items/types";
  import { itemText } from "../sheet/items";
  import { localization } from "$i18n";
  import ItemDetails from "../sheet/cards/dialogs/ItemDetails.svelte";
  import RulebookSnippet from "../sheet/cards/dialogs/RulebookSnippet.svelte";

  const CONTAINERS = "Containers";
  const categories = [CONTAINERS, ...Object.keys(ITEM_CATEGORIES)];

  let category = $state(CONTAINERS);
  let items = $derived<(ContainerTemplate | ItemId)[]>(
    category === CONTAINERS ? CONTAINER_PREFABS : ITEM_CATEGORIES[category],
  );

  let inspecting = $state<ContainerTemplate | ItemId | null>(null);

  const nameOf = (item: ContainerTemplate | ItemId) =>
    typeof item === "string" ? itemText(ITEMS[item]).name : item.name;

  // For a container the figure is what it holds, for an item what it weighs.
  const kilos = (item: ContainerTemplate | ItemId) =>
    typeof item === "string" ? ITEMS[item].weight : item.carry;
</script>

<section id="items">
  <h1>{localization().cards.equipment}</h1>

  <div class="categories">
    {#each categories as name}
      <button class:selected={name === category} onclick={() => (category = name)}>{name}</button>
    {/each}
  </div>

  <div class="list">
    {#each items as item}
      <button class="item" onclick={() => (inspecting = item)}>
        <span>{nameOf(item)}</span>
        <span>{kilos(item)}kg</span>
      </button>
    {/each}
  </div>
</section>

<RulebookSnippet
  bind:open={
    () => inspecting !== null,
    (open) => {
      if (!open) inspecting = null;
    }
  }
>
  {#if inspecting}
    <h2 class="title">{nameOf(inspecting)}</h2>
    {#if typeof inspecting === "string"}
      <ItemDetails template={ITEMS[inspecting]} />
    {:else}
      <dl>
        <dt>{localization().fields.carry}</dt>
        <dd>{inspecting.carry}kg</dd>
      </dl>
    {/if}
  {/if}
</RulebookSnippet>

<style lang="scss">
  #items {
    grid-area: items;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  h1 {
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
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-height: 25lh;
    overflow-y: auto;
  }

  .categories button,
  .item {
    padding: 5px 10px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    text-align: start;
  }

  .title {
    margin: 0;
    font-size: 2rem;
    text-align: center;
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
