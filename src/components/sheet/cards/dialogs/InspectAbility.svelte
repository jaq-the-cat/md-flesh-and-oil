<script lang="ts">
  import type { Ability } from "$lib/rpg/domain/abilities/types";
  import { localization } from "$i18n";
  import AbilityDetails from "./AbilityDetails.svelte";

  let { ability = $bindable() }: { ability: Ability | null } = $props();
</script>

{#if ability}
  <div class="inspect">
    <h2 class="title">{ability.name}</h2>
    <AbilityDetails {ability} />
    <button onclick={() => (ability = null)}>{localization().ui.close}</button>
  </div>
{/if}

<style lang="scss">
  .inspect {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: 50ch;
    max-width: min(40%, 40ch);
    max-height: 90vh;
    overflow-y: auto;
    background-color: #070c01;

    padding: 30px;
    border: 1px solid #9fe644;
    box-shadow: 2px 2px 4px 0 #9fe644;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }

  .title {
    margin: 0;
    font-size: 2rem;
    text-align: center;
  }

  button {
    padding: 10px 0;
  }
</style>
