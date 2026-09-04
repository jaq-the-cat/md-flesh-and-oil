<script lang="ts">
  import { About, Alignment, Height, Weight } from "$lib/rpg/domain/config";
  import type { Species } from "$lib/rpg/infra/species.svelte";
  import { localization } from "$i18n";
  import { fields } from "../fields";
  import RulebookSnippet from "./dialogs/RulebookSnippet.svelte";
  import AboutRulebook from "../../rulebook/snippets/about.svelte";

  let {
    species,
  }: {
    species: Species;
  } = $props();

  // `about` holds strings, so an alignment is stored as its enum member name.
  const alignments = Object.values(Alignment);
  const heights = Object.values(Height);
  const weights = Object.values(Weight);

  let aboutRulebook = $state(false);
</script>

<div id="about">
  
  <RulebookSnippet title={localization().cards.about} bind:open={aboutRulebook}>
    <AboutRulebook />
  </RulebookSnippet>

  <ul>
    {#each fields(About, species.about, localization().about) as field (field.key)}
      <li class:stacked={field.key === About.biography}>
        <span class="field-label">{field.label}</span>
        {#if field.key === About.alignment}
          <select bind:value={species.about[field.key]}>
            {#each alignments as alignment}
              <option value={alignment}>{localization().alignments[alignment]}</option>
            {/each}
          </select>
        {:else if field.key === About.height}
          <select bind:value={species.about[field.key]}>
            {#each heights as height}
              <option value={height}>{localization().heights[height]}</option>
            {/each}
          </select>
        {:else if field.key === About.weight}
          <select bind:value={species.about[field.key]}>
            {#each weights as weight}
              <option value={weight}>{localization().weights[weight]}</option>
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
    display: flex;
    flex-direction: column;
  }

  ul {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;

    * {
      font-size: 1.25rem;
    }
  }

  /* The biography takes whatever height the card is given. */
  .stacked {
    flex-grow: 1;
    flex-direction: column;
    align-items: stretch;
  }

  input, select {
    width: 16ch;
  }
  textarea {
    flex-grow: 1;
    min-height: 6lh;
    max-height: none;
  }
</style>
