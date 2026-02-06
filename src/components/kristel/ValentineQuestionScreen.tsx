import { Heart } from 'lucide-react';

interface ValentineQuestionScreenProps {
  onAccept: () => void;
}

const ValentineQuestionScreen = ({ onAccept }: ValentineQuestionScreenProps) => {
  return (
    <div className="kristel-screen kristel-screen-valentine-question min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Glitter sparkles background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-glitter pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
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

      <div className="w-full max-w-[420px] text-center relative z-10">
        {/* Cute image - add your image path here */}
        <div className="mb-6 flex justify-center">
          <img
            src="/kristel-valentine-question.png"
            alt="Cute Valentine"
            className="w-48 h-48 object-contain rounded-2xl"
            draggable={false}
            onError={(e) => {
              // Fallback to heart if image not found
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        <div className="mb-6 flex justify-center">
          <Heart className="w-20 h-20 text-rose-dark fill-rose-dark animate-heart-pulse" />
        </div>

        <h1 className="font-script text-5xl text-gray-800 mb-8">
          Will you be my Valentine?
        </h1>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onAccept}
            className="px-8 py-4 bg-rose-dark text-white rounded-xl font-medium text-lg hover:bg-rose-dark/90 transition-colors shadow-lg flex items-center gap-2"
          >
            Yes! <Heart className="w-5 h-5 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValentineQuestionScreen;
