import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const BackgroundAnimation = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Trigger animation after component mounts
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate the mouse position as a percentage of the screen
      // Dividing by a larger number (6 instead of 3) to reduce movement sensitivity
      const x = e.clientX / (window.innerWidth * 6);
      const y = e.clientY / (window.innerHeight * 6);
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Calculate subtle parallax effect based on mouse position
  // Reduce the factor values to minimize movement
  const getTransform = (factor: number) => {
    const translateX = (mousePosition.x - 0.5/6) * factor;
    const translateY = (mousePosition.y - 0.5/6) * factor;
    return `translate(${translateX}px, ${translateY}px)`;
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-background opacity-70"></div>
      
      {/* Geometric shapes inspired by the reference image */}
      <div className="absolute w-full h-full">
        {/* Yellow accent circle */}
        <div 
          className={cn(
            "absolute top-[20%] left-[15%] w-48 h-48 rounded-full opacity-0 transition-all duration-1000",
            isLoaded && "opacity-10"
          )}
          style={{ 
            background: 'linear-gradient(135deg, rgba(255,220,0,0.4) 0%, rgba(255,180,0,0.1) 100%)',
            transform: getTransform(-10),
            transition: 'transform 0.8s ease-out, opacity 1s ease'
          }}
        ></div>
        
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
            backdropFilter: 'blur(5px)',
            transform: `rotate(30deg) ${getTransform(8)}`,
            transitionDelay: '600ms',
            transition: 'transform 0.8s ease-out, opacity 1s ease'
          }}
        ></div>

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
            transform: `${getTransform(-6)}`,
            transitionDelay: '900ms',
            transition: 'transform 0.8s ease-out, opacity 1s ease'
          }}
        ></div>
        
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
            transform: `${getTransform(15)}`,
            transitionDelay: '500ms',
            transition: 'transform 0.8s ease-out, opacity 1s ease'
          }}
        ></div>

        {/* Moving gradient line */}
        <div 
          className={cn(
            "absolute top-1/3 left-0 w-full h-[1px] opacity-0 transition-all duration-1000",
            isLoaded && "opacity-10"
          )}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,220,0,0.5) 50%, transparent 100%)',
            transform: `translateY(${(mousePosition.y - 0.5) * 50}px)`,
            transition: 'transform 1.2s ease-out',
            transitionDelay: '700ms'
          }}
        ></div>
      </div>
    </div>
  );
};

export default BackgroundAnimation;
