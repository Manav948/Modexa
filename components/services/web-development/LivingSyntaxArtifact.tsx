"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CODE_LINES = [
  { num: "01", type: "comment", text: "/** Core Kinetic Cursor Damping Vector Specification */" },
  { num: "02", type: "keyword", text: 'import { useEffect, useRef, useState } from "react";' },
  { num: "03", type: "keyword", text: 'import { gsap } from "gsap";' },
  { num: "04", type: "empty", text: "" },
  { num: "05", type: "interface", text: "interface KineticVectorConfig {" },
  { num: "06", type: "prop", text: "  stiffness: number; // Spring restore tension" },
  { num: "07", type: "prop", text: "  damping: number;   // Inertial decay friction" },
  { num: "08", type: "prop", text: "  mass: number;      // Spatial displacement resistance" },
  { num: "09", type: "interface", text: "}" },
  { num: "10", type: "empty", text: "" },
  { num: "11", type: "keyword", text: "export const useSpringCursor = (config: KineticVectorConfig) => {" },
  { num: "12", type: "code", text: "  const pointerRef = useRef<{ x: number; y: number; vx: number; vy: number }>({ x: 0, y: 0, vx: 0, vy: 0 });" },
  { num: "13", type: "empty", text: "" },
  { num: "14", type: "keyword", text: "  useEffect(() => {" },
  { num: "15", type: "code", text: "    const ctx = gsap.context(() => {" },
  { num: "16", type: "code", text: "      gsap.ticker.add((time, deltaTime) => {" },
  { num: "17", type: "comment", text: "        // Continuous hardware RAF cadence calculation (60-120fps sync)" },
  { num: "18", type: "code", text: "        const dt = Math.min(deltaTime / 1000, 0.032);" },
  { num: "19", type: "code", text: "        pointerRef.current.vx += (targetX - pointerRef.current.x) * config.stiffness * dt;" },
  { num: "20", type: "code", text: "        pointerRef.current.vx *= Math.pow(config.damping, dt * 60);" },
  { num: "21", type: "code", text: "        pointerRef.current.x += pointerRef.current.vx * dt;" },
  { num: "22", type: "code", text: "      });" },
  { num: "23", type: "code", text: "    });" },
  { num: "24", type: "keyword", text: "    return () => ctx.revert();" },
  { num: "25", type: "keyword", text: "  }, [config]);" },
  { num: "26", type: "keyword", text: "};" },
];

