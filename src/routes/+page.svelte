<script lang="ts">
  import { Character } from "$lib/game/character.svelte";
  import Sheet from "../components/sheet/Sheet.svelte";
  
  let character: Character | undefined = $state();

  async function getDefinition() {
    const params = new URLSearchParams({
      type: 'species',
      name: 'human'
    });
    const response = await fetch(`/api/definition?${params}`);
    if (response.status !== 200) return; // error
    const data = await response.json();
    character = new Character(data.definition);
  }

  async function save() {
    // const doc = await addDoc(
      // collection(db.firestore!, "sheets"),
      // character.serialize()
    // );
    // character.id = doc.id;
    // goto(`/sheet/${doc.id}`);
  }
</script>

<svelte:head>
  <title>Flesh and Oil - Sheet</title>
</svelte:head>

<header class="sheetLinks">
  <button onclick={save}>Create</button>
  <button onclick={getDefinition}>{character}</button>
</header>

{#if character }
  <Sheet bind:character />  
{/if}


<style lang="scss">
  header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 20px;
    margin-bottom: 10px;
    button {
      font-size: 1.1rem;
      display: inline-block;
      margin-bottom: 10px;
      border: 1px solid #9fe644;
      padding: 10px;
    }
  }
</style>
