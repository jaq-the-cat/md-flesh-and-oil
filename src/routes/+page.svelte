<script lang="ts">
  import { WorkerDrone } from "$lib/rpg_new/domain/species/worker_drone";
  import type { Species } from "$lib/rpg_new/infra/species/species.svelte";
  import Sheet from "../components/sheet/Sheet.svelte";

  // Saving is deliberately absent: persistence is reworked alongside the new architecture.
  let species: Species = $state(new WorkerDrone());
</script>

<svelte:head>
  <title>Flesh and Oil - Sheet</title>
</svelte:head>

<Sheet bind:species />
