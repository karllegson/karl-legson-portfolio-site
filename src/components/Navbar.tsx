import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ButtonHover } from './ui/button-hover';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Only set up observers if we're on the home page
    if (location.pathname !== '/') return;

    const options = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Observe all sections
    const sections = ['home', 'website-showcase', 'skills', 'hobbies', 'contact'];
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) observer.unobserve(element);
      });
    };
  }, [location.pathname]);

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
      }
    } else {
      // Navigate to home page and then scroll to section
      navigate('/', { state: { scrollTo: sectionId } });
    }
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const isCurrentSection = (sectionId: string) => {
    if (location.pathname === '/') {
      if (sectionId === '#home') {
        return activeSection === 'home';
      } else if (sectionId === '#projects') {
        return activeSection === 'website-showcase';
      } else if (sectionId === '#skills') {
        return activeSection === 'skills';
      } else if (sectionId === '#hobbies') {
        return activeSection === 'hobbies';
      } else if (sectionId === '#contact') {
        return activeSection === 'contact';
      }
    }
    return false;
  };

  const isResumePage = location.pathname === '/resume';

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-dark-300/80 backdrop-blur-md py-3" : "bg-transparent py-5"
    )}>
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-medium text-white hover:text-highlight transition-colors">
          Karl<span className="text-highlight">Legson</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#home" isActive={isCurrentSection('#home')} onClick={(e) => handleNavClick(e, "home")}>Home</NavLink>
          <NavLink href="#projects" isActive={isCurrentSection('#projects')} onClick={(e) => handleNavClick(e, "website-showcase")}>Projects</NavLink>
          <NavLink href="#skills" isActive={isCurrentSection('#skills')} onClick={(e) => handleNavClick(e, "skills")}>Skills</NavLink>
          <NavLink href="#hobbies" isActive={isCurrentSection('#hobbies')} onClick={(e) => handleNavClick(e, "hobbies")}>Hobbies</NavLink>
          <Link 
            to="/resume" 
            className={cn(
              "text-sm font-medium transition-colors flex items-center gap-1",
              isResumePage ? "text-highlight" : "text-neutral-300 hover:text-white"
            )}
            onClick={() => {
              window.scrollTo(0, 0);
              if (mobileMenuOpen) setMobileMenuOpen(false);
            }}
          >
            <span>Resume</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFDC00] animate-pulse"></span>
          </Link>
          <ButtonHover onClick={(e) => handleNavClick(e, "contact")}>Contact Me</ButtonHover>
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
        "md:hidden fixed inset-0 bg-dark-300/95 z-40 transition-transform duration-300 pt-20",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="container px-4 mx-auto flex flex-col space-y-6 items-center">
          <MobileNavLink href="#home" isActive={isCurrentSection('#home')} onClick={(e) => handleNavClick(e, "home")}>Home</MobileNavLink>
          <MobileNavLink href="#projects" isActive={isCurrentSection('#projects')} onClick={(e) => handleNavClick(e, "website-showcase")}>Projects</MobileNavLink>
          <MobileNavLink href="#skills" isActive={isCurrentSection('#skills')} onClick={(e) => handleNavClick(e, "skills")}>Skills</MobileNavLink>
          <MobileNavLink href="#hobbies" isActive={isCurrentSection('#hobbies')} onClick={(e) => handleNavClick(e, "hobbies")}>Hobbies</MobileNavLink>
          <Link 
            to="/resume" 
            className={cn(
              "text-xl font-medium transition-colors flex items-center gap-2",
              isResumePage ? "text-highlight" : "text-neutral-300 hover:text-white"
            )}
            onClick={() => {
              window.scrollTo(0, 0);
              toggleMobileMenu();
            }}
          >
            <span>Resume</span>
            <span className="w-2 h-2 rounded-full bg-[#FFDC00] animate-pulse"></span>
          </Link>
          <ButtonHover className="w-full justify-center" onClick={(e) => handleNavClick(e, "contact")}>
            Contact Me
          </ButtonHover>
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
      "text-sm font-medium transition-colors",
      isActive ? "text-highlight" : "text-neutral-300 hover:text-white"
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
      "text-xl font-medium transition-colors",
      isActive ? "text-highlight" : "text-neutral-300 hover:text-white"
    )}
    onClick={onClick}
  >
    {children}
  </a>
);

export default Navbar;
