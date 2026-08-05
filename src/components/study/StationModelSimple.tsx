import { useState } from 'react';
import type { DiagramMode } from './StationModelDiagram';

interface StationModelSimpleProps {
  mode?: DiagramMode;
}

interface LabelDef {
  id: number;
  lines: string[];
  chip: { x: number; y: number; w: number; h: number };
  leader: { x1: number; y1: number; x2: number; y2: number };
}

const LABELS: LabelDef[] = [
  {
    id: 1,
    lines: ['Wind (kts)'],
    chip: { x: 300, y: 16, w: 150, h: 36 },
    leader: { x1: 375, y1: 52, x2: 420, y2: 82 },
  },
  {
    id: 2,
    lines: ['Temperature (°F)'],
    chip: { x: 16, y: 118, w: 184, h: 36 },
    leader: { x1: 200, y1: 136, x2: 322, y2: 148 },
  },
  {
    id: 3,
    lines: ['Weather'],
    chip: { x: 16, y: 166, w: 184, h: 36 },
    leader: { x1: 200, y1: 184, x2: 330, y2: 184 },
  },
  {
    id: 4,
    lines: ['Dew point (°F)'],
    chip: { x: 16, y: 214, w: 184, h: 36 },
    leader: { x1: 200, y1: 232, x2: 328, y2: 222 },
  },
  {
    id: 5,
    lines: ['Sky cover'],
    chip: { x: 300, y: 288, w: 150, h: 36 },
    leader: { x1: 375, y1: 288, x2: 392, y2: 200 },
  },
  {
    id: 6,
    lines: ['Sea-level pressure (mb)'],
    chip: { x: 545, y: 118, w: 220, h: 36 },
    leader: { x1: 545, y1: 136, x2: 472, y2: 148 },
  },
  {
    id: 7,
    lines: ['Pressure trend (mb)'],
    chip: { x: 545, y: 190, w: 220, h: 36 },
    leader: { x1: 545, y1: 208, x2: 500, y2: 194 },
  },
];

const StationModelSimple = ({ mode = 'interactive' }: StationModelSimpleProps) => {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const interactive = mode === 'interactive';

  const isShown = (id: number) =>
    mode === 'revealed' || (interactive && revealed.has(id));

  const toggle = (id: number) => {
    if (!interactive) return;
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 p-3 md:p-4">
      {interactive && (
        <div className="flex items-center justify-between mb-2 px-1">
          <p className="text-sm text-slate-400">
            Tap each blank — {revealed.size}/{LABELS.length}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setRevealed(new Set(LABELS.map((l) => l.id)))}
              className="px-3 py-2 rounded-lg text-sm bg-slate-800 text-sky-300 active:bg-slate-700"
            >
              Reveal all
            </button>
            <button
              type="button"
              onClick={() => setRevealed(new Set())}
              className="px-3 py-2 rounded-lg text-sm bg-slate-800 text-slate-400 active:bg-slate-700"
            >
              Hide all
            </button>
          </div>
        </div>
      )}

      <svg
        viewBox="0 0 780 340"
        className="w-full h-auto select-none"
        role="img"
        aria-label="Simple weather station model with labels to fill in"
      >
        {LABELS.map((l) => (
          <line
            key={`leader-${l.id}`}
            x1={l.leader.x1}
            y1={l.leader.y1}
            x2={l.leader.x2}
            y2={l.leader.y2}
            stroke="#475569"
            strokeWidth={1.5}
          />
        ))}

        {/* ---- Station plot ---- */}
        <g>
          {/* Wind barb from the NNE */}
          <line x1={396} y1={168} x2={432} y2={72} stroke="#e2e8f0" strokeWidth={2.5} />
          <line x1={432} y1={72} x2={452} y2={86} stroke="#e2e8f0" strokeWidth={2.5} />
          <line x1={425} y1={92} x2={445} y2={106} stroke="#e2e8f0" strokeWidth={2.5} />

          {/* Sky cover: open circle = clear */}
          <circle cx={390} cy={182} r={14} fill="none" stroke="#e2e8f0" strokeWidth={2.5} />

          {/* Temperature 57 */}
          <text x={342} y={155} textAnchor="end" fill="#f87171" fontSize={20} fontFamily="JetBrains Mono, monospace">
            57
          </text>

          {/* Weather: "=" mist/fog symbol */}
          <line x1={334} y1={179} x2={358} y2={179} stroke="#34d399" strokeWidth={2.5} />
          <line x1={334} y1={188} x2={358} y2={188} stroke="#34d399" strokeWidth={2.5} />

          {/* Dew point 43 */}
          <text x={344} y={228} textAnchor="end" fill="#34d399" fontSize={20} fontFamily="JetBrains Mono, monospace">
            43
          </text>

          {/* Sea-level pressure 107 */}
          <text x={436} y={155} fill="#f8fafc" fontSize={20} fontFamily="JetBrains Mono, monospace">
            107
          </text>

          {/* Pressure trend: -5 falling */}
          <text x={436} y={198} fill="#f8fafc" fontSize={20} fontFamily="JetBrains Mono, monospace">
            -5
          </text>
          <line x1={470} y1={186} x2={492} y2={198} stroke="#e2e8f0" strokeWidth={2.5} />
        </g>

        {/* ---- Label chips ---- */}
        {LABELS.map((l) => {
          const shown = isShown(l.id);
          const { x, y, w, h } = l.chip;
          const cy = y + h / 2;
          return (
            <g
              key={`chip-${l.id}`}
              onClick={() => toggle(l.id)}
              style={{ cursor: interactive ? 'pointer' : 'default' }}
            >
              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={9}
                fill={shown ? 'rgba(16, 185, 129, 0.12)' : 'rgba(30, 41, 59, 0.9)'}
                stroke={shown ? '#10b981' : '#38bdf8'}
                strokeWidth={1.5}
                strokeDasharray={shown ? undefined : '5 4'}
              />
              <circle cx={x + 18} cy={cy} r={10} fill={shown ? '#10b981' : '#334155'} />
              <text
                x={x + 18}
                y={cy}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#fff"
                fontSize={11}
                fontWeight={700}
              >
                {l.id}
              </text>
              {shown ? (
                <text
                  x={x + 36}
                  y={cy}
                  dominantBaseline="central"
                  fill="#a7f3d0"
                  fontSize={14.5}
                  fontWeight={600}
                >
                  {l.lines[0]}
                </text>
              ) : (
                <text x={x + 36} y={cy} dominantBaseline="central" fill="#64748b" fontSize={13}>
                  {interactive ? 'tap to reveal' : '?'}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default StationModelSimple;
