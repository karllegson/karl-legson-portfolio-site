import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const BackgroundAnimation = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute w-full h-full">
        {/* Subtle Airplane */}
        <div 
          className={cn(
            "absolute top-[15%] right-[20%] w-16 h-16 opacity-0 transition-all duration-1000",
            isLoaded && "opacity-15"
          )}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'rgba(255,220,0,0.3)\' stroke-width=\'1\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z\'/%3E%3C/svg%3E")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            transform: 'rotate(-45deg)',
            animation: 'float 6s ease-in-out infinite'
          }}
        />

        {/* Yellow accent rectangle */}
        <div 
          className={cn(
            "absolute top-1/3 right-[10%] w-64 h-64 opacity-0 transition-all duration-1000",
            isLoaded && "opacity-10"
          )}
          style={{
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            border: '1px solid rgba(255,220,0,0.1)',
            background: 'linear-gradient(135deg, rgba(255,220,0,0.03) 0%, rgba(0,0,0,0) 100%)',
            transform: 'rotate(30deg)',
            transitionDelay: '600ms'
          }}
        />

        {/* Yellow accent polygon */}
        <div 
          className={cn(
            "absolute bottom-[20%] left-[20%] w-80 h-80 opacity-0 transition-all duration-1500",
            isLoaded && "opacity-15"
          )}
          style={{
            clipPath: 'polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)',
            border: '1px solid rgba(255,220,0,0.05)',
            background: 'linear-gradient(135deg, rgba(255,220,0,0.02) 0%, rgba(0,0,0,0) 100%)',
            transitionDelay: '900ms'
          }}
        />
        
        {/* Grid dots with yellow accent */}
        <div 
          className={cn(
            "absolute top-24 right-24 w-40 h-40 opacity-0 transition-all duration-1000",
            isLoaded && "opacity-30"
          )}
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'rgba(255,220,0,0.3)\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\'/%3E%3Ccircle cx=\'30\' cy=\'10\' r=\'1\'/%3E%3Ccircle cx=\'50\' cy=\'10\' r=\'1\'/%3E%3Ccircle cx=\'70\' cy=\'10\' r=\'1\'/%3E%3Ccircle cx=\'90\' cy=\'10\' r=\'1\'/%3E%3Ccircle cx=\'10\' cy=\'30\' r=\'1\'/%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3Ccircle cx=\'50\' cy=\'30\' r=\'1\'/%3E%3Ccircle cx=\'70\' cy=\'30\' r=\'1\'/%3E%3Ccircle cx=\'90\' cy=\'30\' r=\'1\'/%3E%3Ccircle cx=\'10\' cy=\'50\' r=\'1\'/%3E%3Ccircle cx=\'30\' cy=\'50\' r=\'1\'/%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'1\'/%3E%3Ccircle cx=\'70\' cy=\'50\' r=\'1\'/%3E%3Ccircle cx=\'90\' cy=\'50\' r=\'1\'/%3E%3Ccircle cx=\'10\' cy=\'70\' r=\'1\'/%3E%3Ccircle cx=\'30\' cy=\'70\' r=\'1\'/%3E%3Ccircle cx=\'50\' cy=\'70\' r=\'1\'/%3E%3Ccircle cx=\'70\' cy=\'70\' r=\'1\'/%3E%3Ccircle cx=\'90\' cy=\'70\' r=\'1\'/%3E%3Ccircle cx=\'10\' cy=\'90\' r=\'1\'/%3E%3Ccircle cx=\'30\' cy=\'90\' r=\'1\'/%3E%3Ccircle cx=\'50\' cy=\'90\' r=\'1\'/%3E%3Ccircle cx=\'70\' cy=\'90\' r=\'1\'/%3E%3Ccircle cx=\'90\' cy=\'90\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat',
            transitionDelay: '500ms'
          }}
        />
      </div>
    </div>
  );
};

export default BackgroundAnimation;
