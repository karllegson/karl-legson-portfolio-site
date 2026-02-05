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

  const handleSelect = (index: number) => {
    if (selectedIndex !== null) return;

    setSelectedIndex(index);
    setShowFeedback(true);

    const isCorrect = index === question.correctIndex;
    onAnswer(isCorrect, index);
  };

  const isCorrect = selectedIndex === question.correctIndex;
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
            } else if (isSelected && isCorrectOption) {
              buttonClass += 'bg-green-100 border-2 border-green-500 text-green-800';
            } else if (isSelected && !isCorrectOption) {
              buttonClass += 'bg-red-100 border-2 border-red-400 text-red-800';
            } else if (isCorrectOption) {
              buttonClass += 'bg-green-50 border-2 border-green-300 text-green-700';
            } else {
              buttonClass += 'bg-white/50 border-2 border-gray-200 text-gray-400';
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={selectedIndex !== null}
                className={buttonClass}
              >
                <span className="flex items-center justify-between">
                  {option}
                  {showResult && isSelected && (
                    isCorrectOption ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )
                  )}
                  {showResult && !isSelected && isCorrectOption && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-8 text-center animate-fade-in-up">
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
