import { useScrollToSection } from '@/hooks/useScrollToSection';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
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
        <ProjectsSection />
        <SkillsSection />
        <HobbiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
