// Ana sitedeki her cevabı isimsiz olarak kaydeder (her kişi her soruya bir kez)
// ve yöneticinin hangi soruların doğru cevabını açıkladığını canlı dinler.
import { db, anonLogin, ref, set, onValue, serverTimestamp } from "./fb.js";

let userP = null;
const user = () => (userP = userP || anonLogin().catch(e => { userP = null; throw e; }));
user().catch(() => {}); // sayfa açılınca arka planda giriş yap

window.kaydetOy = async (q, k) => {
  try{
    const u = await user();
    await set(ref(db, `votes/${q}/${u.uid}`), { k, t: serverTimestamp() });
  }catch(e){ /* daha önce oy verdiyse ya da internet yoksa oyun etkilenmesin */ }
};

// reveal/{soru} = true → o sorunun doğru cevabı öğrencilere gösterilir
onValue(ref(db, "reveal"), s => {
  dispatchEvent(new CustomEvent("cevaplar-acildi", { detail: s.val() || {} }));
}, () => { /* okunamazsa cevaplar gizli kalır */ });
