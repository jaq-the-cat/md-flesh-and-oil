<script lang="ts">
  import { itemWeight, type Container, type Item } from "$lib/rpg_new/domain/items/types";
  import { label } from "../../labels";

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
</script>

{#if item}
  <div class="inspect">
    <h2 class="title">{item.name}</h2>
    <dl>
      <dt>{label("weight")}</dt>
      <dd>{itemWeight(item)}kg</dd>

      {#if item.kind === "melee"}
        <dt>{label("damage")}</dt>
        <dd>{item.damage}</dd>
        {#if item.twoHanded}
          <dt>{label("two_handed")}</dt>
          <dd>{label("yes")}</dd>
        {/if}
        {#if item.info}
          <dt>{label("info")}</dt>
          <dd>{item.info}</dd>
        {/if}
      {:else if item.kind === "ranged"}
        <dt>{label("hit")}</dt>
        <dd>{item.hit}</dd>
        <dt>{label("damage")}</dt>
        <dd>{item.damage}</dd>
        <dt>{label("range")}</dt>
        <dd>{item.range}m</dd>
        <dt>{label("rate")}</dt>
        <dd>{item.rate}</dd>
        <dt>{label("magazine")}</dt>
        <dd>{item.magazine}</dd>
        <dt>{label("reload")}</dt>
        <dd>{item.reloadTurns} {label(item.reloadTurns === 1 ? "turn" : "turns")}</dd>
        {#if item.info}
          <dt>{label("info")}</dt>
          <dd>{item.info}</dd>
        {/if}
      {:else if item.kind === "throwable"}
        <dt>{label("damage")}</dt>
        <dd>{item.damage}</dd>
        <dt>{label("range")}</dt>
        <dd>{item.range}</dd>
        {#if item.info}
          <dt>{label("info")}</dt>
          <dd>{item.info}</dd>
        {/if}
      {:else if item.kind === "healing"}
        <dt>{label("heal")}</dt>
        <dd>{item.heal}</dd>
        <dt>{label("works_on")}</dt>
        <dd>{label(item.worksOn)}</dd>
        {#if item.revive}
          <dt>{label("revive")}</dt>
          <dd>{item.revive}</dd>
        {/if}
        {#if item.requirements}
          <dt>{label("requirements")}</dt>
          <dd>{item.requirements}</dd>
        {/if}
      {:else if item.kind === "liquid"}
        {@const liquid = item}
        <dt>{label("current")}</dt>
        <dd class="editable">
          <input type="number" min="0" max={liquid.capacity} step="0.1" bind:value={liquid.current} />
          / {liquid.capacity}
        </dd>
      {/if}
    </dl>

    <h2>{label("transfer")}</h2>
    <select bind:value={targetIndex}>
      {#each containers as container, index}
        <option value={index}>{container.name}</option>
      {/each}
    </select>
    <button onclick={() => moveItem(item!, containers[targetIndex])}>{label("transfer")}</button>
    <button onclick={() => (item = null)}>{label("close")}</button>
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

  dl {
    display: grid;
    grid-template-columns: max-content auto;
    align-items: baseline;
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

  .editable {
    display: flex;
    align-items: center;
    gap: 5px;

    input {
      width: 8ch;
    }
  }

  button {
    padding: 10px 0;
  }
</style>
