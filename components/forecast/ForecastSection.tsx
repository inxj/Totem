import React, { useRef, useCallback } from 'react';
import PertDistribution from './PertDistribution';

export interface SectionData {
  id: string;
  title: string;
  description: string;
  pertParams: {
    min: number;
    mode: number;
    max: number;
    lambda: number;
    axisMin: number;
    axisMax: number;
  };
}

interface ForecastSectionProps {
  section: SectionData;
  isFixed: boolean;
  onTitleChange: (id: string, title: string) => void;
  onDescriptionChange: (id: string, description: string) => void;
  onPertParamsChange: (id: string, params: SectionData['pertParams']) => void;
  onDescriptionBlur: (id: string, description: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

const DRAG_THRESHOLD = 50;

const GripIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-white/20 group-hover/grip:text-white/50 transition-colors">
    <circle cx="5" cy="3" r="1.5" />
    <circle cx="11" cy="3" r="1.5" />
    <circle cx="5" cy="8" r="1.5" />
    <circle cx="11" cy="8" r="1.5" />
    <circle cx="5" cy="13" r="1.5" />
    <circle cx="11" cy="13" r="1.5" />
  </svg>
);

const ForecastSection: React.FC<ForecastSectionProps> = ({
  section,
  isFixed,
  onTitleChange,
  onDescriptionChange,
  onPertParamsChange,
  onDescriptionBlur,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}) => {
  const descRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pointerStartY = useRef<number | null>(null);
  const hasFired = useRef(false);

  const handleDescBlur = useCallback(() => {
    const text = descRef.current?.textContent || '';
    onDescriptionBlur(section.id, text);
  }, [section.id, onDescriptionBlur]);

  const handleDescInput = useCallback(() => {
    const text = descRef.current?.textContent || '';
    onDescriptionChange(section.id, text);
  }, [section.id, onDescriptionChange]);

  const handleTitleBlur = useCallback(() => {
    const text = titleRef.current?.textContent || '';
    onTitleChange(section.id, text);
  }, [section.id, onTitleChange]);

  // --- Pointer-based vertical gesture for reordering ---
  const handleGripPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    pointerStartY.current = e.clientY;
    hasFired.current = false;
  }, []);

  const handleGripPointerMove = useCallback((e: React.PointerEvent) => {
    if (pointerStartY.current === null || hasFired.current) return;
    const dy = e.clientY - pointerStartY.current;
    if (Math.abs(dy) >= DRAG_THRESHOLD) {
      hasFired.current = true;
      if (dy < 0 && canMoveUp) {
        onMoveUp(section.id);
      } else if (dy > 0 && canMoveDown) {
        onMoveDown(section.id);
      }
      pointerStartY.current = null;
    }
  }, [section.id, canMoveUp, canMoveDown, onMoveUp, onMoveDown]);

  const handleGripPointerUp = useCallback(() => {
    pointerStartY.current = null;
    hasFired.current = false;
  }, []);

  return (
    <section className="snap-section flex items-center px-8 md:px-16 lg:px-24">
      <div className="w-full max-w-[110rem] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start lg:items-center h-full py-8">
        {/* Left: Title + description */}
        <div className="lg:w-[38%] flex-shrink-0 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            {!isFixed && (
              <div
                className="group/grip cursor-grab active:cursor-grabbing flex-shrink-0 p-1 -ml-2 touch-none select-none"
                title="Drag up or down to reorder"
                onPointerDown={handleGripPointerDown}
                onPointerMove={handleGripPointerMove}
                onPointerUp={handleGripPointerUp}
                onPointerCancel={handleGripPointerUp}
              >
                <GripIcon />
              </div>
            )}
            {isFixed ? (
              <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-white/90">
                {section.title}
              </h1>
            ) : (
              <h2
                ref={titleRef}
                contentEditable
                suppressContentEditableWarning
                onBlur={handleTitleBlur}
                className="text-3xl md:text-4xl font-serif tracking-tight text-white/90 focus:outline-none focus:text-white transition-colors cursor-text selection:bg-[#D4AF37]/30"
                style={{ caretColor: '#D4AF37' }}
              >
                {section.title}
              </h2>
            )}
          </div>
          <div
            ref={descRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleDescInput}
            onBlur={handleDescBlur}
            className="leading-relaxed text-white/60 whitespace-pre-line focus:outline-none focus:text-white/80 transition-colors cursor-text selection:bg-[#D4AF37]/30"
            style={{ caretColor: '#D4AF37', fontFamily: 'Avenir, sans-serif', fontSize: '0.9rem' }}
          >
            {section.description}
          </div>
        </div>

        {/* Right: PERT chart */}
        <div className="lg:w-[62%] flex-grow flex items-center justify-center min-h-[400px]">
          <PertDistribution
            params={section.pertParams}
            onParamsChange={(p) => onPertParamsChange(section.id, p)}
          />
        </div>
      </div>
    </section>
  );
};

export default ForecastSection;
