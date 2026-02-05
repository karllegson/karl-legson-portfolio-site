import { Heart } from 'lucide-react';

interface QuizResultProps {
  score: number;
  total: number;
  onContinue: () => void;
}

const QuizResult = ({ score, total, onContinue }: QuizResultProps) => {
  return (
    <div className="kristel-screen kristel-screen-quiz-result min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">
        <div className="mb-8">
          <Heart className="w-16 h-16 mx-auto text-rose-dark fill-rose-dark animate-heart-pulse" />
        </div>

        <p className="text-xl text-gray-600 mb-2">
          Results are in…
        </p>

        <h2 className="font-script text-5xl text-gray-800 mb-4">
          You passed
        </h2>

        <p className="text-lg text-gray-500 mb-2">
          {score} out of {total} correct
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
