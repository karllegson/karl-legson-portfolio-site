import { Heart } from 'lucide-react';

interface ContextScreenProps {
  onContinue: () => void;
}

const ContextScreen = ({ onContinue }: ContextScreenProps) => {
  return (
    <div className="kristel-screen kristel-screen-context min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">
        <p className="text-xl text-gray-700 leading-relaxed mb-4">
          This isn't just a website.
        </p>

        <p className="text-xl text-gray-700 leading-relaxed mb-2">
          It's an invitation…
        </p>

        <p className="text-xl text-gray-700 leading-relaxed mb-12">
          to something I've been planning for you <Heart className="inline w-5 h-5 text-rose-dark fill-rose-dark" />
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

export default ContextScreen;
