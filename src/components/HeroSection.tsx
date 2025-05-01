import { useState, useEffect } from 'react';
import { ButtonHover } from './ui/button-hover';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './ui/hover-card';
import ProfilePicture from './ProfilePicture';
import TypeWriter from './ui/TypeWriter';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate the mouse position as a percentage of the screen
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    // Add subtle mouse tracking for interactive background
    window.addEventListener('mousemove', handleMouseMove);
    
    // Show elements after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Calculate subtle parallax effect based on mouse position
  const getTransform = (factor: number) => {
    const translateX = (mousePosition.x - 0.5) * factor;
    const translateY = (mousePosition.y - 0.5) * factor;
    return `translate(${translateX}px, ${translateY}px)`;
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center grid-background overflow-hidden pt-16 pb-24"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-300/40 to-dark-200/80 pointer-events-none"></div>
      
      <div 
        className="absolute inset-0 opacity-30"
        style={{ 
          background: 'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(40,40,40,0.9) 100%)',
          backdropFilter: 'blur(8px)',
          transform: getTransform(10),
          transition: 'transform 0.2s ease-out'
        }}
      ></div>
      
      <div 
        className="container px-4 mx-auto relative z-10"
        style={{ transform: getTransform(-5), transition: 'transform 0.2s ease-out' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`inline-block mb-4 py-1 px-3 border border-highlight/30 rounded-full text-sm text-highlight bg-dark-300/50 backdrop-blur-sm transform transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-5'}`}
          >
            <span className="animate-pulse">◉</span> Available for new projects
          </div>
          
          {/* Profile Picture with Glow */}
          <div className="flex justify-center mb-16">
            {/* Profile Picture */}
            <div className="relative">
            <ProfilePicture />
            </div>
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-bold text-white mb-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.2s' }}>
            Karl <span className="text-highlight">Legson</span>
          </h1>
          
          <h2 className={`text-xl md:text-2xl text-neutral-400 mb-8 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.4s' }}>
            <HoverCard>
              <HoverCardTrigger className="cursor-default">
                <span className="group">
                  Web Developer & Designer
                  <span className="block h-0.5 max-w-0 bg-neutral-400 transition-all duration-500 group-hover:max-w-full"></span>
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 backdrop-blur-md bg-dark-300/80 border border-neutral-700 text-sm leading-relaxed">
                <p>Specializing in creating clean, modern web experiences with a focus on usability and performance.</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['React', 'TypeScript', 'Tailwind', 'UI/UX'].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-dark-200/80 rounded-md text-xs">{skill}</span>
                  ))}
                </div>
              </HoverCardContent>
            </HoverCard>
          </h2>
          
          <p className={`text-lg md:text-xl text-neutral-300 mb-10 leading-relaxed max-w-2xl mx-auto transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.6s' }}>
            <TypeWriter 
              text="Creating modern, minimalist web experiences with a focus on performance and user experience"
              delay={40}
            />
          </p>
          
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.8s' }}>
            <ButtonHover 
              href="#projects"
              className="group relative overflow-hidden"
            >
              View My Work
              <span className="absolute inset-0 bg-highlight/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            </ButtonHover>
            
            <ButtonHover 
              as="link"
              to="/resume"
              className="border-highlight/30 hover:border-highlight/60 group"
            >
              View My Resume
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-highlight/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </ButtonHover>
            
            <ButtonHover 
              href="#contact" 
              className="border-highlight/30 hover:border-highlight/60 group"
            >
              Let's Connect
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-highlight/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </ButtonHover>
          </div>
        </div>
      </div>
      
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '1.2s', transform: `translateX(-50%) ${getTransform(3)}` }}>
        <a 
          href="#projects" 
          className="flex flex-col items-center text-neutral-400 hover:text-white transition-colors"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 animate-bounce" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 14.586l5.293-5.293a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
