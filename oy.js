// Öğrenci tarafı: her cevabı isimsiz kaydeder, açıklanan cevapları kontrol eder.
// Ücretsiz Firebase planı aynı anda en fazla 100 kalıcı bağlantıya izin verdiği için
// öğrenci telefonları KALICI bağlantı açmaz: oy tek seferlik REST isteğiyle gider,
// "açıklandı mı" bilgisi birkaç saniyede bir kısa bir sorguyla okunur.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { FIREBASE_CONFIG } from "./fb-config.js?v=5";

const DB = FIREBASE_CONFIG.databaseURL;
const auth = getAuth(initializeApp(FIREBASE_CONFIG));

let userP = null;
// Önce kayıtlı oturumu bekle; yalnızca hiç oturum yoksa isimsiz giriş yap
// (aynı tarayıcıda açık olan yönetici oturumunu ezmemek için)
const user = () => (userP = userP || new Promise((res, rej) => {
  const stop = onAuthStateChanged(auth, u => {
    stop();
    if(u) res(u);
    else signInAnonymously(auth).then(c => res(c.user), e => { userP = null; rej(e); });
  });
}));
user().catch(() => {}); // sayfa açılınca arka planda giriş yap

// Oy gönder (her soru için bir kez; ağ hatasında birkaç kez dener)
window.kaydetOy = async (q, k) => {
  for(let attempt = 0; attempt < 4; attempt++){
    try{
      const u = await user(), token = await u.getIdToken();
      const r = await fetch(`${DB}/votes/${q}/${u.uid}.json?auth=${token}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ k, t: { ".sv": "timestamp" } })
      });
      if(r.ok || r.status === 401 || r.status === 403) return; // 401/403: zaten oy vermiş
    }catch(e){ /* internet kesintisi: biraz bekleyip tekrar dene */ }
    await new Promise(r => setTimeout(r, 1500 * (attempt + 1)));
  }
};

// Açıklanan cevapları 3 saniyede bir kontrol et (sekme arka plandayken durur)
let last = "";
async function poll(){
  if(!document.hidden){
    try{
      const r = await fetch(`${DB}/reveal.json`, { cache: "no-store" });
      if(r.ok){
        const txt = await r.text();
        if(txt !== last){ last = txt; dispatchEvent(new CustomEvent("cevaplar-acildi", { detail: JSON.parse(txt) || {} })); }
      }
    }catch(e){ /* bir sonraki turda tekrar dener */ }
  }
  setTimeout(poll, 3000);
}
poll();
