// Ortak çizim parçaları: yaprak, sarmaşık, saksı bitkileri, gölge.
// Bitkiler her seferinde aynı görünsün diye rastgelelik sabit bir tohumla üretilir.

export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Tek yaprak: dibi (0,0) noktasında, ucu sağa bakan badem biçimi.
export function Leaf({ x, y, len, angle, fill }: { x: number; y: number; len: number; angle: number; fill: string }) {
  const w = len * 0.42;
  return (
    <path
      d={`M0 0 Q${len * 0.45} ${-w} ${len} 0 Q${len * 0.45} ${w} 0 0 Z`}
      transform={`translate(${x} ${y}) rotate(${angle})`}
      fill={fill}
    />
  );
}

const LEAF_TONES = ['var(--leaf)', 'var(--leaf-light)', 'var(--leaf-dark)'];

// Yukarıdan sarkan sarmaşık.
export function Vine({ x, y, length, seed, sway = 10 }: { x: number; y: number; length: number; seed: number; sway?: number }) {
  const rnd = seeded(seed);
  const steps = Math.max(3, Math.floor(length / 9));
  const pts = Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    return { px: x + Math.sin(t * Math.PI * 1.6 + seed) * sway * t, py: y + t * length };
  });
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.px.toFixed(1)} ${p.py.toFixed(1)}`).join(' ');
  return (
    <g>
      <path d={d} stroke="var(--leaf-dark)" strokeWidth="1.2" fill="none" />
      {pts.slice(1).map((p, i) => (
        <Leaf
          key={i}
          x={p.px}
          y={p.py}
          len={7 + rnd() * 5}
          angle={(i % 2 ? 20 : 160) + (rnd() - 0.5) * 50}
          fill={LEAF_TONES[Math.floor(rnd() * 3)]}
        />
      ))}
    </g>
  );
}

// Terakota saksı. (x, y) saksının üst kenarının ortası.
export function Pot({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy={h + 2} rx={w * 0.7} ry="4" fill="var(--shadow)" opacity="0.18" />
      <path d={`M${-w / 2} 6 H${w / 2} L${w * 0.36} ${h} H${-w * 0.36} Z`} fill="var(--terracotta)" />
      <path d={`M${w * 0.1} 6 H${w / 2} L${w * 0.36} ${h} H${w * 0.02} Z`} fill="var(--terracotta-dark)" opacity="0.35" />
      <rect x={-w / 2 - 3} y="0" width={w + 6} height="8" rx="2" fill="var(--terracotta)" />
      <rect x={-w / 2 - 3} y="5" width={w + 6} height="3" fill="var(--terracotta-dark)" opacity="0.4" />
    </g>
  );
}

// Saksıda yapraklı bitki (yelpaze gibi açılan yapraklar).
export function PottedPlant({ x, y, size, seed }: { x: number; y: number; size: number; seed: number }) {
  const rnd = seeded(seed);
  const leaves = Array.from({ length: 14 }, (_, i) => {
    const a = -170 + (i / 13) * 160 + (rnd() - 0.5) * 16;
    return { a, len: size * (0.55 + rnd() * 0.5), tone: LEAF_TONES[Math.floor(rnd() * 3)] };
  });
  return (
    <g>
      {leaves.map((l, i) => (
        <Leaf key={i} x={x} y={y + 2} len={l.len} angle={l.a} fill={l.tone} />
      ))}
      <Pot x={x} y={y} w={size * 0.6} h={size * 0.55} />
    </g>
  );
}

// Saksıda zeytin ağacı: ince gövde, küçük gümüşi yaprak kümeleri.
export function OliveTree({ x, y, height, seed }: { x: number; y: number; height: number; seed: number }) {
  const rnd = seeded(seed);
  const top = y - height;
  const clusters = Array.from({ length: 5 }, () => ({
    cx: x + (rnd() - 0.5) * height * 0.55,
    cy: top + rnd() * height * 0.4,
  }));
  return (
    <g>
      <path
        d={`M${x} ${y} C${x - 4} ${y - height * 0.4} ${x + 6} ${y - height * 0.6} ${x} ${top + height * 0.2}`}
        stroke="var(--wood-dark)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {clusters.map((c, ci) => (
        <g key={ci}>
          {Array.from({ length: 11 }, (_, i) => (
            <Leaf
              key={i}
              x={c.cx}
              y={c.cy}
              len={9 + rnd() * 5}
              angle={rnd() * 360}
              fill={i % 3 === 0 ? 'var(--olive-silver)' : 'var(--olive)'}
            />
          ))}
        </g>
      ))}
      <Pot x={x} y={y} w={height * 0.34} h={height * 0.3} />
    </g>
  );
}

// Nesnelerin altına düşen yumuşak gölge.
export function Shadow({ cx, cy, rx, ry, opacity = 0.2 }: { cx: number; cy: number; rx: number; ry: number; opacity?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="var(--shadow)" opacity={opacity} />;
}
