# CLAUDE.md — The Imperial Kemskoy (oyun)

Bu depoda çalışan her oturum önce bu dosyayı, sonra `README.md`'yi okur.
Oyunun ne olduğu, teknolojisi ve klasörleri README'de; burada tekrar edilmez.
Tasarım belgesi henüz yok; açılınca oyunun tek kaynağı o olur.

## Kim için

Kemal. Kodlama deneyimi yok. Açıklamalar Türkçe, sade, teknik terimsiz;
kodu değil ekranda ne değiştiğini anlat.

## Kim yazar

Kems Ajans'ın oyun departmanı. Her değişiklik **ayrı dalda**
(`ajans/<kısa-konu>`) ve öneri PR'ı ile gelir; ana dala Kemal birleştirir.
Ana dala yazılmaz, zorla gönderilmez. PR açıklaması Türkçe: ekranda ne
değişti, nasıl denenir, Kemal'in yapacağı bir şey var mı. Denenmeyen iş
"denenmedi" diye yazılır.

## Kesin kurallar

- Kurgu metni, ad, slogan yazılmaz; karakter, mekân, misafir adları Kemal'in.
  Gerekirse `[Kemal]` diye boş bırakılır.
- Uydurma sayı yok. Değerler Kemal onaylayınca girer.
- Düzada bilgisi yalnız KKM'deki `docs/03-duzada-kunyesi.md`'den alınır;
  orada yazmayan bilgi uydurulmaz.
- Yazım Kemsköy (ö), Düzada (ü). Tek istisna oyunun adı: The Imperial Kemskoy.
- Otel 1954 yapımıdır (vikideki bilgi, Kemal'in kararı).
- Ekrandaki her yazı `src/i18n/tr.json`'dan gelir; koda gömülmez (README).
- Oyun verisi vikiye girmez.
- Kararı verilmemiş konu: sor, seçme.
