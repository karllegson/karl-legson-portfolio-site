import { useEffect } from 'react';
import { Heart } from 'lucide-react';
import { playHeartbeat } from './kristelSounds';

interface ValentineMemoryScreenProps {
  year: string;
  imagePath?: string | string[];
  message: string;
  onContinue: () => void;
}

const ValentineMemoryScreen = ({ year, imagePath, message, onContinue }: ValentineMemoryScreenProps) => {
  useEffect(() => {
    playHeartbeat();
  }, []);

  // Normalize imagePath to array
  const imagePaths = imagePath 
    ? (Array.isArray(imagePath) ? imagePath : [imagePath])
    : [];

  return (
    <div className="kristel-screen kristel-screen-valentine-memory min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">
        <div className="mb-6">
          <Heart className="w-12 h-12 mx-auto text-rose-dark fill-rose-dark animate-heart-pulse" />
        </div>

        <h2 className="font-script text-4xl text-gray-800 mb-4">
          {year}
        </h2>

        {imagePaths.length > 0 ? (
          <div className={`mb-6 flex justify-center gap-3 ${imagePaths.length === 2 ? 'flex-row' : 'flex-col'}`}>
            {imagePaths.map((path, index) => (
              <div
                key={index}
                className={`${imagePaths.length === 2 ? 'flex-1 max-w-[48%]' : 'w-full max-w-sm'}`}
              >
                <img
                  src={path}
                  alt={`Valentine's Day ${year} - Photo ${index + 1}`}
                  className="w-full h-auto max-h-64 object-cover rounded-2xl shadow-lg"
                  draggable={false}
                  style={{ maxHeight: '256px' }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-6 flex justify-center">
            <div className="w-full max-w-sm h-64 bg-white/50 border-2 border-dashed border-rose-medium/30 rounded-2xl flex items-center justify-center">
              <p className="text-gray-400 text-sm">Photo placeholder</p>
            </div>
          </div>
        )}

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          {message}
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

export default ValentineMemoryScreen;
