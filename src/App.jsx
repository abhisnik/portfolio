import { useState, useRef, useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';
import HeroScene from './scenes/HeroScene';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import EducationSection from './sections/EducationSection';
import CertificationsSection from './sections/CertificationsSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const scrollY = useRef(0);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', (e) => {
      scrollY.current = e.scroll;
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <CustomCursor />
      <Navigation />

      <HeroScene scrollY={scrollY} />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
