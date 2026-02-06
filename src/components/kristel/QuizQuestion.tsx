import { useState } from 'react';
import { QuizQuestion as QuizQuestionType, correctFeedback, wrongFeedback } from './quizData';
import { Check, X } from 'lucide-react';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean, selectedIndex: number) => void;
}

const QuizQuestion = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuizQuestionProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [sadHamsterIndex, setSadHamsterIndex] = useState<number | null>(null);
  const [happyHamsterIndex, setHappyHamsterIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    // If already answered correctly, don't allow more clicks
    if (selectedIndex !== null && (question.anyAnswerCorrect || selectedIndex === question.correctIndex)) return;

    // If anyAnswerCorrect is true, any answer is correct
    const isCorrect = question.anyAnswerCorrect ? true : index === question.correctIndex;
    
    if (!isCorrect) {
      // Wrong answer: show sad hamster, reset after a moment so they can try again
      const randomIndex = Math.floor(Math.random() * 3);
      setSadHamsterIndex(randomIndex);
      setHappyHamsterIndex(null);
      setSelectedIndex(index);
      setShowFeedback(true);
      
      // Reset after showing feedback so they can try again
      setTimeout(() => {
        setSelectedIndex(null);
        setShowFeedback(false);
        setSadHamsterIndex(null);
      }, 2000);
    } else {
      // Correct answer: show happy hamster and proceed
      setSadHamsterIndex(null);
      const randomIndex = Math.floor(Math.random() * 6);
      setHappyHamsterIndex(randomIndex);
      setSelectedIndex(index);
      setShowFeedback(true);
      onAnswer(true, index);
    }
  };

  const isCorrect = question.anyAnswerCorrect 
    ? (selectedIndex !== null) 
    : (selectedIndex === question.correctIndex);
  const feedbackMessage = isCorrect
    ? correctFeedback[questionNumber - 1] || correctFeedback[0]
    : wrongFeedback[questionNumber - 1] || wrongFeedback[0];

  return (
    <div className="kristel-screen kristel-screen-quiz min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[420px]">
        <p className="text-center text-gray-500 mb-6">
          Question {questionNumber} of {totalQuestions}
        </p>

        <h2 className="text-2xl text-gray-800 font-medium text-center mb-8 animate-fade-in-up">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedIndex === index;
            const isCorrectOption = index === question.correctIndex;
            const showResult = selectedIndex !== null;

            let buttonClass =
              'w-full py-4 px-6 text-left rounded-xl font-medium text-lg transition-all duration-200 ';

            if (!showResult) {
              buttonClass += 'bg-white/80 border-2 border-rose-medium/30 text-gray-800 hover:border-rose-dark hover:bg-white';
            } else if (isSelected && (question.anyAnswerCorrect || isCorrectOption)) {
              buttonClass += 'bg-green-100 border-2 border-green-500 text-green-800';
            } else if (isSelected && !isCorrectOption && !question.anyAnswerCorrect) {
              buttonClass += 'bg-red-100 border-2 border-red-400 text-red-800';
            } else {
              // Don't show correct answer when wrong is selected - keep all other options normal
              buttonClass += 'bg-white/80 border-2 border-rose-medium/30 text-gray-800 hover:border-rose-dark hover:bg-white';
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={selectedIndex !== null && (question.anyAnswerCorrect || selectedIndex === question.correctIndex)}
                className={buttonClass}
              >
                <span className="flex items-center justify-between">
                  {option}
                  {showResult && isSelected && (
                    (question.anyAnswerCorrect || isCorrectOption) ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )
                  )}
                  {/* Don't show checkmark on correct answer when wrong is selected */}
                </span>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-8 text-center animate-fade-in-up space-y-4">
            {!isCorrect && sadHamsterIndex !== null && (
              <div className="flex justify-center">
                <img
                  src={
                    sadHamsterIndex === 0
                      ? '/kristel-wrong-1.png'
                      : sadHamsterIndex === 1
                      ? '/kristel-wrong-2.png'
                      : '/kristel-wrong-3.gif'
                  }
                  alt="Sad but still cute reaction"
                  className="w-32 h-32 object-contain rounded-xl"
                  draggable={false}
                />
              </div>
            )}

            {isCorrect && happyHamsterIndex !== null && (
              <div className="flex justify-center">
                <img
                  src={
                    happyHamsterIndex === 0
                      ? '/kristel-correct-1.png'
                      : happyHamsterIndex === 1
                      ? '/kristel-correct-2.png'
                      : happyHamsterIndex === 2
                      ? '/kristel-correct-3.png'
                      : happyHamsterIndex === 3
                      ? '/kristel-correct-4.png'
                      : happyHamsterIndex === 4
                      ? '/kristel-correct-5.png'
                      : '/kristel-correct-6.png'
                  }
                  alt="Happy celebration reaction"
                  className="w-32 h-32 object-contain rounded-xl"
                  draggable={false}
                />
              </div>
            )}

            <p className="text-xl text-gray-700 font-medium">
              {feedbackMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;
