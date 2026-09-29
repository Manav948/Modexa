"use client";

import { useEffect, useRef } from "react";

// ─── Mathematical Types & Structures ─────────────────────────────────────────

interface Point {
  x: number;
  y: number;
}

interface WaveConfig {
  ax1: number;
  fx1: number;
  p1: number;
  ax2: number;
  fx2: number;
  p2: number;
  ay1: number;
  fy1: number;
  p3: number;
  ay2: number;
  fy2: number;
  p4: number;
}

// ─── Spine Configurations ───────────────────────────────────────────────────
// Diagonal flow from bottom-left (-140, 920) across center (820, 620) to top-right (2120, 200)

const BASE_SPINE_1: Point[] = [
  { x: -160, y: 940 },
  { x: 320, y: 790 },
  { x: 820, y: 630 },
  { x: 1290, y: 470 },
  { x: 1710, y: 320 },
  { x: 2150, y: 210 },
];

// Layer 1 (Charcoal ambient aura) widths
const L1_TOP_WIDTHS = [240, 310, 390, 320, 240, 160];
const L1_BOT_WIDTHS = [210, 270, 350, 280, 210, 140];

// Layer 2 (Main luminous silk/smoke form) widths
const L2_TOP_WIDTHS = [160, 220, 290, 230, 150, 90];
const L2_BOT_WIDTHS = [140, 190, 260, 200, 130, 80];

// Layer 3 (Secondary counter-flow veil) widths
const L3_TOP_WIDTHS = [110, 150, 190, 160, 110, 70];
const L3_BOT_WIDTHS = [90, 130, 170, 140, 90, 60];

// Incommensurate wave harmonic parameters for Layer 1 (ambient body: slow, grand drift)
const L1_WAVES: WaveConfig[] = [
  { ax1: 25, fx1: 0.024, p1: 0.4, ax2: 15, fx2: 0.015, p2: 1.1, ay1: 30, fy1: 0.022, p3: 0.6, ay2: 18, fy2: 0.017, p4: 2.3 },
  { ax1: 35, fx1: 0.021, p1: 1.6, ax2: 20, fx2: 0.018, p2: 2.5, ay1: 42, fy1: 0.025, p3: 1.8, ay2: 22, fy2: 0.014, p4: 0.7 },
  { ax1: 45, fx1: 0.019, p1: 2.7, ax2: 24, fx2: 0.022, p2: 0.3, ay1: 48, fy1: 0.020, p3: 2.5, ay2: 26, fy2: 0.019, p4: 1.9 },
  { ax1: 38, fx1: 0.023, p1: 0.8, ax2: 18, fx2: 0.016, p2: 3.2, ay1: 44, fy1: 0.021, p3: 0.4, ay2: 20, fy2: 0.023, p4: 2.7 },
  { ax1: 30, fx1: 0.018, p1: 2.1, ax2: 16, fx2: 0.013, p2: 1.7, ay1: 36, fy1: 0.019, p3: 3.1, ay2: 18, fy2: 0.016, p4: 1.2 },
  { ax1: 22, fx1: 0.026, p1: 1.2, ax2: 12, fx2: 0.019, p2: 0.5, ay1: 28, fy1: 0.024, p3: 1.5, ay2: 14, fy2: 0.015, p4: 2.4 },
];

