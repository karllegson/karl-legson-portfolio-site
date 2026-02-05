import { Heart } from 'lucide-react';

interface InvitationScreenProps {
  onAccept: () => void;
}

const InvitationScreen = ({ onAccept }: InvitationScreenProps) => {
  return (
    <div className="kristel-screen kristel-screen-invitation min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px] text-center">
        <div className="mb-8">
          <Heart className="w-12 h-12 mx-auto text-rose-dark fill-rose-dark" />
        </div>

        <p className="text-lg text-gray-600 mb-4">
          You are officially invited to…
        </p>

        <h1 className="font-script text-5xl text-gray-800 mb-6">
          A Valentine's Dinner
        </h1>

        <div className="bg-white/60 rounded-2xl p-6 mb-8 border border-rose-medium/20">
          <p className="text-xl text-gray-700 leading-relaxed">
            An evening just for us.
          </p>
          <p className="text-xl text-gray-700 leading-relaxed mt-2">
            Details coming soon…
          </p>
          <p className="text-lg text-gray-500 mt-4">
            February 14, 2026
          </p>
        </div>

        <button
          onClick={onAccept}
          className="w-full py-4 bg-rose-dark text-white rounded-xl font-medium text-lg hover:bg-rose-dark/90 transition-colors flex items-center justify-center gap-2"
        >
          Accept Invitation <Heart className="w-5 h-5 fill-white" />
        </button>
      </div>
    </div>
  );
};

export default InvitationScreen;
