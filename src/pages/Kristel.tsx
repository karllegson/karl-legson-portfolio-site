import { useState, useEffect } from 'react';
import '@/components/kristel/kristel-transitions.css';
import { resumeAudio, playTransition, playSuccess, playCelebration } from '@/components/kristel/kristelSounds';
import LockScreen from '@/components/kristel/LockScreen';
import WelcomeScreen from '@/components/kristel/WelcomeScreen';
import ContextScreen from '@/components/kristel/ContextScreen';
import QuizIntro from '@/components/kristel/QuizIntro';
import QuizQuestion from '@/components/kristel/QuizQuestion';
import QuizResult from '@/components/kristel/QuizResult';
import MusicBox from '@/components/kristel/MusicBox';
import InvitationScreen from '@/components/kristel/InvitationScreen';
import ValentineQuestionScreen from '@/components/kristel/ValentineQuestionScreen';
import CelebrationScreen from '@/components/kristel/CelebrationScreen';
import ValentineMemoryScreen from '@/components/kristel/ValentineMemoryScreen';
import EmptyMemoryScreen from '@/components/kristel/EmptyMemoryScreen';
import ConfirmationScreen from '@/components/kristel/ConfirmationScreen';
import CountdownScreen from '@/components/kristel/CountdownScreen';
import { quizQuestions } from '@/components/kristel/quizData';
import { saveKristelRun, markKristelCompleted, hasKristelCompleted } from '@/lib/kristel-run';

type Screen =
  | 'lock'
  | 'welcome'
  | 'context'
  | 'quiz-intro'
  | 'quiz'
  | 'quiz-result'
  | 'memory-2022'
  | 'memory-2023'
  | 'memory-2024'
  | 'memory-2025'
  | 'empty-memory'
  | 'music-box'
  | 'valentine-question'
  | 'celebration'
  | 'invitation'
  | 'confirmation'
  | 'countdown';

const STORAGE_KEY = 'kristel_progress';

interface KristelProgress {
  screen: Screen;
  currentQuestion: number;
  score: number;
  answers: number[];
}

const saveProgress = (progress: KristelProgress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch { /* silent */ }
};

const loadProgress = (): KristelProgress | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as KristelProgress;
  } catch {
    return null;
  }
};

const clearProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const getInitialState = (): KristelProgress => {
  if (hasKristelCompleted()) {
    return { screen: 'countdown', currentQuestion: 0, score: 0, answers: [] };
  }
  const saved = loadProgress();
  if (saved && saved.screen !== 'lock') {
    // If they were mid-quiz, resume at quiz-intro so they restart the quiz cleanly
    if (saved.screen === 'quiz') {
      return { ...saved, screen: 'quiz-intro', currentQuestion: 0, score: 0, answers: [] };
    }
    return saved;
  }
  return { screen: 'lock', currentQuestion: 0, score: 0, answers: [] };
};

