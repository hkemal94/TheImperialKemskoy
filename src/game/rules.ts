// Oyunun kuralları: bir misafirle işlem bittiğinde neyin doğru, neyin hata
// olduğuna burada karar verilir. Her hata iki memnuniyetten birini (ya da ikisini) düşürür.
import type { Day, ErrorCode, InHouse, Penalty, Reservation, Visit } from './types';

export const PENALTIES: Record<ErrorCode, Penalty> = {
  gecerli_misafir_reddedildi: { misafir: 15, personel: 0 },
  rezervasyon_yok: { misafir: 0, personel: 15 },
  tarih_tutmuyor: { misafir: 0, personel: 15 },
  kayitsiz_anahtar: { misafir: 0, personel: 10 },
  aciklama_yapilmadi: { misafir: 5, personel: 0 },
  giris_yapilmadi: { misafir: 0, personel: 10 },
  yanlis_rezervasyon: { misafir: 5, personel: 10 },
  anahtar_verilmedi: { misafir: 10, personel: 0 },
  yanlis_anahtar: { misafir: 10, personel: 5 },
  cikis_reddedildi: { misafir: 10, personel: 0 },
  cikis_yapilmadi: { misafir: 0, personel: 10 },
  yanlis_cikis: { misafir: 5, personel: 15 },
  anahtar_asilmadi: { misafir: 0, personel: 5 },
  yanlis_kanca: { misafir: 0, personel: 5 },
  gereksiz_anahtar: { misafir: 0, personel: 5 },
};

// Misafirle yapılan işlemler: oyuncunun o misafir masadayken yaptıkları.
export interface Interaction {
  checkedInRes?: string; // Sistem'de giriş yapılan rezervasyon
  checkedOutGuest?: string; // Sistem'de çıkışı yapılan misafir
  keyGiven?: string; // misafire verilen anahtar (oda numarası)
  keyHungOn?: string; // iade edilen anahtarın asıldığı kanca
}

export function validReservation(day: Day, reservations: Reservation[], guestId: string) {
  return reservations.find((r) => r.guest === guestId && r.arrival === day.date);
}

export function evaluate(
  day: Day,
  visit: Visit,
  decision: 'farewell' | 'reject',
  it: Interaction,
  reservations: Reservation[],
  inHouseAtStart: InHouse[],
): ErrorCode[] {
  const errors: ErrorCode[] = [];

  if (visit.purpose === 'checkin') {
    const valid = validReservation(day, reservations, visit.guest);
    const anyRes = reservations.find((r) => r.guest === visit.guest);

    if (decision === 'reject') {
      if (valid) errors.push('gecerli_misafir_reddedildi');
      else if (it.checkedInRes) errors.push(anyRes ? 'tarih_tutmuyor' : 'rezervasyon_yok');
      return errors;
    }

    if (!valid) {
      if (it.checkedInRes) errors.push(anyRes ? 'tarih_tutmuyor' : 'rezervasyon_yok');
      else if (it.keyGiven) errors.push('kayitsiz_anahtar');
      else errors.push('aciklama_yapilmadi');
      return errors;
    }

    if (!it.checkedInRes) errors.push('giris_yapilmadi');
    else if (it.checkedInRes !== valid.id) errors.push('yanlis_rezervasyon');
    if (!it.keyGiven) errors.push('anahtar_verilmedi');
    else if (it.keyGiven !== valid.room) errors.push('yanlis_anahtar');
    return errors;
  }

  // Check-out
  const record = inHouseAtStart.find((h) => h.guest === visit.guest);
  if (decision === 'reject') {
    errors.push('cikis_reddedildi');
    return errors;
  }
  if (!it.checkedOutGuest) errors.push('cikis_yapilmadi');
  else if (it.checkedOutGuest !== visit.guest) errors.push('yanlis_cikis');
  if (record) {
    if (!it.keyHungOn) errors.push('anahtar_asilmadi');
    else if (it.keyHungOn !== record.room) errors.push('yanlis_kanca');
  }
  if (it.keyGiven) errors.push('gereksiz_anahtar');
  return errors;
}

export function penaltyOf(errors: ErrorCode[]): Penalty {
  return errors.reduce(
    (sum, e) => ({ misafir: sum.misafir + PENALTIES[e].misafir, personel: sum.personel + PENALTIES[e].personel }),
    { misafir: 0, personel: 0 },
  );
}
