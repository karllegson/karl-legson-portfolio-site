interface CelebrationScreenProps {
  onContinue: () => void;
}

const CelebrationScreen = ({ onContinue }: CelebrationScreenProps) => {
  return (
    <div className="kristel-screen kristel-screen-celebration min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">
        <div className="mb-6 flex justify-center">
          <img
            src="/kristel-celebration.png"
            alt="Celebration"
            className="w-full max-w-sm h-auto rounded-2xl shadow-lg object-cover"
            draggable={false}
          />
        </div>

        <h2 className="font-script text-4xl text-gray-800 mb-4">
          Yay!
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          I'm so happy!
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

export default CelebrationScreen;
