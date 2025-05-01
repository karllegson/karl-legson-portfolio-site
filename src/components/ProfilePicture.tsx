import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProfilePictureProps {
  className?: string;
}

const ProfilePicture = ({ className }: ProfilePictureProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative w-48 h-48 md:w-52 md:h-52", className)}>
      {/* Glowing border effect */}
      <div 
        className="absolute -inset-0.5 rounded-full opacity-75"
        style={{
          background: 'linear-gradient(215deg, #FFDC00 0%, rgba(255, 220, 0, 0.5) 100%)',
          filter: 'blur(3px)'
        }}
      ></div>
      
      {/* Profile image */}
      <div className={cn(
        "relative w-full h-full rounded-full overflow-hidden transition-all duration-700 bg-dark-300",
        isLoaded ? "opacity-100" : "opacity-0"
      )}>
        <img
          src="/images/profile-photo@2x.webp"
          alt="Karl Legson"
          className="w-full h-full object-cover object-[center_20%]"
          onLoad={() => setIsLoaded(true)}
          style={{
            imageRendering: '-webkit-optimize-contrast',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
          loading="eager"
          decoding="sync"
        />
      </div>

      {/* Emoji */}
      <div className="absolute -right-2 -bottom-4 w-10 h-10 bg-highlight rounded-full flex items-center justify-center animate-float">
        <span className="text-dark-300 font-bold">👋🏽</span>
      </div>
    </div>
  );
};

export default ProfilePicture;
