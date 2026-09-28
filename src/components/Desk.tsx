import { shortDate, t } from '../i18n';
import roomsData from '../data/rooms.json';
import { Shadow } from './art';

// Alt bölge: resepsiyon masası ve üzerindeki dönem araçları.
// Monitör Sistem'i açar; anahtar panosu ve iade edilen anahtar tıklanabilir.
export interface DeskProps {
  date?: string;
  occupancy?: number;
  hooks?: Record<string, string | null>;
  returnedKey?: string | null;
  holding?: boolean;
  onMonitor?: () => void;
  onHook?: (room: string) => void;
  onReturnedKey?: () => void;
}

export function Desk(p: DeskProps) {
  return (
    <svg className="zone-svg" viewBox="0 0 1280 274" preserveAspectRatio="xMidYMid slice" role="img" aria-label={t('desk.label')}>
      <title>{t('desk.label')}</title>
      <defs>
        <linearGradient id="dk-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--wood-light)" />
          <stop offset="1" stopColor="var(--wood)" />
        </linearGradient>
        <linearGradient id="dk-beige" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--beige)" />
          <stop offset="1" stopColor="var(--beige-dark)" />
        </linearGradient>
        <radialGradient id="dk-screen" cx="0.5" cy="0.45" r="0.7">
          <stop offset="0" stopColor="var(--screen-glow)" />
          <stop offset="1" stopColor="var(--screen)" />
        </radialGradient>
        <linearGradient id="dk-brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--brass-light)" />
          <stop offset="1" stopColor="var(--brass-dark)" />
        </linearGradient>
        <pattern id="dk-scan" width="4" height="3" patternUnits="userSpaceOnUse">
          <rect width="4" height="1" fill="var(--shadow)" opacity="0.18" />
        </pattern>
      </defs>

      {/* Masa yüzeyi ve tezgâhın mermer kenarı */}
      <rect width="1280" height="274" fill="url(#dk-wood)" />
      {[48, 92, 150, 196, 236].map((y, i) => (
        <path key={y} d={`M0 ${y} C320 ${y + (i % 2 ? 6 : -4)} 900 ${y + (i % 2 ? -5 : 7)} 1280 ${y}`} stroke="var(--wood-grain)" strokeWidth="1.2" fill="none" opacity="0.7" />
      ))}
      <rect width="1280" height="14" fill="var(--marble)" />
      <rect y="14" width="1280" height="4" fill="var(--marble-vein)" />
      <path d="M80 4 Q200 10 320 6 M620 3 Q760 11 900 5" stroke="var(--marble-vein)" strokeWidth="1" fill="none" />
      <rect y="18" width="1280" height="6" fill="var(--shadow)" opacity="0.12" />

      <Phone />
      <Ledger />
      <Monitor date={p.date} occupancy={p.occupancy} onClick={p.onMonitor} />
      <CardMachine />
      <Calculator />
      <KeyBoard hooks={p.hooks} holding={p.holding} onHook={p.onHook} />
      <CashDrawer />
      {p.returnedKey && <ReturnedKey room={p.returnedKey} onClick={p.onReturnedKey} />}
    </svg>
  );
}

