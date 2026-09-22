"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LEDGER_ROWS = [
  {
    num: "01",
    title: "Bespoke Frontend Engineering",
    tech: "Next.js App Router • TypeScript • Streaming React • Tailwind Tokens",
    cycle: "CYCLE: 14–21 DAYS",
    specLink: "mailto:hello@company.com?subject=SPEC:%20Bespoke%20Frontend%20Engineering",
  },
  {
    num: "02",
    title: "Creative Motion & WebGL Shaders",
    tech: "GSAP Physics • Three.js 3D • Custom GLSL • Lenis Smooth Scroll",
    cycle: "CYCLE: 21–28 DAYS",
    specLink: "mailto:hello@company.com?subject=SPEC:%20Creative%20Motion%20WebGL",
  },
  {
    num: "03",
    title: "Full-Stack Edge Web Applications",
    tech: "Distributed Node • PostgreSQL • Prisma • Headless Sanity/Payload CMS",
    cycle: "CYCLE: 28–45 DAYS",
    specLink: "mailto:hello@company.com?subject=SPEC:%20Full-Stack%20Edge%20Apps",
  },
  {
    num: "04",
    title: "Design Systems & Component Tokenization",
    tech: "Figma-to-Code Pipeline • Radix UI • Accessible WAI-ARIA • NPM Registry",
    cycle: "CYCLE: 14–21 DAYS",
    specLink: "mailto:hello@company.com?subject=SPEC:%20Design%20Systems",
  },
  {
    num: "05",
    title: "Performance Optimization & Code Refactoring",
    tech: "Core Web Vitals Remediation • Bundle Trimming • Memory Leak Elimination",
    cycle: "CYCLE: 07–14 DAYS",
    specLink: "mailto:hello@company.com?subject=SPEC:%20Performance%20Refactoring",
  },
];

export default function SpecificationLedger() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = rowsRef.current?.querySelectorAll(".ledger-row");
      if (rows && rows.length > 0) {
        gsap.from(rows, {
          opacity: 0,
          y: 25,
          stagger: 0.08,
          duration: 0.7,
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
      id="ledger"
      ref={sectionRef}
      className="w-full py-20 lg:py-28 px-5 md:px-10 lg:px-16 border-t"
      style={{ backgroundColor: "#fbf9f3", borderColor: "#e4e2dd" }}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-4 border-b border-[#e4e2dd]">
        <div>
          <span className="font-mono text-xs text-[#e7472e] uppercase tracking-widest block mb-2 font-medium">
            SECTION 07 // CAPABILITIES INDEX
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-[#1b1c18]">
            SPECIFICATION LEDGER
          </h2>
        </div>
        <span className="font-mono text-xs text-[#747878] uppercase tracking-wider font-medium">
          ACTIVE CAPACITY: 2 COMMISSIONS / Q2 2026
        </span>
      </div>

      {/* Editorial Ledger Rows */}
      <div ref={rowsRef} className="flex flex-col divide-y divide-[#e4e2dd]">
        {LEDGER_ROWS.map((row) => (
          <div
            key={row.num}
            className="ledger-row py-6 px-3 md:px-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 hover:bg-[#f5f3ed] transition-colors duration-200 group"
          >
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-base text-[#e7472e] font-bold">
                {row.num}
              </span>
              <div>
                <h4 className="font-display text-xl sm:text-2xl uppercase text-[#1b1c18] group-hover:text-[#e7472e] transition-colors duration-200">
                  {row.title}
                </h4>
                <p className="font-mono text-xs text-[#747878] mt-1">
                  {row.tech}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end mt-2 lg:mt-0">
              <span className="font-mono text-xs text-[#444748] uppercase font-medium">
                {row.cycle}
              </span>
              <a
                href={row.specLink}
                className="font-mono text-[11px] uppercase tracking-wider px-4 py-2 bg-[#151515] text-white hover:bg-[#e7472e] transition-colors duration-200 font-medium"
              >
                REQUEST SPEC →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
