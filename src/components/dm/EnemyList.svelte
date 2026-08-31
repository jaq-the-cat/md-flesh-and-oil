<script lang="ts">
  import { ENEMY_PREFABS } from "$lib/rpg/domain/enemies/prefabs";
  import { enemyWeapon, type EnemyTemplate } from "$lib/rpg/domain/enemies/types";
  import { ITEMS, type ItemId } from "$lib/rpg/domain/items/prefabs";
  import { itemText } from "../sheet/items";
  import { localization } from "$i18n";
  import ItemDetails from "../sheet/cards/dialogs/ItemDetails.svelte";
  import RulebookSnippet from "../sheet/cards/dialogs/RulebookSnippet.svelte";

  const categories = Object.keys(ENEMY_PREFABS);

  let category = $state(categories[0]);
  let enemies = $derived(ENEMY_PREFABS[category]);

  let inspecting = $state<EnemyTemplate | null>(null);
  let weapon = $state<ItemId | null>(null);

  let weaponDetails = $derived(weapon ? enemyWeapon(weapon) : undefined);
</script>

<section id="enemyList">
  <h1>{localization().dm.enemies}</h1>

  <div class="categories">
    {#each categories as name}
      <button class:selected={name === category} onclick={() => (category = name)}>{name}</button>
    {/each}
  </div>

  <div class="list">
    {#each enemies as enemy (enemy.name)}
      <button class="enemy" onclick={() => (inspecting = enemy)}>
        <span>{enemy.name}</span>
        <span>{enemy.maxHp} HP</span>
      </button>
    {/each}
  </div>
</section>

<RulebookSnippet
  bind:open={
    () => inspecting !== null,
    (open) => {
      if (!open) inspecting = null;
    }
  }
>
  {#if inspecting}
    <h2 class="title">{inspecting.name}</h2>
    {#if inspecting.description}
      <p class="description">{inspecting.description}</p>
    {/if}

    <dl>
      <dt>{localization().bars.health}</dt>
      <dd>{inspecting.maxHp}</dd>
      {#each inspecting.stats as stat}
        <dt>{stat.label}</dt>
        <dd>{stat.value >= 0 ? `+${stat.value}` : stat.value}</dd>
      {/each}
      {#each inspecting.passive as stat}
        <dt>{stat.label}</dt>
        <dd>{stat.value}</dd>
      {/each}
    </dl>

    {#each [{ label: localization().dm.guaranteed, list: inspecting.guaranteed }, { label: localization().dm.possible, list: inspecting.possible }] as group}
      {#if group.list.length > 0}
        <h3>{group.label}</h3>
        <div class="weapons">
          {#each group.list as reference}
            <button onclick={() => (weapon = reference)}>{itemText(ITEMS[reference]).name}</button>
          {/each}
        </div>
      {/if}
    {/each}
  {/if}
</RulebookSnippet>

{#if weaponDetails}
  <div class="weapon">
    <h2 class="title">{itemText(weaponDetails).name}</h2>
    <ItemDetails template={weaponDetails} />
    <button onclick={() => (weapon = null)}>{localization().ui.close}</button>
  </div>
{/if}

<style lang="scss">
  #enemyList {
    grid-area: enemyList;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  h1 {
    text-align: center;
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;

    .selected {
      background-color: #142105;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-height: 25lh;
    overflow-y: auto;
  }

  .categories button,
  .enemy {
    padding: 5px 10px;
  }

  .enemy {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    text-align: start;
  }

  .title {
    margin: 0;
    font-size: 2rem;
    text-align: center;
  }

  .description {
    margin: 0;
    opacity: 0.85;
  }

  h3 {
    margin: 5px 0 0 0;
  }

  .weapons {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;

    button {
      padding: 5px 10px;
    }
  }

  dl {
    display: grid;
    grid-template-columns: auto max-content;
    margin: 0;
    gap: 5px 15px;
  }

  dt {
    font-size: 0.9em;
    opacity: 0.8;
  }

  dd {
    margin: 0;
    justify-self: end;
  }

  .weapon {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: 50ch;
    max-width: min(40%, 40ch);
    background-color: #070c01;

    padding: 30px;
    border: 1px solid #9fe644;
    box-shadow: 2px 2px 4px 0 #9fe644;
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    button {
      padding: 10px 0;
    }
  }
</style>
