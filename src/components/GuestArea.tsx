import { t } from '../i18n';
import { PottedPlant, Vine } from './art';

// Orta bölge: desk'e gelen misafir. Arkada resepsiyonun karşı duvarı.
// Misafir, kendi renginde sade bir siluet; masa boşken kesik çizgili yer tutucu.
export function GuestArea({ guestColor }: { guestColor?: string }) {
  return (
    <svg className="zone-svg" viewBox="0 0 1280 230" preserveAspectRatio="xMidYMid slice" role="img" aria-label={t('guest.label')}>
      <title>{t('guest.label')}</title>
      <defs>
        <linearGradient id="ga-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--wall)" />
          <stop offset="1" stopColor="var(--wall-shade)" />
        </linearGradient>
        <linearGradient id="ga-paint-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--rose)" />
          <stop offset="1" stopColor="var(--aegean)" />
        </linearGradient>
        <radialGradient id="ga-glow">
          <stop offset="0" stopColor="var(--sun)" stopOpacity="0.7" />
          <stop offset="1" stopColor="var(--sun)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ga-guest" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--sage-dark)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--sage-dark)" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* Üst duvar: ince çizgili duvar kâğıdı */}
      <rect width="1280" height="230" fill="url(#ga-wall)" />
      {Array.from({ length: 80 }, (_, i) => (
        <rect key={i} x={i * 16 + 7} y="0" width="2" height="110" fill="var(--wall-shade)" opacity="0.45" />
      ))}

      {/* Alt duvar: adaçayı yeşili lambri */}
      <rect y="110" width="1280" height="120" fill="var(--sage)" />
      <rect y="106" width="1280" height="8" fill="var(--wood-light)" />
      <rect y="112" width="1280" height="2" fill="var(--wood-dark)" opacity="0.4" />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <rect x={16 + i * 128} y="126" width="112" height="80" rx="2" fill="none" stroke="var(--sage-dark)" strokeWidth="2" />
          <rect x={22 + i * 128} y="132" width="100" height="68" rx="2" fill="none" stroke="var(--sage-light)" strokeWidth="1" opacity="0.6" />
        </g>
      ))}

      {/* Ege manzaralı tablo */}
      <g transform="translate(150 22)">
        <rect x="-8" y="-8" width="196" height="84" fill="var(--brass)" />
        <rect x="-4" y="-4" width="188" height="76" fill="var(--brass-dark)" />
        <rect width="180" height="68" fill="url(#ga-paint-sky)" />
        <circle cx="130" cy="30" r="10" fill="var(--sun)" opacity="0.9" />
        <path d="M0 44 Q40 30 80 40 Q110 34 140 44 L180 42 V68 H0 Z" fill="var(--sage-light)" />
        <path d="M0 52 H180 V68 H0 Z" fill="var(--sea)" />
        <path d="M40 58 l10 -12 l10 12 Z" fill="var(--parchment)" />
        <path d="M50 46 V58" stroke="var(--wood-dark)" strokeWidth="1" />
      </g>

      {/* Duvar saati */}
      <g transform="translate(1080 56)">
        <circle r="30" fill="var(--brass)" />
        <circle r="25" fill="var(--parchment)" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <path key={i} d={`M${Math.cos(a) * 19} ${Math.sin(a) * 19} L${Math.cos(a) * 23} ${Math.sin(a) * 23}`} stroke="var(--ink)" strokeWidth={i % 3 ? 1 : 2} />;
        })}
        <path d="M0 0 L0 -15" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M0 0 L11 6" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
        <circle r="2" fill="var(--brass-dark)" />
      </g>

      {/* Aplikler */}
      {[470, 810].map((x) => (
        <g key={x} transform={`translate(${x} 40)`}>
          <circle cy="10" r="40" fill="url(#ga-glow)" opacity="0.7" />
          <rect x="-6" y="24" width="12" height="18" rx="3" fill="var(--brass)" />
          <path d="M0 24 V12" stroke="var(--brass-dark)" strokeWidth="2" />
          <path d="M-12 12 H12 L7 -4 H-7 Z" fill="var(--parchment)" />
          <path d="M-12 12 H12" stroke="var(--brass)" strokeWidth="2" />
        </g>
      ))}

      {/* Köşelerde bitkiler */}
      <PottedPlant x={46} y={174} size={70} seed={21} />
      <PottedPlant x={1232} y={174} size={70} seed={27} />
      <Vine x={300} y={0} length={14} seed={31} />
      <Vine x={980} y={0} length={18} seed={33} />

      {guestColor ? (
        <g transform="translate(640 34) scale(0.9)" className="guest-figure">
          <path d="M-96 220 Q-92 104 0 96 Q92 104 96 220 Z" fill={guestColor} />
          <path d="M-96 220 Q-92 104 0 96 Q-40 120 -52 220 Z" fill="var(--shadow)" opacity="0.15" />
          <path d="M-20 98 L0 132 L20 98" fill="var(--parchment)" opacity="0.85" />
          <rect x="-11" y="74" width="22" height="26" fill="var(--rose)" />
          <circle cx="0" cy="46" r="38" fill="var(--rose)" />
          <path d="M-38 44 Q-36 4 0 6 Q36 4 38 44 Q30 22 0 20 Q-30 22 -38 44 Z" fill={guestColor} opacity="0.9" />
        </g>
      ) : (
        <>
          <g transform="translate(640 34) scale(0.9)">
            <path d="M-96 220 Q-92 104 0 96 Q92 104 96 220 Z" fill="url(#ga-guest)" />
            <circle cx="0" cy="46" r="38" fill="url(#ga-guest)" />
            <g fill="none" stroke="var(--parchment)" strokeWidth="2" strokeDasharray="6 6" opacity="0.9">
              <circle cx="0" cy="46" r="38" />
              <path d="M-96 220 Q-92 104 0 96 Q92 104 96 220" />
            </g>
          </g>
          <rect x="470" y="198" width="340" height="24" rx="12" fill="var(--sage-dark)" opacity="0.75" />
          <text x="640" y="215" textAnchor="middle" className="hint-text">
            {t('guest.empty')}
          </text>
        </>
      )}
    </svg>
  );
}
