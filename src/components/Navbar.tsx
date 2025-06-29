import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonHover } from './ui/button-hover';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ['home', 'projects', 'skills', 'hobbies', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      // Get the middle of the viewport
      const viewportMiddle = window.scrollY + (window.innerHeight / 2);

      // Find the section that's currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;

          if (viewportMiddle >= sectionTop && viewportMiddle <= sectionBottom) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    // Call once immediately to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // If we're already on the home page
    if (window.location.pathname === '/') {
      // Scroll to the section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
        // Close mobile menu if open
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    } else {
      // Navigate to home page and then scroll to section
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      scrolled || mobileMenuOpen ? "bg-[#1A1B1E] py-3" : "bg-transparent py-5"
    )}>
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-medium text-white hover:text-highlight transition-colors">
          Karl<span className="text-highlight">Legson</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#home" isActive={activeSection === 'home'} onClick={(e) => handleNavClick(e, "home")}>Home</NavLink>
          <NavLink href="#projects" isActive={activeSection === 'projects'} onClick={(e) => handleNavClick(e, "projects")}>Projects</NavLink>
          <NavLink href="#skills" isActive={activeSection === 'skills'} onClick={(e) => handleNavClick(e, "skills")}>Skills</NavLink>
          <NavLink href="#hobbies" isActive={activeSection === 'hobbies'} onClick={(e) => handleNavClick(e, "hobbies")}>Hobbies</NavLink>
          <Link 
            to="/resume" 
            className="text-sm font-medium text-[#FFDC00] hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Resume</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFDC00] animate-pulse"></span>
          </Link>
          <ButtonHover href="#contact" onClick={(e) => handleNavClick(e, "contact")}>Contact Me</ButtonHover>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden fixed inset-0 bg-[#1A1B1E] z-40 transition-all duration-300",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Close Button */}
        <button 
          className="absolute top-8 right-6 text-neutral-400 hover:text-white transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <nav className="container h-full px-8 mx-auto flex flex-col items-center justify-center -mt-20">
          <div className="space-y-8 text-center">
            <MobileNavLink href="#home" isActive={activeSection === 'home'} onClick={(e) => handleNavClick(e, "home")}>Home</MobileNavLink>
            <MobileNavLink href="#projects" isActive={activeSection === 'projects'} onClick={(e) => handleNavClick(e, "projects")}>Projects</MobileNavLink>
            <MobileNavLink href="#skills" isActive={activeSection === 'skills'} onClick={(e) => handleNavClick(e, "skills")}>Skills</MobileNavLink>
            <MobileNavLink href="#hobbies" isActive={activeSection === 'hobbies'} onClick={(e) => handleNavClick(e, "hobbies")}>Hobbies</MobileNavLink>
            <Link 
              to="/resume" 
              className="block text-lg font-medium text-[#FFDC00] hover:text-white transition-colors"
              onClick={toggleMobileMenu}
            >
              <div className="flex items-center justify-center gap-2">
                <span>Resume</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFDC00] animate-pulse"></span>
              </div>
            </Link>
            <ButtonHover 
              href="#contact" 
              className="w-full justify-center mt-8" 
              onClick={(e) => handleNavClick(e, "contact")}
            >
              Contact Me
            </ButtonHover>
          </div>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ 
  href, 
  children,
  isActive,
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => (
  <a 
    href={href} 
    className={cn(
      "text-sm font-medium transition-all duration-300",
      isActive ? "text-white border-b-2 border-highlight" : "text-neutral-300 hover:text-white"
    )}
    onClick={onClick}
  >
    {children}
  </a>
);

const MobileNavLink = ({ 
  href, 
  children,
  isActive,
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => (
  <a 
    href={href} 
    className={cn(
      "block text-lg font-medium transition-all duration-300",
      isActive 
        ? "text-white" 
        : "text-neutral-400 hover:text-white"
    )}
    onClick={onClick}
  >
    {children}
  </a>
);

export default Navbar;
