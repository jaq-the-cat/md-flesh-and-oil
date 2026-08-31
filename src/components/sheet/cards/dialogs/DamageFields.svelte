<script lang="ts">
  import { DamageTypes, Skills } from "$lib/rpg/domain/config";
  import type { Damage } from "$lib/rpg/infra/items";
  import { localization } from "$i18n";

  let { damage = $bindable() }: { damage: Damage } = $props();

  const skills = Object.values(Skills);
  const types = Object.values(DamageTypes);
</script>

<fieldset>
  <legend>{localization().fields.damage}</legend>
  <label class="dice">
    {localization().fields.dice}
    <span>
      <input type="number" min="0" bind:value={damage.dice!.count} />
      d
      <input type="number" min="0" bind:value={damage.dice!.sides} />
    </span>
  </label>
  <label>
    {localization().fields.flat}
    <input type="number" bind:value={damage.flat} />
  </label>
  <label>
    {localization().fields.skill}
    <select bind:value={damage.bonus}>
      <option value={undefined}></option>
      {#each skills as skill}
        <option value={skill}>{localization().skills[skill]}</option>
      {/each}
    </select>
  </label>
  <label>
    {localization().fields.kind}
    <select bind:value={damage.type}>
      {#each types as type}
        <option value={type}>{localization().damageTypes[type]}</option>
      {/each}
    </select>
  </label>
</fieldset>

<style lang="scss">
  fieldset {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0;
    padding: 10px;
    border: 1px solid #9fe64459;
  }

  label {
    display: grid;
    grid-template-columns: 14ch auto;
    align-items: center;
    gap: 10px;
  }

  .dice span {
    display: flex;
    align-items: center;
    gap: 5px;
  }
</style>
