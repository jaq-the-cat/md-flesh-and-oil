<script lang="ts">
  import type { Component } from "svelte";
  import { localization, type Localization } from "$i18n";
  import RulebookSnippet from "./dialogs/RulebookSnippet.svelte";

  import Actions from "../../rulebook/snippets/combat/actions.svelte";
  import Critical from "../../rulebook/snippets/combat/critical.svelte";
  import GeneralCombat from "../../rulebook/snippets/combat/generalCombat.svelte";
  import Reactions from "../../rulebook/snippets/combat/reactions.svelte";
  import Weapons from "../../rulebook/snippets/combat/weapons.svelte";

  import Advantage from "../../rulebook/snippets/general/advantage.svelte";
  import Checks from "../../rulebook/snippets/general/checks.svelte";
  import DamageTypes from "../../rulebook/snippets/general/damageTypes.svelte";
  import Death from "../../rulebook/snippets/general/death/death.svelte";
  import FallDamage from "../../rulebook/snippets/general/fallDamage.svelte";
  import OutOfCombat from "../../rulebook/snippets/general/outOfCombat.svelte";
  import Stealth from "../../rulebook/snippets/general/stealth.svelte";
  import Stun from "../../rulebook/snippets/general/stun.svelte";

  type Rule = { key: keyof Localization["rules"]; view: Component };

  const COMBAT: Rule[] = [
    { key: "general_combat", view: GeneralCombat },
    { key: "actions", view: Actions },
    { key: "reactions", view: Reactions },
    { key: "weapons", view: Weapons },
    { key: "critical", view: Critical },
  ];

  const GENERAL: Rule[] = [
    { key: "checks", view: Checks },
    { key: "advantage", view: Advantage },
    { key: "stealth", view: Stealth },
    { key: "death", view: Death },
    { key: "stun", view: Stun },
    { key: "fall_damage", view: FallDamage },
    { key: "damage_types", view: DamageTypes },
    { key: "out_of_combat", view: OutOfCombat },
  ];

  // One dialog for all of them: the open rule is the state, rather than a flag per button.
  let active = $state<Rule | null>(null);
</script>

<div id="rules">
  <h2 class="cardTitle">{localization().cards.rules}</h2>

  <div class="group">
    {#each COMBAT as rule (rule.key)}
      <button onclick={() => (active = rule)}>{localization().rules[rule.key]}</button>
    {/each}
  </div>

  <hr />

  <div class="group">
    {#each GENERAL as rule (rule.key)}
      <button onclick={() => (active = rule)}>{localization().rules[rule.key]}</button>
    {/each}
  </div>
</div>

<RulebookSnippet
  bind:open={
    () => active !== null,
    (open) => {
      if (!open) active = null;
    }
  }
>
  {#if active}
    {@const View = active.view}
    <View />
  {/if}
</RulebookSnippet>

<style lang="scss">
  #rules {
    grid-area: rules;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16ch, 1fr));
    gap: 5px;
  }

  button {
    padding: 5px 10px;
  }

  hr {
    width: 100%;
    margin: 5px 0;
    border: 0;
    border-top: 1px solid #9fe64459;
  }
</style>
