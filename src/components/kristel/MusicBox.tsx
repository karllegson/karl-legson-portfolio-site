import { useEffect, useMemo, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { playTransition, resumeAudio, getAudioContext } from './kristelSounds';

interface MusicBoxProps {
  onContinue?: () => void;
}

interface NotePlayer {
  start: () => void;
  stop: () => void;
  playPulse: () => void;
}

const createNotePlayer = (sharedContext?: AudioContext): NotePlayer | null => {
  if (typeof window === 'undefined') return null;

  const ctx = sharedContext ?? (() => {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    return Ctx ? new Ctx() : null;
  })();
  if (!ctx) return null;
  let gain: GainNode | null = null;
  let intervalId: number | null = null;

  const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25]; // C major tones

  const start = () => {
    if (ctx.state === 'suspended') ctx.resume().catch(() => undefined);
    if (!gain) {
      gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(ctx.destination);
    }
  };

  const stop = () => {
    if (intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
    if (gain) {
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
    }
  };

  const playOne = () => {
    if (!gain) return;
    const osc = ctx.createOscillator();
    const note = scale[Math.floor(Math.random() * scale.length)];
    osc.type = 'triangle';
    osc.frequency.value = note;
    const localGain = ctx.createGain();
    localGain.gain.setValueAtTime(0.0001, ctx.currentTime);
    localGain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
    localGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);
    osc.connect(localGain).connect(gain);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  };

  const playPulse = () => {
    const doPlay = () => {
      if (!gain) {
        gain = ctx.createGain();
        gain.gain.value = 0;
        gain.connect(ctx.destination);
      }
      if (intervalId === null) {
        playOne();
        intervalId = window.setInterval(playOne, 420);
      }
    };
    if (ctx.state === 'suspended') {
      ctx.resume().then(doPlay).catch(doPlay);
    } else {
      start();
      doPlay();
    }
  };

  return { start, stop, playPulse };
};

const getPointerAngle = (e: React.PointerEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
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
  const playerRef = useRef<NotePlayer | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const draggingRef = useRef(false);
  const lastAngleRef = useRef(0);
  const startPointerAngleRef = useRef(0);
  const startHandleAngleRef = useRef(0);

  const glitterPositions = useMemo(
    () =>
      Array.from({ length: 12 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      })),
    [isTurning]
  );

  useEffect(() => {
    playTransition();
  }, []);

  useEffect(() => {
    playerRef.current = createNotePlayer(getAudioContext());
    return () => {
      playerRef.current?.stop();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (!onContinue) return;
    const t = setTimeout(() => setCanClickContinue(true), 5000);
    return () => clearTimeout(t);
  }, []); // run once on mount; onContinue can change every parent render

  const handlePointerDown = (e: React.PointerEvent) => {
    resumeAudio();
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsTurning(true);
    startPointerAngleRef.current = getPointerAngle(e);
    startHandleAngleRef.current = lastAngleRef.current;
    if (audioRef.current) {
      try {
        audioRef.current.play().catch(() => playerRef.current?.playPulse());
      } catch {
        playerRef.current?.playPulse();
      }
    } else {
      playerRef.current?.playPulse();
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const pointerAngle = getPointerAngle(e);
    const delta = pointerAngle - startPointerAngleRef.current;
    const newAngle = startHandleAngleRef.current + delta;
    setAngle(newAngle);
    lastAngleRef.current = newAngle;
    playerRef.current?.playPulse();
  };

  const stopTurning = (e: React.PointerEvent) => {
    if (draggingRef.current) {
      draggingRef.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      setIsTurning(false);
      playerRef.current?.stop();
      audioRef.current?.pause();
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
          className="relative w-72 h-80 mx-auto select-none touch-none cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopTurning}
          onPointerCancel={stopTurning}
          role="button"
          aria-label="Wind music box"
        >
          {/* Dancing couple when box is open */}
          {isTurning && (
            <img
              src="/music-box-couple.png"
              alt="Dancing couple"
              className="absolute left-1/2 -translate-x-1/2 w-28 h-auto pointer-events-none select-none animate-couple-dance z-10"
              style={{ top: '10%' }}
              draggable={false}
            />
          )}

          {/* Box image - swaps between closed and open */}
          <img
            src={isTurning ? '/music-box-open.png' : '/music-box-closed.png'}
            alt="Music box"
            className="w-full h-full object-contain drop-shadow-2xl pointer-events-none select-none transition-all duration-300"
            draggable={false}
          />

          {/* Rotating handle overlay - aligned to gray diamond connector */}
          <div
            className="absolute left-1/2 pointer-events-none z-20"
            style={{ top: isTurning ? '62%' : '50%' }}
          >
            <div
              className="relative flex items-center"
              style={{ transform: `rotate(${angle}deg)`, transformOrigin: 'left center' }}
            >
              {/* Crank arm */}
              <div className="w-16 h-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 shadow-lg border border-amber-600/40" />
              {/* Crank knob */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-md border border-amber-600/50 -ml-1" />
            </div>
          </div>

          {/* Glitter effect when open/playing (static stars, no animation and no position changes while turning) */}
          {isTurning && (
            <div className="absolute left-1/2 top-[20%] -translate-x-1/2 pointer-events-none w-24 h-24">
              {glitterPositions.map((pos, i) => (
                <div
                  key={i}
                  className="absolute animate-glitter"
                  style={{
                    left: pos.left,
                    top: pos.top,
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" className="text-amber-300">
                    <polygon
                      points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              ))}
            </div>
          )}

          {/* Low-key kitty & love stickers while playing */}
          {isTurning && (
            <>
              <div className="absolute bottom-2 right-3 pointer-events-none opacity-80">
                <img
                  src="/kristel-musicbox-kitty.gif"
                  alt="For you my love"
                  className="w-20 h-20 object-contain drop-shadow-md"
                  draggable={false}
                />
              </div>

              <div className="absolute top-1 right-0 pointer-events-none opacity-75">
                <img
                  src="/kristel-musicbox-coolcat.png"
                  alt="Cool love cat"
                  className="w-12 h-12 object-contain"
                  draggable={false}
                />
              </div>

              <div className="absolute bottom-0 left-0 pointer-events-none opacity-75">
                <img
                  src="/kristel-musicbox-kitty-aura.png"
                  alt="Love aura kitty"
                  className="w-16 h-16 object-contain"
                  draggable={false}
                />
              </div>
            </>
          )}
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
