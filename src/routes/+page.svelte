<script lang="ts">
  import { WorkerDrone } from "$lib/rpg/domain/species/worker_drone";
  import type { Species } from "$lib/rpg/infra/species/species.svelte";
  import Sheet from "../components/sheet/Sheet.svelte";

  // Saving is deliberately absent: persistence is reworked alongside the new architecture.
  let species: Species = $state(new WorkerDrone());
</script>

<svelte:head>
  <title>Flesh and Oil - Sheet</title>
</svelte:head>

<Sheet bind:species />
