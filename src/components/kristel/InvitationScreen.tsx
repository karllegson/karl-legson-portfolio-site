import { useState } from 'react';
import { Heart } from 'lucide-react';
import { playEnvelopeOpen, playClick } from './kristelSounds';

interface InvitationScreenProps {
  onAccept: () => void;
}

const InvitationScreen = ({ onAccept }: InvitationScreenProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      // Opening
      playEnvelopeOpen();
      setIsOpen(true);
      setTimeout(() => setCardRevealed(true), 700);
    } else {
      // Closing
      playClick();
      setCardRevealed(false);
      setTimeout(() => setIsOpen(false), 300);
    }
  };

  return (
    <div className="kristel-screen kristel-screen-invitation min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        {/* Envelope container - bigger size */}
        <div
          className="relative cursor-pointer select-none envelope-idle"
          style={{ width: '360px', height: '280px', margin: '0 auto' }}
          onClick={handleToggle}
        >
          {/* === Closed Envelope === */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: isOpen ? 0 : 1,
              zIndex: 5,
            }}
          >
            <img
              src="/kristel-envelope-closed.png"
              alt="Envelope closed"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>

          {/* === Open Envelope (behind the card) === */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: isOpen ? 1 : 0,
              zIndex: 5,
            }}
          >
            <img
              src="/kristel-envelope-open.png"
              alt="Envelope open"
              className="w-full h-full object-contain"
              draggable={false}
            />

            {/* Heart in the middle when open */}
            <div
              className="absolute left-1/2 -translate-x-1/2 transition-all duration-700"
              style={{
                opacity: isOpen ? 1 : 0,
                bottom: '25%',
                transform: isOpen ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0.8)',
                zIndex: 6,
              }}
            >
              <div className="w-14 h-14 bg-rose-dark rounded-full flex items-center justify-center shadow-xl animate-heart-pulse">
                <Heart className="w-7 h-7 text-white fill-white" />
              </div>
            </div>
          </div>

          {/* === Invitation Card (ON TOP of envelope when opened) === */}
          <div
            className="absolute left-1/2 -translate-x-1/2 transition-all duration-900 ease-out"
            style={{
              width: '280px',
              top: cardRevealed ? '-180px' : '60px',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.2, 0.64, 1)',
              zIndex: 20,
            }}
          >
            <div
              className={`bg-white rounded-xl shadow-2xl border border-rose-medium/20 p-5 transition-opacity duration-500 ${
                cardRevealed ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="mb-3">
                <Heart className="w-7 h-7 mx-auto text-rose-dark fill-rose-dark animate-heart-pulse" />
              </div>
              <p className="text-xs text-gray-500 mb-1.5 tracking-widest uppercase">
                You are officially invited to…
              </p>
              <h2 className="font-script text-3xl text-gray-800 mb-2">
                A Valentine's Dinner
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                An evening just for us.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mt-0.5">
                Details coming soon…
              </p>
              <div className="mt-3 pt-3 border-t border-rose-medium/15">
                <p className="text-rose-dark font-medium text-sm">
                  February 14, 2026
                </p>
              </div>
            </div>
          </div>

          {/* Tap hint */}
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

        {/* Accept button */}
        <div
          className={`w-full mt-16 transition-all duration-700 ${
            cardRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={onAccept}
            className="w-full py-4 bg-rose-dark text-white rounded-xl font-medium text-lg hover:bg-rose-dark/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            Accept Invitation <Heart className="w-5 h-5 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationScreen;
