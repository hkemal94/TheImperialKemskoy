// Oyunun veri tipleri. İçerik src/data altındaki JSON dosyalarından gelir.

export type Purpose = 'checkin' | 'checkout';
export type RoomType = 'standart' | 'suite' | 'deluxe';
export type RoomStatus = 'temiz' | 'dolu' | 'kirli' | 'bakim';

export interface Room {
  number: string;
  floor: number;
  type: string;
  status: string; // "hazir" | "bakim"
}

export interface Guest {
  id: string;
  name: string;
  nationality: string;
  color: string;
}

export interface Reservation {
  id: string;
  guest: string;
  arrival: string;
  nights: number;
  roomType: string;
  room: string;
}

export interface InHouse {
  guest: string;
  room: string;
  departure: string;
}

export interface Visit {
  guest: string;
  purpose: Purpose;
  line: string;
}

export interface Day {
  id: string;
  date: string;
  managerNote: string;
  actions: string[];
  reservations: Reservation[];
  inHouse: InHouse[];
  visits: Visit[];
}

// Hata kodları: metinleri tr.json'da "error.<kod>" anahtarında.
export type ErrorCode =
  | 'gecerli_misafir_reddedildi'
  | 'rezervasyon_yok'
  | 'tarih_tutmuyor'
  | 'kayitsiz_anahtar'
  | 'aciklama_yapilmadi'
  | 'giris_yapilmadi'
  | 'yanlis_rezervasyon'
  | 'anahtar_verilmedi'
  | 'yanlis_anahtar'
  | 'cikis_reddedildi'
  | 'cikis_yapilmadi'
  | 'yanlis_cikis'
  | 'anahtar_asilmadi'
  | 'yanlis_kanca'
  | 'gereksiz_anahtar';

export interface Penalty {
  misafir: number;
  personel: number;
}

export interface VisitResult {
  guest: string;
  purpose: Purpose;
  errors: ErrorCode[];
}
