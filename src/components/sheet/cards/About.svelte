<script lang="ts">
  import { About, Alignment } from "$lib/rpg/config";
  import type { Species } from "$lib/rpg/infra/species/species.svelte";
  import { localization } from "$i18n";
  import { fields } from "../fields";
  import RulebookSnippet from "./dialogs/RulebookSnippet.svelte";
  import AboutRulebook from "../../rulebook/snippets/about.svelte";

  let { species }: { species: Species } = $props();

  // `about` holds strings, so an alignment is stored as its enum member name.
  const alignments = Object.values(Alignment);

  let rulebook = $state(false);
</script>

<div id="about">
  <RulebookSnippet title={localization().cards.about} bind:open={rulebook}>
    <AboutRulebook />
  </RulebookSnippet>
  <ul>
    {#each fields(About, species.about, localization().about) as field (field.key)}
      <li class:stacked={field.key === About.biography}>
        <span>{field.label}</span>
        {#if field.key === About.alignment}
          <select bind:value={species.about[field.key]}>
            {#each alignments as alignment}
              <option value={alignment}>{localization().alignments[alignment]}</option>
            {/each}
          </select>
        {:else if field.key === About.biography}
          <textarea bind:value={species.about[field.key]}></textarea>
        {:else}
          <input type="text" maxlength="49" bind:value={species.about[field.key]} />
        {/if}
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
    align-items: center;
    gap: 5px;
  }

  .stacked {
    flex-direction: column;
    align-items: stretch;
  }

  textarea {
    height: 6lh;
  }
</style>
