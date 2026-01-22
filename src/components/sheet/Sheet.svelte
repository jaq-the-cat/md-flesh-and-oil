<script lang="ts">
  import type { Character } from "$lib/game/character.svelte";

  let { character = $bindable() as Character } = $props();
</script>

<main id="sheet">
  <article id=species>
    <h2>Species</h2>
    <ul>
      <li></li>
    </ul>
  </article>
  <article id=bars>
    <h2>Bars</h2>
    <ul>
      {#each Object.entries(character.bars) as [key, value]}
        <li>{key}</li>
        <li>{value}</li>
      {/each}
    </ul>
  </article>
  <article id=speed>
    <h2>Speed</h2>
      {#each Object.entries(character.speed) as [key, value]}
        <li>{key}</li>
        <li>{value}</li>
      {/each}
  </article>
  <article id=about>
    <h2>About</h2>
      {#each Object.entries(character.about) as [key, value]}
        <li>{key}</li>
        <li>{value}</li>
      {/each}
  </article>
  <article id=stats>
    <h2>Stats</h2>
      {#each Object.entries(character.stats) as [key, value]}
        <li>{key}</li>
        <li>{value}</li>
      {/each}
  </article>
  <article id=skills>
    <h2>Skills</h2>
      {#each Object.entries(character.skills) as [key, value]}
        <li>{key}</li>
        <li>{value}</li>
      {/each}
  </article>
  <article id=inventory>
    <h2>Inventory</h2>
      {#each Object.entries(character.inventory) as [key, value]}
        <li>{key}</li>
        <li>{value}</li>
      {/each}
  </article>
</main>

<style lang="scss">
  #species { grid-area: species }
  #bars { grid-area: bars }
  #speed { grid-area: speed }
  #about { grid-area: about }
  #stats { grid-area: stats }
  #skills { grid-area: skills }
  #inventory { grid-area: inventory }
  main {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr;
    grid-template-areas:
      "species bars speed"
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
