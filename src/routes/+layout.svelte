<script lang="ts">
  import "./global.scss";
  import { onMount } from "svelte";
  import { FirebaseApp } from "sveltefire";
  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  import { env } from "$env/dynamic/public";
  import { logOut, session, startSession } from "$lib/auth.svelte";
  import { db } from "$lib/db";
  import { localization } from "$i18n";

  // Not secrets: Firebase web config always ships to the browser. Kept out of the repo so
  // each deployment can point at its own project.
  const app = initializeApp({
    apiKey: env.PUBLIC_FIREBASE_API_KEY,
    authDomain: env.PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: env.PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: env.PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.PUBLIC_FIREBASE_APP_ID,
  });
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  db.firestore = firestore;

  // Every write needs an identity for the security rules to check.
  onMount(startSession);
</script>

<svelte:head>
  <title>Murder Drones: Flesh and Oil</title>
</svelte:head>

<header>
  <a data-sveltekit-reload class="buttonStyle" href="/"
    >Character Sheet Creator</a
  >
  <a data-sveltekit-reload class="buttonStyle" href="/sheets">My Sheets</a>
  <a data-sveltekit-reload class="buttonStyle" href="/rulebook">Rulebook</a>
  <span>
    {#if session.signedIn}
        <button class="buttonStyle auth" onclick={logOut}>{localization().auth.log_out}</button>
        <span class="who">{session.email}</span>
    {:else if session.ready}
        <a data-sveltekit-reload class="buttonStyle auth" href="/login">{localization().auth.log_in}</a>
    {/if}
  </span>
</header>

<FirebaseApp {auth} {firestore}>
  <slot />
</FirebaseApp>

<style lang="scss">

  header {
    display: flex;
    justify-content: center;
    column-gap: 20px;
    row-gap: 10px;
    width: 100%;
    padding: 10px;
    padding-top: 0;
    margin-bottom: 10px;
    flex-wrap: wrap;

    .buttonStyle {
      padding: 10px;
      text-decoration: none;
      font-size: 1.2rem;
    }

    .auth {
      padding-left: 10px;
      padding-right: 10px;
    }
    
    .who {
      opacity: 0.8;
      align-self: center;
    }
  }
  
  @media (max-width: 600px) {
    header {
      flex-direction: column;
    }
  }
</style>
