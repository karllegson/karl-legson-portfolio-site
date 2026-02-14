import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { playTransition, resumeAudio, playWhenIMetU, loadWhenIMetUBuffer } from './kristelSounds';

interface MusicBoxProps {
  onContinue?: () => void;
}

const MusicBox = ({ onContinue }: MusicBoxProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [canClickContinue, setCanClickContinue] = useState(false);
  const whenIMetUSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    playTransition();
  }, []);

  useEffect(() => {
    return () => {
      try {
        whenIMetUSourceRef.current?.stop();
      } catch { /* already stopped */ }
    };
  }, []);

  useEffect(() => {
    if (!onContinue) return;
    const t = setTimeout(() => setCanClickContinue(true), 5000);
    return () => clearTimeout(t);
  }, [onContinue]);

  const handleClick = () => {
    resumeAudio();
    loadWhenIMetUBuffer();
    const src = playWhenIMetU();
    if (src) {
      whenIMetUSourceRef.current = src;
      setIsPlaying(true);
      src.onended = () => {
        whenIMetUSourceRef.current = null;
        setIsPlaying(false);
      };
    }
  };

  return (
    <div className="kristel-screen kristel-screen-music-box min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-rose-medium/30 animate-float"
            style={{
              left: `${8 + i * 10}%`,
              top: `${6 + (i % 4) * 20}%`,
              width: 16 + (i % 3) * 5,
              height: 16 + (i % 3) * 5,
              animationDelay: `${i * 0.35}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-[440px] text-center space-y-8 relative z-10">
        <div className="flex flex-col items-center gap-2">
          <Heart className="w-12 h-12 text-rose-dark fill-rose-dark animate-heart-pulse" />
          <p className="text-xl text-gray-800 font-semibold">Tap the music box</p>
        </div>

        <button
          type="button"
          onClick={handleClick}
          className="relative w-72 h-80 mx-auto block select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-dark/30 rounded-xl"
          aria-label="Play music box"
        >
          {isPlaying && (
            <img
              src="/music-box-couple.png"
              alt="Dancing couple"
              className="absolute left-1/2 -translate-x-1/2 w-28 h-auto pointer-events-none animate-couple-dance z-10"
              style={{ top: '10%' }}
              draggable={false}
            />
          )}

          <img
            src={isPlaying ? '/music-box-open.png' : '/music-box-closed.png'}
            alt="Music box"
            className="w-full h-full object-contain drop-shadow-2xl pointer-events-none transition-all duration-300"
            draggable={false}
          />
        </button>

        {onContinue && (
          <button
            onClick={canClickContinue ? onContinue : undefined}
            disabled={!canClickContinue}
            className={`w-full py-4 rounded-xl font-medium text-lg shadow-lg transition-colors ${
              canClickContinue
                ? 'bg-rose-dark text-white hover:bg-rose-dark/90 active:bg-rose-dark/90'
                : 'bg-rose-dark/50 text-white/80 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default MusicBox;
