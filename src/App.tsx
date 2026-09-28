import { useReducer } from 'react';
import { t } from './i18n';
import { Lobby } from './components/Lobby';
import { GuestArea } from './components/GuestArea';
import { Desk } from './components/Desk';
import { Sistem } from './components/Sistem';
import { DayStart, GuestPanel, Slip, Summary } from './components/Panels';
import { guest } from './game/data';
import { currentDay, initialState, reducer } from './game/state';

// Tek ekran: üstte lobi, ortada misafir, altta masa. Paneller bunların üzerine açılır.
export function App() {
  const [s, dispatch] = useReducer(reducer, undefined, () => initialState(0));
  const day = currentDay(s);
  const visit = s.phase === 'play' || s.phase === 'slip' ? day.visits[s.visitIndex] : undefined;
  const playing = s.phase === 'play';

  return (
    <main className="stage">
      <div className="screen">
        <section className="zone zone-lobby">
          <Lobby />
        </section>
        <section className="zone zone-guest">
          <GuestArea guestColor={visit ? guest(visit.guest).color : undefined} />
          {playing && <GuestPanel s={s} dispatch={dispatch} />}
        </section>
        <section className="zone zone-desk">
          <Desk
            date={day.date}
            occupancy={s.inHouse.length}
            hooks={s.hooks}
            returnedKey={s.returnedKey}
            holding={!!s.holding}
            onMonitor={playing ? () => dispatch({ type: 'OPEN_SISTEM' }) : undefined}
            onHook={playing ? (room) => dispatch({ type: 'CLICK_HOOK', room }) : undefined}
            onReturnedKey={playing ? () => dispatch({ type: 'PICK_RETURNED_KEY' }) : undefined}
          />
          {s.holding && <div className="holding-note">{t('desk.holding', { room: s.holding })}</div>}
        </section>

        {s.sistemOpen && <Sistem s={s} dispatch={dispatch} />}
        {s.phase === 'slip' && <Slip s={s} dispatch={dispatch} />}
        {s.phase === 'start' && <DayStart s={s} dispatch={dispatch} />}
        {s.phase === 'summary' && <Summary s={s} dispatch={dispatch} />}
      </div>
    </main>
  );
}
