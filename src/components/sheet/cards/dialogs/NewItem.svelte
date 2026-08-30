<script lang="ts">
  import { Skills } from "$lib/rpg_new/config";
  import { enumValues } from "$lib/rpg_new/helpers";
  import {
    BLANK_ITEMS,
    ITEM_KINDS,
    type ContainerTemplate,
    type CustomKind,
    type ItemTemplate,
  } from "$lib/rpg_new/domain/items/types";
  import { label } from "../../labels";

  let {
    open = $bindable(),
    onCreate,
  }: {
    open: boolean;
    onCreate: (template: ItemTemplate | ContainerTemplate) => void;
  } = $props();

  const CONTAINER = "container";
  const kinds = [...ITEM_KINDS, CONTAINER];

  let kind = $state<CustomKind | typeof CONTAINER>("plain");
  let draft = $state<ItemTemplate>({ ...BLANK_ITEMS.plain });
  let carry = $state(10);

  const hitSkills = enumValues<Skills>(Skills);

  /** Swapping kinds keeps what the player already typed that the new kind also has. */
  function changeKind(next: CustomKind | typeof CONTAINER) {
    kind = next;
    // A container has no item fields, so park the draft on `plain` and no kind block renders.
    const blank = BLANK_ITEMS[next === CONTAINER ? "plain" : next];
    draft = { ...blank, name: draft.name, weight: draft.weight };
  }

  function create() {
    if (draft.name === "") return;
    onCreate(kind === CONTAINER ? { name: draft.name, carry } : { ...draft });
    draft = { ...BLANK_ITEMS[kind === CONTAINER ? "plain" : kind] };
    open = false;
  }
</script>

{#if open}
  <div class="newItem">
    <h2 class="title">{label("add_custom")}</h2>

    <label>
      {label("kind")}
      <select value={kind} onchange={(event) => changeKind(event.currentTarget.value as CustomKind)}>
        {#each kinds as option}
          <option value={option}>{label(option)}</option>
        {/each}
      </select>
    </label>

    <label>
      {label("name")}
      <input type="text" bind:value={draft.name} />
    </label>

    {#if kind === CONTAINER}
      <label>
        {label("carry")}
        <input type="number" min="0" step="0.1" bind:value={carry} />
      </label>
    {:else}
      <label>
        {label("weight")}
        <input type="number" min="0" step="0.1" bind:value={draft.weight} />
      </label>
    {/if}

    {#if draft.kind === "melee"}
      {@const melee = draft}
      <label>
        {label("damage")}
        <input type="text" bind:value={melee.damage} />
      </label>
      <label class="checkbox">
        {label("two_handed")}
        <input type="checkbox" bind:checked={melee.twoHanded} />
      </label>
      <label>
        {label("info")}
        <input type="text" bind:value={melee.info} />
      </label>
    {:else if draft.kind === "ranged"}
      {@const ranged = draft}
      <label>
        {label("hit")}
        <select bind:value={ranged.hit}>
          {#each hitSkills as skill}
            <option value={skill}>{label(Skills[skill])}</option>
          {/each}
        </select>
      </label>
      <label>
        {label("damage")}
        <input type="text" bind:value={ranged.damage} />
      </label>
      <label>
        {label("range")}
        <input type="number" min="0" bind:value={ranged.range} />
      </label>
      <label>
        {label("rate")}
        <input type="number" min="1" bind:value={ranged.rate} />
      </label>
      <label>
        {label("magazine")}
        <input type="number" min="1" bind:value={ranged.magazine} />
      </label>
      <label>
        {label("reload")}
        <input type="number" min="0" bind:value={ranged.reloadTurns} />
      </label>
      <label>
        {label("info")}
        <input type="text" bind:value={ranged.info} />
      </label>
    {:else if draft.kind === "throwable"}
      {@const throwable = draft}
      <label>
        {label("damage")}
        <input type="text" bind:value={throwable.damage} />
      </label>
      <label>
        {label("range")}
        <input type="text" bind:value={throwable.range} />
      </label>
      <label>
        {label("info")}
        <input type="text" bind:value={throwable.info} />
      </label>
    {:else if draft.kind === "liquid"}
      {@const liquid = draft}
      <label>
        {label("capacity")}
        <input type="number" min="0" step="0.1" bind:value={liquid.capacity} />
      </label>
      <label>
        {label("weight_per_unit")}
        <input type="number" min="0" step="0.1" bind:value={liquid.weightPerUnit} />
      </label>
      <label>
        {label("current")}
        <input type="number" min="0" max={liquid.capacity} step="0.1" bind:value={liquid.current} />
      </label>
    {/if}

    <button onclick={create}>{label("add")}</button>
    <button onclick={() => (open = false)}>{label("cancel")}</button>
  </div>
{/if}

<style lang="scss">
  .newItem {
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

  .title {
    margin: 0;
    font-size: 2rem;
    text-align: center;
  }

  label {
    display: grid;
    grid-template-columns: 14ch auto;
    align-items: center;
    gap: 10px;
  }

  .checkbox input {
    justify-self: start;
  }

  button {
    padding: 10px 0;
  }
</style>
