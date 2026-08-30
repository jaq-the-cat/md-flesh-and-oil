<script lang="ts">
  import { doc, onSnapshot, setDoc } from "firebase/firestore";
  import { db } from "$lib/db";
  import { localization } from "$i18n";
  import { fromDocument, sheetJson, toDocument, type SheetDocument } from "$lib/persistence";
  import type { Species } from "$lib/rpg/infra/species/species.svelte";
  import Sheet from "../../../components/sheet/Sheet.svelte";

  const SAVE_DELAY = 800;

  let { data } = $props();

  let species = $state<Species | null>(null);
  let status = $state<"loading" | "missing" | "saving" | "saved" | "error">("loading");

  // The last document we know the server holds, so an echo of our own write is not saved again.
  let settled = "";
  let pending: ReturnType<typeof setTimeout>;
  // Preserved across saves: setDoc replaces the whole document, so an unknown author would be lost.
  let author: string | undefined;

  let reference = $derived(doc(db.firestore!, "sheets", data.slug));

  $effect(() =>
    onSnapshot(reference, (snapshot) => {
      // Skip the local echo of our own write, then the server's confirmation of it: replacing
      // the species mid-edit would discard whatever is being typed.
      if (snapshot.metadata.hasPendingWrites) return;
      if (!snapshot.exists()) {
        status = "missing";
        return;
      }
      const document = snapshot.data() as SheetDocument;
      const json = sheetJson(document);
      if (json === settled) return;

      author = document.author;
      settled = json;
      species = fromDocument(document);
      status = "saved";
    }),
  );

  $effect(() => {
    if (!species) return;
    // Reading the whole document is what subscribes this effect to every field on the sheet.
    const json = sheetJson(toDocument(species));
    if (json === settled) return;

    settled = json;
    status = "saving";
    clearTimeout(pending);
    pending = setTimeout(async () => {
      try {
        await setDoc(reference, { ...JSON.parse(json), ...(author ? { author } : {}), updatedAt: Date.now() });
        status = "saved";
      } catch {
        status = "error";
      }
    }, SAVE_DELAY);
  });

  let name = $derived(species?.about.name || "New");
</script>

<svelte:head>
  <title>Flesh and Oil - Sheet | {name}</title>
</svelte:head>

{#if species}
  <p class="status" class:error={status === "error"}>{localization().ui[status]}</p>
  <Sheet bind:species />
{:else}
  <h2>{localization().ui[status === "missing" ? "missing" : "loading"]}</h2>
{/if}

<style lang="scss">
  .status {
    max-width: 1600px;
    margin: 0 auto 10px auto;
    text-align: end;
    opacity: 0.7;
  }

  .error {
    color: #e64444;
    opacity: 1;
  }
</style>
