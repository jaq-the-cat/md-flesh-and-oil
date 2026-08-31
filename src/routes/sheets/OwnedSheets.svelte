<script lang="ts">
  import { collection, deleteDoc, doc, query, where, type CollectionReference } from "firebase/firestore";
  import { collectionStore } from "sveltefire";
  import { db } from "$lib/db";
  import { SHEETS_PATH } from "$lib/sheets";
  import { localization } from "$i18n";
  import type { StoredSheet } from "$lib/persistence";
  import type { SPECIES } from "$lib/rpg/domain/species/registry";

  let { author }: { author: string } = $props();

  const firestore = db.firestore!;
  // Firestore collections are untyped; everything written to `sheets` is a sheet document.
  const sheetsCollection = collection(firestore, SHEETS_PATH) as CollectionReference<StoredSheet>;

  // Sorted here rather than with orderBy, which would need a composite Firestore index.
  const sheets = collectionStore<StoredSheet>(
    firestore,
    query(sheetsCollection, where("author", "==", author)),
  );

  let mine = $derived([...$sheets].sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0)));

  let deleting = $state<StoredSheet | null>(null);
  let failed = $state(false);

  const speciesName = (id: keyof typeof SPECIES) => localization().species[id] ?? id;
  const edited = (at?: number) => (at ? new Date(at).toLocaleString() : localization().sheets.never);

  async function remove(sheet: StoredSheet) {
    failed = false;
    try {
      await deleteDoc(doc(firestore, SHEETS_PATH, sheet.id));
      deleting = null;
    } catch {
      failed = true;
    }
  }
</script>

<section class="list">
  <h1>{localization().sheets.title}</h1>
  {#each mine as sheet (sheet.id)}
    <a class="buttonStyle sheet" href="/sheet/{sheet.id}">
      <span class="name">{sheet.about?.name || localization().dm.unnamed}</span>
      <span class="species">[{speciesName(sheet.species)}]</span>
      <span class="edited">{edited(sheet.updatedAt)}</span>
    </a>
    <button class="delete" onclick={() => (deleting = sheet)}>{localization().ui.delete}</button>
  {:else}
    <p class="empty">{localization().sheets.empty}</p>
  {/each}
</section>

{#if deleting}
  <div class="confirm">
    <h2>{localization().sheets.confirm_delete}</h2>
    <p class="target">{deleting.about?.name || localization().dm.unnamed}</p>
    {#if failed}
      <p class="failed">{localization().ui.error}</p>
    {/if}
    <button onclick={() => remove(deleting!)}>{localization().ui.delete_confirm}</button>
    <button onclick={() => (deleting = null)}>{localization().ui.cancel}</button>
  </div>
{/if}

<style lang="scss">
  .list {
    display: grid;
    grid-template-columns: auto min-content;
    align-items: center;
    gap: 10px;
  }

  h1,
  .empty {
    grid-column: 1 / 3;
    margin: 0;
    text-align: center;
  }

  .sheet {
    display: grid;
    grid-template-columns: 1fr max-content max-content;
    align-items: baseline;
    gap: 15px;
    padding: 10px;
    text-decoration: none;
    font-size: 1.2rem;
  }

  .edited {
    font-size: 0.85em;
    opacity: 0.7;
  }

  .delete {
    padding: 10px 15px;
  }

  .confirm {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: 50ch;
    background-color: #070c01;

    padding: 30px;
    border: 1px solid #9fe644;
    box-shadow: 2px 2px 4px 0 #9fe644;
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    h2 {
      margin: 0;
      text-align: center;
    }

    button {
      padding: 10px 0;
    }
  }

  .target {
    margin: 0;
    text-align: center;
    font-size: 1.5rem;
  }

  .failed {
    margin: 0;
    text-align: center;
    color: #e64444;
  }
</style>
