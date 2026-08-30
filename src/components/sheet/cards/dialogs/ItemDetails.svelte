<script lang="ts">
  import { Skills } from "$lib/rpg_new/config";
  import { itemWeight, type Item, type ItemTemplate } from "$lib/rpg_new/domain/items/types";
  import { label } from "../../labels";

  // Templates render read-only; a real item in the sheet can have its liquid level adjusted.
  let { item, editable = false }: { item: Item | ItemTemplate; editable?: boolean } = $props();
</script>

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
      <dd class="info">{item.info}</dd>
    {/if}
  {:else if item.kind === "ranged"}
    <dt>{label("hit")}</dt>
    <dd>{label(Skills[item.hit])}</dd>
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
      <dd class="info">{item.info}</dd>
    {/if}
  {:else if item.kind === "throwable"}
    <dt>{label("damage")}</dt>
    <dd>{item.damage}</dd>
    <dt>{label("range")}</dt>
    <dd>{item.range}</dd>
    {#if item.info}
      <dt>{label("info")}</dt>
      <dd class="info">{item.info}</dd>
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
    <dd class="level">
      {#if editable}
        <input type="number" min="0" max={liquid.capacity} step="0.1" bind:value={liquid.current} />
      {:else}
        {liquid.current}
      {/if}
      / {liquid.capacity}
    </dd>
  {/if}
</dl>

<style lang="scss">
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

  .info {
    white-space: pre-wrap;
  }

  .level {
    display: flex;
    align-items: center;
    gap: 5px;

    input {
      width: 8ch;
    }
  }
</style>