export default function LivingSyntaxArtifact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [stiffness, setStiffness] = useState(0.22);
  const [damping, setDamping] = useState(0.82);
  const [coords, setCoords] = useState({ x: 120, y: 35, vx: 0.0 });
  const interactiveCanvasRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const copyCode = () => {
    const fullCode = CODE_LINES.map((l) => l.text).join("\n");
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Interactive micro spring demo inside terminal
  useEffect(() => {
    let animId: number;
    let currX = 120;
    let currY = 35;
    let targetX = 120;
    let targetY = 35;
    let vx = 0;
    let vy = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!interactiveCanvasRef.current) return;
      const rect = interactiveCanvasRef.current.getBoundingClientRect();
      targetX = Math.max(10, Math.min(rect.width - 10, e.clientX - rect.left));
      targetY = Math.max(10, Math.min(rect.height - 10, e.clientY - rect.top));
    };

    const canvas = interactiveCanvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", onMouseMove);
    }

    const loop = () => {
      const dt = 0.016;
      vx += (targetX - currX) * (stiffness * 120) * dt;
      vy += (targetY - currY) * (stiffness * 120) * dt;
      vx *= Math.pow(damping, dt * 60);
      vy *= Math.pow(damping, dt * 60);
      currX += vx * dt;
      currY += vy * dt;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${currX}px, ${currY}px)`;
      }
      setCoords({ x: Math.round(currX), y: Math.round(currY), vx: parseFloat(vx.toFixed(2)) });
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      if (canvas) canvas.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [stiffness, damping]);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 lg:py-28 px-5 md:px-10 lg:px-16 border-t"
      style={{ backgroundColor: "#f0eee8", borderColor: "#e4e2dd" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-8 gap-3">
          <div>
            <span className="font-mono text-xs text-[#e7472e] uppercase tracking-widest block mb-1 font-medium">
              SECTION 03 // LIVING CODE WORKSPACE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase text-[#1b1c18]">
              SYNTAX AS AN EDITORIAL ARTIFACT
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#747878]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#e7472e] animate-pulse" />
              MEMORY: 18.4MB
            </span>
            <span>•</span>
            <span>GPU RENDER: 0.8MS</span>
            <span>•</span>
            <span className="text-[#1b1c18] font-bold">STRICT_TS_V5.4</span>
          </div>
        </div>

        {/* Editor Console Window */}
        <div className="w-full bg-[#0a0a0a] text-white shadow-2xl border border-white/10 overflow-hidden font-mono text-xs">
          {/* Terminal Header */}
          <div className="bg-[#151515] px-4 py-3 border-b border-white/10 flex justify-between items-center text-white/60">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e7472e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#7c8061]" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <span className="font-mono text-xs tracking-wider text-white/90">
                hooks/useSpringCursor.ts
              </span>
            </div>

            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span className="text-white/40 hidden sm:inline">UTF-8 // LF // TYPESCRIPT</span>
              <button
                onClick={copyCode}
                className="hover:text-white transition-colors text-[#ffdad4] uppercase text-[10px] tracking-wider px-2 py-0.5 border border-white/15 bg-white/5"
              >
                {copied ? "COPIED ✓" : "COPY CODE"}
              </button>
            </div>
          </div>

          {/* Syntax Stream */}
          <div className="p-4 sm:p-6 overflow-x-auto leading-relaxed select-text font-mono text-xs bg-[#0b0c0d]">
            <table className="w-full text-left border-collapse">
              <tbody>
                {CODE_LINES.map((line) => (
                  <tr key={line.num} className="hover:bg-white/5 transition-colors">
                    <td className="text-white/30 pr-4 select-none text-right w-8 text-[11px]">
                      {line.num}
                    </td>
                    <td className="font-mono text-xs">
                      {line.type === "comment" && (
                        <span className="text-[#747878] italic">{line.text}</span>
                      )}
                      {line.type === "keyword" && (
                        <span className="text-[#ffdad4]">{line.text}</span>
                      )}
                      {line.type === "interface" && (
                        <span className="text-[#e7472e] font-semibold">{line.text}</span>
                      )}
                      {line.type === "prop" && (
                        <span className="text-[#c4c7c7]">{line.text}</span>
                      )}
                      {line.type === "code" && (
                        <span className="text-white/90">{line.text}</span>
                      )}
                      {line.type === "empty" && <span>&nbsp;</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive Physics Sandbox strip inside terminal */}
          <div className="bg-[#121314] px-4 py-3 border-t border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex items-center gap-4 font-mono text-[11px] text-white/70">
              <span className="text-[#e7472e] font-semibold">INTERACTIVE TESTING:</span>
              <span>STIFFNESS: {stiffness}</span>
              <span>DAMPING: {damping}</span>
            </div>

            {/* Micro test pad */}
            <div
              ref={interactiveCanvasRef}
              className="relative w-full md:w-72 h-14 bg-black/60 border border-white/15 overflow-hidden cursor-crosshair flex items-center justify-center"
            >
              <div
                ref={followerRef}
                className="absolute top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-[#e7472e] shadow-[0_0_12px_#e7472e] pointer-events-none"
              />
              <span className="font-mono text-[9px] text-white/30 select-none pointer-events-none">
                HOVER TO SIMULATE SPRING (X:{coords.x} Y:{coords.y} VX:{coords.vx})
              </span>
            </div>
          </div>

          {/* Terminal Status Bar */}
          <div className="bg-[#0e0e0e] px-4 py-2 border-t border-white/10 flex flex-wrap justify-between items-center font-mono text-[11px] text-white/50">
            <div className="flex items-center gap-4">
              <span className="text-[#e7472e]">● 0 ERRORS</span>
              <span>0 WARNINGS</span>
              <span className="hidden sm:inline">BUNDLER: TURBOPACK READY</span>
            </div>
            <div className="flex items-center gap-4">
              <span>TARGET: ECMASCRIPT 2024</span>
              <span className="text-white font-medium">DIR-KERNEL-V4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
