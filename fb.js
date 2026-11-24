// Yönetici paneli için Firebase bağlantısı (canlı, kalıcı bağlantı kullanır).
// Öğrenci tarafı kalıcı bağlantı açmaz, bkz. oy.js.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getDatabase, ref, set, get, remove, onValue, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import { FIREBASE_CONFIG } from "./fb-config.js?v=5";

const app = initializeApp(FIREBASE_CONFIG);
export const db = getDatabase(app);
export const auth = getAuth(app);

/** Mevcut kullanıcıyı bekler (yoksa null). */
export const currentUser = () => new Promise(res => { const stop = onAuthStateChanged(auth, u => { stop(); res(u); }); });

/** Öğrenci için isimsiz giriş. */
export async function anonLogin(){ return (await currentUser()) || (await signInAnonymously(auth)).user; }

/** Yönetici için Google girişi. */
export async function googleLogin(){ return (await signInWithPopup(auth, new GoogleAuthProvider())).user; }

export { ref, set, get, remove, onValue, serverTimestamp, onAuthStateChanged, signOut };
