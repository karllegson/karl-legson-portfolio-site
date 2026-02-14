import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { playEnvelopeOpen, playClick, playTransition } from './kristelSounds';
import '@/components/kristel/kristel-transitions.css';

interface ValentineLetterScreenProps {
  onContinue: () => void;
}

const ValentineLetterScreen = ({ onContinue }: ValentineLetterScreenProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { playTransition(); }, []);
  const [cardRevealed, setCardRevealed] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      playEnvelopeOpen();
      setIsOpen(true);
      setTimeout(() => setCardRevealed(true), 700);
    } else {
      playClick();
      setCardRevealed(false);
      setTimeout(() => setIsOpen(false), 300);
    }
  };

  return (
    <div className="kristel-screen min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        <div
          className="relative cursor-pointer select-none envelope-idle"
          style={{ width: '360px', height: '280px', margin: '0 auto' }}
          onClick={handleToggle}
        >
          {/* Closed envelope */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: isOpen ? 0 : 1, zIndex: 5 }}
          >
            <img
              src="/kristel-envelope-closed.png"
              alt="Envelope closed"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>

          {/* Open envelope */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: isOpen ? 1 : 0, zIndex: 5 }}
          >
            <img
              src="/kristel-envelope-open.png"
              alt="Envelope open"
              className="w-full h-full object-contain"
              draggable={false}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 transition-all duration-700"
              style={{
                opacity: isOpen ? 1 : 0,
                bottom: '25%',
                zIndex: 6,
              }}
            >
              <div className="w-14 h-14 bg-rose-dark rounded-full flex items-center justify-center shadow-xl animate-heart-pulse">
                <Heart className="w-7 h-7 text-white fill-white" />
              </div>
            </div>
          </div>

          {/* Letter - big paper love letter (centered when revealed) */}
          <div
            className="transition-all duration-700 ease-out"
            style={{
              width: 'min(340px, calc(100vw - 2rem))',
              position: cardRevealed ? 'fixed' : 'absolute',
              left: '50%',
              transform: cardRevealed ? 'translate(-50%, -50%)' : 'translate(-50%, 0)',
              top: cardRevealed ? '40%' : '60px',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.2, 0.64, 1)',
              zIndex: 30,
            }}
          >
            <div
              className={`bg-amber-50/95 rounded-lg shadow-2xl border border-amber-200/60 p-6 transition-opacity duration-500 ${
                cardRevealed ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h2 className="font-script text-3xl text-gray-800 mb-3 text-center">
                Happy Valentine's Day
              </h2>
              <p className="font-serif text-gray-700 text-base mb-3">
                Dear Kristel,
              </p>
              <div className="font-serif text-gray-700 text-base leading-relaxed space-y-2">
                <p>
                  Thank you for everything. For choosing me, for staying, kahit na minsan hindi ako yung pinaka the best na boyfriend.
                </p>
                <p>
                  You make every day special. You are patient and understanding. I appreciate that. 
                </p>
                <p>
                  I love you so much. Mahal na mahal kita.</p>
                  <p>Happy Valentine's Day Baber. 💕</p>
          
              </div>
            </div>
          </div>

          <p
            className="absolute left-1/2 -translate-x-1/2 text-rose-dark/60 text-sm whitespace-nowrap"
            style={{
              bottom: '-32px',
              opacity: isOpen ? 0.4 : 0.7,
              transition: 'opacity 0.3s',
            }}
          >
            {isOpen ? 'Tap to close' : 'Tap to open 💌'}
          </p>
        </div>

        <div
          className={`w-full mt-24 transition-all duration-700 ${
            cardRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {/* Preload WhenIMetU while user reads letter (fixes iOS music box) */}
          <audio src="/WhenIMetU.m4a" preload="auto" className="hidden" aria-hidden />
          <button
            onClick={onContinue}
            className="w-full py-4 bg-rose-dark text-white rounded-xl font-medium text-lg active:bg-rose-dark/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            Open your surprise <Heart className="w-5 h-5 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValentineLetterScreen;