// Tuşlu, kablolu masa telefonu (2000'lerin otel telefonu).
export function Phone() {
  return (
    <g transform="translate(36 64)">
      <title>{t('desk.phone')}</title>
      <Shadow cx={84} cy={160} rx={90} ry={8} />
      <path d="M4 150 L20 40 H148 L164 150 Z" fill="url(#dk-beige)" />
      <path d="M20 40 H148 L152 56 H16 Z" fill="var(--beige)" />
      {/* Ahize */}
      <path d="M8 18 Q84 4 160 18 L162 38 Q150 44 140 38 L136 30 Q84 24 32 30 L28 38 Q18 44 6 38 Z" fill="var(--beige)" stroke="var(--beige-deep)" strokeWidth="1.5" />
      {/* Küçük ekran ve tuşlar */}
      <rect x="36" y="64" width="54" height="16" rx="2" fill="var(--lcd)" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={38 + (i % 3) * 18} y={88 + Math.floor(i / 3) * 14} width="14" height="10" rx="2" fill="var(--parchment)" stroke="var(--beige-deep)" strokeWidth="0.8" />
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <g key={i}>
          <rect x={104} y={66 + i * 18} width="40" height="11" rx="2" fill="var(--beige-deep)" />
          <circle cx={150} cy={71.5 + i * 18} r="2.5" fill={i === 0 ? 'var(--led)' : 'var(--beige-deep)'} />
        </g>
      ))}
      {/* Spiral kablo */}
      <path d="M6 34 q-8 6 -2 12 q6 6 -2 12 q-8 6 -2 12 q6 6 -2 12 q-8 6 -2 12 q6 6 0 14" stroke="var(--beige-deep)" strokeWidth="2.5" fill="none" />
    </g>
  );
}

export function Ledger() {
  return (
    <g transform="translate(232 70) rotate(-4)">
      <title>{t('desk.ledger')}</title>
      <Shadow cx={88} cy={142} rx={96} ry={8} />
      <rect x="-8" y="-6" width="186" height="146" rx="5" fill="var(--leather)" />
      <rect x="-8" y="-6" width="186" height="146" rx="5" fill="none" stroke="var(--brass)" strokeWidth="1" opacity="0.6" />
      <rect x="0" y="0" width="84" height="132" fill="var(--parchment)" />
      <rect x="86" y="0" width="84" height="132" fill="var(--parchment)" />
      <rect x="76" y="0" width="18" height="132" fill="var(--parchment-shade)" opacity="0.6" />
      <path d="M85 0 V132" stroke="var(--parchment-shade)" strokeWidth="2" />
      {Array.from({ length: 11 }, (_, i) => (
        <path key={i} d={`M8 ${16 + i * 10.5} H78 M94 ${16 + i * 10.5} H164`} stroke="var(--paper-rule)" strokeWidth="0.8" />
      ))}
      <path d="M14 8 V126 M100 8 V126" stroke="var(--terracotta)" strokeWidth="0.8" />
      {/* Bir kaç satır el yazısı karalama */}
      {[27, 37.5, 48, 58.5].map((y, i) => (
        <path key={y} d={`M18 ${y - 2} q6 -4 12 0 t12 0 t12 0 ${i % 2 ? 't10 0' : 't12 0 t8 0'}`} stroke="var(--ink-blue)" strokeWidth="0.9" fill="none" opacity="0.7" />
      ))}
      {/* Kurdele ayraç ve dolma kalem */}
      <path d="M128 132 V152 L133 146 L138 152 V132 Z" fill="var(--terracotta)" />
      <g transform="translate(106 100) rotate(-28)">
        <rect x="0" y="-3" width="64" height="6" rx="3" fill="var(--sage-dark)" />
        <rect x="44" y="-3" width="4" height="6" fill="var(--brass)" />
        <path d="M64 -3 L74 0 L64 3 Z" fill="var(--brass-light)" />
      </g>
    </g>
  );
}

