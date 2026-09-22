"use client";

import { useEffect, useRef } from "react";

export default function AtmosphericBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with easing
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // Organic cloud / fluid wave particles
    const blobs = [
      { x: width * 0.25, y: height * 0.35, r: Math.min(width, height) * 0.45, vx: 0.12, vy: 0.08, phase: 0, speed: 0.0007, baseAlpha: 0.07 },
      { x: width * 0.75, y: height * 0.65, r: Math.min(width, height) * 0.55, vx: -0.1, vy: -0.06, phase: Math.PI / 2, speed: 0.0005, baseAlpha: 0.05 },
      { x: width * 0.5, y: height * 0.5, r: Math.min(width, height) * 0.38, vx: 0.08, vy: -0.09, phase: Math.PI, speed: 0.0009, baseAlpha: 0.06 },
      { x: width * 0.85, y: height * 0.25, r: Math.min(width, height) * 0.35, vx: -0.07, vy: 0.11, phase: Math.PI * 1.5, speed: 0.0006, baseAlpha: 0.04 },
    ];

    let t = 0;
    const render = () => {
      t += 1;
      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      const mouseNormX = (mouse.x / width - 0.5) * 40;
      const mouseNormY = (mouse.y / height - 0.5) * 40;

      ctx.clearRect(0, 0, width, height);

      // Deep cinematic base
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, width, height);

      // Render each moving organic atmospheric bloom
      blobs.forEach((b, i) => {
        const oscillation = Math.sin(t * b.speed + b.phase);
        const oscillation2 = Math.cos(t * b.speed * 0.8 + b.phase);

        // Slow multi-layer parallax offset
        const layerDepth = (i + 1) * 0.3;
        const currentX = b.x + oscillation * 80 + mouseNormX * layerDepth;
        const currentY = b.y + oscillation2 * 60 + mouseNormY * layerDepth;
        const currentRadius = b.r * (1 + oscillation * 0.12);

        const gradient = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          Math.max(10, currentRadius)
        );

        // Soft silver-white / ethereal charcoal transitions
        const alpha = b.baseAlpha * (1 + oscillation * 0.25);
        gradient.addColorStop(0, `rgba(240, 240, 245, ${alpha.toFixed(3)})`);
        gradient.addColorStop(0.35, `rgba(180, 185, 195, ${(alpha * 0.45).toFixed(3)})`);
        gradient.addColorStop(0.7, `rgba(80, 85, 95, ${(alpha * 0.15).toFixed(3)})`);
        gradient.addColorStop(1, "rgba(10, 10, 10, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(currentX, currentY, Math.max(10, currentRadius), 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Dynamic Canvas living smoke engine */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Layer 1: Ethereal silver-white fluid crest */}
      <div
        className="absolute -top-[25%] -left-[20%] w-[140%] h-[140%] rounded-full blur-[140px] pointer-events-none mix-blend-screen opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(200,205,210,0.06) 40%, transparent 75%)",
          animation: "floatSlow1 24s ease-in-out infinite alternate",
        }}
      />

      {/* Layer 2: Low-frequency charcoal smoke drift */}
      <div
        className="absolute -bottom-[20%] -right-[15%] w-[120%] h-[120%] rounded-full blur-[160px] pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(140,145,155,0.12) 0%, rgba(50,55,65,0.04) 50%, transparent 80%)",
          animation: "floatSlow2 28s ease-in-out infinite alternate",
        }}
      />

      {/* Layer 3: Core kinetic illumination ray */}
      <div
        className="absolute top-1/4 left-1/5 w-[75vw] h-[360px] rounded-full blur-[120px] pointer-events-none opacity-15 transform -rotate-12"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
          animation: "pulseSlow 14s ease-in-out infinite alternate",
        }}
      />

      {/* Architectural subtle hairline matrix lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex justify-between px-6 md:px-12 lg:px-16">
        <div className="w-px h-full bg-white/20" />
        <div className="w-px h-full bg-white/20 hidden md:block" />
        <div className="w-px h-full bg-white/20 hidden lg:block" />
        <div className="w-px h-full bg-white/20" />
      </div>

      <style jsx>{`
        @keyframes floatSlow1 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.05); }
          100% { transform: translate(-30px, 20px) scale(0.98); }
        }
        @keyframes floatSlow2 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-40px, -25px) scale(1.06); }
          100% { transform: translate(25px, -35px) scale(0.96); }
        }
        @keyframes pulseSlow {
          0% { opacity: 0.1; transform: rotate(-12deg) scale(0.95); }
          100% { opacity: 0.22; transform: rotate(-9deg) scale(1.08); }
        }
      `}</style>
    </div>
  );
}
