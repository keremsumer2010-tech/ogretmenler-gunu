/* =========================================================
   SORULAR — hem ana sitede hem yönetici panelinde kullanılır
   answer : doğru şıkkın sırası (0 = ilk şık, 1 = ikinci, 2 = üçüncü...)
   icon   : img/ klasöründeki ikon
   images : (isteğe bağlı) şıkların yanında baş harf yerine görünecek fotoğraflar
   ekstra : true ise okulun hocası değildir (teşekkür kartı listesinde çıkmaz)
   ⚠ Sırayı değiştirirsen yönetici panelinden "Oyları sıfırla" de (oylar soru sırasıyla tutulur).
   ========================================================= */
window.SORULAR = [
  { q:"Hangisi aynı zamanda inşaat mühendisi?",              icon:"construction", options:["Saip Bülent Yaşar","Özlem Yılmaz"],            answer:1 },
  { q:"Hangisi kayınvalide?",                                icon:"oldwoman",     options:["Buğu İzlem Tanık","Nurhan Genç"],              answer:1 },
  { q:"Aşağıdakilerden hangisi eskiden öğretmendir?",        icon:"soccer",       options:["Şenol Güneş","Fatih Terim"],                    answer:0, ekstra:true },
  { q:"Hangisi aynı zamanda hemşire?",                       icon:"stethoscope",  options:["Çilem Dişli","Meryem Tufanoğlu"],              answer:1 },
  { q:"Hangisi Uzakdoğulu?",                                 icon:"lantern",      options:["Mutlu Demirbaş","Pınar Karataş"],               answer:0 },
  { q:"Hangisi sınıf öğretmenliği yaptı?",                   icon:"abacus",       options:["Fahrettin Kavilcioğlu","Yakup Kayalı"],         answer:1 },
  { q:"Sanatçılardan hangisi öğretmen değildir?",            icon:"microphone",   options:["Şener Şen","Candan Erçetin","Hakkı Bulut","İbrahim Tatlıses"], answer:3, ekstra:true },
  { q:"Hangisi radyo programcısıdır?",                       icon:"radio",        options:["Seval Akbaba","Halil Yıldırım"],                answer:1 },
  { q:"Hangisinin tıp okuyan çocuğu yok?",                   icon:"xray",         options:["Yasemin Ertaş","Aysu Gündüz","Demet Özçelik"], answer:2 },
  { q:"Siyasetçilerden hangisi öğretmen değildir?",          icon:"building",     options:["Meral Akşener","Muharrem İnce","Hakan Fidan"],  answer:2, ekstra:true },
  { q:"Hangisi yaratıcı drama eğitimi almıştır?",            icon:"drama",        options:["Mustafa Aydın","Dilek Manav"],                  answer:0 },
  { q:"Hangisi fen bilgisi öğretmenliği okumuştur?",         icon:"microscope",   options:["Meltem Çimen Savaş","Yankı Kurt"],              answer:0 },
  { q:"Türkiye'nin Başöğretmeni kimdir?",                    icon:"cap",          options:["MUSTAFA KEMAL ATATÜRK"], images:["img/ataturk-renkli.png"], answer:0, ekstra:true },
];
