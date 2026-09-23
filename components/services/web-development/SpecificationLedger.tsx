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
    title: "Frontend",
    tech: "Next.js • React • TypeScript • Tailwind CSS",
    cycle: "01 / BUILD",
    specLink: "mailto:hello@company.com?subject=SPEC:%20Bespoke%20Frontend%20Engineering",
  },
  {
    num: "02",
    title: "Interactive Web",
    tech: "GSAP • Lenis • ScrollTrigger",
    cycle: "02 / INTERACTION",
    specLink: "mailto:hello@company.com?subject=SPEC:%20Creative%20Motion%20WebGL",
  },
  {
    num: "03",
    title: "Web Applications",
    tech: "Node.js • Prisma • MongoDB",
    cycle: "03 / SYSTEMS",
    specLink: "mailto:hello@company.com?subject=SPEC:%20Full-Stack%20Edge%20Apps",
  },
  {
    num: "04",
    title: "Design Systems",
    tech: "React • TypeScript • Tailwind CSS",
    cycle: "04 / SYSTEMS",
    specLink: "mailto:hello@company.com?subject=SPEC:%20Design%20Systems",
  },
  {
    num: "05",
    title: "Performance",
    tech: "Responsive structure • Focused output • Smooth interaction",
    cycle: "05 / REFINE",
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
            SECTION 09 // CAPABILITIES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-[#1b1c18]">
            WHAT WE BUILD
          </h2>
        </div>
        <span className="font-mono text-xs text-[#747878] uppercase tracking-wider font-medium">
          FRONTEND / SYSTEMS / INTERACTION
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
                DISCOVER MORE →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
