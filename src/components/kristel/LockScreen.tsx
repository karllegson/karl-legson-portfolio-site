import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { resumeAudio, playClick, playSuccess, playWrong } from './kristelSounds';

interface LockScreenProps {
  onUnlock: () => void;
}

const correctCode = '0912';

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [wrongHamsterIndex, setWrongHamsterIndex] = useState<number | null>(null);
  const [showHelloCutie, setShowHelloCutie] = useState(true);
  const [helloCutieExiting, setHelloCutieExiting] = useState(false);

  useEffect(() => {
    const startExit = setTimeout(() => setHelloCutieExiting(true), 4500);
    const hide = setTimeout(() => setShowHelloCutie(false), 5000);
    return () => {
      clearTimeout(startExit);
      clearTimeout(hide);
    };
  }, []);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCode(value);
    setError('');
    setWrongHamsterIndex(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    resumeAudio();
    if (code === correctCode) {
      playSuccess();
      setIsUnlocking(true);
      setWrongHamsterIndex(null);
      setTimeout(onUnlock, 2000);
    } else {
      playWrong();
      setError('Hmmm.. Try again baber');
      setCode('');
      const randomIndex = Math.floor(Math.random() * 3);
      setWrongHamsterIndex(randomIndex);
    }
  };

  return (
    <div className="kristel-screen kristel-screen-lock min-h-screen flex items-center justify-center px-6 relative">
      <div className="w-full max-w-[420px] text-center">
        {/* Fixed-height slot so layout never shifts */}
        <div className="mb-5 flex justify-center items-center relative h-16">
          {/* Heart always present */}
          <div
            className={`transition-all duration-500 ${
              showHelloCutie ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
            } ${isUnlocking ? 'animate-heart-pulse scale-150' : ''}`}
          >
            <Heart
              className={`w-16 h-16 mx-auto ${
                isUnlocking ? 'text-rose-dark fill-rose-dark' : 'text-rose-medium'
              }`}
            />
          </div>
          {/* Cat overlay — absolutely positioned so it doesn't affect layout */}
          {showHelloCutie && (
            <div
              className={`absolute inset-0 flex justify-center items-center z-20 pointer-events-none ${helloCutieExiting ? 'hello-cutie-exit' : 'hello-cutie-enter'}`}
            >
              <div className="relative">
                <img
                  src="/kristel-hello-cutie.png"
                  alt="Well hello cutie"
                  className="w-44 h-44 object-contain -translate-y-14"
                  draggable={false}
                />
                {/* Glitter sparkles around the cat */}
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-glitter pointer-events-none -translate-y-14"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${5 + Math.random() * 85}%`,
                      animationDelay: `${i * 0.2}s`,
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
            </div>
          )}
        </div>

        <h1 className="font-script text-4xl text-gray-800 mb-2">
          For Kristel
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Enter our secret code
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <input
              type="text"
              inputMode="numeric"
              value={code}
              onChange={handleCodeChange}
              placeholder="····"
              className="w-28 h-16 text-center text-2xl font-medium text-gray-800 placeholder:text-gray-400 bg-white/80 border-2 border-rose-medium/30 rounded-xl focus:border-rose-dark focus:outline-none transition-colors"
              maxLength={4}
              autoComplete="one-time-code"
            />
          </div>

          {error && (
            <p className="text-rose-dark text-sm animate-fade-in">
              {error}
            </p>
          )}

          {wrongHamsterIndex !== null && (
            <div className="mt-4 flex justify-center">
              <img
                src="/kristel-wrong-failed.png"
                alt="Sad reaction"
                className="w-32 h-32 object-contain rounded-xl"
                draggable={false}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={code.length !== 4 || isUnlocking}
            className="w-full py-4 bg-rose-dark text-white rounded-xl font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-dark/90 transition-colors"
          >
            {isUnlocking ? 'Unlocking...' : 'Unlock'}
          </button>
        </form>

      </div>

      {/* Success overlay when correct code is entered */}
      {isUnlocking && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-30 bg-gradient-to-br from-rose-soft via-cream to-rose-soft hello-cutie-enter">
          <div className="relative">
            <img
              src="/kristel-unlock-success.png"
              alt="Yay! You got it!"
              className="w-52 h-52 object-contain"
              draggable={false}
            />
            {/* Glitter sparkles */}
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-glitter pointer-events-none"
                style={{
                  left: `${5 + Math.random() * 90}%`,
                  top: `${5 + Math.random() * 90}%`,
                  animationDelay: `${i * 0.15}s`,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 10 10" className="text-rose-medium">
                  <polygon
                    points="5,0 6,4 10,5 6,6 5,10 4,6 0,5 4,4"
                    fill="currentColor"
                  />
                </svg>
              </div>
            ))}
          </div>
          <p className="mt-6 text-2xl font-script text-gray-800 animate-fade-in-up">
            You got it!
          </p>
        </div>
      )}
    </div>
  );
};

export default LockScreen;
