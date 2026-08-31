<script lang="ts">
  import { Attributes } from "$lib/rpg/domain/config";
  import type { Species } from "$lib/rpg/infra/species.svelte";
  import NumberInput from "../NumberInput.svelte";
  import { localization } from "$i18n";
  import { fields } from "../fields";
  import RulebookSnippet from "./dialogs/RulebookSnippet.svelte";
  import AttributesSnippet from "../../rulebook/snippets/general/attributes.svelte";

  let { species }: { species: Species } = $props();

  let attributes = $derived(fields(Attributes, species.attributes, localization().attributes));
  let total = $derived(attributes.reduce((sum, field) => sum + field.value.getValue(), 0));

  let rulebook = $state(false);
</script>

<div id="attributes">
  <RulebookSnippet title={localization().cards.attributes} bind:open={rulebook}>
    <AttributesSnippet />
  </RulebookSnippet>
  <p class="total">
    <span>{localization().fields.total_points}</span>
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
    row-gap: 10px;
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
    row-gap: 10px;
    column-gap: 10px;
  }
</style>
