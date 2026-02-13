import { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { playClick, playTransition } from './kristelSounds';

interface ContextScreenProps {
  onContinue: () => void;
}

const ContextScreen = ({ onContinue }: ContextScreenProps) => {
  useEffect(() => {
    playTransition();
  }, []);
  return (
    <div className="kristel-screen kristel-screen-context min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">
        <div className="mb-6 flex justify-center">
          <img
            src="/kristel-context-cat.png"
            alt="Cute cat"
            className="w-48 h-48 object-contain rounded-2xl"
            draggable={false}
          />
        </div>

        <h1 className="font-script text-4xl text-gray-800 mb-12">
          Are you readyyy?
        </h1>

        <button
          onClick={() => { playClick(); onContinue(); }}
          className="w-full py-4 bg-rose-dark text-white rounded-xl font-medium text-lg hover:bg-rose-dark/90 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ContextScreen;
