<script>
  import Advantage from "./snippets/general/advantage.svelte";
  import Checks from "./snippets/general/checks.svelte";
  import DamageTypes from "./snippets/general/damageTypes.svelte";
  import Death from "./snippets/general/death/death.svelte";
  import FallDamage from "./snippets/general/fallDamage.svelte";
  import OutOfCombat from "./snippets/general/outOfCombat.svelte";
  import Proficiency from "./snippets/general/proficiency.svelte";
  import Stealth from "./snippets/general/stealth.svelte";
  import Stun from "./snippets/general/stun.svelte";
</script>

<details>
  <summary> General Rules and Explanations </summary>
  <Checks />
  <Proficiency />
  <Advantage />
  <Stealth />
  <Death />
  <h2>Weight</h2>
  <p>Carrying Capacity is determined by your Species and Strength.</p>
  <p>Base Capacity at 0 Strength is 5kg.</p>
  <h2>Resting</h2>
  <p>
    Resting is basically sleeping, healing and decreasing Oil or Blood. It is
    interrupted when a member suffers damage.
  </p>
  <h3>Short Rest</h3>
  <p>
    A Short Rest lasts 2 in-Universe hours, running 1 auto-successful Regenerate
    abilities on Drones that have access to it and healing Humans and Avian
    Drones for 25% Max HP.
  </p>
  <h3>Long Rest</h3>
  <p>
    A Long Rest lasts 8 in-Universe hours, healing all party members to Max HP.
  </p>
  <h2>Hunger Damage</h2>
  <p>
    Max HP / 10 is the baseline for Hunger damage. It cannot be lower than 1. If
    the value is fractional, such as 1.5 or 2.8, truncate down to 1 and 2,
    respectively.
  </p>
  <p>
    If you start suffering Hunger damage while Out of Combat, the ticking damage
    instead happens once every real-life minute or 10m travelled.
  </p>
  <OutOfCombat />
  <Stun />
  <FallDamage />
  <DamageTypes />
</details>
