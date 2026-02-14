
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import ClientNavbar from './ClientNavbar';
import Hero from './Hero';
import PromiseSection from './PromiseSection';
import QuotelessSection from './QuotelessSection';
import ProjectsSection from './ProjectsSection';
import Footer from './Footer';

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
        <section className="snap-section hero-snap">
          <Hero />
        </section>
        
        <section id="promise" className="snap-section">
          <PromiseSection />
        </section>
        
        <section id="quoteless" className="snap-section">
          <QuotelessSection />
        </section>
        
        <section id="projects" className="snap-section">
          <ProjectsSection />
        </section>
        
        <section id="contact" className="snap-section flex flex-col justify-end bg-[#1a1a1a]">
          <Footer viewMode={viewMode} />
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
