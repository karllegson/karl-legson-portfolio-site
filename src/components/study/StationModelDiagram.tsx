import { useState } from 'react';

export type DiagramMode = 'interactive' | 'hidden' | 'revealed';

interface StationModelDiagramProps {
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
    lines: ['Wind speed'],
    chip: { x: 16, y: 118, w: 184, h: 36 },
    leader: { x1: 200, y1: 136, x2: 316, y2: 152 },
  },
  {
    id: 2,
    lines: ['Wind direction'],
    chip: { x: 16, y: 162, w: 184, h: 36 },
    leader: { x1: 200, y1: 180, x2: 348, y2: 194 },
  },
  {
    id: 3,
    lines: ['Temperature'],
    chip: { x: 16, y: 206, w: 184, h: 36 },
    leader: { x1: 200, y1: 224, x2: 306, y2: 206 },
  },
  {
    id: 4,
    lines: ['Present weather'],
    chip: { x: 16, y: 250, w: 184, h: 36 },
    leader: { x1: 200, y1: 268, x2: 304, y2: 240 },
  },
  {
    id: 5,
    lines: ['Dew point'],
    chip: { x: 16, y: 294, w: 184, h: 36 },
    leader: { x1: 200, y1: 312, x2: 310, y2: 272 },
  },
  {
    id: 6,
    lines: ['Low cloud type'],
    chip: { x: 16, y: 338, w: 184, h: 36 },
    leader: { x1: 200, y1: 356, x2: 352, y2: 298 },
  },
  {
    id: 7,
    lines: ['Middle cloud type'],
    chip: { x: 240, y: 34, w: 180, h: 36 },
    leader: { x1: 330, y1: 70, x2: 388, y2: 156 },
  },
  {
    id: 8,
    lines: ['Sky cover'],
    chip: { x: 480, y: 34, w: 140, h: 36 },
    leader: { x1: 550, y1: 70, x2: 400, y2: 224 },
  },
  {
    id: 9,
    lines: ['Sea level pressure'],
    chip: { x: 580, y: 130, w: 184, h: 36 },
    leader: { x1: 580, y1: 148, x2: 494, y2: 204 },
  },
  {
    id: 10,
    lines: ['Pressure change', 'in past 3 hours'],
    chip: { x: 580, y: 176, w: 184, h: 46 },
    leader: { x1: 580, y1: 199, x2: 470, y2: 246 },
  },
  {
    id: 11,
    lines: ['Pressure change /', 'tendency'],
    chip: { x: 580, y: 232, w: 184, h: 46 },
    leader: { x1: 580, y1: 255, x2: 510, y2: 238 },
  },
  {
    id: 12,
    lines: ['6-hour precipitation'],
    chip: { x: 580, y: 288, w: 184, h: 36 },
    leader: { x1: 580, y1: 306, x2: 488, y2: 288 },
  },
];

const StationModelDiagram = ({ mode = 'interactive' }: StationModelDiagramProps) => {
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

  const revealAll = () => setRevealed(new Set(LABELS.map((l) => l.id)));
  const hideAll = () => setRevealed(new Set());

  return (
    <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 p-3 md:p-4">
      {interactive && (
        <div className="flex items-center justify-between mb-2 px-1">
          <p className="text-sm text-slate-400">
            Tap each blank to check yourself — {revealed.size}/{LABELS.length}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={revealAll}
              className="px-3 py-2 rounded-lg text-sm bg-slate-800 text-sky-300 active:bg-slate-700"
            >
              Reveal all
            </button>
            <button
              type="button"
              onClick={hideAll}
              className="px-3 py-2 rounded-lg text-sm bg-slate-800 text-slate-400 active:bg-slate-700"
            >
              Hide all
            </button>
          </div>
        </div>
      )}

      <svg
        viewBox="0 0 780 400"
        className="w-full h-auto select-none"
        role="img"
        aria-label="Weather station model diagram with labels to fill in"
      >
        {/* ---- Leader lines ---- */}
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

        {/* ---- Station plot (always visible) ---- */}
        <g>
          {/* Wind shaft (direction) with speed barbs */}
          <line x1={390} y1={235} x2={308} y2={150} stroke="#e2e8f0" strokeWidth={2.5} />
          <line x1={308} y1={150} x2={332} y2={142} stroke="#e2e8f0" strokeWidth={2.5} />
          <line x1={320} y1={163} x2={344} y2={155} stroke="#e2e8f0" strokeWidth={2.5} />

          {/* Sky cover: filled circle = overcast */}
          <circle cx={390} cy={235} r={13} fill="#e2e8f0" stroke="#e2e8f0" />

          {/* Middle cloud type symbol above circle */}
          <path d="M 382 158 q 12 11 0 22" fill="none" stroke="#e2e8f0" strokeWidth={2} />
          <path d="M 396 158 q 12 11 0 22" fill="none" stroke="#e2e8f0" strokeWidth={2} />

          {/* Temperature */}
          <text x={328} y={212} textAnchor="end" fill="#fff" fontSize={20} fontFamily="JetBrains Mono, monospace">
            34
          </text>

          {/* Present weather: ** = snow */}
          <text x={326} y={248} textAnchor="end" fill="#fff" fontSize={24} fontFamily="JetBrains Mono, monospace">
            **
          </text>

          {/* Dew point */}
          <text x={330} y={278} textAnchor="end" fill="#fff" fontSize={20} fontFamily="JetBrains Mono, monospace">
            32
          </text>

          {/* Low cloud type symbol (dashes) */}
          <line x1={352} y1={298} x2={366} y2={298} stroke="#e2e8f0" strokeWidth={2.5} />
          <line x1={371} y1={298} x2={385} y2={298} stroke="#e2e8f0" strokeWidth={2.5} />
          <line x1={390} y1={298} x2={404} y2={298} stroke="#e2e8f0" strokeWidth={2.5} />

          {/* Sea level pressure */}
          <text x={452} y={212} fill="#fff" fontSize={20} fontFamily="JetBrains Mono, monospace">
            147
          </text>

          {/* Pressure change + tendency */}
          <text x={452} y={252} fill="#fff" fontSize={20} fontFamily="JetBrains Mono, monospace">
            28/
          </text>
          <line x1={494} y1={246} x2={514} y2={238} stroke="#e2e8f0" strokeWidth={2.5} />

          {/* 6-hour precipitation */}
          <text x={452} y={292} fill="#fff" fontSize={20} fontFamily="JetBrains Mono, monospace">
            .45
          </text>
        </g>

        {/* ---- Label chips (the blanks) ---- */}
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
              {/* Number badge */}
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
                l.lines.length === 1 ? (
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
                  <>
                    <text x={x + 36} y={cy - 8} dominantBaseline="central" fill="#a7f3d0" fontSize={13.5} fontWeight={600}>
                      {l.lines[0]}
                    </text>
                    <text x={x + 36} y={cy + 9} dominantBaseline="central" fill="#a7f3d0" fontSize={13.5} fontWeight={600}>
                      {l.lines[1]}
                    </text>
                  </>
                )
              ) : (
                <text
                  x={x + 36}
                  y={cy}
                  dominantBaseline="central"
                  fill="#64748b"
                  fontSize={13}
                >
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

export default StationModelDiagram;
