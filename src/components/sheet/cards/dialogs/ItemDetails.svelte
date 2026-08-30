<script lang="ts">
  import { Skills } from "$lib/rpg/config";
  import { itemWeight, type Item, type ItemTemplate } from "$lib/rpg/domain/items/types";
  import { localization } from "$i18n";

  // Templates render read-only; a real item in the sheet can have its liquid level adjusted.
  let { item, editable = false }: { item: Item | ItemTemplate; editable?: boolean } = $props();
</script>

<dl>
  <dt>{localization().fields.weight}</dt>
  <dd>{itemWeight(item)}kg</dd>

  {#if item.kind === "melee"}
    <dt>{localization().fields.damage}</dt>
    <dd>{item.damage}</dd>
    {#if item.twoHanded}
      <dt>{localization().fields.two_handed}</dt>
      <dd>{localization().ui.yes}</dd>
    {/if}
    {#if item.info}
      <dt>{localization().fields.info}</dt>
      <dd class="info">{item.info}</dd>
    {/if}
  {:else if item.kind === "ranged"}
    <dt>{localization().fields.hit}</dt>
    <dd>{localization().skills[item.hit]}</dd>
    <dt>{localization().fields.damage}</dt>
    <dd>{item.damage}</dd>
    <dt>{localization().fields.range}</dt>
    <dd>{item.range}m</dd>
    <dt>{localization().fields.rate}</dt>
    <dd>{item.rate}</dd>
    <dt>{localization().fields.magazine}</dt>
    <dd>{item.magazine}</dd>
    <dt>{localization().fields.reload}</dt>
    <dd>{item.reloadTurns} {localization().units[item.reloadTurns === 1 ? "turn" : "turns"]}</dd>
    {#if item.info}
      <dt>{localization().fields.info}</dt>
      <dd class="info">{item.info}</dd>
    {/if}
  {:else if item.kind === "throwable"}
    <dt>{localization().fields.damage}</dt>
    <dd>{item.damage}</dd>
    <dt>{localization().fields.range}</dt>
    <dd>{item.range}</dd>
    {#if item.info}
      <dt>{localization().fields.info}</dt>
      <dd class="info">{item.info}</dd>
    {/if}
  {:else if item.kind === "healing"}
    <dt>{localization().fields.heal}</dt>
    <dd>{item.heal}</dd>
    <dt>{localization().fields.works_on}</dt>
    <dd>{localization().worksOn[item.worksOn]}</dd>
    {#if item.revive}
      <dt>{localization().fields.revive}</dt>
      <dd>{item.revive}</dd>
    {/if}
    {#if item.requirements}
      <dt>{localization().fields.requirements}</dt>
      <dd>{item.requirements}</dd>
    {/if}
  {:else if item.kind === "liquid"}
    {@const liquid = item}
    <dt>{localization().fields.current}</dt>
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
