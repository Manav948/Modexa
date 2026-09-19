"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const NODE_DATA: Record<string, {
  id: string;
  title: string;
  desc: string;
  proto: string;
}> = {
  video: {
    id: "REF. SPEC-01",
    title: "Motion Direction & Pace",
    desc: "Direct orchestration of cinematic pacing, raw cuts, and kinetic typography. Pacing and cut velocity align with master audio and campaign intent.",
    proto: "DIRECTOR REVIEW GATE",
  },
  design: {
    id: "REF. SPEC-02",
    title: "UI / UX Interface Architecture",
    desc: "Tectonic component schemas and ergonomic layout hierarchies. Strict typography rules and physical interaction mechanics applied to high-density products.",
    proto: "ZERO REDUNDANCY SPEC",
  },
  webgl: {
    id: "REF. SPEC-03",
    title: "Creative Tech & Shaders",
    desc: "60fps GPU acceleration, bespoke WebGL post-processing, and tactile canvas elasticity crafted directly in custom GLSL code.",
    proto: "HARDWARE SYNCHRONY",
  },
  brand: {
    id: "REF. SPEC-04",
    title: "Typographic & Archival Systems",
    desc: "Swiss proportion grids, unyielding baseline alignments, custom editorial glyph sets, and physical paper-grade packaging specifications.",
    proto: "ARCHIVAL GRADE VOL. VII",
  },
  growth: {
    id: "REF. SPEC-05",
    title: "Strategic Campaign Dispatch",
    desc: "Synchronized visual release schedules, street-level billboard takeovers, and responsive digital interactive campaign nodes.",
    proto: "UNIFIED COMMAND",
  },
};

const SPECIALISTS = [
  { key: "video", label: "MOTION SPECIALIST" },
  { key: "design", label: "UI/UX ARCHITECT" },
  { key: "webgl", label: "CREATIVE TECH / WEBGL" },
  { key: "brand", label: "TYPOGRAPHIC SCHOLAR" },
  { key: "growth", label: "STRATEGIC DISPATCH" },
];

const PATH_Y: Record<string, number> = {
  video: 90,
  design: 160,
  webgl: 225,
  brand: 290,
  growth: 360,
};

