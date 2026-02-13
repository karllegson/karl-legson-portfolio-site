import { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { playClick, playTransition } from './kristelSounds';

interface WaitTheresMoreScreenProps {
  onContinue: () => void;
}

const WaitTheresMoreScreen = ({ onContinue }: WaitTheresMoreScreenProps) => {
  useEffect(() => {
    playTransition();
  }, []);

  return (
    <div className="kristel-screen min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center flex flex-col items-center gap-6">
        <p className="text-2xl font-script text-gray-800">
          And wait, there's more!
        </p>
        <img
          src="/kristel-wait-theres-more.png"
          alt="Surprise"
          className="w-64 h-auto object-contain rounded-xl shadow-lg"
          draggable={false}
        />
        <button
          onClick={() => { playClick(); onContinue(); }}
          className="w-full py-4 bg-rose-dark text-white rounded-xl font-medium text-lg active:bg-rose-dark/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          Continue <Heart className="w-5 h-5 fill-white" />
        </button>
      </div>
    </div>
  );
};

export default WaitTheresMoreScreen;
