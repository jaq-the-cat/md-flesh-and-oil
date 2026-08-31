<script lang="ts">
  import { session } from "$lib/auth.svelte";
  import { localization } from "$i18n";
  import EnemyList from "../../components/dm/EnemyList.svelte";
  import Items from "../../components/dm/Items.svelte";
  import SheetList from "../../components/dm/SheetList.svelte";
  import "./dm.scss";
</script>

<svelte:head>
  <title>Flesh and Oil - Public Enemy</title>
</svelte:head>

{#if !session.ready}
  <h1 class="gate">{localization().ui.loading}</h1>
{:else if session.isDm}
  <main>
    <SheetList />
    <Items />
    <EnemyList />
  </main>
{:else}
  <h1 class="gate">{localization().dm.not_authorised}</h1>
{/if}

<style lang="scss">
  .gate {
    text-align: center;
  }

  main {
    max-width: 1600px;
    margin-inline: auto;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "sheets items enemyList";
  }

  @media (max-width: 1300px) {
    main {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "sheets    items"
        "enemyList enemyList";
    }
  }

  @media (max-width: 800px) {
    main {
      grid-template-columns: 1fr;
      grid-auto-rows: min-content;
      grid-template-areas:
        "sheets"
        "items"
        "enemyList";
    }
  }
</style>
