import { ArrowLeft, BookOpen, Flag, ListChecks, ListOrdered, PenLine, RotateCcw, Shuffle, Target } from 'lucide-react';
import type { StudyDeck, StudyQuestion } from './studyData';
import QuestionJumpPicker from './QuestionJumpPicker';
import { useState } from 'react';

interface StudyDeckPickerProps {
  decks: StudyDeck[];
  onSelectDeck: (deck: StudyDeck) => void;
}

const accentStyles = {
  sky: {
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/10',
    icon: 'text-sky-400',
    badge: 'bg-sky-500/20 text-sky-300',
  },
  amber: {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    icon: 'text-amber-400',
    badge: 'bg-amber-500/20 text-amber-300',
  },
  emerald: {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    icon: 'text-emerald-400',
    badge: 'bg-emerald-500/20 text-emerald-300',
  },
};

const StudyDeckPicker = ({ decks, onSelectDeck }: StudyDeckPickerProps) => (
  <div className="w-full max-w-2xl mx-auto space-y-6">
    <div className="text-center space-y-2 px-2">
      <p className="text-sky-400/80 text-sm font-medium uppercase tracking-widest">
        Aviation Study
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-white">
        Choose a deck
      </h1>
      <p className="text-slate-400 text-lg">
        IFR Phase 3 & Ground School Final
      </p>
    </div>

    <div className="grid gap-4">
      {decks.map((deck) => {
        const style = accentStyles[deck.accent];
        return (
          <button
            key={deck.id}
            type="button"
            onClick={() => onSelectDeck(deck)}
            className={`study-touch-target w-full text-left rounded-2xl border ${style.border} ${style.bg} p-6 active:scale-[0.98] transition-transform`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl bg-slate-900/50 ${style.icon}`}>
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h2 className="text-xl font-semibold text-white">{deck.title}</h2>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.badge}`}>
                    {deck.questions.length} Q
                  </span>
                </div>
                <p className="text-slate-400 text-base">{deck.subtitle}</p>
                <p className="text-slate-500 text-sm mt-2">{deck.description}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  </div>
);

export default StudyDeckPicker;

export interface StudyModePickerProps {
  deck: StudyDeck;
  onSelectMode: (mode: 'written' | 'quiz' | 'flashcard', startIndex?: number) => void;
  onBack: () => void;
  onShuffle: () => void;
  shuffled: boolean;
  missedCount: number;
  onReviewMissed: () => void;
  flaggedCount: number;
  flaggedIds: Set<string>;
  onReviewFlagged: () => void;
}

const shuffleAccent = {
  sky: 'border-sky-500/30 bg-sky-500/10 text-sky-400',
  amber: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
  emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
};

export const StudyModePicker = ({
  deck,
  onSelectMode,
  onBack,
  onShuffle,
  shuffled,
  missedCount,
  onReviewMissed,
  flaggedCount,
  flaggedIds,
  onReviewFlagged,
}: StudyModePickerProps) => {
  const style = shuffleAccent[deck.accent];
  const [jumpOpen, setJumpOpen] = useState(false);
  const [pendingMode, setPendingMode] = useState<'written' | 'quiz' | 'flashcard'>('flashcard');

  const openJumpFor = (mode: 'written' | 'quiz' | 'flashcard') => {
    setPendingMode(mode);
    setJumpOpen(true);
  };

  const startMode = (mode: 'written' | 'quiz' | 'flashcard') => {
    onSelectMode(mode);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="study-touch-target inline-flex items-center gap-2 text-slate-400 active:text-white px-2 -ml-2"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-base">Back</span>
      </button>

      <div className="text-center space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-white">{deck.title}</h1>
        <p className="text-slate-400">{deck.questions.length} questions</p>
      </div>

      <button
        type="button"
        onClick={onShuffle}
        className={`study-touch-target w-full flex items-center justify-center gap-2 rounded-xl border ${style} px-4`}
      >
        <Shuffle className="w-5 h-5" />
        <span>{shuffled ? 'Order shuffled' : 'Shuffle questions'}</span>
      </button>

      <div className="grid gap-4 sm:grid-cols-2">
        {deck.kind === 'mc' ? (
          <button
            type="button"
            onClick={() => startMode('quiz')}
            className="study-touch-target rounded-2xl border border-slate-700 bg-slate-800/50 p-6 text-left active:bg-slate-800 transition-colors"
          >
            <ListChecks className="w-8 h-8 text-emerald-400 mb-3" />
            <h2 className="text-xl font-semibold text-white mb-1">Multiple Choice</h2>
            <p className="text-slate-400 text-base">
              Answer A/B/C like the real test with instant feedback
            </p>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => startMode('written')}
            className="study-touch-target rounded-2xl border border-slate-700 bg-slate-800/50 p-6 text-left active:bg-slate-800 transition-colors"
          >
            <PenLine className="w-8 h-8 text-emerald-400 mb-3" />
            <h2 className="text-xl font-semibold text-white mb-1">Written Practice</h2>
            <p className="text-slate-400 text-base">
              Write your answer like the real test, reveal the model answer, self-grade
            </p>
          </button>
        )}

        <button
          type="button"
          onClick={() => startMode('flashcard')}
          className="study-touch-target rounded-2xl border border-slate-700 bg-slate-800/50 p-6 text-left active:bg-slate-800 transition-colors"
        >
          <RotateCcw className="w-8 h-8 text-violet-400 mb-3" />
          <h2 className="text-xl font-semibold text-white mb-1">Flashcards</h2>
          <p className="text-slate-400 text-base">
            Tap to flip between question and answer
          </p>
        </button>
      </div>

      <button
        type="button"
        onClick={() => openJumpFor(deck.kind === 'mc' ? 'quiz' : 'written')}
        className="study-touch-target w-full flex items-center justify-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 text-sky-300 font-semibold text-lg active:bg-sky-500/20"
      >
        <ListOrdered className="w-5 h-5" />
        Jump to a question number
      </button>

      {flaggedCount > 0 && (
        <button
          type="button"
          onClick={onReviewFlagged}
          className="study-touch-target w-full flex items-center justify-center gap-2 rounded-xl border border-amber-500/50 bg-amber-500/10 text-amber-300 font-semibold text-lg active:bg-amber-500/20"
        >
          <Flag className="w-5 h-5 fill-amber-400" />
          Review {flaggedCount} common mistake{flaggedCount === 1 ? '' : 's'}
        </button>
      )}

      {missedCount > 0 && (
        <button
          type="button"
          onClick={onReviewMissed}
          className="study-touch-target w-full flex items-center justify-center gap-2 rounded-xl border border-orange-500/40 bg-orange-500/10 text-orange-300 font-semibold text-lg active:bg-orange-500/20"
        >
          <Target className="w-5 h-5" />
          Review {missedCount} missed last session
        </button>
      )}

      {jumpOpen && (
        <QuestionJumpPicker
          questions={deck.questions as StudyQuestion[]}
          currentIndex={-1}
          flaggedIds={flaggedIds}
          onJump={(i) => onSelectMode(pendingMode, i)}
          onClose={() => setJumpOpen(false)}
        />
      )}
    </div>
  );
};
