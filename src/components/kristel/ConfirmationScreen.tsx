import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface ConfirmationScreenProps {
  onContinue: () => void;
}

interface Confetti {
  id: number;
  left: number;
  delay: number;
  size: number;
  color: string;
}

const ConfirmationScreen = ({ onContinue }: ConfirmationScreenProps) => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const colors = ['#e11d48', '#f9a8ba', '#fdf2f4', '#ff6b6b', '#ffc0cb'];
    const newConfetti: Confetti[] = [];

    for (let i = 0; i < 30; i++) {
      newConfetti.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setConfetti(newConfetti);
  }, []);

  return (
    <div className="kristel-screen kristel-screen-confirmation min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute top-0 animate-confetti-fall"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            width: c.size,
            height: c.size,
          }}
        >
          <Heart
            style={{
              width: c.size,
              height: c.size,
              color: c.color,
              fill: c.color,
            }}
          />
        </div>
      ))}

      <div className="w-full max-w-[420px] text-center relative z-10">
        <div className="mb-8">
          <Heart className="w-20 h-20 mx-auto text-rose-dark fill-rose-dark animate-heart-pulse" />
        </div>

        <h1 className="font-script text-5xl text-gray-800 mb-4">
          Invitation Accepted
        </h1>

        <p className="text-xl text-gray-700 mb-12">
          The next part unlocks soon…
        </p>

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

export default ConfirmationScreen;
