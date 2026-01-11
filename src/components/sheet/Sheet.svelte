<script lang="ts">
  import type { Character } from "$lib/game/character.svelte";

  let { character = $bindable() as Character } = $props();
</script>

<main id="sheet">
  {#each Object.entries(character).slice(1) as entry}
    <article id={entry[0]} style="grid-area: {entry[0]}">
      <h2>{entry[0].toUpperCase()}</h2>
      <ul>
        {#each Object.entries(entry[1]) as v}
          <li>{v[0]}</li>
          <li>{v[1]}</li>
        {/each}
      </ul>
   </article>
  {/each}
</main>

<style lang="scss">
  main {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr;
    grid-template-areas:
      "about bars speed"
      "about stats skills"
      "inventory inventory inventory";

    h2 {
      margin: 10px 0;
    }

    article {
      display: inline-block;
      border: 1px solid red;
      padding: 10px;

      ul {
        margin: 0;
      }
    }
  }
</style>
