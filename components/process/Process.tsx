"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const PRINCIPLES = [
  {
    label: "[I. CONCEPTION & REDUCTION]",
    title: "Elimination of the Superfluous",
    body: "We isolate the central tension within your product or brand. Every unnecessary garnish, artificial gradient, and decorative trend is excised until only pure tectonic structure remains.",
    phase: "PHASE: EXTRACTION",
    metric: "RESTRICTION 85%",
  },
  {
    label: "[II. TACTILE ENGINEERING]",
    title: "Materials in Digital Space",
    body: "Software does not need to feel floaty and weightless. By introducing true mechanical inertia, viscoelastic springs, and ink-settling physics, interfaces gain gravitational authority.",
    phase: "PHASE: SYNTHESIS",
    metric: "ACCELERATION CURVE",
  },
  {
    label: "[III. DIRECTION & SCALE]",
    title: "One Cohesive Narrative",
    body: "A single, resolute creative direction ensures your film trailer, high-frequency design system, editorial literature, and web platform speak with the exact same distinctive voice.",
    phase: "PHASE: DELIVERY",
    metric: "ZERO COMPROMISE",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let vw = (canvas.width = canvas.offsetWidth || 1200);
    let vh = (canvas.height = canvas.offsetHeight || 500);

    const handleResize = () => {
      vw = canvas.width = canvas.offsetWidth || 1200;
      vh = canvas.height = canvas.offsetHeight || 500;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const spacing = 48;
    const gridPoints: { originX: number; originY: number; x: number; y: number; vx: number; vy: number }[] = [];

    for (let x = 0; x < 1600; x += spacing) {
      for (let y = 0; y < 900; y += spacing) {
        gridPoints.push({ originX: x, originY: y, x, y, vx: 0, vy: 0 });
      }
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.parentElement?.addEventListener("mousemove", handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, vw, vh);
      ctx.strokeStyle = "#C4C7C7";
      ctx.lineWidth = 0.6;

      gridPoints.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const angle = Math.atan2(dy, dx);
          const push = (1 - dist / 120) * 14;
          p.vx -= Math.cos(angle) * push;
          p.vy -= Math.sin(angle) * push;
        }

        p.vx += (p.originX - p.x) * 0.1;
        p.vy += (p.originY - p.y) * 0.1;
        p.vx *= 0.8;
        p.vy *= 0.8;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x >= 0 && p.x <= vw && p.y >= 0 && p.y <= vh) {
          ctx.beginPath();
          ctx.moveTo(p.x - 3, p.y);
          ctx.lineTo(p.x + 3, p.y);
          ctx.moveTo(p.x, p.y - 3);
          ctx.lineTo(p.x, p.y + 3);
          ctx.stroke();
        }
      });

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      canvas.parentElement?.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative w-full py-24 border-y overflow-hidden"
      style={{ backgroundColor: "#ffffff", borderColor: "#e4e2dd" }}
    >
      {/* Interactive canvas backdrop */}
      <canvas
        ref={canvasRef}
        id="vellum-grid-canvas"
        className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair opacity-75"
        style={{ opacity: 0.6 }}
      />

      <div className="relative z-10 px-5 md:px-8 lg:px-12 pointer-events-none">
        {/* Section header */}
        <div
          className="flex items-center justify-between pb-8 border-b mb-16"
          style={{ borderColor: "#e4e2dd" }}
        >
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[10px] text-[#b6240f] font-bold"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              04 / DOCTRINE
            </span>
            <span
              className="font-mono text-[10px] text-[#747878] uppercase tracking-wider"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              VELLUM DISPLACEMENT GRID
            </span>
          </div>
          <div
            className="font-mono text-[10px] text-[#747878] uppercase tracking-widest hidden sm:block"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            TOUCH / DISPLACE CANVAS
          </div>
        </div>

        {/* 3-column principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pointer-events-auto p-8 border shadow-sm"
              style={{
                backgroundColor: "rgba(251,249,243,0.93)",
                borderColor: "#e4e2dd",
              }}
            >
              <div
                className="font-mono text-[10px] text-[#b6240f] font-bold mb-4"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {p.label}
              </div>
              <h3
                className="text-[#1b1c18] mb-4"
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: "1.5rem",
                  lineHeight: "2rem",
                  letterSpacing: "-0.01em",
                  fontWeight: 500,
                }}
              >
                {p.title}
              </h3>
              <p
                className="leading-relaxed mb-6"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: "0.8125rem",
                  lineHeight: "1.375rem",
                  color: "#747878",
                }}
              >
                {p.body}
              </p>
              <div
                className="flex items-center justify-between pt-4 border-t font-mono text-[10px] text-[#747878] uppercase"
                style={{ borderColor: "#e4e2dd", fontFamily: "'Space Mono', monospace" }}
              >
                <span>{p.phase}</span>
                <span>{p.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
