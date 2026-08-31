<script lang="ts">
  import { DamageTypes, Skills } from "$lib/rpg/config";
  import {
    BLANK_CUSTOM,
    ITEM_KINDS,
    tidyDamage,
    type ContainerTemplate,
    type CustomKind,
    type CustomTemplate,
  } from "$lib/rpg/domain/items/types";
  import { localization } from "$i18n";

  let {
    open = $bindable(),
    onCreate,
  }: {
    open: boolean;
    onCreate: (template: CustomTemplate | ContainerTemplate) => void;
  } = $props();

  const CONTAINER = "container";
  const kinds: (CustomKind | typeof CONTAINER)[] = [...ITEM_KINDS, CONTAINER];

  const hitSkills = Object.values(Skills);
  const damageTypes = Object.values(DamageTypes);

  let kind = $state<CustomKind | typeof CONTAINER>("plain");
  let draft = $state<CustomTemplate>(structuredClone(BLANK_CUSTOM.plain));
  let carry = $state(10);

  /** Swapping kinds keeps what the player already typed that the new kind also has. */
  function changeKind(next: CustomKind | typeof CONTAINER) {
    kind = next;
    // A container has no item fields, so park the draft on `plain` and no kind block renders.
    const blank = structuredClone(BLANK_CUSTOM[next === CONTAINER ? "plain" : next]);
    draft = { ...blank, name: draft.name, weight: draft.weight };
  }

  function create() {
    if (draft.name === "") return;
    if (kind === CONTAINER) {
      onCreate({ name: draft.name, carry });
    } else {
      const made = structuredClone($state.snapshot(draft)) as CustomTemplate;
      if ("damage" in made) made.damage = tidyDamage(made.damage);
      onCreate(made);
    }
    draft = structuredClone(BLANK_CUSTOM[kind === CONTAINER ? "plain" : kind]);
    open = false;
  }
</script>

{#if open}
  <div class="newItem">
    <h2 class="title">{localization().ui.add_custom}</h2>

    <label>
      {localization().fields.kind}
      <select value={kind} onchange={(event) => changeKind(event.currentTarget.value as CustomKind)}>
        {#each kinds as option}
          <option value={option}>{localization().itemKinds[option]}</option>
        {/each}
      </select>
    </label>

    <label>
      {localization().fields.name}
      <input type="text" bind:value={draft.name} />
    </label>

    {#if kind === CONTAINER}
      <label>
        {localization().fields.carry}
        <input type="number" min="0" step="0.1" bind:value={carry} />
      </label>
    {:else}
      <label>
        {localization().fields.weight}
        <input type="number" min="0" step="0.1" bind:value={draft.weight} />
      </label>
    {/if}

    {#if draft.kind === "melee" || draft.kind === "ranged" || draft.kind === "throwable"}
      {@const armed = draft}
      <fieldset>
        <legend>{localization().fields.damage}</legend>
        <label class="dice">
          {localization().fields.dice}
          <span>
            <input type="number" min="0" bind:value={armed.damage.dice!.count} />
            d
            <input type="number" min="0" bind:value={armed.damage.dice!.sides} />
          </span>
        </label>
        <label>
          {localization().fields.flat}
          <input type="number" bind:value={armed.damage.flat} />
        </label>
        <label>
          {localization().fields.skill}
          <select bind:value={armed.damage.bonus}>
            <option value={undefined}></option>
            {#each hitSkills as skill}
              <option value={skill}>{localization().skills[skill]}</option>
            {/each}
          </select>
        </label>
        <label>
          {localization().fields.kind}
          <select bind:value={armed.damage.type}>
            {#each damageTypes as type}
              <option value={type}>{localization().damageTypes[type]}</option>
            {/each}
          </select>
        </label>
      </fieldset>
    {/if}

    {#if draft.kind === "melee"}
      {@const melee = draft}
      <label class="checkbox">
        {localization().fields.two_handed}
        <input type="checkbox" bind:checked={melee.twoHanded} />
      </label>
    {:else if draft.kind === "ranged"}
      {@const ranged = draft}
      <label>
        {localization().fields.hit}
        <select bind:value={ranged.hit}>
          {#each hitSkills as skill}
            <option value={skill}>{localization().skills[skill]}</option>
          {/each}
        </select>
      </label>
      <label>
        {localization().fields.range}
        <input type="number" min="0" bind:value={ranged.range} />
      </label>
      <label>
        {localization().fields.rate}
        <input type="number" min="1" bind:value={ranged.rate} />
      </label>
      <label>
        {localization().fields.magazine}
        <input type="number" min="1" bind:value={ranged.magazine} />
      </label>
      <label>
        {localization().fields.reload}
        <input type="number" min="0" bind:value={ranged.reloadTurns} />
      </label>
    {:else if draft.kind === "throwable"}
      {@const throwable = draft}
      <label>
        {localization().fields.range}
        <input type="text" bind:value={throwable.range} />
      </label>
    {:else if draft.kind === "liquid"}
      {@const liquid = draft}
      <label>
        {localization().fields.capacity}
        <input type="number" min="0" step="0.1" bind:value={liquid.capacity} />
      </label>
      <label>
        {localization().fields.weight_per_unit}
        <input type="number" min="0" step="0.1" bind:value={liquid.weightPerUnit} />
      </label>
    {/if}

    <label class="stacked">
      {localization().fields.info}
      <textarea bind:value={draft.info}></textarea>
    </label>

    <button onclick={create}>{localization().ui.add}</button>
    <button onclick={() => (open = false)}>{localization().ui.cancel}</button>
  </div>
{/if}

<style lang="scss">
  .newItem {
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

  fieldset {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0;
    padding: 10px;
    border: 1px solid #9fe64459;
  }

  .dice span {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .checkbox input {
    justify-self: start;
  }

  .stacked {
    grid-template-columns: auto;
  }

  textarea {
    height: 4lh;
  }

  button {
    padding: 10px 0;
  }
</style>
