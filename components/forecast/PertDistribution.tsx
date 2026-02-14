
import React, { useState, useCallback, useRef, useEffect } from 'react';

// --- PERT / Beta distribution math ---

function lnGamma(z: number): number {
  // Lanczos approximation
  const g = 7;
  const c = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  if (z < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
  }
  z -= 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) {
    x += c[i] / (z + i);
  }
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

function betaPdf(x: number, alpha: number, beta: number): number {
  if (x <= 0 || x >= 1) return 0;
  const lnB = lnGamma(alpha) + lnGamma(beta) - lnGamma(alpha + beta);
  return Math.exp((alpha - 1) * Math.log(x) + (beta - 1) * Math.log(1 - x) - lnB);
}

function pertPdf(x: number, min: number, mode: number, max: number, lambda: number): number {
  if (x <= min || x >= max) return 0;
  const range = max - min;
  const alpha = 1 + lambda * ((mode - min) / range);
  const beta = 1 + lambda * ((max - mode) / range);
  const t = (x - min) / range;
  return betaPdf(t, alpha, beta) / range;
}

function betaCdf(x: number, alpha: number, beta: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  // Numerical integration via Simpson's rule
  const n = 1000;
  const h = x / n;
  let sum = betaPdf(0, alpha, beta) + betaPdf(x, alpha, beta);
  for (let i = 1; i < n; i++) {
    const xi = i * h;
    sum += (i % 2 === 0 ? 2 : 4) * betaPdf(xi, alpha, beta);
  }
  return (h / 3) * sum;
}

function pertQuantile(p: number, min: number, mode: number, max: number, lambda: number): number {
  const range = max - min;
  const alpha = 1 + lambda * ((mode - min) / range);
  const beta_ = 1 + lambda * ((max - mode) / range);
  // Bisection on the Beta CDF to find the quantile
  let lo = 0, hi = 1;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (betaCdf(mid, alpha, beta_) < p) lo = mid;
    else hi = mid;
  }
  return min + ((lo + hi) / 2) * range;
}

// --- Formatting ---

function formatDollar(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  return `$${(value / 1000).toFixed(0)}k`;
}

// --- Constants ---

const SVG_WIDTH = 700;
const SVG_HEIGHT = 380;
const PADDING = { top: 40, right: 40, bottom: 60, left: 40 };
const CHART_W = SVG_WIDTH - PADDING.left - PADDING.right;
const CHART_H = SVG_HEIGHT - PADDING.top - PADDING.bottom;
const NUM_SAMPLES = 200;
const HANDLE_R = 7;
const GOLD = '#D4AF37';
const GOLD_DIM = 'rgba(212,175,55,0.15)';
const LAMBDA_MIN = 0.1;
const LAMBDA_MAX = 50;

interface PertParams {
  min: number;
  mode: number;
  max: number;
  lambda: number;
  axisMin: number;
  axisMax: number;
}

