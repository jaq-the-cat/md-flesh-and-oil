<script lang="ts">
  import { clamp } from "$lib/rpg/helpers";
  import type { Species } from "$lib/rpg/infra/species/species.svelte";
  import type { NumberField } from "$lib/rpg/infra/types.svelte";

  let { species, field }: { species: Species; field: NumberField<Species> } = $props();

  let max = $derived(field.getMaxValue(species));

  function commit(input: HTMLInputElement) {
    if (Number.isNaN(input.valueAsNumber)) return; // empty or half-typed, wait for more
    field.setValue(species, clamp(input.valueAsNumber, field.min, max));
    input.value = String(field.getValue()); // show the clamped value, not what was typed
  }
</script>

<input
  type="number"
  min={field.min}
  {max}
  value={field.getValue()}
  oninput={(event) => commit(event.currentTarget)}
  onblur={(event) => (event.currentTarget.value = String(field.getValue()))}
/>

<style lang="scss">
  input {
    width: 10ch;
  }
</style>
