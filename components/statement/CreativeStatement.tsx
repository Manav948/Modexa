"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const WORDS = [
  { text: "MANY", highlight: false },
  { text: "SPECIALIST", highlight: false },
  { text: "SKILLS.", highlight: false },
  { text: "ONE", highlight: true },
  { text: "CREATIVE", highlight: false },
  { text: "DIRECTION.", highlight: false },
];

export default function CreativeStatement() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative w-full px-5 md:px-8 lg:px-12 py-32 md:border-t overflow-hidden select-none"
      style={{ backgroundColor: "#1b1c18", borderColor: "#30312d" }}
    >
      {/* Background large parallax typography watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[18vw] font-bold text-white/[0.02] tracking-tighter pointer-events-none whitespace-nowrap"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        MODEXA
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col gap-12">
        {/* Top Tagline */}
        <div className="flex items-center gap-3 font-mono text-[10px] text-[#b6240f] tracking-widest uppercase font-bold">
          <span>[ OPERATING MANIFESTO ]</span>
          <span className="text-[#747878]">•</span>
          <span className="text-[#747878]">ATELIER SPECS 2026</span>
        </div>

        {/* Large Statement Typography */}
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          {WORDS.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 1.0,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className={`inline-block text-[#fbf9f3] ${
                  word.highlight ? "text-[#b6240f] italic" : ""
                }`}
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)",
                  lineHeight: "1.0",
                  letterSpacing: "-0.02em",
                  fontWeight: word.highlight ? 500 : 400,
                }}
              >
                {word.text}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Subtext description */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-8 border-t border-white/10">
          <div className="md:col-span-4 font-mono text-[10px] text-[#747878] uppercase tracking-widest">
            // SINGLE POINT OF ACCOUNTABILITY
          </div>
          <div className="md:col-span-8">
            <p
              className="text-[#e4e2dd] max-w-2xl leading-relaxed"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "1.0625rem",
                lineHeight: "1.875rem",
              }}
            >
              Clients bypass agency bloat and freelancer market noise. Every project is steered by
              one Creative Director who coordinates senior specialists in film, software architecture,
              WebGL, branding, and performance engines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
