import { getAuth, onAuthStateChanged, signInAnonymously, type User } from "firebase/auth";

let connecting: Promise<User> | null = null;

/**
 * Resolves once this browser has an anonymous Firebase identity, signing in on first use.
 * Cached, so concurrent callers share one sign-in rather than creating several users.
 */
export function currentUser(): Promise<User> {
  return (connecting ??= new Promise<User>((resolve, reject) => {
    const auth = getAuth();
    const stop = onAuthStateChanged(
      auth,
      (user) => {
        if (!user) {
          signInAnonymously(auth).catch(reject);
          return;
        }
        stop();
        resolve(user);
      },
      reject,
    );
  }));
}

/** Marks which sheets to list back to someone. Verified by the Firestore rules. */
export async function authorId(): Promise<string> {
  return (await currentUser()).uid;
}
