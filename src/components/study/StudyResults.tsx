import { RotateCcw, Target, Trophy } from 'lucide-react';

interface StudyResultsProps {
  deckTitle: string;
  correct: number;
  total: number;
  missedCount: number;
  onRetry: () => void;
  onReviewMissed: () => void;
  onHome: () => void;
}

const StudyResults = ({
  deckTitle,
  correct,
  total,
  missedCount,
  onRetry,
  onReviewMissed,
  onHome,
}: StudyResultsProps) => {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const passed = pct >= 70;

  return (
    <div className="w-full max-w-md mx-auto text-center space-y-8 py-8">
      <div className={`inline-flex p-4 rounded-full ${passed ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
        <Trophy className={`w-12 h-12 ${passed ? 'text-emerald-400' : 'text-amber-400'}`} />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">
          {passed ? 'Nice work!' : 'Keep studying'}
        </h1>
        <p className="text-slate-400">{deckTitle}</p>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-8 space-y-4">
        <p className="text-5xl font-bold text-white">{pct}%</p>
        <p className="text-slate-400 text-lg">
          {correct} of {total} marked "Got it"
        </p>
        {missedCount > 0 && (
          <p className="text-amber-400/90 text-base">
            {missedCount} marked for review
          </p>
        )}
      </div>

      <div className="grid gap-3">
        {missedCount > 0 && (
          <button
            type="button"
            onClick={onReviewMissed}
            className="study-touch-target w-full flex items-center justify-center gap-2 rounded-xl bg-amber-600 text-white font-semibold text-lg active:bg-amber-700"
          >
            <Target className="w-5 h-5" />
            Review {missedCount} Missed
          </button>
        )}
        <button
          type="button"
          onClick={onRetry}
          className="study-touch-target w-full flex items-center justify-center gap-2 rounded-xl bg-sky-600 text-white font-semibold text-lg active:bg-sky-700"
        >
          <RotateCcw className="w-5 h-5" />
          Study Again
        </button>
        <button
          type="button"
          onClick={onHome}
          className="study-touch-target w-full rounded-xl border border-slate-700 text-slate-300 text-lg active:bg-slate-800"
        >
          Choose Another Deck
        </button>
      </div>
    </div>
  );
};

export default StudyResults;
