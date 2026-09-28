import type { Dispatch } from 'react';
import { shortDate, t } from '../i18n';
import { ROOMS, guest } from '../game/data';
import { roomStatus, type Action, type GameState, type SistemTab } from '../game/state';

// Kurgusal otel yönetim sistemi. Monitöre tıklayınca açılır.
export function Sistem({ s, dispatch }: { s: GameState; dispatch: Dispatch<Action> }) {
  const tabs: SistemTab[] = ['arrivals', 'inhouse', 'rooms'];
  const selectedRes = s.sistemTab === 'arrivals' ? s.reservations.find((r) => r.id === s.selected) : undefined;
  const selectedStay = s.sistemTab === 'inhouse' ? s.inHouse.find((h) => h.guest === s.selected) : undefined;

  return (
    <div className="sistem" role="dialog" aria-label={t('sistem.title')}>
      <div className="sistem-bar">
        <span>{t('sistem.title')}</span>
        <button className="sistem-close" onClick={() => dispatch({ type: 'CLOSE_SISTEM' })}>
          {t('sistem.close')}
        </button>
      </div>

      <div className="sistem-tabs">
        {tabs.map((tab) => (
          <button key={tab} className={tab === s.sistemTab ? 'active' : ''} onClick={() => dispatch({ type: 'SET_TAB', tab })}>
            {t(`sistem.tab.${tab}`)}
          </button>
        ))}
      </div>

      <div className="sistem-body">
        {s.sistemTab === 'arrivals' && (
          <table>
            <thead>
              <tr>
                <th>{t('sistem.col.name')}</th>
                <th>{t('sistem.col.arrival')}</th>
                <th>{t('sistem.col.nights')}</th>
                <th>{t('sistem.col.type')}</th>
                <th>{t('sistem.col.room')}</th>
                <th>{t('sistem.col.status')}</th>
              </tr>
            </thead>
            <tbody>
              {s.reservations.map((r) => (
                <tr
                  key={r.id}
                  className={r.id === s.selected ? 'selected' : r.checkedIn ? 'muted' : ''}
                  onClick={() => !r.checkedIn && dispatch({ type: 'SELECT', id: r.id })}
                >
                  <td>{guest(r.guest).name}</td>
                  <td>{shortDate(r.arrival)}</td>
                  <td>{r.nights}</td>
                  <td>{t(`room.type.${r.roomType}`)}</td>
                  <td>{r.room}</td>
                  <td>{t(r.checkedIn ? 'sistem.res.in' : 'sistem.res.waiting')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {s.sistemTab === 'inhouse' && (
          <table>
            <thead>
              <tr>
                <th>{t('sistem.col.name')}</th>
                <th>{t('sistem.col.room')}</th>
                <th>{t('sistem.col.departure')}</th>
              </tr>
            </thead>
            <tbody>
              {s.inHouse.length === 0 && (
                <tr>
                  <td colSpan={3}>{t('sistem.empty')}</td>
                </tr>
              )}
              {s.inHouse.map((h) => (
                <tr key={h.guest} className={h.guest === s.selected ? 'selected' : ''} onClick={() => dispatch({ type: 'SELECT', id: h.guest })}>
                  <td>{guest(h.guest).name}</td>
                  <td>{h.room}</td>
                  <td>{shortDate(h.departure)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {s.sistemTab === 'rooms' && (
          <div className="sistem-rooms">
            {ROOMS.map((r) => {
              const st = roomStatus(s, r.number);
              return (
                <div key={r.number} className={`room-cell room-${st}`}>
                  <strong>{r.number}</strong>
                  <span>{t(`room.type.${r.type}`)}</span>
                  <span>{t(`room.status.${st}`)}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="sistem-footer">
        {s.sistemMessage ? (
          <span className="sistem-msg">{s.sistemMessage}</span>
        ) : selectedRes ? (
          <button
            className="sistem-action"
            onClick={() =>
              dispatch({
                type: 'CHECKIN',
                resId: selectedRes.id,
                message: t('sistem.done.checkin', { name: guest(selectedRes.guest).name, room: selectedRes.room }),
              })
            }
          >
            {t('sistem.btn.checkin')} · {guest(selectedRes.guest).name}
          </button>
        ) : selectedStay ? (
          <button
            className="sistem-action"
            onClick={() =>
              dispatch({
                type: 'CHECKOUT',
                guest: selectedStay.guest,
                message: t('sistem.done.checkout', { name: guest(selectedStay.guest).name, room: selectedStay.room }),
              })
            }
          >
            {t('sistem.btn.checkout')} · {guest(selectedStay.guest).name}
          </button>
        ) : (
          s.sistemTab !== 'rooms' && <span className="sistem-hint">{t('sistem.select')}</span>
        )}
      </div>
    </div>
  );
}