const Kristel = () => {
  const initial = getInitialState();
  const [currentScreen, setCurrentScreen] = useState<Screen>(initial.screen);
  const [currentQuestion, setCurrentQuestion] = useState(initial.currentQuestion);
  const [score, setScore] = useState(initial.score);
  const [answers, setAnswers] = useState<number[]>(initial.answers);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Persist all progress to localStorage so it survives iOS Safari killing the page
  useEffect(() => {
    saveProgress({ screen: currentScreen, currentQuestion, score, answers });
  }, [currentScreen, currentQuestion, score, answers]);

  const transitionTo = (screen: Screen) => {
    resumeAudio();
    playTransition();
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setIsTransitioning(false);
    }, 300);
  };

  const handleUnlock = () => {
    playSuccess();
    transitionTo('welcome');
  };

  const handleQuizAnswer = (isCorrect: boolean, selectedIndex: number) => {
    // Only proceed if answer is correct
    if (!isCorrect) return;

    const nextAnswers = [...answers];
    nextAnswers[currentQuestion] = selectedIndex;
    setScore(score + 1);
    setAnswers(nextAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 2000);
    } else {
      // Find the food question (index 9) and get her choice
      const foodQuestionIndex = quizQuestions.findIndex(q => q.anyAnswerCorrect);
      const foodChoice = foodQuestionIndex !== -1 && nextAnswers[foodQuestionIndex] !== undefined
        ? quizQuestions[foodQuestionIndex].options[nextAnswers[foodQuestionIndex]]
        : undefined;

      // Final question: persist the run (fire-and-forget)
      void saveKristelRun({
        score: score + 1,
        total: quizQuestions.length,
        answers: nextAnswers,
        foodChoice,
      });

      setTimeout(() => {
        transitionTo('quiz-result');
      }, 2000);
    }
  };

  const devSkip = () => {
    const order: Screen[] = [
      'lock',
      'welcome',
      'context',
      'quiz-intro',
      'quiz',
      'quiz-result',
      'memory-2022',
      'memory-2023',
      'memory-2024',
      'memory-2025',
      'empty-memory',
      'valentine-question',
      'celebration',
      'invitation',
      'confirmation',
      'countdown',
      'music-box',
    ];
    const idx = order.indexOf(currentScreen);
    if (idx === -1 || idx === order.length - 1) return;

    // Reset quiz state when jumping past quiz intro
    if (order[idx] === 'quiz-intro') {
      setCurrentQuestion(0);
      setAnswers([]);
      setScore(0);
    }

    const next = order[idx + 1];
    transitionTo(next);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'lock':
        return <LockScreen onUnlock={handleUnlock} />;
      case 'welcome':
        return <WelcomeScreen onContinue={() => transitionTo('context')} />;
      case 'context':
        return <ContextScreen onContinue={() => transitionTo('quiz-intro')} />;
      case 'quiz-intro':
        return <QuizIntro onStart={() => transitionTo('quiz')} />;
      case 'quiz':
        return (
          <QuizQuestion
            key={currentQuestion}
            question={quizQuestions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={quizQuestions.length}
            onAnswer={handleQuizAnswer}
          />
        );
      case 'quiz-result':
        return (
          <QuizResult
            score={score}
            total={quizQuestions.length}
            onContinue={() => transitionTo('memory-2022')}
          />
        );
      case 'memory-2022':
        return (
          <ValentineMemoryScreen
            year="2022"
            imagePath="/kristel-valentine-2022.png"
            message="Our first Valentine's together"
            onContinue={() => transitionTo('memory-2023')}
          />
        );
      case 'memory-2023':
        return (
          <ValentineMemoryScreen
            year="2023"
            imagePath="/kristel-valentine-2023.png"
            message="Another year of love"
            onContinue={() => transitionTo('memory-2024')}
          />
        );
      case 'memory-2024':
        return (
          <ValentineMemoryScreen
            year="2024"
            imagePath={["/kristel-valentine-2024.png", "/kristel-valentine-2024-2.png"]}
            message="Growing stronger together"
            onContinue={() => transitionTo('memory-2025')}
          />
        );
      case 'memory-2025':
        return (
          <ValentineMemoryScreen
            year="2025"
            imagePath={["/kristel-valentine-2025.png", "/kristel-valentine-2025-2.png"]}
            message="Another beautiful year"
            onContinue={() => transitionTo('empty-memory')}
          />
        );
      case 'empty-memory':
        return (
          <EmptyMemoryScreen
            onContinue={() => transitionTo('valentine-question')}
          />
        );
      case 'music-box':
        return <MusicBox onContinue={() => transitionTo('valentine-question')} />;
      case 'valentine-question':
        return <ValentineQuestionScreen onAccept={() => transitionTo('celebration')} />;
      case 'celebration':
        return <CelebrationScreen onContinue={() => transitionTo('invitation')} />;
      case 'invitation':
        return <InvitationScreen onAccept={() => transitionTo('confirmation')} />;
      case 'confirmation':
        return <ConfirmationScreen onContinue={() => {
          markKristelCompleted();
          transitionTo('countdown');
        }} />;
      case 'countdown':
        return <CountdownScreen
          onContinue={() => transitionTo('music-box')}
          onSecretReset={() => {
            // Clear completion flag and restart from the beginning
            localStorage.removeItem('kristel_run_completed');
            clearProgress();
            setCurrentScreen('lock');
            setCurrentQuestion(0);
            setScore(0);
            setAnswers([]);
          }}
        />;
      default:
        return <LockScreen onUnlock={handleUnlock} />;
    }
  };

  return (
    <div className="kristel-page min-h-screen bg-gradient-to-br from-rose-soft via-cream to-rose-soft overflow-hidden">
      <div
        className={`transition-all duration-300 ease-out ${
          isTransitioning
            ? 'opacity-0 scale-[0.98]'
            : 'opacity-100 scale-100'
        }`}
      >
        {renderScreen()}
      </div>
      <p className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 text-gray-500 text-xs whitespace-nowrap">
        Made with love by your cute bf, just for you.
      </p>
    </div>
  );
};

export default Kristel;
