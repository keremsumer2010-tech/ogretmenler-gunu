// Ana sitedeki her cevabı isimsiz olarak kaydeder (her kişi her soruya bir kez).
import { db, anonLogin, ref, set, serverTimestamp } from "./fb.js";

let userP = null;
const user = () => (userP = userP || anonLogin().catch(e => { userP = null; throw e; }));
user().catch(() => {}); // sayfa açılınca arka planda giriş yap

window.kaydetOy = async (q, k) => {
  try{
    const u = await user();
    await set(ref(db, `votes/${q}/${u.uid}`), { k, t: serverTimestamp() });
  }catch(e){ /* daha önce oy verdiyse ya da internet yoksa oyun etkilenmesin */ }
};
