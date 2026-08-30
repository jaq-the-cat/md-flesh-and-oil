<script lang="ts">
  import { Attributes, Skills } from "$lib/rpg_new/config";
  import { BLANK_ABILITIES, ABILITY_KINDS, type AbilityKind, type AbilityTemplate } from "$lib/rpg_new/domain/abilities/types";
  import { enumValues } from "$lib/rpg_new/helpers";
  import { label } from "../../labels";

  let {
    open = $bindable(),
    onCreate,
  }: {
    open: boolean;
    onCreate: (template: AbilityTemplate) => void;
  } = $props();

  let draft = $state<AbilityTemplate>({ ...BLANK_ABILITIES.weapon });

  const skills = enumValues<Skills>(Skills);
  const attributes = enumValues<Attributes>(Attributes);

  /** Swapping kinds keeps the name the player already typed. */
  function changeKind(next: AbilityKind) {
    draft = { ...BLANK_ABILITIES[next], name: draft.name };
  }

  function create() {
    if (draft.name === "") return;
    onCreate({ ...draft });
    draft = { ...BLANK_ABILITIES[draft.kind] };
    open = false;
  }
</script>

{#if open}
  <div class="newAbility">
    <h2 class="title">{label("add_custom")}</h2>

    <label>
      {label("kind")}
      <select value={draft.kind} onchange={(event) => changeKind(event.currentTarget.value as AbilityKind)}>
        {#each ABILITY_KINDS as kind}
          <option value={kind}>{label(kind)}</option>
        {/each}
      </select>
    </label>

    <label>
      {label("name")}
      <input type="text" bind:value={draft.name} />
    </label>

    {#if draft.kind === "weapon"}
      {@const weapon = draft}
      <label>
        {label("hit")}
        <select bind:value={weapon.hit}>
          {#each skills as skill}
            <option value={skill}>{label(Skills[skill])}</option>
          {/each}
        </select>
      </label>
      <label>
        {label("damage")}
        <input type="text" bind:value={weapon.damage} />
      </label>
      <label>
        {label("range")}
        <input type="number" min="0" bind:value={weapon.range} />
      </label>
    {:else if draft.kind === "attribute_modifier"}
      {@const modifier = draft}
      <label>
        {label("attributes")}
        <select bind:value={modifier.attribute}>
          {#each attributes as attribute}
            <option value={attribute}>{label(Attributes[attribute])}</option>
          {/each}
        </select>
      </label>
      <label>
        {label("amount")}
        <input type="number" bind:value={modifier.amount} />
      </label>
    {:else if draft.kind === "skill_modifier"}
      {@const modifier = draft}
      <label>
        {label("skill")}
        <select bind:value={modifier.skill}>
          {#each skills as skill}
            <option value={skill}>{label(Skills[skill])}</option>
          {/each}
        </select>
      </label>
      <label>
        {label("amount")}
        <input type="number" bind:value={modifier.amount} />
      </label>
    {/if}

    <label class="stacked">
      {label("info")}
      <textarea bind:value={draft.info}></textarea>
    </label>

    <button onclick={create}>{label("add")}</button>
    <button onclick={() => (open = false)}>{label("cancel")}</button>
  </div>
{/if}

<style lang="scss">
  .newAbility {
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

  label {
    display: grid;
    grid-template-columns: 14ch auto;
    align-items: center;
    gap: 10px;
  }

  .stacked {
    grid-template-columns: auto;
  }

  textarea {
    height: 5lh;
  }

  button {
    padding: 10px 0;
  }
</style>
