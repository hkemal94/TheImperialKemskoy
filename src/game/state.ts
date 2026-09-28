// Oyunun anlık durumu ve oyuncunun her tıklamasının bu durumu nasıl değiştirdiği.
import { DAYS, ROOMS } from './data';
import { evaluate, penaltyOf, type Interaction } from './rules';
import type { Day, ErrorCode, InHouse, Penalty, Reservation, RoomStatus, VisitResult } from './types';

export type Phase = 'start' | 'play' | 'slip' | 'summary';
export type SistemTab = 'arrivals' | 'inhouse' | 'rooms';

export interface GameState {
  phase: Phase;
  dayIndex: number;
  visitIndex: number;
  reservations: (Reservation & { checkedIn: boolean })[];
  inHouse: InHouse[];
  dirty: string[]; // bugün çıkış yapılıp kirli kalan odalar
  hooks: Record<string, string | null>; // kanca (oda no) → üzerinde asılı anahtar
  returnedKey: string | null; // çıkış yapan misafirin masaya bıraktığı anahtar
  holding: string | null; // oyuncunun elinde tuttuğu anahtar
  interaction: Interaction;
  sistemOpen: boolean;
  sistemTab: SistemTab;
  selected: string | null;
  sistemMessage: string | null;
  lastErrors: ErrorCode[];
  lastPenalty: Penalty;
  results: VisitResult[];
  satisfaction: { misafir: number; personel: number };
}

export type Action =
  | { type: 'START_DAY' }
  | { type: 'OPEN_SISTEM' }
  | { type: 'CLOSE_SISTEM' }
  | { type: 'SET_TAB'; tab: SistemTab }
  | { type: 'SELECT'; id: string }
  | { type: 'CHECKIN'; resId: string; message: string }
  | { type: 'CHECKOUT'; guest: string; message: string }
  | { type: 'CLICK_HOOK'; room: string }
  | { type: 'PICK_RETURNED_KEY' }
  | { type: 'FAREWELL' }
  | { type: 'REJECT' }
  | { type: 'NEXT' }
  | { type: 'RESTART' };

