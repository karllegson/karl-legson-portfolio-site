import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownScreenProps {
  onContinue: () => void;
  onSecretReset?: () => void;
}

const CountdownScreen = ({ onContinue, onSecretReset }: CountdownScreenProps) => {
  const [secretTaps, setSecretTaps] = useState(0);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2026-02-14T18:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsUnlocked(false);
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        setIsUnlocked(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/80 rounded-xl w-20 h-20 flex items-center justify-center border border-rose-medium/20 shadow-sm">
        <span className="text-3xl font-bold text-gray-800">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-sm text-gray-500 mt-2 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );

  return (
    <div className="kristel-screen kristel-screen-countdown min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">
        <div className="mb-6">
          <Heart className="w-12 h-12 mx-auto text-rose-dark fill-rose-dark animate-pulse" />
        </div>

        <p className="text-xl text-gray-700 mb-8">
          Your Valentine surprise unlocks in…
        </p>

        <div className="flex justify-center gap-3 mb-10">
          <TimeBlock value={timeLeft.days} label="days" />
          <TimeBlock value={timeLeft.hours} label="hours" />
          <TimeBlock value={timeLeft.minutes} label="mins" />
          <TimeBlock value={timeLeft.seconds} label="secs" />
        </div>

        <p className="text-lg text-gray-600 italic">
          I promise… it's worth the wait
        </p>

        {isUnlocked ? (
          <button
            onClick={onContinue}
            className="mt-10 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-rose-dark text-white font-semibold text-lg shadow-lg hover:bg-rose-dark/90 transition-colors"
          >
            Open your surprise
          </button>
        ) : (
          <div
            className="mt-12 flex justify-center gap-1 cursor-default select-none"
            onClick={() => {
              const next = secretTaps + 1;
              if (next >= 3 && onSecretReset) {
                onSecretReset();
              } else {
                setSecretTaps(next);
              }
            }}
          >
            {[...Array(3)].map((_, i) => (
              <Heart
                key={i}
                className="w-4 h-4 text-rose-medium fill-rose-medium"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownScreen;
