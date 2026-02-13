import { Heart } from 'lucide-react';
import { playClick } from './kristelSounds';

interface EmptyMemoryScreenProps {
  onContinue: () => void;
}

const EmptyMemoryScreen = ({ onContinue }: EmptyMemoryScreenProps) => {
  return (
    <div className="kristel-screen kristel-screen-empty-memory min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">
        <div className="mb-6">
          <Heart className="w-12 h-12 mx-auto text-rose-dark fill-rose-dark animate-heart-pulse" />
        </div>

        <h2 className="font-script text-4xl text-gray-800 mb-6">
          2026
        </h2>

        <div className="mb-6 flex justify-center">
          <div className="w-full max-w-sm h-64 bg-white/50 border-2 border-dashed border-rose-medium/40 rounded-2xl flex items-center justify-center">
            <p className="text-gray-400 text-sm italic">Empty space</p>
          </div>
        </div>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Let's fill up this empty space on next week,
        </p>

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

export default EmptyMemoryScreen;