// Incommensurate wave harmonic parameters for Layer 2 (main luminous silk: fluid, morphing)
const L2_WAVES: WaveConfig[] = [
  { ax1: 32, fx1: 0.048, p1: 0.3, ax2: 18, fx2: 0.027, p2: 1.2, ay1: 38, fy1: 0.044, p3: 0.8, ay2: 20, fy2: 0.031, p4: 2.1 },
  { ax1: 44, fx1: 0.042, p1: 1.5, ax2: 24, fx2: 0.033, p2: 2.7, ay1: 50, fy1: 0.047, p3: 1.9, ay2: 26, fy2: 0.025, p4: 0.5 },
  { ax1: 54, fx1: 0.035, p1: 2.8, ax2: 28, fx2: 0.039, p2: 0.4, ay1: 58, fy1: 0.041, p3: 2.4, ay2: 30, fy2: 0.036, p4: 1.7 },
  { ax1: 48, fx1: 0.045, p1: 0.9, ax2: 22, fx2: 0.029, p2: 3.1, ay1: 52, fy1: 0.039, p3: 0.3, ay2: 24, fy2: 0.042, p4: 2.8 },
  { ax1: 40, fx1: 0.038, p1: 2.2, ax2: 20, fx2: 0.024, p2: 1.8, ay1: 44, fy1: 0.036, p3: 3.0, ay2: 22, fy2: 0.032, p4: 1.1 },
  { ax1: 30, fx1: 0.051, p1: 1.1, ax2: 15, fx2: 0.035, p2: 0.6, ay1: 34, fy1: 0.043, p3: 1.4, ay2: 18, fy2: 0.027, p4: 2.5 },
];

// Incommensurate wave harmonic parameters for Layer 3 (secondary stream: faster cadence)
const L3_WAVES: WaveConfig[] = [
  { ax1: 28, fx1: 0.062, p1: 0.7, ax2: 16, fx2: 0.038, p2: 1.9, ay1: 34, fy1: 0.058, p3: 1.2, ay2: 18, fy2: 0.041, p4: 0.4 },
  { ax1: 38, fx1: 0.055, p1: 2.1, ax2: 20, fx2: 0.042, p2: 0.8, ay1: 42, fy1: 0.061, p3: 2.6, ay2: 22, fy2: 0.035, p4: 1.8 },
  { ax1: 46, fx1: 0.049, p1: 1.4, ax2: 24, fx2: 0.048, p2: 2.9, ay1: 48, fy1: 0.054, p3: 0.5, ay2: 24, fy2: 0.044, p4: 2.6 },
  { ax1: 40, fx1: 0.058, p1: 3.0, ax2: 20, fx2: 0.036, p2: 1.4, ay1: 44, fy1: 0.051, p3: 1.7, ay2: 20, fy2: 0.049, p4: 0.9 },
  { ax1: 32, fx1: 0.051, p1: 0.5, ax2: 18, fx2: 0.031, p2: 2.6, ay1: 38, fy1: 0.047, p3: 2.8, ay2: 18, fy2: 0.039, p4: 2.0 },
  { ax1: 24, fx1: 0.065, p1: 1.9, ax2: 14, fx2: 0.044, p2: 0.2, ay1: 30, fy1: 0.056, p3: 0.9, ay2: 16, fy2: 0.037, p4: 1.3 },
];

// Cursor influence weights along the spine (center points flex most, ends stay anchored)
const CURSOR_WEIGHTS = [0.12, 0.45, 1.0, 0.88, 0.52, 0.16];

// ─── Mathematical Helper: Catmull-Rom Ribbon Path Builder ───────────────────

