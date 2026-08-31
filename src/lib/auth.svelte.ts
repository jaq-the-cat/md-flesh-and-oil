import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { env } from "$env/dynamic/public";

const dmEmails = (env.PUBLIC_DM_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

let current = $state<User | null>(null);
let ready = $state(false);

/**
 * Everyone gets an identity: anonymous by default, so a shared sheet stays editable, and a
 * real account once signed in, which is what creating your own sheet requires.
 */
export const session = {
  get ready() {
    return ready;
  },
  get user() {
    return current;
  },
  get uid() {
    return current?.uid ?? null;
  },
  get email() {
    return current?.email ?? null;
  },
  get signedIn() {
    return current !== null && !current.isAnonymous;
  },
  /** Hides the DM page from other players. Not security: the sheets stay world-readable. */
  get isDm() {
    const email = current?.email?.toLowerCase();
    return email != null && dmEmails.includes(email);
  },
};

/** Starts tracking the signed-in user. Returns the unsubscribe. */
export function startSession() {
  const auth = getAuth();
  return onAuthStateChanged(auth, (user) => {
    current = user;
    ready = true;
    // Signed out entirely, including just after logging out: fall back to anonymous.
    if (!user) signInAnonymously(auth).catch(() => {});
  });
}

export async function register(email: string, password: string) {
  await createUserWithEmailAndPassword(getAuth(), email, password);
}

export async function logIn(email: string, password: string) {
  await signInWithEmailAndPassword(getAuth(), email, password);
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(getAuth(), email);
}

export async function logOut() {
  await signOut(getAuth());
}
