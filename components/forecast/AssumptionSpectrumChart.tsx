import React, { useCallback, useRef } from 'react';

interface AssumptionRow {
  id: string;
  label: string;
  leftLabel: string;
  rightLabel: string;
  likelihood: number;
}

interface AssumptionSpectrumChartProps {
  assumptions: AssumptionRow[];
  onAssumptionsChange: (assumptions: AssumptionRow[]) => void;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const parseNumericLabel = (label: string) => {
  const match = label.trim().match(/^([^0-9+-]*)([-+]?\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, numericPart, suffix] = match;
  const normalized = numericPart.replace(/,/g, '');
  const value = parseFloat(normalized);
  if (!Number.isFinite(value)) return null;
  const decimals = (normalized.split('.')[1] || '').length;
  return { prefix, suffix, value, decimals };
};

const formatMarkerLabel = (rightLabel: string, likelihood: number) => {
  const parsed = parseNumericLabel(rightLabel);
  if (!parsed) {
    return `${Math.round(likelihood * 100)}%`;
  }

  const scaled = parsed.value * likelihood;
  const numberText = parsed.decimals > 0
    ? scaled.toFixed(parsed.decimals)
    : Math.round(scaled).toString();

  return `${parsed.prefix}${numberText}${parsed.suffix}`;
};

const markerLabelOpacity = (likelihood: number) => {
  const edgeDistance = Math.min(likelihood, 1 - likelihood);
  return clamp((edgeDistance - 0.06) / 0.18, 0, 1);
};

const LABEL_FONT = 'Avenir, Avenir Next, sans-serif';

const AssumptionSpectrumChart: React.FC<AssumptionSpectrumChartProps> = ({ assumptions, onAssumptionsChange }) => {
  const trackRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const draggingId = useRef<string | null>(null);

  const updateRow = useCallback((id: string, patch: Partial<AssumptionRow>) => {
    onAssumptionsChange(
      assumptions.map((row) => (row.id === id ? { ...row, ...patch } : row))
    );
  }, [assumptions, onAssumptionsChange]);

  const setLikelihoodByClientX = useCallback((id: string, clientX: number) => {
    const track = trackRefs.current[id];
    if (!track) return;
    const rect = track.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
    updateRow(id, { likelihood: ratio });
  }, [updateRow]);

  const handlePointerDown = useCallback((id: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    draggingId.current = id;
    setLikelihoodByClientX(id, e.clientX);
  }, [setLikelihoodByClientX]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingId.current) return;
    setLikelihoodByClientX(draggingId.current, e.clientX);
  }, [setLikelihoodByClientX]);

  const handlePointerUp = useCallback(() => {
    draggingId.current = null;
  }, []);

  return (
    <div
      className="w-full max-h-[26rem] overflow-y-auto"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="w-full max-w-[700px] mx-auto pr-2">
        <div className="space-y-7 py-2">
          {assumptions.map((row) => {
            const markerText = formatMarkerLabel(row.rightLabel, row.likelihood);
            const markerOpacity = markerLabelOpacity(row.likelihood);

            return (
              <div key={row.id} className="grid grid-cols-1 md:grid-cols-[minmax(9rem,1fr)_minmax(16rem,2.4fr)] gap-3 md:gap-8 items-center">
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    const next = (e.currentTarget.textContent || '').trim();
                    if (!next || next === row.label) return;
                    updateRow(row.id, { label: next });
                  }}
                  className="text-[11px] text-white/80 focus:outline-none"
                  style={{ caretColor: '#D4AF37', fontFamily: LABEL_FONT }}
                >
                  {row.label}
                </div>

                <div className="space-y-2">
                  <div className="relative flex items-center justify-between text-[11px] text-white/50" style={{ fontFamily: LABEL_FONT }}>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = (e.currentTarget.textContent || '').trim();
                        if (!next || next === row.leftLabel) return;
                        updateRow(row.id, { leftLabel: next });
                      }}
                      className="focus:outline-none"
                      style={{ caretColor: '#D4AF37', fontFamily: LABEL_FONT }}
                    >
                      {row.leftLabel}
                    </span>
                    <span
                      className="absolute top-0 -translate-x-1/2 text-[11px] text-white/45 whitespace-nowrap pointer-events-none transition-opacity duration-200"
                      style={{ left: `${row.likelihood * 100}%`, opacity: markerOpacity, fontFamily: LABEL_FONT }}
                    >
                      {markerText}
                    </span>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const next = (e.currentTarget.textContent || '').trim();
                        if (!next || next === row.rightLabel) return;
                        updateRow(row.id, { rightLabel: next });
                      }}
                      className="focus:outline-none text-right"
                      style={{ caretColor: '#D4AF37', fontFamily: LABEL_FONT }}
                    >
                      {row.rightLabel}
                    </span>
                  </div>

                  <div
                    ref={(el) => {
                      trackRefs.current[row.id] = el;
                    }}
                    className="relative h-8"
                    onPointerDown={handlePointerDown(row.id)}
                  >
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/25" />
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-white/10 via-white/50 to-white/10" />
                    <button
                      type="button"
                      aria-label={`Adjust ${row.label} likelihood`}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-[#D4AF37]/80 bg-[#1a1a1a] shadow-[0_0_0_3px_rgba(212,175,55,0.12)]"
                      style={{ left: `${row.likelihood * 100}%` }}
                      onPointerDown={handlePointerDown(row.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AssumptionSpectrumChart;
