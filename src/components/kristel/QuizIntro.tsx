interface QuizIntroProps {
  onStart: () => void;
}

const QuizIntro = ({ onStart }: QuizIntroProps) => {
  return (
    <div className="kristel-screen kristel-screen-quiz-intro min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">
        <div className="mb-6 flex justify-center">
          <img
            src="/kristel-quiz-intro-cat.png"
            alt="Cute cat"
            className="w-48 h-48 object-contain rounded-2xl"
            draggable={false}
          />
        </div>
        <p className="text-2xl text-gray-800 font-medium mb-12">
          First, let me see how well you know me...
        </p>

        <button
          onClick={onStart}
          className="w-full py-4 bg-rose-dark text-white rounded-xl font-medium text-lg hover:bg-rose-dark/90 transition-colors"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizIntro;
