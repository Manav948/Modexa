"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#7C8061", "#E7472E", "#55534E", "#E8E2D5", "#fe573c", "#30312D"];

export default function BubbleTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let bw = (canvas.width = canvas.offsetWidth || 1200);
    const bh = (canvas.height = 176);

    const handleResize = () => {
      bw = canvas.width = canvas.offsetWidth || 1200;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    const bubbles = Array.from({ length: 6 }, (_, i) => ({
      x: (bw / 7) * (i + 1),
      y: bh / 2 + (Math.random() - 0.5) * 40,
      radius: 20 + i * 4,
      color: COLORS[i % COLORS.length],
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    let mouse = { x: -500, y: -500 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = {
        x: (e.clientX - rect.left) * (bw / rect.width),
        y: (e.clientY - rect.top) * (bh / rect.height),
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, bw, bh);

      // Horizontal center hairline
      ctx.strokeStyle = "#E4E2DD";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, bh / 2);
      ctx.lineTo(bw, bh / 2);
      ctx.stroke();

      bubbles.forEach((b) => {
        const dx = mouse.x - b.x;
        const dy = mouse.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const force = (1 - dist / 100) * 3;
          b.vx -= (dx / dist) * force;
          b.vy -= (dy / dist) * force;
        }

        b.vx *= 0.94;
        b.vy *= 0.94;
        b.x += b.vx;
        b.y += b.vy;

        if (b.x - b.radius < 0 || b.x + b.radius > bw) b.vx *= -1;
        if (b.y - b.radius < 0 || b.y + b.radius > bh) b.vy *= -1;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.strokeStyle = "#151515";
        ctx.lineWidth = 1;
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
      className="relative w-full h-44 border-y overflow-hidden"
      style={{ backgroundColor: "#fbf9f3", borderColor: "#e4e2dd" }}
    >
      <canvas
        ref={canvasRef}
        id="bubble-transition-canvas"
        className="w-full h-full cursor-grab block"
      />
      <div
        className="absolute top-3 left-5 md:left-8 lg:left-12 pointer-events-none font-mono text-[9px] text-[#747878] uppercase tracking-widest"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        ATMOSPHERIC DRIFT • 6 VISCOUS PARTICLES
      </div>
    </section>
  );
}
