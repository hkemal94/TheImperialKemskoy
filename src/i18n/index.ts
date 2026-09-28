// Çeviri sistemi. Oyunda görünen her yazı buradan geçer.
// Yeni dil eklemek için: en.json dosyasını tr.json ile aynı anahtarlarla
// oluşturup aşağıdaki "languages" listesine eklemek yeterli.
import tr from './tr.json';

const languages = { tr } as const;

export type Language = keyof typeof languages;
export type TextKey = keyof typeof tr;

let current: Language = 'tr';

export function setLanguage(lang: Language) {
  current = lang;
}

// Anahtarı verilen yazıyı döndürür. Anahtar bulunamazsa anahtarın kendisi
// görünür; böylece eksik çeviri ekranda hemen fark edilir.
export function t(key: TextKey): string {
  const table: Record<string, string> = languages[current];
  return table[key] ?? key;
}
