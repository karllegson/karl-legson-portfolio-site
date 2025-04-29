
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonHover } from './ui/button-hover';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
          <NavLink href="#home" onClick={(e) => handleNavClick(e, "home")}>Home</NavLink>
          <NavLink href="#projects" onClick={(e) => handleNavClick(e, "website-showcase")}>Projects</NavLink>
          <NavLink href="#skills" onClick={(e) => handleNavClick(e, "skills")}>Skills</NavLink>
          <NavLink href="#hobbies" onClick={(e) => handleNavClick(e, "hobbies")}>Hobbies</NavLink>
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
        "md:hidden fixed inset-0 bg-dark-300/95 z-40 transition-transform duration-300 pt-20",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="container px-4 mx-auto flex flex-col space-y-6 items-center">
          <MobileNavLink href="#home" onClick={(e) => handleNavClick(e, "home")}>Home</MobileNavLink>
          <MobileNavLink href="#projects" onClick={(e) => handleNavClick(e, "website-showcase")}>Projects</MobileNavLink>
          <MobileNavLink href="#skills" onClick={(e) => handleNavClick(e, "skills")}>Skills</MobileNavLink>
          <MobileNavLink href="#hobbies" onClick={(e) => handleNavClick(e, "hobbies")}>Hobbies</MobileNavLink>
          <Link 
            to="/resume" 
            className="text-xl font-medium text-[#FFDC00] hover:text-white transition-colors flex items-center gap-2"
            onClick={toggleMobileMenu}
          >
            <span>Resume</span>
            <span className="w-2 h-2 rounded-full bg-[#FFDC00] animate-pulse"></span>
          </Link>
          <ButtonHover href="#contact" className="w-full justify-center" onClick={(e) => handleNavClick(e, "contact")}>
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
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => (
  <a 
    href={href} 
    className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
    onClick={onClick}
  >
    {children}
  </a>
);

const MobileNavLink = ({ 
  href, 
  children,
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => (
  <a 
    href={href} 
    className="text-xl font-medium text-neutral-300 hover:text-white transition-colors"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Navbar;
