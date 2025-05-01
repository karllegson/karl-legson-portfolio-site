import React, { useState, useEffect } from 'react';
import { ButtonHover } from './ui/button-hover';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './ui/hover-card';
import { cn } from '@/lib/utils';
import ProfilePicture from './ProfilePicture';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const navigate = useNavigate();
  const fullText = "Creating modern, minimalist web experiences with a focus on performance and user experience";
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const typingDelay = 50; // Adjust typing speed here (milliseconds)

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingDelay);

    return () => clearInterval(typingInterval);
  }, [isVisible]);

  const handleScrollClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const section = document.getElementById('projects');
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center grid-background overflow-hidden pt-16 pb-24"
    >
      <div className="absolute inset-0 bg-dark-300/40 pointer-events-none"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center">
          <div className={cn(
            "inline-block mb-4 py-1 px-3 border border-highlight/30 rounded-full text-sm text-highlight bg-dark-300/50",
            isVisible ? "opacity-100" : "opacity-0 translate-y-5",
            "transform transition-all duration-500"
          )}>
            <span className="animate-pulse">◉</span> Available for new projects
          </div>
          
          <div className={cn(
            "flex justify-center mb-4",
            isVisible ? "opacity-100" : "opacity-0 translate-y-5",
            "transition-all duration-500"
          )}>
            <ProfilePicture />
          </div>
          
          <h1 className={cn(
            "text-5xl md:text-7xl font-bold text-white mb-4",
            isVisible ? "opacity-100" : "opacity-0 translate-y-5",
            "transition-all duration-500"
          )} style={{ transitionDelay: '0.2s' }}>
            Karl <span className="text-highlight">Legson</span>
          </h1>
          
          <h2 className={cn(
            "text-2xl md:text-3xl text-neutral-300 mb-6",
            isVisible ? "opacity-100" : "opacity-0 translate-y-5",
            "transition-all duration-500"
          )} style={{ transitionDelay: '0.4s' }}>
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
          
          <p className={cn(
            "text-lg md:text-xl text-neutral-300 mb-10 leading-relaxed max-w-2xl mx-auto",
            isVisible ? "opacity-100" : "opacity-0 translate-y-5",
            "transition-all duration-500"
          )} style={{ transitionDelay: '0.6s' }}>
            {typedText}
            <span className="inline-block w-0.5 h-5 bg-white ml-1 animate-blink"></span>
          </p>
          
          <div className={cn(
            "flex flex-wrap justify-center gap-4",
            isVisible ? "opacity-100" : "opacity-0 translate-y-5",
            "transition-all duration-500"
          )} style={{ transitionDelay: '0.8s' }}>
            <ButtonHover 
              href="#projects"
              className="group relative overflow-hidden"
              onClick={handleScrollClick}
            >
              View My Work
              <span className="absolute inset-0 bg-highlight/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            </ButtonHover>
            
            <ButtonHover 
              as="link"
              to="/resume"
              className="border-highlight/30 hover:border-highlight/60 group"
              onClick={(e) => {
                e.preventDefault();
                navigate('/resume');
              }}
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
      
      <div className={cn(
        "absolute bottom-8 left-1/2 -translate-x-1/2",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        "transition-all duration-500"
      )} style={{ transitionDelay: '1s' }}>
        <button 
          onClick={handleScrollClick}
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
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