// Tüplü monitör: kurgusal otel yönetim sistemi.
export function Monitor({ date, occupancy, onClick }: { date?: string; occupancy?: number; onClick?: () => void }) {
  return (
    <g transform="translate(450 20)" className={onClick ? 'clickable' : undefined} onClick={onClick}>
      <title>{t('desk.monitor.title')}</title>
      <Shadow cx={190} cy={226} rx={190} ry={10} opacity={0.25} />
      <path d="M60 196 H320 L340 222 H40 Z" fill="var(--beige-dark)" />
      <path d="M40 222 H340 V228 H40 Z" fill="var(--beige-deep)" />
      <rect x="0" y="0" width="380" height="204" rx="16" fill="url(#dk-beige)" />
      <rect x="4" y="4" width="372" height="10" rx="5" fill="var(--parchment)" opacity="0.35" />
      <rect x="18" y="14" width="344" height="168" rx="12" fill="var(--beige-deep)" />
      <rect x="24" y="18" width="332" height="160" rx="10" fill="url(#dk-screen)" />
      <rect x="24" y="18" width="332" height="160" rx="10" fill="url(#dk-scan)" />
      <path d="M36 26 Q120 20 220 24" stroke="var(--screen-text)" strokeWidth="6" opacity="0.06" fill="none" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={40 + i * 10} y="188" width="5" height="10" rx="2" fill="var(--beige-deep)" opacity="0.6" />
      ))}
      <circle cx="352" cy="193" r="4" fill="var(--led)" />
      <circle cx="352" cy="193" r="7" fill="var(--led)" opacity="0.25" />

      <g className="screen-text">
        <rect x="24" y="18" width="332" height="22" rx="0" fill="var(--screen-bar)" />
        <text x="38" y="34" className="screen-title">
          {t('desk.monitor.title')}
        </text>
        <text x="38" y="66">
          {t('desk.monitor.date')}: {date ? shortDate(date) : '06.10.2008'}
        </text>
        <text x="38" y="86">
          {t('desk.monitor.occupancy')}: {occupancy ?? 0}/{roomsData.rooms.length}
        </text>
        <text x="38" y="164">{t('desk.monitor.status')}_</text>
      </g>
    </g>
  );
}

// Kredi kartı POS cihazı, üstünde fiş rulosu.
export function CardMachine() {
  return (
    <g transform="translate(868 104)">
      <title>{t('desk.cardMachine')}</title>
      <Shadow cx={47} cy={128} rx={52} ry={6} />
      <path d="M18 2 H76 V-10 Q76 -16 70 -16 H24 Q18 -16 18 -10 Z" fill="var(--parchment)" />
      <path d="M26 -16 V-8 M36 -16 V-10 M46 -16 V-8" stroke="var(--paper-rule)" strokeWidth="0.8" />
      <rect x="0" y="0" width="94" height="124" rx="12" fill="var(--grey-dark)" />
      <rect x="0" y="0" width="94" height="10" rx="5" fill="var(--grey-mid)" opacity="0.5" />
      <rect x="12" y="14" width="70" height="28" rx="3" fill="var(--lcd)" />
      <rect x="12" y="14" width="70" height="6" rx="3" fill="var(--parchment)" opacity="0.2" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={15 + (i % 3) * 23} y={50 + Math.floor(i / 3) * 15} width="17" height="10" rx="2" fill="var(--grey-mid)" />
      ))}
      <rect x="15" y="110" width="17" height="8" rx="2" fill="var(--terracotta)" />
      <rect x="38" y="110" width="17" height="8" rx="2" fill="var(--brass)" />
      <rect x="61" y="110" width="17" height="8" rx="2" fill="var(--leaf)" />
    </g>
  );
}

