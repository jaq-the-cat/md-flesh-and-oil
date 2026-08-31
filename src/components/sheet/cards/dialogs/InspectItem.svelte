<script lang="ts">
  import { templateOf } from "$lib/rpg/domain/items/prefabs";
  import type { Container, Item } from "$lib/rpg/infra/items";
  import { itemText } from "../../items";
  import { localization } from "$i18n";
  import ItemDetails from "./ItemDetails.svelte";

  let {
    item = $bindable(),
    containers,
    moveItem,
  }: {
    item: Item | null;
    containers: Container[];
    moveItem: (item: Item, target: Container) => void;
  } = $props();

  let targetIndex = $state(0);
  let template = $derived(item ? templateOf(item) : undefined);
</script>

{#if item}
  <div class="inspect">
    {#if template}
      <h2 class="title">{itemText(template).name}</h2>
      <ItemDetails {template} bind:current={item.current} editable />
    {/if}

    <h2>{localization().ui.transfer}</h2>
    <select bind:value={targetIndex}>
      {#each containers as container, index}
        <option value={index}>{container.name}</option>
      {/each}
    </select>
    <button onclick={() => moveItem(item!, containers[targetIndex])}>{localization().ui.transfer}</button>
    <button onclick={() => (item = null)}>{localization().ui.close}</button>
  </div>
{/if}

<style lang="scss">
  .inspect {
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

  h2 {
    margin: 0;
  }

  .title {
    font-size: 2rem;
    text-align: center;
  }

  button {
    padding: 10px 0;
  }
</style>
