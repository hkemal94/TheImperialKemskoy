import { t } from '../i18n';

// Orta bölge: desk'e gelen misafir. Şimdilik boş bir yer tutucu siluet.
export function GuestArea() {
  return (
    <svg className="zone-svg" viewBox="0 0 1280 230" preserveAspectRatio="xMidYMid slice" role="img" aria-label={t('guest.label')}>
      <title>{t('guest.label')}</title>

      {/* Ahşap lambri */}
      <rect width="1280" height="230" fill="var(--panel)" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={20 + i * 140} y="24" width="120" height="170" rx="3" fill="none" stroke="var(--panel-line)" strokeWidth="2" />
      ))}

      {/* Misafir yer tutucusu: kesik çizgili siluet */}
      <g transform="translate(640 28) scale(0.8)" fill="none" stroke="var(--paper-ink-soft)" strokeWidth="2" strokeDasharray="6 6">
        <circle cx="0" cy="40" r="34" />
        <path d="M-90 190 Q-86 96 0 90 Q86 96 90 190" />
      </g>
      <text x="640" y="214" textAnchor="middle" className="hint-text">
        {t('guest.empty')}
      </text>
    </svg>
  );
}
