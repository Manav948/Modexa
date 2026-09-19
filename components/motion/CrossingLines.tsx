"use client";

import { useEffect, useRef } from "react";

export default function ThreadSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth || 1200);
    const h = (canvas.height = 144);

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth || 1200;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const numStrings = 6;
    const strings = Array.from({ length: numStrings }, (_, i) => ({
      baseY: (h / (numStrings + 1)) * (i + 1),
      offsetY: 0,
      vel: 0,
      isDirector: i === 2,
    }));

    let mouse = { x: -100, y: -100 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * (w / rect.width);
      mouse.y = (e.clientY - rect.top) * (h / rect.height);

      strings.forEach((str) => {
        const dy = mouse.y - str.baseY;
        if (Math.abs(dy) < 18) {
          str.vel = dy * 0.9;
        }
      });
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      strings.forEach((str) => {
        const force = -0.14 * str.offsetY;
        str.vel += force;
        str.vel *= 0.88;
        str.offsetY += str.vel;

        ctx.beginPath();
        ctx.moveTo(0, str.baseY);
        ctx.quadraticCurveTo(w / 2, str.baseY + str.offsetY, w, str.baseY);

        if (str.isDirector) {
          ctx.strokeStyle = "#E7472E";
          ctx.lineWidth = 1.75;
        } else {
          ctx.strokeStyle = "#55534E";
          ctx.lineWidth = 0.75;
        }
        ctx.stroke();
      });

      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      className="relative w-full py-12 border-y overflow-hidden"
      style={{ backgroundColor: "#f5f3ed", borderColor: "#e4e2dd" }}
    >
      <div className="max-w-[1400px] mx-auto w-full px-5 md:px-8 lg:px-12 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[10px] text-[#b6240f] font-bold"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            02 / CONTINUUM
          </span>
          <span
            className="font-mono text-[10px] text-[#747878] uppercase tracking-wider"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            HARMONIC TENSION GRID
          </span>
        </div>
        <span
          className="font-mono text-[10px] tracking-widest uppercase text-[#747878]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          IDEAS — SKILLS — SPECIALISTS
        </span>
      </div>

      <div className="relative w-full h-36 flex items-center" style={{ backgroundColor: "#ffffff" }}>
        <canvas
          ref={canvasRef}
          id="thread-canvas"
          className="w-full h-full cursor-pointer block"
        />
        <div
          className="absolute bottom-2 right-6 pointer-events-none font-mono text-[9px] text-[#b6240f] tracking-widest select-none uppercase"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          Vermilion Strand = Creative Direction Core
        </div>
      </div>
    </section>
  );
}
