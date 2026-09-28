import { Lobby } from './components/Lobby';
import { GuestArea } from './components/GuestArea';
import { Desk } from './components/Desk';

// Tek ekran: üstte lobi, ortada misafir, altta masa.
export function App() {
  return (
    <main className="stage">
      <div className="screen">
        <section className="zone zone-lobby">
          <Lobby />
        </section>
        <section className="zone zone-guest">
          <GuestArea />
        </section>
        <section className="zone zone-desk">
          <Desk />
        </section>
      </div>
    </main>
  );
}
