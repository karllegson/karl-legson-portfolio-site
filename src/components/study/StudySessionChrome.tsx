import { ArrowLeft, Flag, ListOrdered } from 'lucide-react';

interface StudySessionChromeProps {
  deckTitle: string;
  currentLabel: string;
  progressPct: number;
  progressColorClass: string;
  flagged: boolean;
  onBack: () => void;
  onOpenJump: () => void;
  onToggleFlag: () => void;
}

const StudySessionChrome = ({
  deckTitle,
  currentLabel,
  progressPct,
  progressColorClass,
  flagged,
  onBack,
  onOpenJump,
  onToggleFlag,
}: StudySessionChromeProps) => (
  <>
    <div className="flex items-center justify-between mb-3 gap-3">
      <button
        type="button"
        onClick={onBack}
        className="study-touch-target inline-flex items-center gap-2 text-slate-400 active:text-white shrink-0"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Exit</span>
      </button>
      <p className="text-slate-500 text-sm truncate text-center flex-1">{deckTitle}</p>
      <button
        type="button"
        onClick={onOpenJump}
        className="study-touch-target inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/70 px-3 text-slate-200 text-sm font-medium active:bg-slate-800 shrink-0"
        aria-label="Jump to question"
      >
        <ListOrdered className="w-4 h-4" />
        {currentLabel}
      </button>
    </div>

    <div className="h-2 rounded-full bg-slate-800 overflow-hidden mb-4">
      <div
        className={`h-full transition-all duration-300 ${progressColorClass}`}
        style={{ width: `${progressPct}%` }}
      />
    </div>

    <div className="flex justify-end mb-3">
      <button
        type="button"
        onClick={onToggleFlag}
        className={`study-touch-target inline-flex items-center gap-2 rounded-xl border px-3 text-sm font-medium transition-colors ${
          flagged
            ? 'border-amber-500/60 bg-amber-500/15 text-amber-300'
            : 'border-slate-700 bg-slate-800/50 text-slate-400 active:bg-slate-800'
        }`}
        aria-pressed={flagged}
        aria-label={flagged ? 'Unmark common mistake' : 'Mark as common mistake'}
      >
        <Flag className={`w-4 h-4 ${flagged ? 'fill-amber-400 text-amber-400' : ''}`} />
        {flagged ? 'Common mistake' : 'Mark mistake'}
      </button>
    </div>
  </>
);

export default StudySessionChrome;
