import { t } from '../i18n';

// Üst bölge: lobi görünümü. Geçici SVG çizim.
export function Lobby() {
  const windows = [150, 390, 890, 1130];

  return (
    <svg className="zone-svg" viewBox="0 0 1280 216" preserveAspectRatio="xMidYMid slice" role="img" aria-label={t('lobby.label')}>
      <title>{t('lobby.label')}</title>

      {/* Badana duvar */}
      <rect width="1280" height="216" fill="var(--wall)" />
      <rect y="0" width="1280" height="14" fill="var(--wall-shade)" />

      {/* Kemerli pencereler: gökyüzü ve Ege */}
      {windows.map((x) => (
        <g key={x} transform={`translate(${x - 60} 34)`}>
          <path d="M0 150 V50 A60 50 0 0 1 120 50 V150 Z" fill="var(--sky)" />
          <rect x="0" y="108" width="120" height="42" fill="var(--sea)" />
          <path d="M0 108 H120" stroke="var(--sea-light)" strokeWidth="2" />
          <path d="M0 150 V50 A60 50 0 0 1 120 50 V150" fill="none" stroke="var(--frame)" strokeWidth="6" />
          <path d="M60 2 V150 M0 90 H120" stroke="var(--frame)" strokeWidth="3" />
        </g>
      ))}

      {/* Giriş kapısı ve tabela */}
      <g transform="translate(560 40)">
        <rect x="-30" y="-8" width="220" height="26" rx="2" fill="var(--wood-dark)" />
        <text x="80" y="10" textAnchor="middle" className="sign-text">
          {t('game.title')}
        </text>
        <path d="M10 176 V70 A70 50 0 0 1 150 70 V176 Z" fill="var(--wall-shade)" />
        <path d="M22 176 V74 A58 42 0 0 1 138 74 V176 Z" fill="var(--sea-deep)" opacity="0.85" />
        <path d="M80 34 V176" stroke="var(--brass)" strokeWidth="3" />
      </g>

      {/* Avizeler */}
      {[270, 1010].map((x) => (
        <g key={x} transform={`translate(${x} 14)`} stroke="var(--brass)" fill="none" strokeWidth="2">
          <path d="M0 0 V12" />
          <path d="M-26 20 Q0 34 26 20" />
          <circle cx="-26" cy="18" r="3" fill="var(--brass)" />
          <circle cx="0" cy="26" r="3" fill="var(--brass)" />
          <circle cx="26" cy="18" r="3" fill="var(--brass)" />
        </g>
      ))}

      {/* Saksıda palmiye */}
      {[40, 1240].map((x) => (
        <g key={x} transform={`translate(${x} 120)`}>
          <path d="M0 40 Q-30 10 -40 -20 M0 40 Q-10 0 -8 -40 M0 40 Q20 0 34 -26 M0 40 Q30 20 44 4" stroke="var(--olive)" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M-18 40 H18 L12 76 H-12 Z" fill="var(--terracotta)" />
        </g>
      ))}

      {/* Mermer zemin */}
      <rect y="196" width="1280" height="20" fill="var(--marble)" />
      <path d="M0 196 H1280" stroke="var(--wall-shade)" strokeWidth="2" />
    </svg>
  );
}
