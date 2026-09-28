# The Imperial Kemsköy

Birinci şahıs bir otel resepsiyonu simülasyonu. Yapı olarak *Papers, Please*
tarzında: masada oturuyorsunuz, misafirler geliyor, evrakla ve dönemin
araçlarıyla uğraşıyorsunuz.

- **Mekân:** 1954 yapımı, 20 odalı, eski ve lüks bir Ege oteli.
- **Dönem:** Ekim 2008, "Sezon Sonu" (6–19 Ekim 2008, 14 gün). Düzada evreninin
  aktif dönemiyle aynı; ayrıntılar Kems Komuta Merkezi wikisinde, otel maddesinde.
- **Görsel stil:** 2D, vektörel; aydınlık ve bitkisel bir Ege havası (adaçayı
  yeşili, terakota, parşömen, pirinç). Figma'daki "bright-botanical-blueprint"
  çalışması atmosfer referansıdır, doğrudan oyuna alınmaz.
- **Kontrol:** Yalnızca fare.

> Şu anki durum: **1. gün oynanabilir.** Check-in, check-out ve rezervasyonu
> Sistem'den kontrol etme var. Hatalar misafir ve personel memnuniyetini düşürür;
> her misafirden sonra bir tutanak, gün sonunda bir özet ekranı çıkar.

## Nasıl oynanır

1. Gün başında müdürün notunu oku, **Güne başla**'ya bas.
2. Misafir ne istediğini söyler. **Monitöre** tıkla, Sistem açılır.
   - *Gelişler*: bugün ve ileriki günler için rezervasyonlar. Tarihi bugün olana giriş yapılır.
   - *Konaklayanlar*: oteldeki misafirler. Çıkış buradan yapılır.
   - *Odalar*: odaların durumu (temiz, dolu, kirli, bakımda).
3. Check-in: rezervasyonu seç → **Check-in yap** → panodan o odanın anahtarına tıkla.
4. Check-out: misafiri seç → **Check-out yap** → masadaki iade anahtarına, sonra kendi boş kancasına tıkla.
5. Rezervasyonu olmayan ya da tarihi tutmayan misafire **Üzgünüm…** cevabını ver.
6. İşin bitince misafiri uğurla. Tutanakta ne doğru, ne yanlış yazar.

## Ekran düzeni

Ekran üç yatay bölgeden oluşur:

1. **Üst – Lobi:** Otelin lobisi; pencerelerden deniz görünür.
2. **Orta – Misafir:** Desk'e gelen misafir burada durur.
3. **Alt – Masa:** Resepsiyon masası ve üzerindeki araçlar: tüplü monitör
   (kurgusal otel yönetim sistemi), kablolu telefon, anahtar panosu, kayıt
   defteri, kredi kartı makinesi, hesap makinesi, kasa çekmecesi.

## Klasörler ne işe yarıyor?

```
.
├── index.html              Tarayıcının açtığı ana sayfa (oyunu içine yükler)
├── package.json            Projenin kullandığı paketlerin listesi ve komutlar
├── vite.config.ts          Vite (geliştirme/derleme aracı) ayarları
├── vercel.json             Vercel'in oyunu nasıl derleyip yayınlayacağı
├── tsconfig*.json          TypeScript (kod dili) ayarları
└── src/                    Oyunun kaynak kodu
    ├── main.tsx            Başlangıç noktası; oyunu sayfaya yerleştirir
    ├── App.tsx             Ana ekran; üç bölgeyi ve açılan panelleri dizer
    ├── game/               Oyunun beyni (görüntüden bağımsız)
    │   ├── types.ts        Veri tipleri: misafir, rezervasyon, gün, hata kodları
    │   ├── data.ts         JSON içerik dosyalarını yükler
    │   ├── rules.ts        Kurallar: neyin hata olduğu ve kaç puan düşürdüğü
    │   └── state.ts        Oyunun anlık durumu; her tıklamanın ne değiştirdiği
    ├── styles.css          Renk paleti ve genel görünüm
    ├── components/         Ekran parçaları
    │   ├── art.tsx         Ortak çizimler: yaprak, sarmaşık, saksı, gölge
    │   ├── Lobby.tsx       Üst bölge: lobi çizimi
    │   ├── GuestArea.tsx   Orta bölge: misafir alanı
    │   ├── Desk.tsx        Alt bölge: masa ve üzerindeki araçlar
    │   ├── Sistem.tsx      Monitörde açılan kurgusal otel yönetim sistemi
    │   └── Panels.tsx      Gün başı, konuşma balonu, tutanak, gün sonu
    ├── i18n/               Çeviriler (oyunda görünen bütün yazılar)
    │   ├── index.ts        Yazıları dosyadan okuyan küçük yardımcı
    │   └── tr.json         Türkçe yazılar
    └── data/               Oyun içeriği (buraya siz yazacaksınız)
        ├── rooms.json      Odalar: 4 kat × 5 oda (x01–x05), wikiyle aynı düzen
        ├── guests.json     Misafirler (ad, uyruk, siluet rengi)
        ├── days.json       Günler: tarih, açık işlemler, rezervasyonlar,
        │                   oteldekiler ve masaya gelen misafirlerin sırası
        └── dialogues.json  Diyaloglar ("tr" alanı; İngilizce için "en" eklenecek)
```

### İçerik (`src/data`)

Oyunun hikâyesi ve içeriği kodun içine yazılmaz; bu klasördeki JSON
dosyalarına yazılır. Şu an 1. gün için örnek misafirler ve rezervasyonlar var. İçeriği
doldurmak için kod bilmeniz gerekmez; dosyadaki kalıbı kopyalayıp
çoğaltmanız yeterli.

### Yazılar (`src/i18n`)

Ekranda görünen her yazı `tr.json` dosyasından gelir. Dosyada her satır
`"anahtar": "yazı"` biçimindedir; yalnızca sağdaki yazıyı değiştirin, soldaki
anahtara dokunmayın. İngilizce eklenirken aynı anahtarlarla bir `en.json`
dosyası oluşturulacak. Görsellerin içine yazı gömülmez.

## Tasarım (Figma)

Görsel tasarımlar Figma'da tutulur:
[Kemsköy Tasarım](https://www.figma.com/design/A8sB4u37VEpVI4GG4VHs2p)

Dosyada renk paleti, 1280×720 oyun ekranı ve her masa aracı ayrı çerçeve
olarak durur. Çerçevenin adı, oyuna konacak SVG dosyasının adıdır
(örn. `telefon`). Yeniden çizilen bir araç Figma'dan SVG olarak dışa
aktarılıp oyuna eklenir.

## Çalıştırmak için

Bilgisayarda [Node.js](https://nodejs.org) kurulu olmalı. Sonra proje
klasöründe terminalden:

```
npm install      # ilk seferde bir kez: gerekli paketleri indirir
npm run dev      # oyunu tarayıcıda açılacak şekilde başlatır
npm run build    # hatasız derlendiğini kontrol eder, dist/ klasörüne paketler
```

## Kurallar

- Gerçek marka adı veya logo kullanılmaz; ekrandaki sistemler kurgusaldır.
- İçerik `src/data`, yazılar `src/i18n` içinde tutulur.
- Masaüstü (Steam) paketi ileride eklenecek.
