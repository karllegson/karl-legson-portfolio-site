import { useState } from 'react';
import { Check, ChevronRight, X } from 'lucide-react';
import type { StudyQuestion } from './studyData';
import StudyFigure from './StudyFigures';
import StudySessionChrome from './StudySessionChrome';
import QuestionJumpPicker from './QuestionJumpPicker';

interface StudyQuizProps {
  questions: StudyQuestion[];
  deckTitle: string;
  startIndex?: number;
  flaggedIds: Set<string>;
  onToggleFlag: (id: string) => void;
  onBack: () => void;
  onComplete: (correct: number, total: number, missedIds: string[]) => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

const StudyQuiz = ({
  questions,
  deckTitle,
  startIndex = 0,
  flaggedIds,
  onToggleFlag,
  onBack,
  onComplete,
}: StudyQuizProps) => {
  const [index, setIndex] = useState(Math.min(startIndex, questions.length - 1));
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [missedIds, setMissedIds] = useState<string[]>([]);
  const [jumpOpen, setJumpOpen] = useState(false);

  const q = questions[index];
  const isLast = index === questions.length - 1;
  const answered = selected !== null;
  const wasCorrect = answered && selected === q.correctIndex;

  const jumpTo = (i: number) => {
    setIndex(i);
    setSelected(null);
    window.scrollTo({ top: 0 });
  };

  const choose = (i: number) => {
    if (answered) return;
    setSelected(i);
    if (i === q.correctIndex) {
      setCorrectCount((c) => c + 1);
    } else {
      setMissedIds((m) => (m.includes(q.id) ? m : [...m, q.id]));
    }
  };

  const next = () => {
    if (isLast) {
      onComplete(correctCount, questions.length, missedIds);
      return;
    }
    jumpTo(index + 1);
  };

  const progress = ((index + (answered ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col">
      <StudySessionChrome
        deckTitle={deckTitle}
        currentLabel={`${index + 1}/${questions.length}`}
        progressPct={progress}
        progressColorClass="bg-emerald-500"
        flagged={flaggedIds.has(q.id)}
        onBack={onBack}
        onOpenJump={() => setJumpOpen(true)}
        onToggleFlag={() => onToggleFlag(q.id)}
      />

      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="text-sm font-semibold text-slate-300 bg-slate-800 rounded-lg px-3 py-1">
          Q{q.number}
        </span>
        {q.category && (
          <span className="text-xs font-medium text-emerald-400/90 uppercase tracking-wider">
            {q.category}
          </span>
        )}
      </div>

      <h2 className="text-xl md:text-2xl font-medium text-white leading-snug mb-5 whitespace-pre-line">
        {q.question}
      </h2>

      {q.figure && (!q.figurePlacement || q.figurePlacement === 'question') && (
        <div className="mb-5">
          <StudyFigure id={q.figure} />
        </div>
      )}

      <div className="space-y-3">
        {q.options?.map((opt, i) => {
          const isCorrect = i === q.correctIndex;
          const isSelected = i === selected;
          let style = 'border-slate-700 bg-slate-800/50 text-slate-100 active:bg-slate-800';
          if (answered) {
            if (isCorrect) {
              style = 'border-emerald-500 bg-emerald-500/15 text-emerald-100';
            } else if (isSelected) {
              style = 'border-red-500 bg-red-500/15 text-red-200';
            } else {
              style = 'border-slate-800 bg-slate-900/40 text-slate-500';
            }
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={answered}
              className={`study-touch-target w-full flex items-center gap-4 rounded-xl border px-4 py-4 text-left text-base md:text-lg leading-snug transition-colors ${style}`}
            >
              <span className="shrink-0 w-8 h-8 rounded-full bg-slate-900/70 flex items-center justify-center text-sm font-bold">
                {answered && isCorrect ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : answered && isSelected ? (
                  <X className="w-4 h-4 text-red-400" />
                ) : (
                  LETTERS[i]
                )}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-5 space-y-4 pb-4">
          <p className={`text-lg font-semibold ${wasCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
            {wasCorrect ? 'Correct!' : 'Not quite.'}
          </p>
          {q.note && (
            <div className="rounded-xl border border-sky-500/30 bg-sky-500/[0.07] p-4">
              <p className="text-sky-100 text-base whitespace-pre-line leading-relaxed">
                {q.note}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={next}
            className="study-touch-target w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white font-semibold text-lg active:bg-emerald-700"
          >
            {isLast ? 'See Results' : 'Next Question'}
            {!isLast && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      )}

      {jumpOpen && (
        <QuestionJumpPicker
          questions={questions}
          currentIndex={index}
          flaggedIds={flaggedIds}
          onJump={jumpTo}
          onClose={() => setJumpOpen(false)}
        />
      )}
    </div>
  );
};

export default StudyQuiz;
