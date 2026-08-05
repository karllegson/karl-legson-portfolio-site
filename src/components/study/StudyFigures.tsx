import type { FigureId } from './studyData';

/* ---------- shared helpers ---------- */

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const FigureFrame = ({
  caption,
  children,
}: {
  caption?: string;
  children: React.ReactNode;
}) => (
  <div className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 p-3 md:p-4">
    {children}
    {caption && (
      <p className="text-xs text-slate-500 text-center mt-2 px-2">{caption}</p>
    )}
  </div>
);

/* ---------- altimeters (MC 3) ---------- */

const AltimeterDial = ({
  cx,
  cy,
  value,
  num,
}: {
  cx: number;
  cy: number;
  value: number;
  num: number;
}) => {
  const hundredsDeg = ((value % 1000) / 100) * 36;
  const thousandsDeg = ((value % 10000) / 1000) * 36;
  const tenThousandsDeg = (value / 10000) * 36;
  const h1 = polar(cx, cy, 32, hundredsDeg);
  const h2 = polar(cx, cy, 22, thousandsDeg);
  const h3 = polar(cx, cy, 47, tenThousandsDeg);
  return (
    <g>
      <circle cx={cx} cy={cy} r={54} fill="#0f172a" stroke="#475569" strokeWidth={2} />
      {Array.from({ length: 10 }).map((_, i) => {
        const p = polar(cx, cy, 42, i * 36);
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#cbd5e1"
            fontSize={11}
            fontWeight={600}
          >
            {i}
          </text>
        );
      })}
      {/* 100-ft hand (long, thin) */}
      <line x1={cx} y1={cy} x2={h1.x} y2={h1.y} stroke="#f8fafc" strokeWidth={2} />
      {/* 1,000-ft hand (short, wide) */}
      <line x1={cx} y1={cy} x2={h2.x} y2={h2.y} stroke="#f8fafc" strokeWidth={6} strokeLinecap="round" />
      {/* 10,000-ft marker (outer triangle) */}
      <circle cx={h3.x} cy={h3.y} r={4} fill="#f59e0b" />
      <circle cx={cx} cy={cy} r={4} fill="#e2e8f0" />
      <text x={cx} y={cy + 72} textAnchor="middle" fill="#94a3b8" fontSize={14} fontWeight={700}>
        {num}
      </text>
    </g>
  );
};

const Altimeters12000 = () => (
  <FigureFrame caption="Long thin hand = 100s · short wide hand = 1,000s · amber dot = 10,000s">
    <svg viewBox="0 0 480 340" className="w-full h-auto" role="img" aria-label="Four altimeters">
      <AltimeterDial cx={120} cy={80} value={1200} num={1} />
      <AltimeterDial cx={360} cy={80} value={8500} num={2} />
      <AltimeterDial cx={120} cy={240} value={10200} num={3} />
      <AltimeterDial cx={360} cy={240} value={12000} num={4} />
    </svg>
  </FigureFrame>
);

/* ---------- six-pack panels (MC 9 / 10) ---------- */

interface GaugeText {
  value: string;
  trend: string;
}

const TextGauge = ({
  cx,
  cy,
  label,
  value,
  trend,
}: { cx: number; cy: number; label: string } & GaugeText) => (
  <g>
    <circle cx={cx} cy={cy} r={46} fill="#0f172a" stroke="#475569" strokeWidth={2} />
    <text x={cx} y={cy - 6} textAnchor="middle" fill="#f8fafc" fontSize={15} fontWeight={700}>
      {value}
    </text>
    <text x={cx} y={cy + 14} textAnchor="middle" fill="#38bdf8" fontSize={11}>
      {trend}
    </text>
    <text x={cx} y={cy + 64} textAnchor="middle" fill="#94a3b8" fontSize={11}>
      {label}
    </text>
  </g>
);