const PertDistribution: React.FC = () => {
  const [params, setParams] = useState<PertParams>({
    min: 600_000,
    mode: 800_000,
    max: 1_200_000,
    lambda: 4,
    axisMin: 500_000,
    axisMax: 1_300_000,
  });

  const [editingAxisMin, setEditingAxisMin] = useState(false);
  const [editingAxisMax, setEditingAxisMax] = useState(false);
  const [axisMinText, setAxisMinText] = useState('');
  const [axisMaxText, setAxisMaxText] = useState('');

  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef<'min' | 'max' | 'mode' | null>(null);
  const dragStartY = useRef<number>(0);
  const dragStartLambda = useRef<number>(0);

  // --- Coordinate transforms ---
  const xToSvg = useCallback((val: number) => {
    return PADDING.left + ((val - params.axisMin) / (params.axisMax - params.axisMin)) * CHART_W;
  }, [params.axisMin, params.axisMax]);

  const svgToX = useCallback((px: number) => {
    return params.axisMin + ((px - PADDING.left) / CHART_W) * (params.axisMax - params.axisMin);
  }, [params.axisMin, params.axisMax]);

  // --- Sample the PDF ---
  const samples: { x: number; y: number }[] = [];
  let maxY = 0;
  for (let i = 0; i <= NUM_SAMPLES; i++) {
    const x = params.axisMin + (i / NUM_SAMPLES) * (params.axisMax - params.axisMin);
    const y = pertPdf(x, params.min, params.mode, params.max, params.lambda);
    samples.push({ x, y });
    if (y > maxY) maxY = y;
  }
  // Add 10% headroom
  const yScale = maxY > 0 ? CHART_H / (maxY * 1.1) : 1;

  const yToSvg = (val: number) => PADDING.top + CHART_H - val * yScale;

  // Build path
  const pathD = samples
    .map((s, i) => {
      const sx = xToSvg(s.x);
      const sy = yToSvg(s.y);
      return `${i === 0 ? 'M' : 'L'}${sx},${sy}`;
    })
    .join(' ');

  // Filled area
  const areaD = pathD + ` L${xToSvg(params.axisMax)},${yToSvg(0)} L${xToSvg(params.axisMin)},${yToSvg(0)} Z`;

  // Handle positions
  const modeY = pertPdf(params.mode, params.min, params.mode, params.max, params.lambda);
  const handles = {
    min: { cx: xToSvg(params.min), cy: yToSvg(0) },
    max: { cx: xToSvg(params.max), cy: yToSvg(0) },
    mode: { cx: xToSvg(params.mode), cy: yToSvg(modeY) },
  };

  // --- Drag logic ---
  const getSvgPoint = useCallback((e: MouseEvent | React.MouseEvent): { x: number; y: number } => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const scaleX = SVG_WIDTH / rect.width;
    const scaleY = SVG_HEIGHT / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const onPointerDown = useCallback((handle: 'min' | 'max' | 'mode') => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    dragging.current = handle;
    const pt = getSvgPoint(e as unknown as MouseEvent);
    dragStartY.current = pt.y;
    dragStartLambda.current = params.lambda;
  }, [getSvgPoint, params.lambda]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const pt = getSvgPoint(e as unknown as MouseEvent);
    const val = svgToX(pt.x);

    setParams((prev) => {
      const next = { ...prev };
      const handle = dragging.current!;

      if (handle === 'min') {
        next.min = Math.max(prev.axisMin, Math.min(val, prev.mode - 10_000));
      } else if (handle === 'max') {
        next.max = Math.min(prev.axisMax, Math.max(val, prev.mode + 10_000));
      } else if (handle === 'mode') {
        // Horizontal: move mode
        next.mode = Math.max(prev.min + 10_000, Math.min(val, prev.max - 10_000));
        // Vertical: change lambda
        const dy = pt.y - dragStartY.current;
        const lambdaSensitivity = 0.15;
        const newLambda = dragStartLambda.current - dy * lambdaSensitivity;
        next.lambda = Math.max(LAMBDA_MIN, Math.min(LAMBDA_MAX, newLambda));
      }

      return next;
    });
  }, [getSvgPoint, svgToX]);

  const onPointerUp = useCallback(() => {
    dragging.current = null;
  }, []);

  // --- Axis ticks ---
  const tickCount = 6;
  const ticks: number[] = [];
  const tickStep = (params.axisMax - params.axisMin) / tickCount;
  for (let i = 0; i <= tickCount; i++) {
    ticks.push(params.axisMin + i * tickStep);
  }

  // --- Axis editing ---
  const commitAxisMin = () => {
    setEditingAxisMin(false);
    const parsed = parseFloat(axisMinText.replace(/[^0-9.]/g, ''));
    if (!isNaN(parsed)) {
      const val = parsed >= 1000 ? parsed : parsed * 1_000_000;
      setParams((p) => ({ ...p, axisMin: Math.min(val, p.min - 10_000) }));
    }
  };

  const commitAxisMax = () => {
    setEditingAxisMax(false);
    const parsed = parseFloat(axisMaxText.replace(/[^0-9.]/g, ''));
    if (!isNaN(parsed)) {
      const val = parsed >= 1000 ? parsed : parsed * 1_000_000;
      setParams((p) => ({ ...p, axisMax: Math.max(val, p.max + 10_000) }));
    }
  };

  // --- Computed stats ---
  const p20 = pertQuantile(0.2, params.min, params.mode, params.max, params.lambda);
  const p80 = pertQuantile(0.8, params.min, params.mode, params.max, params.lambda);

  return (
    <div className="w-full select-none">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="w-full h-auto"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Filled area */}
        <path d={areaD} fill={GOLD_DIM} />

        {/* Curve */}
        <path d={pathD} fill="none" stroke="#ffffff" strokeWidth={2} />

        {/* X axis line */}
        <line
          x1={PADDING.left}
          y1={yToSvg(0)}
          x2={PADDING.left + CHART_W}
          y2={yToSvg(0)}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={1}
        />

        {/* Tick marks and labels */}
        {ticks.map((t, i) => {
          const tx = xToSvg(t);
          // Skip first and last — they are editable labels
          if (i === 0 || i === ticks.length - 1) return null;
          return (
            <g key={i}>
              <line
                x1={tx}
                y1={yToSvg(0)}
                x2={tx}
                y2={yToSvg(0) + 6}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={1}
              />
              <text
                x={tx}
                y={yToSvg(0) + 22}
                textAnchor="middle"
                fill="rgba(255,255,255,0.35)"
                fontSize={11}
                fontFamily="Inter, sans-serif"
              >
                {formatDollar(t)}
              </text>
            </g>
          );
        })}

        {/* Editable axis min label */}
        {!editingAxisMin && (
          <text
            x={PADDING.left}
            y={yToSvg(0) + 22}
            textAnchor="start"
            fill="rgba(255,255,255,0.35)"
            fontSize={11}
            fontFamily="Inter, sans-serif"
            className="cursor-text"
            onClick={() => {
              setAxisMinText(formatDollar(params.axisMin));
              setEditingAxisMin(true);
            }}
          >
            {formatDollar(params.axisMin)}
          </text>
        )}

        {/* Editable axis max label */}
        {!editingAxisMax && (
          <text
            x={PADDING.left + CHART_W}
            y={yToSvg(0) + 22}
            textAnchor="end"
            fill="rgba(255,255,255,0.35)"
            fontSize={11}
            fontFamily="Inter, sans-serif"
            className="cursor-text"
            onClick={() => {
              setAxisMaxText(formatDollar(params.axisMax));
              setEditingAxisMax(true);
            }}
          >
            {formatDollar(params.axisMax)}
          </text>
        )}

        {/* Vertical dashed lines for min/mode/max */}
        {(['min', 'mode', 'max'] as const).map((key) => {
          const val = params[key];
          const sx = xToSvg(val);
          const topY = key === 'mode' ? handles.mode.cy : yToSvg(0) - 8;
          return (
            <line
              key={key}
              x1={sx}
              y1={topY}
              x2={sx}
              y2={yToSvg(0)}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1}
              strokeDasharray="3,3"
            />
          );
        })}

        <text
          x={handles.mode.cx}
          y={handles.mode.cy - 16}
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize={11}
          fontFamily="Inter, sans-serif"
          fontWeight={500}
        >
          {formatDollar(params.mode)}
        </text>
        <text
          x={handles.mode.cx}
          y={handles.mode.cy - 32}
          textAnchor="middle"
          fill="rgba(255,255,255,0.3)"
          fontSize={9}
          fontFamily="Inter, sans-serif"
        >
          λ={params.lambda.toFixed(1)}
        </text>

        {/* P20 indicator */}
        <line
          x1={xToSvg(p20)}
          y1={PADDING.top}
          x2={xToSvg(p20)}
          y2={yToSvg(0)}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
          strokeDasharray="6,4"
        />
        <text
          x={xToSvg(p20)}
          y={PADDING.top - 8}
          textAnchor="middle"
          fill="rgba(255,255,255,0.3)"
          fontSize={10}
          fontFamily="Inter, sans-serif"
        >
          P20: {formatDollar(p20)}
        </text>

        {/* P80 indicator */}
        <line
          x1={xToSvg(p80)}
          y1={PADDING.top}
          x2={xToSvg(p80)}
          y2={yToSvg(0)}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
          strokeDasharray="6,4"
        />
        <text
          x={xToSvg(p80)}
          y={PADDING.top - 8}
          textAnchor="middle"
          fill="rgba(255,255,255,0.3)"
          fontSize={10}
          fontFamily="Inter, sans-serif"
        >
          P80: {formatDollar(p80)}
        </text>

        {/* Drag handles */}
        {/* Min handle */}
        <circle
          cx={handles.min.cx}
          cy={handles.min.cy}
          r={HANDLE_R}
          fill="#1a1a1a"
          stroke={GOLD}
          strokeWidth={2}
          className="cursor-ew-resize"
          onPointerDown={onPointerDown('min')}
        />
        {/* Max handle */}
        <circle
          cx={handles.max.cx}
          cy={handles.max.cy}
          r={HANDLE_R}
          fill="#1a1a1a"
          stroke={GOLD}
          strokeWidth={2}
          className="cursor-ew-resize"
          onPointerDown={onPointerDown('max')}
        />
        {/* Mode handle (diamond shape) */}
        <g
          className="cursor-move"
          onPointerDown={onPointerDown('mode')}
        >
          <polygon
            points={`${handles.mode.cx},${handles.mode.cy - HANDLE_R - 2} ${handles.mode.cx + HANDLE_R + 2},${handles.mode.cy} ${handles.mode.cx},${handles.mode.cy + HANDLE_R + 2} ${handles.mode.cx - HANDLE_R - 2},${handles.mode.cy}`}
            fill={GOLD}
            stroke="#1a1a1a"
            strokeWidth={1.5}
          />
        </g>
      </svg>

      {/* Axis min/max inline editors (positioned over the SVG) */}
      {editingAxisMin && (
        <div className="relative" style={{ marginTop: -38 }}>
          <input
            autoFocus
            type="text"
            value={axisMinText}
            onChange={(e) => setAxisMinText(e.target.value)}
            onBlur={commitAxisMin}
            onKeyDown={(e) => e.key === 'Enter' && commitAxisMin()}
            className="absolute left-0 bg-transparent border-b border-white/20 text-white/60 text-xs font-body w-24 outline-none px-1 py-0.5"
            style={{ bottom: 0 }}
          />
        </div>
      )}
      {editingAxisMax && (
        <div className="relative" style={{ marginTop: -38 }}>
          <input
            autoFocus
            type="text"
            value={axisMaxText}
            onChange={(e) => setAxisMaxText(e.target.value)}
            onBlur={commitAxisMax}
            onKeyDown={(e) => e.key === 'Enter' && commitAxisMax()}
            className="absolute right-0 bg-transparent border-b border-white/20 text-white/60 text-xs font-body w-24 outline-none px-1 py-0.5 text-right"
            style={{ bottom: 0 }}
          />
        </div>
      )}
    </div>
  );
};

export default PertDistribution;
