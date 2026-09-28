// JSON içerik dosyalarını tek yerden, tipleriyle birlikte yükler.
import roomsData from '../data/rooms.json';
import guestsData from '../data/guests.json';
import daysData from '../data/days.json';
import dialoguesData from '../data/dialogues.json';
import { getLanguage } from '../i18n';
import type { Day, Guest, Purpose, Room } from './types';

export const ROOMS: Room[] = roomsData.rooms;
export const DAYS: Day[] = daysData.days.map((d) => ({
  ...d,
  visits: d.visits.map((v) => ({ ...v, purpose: v.purpose as Purpose })),
}));

const guestById = new Map<string, Guest>(guestsData.guests.map((g) => [g.id, g]));

export function guest(id: string): Guest {
  return guestById.get(id) ?? { id, name: id, nationality: '', color: '#888888' };
}

// Diyalog metni, oyunun o anki dilinde. O dilde yoksa Türkçesi gösterilir.
const dialogueById = new Map<string, Record<string, string>>(
  dialoguesData.dialogues.map((d) => [d.id, d as Record<string, string>]),
);

export function line(id: string): string {
  const d = dialogueById.get(id);
  if (!d) return id;
  return d[getLanguage()] || d.tr || id;
}
