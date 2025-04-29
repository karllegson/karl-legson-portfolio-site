
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WebsiteShowcase from '@/components/WebsiteShowcase';
import SkillsSection from '@/components/SkillsSection';
import HobbiesSection from '@/components/HobbiesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';

const Index = () => {
  const location = useLocation();
  const pageLoaded = useRef(false);

  useEffect(() => {
    // Check for scrollTo in location state
    if (location.state && location.state.scrollTo && !pageLoaded.current) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      pageLoaded.current = true;
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-dark-200 text-white">
      <BackgroundAnimation />
      <Navbar />
      <HeroSection />
      <WebsiteShowcase />
      <SkillsSection />
      <HobbiesSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
