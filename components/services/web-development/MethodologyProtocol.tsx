"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PHASES = [
  { phase: "PHASE // 01", title: "Discover", description: "Understand the product, audience and goal." },
  { phase: "PHASE // 02", title: "Structure", description: "Define the experience, architecture and technical direction." },
  { phase: "PHASE // 03", title: "Build", description: "Turn the design into a working digital experience." },
  { phase: "PHASE // 04", title: "Integrate", description: "Connect the systems, data and interactions." },
  { phase: "PHASE // 05", title: "Refine", description: "Improve the details, performance and behavior." },
  { phase: "PHASE // 06", title: "Deploy", description: "Take the finished experience into production." },
];

export default function MethodologyProtocol() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".phase-card");
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 35,
          stagger: 0.1,
          duration: 0.8,
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
      ref={sectionRef}
      className="w-full py-20 lg:py-28 px-5 md:px-10 lg:px-16 border-t"
      style={{ backgroundColor: "#f5f3ed", borderColor: "#e4e2dd" }}
    >
      <div className="mb-14">
        <span className="font-mono text-xs text-[#e7472e] uppercase tracking-widest block mb-2 font-medium">
          SECTION 08 // PROCESS
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase text-[#1b1c18]">
          FROM IDEA TO DEPLOYMENT
        </h2>
        <p className="font-sans text-sm md:text-base text-[#444748] max-w-xl mt-3 leading-relaxed">
          A clear path from product idea to working digital experience.
        </p>
      </div>

      {/* 6-Stage Timeline Chain */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PHASES.map((p) => (
          <div
            key={p.phase}
            className="phase-card p-6 md:p-8 bg-[#fbf9f3] border border-[#e4e2dd] flex flex-col justify-between relative hover:border-[#e7472e]/50 hover:bg-white transition-all duration-300 group"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="font-mono text-xs text-[#e7472e] uppercase font-bold tracking-wider">
                {p.phase}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#e7472e]" />
            </div>
            <h4 className="font-display text-lg uppercase text-[#1b1c18] group-hover:text-[#e7472e] transition-colors mb-3">
              {p.title}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#444748] leading-relaxed">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
