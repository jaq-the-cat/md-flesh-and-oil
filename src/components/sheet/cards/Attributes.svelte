<script lang="ts">
  import { Attributes } from "$lib/rpg_new/config";
  import type { Species } from "$lib/rpg_new/infra/species/species.svelte";
  import NumberInput from "../NumberInput.svelte";
  import { fields, label } from "../labels";
  import RulebookSnippet from "./dialogs/RulebookSnippet.svelte";
  import AttributesSnippet from "../../rulebook/snippets/general/attributes.svelte";

  let { species }: { species: Species } = $props();

  let attributes = $derived(fields(Attributes, species.attributes));
  let total = $derived(attributes.reduce((sum, field) => sum + field.value.getValue(), 0));

  let rulebook = $state(false);
</script>

<div id="attributes">
  <RulebookSnippet title={label("attributes")} bind:open={rulebook}>
    <AttributesSnippet />
  </RulebookSnippet>
  <p class="total">
    <span>{label("total_points")}</span>
    <span>{total}</span>
  </p>
  <section class="statList">
    {#each attributes as field (field.key)}
      <span>{field.label}</span>
      <NumberInput {species} field={field.value} />
    {/each}
  </section>
</div>

<style lang="scss">
  #attributes {
    grid-area: attributes;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
  }

  .total {
    display: flex;
    justify-content: space-between;
    margin: 0;
  }

  .statList {
    display: grid;
    grid-template-columns: auto max-content;
    align-items: center;
    row-gap: 5px;
    column-gap: 10px;
  }
</style>
