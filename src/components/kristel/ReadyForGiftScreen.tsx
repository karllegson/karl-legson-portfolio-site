import { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { playClick, playTransition } from './kristelSounds';

interface ReadyForGiftScreenProps {
  onContinue: () => void;
}

const ReadyForGiftScreen = ({ onContinue }: ReadyForGiftScreenProps) => {
  useEffect(() => {
    playTransition();
  }, []);

  return (
    <div className="kristel-screen min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center flex flex-col items-center gap-6">
        <p className="text-2xl font-script text-gray-800">
          Are you ready for your gift?
        </p>
        <img
          src="/kristel-musicbox-coolcat.png"
          alt="Cat"
          className="w-48 h-auto object-contain rounded-xl"
          draggable={false}
        />
        <button
          onClick={() => { playClick(); onContinue(); }}
          className="w-full py-4 bg-rose-dark text-white rounded-xl font-medium text-lg active:bg-rose-dark/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          Yes, I'm ready! <Heart className="w-5 h-5 fill-white" />
        </button>
      </div>
      {/* Preload WhenIMetU so it's cached before user reaches Music Box (fixes iOS) */}
      <audio src="/WhenIMetU.m4a" preload="auto" className="hidden" aria-hidden />
    </div>
  );
};

export default ReadyForGiftScreen;
