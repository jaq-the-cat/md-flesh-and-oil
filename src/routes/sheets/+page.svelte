<script lang="ts">
  import { authorId } from "$lib/author";
  import { localization } from "$i18n";
  import OwnedSheets from "./OwnedSheets.svelte";
</script>

<svelte:head>
  <title>Flesh and Oil - My Sheets</title>
</svelte:head>

<main>
  {#await authorId()}
    <h1>{localization().ui.loading}</h1>
  {:then author}
    <OwnedSheets {author} />
  {:catch}
    <h1>{localization().sheets.no_identity}</h1>
  {/await}
</main>

<style lang="scss">
  main {
    max-width: 1600px;
    margin-inline: auto;
  }

  h1 {
    text-align: center;
  }
</style>
