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
    id: "01 / VIDEO",
    title: "Video",
    desc: "Story, rhythm and motion shaped through the edit.",
    proto: "RHYTHM / PACING",
  },
  design: {
    id: "02 / DESIGN",
    title: "Design",
    desc: "Clarity, structure and interaction shaped around people and context.",
    proto: "CLARITY / SYSTEMS",
  },
  webgl: {
    id: "03 / DEVELOPMENT",
    title: "Development",
    desc: "Content, campaigns and distribution shaped around attention and connection.",
    proto: "CONTENT / REACH",
  },
  brand: {
    id: "04 / MARKETING",
    title: "Marketing",
    desc: "Design, interaction and technology brought together in a working experience.",
    proto: "DESIGN / CODE",
  },
  growth: {
    id: "05 / BRANDING + CONTENT",
    title: "Branding / Content",
    desc: "The clear point of view that keeps every discipline moving together.",
    proto: "ONE DIRECTION",
  },
};

const SPECIALISTS = [
  { key: "video", label: "VIDEO" },
  { key: "design", label: "DESIGN" },
  { key: "webgl", label: "DEVELOPMENT" },
  { key: "brand", label: "MARKETING" },
  { key: "growth", label: "BRANDING / CONTENT" },
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
      className="relative w-full px-5 py-16 md:px-8 md:py-24 lg:px-12"
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
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            05 / TOPOLOGY
          </div>
          <h2
            className="text-[#1b1c18]"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
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
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          CREATIVE DISCIPLINES • TAP/HOVER TO EXPLORE
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
          <div className="relative w-full min-h-[520px] sm:min-h-0 flex items-center justify-center aspect-auto sm:aspect-[16/9]">
            {/* SVG connections */}
            <svg
              className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none"
              id="network-svg"
              viewBox="0 0 800 450"
            >
              {/* Background static hairlines */}
              <path d="M 120 225 L 360 225" stroke="#c9c3b6" strokeDasharray="3,3" strokeWidth="2" />
              {Object.values(PATH_Y).map((y, i) => (
                <path
                  key={i}
                  d={`M 360 225 L 660 ${y}`}
                  stroke="#c9c3b6"
                  strokeDasharray="3,3"
                  strokeWidth="2"
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
            <div className="absolute left-1/2 top-[5%] flex -translate-x-1/2 flex-col items-center sm:left-[3%] sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-[#fbf9f3] border border-[#1b1c18] flex items-center justify-center font-mono font-bold shadow-sm text-[8px] sm:text-[10px]"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                  CLIENT
              </div>
              <span
                className="mt-2 font-mono text-[8px] sm:text-[10px] text-[#747878] uppercase tracking-wider"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                BRIEF
              </span>
            </div>

            {/* Creative Director central node */}
            <div className="absolute left-1/2 top-[25%] flex -translate-x-1/2 flex-col items-center sm:left-[36%] sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2">
              <div
                className="w-44 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#b6240f] text-white flex flex-col items-center justify-center p-1.5 sm:p-2 text-center shadow-lg border border-[#1b1c18]/20 cursor-pointer"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
              >
                <span aria-hidden="true" className="text-base leading-none sm:text-xl">↓</span>
                <span
                  className="font-mono text-[9px] sm:text-[9px] font-bold leading-tight uppercase mt-1"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  CREATIVE DIRECTION
                </span>
              </div>
              <span
                className="mt-2 font-mono text-[8px] sm:text-[10px] text-[#b6240f] uppercase font-bold tracking-wider"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                CLEAR POINT OF VIEW
              </span>
            </div>

            <span aria-hidden="true" className="absolute left-1/2 top-[19%] -translate-x-1/2 font-mono text-xl text-[#b6240f] sm:hidden">↓</span>
            <span aria-hidden="true" className="absolute left-1/2 top-[44%] -translate-x-1/2 font-mono text-xl text-[#b6240f] sm:hidden">↓</span>

            {/* Specialist nodes */}
            <div
              className="absolute left-[10%] right-[10%] top-[50%] bottom-[4%] flex flex-col items-stretch justify-between sm:left-auto sm:right-[2%] sm:top-[7%] sm:bottom-[7%] sm:items-start"
            >
              {SPECIALISTS.map((s) => (
                <button
                  key={s.key}
                  aria-pressed={activeNode === s.key}
                  aria-controls="network-dossier"
                  className={`group flex min-h-10 max-w-none items-center gap-2 sm:gap-3 px-3 sm:px-3 py-1.5 sm:py-2 border transition-colors text-left ${activeNode && activeNode !== s.key ? "opacity-65" : "opacity-100"}`}
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
                    className="font-mono text-[11px] sm:text-xs uppercase leading-tight"
                    style={{ fontFamily: "'DM Mono', monospace" }}
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
          id="network-dossier"
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
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {dossier.id}
              </span>
              <span
                className="font-mono text-[10px] text-[#747878] uppercase"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                SELECTED • ACTIVE
              </span>
            </div>

            <h3
              className="text-[#1b1c18] mb-3"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.5rem",
                lineHeight: "2rem",
                letterSpacing: "-0.01em",
                fontWeight: 500,
              }}
            >
              {dossier.title}
            </h3>
            <p
              className="leading-relaxed mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.375rem",
                color: "#747878",
              }}
            >
              {dossier.desc}
            </p>

            <div className="space-y-2 mb-6">
              <div
                className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between font-mono text-[10px] text-[#747878] border-b pb-1"
                style={{ borderColor: "#f0eee8", fontFamily: "'DM Mono', monospace" }}
              >
                <span>PRIMARY CRAFT</span>
                <span className="text-[#1b1c18] font-semibold">{dossier.proto}</span>
              </div>
              <div
                className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between font-mono text-[10px] text-[#747878] border-b pb-1"
                style={{ borderColor: "#f0eee8", fontFamily: "'DM Mono', monospace" }}
              >
                <span>CONNECTED BY</span>
                <span className="text-[#1b1c18] font-semibold">ONE DIRECTION</span>
              </div>
            </div>
          </div>

          {/* Quality governor */}
          <div className="p-4 border" style={{ backgroundColor: "#f5f3ed", borderColor: "#e4e2dd" }}>
            <div
              className="flex items-center gap-2 font-mono text-[10px] text-[#b6240f] font-bold uppercase mb-1"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#b6240f]" />
              <span>QUALITY PRINCIPLE</span>
            </div>
            <p
              className="leading-snug"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                color: "#747878",
              }}
            >
              Every project moves through one clear creative direction before it reaches the audience.
            </p>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
