<script lang="ts">
  import { SkillModifiers, Skills } from "$lib/rpg_new/config";
  import { enumValues } from "$lib/rpg_new/helpers";
  import type { Species } from "$lib/rpg_new/infra/species/species.svelte";
  import { fields, label } from "../labels";
  import RulebookSnippet from "./dialogs/RulebookSnippet.svelte";
  import Proficiency from "../../rulebook/snippets/general/proficiency.svelte";

  let { species }: { species: Species } = $props();

  const modifiers = enumValues<SkillModifiers>(SkillModifiers);

  let rulebook = $state(false);
</script>

<div id="skills">
  <RulebookSnippet title={label("skills")} bind:open={rulebook}>
    <Proficiency />
  </RulebookSnippet>
  <section class="skillList">
    {#each fields(Skills, species.skills) as field (field.key)}
      <span>{field.label}</span>
      <select bind:value={species.skills[field.key]}>
        {#each modifiers as modifier}
          <option value={modifier}>{label(SkillModifiers[modifier])}</option>
        {/each}
      </select>
    {/each}
  </section>
</div>

<style lang="scss">
  #skills {
    grid-area: skills;
  }

  .skillList {
    display: grid;
    grid-template-columns: auto min-content;
    align-items: center;
    row-gap: 5px;
    column-gap: 10px;
  }

  select {
    width: 6ch;
  }
</style>
