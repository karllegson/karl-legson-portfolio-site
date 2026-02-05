import { useState, useRef } from 'react';
import { Heart } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [error, setError] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const dayRef = useRef<HTMLInputElement>(null);

  const correctMonth = '09';
  const correctDay = '12';

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMonth(value);
    setError('');
    if (value.length === 2) {
      dayRef.current?.focus();
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setDay(value);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (month === correctMonth && day === correctDay) {
      setIsUnlocking(true);
      setTimeout(onUnlock, 800);
    } else {
      setError('Hmm… try again, my love');
      setMonth('');
      setDay('');
    }
  };

  return (
    <div className="kristel-screen kristel-screen-lock min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">
        <div
          className={`mb-8 transition-transform duration-500 ${
            isUnlocking ? 'animate-heart-pulse scale-150' : ''
          }`}
        >
          <Heart
            className={`w-16 h-16 mx-auto ${
              isUnlocking ? 'text-rose-dark fill-rose-dark' : 'text-rose-medium'
            }`}
          />
        </div>

        <h1 className="font-script text-4xl text-gray-800 mb-2">
          For Kristel
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Enter the code
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              value={month}
              onChange={handleMonthChange}
              placeholder="MM"
              className="w-20 h-16 text-center text-2xl font-medium text-gray-800 placeholder:text-gray-400 bg-white/80 border-2 border-rose-medium/30 rounded-xl focus:border-rose-dark focus:outline-none transition-colors"
              maxLength={2}
            />
            <span className="text-3xl text-gray-400">/</span>
            <input
              ref={dayRef}
              type="text"
              inputMode="numeric"
              value={day}
              onChange={handleDayChange}
              placeholder="DD"
              className="w-20 h-16 text-center text-2xl font-medium text-gray-800 placeholder:text-gray-400 bg-white/80 border-2 border-rose-medium/30 rounded-xl focus:border-rose-dark focus:outline-none transition-colors"
              maxLength={2}
            />
          </div>

          {error && (
            <p className="text-rose-dark text-sm animate-fade-in">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={month.length !== 2 || day.length !== 2 || isUnlocking}
            className="w-full py-4 bg-rose-dark text-white rounded-xl font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-dark/90 transition-colors"
          >
            {isUnlocking ? 'Unlocking...' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LockScreen;
