import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

const LETTERS = ['A', 'B', 'C', 'D'];

interface StudyFlashcardProps {
  questions: StudyQuestion[];
  deckTitle: string;
  startIndex?: number;
  flaggedIds: Set<string>;
  onToggleFlag: (id: string) => void;
  onBack: () => void;
  onComplete: () => void;
}

const StudyFlashcard = ({
  questions,
  deckTitle,
  startIndex = 0,
  flaggedIds,
  onToggleFlag,
  onBack,
  onComplete,
}: StudyFlashcardProps) => {
  const [index, setIndex] = useState(Math.min(startIndex, questions.length - 1));
  const [flipped, setFlipped] = useState(false);
  const [jumpOpen, setJumpOpen] = useState(false);

  const q = questions[index];
  const isFirst = index === 0;
  const isLast = index === questions.length - 1;
  const longAnswer = q.answer.length > 160;

  const jumpTo = (i: number) => {
    setFlipped(false);
    setIndex(i);
    window.scrollTo({ top: 0 });
  };

  const goPrev = () => {
    if (isFirst) return;
    jumpTo(index - 1);
  };

  const goNext = () => {
    if (isLast) {
      onComplete();
      return;
    }
    jumpTo(index + 1);
  };

  const progress = ((index + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col min-h-[80dvh]">
      <StudySessionChrome
        deckTitle={deckTitle}
        currentLabel={`${index + 1}/${questions.length}`}
        progressPct={progress}
        progressColorClass="bg-violet-500"
        flagged={flaggedIds.has(q.id)}
        onBack={onBack}
        onOpenJump={() => setJumpOpen(true)}
        onToggleFlag={() => onToggleFlag(q.id)}
      />

      <div className="flex-1 flex flex-col items-center justify-center py-2">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setFlipped((f) => !f)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setFlipped((f) => !f);
          }}
          className="study-flashcard w-full max-w-xl h-[52dvh] min-h-[320px] max-h-[520px] cursor-pointer"
          aria-label={flipped ? 'Show question' : 'Show answer'}
        >
          <div className={`study-flashcard-inner relative w-full h-full ${flipped ? 'flipped' : ''}`}>
            <div className="study-flashcard-face absolute inset-0 rounded-2xl border border-slate-600 bg-slate-800 shadow-xl flex overflow-y-auto p-6">
              <div className="m-auto w-full text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-slate-400 bg-slate-900/60 rounded-md px-2 py-1">
                    Q{q.number}
                  </span>
                  {q.category && (
                    <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
                      {q.category}
                    </span>
                  )}
                </div>
                <p className="text-xl md:text-2xl font-medium text-white leading-snug whitespace-pre-line">
                  {q.question}
                </p>
                {q.figure && (!q.figurePlacement || q.figurePlacement === 'question') && (
                  <div className="mt-4 text-left">
                    <StudyFigure id={q.figure} />
                  </div>
                )}
                {q.diagrams?.length ? (
                  <div className="mt-4 space-y-4 text-left">{renderDiagrams(q, 'hidden')}</div>
                ) : null}
                {q.options && (
                  <div className="mt-5 space-y-2 text-left">
                    {q.options.map((opt, i) => (
                      <p key={i} className="text-slate-300 text-base">
                        <span className="font-bold text-slate-500 mr-2">{LETTERS[i]}.</span>
                        {opt}
                      </p>
                    ))}
                  </div>
                )}
                <p className="text-slate-500 text-sm mt-6">Tap to reveal answer</p>
              </div>
            </div>

            <div className="study-flashcard-face study-flashcard-back absolute inset-0 rounded-2xl border border-emerald-600/40 bg-slate-800 shadow-xl flex overflow-y-auto p-6">
              <div className={`m-auto w-full ${longAnswer || q.diagrams?.length ? 'text-left' : 'text-center'}`}>
                <p className={`text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3 ${longAnswer || q.diagrams?.length ? '' : 'text-center'}`}>
                  Answer
                </p>
                {q.diagrams?.length ? (
                  <div className="space-y-4">{renderDiagrams(q, 'revealed')}</div>
                ) : (
                  <p className={`text-slate-100 whitespace-pre-line leading-relaxed ${longAnswer ? 'text-base' : 'text-xl md:text-2xl font-medium text-emerald-200'}`}>
                    {q.answer}
                  </p>
                )}
                {q.note && (
                  <p className="text-sky-300/90 text-sm whitespace-pre-line leading-relaxed mt-4 text-left">
                    {q.note}
                  </p>
                )}
                {q.figure && q.figurePlacement === 'answer' && (
                  <div className="mt-4 text-left">
                    <StudyFigure id={q.figure} />
                  </div>
                )}
                <p className="text-slate-500 text-sm mt-6 text-center">Tap to flip back</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          className="study-touch-target flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 text-white disabled:opacity-30 active:bg-slate-800"
        >
          <ChevronLeft className="w-6 h-6" />
          Previous
        </button>
        <button
          type="button"
          onClick={goNext}
          className="study-touch-target flex items-center justify-center gap-2 rounded-xl bg-violet-600 text-white font-medium active:bg-violet-700"
        >
          {isLast ? 'Finish' : 'Next'}
          {!isLast && <ChevronRight className="w-6 h-6" />}
        </button>
      </div>

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

export default StudyFlashcard;