const AttitudeGauge = ({
  cx,
  cy,
  bank,
  pitchUp,
}: {
  cx: number;
  cy: number;
  bank: number;
  pitchUp: number;
}) => {
  const clipId = `ai-clip-${cx}-${cy}`;
  return (
    <g>
      <circle cx={cx} cy={cy} r={46} fill="#0f172a" stroke="#475569" strokeWidth={2} />
      <defs>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={44} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`} transform={`rotate(${-bank} ${cx} ${cy})`}>
        <rect x={cx - 70} y={cy - 110 - pitchUp * 1.6} width={140} height={110} fill="#1e40af" />
        <rect x={cx - 70} y={cy - pitchUp * 1.6} width={140} height={110} fill="#7c4a12" />
        <line
          x1={cx - 70}
          y1={cy - pitchUp * 1.6}
          x2={cx + 70}
          y2={cy - pitchUp * 1.6}
          stroke="#f8fafc"
          strokeWidth={2}
        />
      </g>
      {/* fixed reference airplane */}
      <line x1={cx - 20} y1={cy} x2={cx - 7} y2={cy} stroke="#fbbf24" strokeWidth={3.5} />
      <line x1={cx + 7} y1={cy} x2={cx + 20} y2={cy} stroke="#fbbf24" strokeWidth={3.5} />
      <circle cx={cx} cy={cy} r={3.5} fill="#fbbf24" />
      <text x={cx} y={cy + 64} textAnchor="middle" fill="#94a3b8" fontSize={11}>
        ATTITUDE
      </text>
    </g>
  );
};

const TurnGauge = ({ cx, cy, tilt }: { cx: number; cy: number; tilt: number }) => (
  <g>
    <circle cx={cx} cy={cy} r={46} fill="#0f172a" stroke="#475569" strokeWidth={2} />
    <text x={cx - 32} y={cy + 28} fill="#64748b" fontSize={10}>L</text>
    <text x={cx + 27} y={cy + 28} fill="#64748b" fontSize={10}>R</text>
    <g transform={`rotate(${tilt} ${cx} ${cy})`}>
      <line x1={cx - 28} y1={cy} x2={cx + 28} y2={cy} stroke="#f8fafc" strokeWidth={4} strokeLinecap="round" />
      <line x1={cx} y1={cy - 9} x2={cx} y2={cy} stroke="#f8fafc" strokeWidth={4} strokeLinecap="round" />
    </g>
    <text x={cx} y={cy + 30} textAnchor="middle" fill="#38bdf8" fontSize={10}>
      {tilt > 0 ? 'right turn' : tilt < 0 ? 'left turn' : 'wings level'}
    </text>
    <text x={cx} y={cy + 64} textAnchor="middle" fill="#94a3b8" fontSize={11}>
      TURN COORDINATOR
    </text>
  </g>
);

interface PanelConfig {
  asi: GaugeText;
  ai: { bank: number; pitchUp: number };
  alt: GaugeText;
  tc: { tilt: number };
  hi: GaugeText;
  vsi: GaugeText;
}

const SixPack = ({ config }: { config: PanelConfig }) => (
  <FigureFrame caption="One instrument system has malfunctioned — trust the majority.">
    <svg viewBox="0 0 480 300" className="w-full h-auto" role="img" aria-label="Instrument panel">
      <TextGauge cx={85} cy={70} label="AIRSPEED" {...config.asi} />
      <AttitudeGauge cx={240} cy={70} bank={config.ai.bank} pitchUp={config.ai.pitchUp} />
      <TextGauge cx={395} cy={70} label="ALTIMETER" {...config.alt} />
      <TurnGauge cx={85} cy={215} tilt={config.tc.tilt} />
      <TextGauge cx={240} cy={215} label="HEADING" {...config.hi} />
      <TextGauge cx={395} cy={215} label="VSI" {...config.vsi} />
    </svg>
  </FigureFrame>
);

const panelClimbingRight: PanelConfig = {
  asi: { value: '92 KT', trend: 'decreasing' },
  ai: { bank: 0, pitchUp: 0 },
  alt: { value: '5,300 FT', trend: 'increasing' },
  tc: { tilt: 18 },
  hi: { value: '085°', trend: 'increasing' },
  vsi: { value: '+450 FPM', trend: 'climb' },
};

const panelLevelRight: PanelConfig = {
  asi: { value: '105 KT', trend: 'steady' },
  ai: { bank: 20, pitchUp: 8 },
  alt: { value: '4,000 FT', trend: 'steady' },
  tc: { tilt: 18 },
  hi: { value: '140°', trend: 'increasing' },
  vsi: { value: '0 FPM', trend: 'level' },
};

/* ---------- runway fixed distance marker (MC 16 / 36) ---------- */

const RunwayFixedDistance = () => (
  <FigureFrame caption="Runway markings — approach end at the bottom.">
    <svg viewBox="0 0 300 430" className="w-full max-w-[280px] mx-auto h-auto" role="img" aria-label="Runway markings">
      <rect x={95} y={15} width={110} height={400} fill="#1e293b" stroke="#475569" strokeWidth={2} />
      {/* centerline dashes */}
      {[30, 70, 110, 150, 190].map((y) => (
        <rect key={y} x={147} y={y} width={6} height={26} fill="#e2e8f0" />
      ))}
      {/* aiming point (fixed distance) markers */}
      <rect x={107} y={225} width={22} height={46} fill="#f8fafc" />
      <rect x={171} y={225} width={22} height={46} fill="#f8fafc" />
      {/* touchdown zone marks (500 ft) */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={104 + i * 8} y={300} width={5} height={30} fill="#e2e8f0" />
          <rect x={172 + i * 8} y={300} width={5} height={30} fill="#e2e8f0" />
        </g>
      ))}
      {/* threshold stripes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={102 + i * 12.5} y={355} width={7} height={45} fill="#f8fafc" />
      ))}
      {/* distance A bracket */}
      <line x1={235} y1={355} x2={235} y2={271} stroke="#38bdf8" strokeWidth={2} />
      <line x1={228} y1={355} x2={242} y2={355} stroke="#38bdf8" strokeWidth={2} />
      <line x1={228} y1={271} x2={242} y2={271} stroke="#38bdf8" strokeWidth={2} />
      <text x={252} y={317} fill="#38bdf8" fontSize={20} fontWeight={700}>A</text>
      <text x={150} y={425} textAnchor="middle" fill="#64748b" fontSize={11}>threshold</text>
    </svg>
  </FigureFrame>
);

/* ---------- radar summary chart (MC 28 / 30) ---------- */

const RadarSummary = () => (
  <FigureFrame caption='Radar summary chart — "RW+" = rain showers increasing · "430" with bar = echo top 43,000 ft MSL.'>
    <svg viewBox="0 0 480 300" className="w-full h-auto" role="img" aria-label="Radar summary chart">
      <rect x={10} y={10} width={460} height={280} fill="#0f172a" stroke="#475569" strokeWidth={2} rx={8} />
      {/* faint state-line style grid */}
      <path d="M 10 150 L 470 130 M 200 10 L 220 290 M 340 10 L 330 290" stroke="#1e293b" strokeWidth={1.5} />

      {/* Area B: weak to moderate echoes, rain showers increasing */}
      <path
        d="M 70 90 q 30 -40 80 -25 q 45 12 40 55 q -5 40 -55 42 q -60 3 -70 -30 q -8 -25 5 -42 Z"
        fill="rgba(56, 189, 248, 0.15)"
        stroke="#38bdf8"
        strokeWidth={2}
      />
      <text x={135} y={115} textAnchor="middle" fill="#e2e8f0" fontSize={15} fontWeight={700}>RW+</text>
      {/* movement arrow */}
      <line x1={165} y1={140} x2={205} y2={128} stroke="#94a3b8" strokeWidth={2} />
      <path d="M 205 128 l -9 -2 l 4 8 Z" fill="#94a3b8" />
      <text x={40} y={230} fill="#fbbf24" fontSize={18} fontWeight={700}>B</text>
      <line x1={55} y1={222} x2={95} y2={150} stroke="#fbbf24" strokeWidth={2} />
      <path d="M 95 150 l -8 3 l 6 6 Z" fill="#fbbf24" />

      {/* Area D: isolated embedded CB, top 43,000 */}
      <ellipse cx={380} cy={110} rx={42} ry={34} fill="none" stroke="#f87171" strokeWidth={2} strokeDasharray="6 5" />
      <circle cx={380} cy={116} r={9} fill="#f87171" />
      <line x1={358} y1={78} x2={402} y2={78} stroke="#e2e8f0" strokeWidth={2} />
      <text x={380} y={94} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={700}>430</text>
      <text x={438} y={230} fill="#fbbf24" fontSize={18} fontWeight={700}>D</text>
      <line x1={432} y1={222} x2={398} y2={150} stroke="#fbbf24" strokeWidth={2} />
      <path d="M 398 150 l 0 9 l 8 -5 Z" fill="#fbbf24" />
    </svg>
  </FigureFrame>
);

/* ---------- winds aloft FD table (MC 29) ---------- */

const WindsAloftFd = () => (
  <FigureFrame caption="FL270 falls between 24,000 and 30,000 — interpolate. Above FL240 temps are assumed negative.">
    <pre className="font-mono text-sm md:text-base text-slate-100 bg-slate-950 rounded-xl p-4 overflow-x-auto leading-relaxed">
{`FD  WINDS AND TEMPERATURES ALOFT FORECAST (EXCERPT)

FT        24000      30000
          2590-27    269638`}
    </pre>
  </FigureFrame>
);

/* ---------- holding figures (MC 20/31, MC 32, SA 34/35) ---------- */

const PlaneIcon = ({ x, y, heading }: { x: number; y: number; heading: number }) => (
  <g transform={`translate(${x} ${y}) rotate(${heading})`}>
    <path d="M 0 -12 L 5 6 L 0 2 L -5 6 Z" fill="#fbbf24" />
  </g>
);

const Racetrack = ({
  cx,
  cy,
  w,
  h,
  label,
}: {
  cx: number;
  cy: number;
  w: number;
  h: number;
  label?: string;
}) => (
  <g>
    <rect
      x={cx - w / 2}
      y={cy - h / 2}
      width={w}
      height={h}
      rx={w / 2}
      fill="none"
      stroke="#38bdf8"
      strokeWidth={2.5}
    />
    {label && (
      <text x={cx} y={cy + 5} textAnchor="middle" fill="#38bdf8" fontSize={18} fontWeight={700}>
        {label}
      </text>
    )}
  </g>
);

const Holding350 = () => (
  <FigureFrame caption='Cleared: "hold NORTH of the VOR on the 360° radial" — aircraft approaching heading 350°.'>
    <svg viewBox="0 0 400 380" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="Holding patterns at a VOR">
      {/* north arrow */}
      <line x1={40} y1={70} x2={40} y2={30} stroke="#64748b" strokeWidth={2} />
      <path d="M 40 30 l -6 10 l 12 0 Z" fill="#64748b" />
      <text x={40} y={88} textAnchor="middle" fill="#64748b" fontSize={12}>N</text>

      {/* 360 radial */}
      <line x1={200} y1={250} x2={200} y2={45} stroke="#94a3b8" strokeWidth={2} strokeDasharray="7 5" />
      <text x={212} y={60} fill="#94a3b8" fontSize={12}>360° radial</text>

      {/* VOR */}
      <path d="M 200 238 l 12 7 v 14 l -12 7 l -12 -7 v -14 Z" fill="#0f172a" stroke="#e2e8f0" strokeWidth={2} />
      <text x={228} y={258} fill="#e2e8f0" fontSize={12} fontWeight={600}>VOR</text>

      {/* pattern 1: north of the VOR */}
      <Racetrack cx={172} cy={140} w={56} h={140} label="1" />
      {/* pattern 2: south of the VOR */}
      <Racetrack cx={172} cy={318} w={48} h={100} label="2" />

      {/* aircraft heading 350 from the south */}
      <PlaneIcon x={252} y={340} heading={-10} />
      <line x1={248} y1={330} x2={212} y2={262} stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="4 4" />
      <text x={262} y={362} textAnchor="middle" fill="#fbbf24" fontSize={12}>HDG 350°</text>
    </svg>
  </FigureFrame>
);

const Holding140 = () => (
  <FigureFrame caption='Cleared to hold on the 140° bearing — the aircraft arrives on the non-holding side, more than 110° off the inbound course.'>
    <svg viewBox="0 0 400 340" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="Holding on the 140 degree bearing">
      {/* north arrow */}
      <line x1={40} y1={70} x2={40} y2={30} stroke="#64748b" strokeWidth={2} />
      <path d="M 40 30 l -6 10 l 12 0 Z" fill="#64748b" />
      <text x={40} y={88} textAnchor="middle" fill="#64748b" fontSize={12}>N</text>

      {/* station */}
      <path d="M 150 100 l 12 7 v 14 l -12 7 l -12 -7 v -14 Z" fill="#0f172a" stroke="#e2e8f0" strokeWidth={2} />
      <text x={150} y={88} textAnchor="middle" fill="#e2e8f0" fontSize={12} fontWeight={600}>Station</text>

      {/* 140 bearing line to SE */}
      <line x1={158} y1={122} x2={300} y2={290} stroke="#94a3b8" strokeWidth={2} strokeDasharray="7 5" />
      <text x={296} y={310} fill="#94a3b8" fontSize={12}>140° bearing</text>

      {/* racetrack along the bearing */}
      <g transform="rotate(40 229 206)">
        <Racetrack cx={229} cy={206} w={54} h={130} />
      </g>

      {/* aircraft approaching from the west, heading ~065 */}
      <PlaneIcon x={70} y={220} heading={62} />
      <line x1={80} y1={215} x2={140} y2={128} stroke="#fbbf24" strokeWidth={1.5} strokeDasharray="4 4" />
      <text x={70} y={244} textAnchor="middle" fill="#fbbf24" fontSize={12}>your track</text>
    </svg>
  </FigureFrame>
);

const HoldingEntries = () => (
  <FigureFrame caption="Entry sectors relative to the inbound course: direct (largest), teardrop (30° side), parallel (70° side).">
    <svg viewBox="0 0 440 300" className="w-full max-w-lg mx-auto h-auto" role="img" aria-label="Holding entry sectors">
      {/* racetrack, fix on the right, inbound leg on top pointing right */}
      <rect x={90} y={95} width={210} height={80} rx={40} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
      {/* fix */}
      <circle cx={300} cy={135} r={6} fill="#e2e8f0" />
      <text x={300} y={120} textAnchor="middle" fill="#e2e8f0" fontSize={12}>fix</text>
      {/* inbound arrow */}
      <line x1={160} y1={95} x2={250} y2={95} stroke="#38bdf8" strokeWidth={2.5} />
      <path d="M 253 95 l -10 -5 l 0 10 Z" fill="#38bdf8" />
      <text x={195} y={82} textAnchor="middle" fill="#38bdf8" fontSize={12}>inbound</text>

      {/* 70° sector line through the fix */}
      <line x1={300} y1={135} x2={410} y2={53} stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 5" />
      <line x1={300} y1={135} x2={190} y2={217} stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 5" />
      <text x={402} y={44} textAnchor="end" fill="#f59e0b" fontSize={11}>70° line</text>

      {/* sector labels */}
      <text x={360} y={190} textAnchor="middle" fill="#34d399" fontSize={15} fontWeight={700}>DIRECT</text>
      <text x={360} y={208} textAnchor="middle" fill="#64748b" fontSize={11}>(largest sector)</text>
      <text x={352} y={95} textAnchor="middle" fill="#f87171" fontSize={14} fontWeight={700}>TEARDROP</text>
      <text x={150} y={250} textAnchor="middle" fill="#c084fc" fontSize={14} fontWeight={700}>PARALLEL</text>
    </svg>
  </FigureFrame>
);

/* ---------- VOR service volume (SA 1) ---------- */

const Cylinder = ({
  cx,
  bottom,
  halfW,
  height,
  fill,
}: {
  cx: number;
  bottom: number;
  halfW: number;
  height: number;
  fill: string;
}) => (
  <g>
    <rect x={cx - halfW} y={bottom - height} width={halfW * 2} height={height} fill={fill} stroke="#38bdf8" strokeWidth={1.5} />
    <ellipse cx={cx} cy={bottom - height} rx={halfW} ry={8} fill="#0f172a" stroke="#38bdf8" strokeWidth={1.5} />
  </g>
);

const VorServiceVolume = () => (
  <FigureFrame caption="VOR standard service volumes (radius / altitude band).">
    <svg viewBox="0 0 560 360" className="w-full h-auto" role="img" aria-label="VOR service volumes">
      {/* Terminal */}
      <Cylinder cx={85} bottom={290} halfW={45} height={80} fill="rgba(56,189,248,0.10)" />
      <text x={85} y={318} textAnchor="middle" fill="#e2e8f0" fontSize={14} fontWeight={700}>T</text>
      <text x={85} y={336} textAnchor="middle" fill="#94a3b8" fontSize={11}>Terminal</text>
      <text x={85} y={196} textAnchor="middle" fill="#38bdf8" fontSize={12} fontWeight={600}>25 NM</text>
      <text x={85} y={252} textAnchor="middle" fill="#cbd5e1" fontSize={11}>1,000–12,000 ft</text>

      {/* Low */}
      <Cylinder cx={230} bottom={290} halfW={70} height={120} fill="rgba(56,189,248,0.10)" />
      <text x={230} y={318} textAnchor="middle" fill="#e2e8f0" fontSize={14} fontWeight={700}>L</text>
      <text x={230} y={336} textAnchor="middle" fill="#94a3b8" fontSize={11}>Low altitude</text>
      <text x={230} y={156} textAnchor="middle" fill="#38bdf8" fontSize={12} fontWeight={600}>40 NM</text>
      <text x={230} y={240} textAnchor="middle" fill="#cbd5e1" fontSize={11}>1,000–18,000 ft</text>

      {/* High — stepped tiers */}
      <g>
        {/* 1,000–14,500: 40 NM */}
        <rect x={415 - 40} y={258} width={80} height={32} fill="rgba(52,211,153,0.10)" stroke="#34d399" strokeWidth={1.5} />
        {/* 14,500–18,000: 100 NM */}
        <rect x={415 - 85} y={232} width={170} height={26} fill="rgba(52,211,153,0.10)" stroke="#34d399" strokeWidth={1.5} />
        {/* 18,000–45,000: 130 NM */}
        <rect x={415 - 115} y={140} width={230} height={92} fill="rgba(52,211,153,0.10)" stroke="#34d399" strokeWidth={1.5} />
        {/* 45,000–60,000: 100 NM */}
        <rect x={415 - 85} y={92} width={170} height={48} fill="rgba(52,211,153,0.10)" stroke="#34d399" strokeWidth={1.5} />
      </g>
      <text x={415} y={318} textAnchor="middle" fill="#e2e8f0" fontSize={14} fontWeight={700}>H</text>
      <text x={415} y={336} textAnchor="middle" fill="#94a3b8" fontSize={11}>High altitude</text>
      <text x={415} y={278} textAnchor="middle" fill="#cbd5e1" fontSize={10}>40 NM · 1,000–14,500</text>
      <text x={415} y={249} textAnchor="middle" fill="#cbd5e1" fontSize={10}>100 NM · 14,500–18,000</text>
      <text x={415} y={190} textAnchor="middle" fill="#cbd5e1" fontSize={11}>130 NM · 18,000–45,000</text>
      <text x={415} y={120} textAnchor="middle" fill="#cbd5e1" fontSize={10}>100 NM · 45,000–60,000</text>
    </svg>
  </FigureFrame>
);

/* ---------- MSA circle (SA 16) ---------- */

const MsaCircle = () => (
  <FigureFrame caption="Example MSA circle from an approach chart plan view — 1,000 ft obstacle clearance within 25 NM, emergency use.">
    <svg viewBox="0 0 300 260" className="w-full max-w-[300px] mx-auto h-auto" role="img" aria-label="MSA circle">
      <circle cx={150} cy={120} r={92} fill="rgba(56,189,248,0.06)" stroke="#38bdf8" strokeWidth={2} />
      <line x1={58} y1={120} x2={242} y2={120} stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="5 4" />
      <circle cx={150} cy={120} r={5} fill="#e2e8f0" />
      <text x={150} y={80} textAnchor="middle" fill="#f8fafc" fontSize={18} fontWeight={700}>5,600</text>
      <text x={150} y={170} textAnchor="middle" fill="#f8fafc" fontSize={18} fontWeight={700}>3,300</text>
      <text x={150} y={238} textAnchor="middle" fill="#94a3b8" fontSize={13}>MSA 25 NM</text>
    </svg>
  </FigureFrame>
);

/* ---------- Class G day VFR scenario (MC 14 / 40) ---------- */

const ClassGDay = () => (
  <FigureFrame caption="Day VFR in Class G airspace, more than 1,200 ft AGL, below 10,000 ft MSL.">
    <svg viewBox="0 0 480 220" className="w-full h-auto" role="img" aria-label="Class G airspace scenario">
      {/* sun */}
      <circle cx={430} cy={40} r={16} fill="#fbbf24" opacity={0.9} />
      {/* airplane */}
      <text x={150} y={62} fontSize={28} fill="#f8fafc">✈</text>
      <text x={196} y={58} fill="#e2e8f0" fontSize={13} fontWeight={600}>8,500 ft MSL</text>
      {/* class G label */}
      <text x={240} y={120} textAnchor="middle" fill="#38bdf8" fontSize={15} fontWeight={700}>CLASS G AIRSPACE</text>
      {/* 1200 AGL line */}
      <line x1={20} y1={160} x2={460} y2={160} stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="8 6" />
      <text x={452} y={152} textAnchor="end" fill="#94a3b8" fontSize={11}>1,200 ft AGL</text>
      {/* terrain */}
      <path d="M 0 200 q 60 -22 120 -8 q 80 16 160 2 q 100 -16 200 6 L 480 220 L 0 220 Z" fill="#7c4a12" opacity={0.55} />
    </svg>
  </FigureFrame>
);

/* ---------- registry ---------- */

const StudyFigure = ({ id }: { id: FigureId }) => {
  switch (id) {
    case 'altimeters-12000':
      return <Altimeters12000 />;
    case 'panel-climbing-right':
      return <SixPack config={panelClimbingRight} />;
    case 'panel-level-right':
      return <SixPack config={panelLevelRight} />;
    case 'runway-fixed-distance':
      return <RunwayFixedDistance />;
    case 'radar-summary':
      return <RadarSummary />;
    case 'winds-aloft-fd':
      return <WindsAloftFd />;
    case 'holding-350':
      return <Holding350 />;
    case 'holding-140':
      return <Holding140 />;
    case 'holding-entries':
      return <HoldingEntries />;
    case 'vor-service-volume':
      return <VorServiceVolume />;
    case 'msa-circle':
      return <MsaCircle />;
    case 'class-g-day':
      return <ClassGDay />;
  }
};

export default StudyFigure;
