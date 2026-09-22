"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TactileFidelity() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeTrigger, setActiveTrigger] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".specimen-card");
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 lg:py-28 px-5 md:px-10 lg:px-16 border-t"
      style={{ backgroundColor: "#fbf9f3", borderColor: "#e4e2dd" }}
    >
      <div className="mb-14">
        <span className="font-mono text-xs text-[#e7472e] uppercase tracking-widest block mb-2 font-medium">
          SECTION 04 // INTERACTION METRICS
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-[#1b1c18]">
          DEVELOPMENT IS{" "}
          <span
            className="font-editorial italic lowercase font-normal text-[#444748] pr-2"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            how it
          </span>{" "}
          FEELS
        </h2>
        <p className="font-sans text-base sm:text-lg text-[#444748] max-w-2xl mt-4 leading-relaxed">
          Visual aesthetics mean nothing if the physical responsiveness is sluggish or uncertain. We treat user gestures as physical forces governed by inertia, elasticity, and spatial hierarchy.
        </p>
      </div>

      {/* 4-Quadrant Laboratory Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Specimen 01: Kinetic Spring Damping */}
        <div className="specimen-card p-6 md:p-8 bg-[#f5f3ed] border border-[#e4e2dd] flex flex-col justify-between hover:bg-[#f0eee8] transition-all duration-300 group">
          <div>
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-[#e4e2dd]">
              <span className="font-mono text-xs text-[#e7472e] uppercase font-medium">
                SPECIMEN 01 // DAMPED PHYSICS
              </span>
              <span className="font-mono text-xs text-[#747878]">FPS: 60.0</span>
            </div>
            <h3 className="font-display text-xl uppercase text-[#1b1c18] group-hover:text-[#e7472e] transition-colors mb-2">
              Kinetic Spring Damping
            </h3>
            <p className="font-sans text-sm text-[#444748] mb-8 leading-relaxed">
              Instead of standard linear CSS eases (<code className="font-mono text-xs bg-[#e4e2dd] px-1 py-0.5 text-[#1b1c18]">ease-in-out</code>), every drag, cursor trail, and drawer pull uses critically damped spring physics equations, avoiding mechanical stiffness.
            </p>
          </div>

          {/* Inline SVG Visualization: Damped Sine Wave */}
          <div className="w-full h-28 bg-[#fbf9f3] flex items-center justify-center p-3 border border-[#e4e2dd]/80 overflow-hidden">
            <svg
              className="w-full h-full text-[#e7472e] group-hover:scale-105 transition-transform duration-500"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 300 80"
            >
              <path
                d="M0,40 C30,10 60,70 100,25 C140,55 180,35 220,42 C260,39 280,40 300,40"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
              <line
                stroke="currentColor"
                strokeDasharray="4 4"
                strokeOpacity="0.2"
                x1="0"
                x2="300"
                y1="40"
                y2="40"
              />
              <circle cx="100" cy="25" fill="currentColor" r="4" className="animate-pulse" />
              <circle cx="220" cy="42" fill="currentColor" r="4" />
            </svg>
          </div>
        </div>

        {/* Specimen 02: Hardware Thread Isolation */}
        <div className="specimen-card p-6 md:p-8 bg-[#f5f3ed] border border-[#e4e2dd] flex flex-col justify-between hover:bg-[#f0eee8] transition-all duration-300 group">
          <div>
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-[#e4e2dd]">
              <span className="font-mono text-xs text-[#e7472e] uppercase font-medium">
                SPECIMEN 02 // COMPOSITOR BOUND
              </span>
              <span className="font-mono text-xs text-[#747878]">JANK: 0.00%</span>
            </div>
            <h3 className="font-display text-xl uppercase text-[#1b1c18] group-hover:text-[#e7472e] transition-colors mb-2">
              Hardware Thread Isolation
            </h3>
            <p className="font-sans text-sm text-[#444748] mb-8 leading-relaxed">
              Animations strictly adhere to <code className="font-mono text-xs bg-[#e4e2dd] px-1 py-0.5 text-[#1b1c18]">transform</code> and <code className="font-mono text-xs bg-[#e4e2dd] px-1 py-0.5 text-[#1b1c18]">opacity</code> vectors. Zero CPU reflows (<code className="font-mono text-xs bg-[#e4e2dd] px-1 py-0.5 text-[#1b1c18]">width</code>, <code className="font-mono text-xs bg-[#e4e2dd] px-1 py-0.5 text-[#1b1c18]">height</code>, <code className="font-mono text-xs bg-[#e4e2dd] px-1 py-0.5 text-[#1b1c18]">top</code>, <code className="font-mono text-xs bg-[#e4e2dd] px-1 py-0.5 text-[#1b1c18]">margin</code>) during scroll ticks ensures 120Hz ProMotion stability.
            </p>
          </div>

          {/* Frame Rate Histogram */}
          <div className="w-full h-28 bg-[#fbf9f3] flex items-end justify-between px-6 py-3 border border-[#e4e2dd]/80">
            <div className="w-2.5 bg-[#444748]/30 h-10 transition-all duration-300 group-hover:h-14" />
            <div className="w-2.5 bg-[#444748]/30 h-14 transition-all duration-300 group-hover:h-16" />
            <div className="w-2.5 bg-[#444748]/30 h-12 transition-all duration-300 group-hover:h-15" />
            <div className="w-2.5 bg-[#444748]/30 h-16 transition-all duration-300 group-hover:h-18" />
            <div className="w-2.5 bg-[#e7472e] h-20 shadow-[0_0_8px_rgba(231,71,46,0.3)]" />
            <div className="w-2.5 bg-[#e7472e] h-20 shadow-[0_0_8px_rgba(231,71,46,0.3)]" />
            <div className="w-2.5 bg-[#e7472e] h-20 shadow-[0_0_8px_rgba(231,71,46,0.3)]" />
            <div className="w-2.5 bg-[#e7472e] h-20 shadow-[0_0_8px_rgba(231,71,46,0.3)]" />
            <div className="w-2.5 bg-[#e7472e] h-20 shadow-[0_0_8px_rgba(231,71,46,0.3)]" />
            <div className="w-2.5 bg-[#e7472e] h-20 shadow-[0_0_8px_rgba(231,71,46,0.3)]" />
            <div className="w-2.5 bg-[#e7472e] h-20 shadow-[0_0_8px_rgba(231,71,46,0.3)]" />
            <div className="w-2.5 bg-[#444748]/30 h-16 transition-all duration-300 group-hover:h-18" />
          </div>
        </div>

        {/* Specimen 03: Fluid Clamp Topology */}
        <div className="specimen-card p-6 md:p-8 bg-[#f5f3ed] border border-[#e4e2dd] flex flex-col justify-between hover:bg-[#f0eee8] transition-all duration-300 group">
          <div>
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-[#e4e2dd]">
              <span className="font-mono text-xs text-[#e7472e] uppercase font-medium">
                SPECIMEN 03 // PROPORTION
              </span>
              <span className="font-mono text-xs text-[#747878]">SCALE: FLUID</span>
            </div>
            <h3 className="font-display text-xl uppercase text-[#1b1c18] group-hover:text-[#e7472e] transition-colors mb-2">
              Fluid Clamp Topology
            </h3>
            <p className="font-sans text-sm text-[#444748] mb-8 leading-relaxed">
              Typography and layout gutters calculate harmonically using viewport slope mathematical formulas. Transitions between mobile, laptop, and ultra-wide displays occur continuously without layout pops.
            </p>
          </div>

          {/* Fluid Curve Visualization */}
          <div className="w-full h-28 bg-[#fbf9f3] flex items-center justify-center p-3 border border-[#e4e2dd]/80">
            <svg className="w-full h-full text-[#1b1c18]" fill="none" viewBox="0 0 300 80">
              <path
                d="M0,70 Q 150,70 180,30 T 300,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path d="M0,70 L300,70" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
              <text className="font-mono text-[10px]" fill="currentColor" opacity="0.5" x="10" y="65">
                320px
              </text>
              <text className="font-mono text-[10px]" fill="currentColor" opacity="0.5" x="245" y="25">
                2560px
              </text>
            </svg>
          </div>
        </div>

        {/* Specimen 04: Zero-Delay Tactile Triggers */}
        <div
          onClick={() => setActiveTrigger(true)}
          onMouseUp={() => setActiveTrigger(false)}
          className="specimen-card p-6 md:p-8 bg-[#f5f3ed] border border-[#e4e2dd] flex flex-col justify-between hover:bg-[#f0eee8] transition-all duration-300 group cursor-pointer"
        >
          <div>
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-[#e4e2dd]">
              <span className="font-mono text-xs text-[#e7472e] uppercase font-medium">
                SPECIMEN 04 // LATENCY
              </span>
              <span className="font-mono text-xs text-[#747878]">RESPONSE: &lt; 8MS</span>
            </div>
            <h3 className="font-display text-xl uppercase text-[#1b1c18] group-hover:text-[#e7472e] transition-colors mb-2">
              Zero-Delay Tactile Triggers
            </h3>
            <p className="font-sans text-sm text-[#444748] mb-8 leading-relaxed">
              Micro-interactions dispatch on <code className="font-mono text-xs bg-[#e4e2dd] px-1 py-0.5 text-[#1b1c18]">pointerdown</code> rather than <code className="font-mono text-xs bg-[#e4e2dd] px-1 py-0.5 text-[#1b1c18]">click</code>, recovering 80-120ms of human reaction latency. Optical states acknowledge input before the browser finishes paint loops.
            </p>
          </div>

          {/* Pulse Ripple Radar */}
          <div className="w-full h-28 bg-[#fbf9f3] flex items-center justify-center p-3 border border-[#e4e2dd]/80 relative overflow-hidden">
            <div className="relative flex items-center justify-center">
              <span
                className={`w-4 h-4 rounded-full bg-[#e7472e] transition-transform duration-100 ${
                  activeTrigger ? "scale-150" : "scale-100"
                }`}
              />
              <span className="absolute w-12 h-12 rounded-full border border-[#e7472e]/40 animate-ping" />
              <span className="absolute w-20 h-20 rounded-full border border-[#e7472e]/20" />
            </div>
            <span className="absolute bottom-2 right-3 font-mono text-[9px] text-[#747878] uppercase">
              CLICK TO TRIGGER FAST PULSE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
