<script lang="ts">
  let {
    title = $bindable() as string | undefined,
    open = $bindable() as boolean,
    children,
  } = $props();
</script>

{#if title}
  <button class="cardTitle" onclick={() => (open = !open)}>{title}</button>
{/if}
<modal style={open ? "" : "display: none"}>
  <article>
    {@render children?.()}
  </article>
  <button onclick={() => (open = false)}>Close</button>
</modal>

<style lang="scss">
  modal {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-width: 50ch;
    max-width: min(40%, 40ch);
    background-color: #070c01;

    padding-bottom: 30px;
    border: 1px solid #9fe644;
    box-shadow: 2px 2px 4px 0 #9fe644;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    overflow-y: visible;
    max-height: 90vh;

    article {
      padding: 30px;
      padding-bottom: 0;
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      overflow-y: scroll;
    }

    button {
      margin: 0 2ch;
    }
  }

  modal::backdrop {
    background: #0009;
  }
  
  @media (max-width: 650px) {
    modal {
      max-width: unset;
      min-width: unset;
      width: 85%;
      max-height: 75vh;
    }
  }
</style>
