<script lang="ts">
  import type { AbilityEntry } from "$lib/rpg/infra/abilities";
  import { localization } from "$i18n";
  import { abilityName, weaponOf, writtenOf } from "../../abilities";
  import AbilityDetails from "./AbilityDetails.svelte";
  import ItemDetails from "./ItemDetails.svelte";

  let {
    open = $bindable(),
    available,
    onAdd,
  }: {
    open: boolean;
    available: AbilityEntry[];
    onAdd: (entry: AbilityEntry) => void;
  } = $props();

  let previewing = $state<AbilityEntry | null>(null);
</script>

{#if open}
  <div class="picker">
    <h2 class="title">{localization().ui.add_prefab}</h2>

    <div class="list">
      {#each available as prefab}
        <button class="prefab" onclick={() => (previewing = prefab)}>{abilityName(prefab)}</button>
        <button class="quickAdd" onclick={() => onAdd(prefab)}>+</button>
      {:else}
        <p class="empty">{localization().ui.nothing_available}</p>
      {/each}
    </div>

    <button onclick={() => (open = false)}>{localization().ui.close}</button>
  </div>
{/if}

{#if previewing}
  <div class="preview">
    <h2 class="title">{abilityName(previewing)}</h2>
    {#if weaponOf(previewing)}
      <ItemDetails template={weaponOf(previewing)!} />
    {:else}
      <AbilityDetails ability={writtenOf(previewing)!} />
    {/if}
    <button onclick={() => onAdd(previewing!)}>{localization().ui.add}</button>
    <button onclick={() => (previewing = null)}>{localization().ui.close}</button>
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

  .list {
    display: grid;
    grid-template-columns: auto min-content;
    gap: 10px;
    overflow-y: auto;
  }

  .empty {
    grid-column: 1 / 3;
    margin: 0;
    text-align: center;
    opacity: 0.8;
  }

  button {
    padding: 10px 0;
  }

  .prefab {
    padding: 5px 10px;
    text-align: start;
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
</style>
