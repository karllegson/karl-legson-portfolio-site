import { useEffect, useState } from 'react';
import { Heart, Share, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '@/components/kristel/kristel-transitions.css';
import MusicBox from '@/components/kristel/MusicBox';
import { hasKristelCompleted } from '@/lib/kristel-run';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ADD_TO_HOME_DISMISSED_KEY = 'kristel_a2hs_dismissed';

const isIosSafari = () => {
  const ua = navigator.userAgent;
  const isIos = /iP(hone|od|ad)/.test(ua);
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(ua);
  return isIos && isSafari;
};

const isStandalone = () => {
  return (
    ('standalone' in window.navigator && (window.navigator as unknown as { standalone: boolean }).standalone) ||
    window.matchMedia('(display-mode: standalone)').matches
  );
};

const Valentines = () => {
  const navigate = useNavigate();
  const [secretTaps, setSecretTaps] = useState(0);
  const [showMusicBox, setShowMusicBox] = useState(false);
  const [showA2HS, setShowA2HS] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Redirect to /kristel if flow not completed yet
  useEffect(() => {
    if (!hasKristelCompleted()) {
      navigate('/kristel', { replace: true });
    }
  }, [navigate]);

  // Show "Add to Home Screen" popup (only on iOS Safari, not already standalone, not dismissed)
  useEffect(() => {
    const alreadyDismissed = localStorage.getItem(ADD_TO_HOME_DISMISSED_KEY) === 'true';
    if (!alreadyDismissed && isIosSafari() && !isStandalone()) {
      // Small delay so it doesn't pop immediately
      const timer = setTimeout(() => setShowA2HS(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Countdown timer
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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsUnlocked(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const dismissA2HS = () => {
    setShowA2HS(false);
    localStorage.setItem(ADD_TO_HOME_DISMISSED_KEY, 'true');
  };

  const handleSecretReset = () => {
    localStorage.removeItem('kristel_run_completed');
    localStorage.removeItem('kristel_progress');
    navigate('/kristel', { replace: true });
  };

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

  if (showMusicBox) {
    return (
      <div className="kristel-page min-h-screen bg-gradient-to-br from-rose-soft via-cream to-rose-soft overflow-hidden">
        <MusicBox />
        <p className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 text-gray-500 text-xs whitespace-nowrap">
          Made with love by your cute bf, just for you.
        </p>
      </div>
    );
  }

  return (
    <div className="kristel-page min-h-screen bg-gradient-to-br from-rose-soft via-cream to-rose-soft overflow-hidden">
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
              onClick={() => setShowMusicBox(true)}
              className="mt-10 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-rose-dark text-white font-semibold text-lg shadow-lg active:bg-rose-dark/90 transition-colors"
            >
              Open your surprise
            </button>
          ) : (
            <div
              className="mt-12 flex justify-center gap-1 cursor-default select-none"
              onClick={() => {
                const next = secretTaps + 1;
                if (next >= 3) {
                  handleSecretReset();
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

      {/* Add to Home Screen popup */}
      {showA2HS && (
        <div className="fixed inset-0 z-50 flex items-end justify-center pb-8 px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30" onClick={dismissA2HS} />
          {/* Popup card */}
          <div className="relative bg-white rounded-2xl shadow-xl p-5 w-full max-w-sm animate-fade-in-up">
            <button
              onClick={dismissA2HS}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Save this page 💕
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Add this to your home screen so you can check the countdown anytime!
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-soft flex items-center justify-center">
                  <Share className="w-4 h-4 text-rose-dark" />
                </div>
                <p className="text-sm text-gray-700">
                  Tap the <strong>Share</strong> button at the bottom of Safari
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-rose-soft flex items-center justify-center">
                  <Plus className="w-4 h-4 text-rose-dark" />
                </div>
                <p className="text-sm text-gray-700">
                  Scroll down and tap <strong>"Add to Home Screen"</strong>
                </p>
              </div>
            </div>
            <button
              onClick={dismissA2HS}
              className="mt-5 w-full py-2.5 bg-rose-dark text-white rounded-xl text-sm font-medium active:bg-rose-dark/90 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <p className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 text-gray-500 text-xs whitespace-nowrap">
        Made with love by your cute bf, just for you.
      </p>
    </div>
  );
};

export default Valentines;
