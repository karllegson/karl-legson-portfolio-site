interface WelcomeScreenProps {
  onContinue: () => void;
}

const WelcomeScreen = ({ onContinue }: WelcomeScreenProps) => {
  return (
    <div className="kristel-screen kristel-screen-welcome min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">
        <div className="mb-6 flex justify-center">
          <img
            src="/kristel-welcome-dog.png"
            alt="Happy dog"
            className="w-48 h-48 object-contain rounded-2xl"
            draggable={false}
          />
        </div>
        <h1 className="font-script text-5xl text-gray-800 mb-6">
          Hi Kristel,
        </h1>

        <p className="text-xl text-gray-700 leading-relaxed mb-4">
          Sorry for being late, this took a little while to make.
        </p>

        <p className="text-xl text-gray-700 leading-relaxed mb-12">
          I hope this makes you smile, I love you.
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

export default WelcomeScreen;
