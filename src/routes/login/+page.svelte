<script lang="ts">
  import { goto } from "$app/navigation";
  import { logIn, register, session } from "$lib/auth.svelte";
  import { localization } from "$i18n";

  let email = $state("");
  let password = $state("");
  let busy = $state(false);
  let error = $state("");

  async function submit(action: (email: string, password: string) => Promise<void>) {
    busy = true;
    error = "";
    try {
      await action(email, password);
      await goto("/sheets");
    } catch (thrown) {
      error = (thrown as { code?: string }).code ?? localization().ui.error;
      busy = false;
    }
  }
</script>

<svelte:head>
  <title>Flesh and Oil - Log In</title>
</svelte:head>

<main>
  <section class="login">
    <h1>{localization().auth.title}</h1>

    {#if session.signedIn}
      <p class="note">{localization().auth.already} {session.email}</p>
    {/if}

    <label>
      {localization().auth.email}
      <input type="email" autocomplete="email" bind:value={email} />
    </label>
    <label>
      {localization().auth.password}
      <input type="password" autocomplete="current-password" bind:value={password} />
    </label>

    {#if error}
      <p class="error">{error}</p>
    {/if}

    <button disabled={busy} onclick={() => submit(logIn)}>{localization().auth.log_in}</button>
    <button disabled={busy} onclick={() => submit(register)}>{localization().auth.sign_up}</button>

    <p class="note">{localization().auth.anonymous_warning}</p>
  </section>
</main>

<style lang="scss">
  main {
    max-width: 60ch;
    margin-inline: auto;
  }

  .login {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  h1 {
    margin: 0;
    text-align: center;
  }

  label {
    display: grid;
    grid-template-columns: 12ch auto;
    align-items: center;
    gap: 10px;
  }

  button {
    padding: 10px 0;
  }

  .note {
    margin: 0;
    text-align: center;
    opacity: 0.75;
  }

  .error {
    margin: 0;
    text-align: center;
    color: #e64444;
  }
</style>
