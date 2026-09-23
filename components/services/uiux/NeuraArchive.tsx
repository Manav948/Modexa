"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NeuraArchive() {
  const sectionRef = useRef<HTMLElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Label
      gsap.fromTo(".neura-label",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".neura-label", start: "top 85%", once: true } }
      );

      // "NEURA ARCHIVE" — letters slide up with stagger
      const letters = titleRef.current?.querySelectorAll(".neura-letter");
      if (letters) {
        gsap.fromTo(letters,
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.3, stagger: 0.02, ease: "power3.out",
            scrollTrigger: { trigger: titleRef.current, start: "top 80%", once: true } }
        );
      }

      // Body content
      gsap.fromTo(".neura-body",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power2.out",
          scrollTrigger: { trigger: ".neura-body", start: "top 82%", once: true } }
      );

      // Screen — clip-path reveal from left
      gsap.fromTo(screenRef.current,
        { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: screenRef.current, start: "top 80%", once: true } }
      );

      // Parallax on screen
      gsap.to(screenRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="uiux-neura-archive"
      className="w-full border-t overflow-hidden"
      style={{ backgroundColor: "#f7f5ef", borderColor: "#E8E2D5" }}
    >
      {/* Section header row */}
      <div
        className="neura-label flex items-center justify-between px-5 md:px-8 lg:px-14 py-3 border-b font-mono text-[9px] uppercase tracking-widest"
        style={{ borderColor: "#E8E2D5", fontFamily: "'DM Mono', monospace", color: "#55534E" }}
      >
        <span className="text-[#E7472E] font-bold">04 / SELECTED SYSTEM</span>
        <span>UI/UX / DIGITAL EXPERIENCE</span>
      </div>

      {/* Main body */}
      <div className="grid grid-cols-12 items-start max-w-[1400px] mx-auto w-full">

        {/* LEFT: Giant NEURA ARCHIVE + body */}
        <div className="col-span-12 lg:col-span-5 px-5 md:px-8 lg:px-14 pt-10 pb-10">
          {/* Project label */}
          <div
            className="neura-label font-mono text-[9px] uppercase tracking-widest text-[#55534E] mb-2"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            <span className="text-[#151515] font-bold">01 </span>// NEUROSCIENCE PLATFORM UI
          </div>

          {/* CLARITY SYSTEM — letter-by-letter revealed */}
          <div ref={titleRef} className="overflow-hidden mb-6">
            {"CLARITY SYSTEM".split("").map((ch, i) => (
              <span
                key={i}
                className="neura-letter inline-block"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(3rem, 7.5vw, 8rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: ch === " " ? 1 : 0.88,
                  color: "#151515",
                  display: ch === " " ? "inline" : "inline-block",
                  minWidth: ch === " " ? "0.3em" : undefined,
                }}
              >
                {ch}
              </span>
            ))}
          </div>

          {/* Body */}
          <div className="neura-body">
            <p
              className="text-[#55534E] text-sm leading-relaxed max-w-sm mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              A digital product system shaped around structure, hierarchy and useful interaction.
            </p>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6 font-mono text-[9px] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
              <div>
                <div className="text-[#55534E] mb-0.5">SECTOR</div>
                <div className="text-[#151515] font-bold">VISUAL & INTERACTION SYSTEM</div>
              </div>
              <div>
                <div className="text-[#55534E] mb-0.5">PLATFORM</div>
                <div className="text-[#E7472E] font-bold">AI NATIVE NAVIGATION</div>
              </div>
              <div>
                <div className="text-[#55534E] mb-0.5">UX ARCHITECTURE</div>
                <div className="text-[#151515] font-bold">SYMMETRIC TRI-COLUMN</div>
              </div>
              <div>
                <div className="text-[#55534E] mb-0.5">FLUX</div>
                <div className="text-[#151515] font-bold">CLEAR PRODUCT DIRECTION</div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#"
              className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#151515] border-b border-[#151515] hover:text-[#E7472E] hover:border-[#E7472E] transition-colors pb-0.5"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              VIEW CASE NAVIGATION →
            </a>
          </div>
        </div>

        {/* RIGHT: Complex desktop UI screenshot */}
        <div className="col-span-12 lg:col-span-7 relative overflow-hidden">
          <div
            ref={screenRef}
            className="relative w-full border-l overflow-hidden"
            style={{ borderColor: "#E8E2D5" }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-2 px-4 py-2 border-b font-mono text-[8px] uppercase tracking-wider"
              style={{ backgroundColor: "#f0ede6", borderColor: "#E8E2D5", fontFamily: "'DM Mono', monospace", color: "#55534E" }}
            >
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E7472E" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E8E2D5" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E8E2D5" }} />
              </div>
              <div className="flex-1 ml-2 border border-[#E8E2D5] px-3 py-0.5">
                clarity-system // product.ops
              </div>
              <span>⊞ 1.4GHz OPS</span>
            </div>

            {/* App layout */}
            <div className="flex" style={{ minHeight: "480px", backgroundColor: "#faf8f3" }}>
              {/* App sidebar */}
              <div
                className="flex flex-col border-r text-[8px] font-mono uppercase"
                style={{ minWidth: "140px", borderColor: "#E8E2D5", fontFamily: "'DM Mono', monospace" }}
              >
                <div className="p-3 border-b" style={{ borderColor: "#E8E2D5" }}>
                  <div className="text-[#E7472E] font-bold mb-2">SYSTEM</div>
                  <div className="text-[#55534E]">RESEARCH ENV.</div>
                </div>
                {["NETWORK MAP", "TELEMETRY", "SUBJECTS", "ARCHIVES", "CONFIG"].map((item, i) => (
                  <div
                    key={item}
                    className="px-3 py-2 border-b flex items-center justify-between"
                    style={{
                      borderColor: "#E8E2D5",
                      backgroundColor: i === 0 ? "#f0ede6" : "transparent",
                      color: i === 0 ? "#151515" : "#55534E",
                    }}
                  >
                    <span>{item}</span>
                    {i === 0 && <span className="w-1.5 h-1.5" style={{ backgroundColor: "#E7472E" }} />}
                  </div>
                ))}
              </div>

              {/* App main content */}
              <div className="flex-1 p-4">
                {/* Toolbar */}
                <div
                  className="flex items-center justify-between border-b pb-3 mb-4 font-mono text-[8px] uppercase"
                  style={{ borderColor: "#E8E2D5", fontFamily: "'DM Mono', monospace", color: "#55534E" }}
                >
                  <span>LATERAL CHRONOLOGY — ARCH_MAP_01.R</span>
                  <div className="flex items-center gap-3">
                    <span>RESET BOUNDS</span>
                    <span className="px-2 py-0.5 text-white font-bold" style={{ backgroundColor: "#E7472E", fontSize: "7px" }}>
                      EXPORT
                    </span>
                    <span>EDIT DATA</span>
                  </div>
                </div>

                {/* Network graph placeholder */}
                <div className="relative w-full" style={{ height: "240px" }}>
                  <svg viewBox="0 0 600 240" className="w-full h-full">
                    {/* Graph background grid */}
                    <defs>
                      <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E8E2D5" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#smallGrid)" />

                    {/* Network nodes */}
                    {[
                      { x: 300, y: 120, r: 12, label: "CORE A", main: true },
                      { x: 160, y: 80, r: 8, label: "N.01" },
                      { x: 420, y: 70, r: 8, label: "N.02" },
                      { x: 180, y: 170, r: 8, label: "N.03" },
                      { x: 440, y: 180, r: 8, label: "N.04" },
                      { x: 80, y: 130, r: 6, label: "N.05" },
                      { x: 510, y: 120, r: 6, label: "N.06" },
                      { x: 300, y: 40, r: 6, label: "N.07" },
                      { x: 300, y: 210, r: 6, label: "N.08" },
                    ].map((node, i) => (
                      <g key={i}>
                        {/* Lines to center */}
                        {!node.main && (
                          <line x1={300} y1={120} x2={node.x} y2={node.y}
                            stroke="#E8E2D5" strokeWidth="1" />
                        )}
                        <circle cx={node.x} cy={node.y} r={node.r}
                          fill={node.main ? "#E7472E" : "#f7f5ef"}
                          stroke={node.main ? "#E7472E" : "#55534E"}
                          strokeWidth="1" />
                        <text x={node.x + node.r + 3} y={node.y + 3}
                          fontSize="7" fill="#55534E"
                          fontFamily="monospace"
                        >
                          {node.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>

                {/* Data table */}
                <div className="mt-3 border-t" style={{ borderColor: "#E8E2D5" }}>
                  <table className="w-full font-mono text-[8px] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#f0ede6", color: "#55534E" }}>
                        {["ID", "SUBJECT NAME", "CLASSIFICATION", "DELTA", "FLAGS", "ST"].map(h => (
                          <th key={h} className="text-left px-2 py-1.5 border-r border-b" style={{ borderColor: "#E8E2D5", fontWeight: 400 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody style={{ color: "#151515" }}>
                      {[
                        ["001", "Kepler Array Beta", "SPATIAL / NEURON", "0.11", "03", "★"],
                        ["002", "Torchlight Module", "TACTICAL / TRACE", "1.48", "02", "→"],
                        ["003", "Arc Spatial 14", "ARCHIVE / REF", "0.78", "01", "◎"],
                      ].map((row, i) => (
                        <tr key={i} className="border-b hover:bg-[#f0ede6] transition-colors" style={{ borderColor: "#E8E2D5" }}>
                          {row.map((cell, j) => (
                            <td key={j} className="px-2 py-1.5 border-r" style={{ borderColor: "#E8E2D5", color: j === 5 ? "#E7472E" : undefined, fontWeight: j === 5 ? 700 : undefined }}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bottom note */}
                <div
                  className="mt-2 font-mono text-[8px] text-[#55534E] uppercase"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  PALMETTO EXPLORER — 14.003 research queries per 0.09 ms avg
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