export function Calculator() {
  return (
    <g transform="translate(982 124) rotate(6)">
      <title>{t('desk.calculator')}</title>
      <Shadow cx={40} cy={110} rx={44} ry={5} />
      <rect x="0" y="0" width="80" height="108" rx="7" fill="url(#dk-beige)" />
      <rect x="10" y="6" width="28" height="7" rx="1" fill="var(--wood-dark)" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${17 + i * 6} 6 V13`} stroke="var(--wood-grain)" strokeWidth="0.8" />
      ))}
      <rect x="8" y="16" width="64" height="18" rx="2" fill="var(--lcd)" />
      {Array.from({ length: 16 }, (_, i) => (
        <rect key={i} x={8 + (i % 4) * 16.5} y={40 + Math.floor(i / 4) * 16} width="13" height="12" rx="2" fill={i % 4 === 3 ? 'var(--terracotta)' : 'var(--parchment)'} stroke="var(--beige-deep)" strokeWidth="0.6" />
      ))}
    </g>
  );
}

// Anahtar panosu: her sütun bir kat. Bakımdaki odaların anahtarlığı terakota.
// Anahtarı alınmış kanca boş görünür; elde anahtar varken boş kancalar parlar.
export function KeyBoard({ hooks, holding, onHook }: { hooks?: Record<string, string | null>; holding?: boolean; onHook?: (room: string) => void }) {
  const floors = Array.from(new Set(roomsData.rooms.map((r) => r.floor)));
  return (
    <g transform="translate(1078 22)">
      <title>{t('desk.keys')}</title>
      <Shadow cx={96} cy={244} rx={100} ry={7} />
      <rect x="0" y="0" width="192" height="238" rx="5" fill="var(--wood-dark)" />
      <rect x="4" y="4" width="184" height="230" rx="3" fill="none" stroke="var(--brass)" strokeWidth="1" opacity="0.7" />
      <rect x="10" y="10" width="172" height="218" fill="var(--felt)" />
      {floors.map((floor, col) =>
        roomsData.rooms
          .filter((r) => r.floor === floor)
          .map((room, row) => {
            const x = 32 + col * 43;
            const y = 22 + row * 42;
            const key = hooks ? hooks[room.number] : room.number;
            const tag = room.status === 'bakim' ? 'var(--terracotta)' : 'url(#dk-brass)';
            const active = onHook && (holding ? !key : !!key);
            return (
              <g
                key={room.number}
                transform={`translate(${x} ${y})`}
                className={active ? 'clickable' : undefined}
                onClick={active ? () => onHook!(room.number) : undefined}
              >
                <rect x="-18" y="-6" width="36" height="44" fill="transparent" />
                {holding && !key && <rect x="-14" y="-5" width="28" height="42" rx="6" fill="var(--sun)" opacity="0.25" />}
                <circle r="3" fill="var(--brass-light)" />
                {!key && (
                  <text x="0" y="29" textAnchor="middle" className="hook-text">
                    {room.number}
                  </text>
                )}
                {key && (
                  <g>
                    <path d="M0 3 Q-5 8 0 12 Q5 8 0 3" stroke="var(--brass)" strokeWidth="1.2" fill="none" />
                    <rect x="-11" y="12" width="22" height="24" rx="6" fill={key === room.number ? tag : 'var(--rose)'} />
                    <circle cx="0" cy="16" r="1.6" fill="var(--wood-dark)" />
                    <text x="0" y="29" textAnchor="middle" className="key-text">
                      {key}
                    </text>
                  </g>
                )}
              </g>
            );
          }),
      )}
    </g>
  );
}

// Çıkış yapan misafirin masaya bıraktığı anahtar.
function ReturnedKey({ room, onClick }: { room: string; onClick?: () => void }) {
  return (
    <g transform="translate(1020 72) rotate(-14)" className="clickable returned-key" onClick={onClick}>
      <title>{t('desk.returnedKey')}</title>
      <Shadow cx={0} cy={16} rx={20} ry={4} opacity={0.3} />
      <circle cx="-18" cy="0" r="6" fill="none" stroke="var(--brass-light)" strokeWidth="2" />
      <rect x="-12" y="-12" width="30" height="24" rx="7" fill="url(#dk-brass)" />
      <text x="3" y="4" textAnchor="middle" className="key-text">
        {room}
      </text>
    </g>
  );
}

export function CashDrawer() {
  return (
    <g transform="translate(470 250)">
      <title>{t('desk.cashDrawer')}</title>
      <rect x="0" y="0" width="340" height="24" fill="var(--wood-dark)" />
      <rect x="4" y="3" width="332" height="18" fill="var(--wood)" />
      <rect x="140" y="8" width="60" height="7" rx="3.5" fill="url(#dk-brass)" />
      <circle cx="310" cy="12" r="3.5" fill="var(--brass)" />
      <rect x="309" y="11" width="2" height="5" fill="var(--wood-dark)" />
    </g>
  );
}