export function addDays(iso: string, n: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

export function currentDay(s: GameState): Day {
  return DAYS[s.dayIndex];
}

export function roomStatus(s: GameState, room: string): RoomStatus {
  const r = ROOMS.find((x) => x.number === room);
  if (r?.status === 'bakim') return 'bakim';
  if (s.inHouse.some((h) => h.room === room)) return 'dolu';
  if (s.dirty.includes(room)) return 'kirli';
  return 'temiz';
}

export function initialState(dayIndex = 0): GameState {
  const day = DAYS[dayIndex];
  const occupied = new Set(day.inHouse.map((h) => h.room));
  const hooks: Record<string, string | null> = {};
  for (const r of ROOMS) hooks[r.number] = occupied.has(r.number) ? null : r.number;
  return {
    phase: 'start',
    dayIndex,
    visitIndex: 0,
    reservations: day.reservations.map((r) => ({ ...r, checkedIn: false })),
    inHouse: [...day.inHouse],
    dirty: [],
    hooks,
    returnedKey: null,
    holding: null,
    interaction: {},
    sistemOpen: false,
    sistemTab: 'arrivals',
    selected: null,
    sistemMessage: null,
    lastErrors: [],
    lastPenalty: { misafir: 0, personel: 0 },
    results: [],
    satisfaction: { misafir: 100, personel: 100 },
  };
}

// Sıradaki misafiri masaya getirir: çıkış yapacaksa anahtarını masaya bırakır.
function arrive(s: GameState): GameState {
  const day = currentDay(s);
  const visit = day.visits[s.visitIndex];
  if (!visit) return { ...s, phase: 'summary', sistemOpen: false };
  const stay = visit.purpose === 'checkout' ? s.inHouse.find((h) => h.guest === visit.guest) : undefined;
  return {
    ...s,
    phase: 'play',
    interaction: {},
    returnedKey: stay ? stay.room : null,
    holding: null,
    selected: null,
    sistemMessage: null,
  };
}

// Misafirle işlem bitti: kurallara göre değerlendir, cezaları uygula.
function finish(s: GameState, decision: 'farewell' | 'reject'): GameState {
  const day = currentDay(s);
  const visit = day.visits[s.visitIndex];
  const errors = evaluate(day, visit, decision, s.interaction, s.reservations, s.inHouse.concat(checkedOutToday(s, visit.guest)));
  const penalty = penaltyOf(errors);

  // Asılmayan iade anahtarı kaybolmasın: başka bir personel kendi kancasına asar.
  const hooks = { ...s.hooks };
  const stray = s.holding ?? s.returnedKey;
  if (stray && hooks[stray] === null) hooks[stray] = stray;
  // Geri çevrilen misafir, eline verilen anahtarı masaya bırakıp gider.
  const given = s.interaction.keyGiven;
  if (decision === 'reject' && given && hooks[given] === null) hooks[given] = given;

  return {
    ...s,
    phase: 'slip',
    hooks,
    returnedKey: null,
    holding: null,
    sistemOpen: false,
    lastErrors: errors,
    lastPenalty: penalty,
    results: [...s.results, { guest: visit.guest, purpose: visit.purpose, errors }],
    satisfaction: {
      misafir: Math.max(0, s.satisfaction.misafir - penalty.misafir),
      personel: Math.max(0, s.satisfaction.personel - penalty.personel),
    },
  };
}

// Çıkışı bu misafirle yapılmış bir kayıt, değerlendirme için geri eklenir.
function checkedOutToday(s: GameState, guestId: string): InHouse[] {
  const day = currentDay(s);
  const original = day.inHouse.find((h) => h.guest === guestId);
  if (!original || s.inHouse.some((h) => h.guest === guestId)) return [];
  return [original];
}

export function reducer(s: GameState, a: Action): GameState {
  switch (a.type) {
    case 'START_DAY':
      return arrive(s);
    case 'OPEN_SISTEM':
      return s.phase === 'play' ? { ...s, sistemOpen: true } : s;
    case 'CLOSE_SISTEM':
      return { ...s, sistemOpen: false };
    case 'SET_TAB':
      return { ...s, sistemTab: a.tab, selected: null, sistemMessage: null };
    case 'SELECT':
      return { ...s, selected: a.id, sistemMessage: null };

    case 'CHECKIN': {
      const res = s.reservations.find((r) => r.id === a.resId);
      if (!res || res.checkedIn) return s;
      return {
        ...s,
        reservations: s.reservations.map((r) => (r.id === res.id ? { ...r, checkedIn: true } : r)),
        inHouse: [...s.inHouse, { guest: res.guest, room: res.room, departure: addDays(res.arrival, res.nights) }],
        interaction: { ...s.interaction, checkedInRes: res.id },
        selected: null,
        sistemMessage: a.message,
      };
    }

    case 'CHECKOUT': {
      const stay = s.inHouse.find((h) => h.guest === a.guest);
      if (!stay) return s;
      return {
        ...s,
        inHouse: s.inHouse.filter((h) => h.guest !== a.guest),
        dirty: [...s.dirty, stay.room],
        interaction: { ...s.interaction, checkedOutGuest: a.guest },
        selected: null,
        sistemMessage: a.message,
      };
    }

    case 'PICK_RETURNED_KEY':
      if (s.phase !== 'play' || !s.returnedKey) return s;
      return { ...s, holding: s.returnedKey, returnedKey: null };

    case 'CLICK_HOOK': {
      if (s.phase !== 'play') return s;
      const onHook = s.hooks[a.room];
      // Elde anahtar varken boş kancaya tıklamak: anahtarı oraya asar.
      if (s.holding) {
        if (onHook) return s;
        return {
          ...s,
          hooks: { ...s.hooks, [a.room]: s.holding },
          holding: null,
          interaction: { ...s.interaction, keyHungOn: a.room },
        };
      }
      // Eli boşken dolu kancaya tıklamak: anahtarı misafire verir.
      if (!onHook) return s;
      const hooks = { ...s.hooks, [a.room]: null };
      const previous = s.interaction.keyGiven;
      if (previous) hooks[previous] = previous; // önce verileni geri as
      return { ...s, hooks, interaction: { ...s.interaction, keyGiven: onHook } };
    }

    case 'FAREWELL':
      return s.phase === 'play' ? finish(s, 'farewell') : s;
    case 'REJECT':
      return s.phase === 'play' ? finish(s, 'reject') : s;

    case 'NEXT': {
      if (s.phase !== 'slip') return s;
      // Misafire verilen anahtar misafirle gider; kanca boş kalır.
      return arrive({ ...s, visitIndex: s.visitIndex + 1 });
    }

    case 'RESTART':
      return initialState(s.dayIndex);
  }
}
