<script lang="ts">
  import { goto } from "$app/navigation";
  import { logIn, register, resetPassword, session } from "$lib/auth.svelte";
  import { localization } from "$i18n";

  let email = $state("");
  let password = $state("");
  let busy = $state(false);
  let error = $state("");
  let sent = $state(false);

  const reason = (thrown: unknown) => (thrown as { code?: string }).code ?? localization().ui.error;

  async function submit(action: (email: string, password: string) => Promise<void>) {
    busy = true;
    error = "";
    sent = false;
    try {
      await action(email, password);
      await goto("/sheets");
    } catch (thrown) {
      error = reason(thrown);
      busy = false;
    }
  }

  async function forgot() {
    busy = true;
    error = "";
    sent = false;
    try {
      await resetPassword(email);
      sent = true;
    } catch (thrown) {
      error = reason(thrown);
    }
    busy = false;
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
    {#if sent}
      <p class="note">{localization().auth.reset_sent} {email}</p>
    {/if}

    <button disabled={busy} onclick={() => submit(logIn)}>{localization().auth.log_in}</button>
    <button disabled={busy} onclick={() => submit(register)}>{localization().auth.sign_up}</button>
    <button class="forgot" disabled={busy || !email} onclick={forgot}>
      {localization().auth.forgot}
    </button>

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

  .forgot {
    border: none;
    padding: 0;
    font-size: 0.9em;
    opacity: 0.8;
    text-decoration: underline;
  }

  .forgot:disabled {
    text-decoration: none;
    opacity: 0.4;
    cursor: default;
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
