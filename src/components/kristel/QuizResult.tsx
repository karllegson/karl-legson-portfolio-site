import { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { playCelebration } from './kristelSounds';

interface QuizResultProps {
  score: number;
  total: number;
  onContinue: () => void;
}

const QuizResult = ({ score, total, onContinue }: QuizResultProps) => {
  useEffect(() => {
    playCelebration();
  }, []);

  return (
    <div className="kristel-screen kristel-screen-quiz-result min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">
        <div className="mb-6 flex justify-center">
          <img
            src="/kristel-quiz-passed.png"
            alt="Perfect score celebration"
            className="w-52 h-52 object-contain"
            draggable={false}
          />
        </div>

        <p className="text-xl text-gray-600 mb-2">
          Results are in…
        </p>

        <h2 className="font-script text-5xl text-gray-800 mb-4">
          You passed
        </h2>

        <p className="text-lg text-gray-500 mb-2">
          {score} out of {total} correct, just like you, {score}/{total}
        </p>

        <p className="text-xl text-gray-700 mb-12">
          (I already knew you would)
        </p>

        <button
          onClick={onContinue}
          className="w-full py-4 bg-rose-dark text-white rounded-xl font-medium text-lg hover:bg-rose-dark/90 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
