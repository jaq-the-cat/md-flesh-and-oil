<script lang="ts">
  import { Attributes, Skills } from "$lib/rpg/config";
  import type { Ability, AbilityTemplate } from "$lib/rpg/domain/abilities/types";
  import { innateWeapon } from "$lib/rpg/domain/items/prefabs";
  import { localization } from "$i18n";
  import ItemDetails from "./ItemDetails.svelte";

  let { ability }: { ability: Ability | AbilityTemplate } = $props();

  const signed = (amount: number) => (amount >= 0 ? `+${amount}` : `${amount}`);
</script>

{#if ability.kind === "innate_weapon"}
  {@const weapon = innateWeapon(ability.name)}
  {#if weapon}
    <ItemDetails item={weapon} />
  {:else}
    <p class="missing">{localization().ui.nothing_available}</p>
  {/if}
{/if}

<dl>
  {#if ability.kind === "weapon"}
    <dt>{localization().fields.hit}</dt>
    <dd>{localization().skills[ability.hit]}</dd>
    <dt>{localization().fields.damage}</dt>
    <dd>{ability.damage}</dd>
    <dt>{localization().fields.range}</dt>
    <dd>{ability.range}m</dd>
  {:else if ability.kind === "attribute_modifier"}
    <dt>{localization().attributes[ability.attribute]}</dt>
    <dd>{signed(ability.amount)}</dd>
  {:else if ability.kind === "skill_modifier"}
    <dt>{localization().skills[ability.skill]}</dt>
    <dd>{signed(ability.amount)}</dd>
  {/if}
  {#if ability.info}
    <dt>{localization().fields.info}</dt>
    <dd class="info">{ability.info}</dd>
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

  .missing {
    margin: 0;
    opacity: 0.8;
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
</style>
