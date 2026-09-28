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

export function getLanguage(): Language {
  return current;
}

// Anahtarı verilen yazıyı döndürür. {ad} gibi yer tutucular "vars" ile doldurulur.
// Anahtar bulunamazsa anahtarın kendisi görünür; eksik çeviri hemen fark edilir.
export function t(key: TextKey | string, vars?: Record<string, string | number>): string {
  const table: Record<string, string> = languages[current];
  let text = table[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) text = text.split(`{${k}}`).join(String(v));
  return text;
}

// "2008-10-06" → "Pazartesi, 6 Ekim 2008"
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return `${t(`weekday.${weekday}`)}, ${d} ${t(`month.${m}`)} ${y}`;
}

// "2008-10-06" → "06.10.2008"
export function shortDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}
