// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  User,  
  getAuth, 
  initializeAuth,
  browserLocalPersistence,
  browserPopupRedirectResolver, 
} from "firebase/auth";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbPQwxdhhJMQqjCqZIiYKIYCnqSYpDYKw",
  authDomain: "clone-d89d0.firebaseapp.com",
  projectId: "clone-d89d0",
  appId: "1:973189094120:web:b94a81eff916055200875d"
};

// Initialize Firebase
const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp();

export const auth = (() => {
  try {
    return initializeAuth(app, {
      persistence: browserLocalPersistence,
      popupRedirectResolver: browserPopupRedirectResolver,
    });
  } catch {
    return getAuth(app);
  }
})();

export const functions = getFunctions(app, "us-central1");


/**
 * Signs the user in with a Google popup.
 * @returns A promise that resolves with the user's credentials.
 */
export function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}


/**
 * Signs the user out.
 * @returns A promise that resolves when the user is signed out.
 */
export function signOut() {
  return auth.signOut();
}

/**
 * Trigger a callback when user auth state changes.
 * @returns A function to unsubscribe callback.
 */
export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}