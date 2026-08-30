<script lang="ts">
  import { localization } from "$i18n";
  import type { StoredSheet } from "$lib/persistence";
  import type { SPECIES } from "$lib/rpg/domain/species/registry";
  import { collectionStore } from "sveltefire";

  let { sheets }: { sheets: ReturnType<typeof collectionStore<StoredSheet>> } = $props();

  const speciesName = (id: keyof typeof SPECIES) => localization().species[id] ?? id;
</script>

<section class="sheets">
  <h1>{localization().dm.sheets}</h1>
  <ul>
    {#each $sheets as sheet (sheet.id)}
      <a class="buttonStyle" href="/sheet/{sheet.id}">
        <span>{sheet.about?.name || localization().dm.unnamed}</span>
        <span>[{speciesName(sheet.species)}]</span>
      </a>
    {/each}
  </ul>
</section>

<style lang="scss">
  .sheets {
    grid-area: sheets;

    ul {
      height: 25lh;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: start;
      overflow-y: auto;
      row-gap: 10px;
    }

    h1 {
      text-align: center;
    }

    a {
      text-align: center;
      font-size: 1.5rem;
      text-decoration: none;
      padding: 5px 0;
    }
  }
</style>
