import { Flag, X } from 'lucide-react';
import type { StudyQuestion } from './studyData';

interface QuestionJumpPickerProps {
  questions: StudyQuestion[];
  currentIndex: number;
  flaggedIds: Set<string>;
  onJump: (index: number) => void;
  onClose: () => void;
}

const QuestionJumpPicker = ({
  questions,
  currentIndex,
  flaggedIds,
  onJump,
  onClose,
}: QuestionJumpPickerProps) => (
  <div
    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-4"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
    aria-label="Jump to question"
  >
    <div
      className="w-full max-w-lg max-h-[80dvh] overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Jump to question</h2>
          <p className="text-sm text-slate-400">
            Flagged questions show a star
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="study-touch-target w-11 h-11 flex items-center justify-center rounded-xl bg-slate-800 text-slate-300 active:bg-slate-700"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
        {questions.map((q, i) => {
          const flagged = flaggedIds.has(q.id);
          const current = i === currentIndex;
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => {
                onJump(i);
                onClose();
              }}
              className={`study-touch-target relative rounded-xl border text-base font-semibold transition-colors ${
                current
                  ? 'border-sky-500 bg-sky-500/20 text-sky-200'
                  : flagged
                    ? 'border-amber-500/60 bg-amber-500/10 text-amber-200'
                    : 'border-slate-700 bg-slate-800/60 text-slate-200 active:bg-slate-800'
              }`}
            >
              {q.number}
              {flagged && (
                <Flag className="absolute top-1 right-1 w-3 h-3 text-amber-400 fill-amber-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

export default QuestionJumpPicker;
