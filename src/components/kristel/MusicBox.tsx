import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { playTransition, resumeAudio, playWhenIMetU, loadWhenIMetUBuffer } from './kristelSounds';

interface MusicBoxProps {
  onContinue?: () => void;
}

const getPointerAngle = (e: React.PointerEvent, el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = e.clientX - cx;
  const dy = e.clientY - cy;
  return Math.atan2(dy, dx) * (180 / Math.PI);
};

const MusicBox = ({ onContinue }: MusicBoxProps) => {
  const [angle, setAngle] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [canClickContinue, setCanClickContinue] = useState(false);
  const whenIMetUSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const draggingRef = useRef(false);
  const lastAngleRef = useRef(0);
  const startPointerAngleRef = useRef(0);
  const startHandleAngleRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    playTransition();
  }, []);

  useEffect(() => {
    return () => {
      try { whenIMetUSourceRef.current?.stop(); } catch { /* ok */ }
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (!onContinue) return;
    const t = setTimeout(() => setCanClickContinue(true), 5000);
    return () => clearTimeout(t);
  }, [onContinue]);

  const playMusic = () => {
    resumeAudio();
    loadWhenIMetUBuffer();

    // Try HTML audio first (reliable on iOS with direct tap)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Fallback to Web Audio
        const src = playWhenIMetU();
        if (src) {
          whenIMetUSourceRef.current = src;
          src.onended = () => {
            whenIMetUSourceRef.current = null;
            setIsTurning(false);
          };
        }
      });
      return;
    }

    // Web Audio fallback
    const src = playWhenIMetU();
    if (src) {
      whenIMetUSourceRef.current = src;
      src.onended = () => {
        whenIMetUSourceRef.current = null;
        setIsTurning(false);
      };
    }
  };

  const stopMusic = () => {
    try { whenIMetUSourceRef.current?.stop(); } catch { /* ok */ }
    whenIMetUSourceRef.current = null;
    audioRef.current?.pause();
    setIsTurning(false);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    startPointerAngleRef.current = getPointerAngle(e, containerRef.current);
    startHandleAngleRef.current = lastAngleRef.current;
    setIsTurning(true);
    playMusic();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || !containerRef.current) return;
    const pointerAngle = getPointerAngle(e, containerRef.current);
    const delta = pointerAngle - startPointerAngleRef.current;
    const newAngle = startHandleAngleRef.current + delta;
    setAngle(newAngle);
    lastAngleRef.current = newAngle;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingRef.current) {
      draggingRef.current = false;
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      stopMusic();
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
          <p className="text-xl text-gray-800 font-semibold">Wind the music box</p>
        </div>

        <div
          ref={containerRef}
          role="button"
          tabIndex={0}
          aria-label="Wind music box to play"
          className="relative w-72 h-80 mx-auto select-none touch-none cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'none' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {isTurning && (
            <img
              src="/music-box-couple.png"
              alt="Dancing couple"
              className="absolute left-1/2 -translate-x-1/2 w-28 h-auto pointer-events-none animate-couple-dance z-10"
              style={{ top: '10%' }}
              draggable={false}
            />
          )}

          <img
            src={isTurning ? '/music-box-open.png' : '/music-box-closed.png'}
            alt="Music box"
            className="w-full h-full object-contain drop-shadow-2xl pointer-events-none transition-all duration-300"
            draggable={false}
          />

          {/* Handle */}
          <div
            className="absolute left-1/2 pointer-events-none z-20"
            style={{ top: isTurning ? '62%' : '50%' }}
          >
            <div
              className="relative flex items-center"
              style={{ transform: `rotate(${angle}deg)`, transformOrigin: 'left center' }}
            >
              <div className="w-16 h-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 shadow-lg border border-amber-600/40" />
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-md border border-amber-600/50 -ml-1" />
            </div>
          </div>
        </div>

        <audio ref={audioRef} src="/WhenIMetU.m4a" preload="auto" />

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
