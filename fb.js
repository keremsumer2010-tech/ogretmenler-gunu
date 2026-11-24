// Firebase bağlantısı. Bu ayarlar herkese açık olacak şekilde tasarlanmıştır;
// asıl koruma veritabanı güvenlik kurallarındadır (database.rules.json).
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getDatabase, ref, set, get, remove, onValue, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

const app = initializeApp({
  apiKey: "AIzaSyAaEmfQccNjsTGMK0uPIdjLfnWafG_C6vY",
  authDomain: "ogretmenler-gunu-6ac60.firebaseapp.com",
  databaseURL: "https://ogretmenler-gunu-6ac60-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ogretmenler-gunu-6ac60",
  storageBucket: "ogretmenler-gunu-6ac60.firebasestorage.app",
  messagingSenderId: "538852037209",
  appId: "1:538852037209:web:f786f548216a95fc5dd748"
});
export const db = getDatabase(app);
export const auth = getAuth(app);

/** Mevcut kullanıcıyı bekler (yoksa null). */
export const currentUser = () => new Promise(res => { const stop = onAuthStateChanged(auth, u => { stop(); res(u); }); });

/** Öğrenci için isimsiz giriş. */
export async function anonLogin(){ return (await currentUser()) || (await signInAnonymously(auth)).user; }

/** Yönetici için Google girişi. */
export async function googleLogin(){ return (await signInWithPopup(auth, new GoogleAuthProvider())).user; }

export { ref, set, get, remove, onValue, serverTimestamp, onAuthStateChanged, signOut };
