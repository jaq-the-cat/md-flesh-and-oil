<script lang="ts">
  import { session } from "$lib/auth.svelte";
  import { localization } from "$i18n";
  import OwnedSheets from "./OwnedSheets.svelte";
</script>

<svelte:head>
  <title>Flesh and Oil - My Sheets</title>
</svelte:head>

<main>
  {#if !session.ready}
    <h1>{localization().ui.loading}</h1>
  {:else if session.signedIn}
    <OwnedSheets author={session.uid!} />
  {:else}
    <h1>{localization().sheets.title}</h1>
    <p class="note">{localization().auth.log_in_to_list}</p>
    <a class="buttonStyle" href="/login">{localization().auth.log_in}</a>
  {/if}
</main>

<style lang="scss">
  main {
    max-width: 1600px;
    margin-inline: auto;
  }

  h1,
  .note {
    text-align: center;
  }

  a {
    display: block;
    width: max-content;
    margin: 10px auto;
    padding: 10px 20px;
    text-decoration: none;
  }
</style>
