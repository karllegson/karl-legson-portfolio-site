import { useScrollToSection } from '@/hooks/useScrollToSection';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WebsiteShowcase from '@/components/WebsiteShowcase';
import SkillsSection from '@/components/SkillsSection';
import HobbiesSection from '@/components/HobbiesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BackgroundAnimation from '@/components/BackgroundAnimation';

const Index = () => {
  useScrollToSection();

  return (
    <div className="min-h-screen bg-dark-200 text-white">
      <BackgroundAnimation />
      <Navbar />
      <main>
        <HeroSection />
        <WebsiteShowcase />
        <SkillsSection />
        <HobbiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
