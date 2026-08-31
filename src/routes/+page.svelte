<script lang="ts">
  import { untrack } from "svelte";
  import { goto } from "$app/navigation";
  import { addDoc, collection } from "firebase/firestore";
  import { db } from "$lib/db";
  import { localization } from "$i18n";
  import { session } from "$lib/auth.svelte";
  import { sheetJson, toDocument } from "$lib/persistence";
  import { WorkerDrone } from "$lib/rpg/domain/species/worker_drone";
  import type { Species } from "$lib/rpg/infra/species/species.svelte";
  import Sheet from "../components/sheet/Sheet.svelte";

  // A scratch sheet: nothing is written until Create is pressed.
  let species: Species = $state(new WorkerDrone());
  let creating = $state(false);
  let failed = $state(false);

  // Read once on purpose: this is the baseline the unload warning compares against.
  const untouched = untrack(() => sheetJson(toDocument(species)));
  const edited = () => sheetJson(toDocument(species)) !== untouched;

  async function create() {
    creating = true;
    failed = false;
    try {
      const sheet = JSON.parse(sheetJson(toDocument(species)));
      const created = await addDoc(collection(db.firestore!, "sheets"), {
        ...sheet,
        author: session.uid!,
        updatedAt: Date.now(),
      });
      await goto(`/sheet/${created.id}`);
    } catch {
      failed = true;
      creating = false;
    }
  }
</script>

<svelte:head>
  <title>Flesh and Oil - Sheet</title>
</svelte:head>

<svelte:window
  onbeforeunload={(event) => {
    if (edited() && !creating) event.preventDefault();
  }}
/>

<header class="sheetLinks">
  {#if session.signedIn}
    <button onclick={create} disabled={creating}>
      {creating ? localization().ui.creating : localization().ui.create}
    </button>
  {:else}
    <a class="buttonStyle" href="/login">{localization().auth.log_in_to_save}</a>
  {/if}
  {#if failed}
    <span class="failed">{localization().ui.error}</span>
  {/if}
</header>

<Sheet bind:species />

<style lang="scss">
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
    margin-bottom: 10px;

    button,
    a {
      font-size: 1.1rem;
      text-decoration: none;
      border: 1px solid #9fe644;
      padding: 10px;
    }
  }

  .failed {
    color: #e64444;
  }
</style>
