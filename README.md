# The Imperial Kemsköy

Birinci şahıs bir otel resepsiyonu simülasyonu. Yapı olarak *Papers, Please*
tarzında: masada oturuyorsunuz, misafirler geliyor, evrakla ve dönemin
araçlarıyla uğraşıyorsunuz.

- **Mekân:** 1954 yapımı, 20 odalı, eski ve lüks bir Ege oteli.
- **Dönem:** 2007 sonu – 2008.
- **Görsel stil:** 2D, vektörel, minimalist. Sakin Ege renkleri, dönem evrakı.
- **Kontrol:** Yalnızca fare.

> Şu anki durum: sadece iskelet var. Tek bir ekran çiziliyor, hiçbir şey
> henüz çalışmıyor (misafir, check-in, puan vb. sonraki adımlarda gelecek).

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
    ├── App.tsx             Ana ekran; üç bölgeyi alt alta dizer
    ├── styles.css          Renk paleti ve genel görünüm
    ├── components/         Ekran parçaları
    │   ├── Lobby.tsx       Üst bölge: lobi çizimi
    │   ├── GuestArea.tsx   Orta bölge: misafir alanı
    │   └── Desk.tsx        Alt bölge: masa ve üzerindeki araçlar
    ├── i18n/               Çeviriler (oyunda görünen bütün yazılar)
    │   ├── index.ts        Yazıları dosyadan okuyan küçük yardımcı
    │   └── tr.json         Türkçe yazılar
    └── data/               Oyun içeriği (buraya siz yazacaksınız)
        ├── rooms.json      Odalar (20 oda)
        ├── guests.json     Misafirler
        ├── days.json       Günler ve o gün gelecek misafirler
        └── dialogues.json  Diyaloglar
```

### İçerik (`src/data`)

Oyunun hikâyesi ve içeriği kodun içine yazılmaz; bu klasördeki JSON
dosyalarına yazılır. Şu an içlerinde yalnızca örnek birer kayıt var. İçeriği
doldurmak için kod bilmeniz gerekmez; dosyadaki kalıbı kopyalayıp
çoğaltmanız yeterli.

### Yazılar (`src/i18n`)

Ekranda görünen her yazı `tr.json` dosyasından gelir. Dosyada her satır
`"anahtar": "yazı"` biçimindedir; yalnızca sağdaki yazıyı değiştirin, soldaki
anahtara dokunmayın. İngilizce eklenirken aynı anahtarlarla bir `en.json`
dosyası oluşturulacak. Görsellerin içine yazı gömülmez.

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
