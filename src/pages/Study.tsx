import { useCallback, useMemo, useState } from 'react';
import '@/components/study/study-styles.css';
import { studyDecks, type StudyDeck } from '@/components/study/studyData';
import StudyDeckPicker, { StudyModePicker } from '@/components/study/StudyDeckPicker';
import StudyWritten from '@/components/study/StudyWritten';
import StudyQuiz from '@/components/study/StudyQuiz';
import StudyFlashcard from '@/components/study/StudyFlashcard';
import StudyResults from '@/components/study/StudyResults';
import {
  loadDeckRecord,
  loadFlagged,
  saveDeckRecord,
  saveFlagged,
} from '@/lib/study-progress';

type Screen = 'home' | 'mode' | 'written' | 'quiz' | 'flashcard' | 'results';
type ReviewFilter = 'none' | 'missed' | 'flagged';

const shuffleArray = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const Study = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [deck, setDeck] = useState<StudyDeck | null>(null);
  const [shuffled, setShuffled] = useState(false);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [results, setResults] = useState({ correct: 0, total: 0 });
  const [storedMissed, setStoredMissed] = useState<string[]>([]);
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('none');
  const [startIndex, setStartIndex] = useState(0);
  const [runId, setRunId] = useState(0);

  const orderedQuestions = useMemo(() => {
    if (!deck) return [];
    if (!shuffled || questionOrder.length !== deck.questions.length) {
      return deck.questions;
    }
    return questionOrder.map((i) => deck.questions[i]);
  }, [deck, shuffled, questionOrder]);

  const activeQuestions = useMemo(() => {
    if (reviewFilter === 'missed') {
      return orderedQuestions.filter((q) => storedMissed.includes(q.id));
    }
    if (reviewFilter === 'flagged') {
      return orderedQuestions.filter((q) => flaggedIds.has(q.id));
    }
    return orderedQuestions;
  }, [orderedQuestions, reviewFilter, storedMissed, flaggedIds]);

  const selectDeck = (d: StudyDeck) => {
    setDeck(d);
    setShuffled(false);
    setQuestionOrder([]);
    setStoredMissed(loadDeckRecord(d.id)?.missedIds ?? []);
    setFlaggedIds(new Set(loadFlagged(d.id)));
    setReviewFilter('none');
    setStartIndex(0);
    setScreen('mode');
  };

  const toggleShuffle = () => {
    if (!deck) return;
    if (shuffled) {
      setShuffled(false);
      setQuestionOrder([]);
    } else {
      setQuestionOrder(shuffleArray(deck.questions.map((_, i) => i)));
      setShuffled(true);
    }
  };

  const toggleFlag = useCallback(
    (id: string) => {
      if (!deck) return;
      setFlaggedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        saveFlagged(deck.id, Array.from(next));
        return next;
      });
    },
    [deck],
  );

  const startSession = (
    mode: 'written' | 'quiz' | 'flashcard',
    opts?: { filter?: ReviewFilter; index?: number },
  ) => {
    if (!deck) return;
    setReviewFilter(opts?.filter ?? 'none');
    setStartIndex(opts?.index ?? 0);
    setRunId((r) => r + 1);
    setScreen(mode);
  };

  const handlePracticeComplete = useCallback(
    (correct: number, total: number, missedIds: string[]) => {
      if (deck) {
        saveDeckRecord(deck.id, {
          missedIds,
          lastScore: { correct, total },
          updatedAt: new Date().toISOString(),
        });
      }
      setStoredMissed(missedIds);
      setResults({ correct, total });
      setScreen('results');
    },
    [deck],
  );

  const goHome = () => {
    setScreen('home');
    setDeck(null);
    setShuffled(false);
    setQuestionOrder([]);
    setReviewFilter('none');
    setStartIndex(0);
  };

  const goMode = () => {
    setReviewFilter('none');
    setStartIndex(0);
    setScreen('mode');
  };

  const practiceTitle = deck
    ? reviewFilter === 'missed'
      ? `${deck.title} — Missed review`
      : reviewFilter === 'flagged'
        ? `${deck.title} — Common mistakes`
        : deck.title
    : '';

  const practiceMode = deck?.kind === 'mc' ? 'quiz' : 'written';

  return (
    <div className="study-page bg-slate-950 text-white">
      <div className="min-h-[100dvh] px-5 py-6 md:px-8 md:py-10 flex flex-col">
        {screen === 'home' && (
          <StudyDeckPicker decks={studyDecks} onSelectDeck={selectDeck} />
        )}

        {screen === 'mode' && deck && (
          <StudyModePicker
            deck={deck}
            onSelectMode={(mode, deckIndex) => {
              if (deckIndex == null) {
                startSession(mode, { index: 0 });
                return;
              }
              // Jump picker indexes the unshuffled deck — map to current order by id
              const targetId = deck.questions[deckIndex]?.id;
              const orderedIdx = orderedQuestions.findIndex((q) => q.id === targetId);
              startSession(mode, { index: Math.max(0, orderedIdx) });
            }}
            onBack={goHome}
            onShuffle={toggleShuffle}
            shuffled={shuffled}
            missedCount={storedMissed.length}
            onReviewMissed={() => startSession(practiceMode, { filter: 'missed' })}
            flaggedCount={flaggedIds.size}
            flaggedIds={flaggedIds}
            onReviewFlagged={() => startSession(practiceMode, { filter: 'flagged' })}
          />
        )}

        {screen === 'written' && deck && activeQuestions.length > 0 && (
          <StudyWritten
            key={`${deck.id}-w-${runId}`}
            questions={activeQuestions}
            deckTitle={practiceTitle}
            startIndex={startIndex}
            flaggedIds={flaggedIds}
            onToggleFlag={toggleFlag}
            onBack={goMode}
            onComplete={handlePracticeComplete}
          />
        )}

        {screen === 'quiz' && deck && activeQuestions.length > 0 && (
          <StudyQuiz
            key={`${deck.id}-q-${runId}`}
            questions={activeQuestions}
            deckTitle={practiceTitle}
            startIndex={startIndex}
            flaggedIds={flaggedIds}
            onToggleFlag={toggleFlag}
            onBack={goMode}
            onComplete={handlePracticeComplete}
          />
        )}

        {screen === 'flashcard' && deck && activeQuestions.length > 0 && (
          <StudyFlashcard
            key={`${deck.id}-f-${runId}`}
            questions={activeQuestions}
            deckTitle={
              reviewFilter === 'flagged'
                ? `${deck.title} — Common mistakes`
                : deck.title
            }
            startIndex={startIndex}
            flaggedIds={flaggedIds}
            onToggleFlag={toggleFlag}
            onBack={goMode}
            onComplete={goMode}
          />
        )}

        {screen === 'results' && deck && (
          <StudyResults
            deckTitle={deck.title}
            correct={results.correct}
            total={results.total}
            missedCount={storedMissed.length}
            onRetry={() => startSession(practiceMode, { filter: reviewFilter })}
            onReviewMissed={() => startSession(practiceMode, { filter: 'missed' })}
            onHome={goHome}
          />
        )}
      </div>
    </div>
  );
};

export default Study;
