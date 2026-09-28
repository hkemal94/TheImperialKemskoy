import type { Dispatch } from 'react';
import { formatDate, t } from '../i18n';
import { DAYS, guest, line } from '../game/data';
import { PENALTIES } from '../game/rules';
import { currentDay, type Action, type GameState } from '../game/state';

// Oyunun üzerine açılan kâğıt paneller: gün başı, misafir konuşması, tutanak, gün sonu.

export function DayStart({ s, dispatch }: { s: GameState; dispatch: Dispatch<Action> }) {
  const day = currentDay(s);
  return (
    <div className="overlay">
      <div className="paper paper-start">
        <p className="paper-kicker">{t('start.day', { n: s.dayIndex + 1 })}</p>
        <h1>{formatDate(day.date)}</h1>
        <h2>{t('start.note')}</h2>
        <p className="paper-note">{line(day.managerNote)}</p>
        <h2>{t('start.tasks')}</h2>
        <ul>
          {day.actions.map((a) => (
            <li key={a}>{t(`action.${a}`)}</li>
          ))}
        </ul>
        <p className="paper-hint">{t('start.howto')}</p>
        <button className="paper-button" onClick={() => dispatch({ type: 'START_DAY' })}>
          {t('start.button')}
        </button>
      </div>
    </div>
  );
}

// Masadaki misafirin konuşma balonu ve oyuncunun cevapları.
export function GuestPanel({ s, dispatch }: { s: GameState; dispatch: Dispatch<Action> }) {
  const day = currentDay(s);
  const visit = day.visits[s.visitIndex];
  if (!visit) return null;
  const g = guest(visit.guest);
  return (
    <div className="guest-ui">
      <span className="guest-counter">{t('guest.counter', { i: s.visitIndex + 1, n: day.visits.length })}</span>
      <div className="bubble">
        <strong>{g.name}</strong>
        <p>{line(visit.line)}</p>
      </div>
      {s.interaction.keyGiven && <span className="key-note">{t('desk.keyGiven', { room: s.interaction.keyGiven })}</span>}
      <div className="replies">
        <button onClick={() => dispatch({ type: 'REJECT' })}>{t(`reply.reject.${visit.purpose}`)}</button>
        <button onClick={() => dispatch({ type: 'FAREWELL' })}>{t(`reply.farewell.${visit.purpose}`)}</button>
      </div>
    </div>
  );
}

export function Slip({ s, dispatch }: { s: GameState; dispatch: Dispatch<Action> }) {
  const day = currentDay(s);
  const last = s.visitIndex + 1 >= day.visits.length;
  const ok = s.lastErrors.length === 0;
  return (
    <div className={`slip ${ok ? 'slip-ok' : ''}`}>
      <h3>{t('slip.title')}</h3>
      {ok ? (
        <p>{t('slip.ok')}</p>
      ) : (
        <ul>
          {s.lastErrors.map((e) => (
            <li key={e}>{t(`error.${e}`)}</li>
          ))}
        </ul>
      )}
      {s.lastPenalty.misafir > 0 && <p className="penalty">{t('penalty.misafir', { n: s.lastPenalty.misafir })}</p>}
      {s.lastPenalty.personel > 0 && <p className="penalty">{t('penalty.personel', { n: s.lastPenalty.personel })}</p>}
      <button className="paper-button" onClick={() => dispatch({ type: 'NEXT' })}>
        {t(last ? 'slip.finish' : 'slip.next')}
      </button>
    </div>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  const tone = value >= 85 ? 'good' : value >= 60 ? 'mid' : 'bad';
  return (
    <div className="meter">
      <span>{label}</span>
      <div className="meter-track">
        <div className={`meter-fill meter-${tone}`} style={{ width: `${value}%` }} />
      </div>
      <strong>{value}</strong>
    </div>
  );
}

export function Summary({ s, dispatch }: { s: GameState; dispatch: Dispatch<Action> }) {
  const day = currentDay(s);
  const correct = s.results.filter((r) => r.errors.length === 0).length;
  const avg = (s.satisfaction.misafir + s.satisfaction.personel) / 2;
  const verdict = avg >= 90 ? 'iyi' : avg >= 70 ? 'orta' : 'kotu';
  const hasNext = s.dayIndex + 1 < DAYS.length;
  const allErrors = s.results.flatMap((r) => r.errors.map((e) => ({ e, guest: r.guest })));
  return (
    <div className="overlay">
      <div className="paper paper-summary">
        <p className="paper-kicker">{t('summary.title')}</p>
        <h1>{formatDate(day.date)}</h1>
        <div className="summary-grid">
          <div>
            <span>{t('summary.served')}</span>
            <strong>{s.results.length}</strong>
          </div>
          <div>
            <span>{t('summary.correct')}</span>
            <strong>{correct}</strong>
          </div>
        </div>
        <Meter label={t('summary.guestSat')} value={s.satisfaction.misafir} />
        <Meter label={t('summary.staffSat')} value={s.satisfaction.personel} />
        <h2>{t('summary.errors')}</h2>
        {allErrors.length === 0 ? (
          <p>{t('summary.none')}</p>
        ) : (
          <ul className="summary-errors">
            {allErrors.map(({ e, guest: gid }, i) => (
              <li key={i}>
                <strong>{guest(gid).name}:</strong> {t(`error.${e}`)}
                <em>
                  {PENALTIES[e].misafir > 0 && ` ${t('penalty.misafir', { n: PENALTIES[e].misafir })}`}
                  {PENALTIES[e].personel > 0 && ` ${t('penalty.personel', { n: PENALTIES[e].personel })}`}
                </em>
              </li>
            ))}
          </ul>
        )}
        <h2>{t('summary.manager')}</h2>
        <p className="paper-note">{t(`summary.manager.${verdict}`)}</p>
        <div className="paper-actions">
          <button className="paper-button" onClick={() => dispatch({ type: 'RESTART' })}>
            {t('summary.replay')}
          </button>
          {!hasNext && <span className="paper-hint">{t('summary.nextSoon')}</span>}
        </div>
      </div>
    </div>
  );
}
