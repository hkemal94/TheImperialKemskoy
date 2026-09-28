import { t } from '../i18n';
import { OliveTree, PottedPlant, Shadow, Vine } from './art';

// Üst bölge: lobi görünümü.
const WINDOWS = [150, 390, 890, 1130];

export function Lobby() {
  return (
    <svg className="zone-svg" viewBox="0 0 1280 216" preserveAspectRatio="xMidYMid slice" role="img" aria-label={t('lobby.label')}>
      <title>{t('lobby.label')}</title>
      <defs>
        <linearGradient id="lb-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--wall-light)" />
          <stop offset="1" stopColor="var(--wall)" />
        </linearGradient>
        <linearGradient id="lb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--aegean)" />
          <stop offset="1" stopColor="var(--sky)" />
        </linearGradient>
        <linearGradient id="lb-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--sea)" />
          <stop offset="1" stopColor="var(--sea-deep)" />
        </linearGradient>
        <linearGradient id="lb-ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--sun)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--sun)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lb-door" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--sea)" />
          <stop offset="1" stopColor="var(--sage-dark)" />
        </linearGradient>
        <radialGradient id="lb-glow">
          <stop offset="0" stopColor="var(--sun)" stopOpacity="0.8" />
          <stop offset="1" stopColor="var(--sun)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Duvar, kornişler ve pilastrlar */}
      <rect width="1280" height="216" fill="url(#lb-wall)" />
      <rect width="1280" height="16" fill="var(--wall-shade)" />
      <rect y="16" width="1280" height="4" fill="var(--parchment)" />
      {Array.from({ length: 64 }, (_, i) => (
        <rect key={i} x={i * 20 + 4} y="10" width="10" height="6" fill="var(--wall)" />
      ))}
      {[270, 510, 770, 1010].map((x) => (
        <g key={x}>
          <rect x={x - 14} y="20" width="28" height="176" fill="var(--wall-light)" />
          <rect x={x + 6} y="20" width="8" height="176" fill="var(--wall-shade)" opacity="0.5" />
          <rect x={x - 18} y="20" width="36" height="8" fill="var(--parchment-shade)" />
        </g>
      ))}

      {/* Kemerli pencereler: gökyüzü, Ege, uzakta bir ada */}
      {WINDOWS.map((x, i) => (
        <g key={x} transform={`translate(${x - 60} 36)`}>
          <path d="M0 150 V50 A60 50 0 0 1 120 50 V150 Z" fill="url(#lb-sky)" />
          <path d={i % 2 ? 'M-4 106 Q30 92 58 104 Q70 100 80 106 Z' : 'M40 106 Q70 90 110 102 L124 106 Z'} fill="var(--sage-light)" opacity="0.7" />
          <rect y="106" width="120" height="44" fill="url(#lb-sea)" />
          <path d="M10 116 H40 M60 124 H100 M20 134 H56" stroke="var(--aegean)" strokeWidth="1.5" opacity="0.6" />
          <path d="M0 150 V50 A60 50 0 0 1 120 50 V150" fill="none" stroke="var(--frame)" strokeWidth="7" />
          <path d="M60 2 V150 M0 88 H120" stroke="var(--frame)" strokeWidth="3" />
          <rect x="-8" y="148" width="136" height="6" rx="1" fill="var(--parchment-shade)" />
        </g>
      ))}

      {/* Pencerelerden süzülen ışık */}
      {WINDOWS.map((x) => (
        <path key={x} d={`M${x - 56} 186 L${x + 56} 186 L${x + 110} 216 L${x - 10} 216 Z`} fill="url(#lb-ray)" />
      ))}

      {/* Giriş kapısı ve tabela */}
      <g transform="translate(560 30)">
        <path d="M-6 186 V80 A86 70 0 0 1 166 80 V186 Z" fill="var(--wall-shade)" />
        <path d="M10 186 V82 A70 56 0 0 1 150 82 V186 Z" fill="url(#lb-door)" />
        {Array.from({ length: 7 }, (_, i) => {
          const a = Math.PI + (i + 1) * (Math.PI / 8);
          return <path key={i} d={`M80 82 L${80 + Math.cos(a) * 66} ${82 + Math.sin(a) * 52}`} stroke="var(--brass)" strokeWidth="1.5" />;
        })}
        <path d="M10 82 H150" stroke="var(--brass)" strokeWidth="2.5" />
        <path d="M80 82 V186" stroke="var(--brass)" strokeWidth="3" />
        <path d="M10 186 V82 A70 56 0 0 1 150 82 V186" fill="none" stroke="var(--brass-dark)" strokeWidth="3" />
        <circle cx="72" cy="136" r="3" fill="var(--brass-light)" />
        <circle cx="88" cy="136" r="3" fill="var(--brass-light)" />
        <rect x="-30" y="0" width="220" height="26" rx="3" fill="var(--sage-dark)" stroke="var(--brass)" strokeWidth="1.5" />
        <text x="80" y="18" textAnchor="middle" className="sign-text">
          {t('game.title')}
        </text>
      </g>

      {/* Kornişten sarkan sarmaşıklar */}
      {[20, 96, 214, 330, 448, 486, 800, 830, 950, 1066, 1184, 1262].map((x, i) => (
        <Vine key={x} x={x} y={18} length={30 + ((i * 37) % 60)} seed={i + 3} />
      ))}

      {/* Avizeler ve ışıkları */}
      {[270, 1010].map((x) => (
        <g key={x} transform={`translate(${x} 20)`}>
          <circle cx="0" cy="30" r="34" fill="url(#lb-glow)" opacity="0.6" />
          <path d="M0 0 V14" stroke="var(--brass-dark)" strokeWidth="2" />
          <path d="M-30 22 Q0 40 30 22" stroke="var(--brass)" strokeWidth="2.5" fill="none" />
          <path d="M-18 26 Q0 34 18 26" stroke="var(--brass)" strokeWidth="1.5" fill="none" />
          <circle cx="0" cy="16" r="4" fill="var(--brass)" />
          {[-30, -15, 0, 15, 30].map((dx) => (
            <g key={dx}>
              <rect x={dx - 1.5} y={dx === 0 ? 26 : 16 + Math.abs(dx) / 6} width="3" height="6" fill="var(--parchment)" />
              <circle cx={dx} cy={dx === 0 ? 24 : 14 + Math.abs(dx) / 6} r="2.5" fill="var(--sun)" />
            </g>
          ))}
        </g>
      ))}

      {/* Mermer zemin: dama desenli */}
      <rect y="192" width="1280" height="24" fill="var(--marble)" />
      {Array.from({ length: 40 }, (_, i) => (
        <rect key={i} x={i * 32 + ((i % 2) * 0)} y={i % 2 ? 204 : 192} width="32" height="12" fill="var(--sage-light)" opacity="0.35" />
      ))}
      <path d="M0 192 H1280" stroke="var(--wall-shade)" strokeWidth="2" />

      {/* Koltuk ve sehpa */}
      <g transform="translate(300 150)">
        <Shadow cx={30} cy={46} rx={46} ry={5} />
        <rect x="0" y="0" width="60" height="30" rx="10" fill="var(--terracotta)" />
        <rect x="-8" y="16" width="76" height="22" rx="8" fill="var(--terracotta-dark)" />
        <rect x="-10" y="12" width="14" height="28" rx="6" fill="var(--terracotta)" />
        <rect x="56" y="12" width="14" height="28" rx="6" fill="var(--terracotta)" />
        <path d="M0 40 V46 M60 40 V46" stroke="var(--wood-dark)" strokeWidth="3" />
      </g>
      <g transform="translate(944 168)">
        <Shadow cx={20} cy={26} rx={24} ry={3} />
        <ellipse cx="20" cy="4" rx="22" ry="5" fill="var(--wood-light)" />
        <path d="M20 8 V24 M10 24 H30" stroke="var(--wood-dark)" strokeWidth="3" />
        <path d="M14 -6 H26 L24 2 H16 Z" fill="var(--sage)" />
        <path d="M20 -6 L14 -18 M20 -6 L20 -20 M20 -6 L26 -17" stroke="var(--leaf-dark)" strokeWidth="1.2" />
        <circle cx="14" cy="-19" r="3.5" fill="var(--rose)" />
        <circle cx="20" cy="-22" r="3.5" fill="var(--terracotta)" />
        <circle cx="26" cy="-18" r="3.5" fill="var(--rose)" />
      </g>

      {/* Saksıda zeytin ağaçları ve bitkiler */}
      <OliveTree x={40} y={156} height={120} seed={4} />
      <OliveTree x={1240} y={156} height={120} seed={11} />
      <PottedPlant x={528} y={170} size={40} seed={7} />
      <PottedPlant x={752} y={170} size={40} seed={13} />
    </svg>
  );
}
