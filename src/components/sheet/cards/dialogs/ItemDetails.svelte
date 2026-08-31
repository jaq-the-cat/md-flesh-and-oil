<script lang="ts">
  import { localization } from "$i18n";
  import type { CustomTemplate, ItemTemplate } from "$lib/rpg/infra/items";
  import { damageText, itemText } from "../../items";

  let {
    template,
    current = $bindable(),
    editable = false,
  }: {
    template: ItemTemplate | CustomTemplate;
    /** Only a liquid has one, and only a carried item can change it. */
    current?: number;
    editable?: boolean;
  } = $props();

  let text = $derived(itemText(template));
</script>

<dl>
  <!-- An innate weapon is part of a body, so it has no weight to report. -->
  {#if template.kind !== "innate"}
    <dt>{localization().fields.weight}</dt>
    <dd>{template.weight}kg</dd>
  {/if}

  {#if template.kind === "innate"}
    <dt>{localization().fields.hit}</dt>
    <dd>{localization().skills[template.hit]}</dd>
    <dt>{localization().fields.damage}</dt>
    <dd>{damageText(template.damage)}</dd>
    <dt>{localization().fields.range}</dt>
    <dd>{template.range}m</dd>
  {:else if template.kind === "melee"}
    <dt>{localization().fields.damage}</dt>
    <dd>{damageText(template.damage)}</dd>
    {#if template.twoHanded}
      <dt>{localization().fields.two_handed}</dt>
      <dd>{localization().ui.yes}</dd>
    {/if}
  {:else if template.kind === "ranged"}
    <dt>{localization().fields.hit}</dt>
    <dd>{localization().skills[template.hit]}</dd>
    <dt>{localization().fields.damage}</dt>
    <dd>{damageText(template.damage)}</dd>
    <dt>{localization().fields.range}</dt>
    <dd>{template.range}m</dd>
    <dt>{localization().fields.rate}</dt>
    <dd>{template.rate}</dd>
    <dt>{localization().fields.magazine}</dt>
    <dd>{template.magazine}</dd>
    <dt>{localization().fields.reload}</dt>
    <dd>{template.reloadTurns} {localization().units[template.reloadTurns === 1 ? "turn" : "turns"]}</dd>
  {:else if template.kind === "throwable"}
    <dt>{localization().fields.damage}</dt>
    <dd>{damageText(template.damage)}</dd>
    <dt>{localization().fields.range}</dt>
    <dd>{template.range}</dd>
  {:else if template.kind === "healing"}
    {#if text.heal}
      <dt>{localization().fields.heal}</dt>
      <dd>{text.heal}</dd>
    {/if}
    <dt>{localization().fields.works_on}</dt>
    <dd>{localization().worksOn[template.worksOn]}</dd>
    {#if text.revive}
      <dt>{localization().fields.revive}</dt>
      <dd>{text.revive}</dd>
    {/if}
    {#if text.requirements}
      <dt>{localization().fields.requirements}</dt>
      <dd>{text.requirements}</dd>
    {/if}
  {:else if template.kind === "liquid"}
    <dt>{localization().fields.current}</dt>
    <dd class="level">
      {#if editable}
        <input type="number" min="0" max={template.capacity} step="0.1" bind:value={current} />
      {:else}
        {current ?? template.capacity}
      {/if}
      / {template.capacity}
    </dd>
  {/if}

  {#if text.info}
    <dt>{localization().fields.info}</dt>
    <dd class="info">{text.info}</dd>
  {/if}
</dl>

<style lang="scss">
  dl {
    display: grid;
    grid-template-columns: max-content auto;
    align-items: baseline;
    margin: 0;
    gap: 10px 15px;
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
    gap: 10px;

    input {
      width: 8ch;
    }
  }
</style>
