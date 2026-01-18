
import React, { useEffect, useRef } from 'react';
import ClientNavbar from './components/ClientNavbar';
import Hero from './components/Hero';
import PromiseSection from './components/PromiseSection';
import QuotelessSection from './components/QuotelessSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  const viewMode = 'client' as const;
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash) {
        const section = document.querySelector(target.hash);
        if (section && containerRef.current) {
          e.preventDefault();
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="relative client-page">
      <ClientNavbar />
      
      <main ref={containerRef} className="snap-container">
        <section className="snap-section">
          <Hero />
        </section>
        
        <section id="promise" className="snap-section">
          <PromiseSection />
        </section>
        
        <section id="quoteless" className="snap-section">
          <QuotelessSection />
        </section>
        
        <section id="contact" className="snap-section flex flex-col justify-end bg-[#1a1a1a]">
          <Footer viewMode={viewMode} />
        </section>
      </main>
    </div>
  );
};

export default App;