function buildRibbonPath(points: Point[], topWidths: number[], botWidths: number[]): { ribbon: string; filament: string } {
  const n = points.length;
  const topPts: Point[] = [];
  const botPts: Point[] = [];
  const tangents: { tx: number; ty: number }[] = [];

  for (let i = 0; i < n; i++) {
    let tx: number, ty: number;
    if (i === 0) {
      tx = points[1].x - points[0].x;
      ty = points[1].y - points[0].y;
    } else if (i === n - 1) {
      tx = points[n - 1].x - points[n - 2].x;
      ty = points[n - 1].y - points[n - 2].y;
    } else {
      tx = points[i + 1].x - points[i - 1].x;
      ty = points[i + 1].y - points[i - 1].y;
    }
    const len = Math.hypot(tx, ty) || 1;
    const nx = -ty / len;
    const ny = tx / len;
    tangents.push({ tx: tx / len, ty: ty / len });
    topPts.push({ x: points[i].x + nx * topWidths[i], y: points[i].y + ny * topWidths[i] });
    botPts.push({ x: points[i].x - nx * botWidths[i], y: points[i].y - ny * botWidths[i] });
  }

  function curveThrough(pts: Point[]): string {
    let d = "";
    const m = pts.length;
    for (let j = 0; j < m - 1; j++) {
      const p0 = pts[Math.max(0, j - 1)];
      const p1 = pts[j];
      const p2 = pts[j + 1];
      const p3 = pts[Math.min(m - 1, j + 2)];
      const cp1x = p1.x + (p2.x - p0.x) / 5.5;
      const cp1y = p1.y + (p2.y - p0.y) / 5.5;
      const cp2x = p2.x - (p3.x - p1.x) / 5.5;
      const cp2y = p2.y - (p3.y - p1.y) / 5.5;
      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  }

  // Top forward contour
  let ribbon = `M ${topPts[0].x.toFixed(1)} ${topPts[0].y.toFixed(1)}`;
  const topCurve = curveThrough(topPts);
  ribbon += topCurve;

  // Razor filament path along top edge
  const filament = `M ${topPts[0].x.toFixed(1)} ${topPts[0].y.toFixed(1)}` + topCurve;

  // End cap to bottom contour
  const endTan = tangents[n - 1];
  const capDist = Math.hypot(topPts[n - 1].x - botPts[n - 1].x, topPts[n - 1].y - botPts[n - 1].y) * 0.45;
  const c1x = topPts[n - 1].x + endTan.tx * capDist;
  const c1y = topPts[n - 1].y + endTan.ty * capDist;
  const c2x = botPts[n - 1].x + endTan.tx * capDist;
  const c2y = botPts[n - 1].y + endTan.ty * capDist;
  ribbon += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${botPts[n - 1].x.toFixed(1)} ${botPts[n - 1].y.toFixed(1)}`;

  // Bottom return contour
  const revBot = [...botPts].reverse();
  ribbon += curveThrough(revBot);

  // Start cap to close contour
  const startTan = tangents[0];
  const startDist = Math.hypot(topPts[0].x - botPts[0].x, topPts[0].y - botPts[0].y) * 0.45;
  const sc1x = botPts[0].x - startTan.tx * startDist;
  const sc1y = botPts[0].y - startTan.ty * startDist;
  const sc2x = topPts[0].x - startTan.tx * startDist;
  const sc2y = topPts[0].y - startTan.ty * startDist;
  ribbon += ` C ${sc1x.toFixed(1)} ${sc1y.toFixed(1)}, ${sc2x.toFixed(1)} ${sc2y.toFixed(1)}, ${topPts[0].x.toFixed(1)} ${topPts[0].y.toFixed(1)} Z`;

  return { ribbon, filament };
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function AtmosphericBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathL1Ref = useRef<SVGPathElement>(null);
  const pathL2Ref = useRef<SVGPathElement>(null);
  const pathL3Ref = useRef<SVGPathElement>(null);
  const pathFilamentRef = useRef<SVGPathElement>(null);
  const groupL2Ref = useRef<SVGGElement>(null);

  // High-performance pointer tracking refs (strictly outside React state)
  const cursorTargetRef = useRef<Point>({ x: 0, y: 0 });
  const cursorCurrentRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced-motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Check mobile / touch environment
    const isMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 768 || window.matchMedia("(hover: none) and (pointer: coarse)").matches);

    // Initial render at t = 0 for pristine baseline composition
    const renderFrame = (t: number) => {
      const curX = cursorCurrentRef.current.x;
      const curY = cursorCurrentRef.current.y;

      // ── Layer 1: Ambient Charcoal Field ──────────────────────────────────
      const ptsL1: Point[] = BASE_SPINE_1.map((base, i) => {
        const w = L1_WAVES[i];
        const dx = w.ax1 * Math.sin(w.fx1 * t + w.p1) + w.ax2 * Math.cos(w.fx2 * t + w.p2);
        const dy = w.ay1 * Math.cos(w.fy1 * t + w.p3) + w.ay2 * Math.sin(w.fy2 * t + w.p4);
        const cw = CURSOR_WEIGHTS[i] * 0.45;
        return {
          x: base.x + dx + curX * cw,
          y: base.y + dy + curY * cw,
        };
      });

      // Modulate widths for organic breathing
      const tw1 = L1_TOP_WIDTHS.map((w, i) => w * (1 + 0.16 * Math.sin(t * 0.026 + i * 0.7)));
      const bw1 = L1_BOT_WIDTHS.map((w, i) => w * (1 + 0.14 * Math.cos(t * 0.022 + i * 0.5)));
      const { ribbon: dL1 } = buildRibbonPath(ptsL1, tw1, bw1);
      if (pathL1Ref.current) pathL1Ref.current.setAttribute("d", dL1);

      // ── Layer 2: Main Luminous Silk / Smoke Form ─────────────────────────
      const ptsL2: Point[] = BASE_SPINE_1.map((base, i) => {
        const w = L2_WAVES[i];
        const dx = w.ax1 * Math.sin(w.fx1 * t + w.p1) + w.ax2 * Math.cos(w.fx2 * t + w.p2);
        const dy = w.ay1 * Math.cos(w.fy1 * t + w.p3) + w.ay2 * Math.sin(w.fy2 * t + w.p4);
        const cw = CURSOR_WEIGHTS[i];
        return {
          x: base.x + dx + curX * cw,
          y: base.y + dy + curY * cw,
        };
      });

      const tw2 = L2_TOP_WIDTHS.map((w, i) => w * (1 + 0.22 * Math.sin(t * 0.041 + i * 0.9)));
      const bw2 = L2_BOT_WIDTHS.map((w, i) => w * (1 + 0.20 * Math.cos(t * 0.037 + i * 0.8)));
      const { ribbon: dL2, filament: dFilament } = buildRibbonPath(ptsL2, tw2, bw2);
      if (pathL2Ref.current) pathL2Ref.current.setAttribute("d", dL2);
      if (pathFilamentRef.current && !isMobile) pathFilamentRef.current.setAttribute("d", dFilament);

      // Subtle light evolution for Layer 2: breathes gracefully between 0.38 and 0.56
      if (groupL2Ref.current) {
        const lightEvolution = 0.47 + 0.065 * Math.sin(t * 0.24) + 0.025 * Math.cos(t * 0.16);
        groupL2Ref.current.style.opacity = lightEvolution.toFixed(3);
      }

      // ── Layer 3: Secondary Counter-Flow Stream (Desktop only) ─────────────
      if (!isMobile && pathL3Ref.current) {
        const ptsL3: Point[] = BASE_SPINE_1.map((base, i) => {
          const w = L3_WAVES[i];
          const dx = w.ax1 * Math.sin(w.fx1 * t + w.p1) + w.ax2 * Math.cos(w.fx2 * t + w.p2);
          // Shifted slightly upward to weave behind the main ridge
          const dy = w.ay1 * Math.cos(w.fy1 * t + w.p3) + w.ay2 * Math.sin(w.fy2 * t + w.p4) - 55;
          const cw = CURSOR_WEIGHTS[i] * 0.7;
          return {
            x: base.x + dx + curX * cw,
            y: base.y + dy + curY * cw,
          };
        });

        const tw3 = L3_TOP_WIDTHS.map((w, i) => w * (1 + 0.24 * Math.sin(t * 0.052 + i * 1.1)));
        const bw3 = L3_BOT_WIDTHS.map((w, i) => w * (1 + 0.22 * Math.cos(t * 0.048 + i * 1.0)));
        const { ribbon: dL3 } = buildRibbonPath(ptsL3, tw3, bw3);
        pathL3Ref.current.setAttribute("d", dL3);
      }
    };

    // Render resting state immediately
    renderFrame(0);

    if (prefersReducedMotion) return;

    // ── Pointer Interaction ───────────────────────────────────────────────
    let hasPointerMoved = false;

    const handlePointerMove = (e: PointerEvent) => {
      hasPointerMoved = true;
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      // Damped subtle reaction: X ±18px, Y ±12px
      cursorTargetRef.current.x = cx * 18;
      cursorTargetRef.current.y = cy * 12;
    };

    const handlePointerLeave = () => {
      cursorTargetRef.current.x = 0;
      cursorTargetRef.current.y = 0;
    };

    if (!isMobile) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    }

    // ── Continuous Morph Animation Loop with Intersection Pause ───────────
    let rafId: number;
    let isVisible = true;
    const startTime = performance.now();

    const loop = (now: number) => {
      if (isVisible) {
        const t = (now - startTime) * 0.001;

        // Smooth cursor inertia
        if (hasPointerMoved) {
          cursorCurrentRef.current.x += (cursorTargetRef.current.x - cursorCurrentRef.current.x) * 0.045;
          cursorCurrentRef.current.y += (cursorTargetRef.current.y - cursorCurrentRef.current.y) * 0.045;
        }

        renderFrame(t);
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    // ── IntersectionObserver: pause rendering when scrolled out of view ───
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    observer.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      if (!isMobile) {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerleave", handlePointerLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#050505]"
    >
      <svg
        className="h-full w-full pointer-events-none select-none"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          {/* Layer 1: Ambient Charcoal Field Gradient */}
          <linearGradient id="charcoal-flow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#050505" stopOpacity="0" />
            <stop offset="22%" stopColor="#15181c" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#22262d" stopOpacity="0.72" />
            <stop offset="78%" stopColor="#181a1f" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#050505" stopOpacity="0" />
          </linearGradient>

          {/* Layer 2: Main Flowing Silk / Smoke Form Gradient */}
          <linearGradient id="silk-flow" x1="12%" y1="88%" x2="88%" y2="12%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="18%" stopColor="#5d636e" stopOpacity="0.28" />
            <stop offset="42%" stopColor="#c5cbd4" stopOpacity="0.65" />
            <stop offset="58%" stopColor="#eef1f5" stopOpacity="0.82" />
            <stop offset="74%" stopColor="#878e99" stopOpacity="0.45" />
            <stop offset="88%" stopColor="#373c44" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#050505" stopOpacity="0" />
          </linearGradient>

          {/* Layer 3: Secondary Counter-Flow Stream Gradient */}
          <linearGradient id="vapor-flow" x1="5%" y1="95%" x2="95%" y2="15%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="26%" stopColor="#4f545e" stopOpacity="0.24" />
            <stop offset="52%" stopColor="#9da4af" stopOpacity="0.52" />
            <stop offset="78%" stopColor="#636974" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#050505" stopOpacity="0" />
          </linearGradient>

          {/* Filament Razor Edge Gradient */}
          <linearGradient id="filament-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="58%" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="82%" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Static Pre-compiled GPU Blur Filters */}
          <filter id="blur-deep" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="46" />
          </filter>
          <filter id="blur-luminous" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
          <filter id="blur-vapor" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter id="blur-filament" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
        </defs>

        {/* ── LAYER 1: Deep Charcoal Ambient Smoke Aura (Volumetric depth) ── */}
        <path
          ref={pathL1Ref}
          fill="url(#charcoal-flow)"
          filter="url(#blur-deep)"
          opacity="0.82"
        />

        {/* ── LAYER 3: Secondary Counter-Flow Stream (Mid depth) ───────────── */}
        <path
          ref={pathL3Ref}
          fill="url(#vapor-flow)"
          filter="url(#blur-vapor)"
          opacity="0.45"
          className="hidden md:block"
        />

        {/* ── LAYER 2: Main Flowing Silk / Smoke Artwork (Core visual) ─────── */}
        <g ref={groupL2Ref} style={{ opacity: 0.52 }}>
          <path
            ref={pathL2Ref}
            fill="url(#silk-flow)"
            filter="url(#blur-luminous)"
          />
          {/* Delicate hair-line luminescence crest along the silk fold */}
          <path
            ref={pathFilamentRef}
            stroke="url(#filament-grad)"
            strokeWidth="2.2"
            fill="none"
            filter="url(#blur-filament)"
            opacity="0.38"
            className="hidden md:block"
          />
        </g>
      </svg>

      {/* Cinematic Radial Vignette: keeps edges 100% black (#050505) and frames typography */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,transparent_20%,rgba(5,5,5,0.48)_62%,#050505_96%)] pointer-events-none" />
    </div>
  );
}