export default function CreativeNetwork() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [dossier, setDossier] = useState(NODE_DATA.video);

  const handleNodeHover = (key: string) => {
    setActiveNode(key);
    setDossier(NODE_DATA[key]);
  };

  const handleNodeLeave = () => {
    setActiveNode(null);
  };

  return (
    <section
      id="network"
      ref={sectionRef}
      className="relative w-full px-5 md:px-8 lg:px-12 py-16 md:py-24"
      style={{ backgroundColor: "#fbf9f3" }}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
      <div
        className="w-full flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 pb-6 border-b"
        style={{ borderColor: "#e4e2dd" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="font-mono text-[10px] text-[#b6240f] font-bold uppercase tracking-widest mb-3"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            05 / TOPOLOGY
          </div>
          <h2
            className="text-[#1b1c18]"
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              lineHeight: "2.75rem",
              letterSpacing: "-0.015em",
              fontWeight: 400,
            }}
          >
            ONE CREATIVE DIRECTION.
            <br />
            <span className="italic">MANY SPECIALISTS.</span>
          </h2>
        </motion.div>
        <div
          className="mt-4 md:mt-0 font-mono text-[10px] text-[#747878]"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          INTERACTIVE TOPOLOGICAL NODES • TAP/HOVER TO TEST PATHWAY
        </div>
      </div>

      {/* Network grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Node map */}
        <motion.div
          className="lg:col-span-8 p-3 sm:p-5 md:p-10 border"
          style={{ backgroundColor: "#f5f3ed", borderColor: "#e4e2dd" }}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full flex items-center justify-center aspect-[4/5] md:aspect-[16/9]">
            {/* SVG connections */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              id="network-svg"
              viewBox="0 0 800 450"
            >
              {/* Background static hairlines */}
              <path d="M 120 225 L 360 225" stroke="#E4E2DD" strokeDasharray="3,3" strokeWidth="1.5" />
              {Object.values(PATH_Y).map((y, i) => (
                <path
                  key={i}
                  d={`M 360 225 L 660 ${y}`}
                  stroke="#E4E2DD"
                  strokeDasharray="3,3"
                  strokeWidth="1.5"
                />
              ))}

              {/* Dynamic active highlights */}
              {SPECIALISTS.map((s) => (
                <path
                  key={s.key}
                  d={`M 360 225 L 660 ${PATH_Y[s.key]}`}
                  fill="none"
                  stroke="#E7472E"
                  strokeWidth="2.5"
                  strokeDasharray="400"
                  strokeDashoffset={activeNode === s.key ? 0 : 400}
                  style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.16,1,0.3,1)" }}
                />
              ))}
            </svg>

            {/* Client node */}
            <div className="absolute flex flex-col items-center" style={{ left: "3%", top: "50%", transform: "translateY(-50%)" }}>
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#fbf9f3] border border-[#1b1c18] flex items-center justify-center font-mono font-bold shadow-sm text-[8px] sm:text-[10px]"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                CLIENT
              </div>
              <span
                className="mt-2 font-mono text-[8px] sm:text-[10px] text-[#747878] uppercase tracking-wider"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                MANDATE
              </span>
            </div>

            {/* Creative Director central node */}
            <div className="absolute flex flex-col items-center" style={{ left: "36%", top: "50%", transform: "translateY(-50%)" }}>
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#b6240f] text-white flex flex-col items-center justify-center p-1.5 sm:p-2 text-center shadow-lg border border-[#1b1c18]/20 cursor-pointer"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[20px]">hub</span>
                <span
                  className="font-mono text-[7px] sm:text-[9px] font-bold leading-tight uppercase mt-1"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  CREATIVE DIR.
                </span>
              </div>
              <span
                className="mt-2 font-mono text-[8px] sm:text-[10px] text-[#b6240f] uppercase font-bold tracking-wider"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                FOCAL LENS
              </span>
            </div>

            {/* Specialist nodes */}
            <div
              className="absolute flex flex-col justify-between items-start"
              style={{ right: "2%", top: "7%", bottom: "7%" }}
            >
              {SPECIALISTS.map((s) => (
                <button
                  key={s.key}
                  className="group flex max-w-[42vw] sm:max-w-none items-center gap-1.5 sm:gap-3 px-1.5 sm:px-3 py-1 sm:py-1.5 border transition-colors text-left"
                  style={{
                    backgroundColor: "#fbf9f3",
                    borderColor: activeNode === s.key ? "#b6240f" : "#e4e2dd",
                  }}
                  data-node={s.key}
                  onMouseEnter={() => handleNodeHover(s.key)}
                  onMouseLeave={handleNodeLeave}
                  onFocus={() => handleNodeHover(s.key)}
                  onClick={() => handleNodeHover(s.key)}
                >
                  <span
                    className="w-2 h-2 rounded-full transition-colors"
                    style={{
                      backgroundColor: activeNode === s.key ? "#b6240f" : "#747878",
                    }}
                  />
                  <span
                    className="font-mono text-[8px] sm:text-[10px] uppercase leading-tight"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {s.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Dossier card */}
        <motion.div
          className="lg:col-span-4 p-5 sm:p-8 border flex flex-col justify-between"
          style={{ backgroundColor: "#fbf9f3", borderColor: "#e4e2dd", minHeight: "380px" }}
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <div
              className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b mb-6"
              style={{ borderColor: "#e4e2dd" }}
            >
              <span
                className="font-mono text-[10px] text-[#b6240f] font-bold uppercase tracking-wider"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                {dossier.id}
              </span>
              <span
                className="font-mono text-[10px] text-[#747878] uppercase"
                style={{ fontFamily: "'Space Mono', monospace" }}
              >
                ROUTED • ACTIVE
              </span>
            </div>

            <h4
              className="text-[#1b1c18] mb-3"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "1.5rem",
                lineHeight: "2rem",
                letterSpacing: "-0.01em",
                fontWeight: 500,
              }}
            >
              {dossier.title}
            </h4>
            <p
              className="leading-relaxed mb-6"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "0.8125rem",
                lineHeight: "1.375rem",
                color: "#747878",
              }}
            >
              {dossier.desc}
            </p>

            <div className="space-y-2 mb-6">
              <div
                className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between font-mono text-[10px] text-[#747878] border-b pb-1"
                style={{ borderColor: "#f0eee8", fontFamily: "'Space Mono', monospace" }}
              >
                <span>INTEGRATION PROTOCOL</span>
                <span className="text-[#1b1c18] font-semibold">{dossier.proto}</span>
              </div>
              <div
                className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between font-mono text-[10px] text-[#747878] border-b pb-1"
                style={{ borderColor: "#f0eee8", fontFamily: "'Space Mono', monospace" }}
              >
                <span>COMMUNICATION DELTA</span>
                <span className="text-[#1b1c18] font-semibold">0 LATENCY / SINGLE POINT</span>
              </div>
            </div>
          </div>

          {/* Quality governor */}
          <div className="p-4 border" style={{ backgroundColor: "#f5f3ed", borderColor: "#e4e2dd" }}>
            <div
              className="flex items-center gap-2 font-mono text-[10px] text-[#b6240f] font-bold uppercase mb-1"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#b6240f]" />
              <span>QUALITY GOVERNOR</span>
            </div>
            <p
              className="leading-snug"
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: "12px",
                color: "#747878",
              }}
            >
              All work flows through Creative Direction before reaching client
              presentation. Disjointed agency handoffs are structurally prohibited.
            </p>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
