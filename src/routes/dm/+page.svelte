<script lang="ts">
  import { db } from "$lib/db";
  import { SHEETS_PATH } from "$lib/sheets";
  import type { StoredSheet } from "$lib/persistence";
  import EnemyList from "../../components/dm/EnemyList.svelte";
  import Items from "../../components/dm/Items.svelte";
  import SheetList from "../../components/dm/SheetList.svelte";
  import "./dm.scss";
  import { collectionStore } from "sveltefire";

  let sheets = collectionStore<StoredSheet>(db.firestore!, SHEETS_PATH);
</script>

<svelte:head>
  <title>Flesh and Oil - Public Enemy</title>
</svelte:head>

<main>
  <SheetList {sheets} />
  <Items />
  <EnemyList />
</main>

<style lang="scss">
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
