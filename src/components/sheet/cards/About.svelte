<script lang="ts">
  import { About } from "$lib/rpg_new/config";
  import type { Species } from "$lib/rpg_new/infra/species/species.svelte";
  import { localization } from "$i18n";
  import { fields } from "../fields";
  import RulebookSnippet from "./dialogs/RulebookSnippet.svelte";
  import AboutRulebook from "../../rulebook/snippets/about.svelte";

  let { species }: { species: Species } = $props();

  let rulebook = $state(false);
</script>

<div id="about">
  <RulebookSnippet title={localization().cards.about} bind:open={rulebook}>
    <AboutRulebook />
  </RulebookSnippet>
  <ul>
    {#each fields(About, species.about, localization().about) as field (field.key)}
      <li>
        <span>{field.label}</span>
        <input type="text" maxlength="49" bind:value={species.about[field.key]} />
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  #about {
    grid-area: about;
  }

  ul {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }

  li {
    display: flex;
    justify-content: space-between;
    gap: 5px;
  }
</style>
