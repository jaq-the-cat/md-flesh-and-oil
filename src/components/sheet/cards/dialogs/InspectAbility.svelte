<script lang="ts">
  import { Attributes, Skills } from "$lib/rpg_new/config";
  import type { Ability } from "$lib/rpg_new/domain/abilities/types";
  import { label } from "../../labels";

  let { ability = $bindable() }: { ability: Ability | null } = $props();

  const signed = (amount: number) => (amount >= 0 ? `+${amount}` : `${amount}`);
</script>

{#if ability}
  <div class="inspect">
    <h2 class="title">{ability.name}</h2>
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
    <button onclick={() => (ability = null)}>{label("close")}</button>
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

  .title {
    margin: 0;
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

  .info {
    white-space: pre-wrap;
  }

  button {
    padding: 10px 0;
  }
</style>
