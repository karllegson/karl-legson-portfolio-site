import { useState } from 'react';
import '@/components/kristel/kristel-transitions.css';
import LockScreen from '@/components/kristel/LockScreen';
import WelcomeScreen from '@/components/kristel/WelcomeScreen';
import ContextScreen from '@/components/kristel/ContextScreen';
import QuizIntro from '@/components/kristel/QuizIntro';
import QuizQuestion from '@/components/kristel/QuizQuestion';
import QuizResult from '@/components/kristel/QuizResult';
import MusicBox from '@/components/kristel/MusicBox';
import InvitationScreen from '@/components/kristel/InvitationScreen';
import ConfirmationScreen from '@/components/kristel/ConfirmationScreen';
import CountdownScreen from '@/components/kristel/CountdownScreen';
import { quizQuestions } from '@/components/kristel/quizData';
import { saveKristelRun, markKristelCompleted } from '@/lib/kristel-run';

type Screen =
  | 'lock'
  | 'welcome'
  | 'context'
  | 'quiz-intro'
  | 'quiz'
  | 'quiz-result'
  | 'music-box'
  | 'invitation'
  | 'confirmation'
  | 'countdown';

const Kristel = () => {
  const isDev = import.meta.env.DEV;
  const [currentScreen, setCurrentScreen] = useState<Screen>('lock');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transitionTo = (screen: Screen) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setIsTransitioning(false);
    }, 300);
  };

  const handleUnlock = () => {
    transitionTo('welcome');
  };

  const handleQuizAnswer = (isCorrect: boolean, selectedIndex: number) => {
    const nextAnswers = [...answers];
    nextAnswers[currentQuestion] = selectedIndex;

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers(nextAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 1500);
    } else {
      // Final question: persist the run (fire-and-forget)
      void saveKristelRun({
        score: isCorrect ? score + 1 : score,
        total: quizQuestions.length,
        answers: nextAnswers,
      });
      markKristelCompleted();

      setTimeout(() => {
        transitionTo('quiz-result');
      }, 1500);
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
      'music-box',
      'invitation',
      'confirmation',
      'countdown',
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
            onContinue={() => transitionTo('music-box')}
          />
        );
      case 'music-box':
        return <MusicBox onContinue={() => transitionTo('invitation')} />;
      case 'invitation':
        return <InvitationScreen onAccept={() => transitionTo('confirmation')} />;
      case 'confirmation':
        return <ConfirmationScreen onContinue={() => transitionTo('countdown')} />;
      case 'countdown':
        return <CountdownScreen />;
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
      {isDev && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={devSkip}
            className="px-4 py-2 rounded-lg bg-rose-dark text-white shadow hover:bg-rose-dark/90 transition-colors text-sm"
          >
            Skip (dev)
          </button>
        </div>
      )}
    </div>
  );
};

export default Kristel;
