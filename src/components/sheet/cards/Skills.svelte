<script lang="ts">
  import { SkillModifiers, Skills } from "$lib/rpg/config";
  import { enumValues } from "$lib/rpg/helpers";
  import type { Species } from "$lib/rpg/infra/species/species.svelte";
  import { localization } from "$i18n";
  import { fields } from "../fields";
  import RulebookSnippet from "./dialogs/RulebookSnippet.svelte";
  import SkillsSnippet from "../../rulebook/snippets/general/skills.svelte";
  import ProficiencySnippet from "../../rulebook/snippets/general/proficiency.svelte";

  let { species }: { species: Species } = $props();

  const modifiers = enumValues<SkillModifiers>(SkillModifiers);

  let skills = $derived(fields(Skills, species.skills, localization().skills));
  let counts = $derived(
    [SkillModifiers.proficient, SkillModifiers.expert].map((modifier) => ({
      label: localization().modifiers.plural[modifier],
      total: skills.filter((field) => field.value === modifier).length,
    })),
  );

  let skillsRulebook = $state(false);
  let proficiencyRulebook = $state(false);
</script>

<div id="skills">
  <RulebookSnippet title={localization().cards.skills} bind:open={skillsRulebook}>
    <SkillsSnippet />
  </RulebookSnippet>
  <RulebookSnippet title={localization().cards.proficiencies} bind:open={proficiencyRulebook}>
    <ProficiencySnippet />
  </RulebookSnippet>
  <div class="counts">
    {#each counts as count}
      <p>
        <span>{count.label}</span>
        <span>{count.total}</span>
      </p>
    {/each}
  </div>
  <section class="skillList">
    {#each skills as field (field.key)}
      <span>{field.label}</span>
      <span class=skillValue>{Math.floor(species.getSkillBonus(field.key))}</span>
      <select bind:value={species.skills[field.key]}>
        {#each modifiers as modifier}
          <option value={modifier}>{localization().modifiers.codes[modifier]}</option>
        {/each}
      </select>
    {/each}
  </section>
</div>

<style lang="scss">
  #skills {
    grid-area: skills;
  }

  .counts p {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }

  .skillList {
    display: grid;
    grid-template-columns: auto min-content min-content;
    align-items: center;
    row-gap: 10px;
    column-gap: 10px;
  }

  .skillValue {
    text-align: end;
  }

  select {
    width: 6ch;
  }
</style>
