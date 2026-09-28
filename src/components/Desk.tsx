import { t } from '../i18n';
import roomsData from '../data/rooms.json';

// Alt bölge: resepsiyon masası ve üzerindeki dönem araçları.
// Her araç ayrı bir <g> grubu; ileride tıklanabilir hale getirilecekler.
export function Desk() {
  return (
    <svg className="zone-svg" viewBox="0 0 1280 274" preserveAspectRatio="xMidYMid slice" role="img" aria-label={t('desk.label')}>
      <title>{t('desk.label')}</title>

      {/* Masa yüzeyi */}
      <rect width="1280" height="274" fill="var(--wood)" />
      <rect width="1280" height="10" fill="var(--wood-edge)" />
      {[60, 130, 200].map((y) => (
        <path key={y} d={`M0 ${y} Q640 ${y + 8} 1280 ${y}`} stroke="var(--wood-grain)" strokeWidth="1.5" fill="none" />
      ))}

      <Phone />
      <Ledger />
      <Monitor />
      <CardMachine />
      <Calculator />
      <KeyBoard />
      <CashDrawer />
    </svg>
  );
}

function Phone() {
  return (
    <g transform="translate(40 60)">
      <title>{t('desk.phone')}</title>
      <path d="M10 120 L30 40 H130 L150 120 Z" fill="var(--bakelite)" />
      <rect x="0" y="16" width="160" height="30" rx="14" fill="var(--bakelite)" stroke="var(--bakelite-hi)" strokeWidth="2" />
      <circle cx="80" cy="86" r="26" fill="var(--paper)" />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return <circle key={i} cx={80 + Math.cos(a) * 17} cy={86 + Math.sin(a) * 17} r="3.5" fill="var(--bakelite)" />;
      })}
      {/* Spiral kablo */}
      <path d="M150 110 q8 10 0 20 q-8 10 0 20 q8 10 0 20" stroke="var(--bakelite)" strokeWidth="3" fill="none" />
    </g>
  );
}

function Ledger() {
  return (
    <g transform="translate(230 70) rotate(-4)">
      <title>{t('desk.ledger')}</title>
      <rect x="-6" y="-6" width="182" height="142" rx="4" fill="var(--leather)" />
      <rect x="0" y="0" width="84" height="130" fill="var(--paper)" />
      <rect x="86" y="0" width="84" height="130" fill="var(--paper)" />
      <path d="M85 0 V130" stroke="var(--paper-shade)" strokeWidth="2" />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M8 ${16 + i * 11} H78 M94 ${16 + i * 11} H164`} stroke="var(--paper-rule)" strokeWidth="1" />
      ))}
      <path d="M8 10 V124" stroke="var(--terracotta)" strokeWidth="1" />
    </g>
  );
}

function Monitor() {
  return (
    <g transform="translate(450 16)">
      <title>{t('desk.monitor.title')}</title>
      {/* Tüplü monitör kasası */}
      <path d="M40 200 H340 L320 226 H60 Z" fill="var(--beige-dark)" />
      <rect x="0" y="0" width="380" height="204" rx="14" fill="var(--beige)" />
      <rect x="22" y="16" width="336" height="164" rx="10" fill="var(--screen)" />
      <circle cx="350" cy="192" r="4" fill="var(--led)" />

      {/* Kurgusal otel yönetim sistemi ekranı */}
      <g className="screen-text">
        <rect x="22" y="16" width="336" height="20" fill="var(--screen-bar)" />
        <text x="36" y="31">{t('desk.monitor.title')}</text>
        <text x="36" y="62">{t('desk.monitor.date')}: 01.11.2007</text>
        <text x="36" y="82">
          {t('desk.monitor.occupancy')}: 0/{roomsData.rooms.length}
        </text>
        <text x="36" y="164">{t('desk.monitor.status')}_</text>
      </g>
    </g>
  );
}

function CardMachine() {
  return (
    <g transform="translate(870 110)">
      <title>{t('desk.cardMachine')}</title>
      <rect x="0" y="0" width="90" height="120" rx="10" fill="var(--grey-dark)" />
      <rect x="12" y="12" width="66" height="26" rx="2" fill="var(--lcd)" />
      <rect x="10" y="-4" width="70" height="8" rx="3" fill="var(--grey-mid)" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x={14 + (i % 3) * 22} y={48 + Math.floor(i / 3) * 16} width="16" height="11" rx="2" fill="var(--grey-mid)" />
      ))}
    </g>
  );
}

function Calculator() {
  return (
    <g transform="translate(980 124) rotate(6)">
      <title>{t('desk.calculator')}</title>
      <rect x="0" y="0" width="78" height="106" rx="6" fill="var(--beige-dark)" />
      <rect x="8" y="8" width="62" height="20" rx="2" fill="var(--lcd)" />
      {Array.from({ length: 16 }, (_, i) => (
        <rect key={i} x={8 + (i % 4) * 16} y={36 + Math.floor(i / 4) * 16} width="12" height="12" rx="2" fill={i % 4 === 3 ? 'var(--terracotta)' : 'var(--beige)'} />
      ))}
    </g>
  );
}

function KeyBoard() {
  const rooms = roomsData.rooms;
  const perRow = 10;
  return (
    <g transform="translate(1080 20)">
      <title>{t('desk.keys')}</title>
      <rect x="0" y="0" width="186" height="236" rx="4" fill="var(--wood-dark)" />
      <rect x="8" y="8" width="170" height="220" fill="var(--felt)" />
      {rooms.map((room, i) => {
        const col = Math.floor(i / perRow);
        const row = i % perRow;
        const x = 30 + col * 84;
        const y = 22 + row * 20;
        return (
          <g key={room.number} transform={`translate(${x} ${y})`}>
            <circle cx="0" cy="0" r="2.5" fill="var(--brass)" />
            <path d="M0 2 V7" stroke="var(--brass)" strokeWidth="1.5" />
            <rect x="4" y="-6" width="34" height="12" rx="6" fill="var(--brass)" />
            <text x="21" y="3.5" textAnchor="middle" className="key-text">
              {room.number}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function CashDrawer() {
  return (
    <g transform="translate(470 246)">
      <title>{t('desk.cashDrawer')}</title>
      <rect x="0" y="0" width="340" height="28" fill="var(--wood-edge)" />
      <rect x="140" y="10" width="60" height="7" rx="3" fill="var(--brass)" />
    </g>
  );
}
