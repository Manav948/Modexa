"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CAPABILITIES = [
  { num: "01", title: "Product Design", desc: "End-to-end product design from discovery to delivered UI system.", tags: "UX / PRODUCT" },
  { num: "02", title: "Interaction Design", desc: "Gesture, motion, and feedback systems with physical-grade precision.", tags: "MOTION / GESTURE" },
  { num: "03", title: "Design Systems", desc: "Structured component libraries, token systems and documentation.", tags: "SYSTEM / TOKENS" },
  { num: "04", title: "Web & App", desc: "Browser-native interfaces and mobile applications built to spec.", tags: "WEB / NATIVE" },
  { num: "05", title: "UX Research", desc: "Behavioral insight, usability testing, and information architecture.", tags: "RESEARCH / ARCH." },
  { num: "06", title: "Prototyping", desc: "High-fidelity interactive prototypes for testing and stakeholder presentation.", tags: "PROTOTYPE / TEST" },
];

export default function UIUXCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".cap-row",
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0, duration: 0.85, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: ".cap-row", start: "top 85%", once: true },
        }
      );
      gsap.fromTo(".cap-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: ".cap-heading", start: "top 85%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="uiux-capabilities"
      className="w-full border-t py-24 px-5 md:px-8 lg:px-14"
      style={{ backgroundColor: "#f0ede6", borderColor: "#E8E2D5" }}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12 pb-6 border-b border-[#E8E2D5]">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-[#E7472E] font-bold mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
              04 / SCOPE OF DISCIPLINE
            </div>
            <h2
              className="cap-heading uppercase leading-none tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#151515" }}
            >
              Capabilities
            </h2>
          </div>
          <span className="font-mono text-[9px] text-[#55534E] uppercase tracking-wider" style={{ fontFamily: "'DM Mono', monospace" }}>
            [FULL SPECTRUM DESIGN CRAFT]
          </span>
        </div>

        {/* Rows */}
        <div className="flex flex-col border-b border-[#E8E2D5]">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.num}
              className="cap-row group py-6 border-t border-[#E8E2D5] grid grid-cols-12 gap-4 items-center px-0 cursor-pointer hover:bg-[#f7f5ef] transition-colors"
            >
              <div className="col-span-1">
                <span className="font-mono text-[10px] text-[#E7472E] font-bold" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {cap.num}
                </span>
              </div>
              <div className="col-span-5 md:col-span-4">
                <h3
                  className="uppercase group-hover:text-[#E7472E] transition-colors"
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#151515",
                  }}
                >
                  {cap.title}
                </h3>
              </div>
              <div className="col-span-5 md:col-span-6 hidden md:block">
                <p className="text-[#55534E] text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {cap.desc}
                </p>
              </div>
              <div className="col-span-1 flex justify-end items-center gap-3">
                <span className="font-mono text-[9px] text-[#55534E] uppercase hidden lg:inline" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {cap.tags}
                </span>
                <span className="font-mono text-[14px] text-[#E7472E] group-hover:translate-x-2 transition-transform font-bold">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
