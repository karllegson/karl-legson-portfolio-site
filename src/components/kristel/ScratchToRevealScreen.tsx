import { useRef, useEffect, useState, useCallback } from 'react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClick, playCelebration, playTransition, playEnvelopeOpen } from './kristelSounds';

interface ScratchToRevealScreenProps {
  onContinue: () => void;
}

const SCRATCH_THRESHOLD = 0.5;
const SCRATCH_RADIUS = 24;

const ScratchToRevealScreen = ({ onContinue }: ScratchToRevealScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const isScratchingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const hasTriggeredConfettiRef = useRef(false);

  useEffect(() => {
    playTransition();
  }, []);

  const triggerConfetti = useCallback(() => {
    if (hasTriggeredConfettiRef.current) return;
    hasTriggeredConfettiRef.current = true;

    playEnvelopeOpen();
    if (audioRef.current) {
      audioRef.current.play().catch(() => undefined);
    }
    playCelebration();

    const colors = ['#e11d48', '#fb7185', '#f9a8d4', '#fda4af', '#fecdd3', '#fbbf24'];
    confetti({ particleCount: 100, spread: 120, origin: { x: 0.5, y: 0.5 }, colors });
    const end = Date.now() + 2500;
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0.2, y: 0.6 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 0.8, y: 0.6 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const getScratchedPercent = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return 0;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) transparent++;
    }
    return transparent / (data.length / 4);
  }, []);

  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isRevealed) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, SCRATCH_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    if (getScratchedPercent() >= SCRATCH_THRESHOLD) {
      setIsRevealed(true);
      setShowCelebration(true);
      triggerConfetti();
    }
  }, [isRevealed, getScratchedPercent, triggerConfetti]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isRevealed) return;
    isScratchingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratchingRef.current || isRevealed) return;
    const last = lastPosRef.current;
    if (last) {
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const steps = Math.max(1, Math.sqrt(dx * dx + dy * dy) / 8);
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        scratch(last.x + dx * t, last.y + dy * t);
      }
    }
    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isScratchingRef.current = false;
    lastPosRef.current = null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = '#b4b4b4';
      ctx.fillRect(0, 0, rect.width, rect.height);

      const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, '#c8c8c8');
      gradient.addColorStop(0.5, '#dcdcdc');
      gradient.addColorStop(1, '#b4b4b4');
      ctx.globalAlpha = 1;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="kristel-screen min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <p className="text-xl font-script text-gray-800 mb-4">
        Scratch to reveal your gift
      </p>
      <div
        ref={containerRef}
        className="relative w-full max-w-[360px] aspect-[1.4] rounded-xl overflow-hidden shadow-2xl touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <img
          src="/kristel-concert-ticket.png"
          alt="Your gift"
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'none' }}
          />
        )}
      </div>
      {showCelebration && (
        <div className="mt-6 space-y-4 animate-fade-in-up w-full max-w-[360px]">
          <p className="text-2xl font-script text-rose-dark text-center">
            Surprise! See you at the concert 💕
          </p>
          <button
            onClick={() => { playClick(); onContinue(); }}
            className="w-full py-4 bg-rose-dark text-white rounded-xl font-medium text-lg active:bg-rose-dark/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            Continue <Heart className="w-5 h-5 fill-white" />
          </button>
        </div>
      )}
      <audio ref={audioRef} src="/olivia-dean.m4a" preload="auto" />
    </div>
  );
};

export default ScratchToRevealScreen;
