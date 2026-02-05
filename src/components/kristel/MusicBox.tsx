import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';

interface MusicBoxProps {
  onContinue: () => void;
}

interface NotePlayer {
  start: () => void;
  stop: () => void;
  playPulse: () => void;
}

const createNotePlayer = (): NotePlayer | null => {
  if (typeof window === 'undefined' || !(window.AudioContext || (window as any).webkitAudioContext)) {
    return null;
  }

  const AudioCtx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
  const ctx = new AudioCtx();
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
    start();
    if (intervalId === null) {
      playOne();
      intervalId = window.setInterval(playOne, 420);
    }
  };

  return { start, stop, playPulse };
};

const MusicBox = ({ onContinue }: MusicBoxProps) => {
  const [angle, setAngle] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const playerRef = useRef<NotePlayer | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const draggingRef = useRef(false);
  const lastAngleRef = useRef(0);

  useEffect(() => {
    playerRef.current = createNotePlayer();
    return () => {
      playerRef.current?.stop();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsTurning(true);
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
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
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    const normalized = ((newAngle + 360) % 360);
    setAngle(normalized);
    lastAngleRef.current = normalized;
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
    <div className="kristel-screen kristel-screen-music-box min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center space-y-8">
        <div className="flex flex-col items-center gap-3">
          <Heart className="w-12 h-12 text-rose-dark fill-rose-dark" />
          <p className="text-lg text-gray-700">Wind it up to hear the melody</p>
          <p className="text-sm text-gray-500">Music plays only while you turn it</p>
        </div>

        <div className="relative w-52 h-52 mx-auto">
          <div className="absolute inset-0 rounded-full bg-white/80 border-2 border-rose-medium/40 shadow-md" />
          <div className="absolute inset-4 rounded-full border-2 border-rose-medium/30 bg-gradient-to-br from-rose-soft to-white" />
          <div
            className="absolute inset-0 flex items-center justify-center select-none touch-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopTurning}
            onPointerCancel={stopTurning}
            role="button"
            aria-label="Wind music box"
          >
            <div
              className={`relative w-20 h-20 rounded-full bg-rose-dark text-white flex items-center justify-center shadow-lg transition-transform duration-150 ${
                isTurning ? 'scale-105' : ''
              }`}
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <span className="font-semibold">Turn</span>
              <div className="absolute right-[-20px] w-12 h-3 rounded-full bg-rose-medium shadow" />
            </div>
          </div>
        </div>

        <audio ref={audioRef} src="/WhenImetu.m4a" preload="auto" />

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

export default MusicBox;
