
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import PertDistribution from './PertDistribution';

const defaultDescription = `Heritage Renovation — Woollahra Residence

A comprehensive renovation of a two-storey Federation-era residence in Sydney's Eastern Suburbs. The scope includes structural remediation of the original sandstone foundation, full rewiring and replumbing, restoration of period timber joinery, a contemporary rear extension with steel-framed glazing, and a landscaped courtyard with integrated drainage.

Key cost drivers include heritage compliance requirements, limited site access for machinery, premium material selections (reclaimed hardwood flooring, natural stone benchtops, brass tapware), and the coordination of specialist heritage trades alongside modern building services.

Estimated duration: 10–14 months.`;

const ForecastApp: React.FC = () => {
  const [description, setDescription] = useState(defaultDescription);

  return (
    <div className="relative client-page min-h-screen bg-[#1a1a1a] text-[#fafafa]">
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-transparent">
        <a href="/" className="text-2xl font-serif tracking-tight text-white/80 hover:text-white transition-colors">
          Totem
        </a>
        <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/40">
          Forecast
        </span>
      </nav>

      <main className="h-screen flex items-center px-8 md:px-16 lg:px-24 pt-20">
        <div className="w-full max-w-[110rem] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center h-full py-8">
          {/* Left: Editable description */}
          <div className="lg:w-[38%] flex-shrink-0 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-8 text-white/90">
              Forecast
            </h1>
            <div
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setDescription(e.currentTarget.textContent || '')}
              className="leading-relaxed text-white/60 whitespace-pre-line focus:outline-none focus:text-white/80 transition-colors cursor-text selection:bg-primary/30"
              style={{ caretColor: '#D4AF37', fontFamily: 'Avenir, sans-serif', fontSize: '0.9rem' }}
            >
              {defaultDescription}
            </div>
          </div>

          {/* Right: Interactive PERT distribution */}
          <div className="lg:w-[62%] flex-grow flex items-center justify-center min-h-[400px]">
            <PertDistribution />
          </div>
        </div>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ForecastApp />
  </React.StrictMode>
);

export default ForecastApp;
