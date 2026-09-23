"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StackLayer {
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  meta: string;
}

const STACK_LAYERS: StackLayer[] = [
  {
    number: "01 //",
    category: "01 / FRONTEND",
    title: "NEXT.JS",
    subtitle: "React interfaces / App Router / Responsive structure",
    description: "Interfaces built for clarity, responsiveness and interaction.",
    badge: "NEXT.JS",
    meta: "REACT / TYPESCRIPT",
  },
  {
    number: "02 //",
    category: "02 / FULL-STACK",
    title: "TYPESCRIPT",
    subtitle: "Typed interfaces / Clear contracts / Maintainable systems",
    description: "From the interface to the systems behind it.",
    badge: "TYPESCRIPT",
    meta: "STRUCTURE / LOGIC",
  },
  {
    number: "03 //",
    category: "03 / INTERACTIVE WEB",
    title: "GSAP + LENIS",
    subtitle: "Motion / ScrollTrigger / Smooth interaction",
    description: "Motion and interaction designed as part of the experience.",
    badge: "GSAP",
    meta: "LENIS / SCROLLTRIGGER",
  },
  {
    number: "04 //",
    category: "04 / PERFORMANCE",
    title: "TAILWIND CSS",
    subtitle: "Responsive systems / Fluid type / Focused output",
    description: "Fast, efficient experiences without unnecessary weight.",
    badge: "TAILWIND CSS",
    meta: "RESPONSIVE / EFFICIENT",
  },
  {
    number: "05 //",
    category: "05 / DEPLOYMENT",
    title: "NODE.JS + PRISMA",
    subtitle: "Server logic / Data / Production delivery",
    description: "From local development to a reliable production environment.",
    badge: "NODE.JS",
    meta: "PRISMA / DEPLOYMENT",
  },
];

export default function EngineeringStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = rowsRef.current?.querySelectorAll(".stack-row");
      if (rows && rows.length > 0) {
        gsap.from(rows, {
          opacity: 0,
          y: 35,
          stagger: 0.12,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="w-full py-20 lg:py-28 px-5 md:px-10 lg:px-16 border-t"
      style={{ backgroundColor: "#fbf9f3", borderColor: "#e4e2dd" }}
    >
      {/* Section Header Ledger */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-10 border-b border-[#e4e2dd]">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#e7472e] block mb-2 font-medium">
            SECTION 02 // SUB-SYSTEM SPECIFICATION
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#1b1c18]">
            THE ENGINEERING STACK
          </h2>
        </div>
        <p className="font-sans text-sm md:text-base text-[#444748] max-w-md leading-relaxed">
          We deliberately bypass disposable abstractions. Our architectural baseline prioritizes long-term mechanical stability, sub-millisecond interaction feedback, and strict type provenance.
        </p>
      </div>

      {/* Monumental Stack Layers */}
      <div ref={rowsRef} className="flex flex-col divide-y divide-[#e4e2dd]">
        {STACK_LAYERS.map((layer) => (
          <div
            key={layer.title}
            className="stack-row py-10 px-3 md:px-4 group transition-all duration-300 hover:bg-[#f5f3ed]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
              {/* Layer Number */}
              <div className="lg:col-span-1 font-mono text-sm text-[#e7472e] uppercase font-bold">
                {layer.number}
              </div>

              {/* Title & Category */}
              <div className="lg:col-span-4">
                <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-[#747878] block">
                  {layer.category}
                </span>
                <h3 className="font-display text-xl sm:text-2xl uppercase text-[#1b1c18] group-hover:text-[#e7472e] transition-colors duration-200 mt-1">
                  {layer.title}
                </h3>
                <span className="font-mono text-[11px] text-[#444748] block mt-1.5">
                  {layer.subtitle}
                </span>
              </div>

              {/* Narrative description */}
              <div className="lg:col-span-4 font-sans text-sm text-[#444748] leading-relaxed">
                {layer.description}
              </div>

              {/* Telemetry pill & metadata */}
              <div className="lg:col-span-3 flex flex-col items-start lg:items-end font-mono text-xs text-[#747878]">
                <span className="bg-[#e4e2dd] px-2.5 py-1 text-[#1b1c18] text-[11px] font-medium tracking-wide">
                  {layer.badge}
                </span>
                <span className="mt-2 text-[10px] tracking-wider text-[#747878]">
                  {layer.meta}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
