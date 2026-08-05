import { useState } from 'react';
import { Check, Eye, X } from 'lucide-react';
import type { StudyQuestion } from './studyData';
import StationModelDiagram, { type DiagramMode } from './StationModelDiagram';
import StationModelSimple from './StationModelSimple';
import StudyFigure from './StudyFigures';
import StudySessionChrome from './StudySessionChrome';
import QuestionJumpPicker from './QuestionJumpPicker';

const renderDiagrams = (q: StudyQuestion, mode: DiagramMode) =>
  q.diagrams?.map((d) =>
    d === 'station-model' ? (
      <StationModelDiagram key={`${q.id}-${d}`} mode={mode} />
    ) : (
      <StationModelSimple key={`${q.id}-${d}`} mode={mode} />
    ),
  );

interface StudyWrittenProps {
  questions: StudyQuestion[];
  deckTitle: string;
  startIndex?: number;
  flaggedIds: Set<string>;
  onToggleFlag: (id: string) => void;
  onBack: () => void;
  onComplete: (gotIt: number, total: number, missedIds: string[]) => void;
}

const StudyWritten = ({
  questions,
  deckTitle,
  startIndex = 0,
  flaggedIds,
  onToggleFlag,
  onBack,
  onComplete,
}: StudyWrittenProps) => {
  const [index, setIndex] = useState(Math.min(startIndex, questions.length - 1));
  const [typed, setTyped] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [gotItCount, setGotItCount] = useState(0);
  const [missedIds, setMissedIds] = useState<string[]>([]);
  const [jumpOpen, setJumpOpen] = useState(false);

  const q = questions[index];
  const isLast = index === questions.length - 1;

  const jumpTo = (i: number) => {
    setIndex(i);
    setTyped('');
    setRevealed(false);
    window.scrollTo({ top: 0 });
  };

  const grade = (gotIt: boolean) => {
    const nextGotIt = gotItCount + (gotIt ? 1 : 0);
    const nextMissed = gotIt ? missedIds : [...missedIds, q.id];

    if (isLast) {
      onComplete(nextGotIt, questions.length, nextMissed);
      return;
    }

    setGotItCount(nextGotIt);
    setMissedIds(nextMissed);
    jumpTo(index + 1);
  };

  const progress = ((index + (revealed ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col">
      <StudySessionChrome
        deckTitle={deckTitle}
        currentLabel={`${index + 1}/${questions.length}`}
        progressPct={progress}
        progressColorClass="bg-sky-500"
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
          <span className="text-xs font-medium text-sky-400/90 uppercase tracking-wider">
            {q.category}
          </span>
        )}
      </div>

      <h2 className="text-xl md:text-2xl font-medium text-white leading-snug mb-6 whitespace-pre-line">
        {q.question}
      </h2>

      {q.figure && (!q.figurePlacement || q.figurePlacement === 'question') && (
        <div className="mb-6">
          <StudyFigure id={q.figure} />
        </div>
      )}

      {q.diagrams?.length ? (
        <div className="mb-6 space-y-4">{renderDiagrams(q, 'interactive')}</div>
      ) : !revealed ? (
        <textarea
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          placeholder="Write your answer like you would on the test…"
          rows={5}
          className="w-full mb-6 rounded-xl border border-slate-700 bg-slate-800/60 p-4 text-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500/60 leading-relaxed"
        />
      ) : null}

      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="study-touch-target w-full flex items-center justify-center gap-2 rounded-xl bg-sky-600 text-white font-semibold text-lg active:bg-sky-700"
        >
          <Eye className="w-5 h-5" />
          Reveal Answer
        </button>
      ) : (
        <div className="space-y-5">
          {typed.trim() && (
            <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Your answer
              </p>
              <p className="text-slate-200 text-base whitespace-pre-line leading-relaxed">
                {typed}
              </p>
            </div>
          )}

          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/[0.07] p-5">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              Model answer
            </p>
            <p className="text-slate-100 text-base whitespace-pre-line leading-relaxed">
              {q.answer}
            </p>
          </div>

          {q.figure && q.figurePlacement === 'answer' && (
            <StudyFigure id={q.figure} />
          )}

          <div className="grid grid-cols-2 gap-4 pb-4">
            <button
              type="button"
              onClick={() => grade(false)}
              className="study-touch-target flex items-center justify-center gap-2 rounded-xl border border-amber-500/50 bg-amber-500/10 text-amber-300 font-semibold text-lg active:bg-amber-500/20"
            >
              <X className="w-5 h-5" />
              Need review
            </button>
            <button
              type="button"
              onClick={() => grade(true)}
              className="study-touch-target flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white font-semibold text-lg active:bg-emerald-700"
            >
              <Check className="w-5 h-5" />
              Got it
            </button>
          </div>
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

export default StudyWritten;
