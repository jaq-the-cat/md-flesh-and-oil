<script lang="ts">
  import { Attributes, Skills } from "$lib/rpg_new/config";
  import type { Ability, AbilityTemplate } from "$lib/rpg_new/domain/abilities/types";
  import { label } from "../../labels";

  let { ability }: { ability: Ability | AbilityTemplate } = $props();

  const signed = (amount: number) => (amount >= 0 ? `+${amount}` : `${amount}`);
</script>

<dl>
  {#if ability.kind === "weapon"}
    <dt>{label("hit")}</dt>
    <dd>{label(Skills[ability.hit])}</dd>
    <dt>{label("damage")}</dt>
    <dd>{ability.damage}</dd>
    <dt>{label("range")}</dt>
    <dd>{ability.range}m</dd>
  {:else if ability.kind === "attribute_modifier"}
    <dt>{label(Attributes[ability.attribute])}</dt>
    <dd>{signed(ability.amount)}</dd>
  {:else if ability.kind === "skill_modifier"}
    <dt>{label(Skills[ability.skill])}</dt>
    <dd>{signed(ability.amount)}</dd>
  {/if}
  {#if ability.info}
    <dt>{label("info")}</dt>
    <dd class="info">{ability.info}</dd>
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
</style>
