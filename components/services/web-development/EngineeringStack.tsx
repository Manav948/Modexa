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
    category: "CORE RUNTIME",
    title: "NEXT.JS 15+",
    subtitle: "React Server Components / Streaming SSR / Edge Routing",
    description:
      "Zero-bundle client payload for content nodes. Selective hydration orchestrated via streaming primitives, eliminating main-thread lockup during heavy interaction init.",
    badge: "SSR TTFB: < 42MS",
    meta: "CACHE: STALE-WHILE-REVALIDATE",
  },
  {
    number: "02 //",
    category: "TYPE INTEGRITY",
    title: "TYPESCRIPT 5.x",
    subtitle: "Strict Mode / End-to-End Schemas / Zero Any Policy",
    description:
      "Compile-time runtime contracts enforced through Zod inference. API payloads, animation state vectors, and typography metrics inherit unbroken type guarantees.",
    badge: "SCHEMA COVERAGE: 100%",
    meta: "TYPE-CHECK: CI GATED",
  },
  {
    number: "03 //",
    category: "KINETIC ENGINE",
    title: "GSAP + LENIS + WEBGL",
    subtitle: "Physics Springs / ScrollTrigger / Fragment Shaders",
    description:
      "Smooth normalized virtual scrolling combined with RAF-synced spring mechanics. Off-thread WebGL canvas layers for spatial distortions, displacement maps, and grain filters.",
    badge: "REFRESH TARGET: 120HZ / 60HZ",
    meta: "DROPPED FRAMES: 0.00%",
  },
  {
    number: "04 //",
    category: "STYLING & TOKENS",
    title: "TAILWIND CSS & TOKENS",
    subtitle: "Fluid Clamps / Sub-Pixel Kerning / Zero Runtime Overhead",
    description:
      "A pure atomic compilation layer generating sub-12KB CSS payloads. Typography scales mathematically with viewport width, eliminating abrupt breakpoint jumps.",
    badge: "COMPILED CSS: 9.2 KB",
    meta: "LAYOUT RECALC: ZERO FLICKER",
  },
  {
    number: "05 //",
    category: "DATA & INFRASTRUCTURE",
    title: "EDGE NODE + POSTGRES",
    subtitle: "Prisma ORM / Global Edge Replica / Encrypted Vault",
    description:
      "Data read queries routed to geographically adjacent regions. Write mutators guaranteed via ACID compliance, with headless content delivery via instant webhooks.",
    badge: "UPTIME SLA: 99.99%",
    meta: "REGIONS: 32 GLOBAL POPs",
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
