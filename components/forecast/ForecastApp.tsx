
import React, { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import ForecastSection, { SectionData } from './ForecastSection';
import { useUndoableState } from './useUndoableState';

const defaultDescription = `Heritage Renovation — Woollahra Residence

A comprehensive renovation of a two-storey Federation-era residence in Sydney's Eastern Suburbs. The scope includes structural remediation of the original sandstone foundation, full rewiring and replumbing, restoration of period timber joinery, a contemporary rear extension with steel-framed glazing, and a landscaped courtyard with integrated drainage.

Key cost drivers include heritage compliance requirements, limited site access for machinery, premium material selections (reclaimed hardwood flooring, natural stone benchtops, brass tapware), and the coordination of specialist heritage trades alongside modern building services.

Estimated duration: 10–14 months.`;

const defaultPertParams = {
  min: 600_000,
  mode: 800_000,
  max: 1_200_000,
  lambda: 4,
  axisMin: 500_000,
  axisMax: 1_300_000,
};

const newSectionPertParams = {
  min: 40_000,
  mode: 60_000,
  max: 100_000,
  lambda: 4,
  axisMin: 30_000,
  axisMax: 120_000,
};

let nextId = 2;

const initialSections: SectionData[] = [
  {
    id: '1',
    title: 'Forecast',
    description: defaultDescription,
    pertParams: defaultPertParams,
  },
];

const ForecastApp: React.FC = () => {
  const [sections, setSections] = useUndoableState<SectionData[]>(initialSections);
  const containerRef = useRef<HTMLElement>(null);

  // --- Section CRUD ---

  const addSection = useCallback(() => {
    const id = String(nextId++);
    setSections((prev) => [
      ...prev,
      {
        id,
        title: 'New Scope Item',
        description: 'Describe this scope item — room, trade, or area of work.\n\nClear all text to remove this section.',
        pertParams: { ...newSectionPertParams },
      },
    ]);
    // Scroll to the new section after it renders
    requestAnimationFrame(() => {
      const container = containerRef.current;
      if (container) {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      }
    });
  }, [setSections]);

  const updateDescription = useCallback((_id: string, _description: string) => {
    // Live update without undo push (too noisy per keystroke)
  }, []);

  const handleDescriptionBlur = useCallback((id: string, description: string) => {
    const trimmed = description.trim();

    // If description is empty and it's not the fixed section, remove it
    if (trimmed === '' && id !== '1') {
      setSections((prev) => prev.filter((s) => s.id !== id));
      return;
    }

    // Otherwise commit the text change
    setSections((prev) => {
      const section = prev.find((s) => s.id === id);
      if (!section || section.description === description) return prev;
      return prev.map((s) => (s.id === id ? { ...s, description } : s));
    });
  }, [setSections]);

  const handleTitleChange = useCallback((id: string, title: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, title } : s))
    );
  }, [setSections]);

  const handlePertParamsChange = useCallback((id: string, pertParams: SectionData['pertParams']) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, pertParams } : s))
    );
  }, [setSections]);

  // --- Move up / down ---

  const flashSection = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const el = container.children[index] as HTMLElement | undefined;
    if (!el) return;
    el.classList.remove('reorder-flash');
    // Force reflow so re-adding the class restarts the animation
    void el.offsetWidth;
    el.classList.add('reorder-flash');
    el.addEventListener('animationend', () => el.classList.remove('reorder-flash'), { once: true });
  }, []);

  const scrollToIndexAndFlash = useCallback((fromIdx: number, toIdx: number) => {
    requestAnimationFrame(() => {
      if (toIdx < 0) return;
      const container = containerRef.current;
      if (!container) return;
      const fromEl = container.children[fromIdx] as HTMLElement | undefined;
      const toEl = container.children[toIdx] as HTMLElement | undefined;
      if (!fromEl || !toEl) return;
      // Jump instantly to the displaced neighbor
      fromEl.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
      // Then smooth-scroll to the moved section and flash it
      requestAnimationFrame(() => {
        toEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(() => flashSection(toIdx), 350);
      });
    });
  }, [flashSection]);

  const handleMoveUp = useCallback((id: string) => {
    let newIdx = -1;
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx <= 1) return prev;
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      newIdx = idx - 1;
      return next;
    });
    if (newIdx >= 0) scrollToIndexAndFlash(newIdx + 1, newIdx);
  }, [setSections, scrollToIndexAndFlash]);

  const handleMoveDown = useCallback((id: string) => {
    let newIdx = -1;
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx === -1 || idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      newIdx = idx + 1;
      return next;
    });
    if (newIdx >= 0) scrollToIndexAndFlash(newIdx - 1, newIdx);
  }, [setSections, scrollToIndexAndFlash]);

  // --- Arrow key navigation between sections ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;

      // Don't intercept if user is editing inside a contentEditable element
      const active = document.activeElement;
      if (active && (active as HTMLElement).isContentEditable) return;
      // Also skip if inside an input/textarea
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;

      const container = containerRef.current;
      if (!container) return;

      // Determine which section is currently visible
      const sectionCount = container.children.length;
      const scrollTop = container.scrollTop;
      const vh = container.clientHeight;
      const currentIdx = Math.round(scrollTop / vh);

      if (e.key === 'ArrowUp' && currentIdx > 0) {
        e.preventDefault();
        const target = container.children[currentIdx - 1] as HTMLElement;
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (e.key === 'ArrowDown' && currentIdx < sectionCount - 1) {
        e.preventDefault();
        const target = container.children[currentIdx + 1] as HTMLElement;
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="relative client-page bg-[#1a1a1a] text-[#fafafa]">
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-transparent pointer-events-none">
        <a href="/" className="text-2xl font-serif tracking-tight text-white/80 hover:text-white transition-colors pointer-events-auto">
          Totem
        </a>
        <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/40">
          Forecast
        </span>
      </nav>

      <main ref={containerRef} className="snap-container">
        {sections.map((section, index) => (
          <ForecastSection
            key={section.id}
            section={section}
            isFixed={index === 0}
            onTitleChange={handleTitleChange}
            onDescriptionChange={updateDescription}
            onPertParamsChange={handlePertParamsChange}
            onDescriptionBlur={handleDescriptionBlur}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            canMoveUp={index > 1}
            canMoveDown={index > 0 && index < sections.length - 1}
          />
        ))}
      </main>

      {/* Fixed add-section button at bottom of viewport */}
      <button
        onClick={addSection}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 group w-14 h-14 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
        title="Add scope section"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-white/20 group-hover:text-white/50 transition-colors duration-300"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
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
