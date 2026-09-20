"use client";

import { useState } from "react";

interface ReelItem {
  id: string;
  label: string;
  category: string;
  title: string;
  desc: string;
  duration: string;
  retention: string;
  image: string;
}

const REELS: ReelItem[] = [
  {
    id: "01",
    label: "AURA KINETICS",
    category: "2026 // COMMERCE",
    title: "Launch Reel Cut 01",
    desc: "Viscoelastic pacing with audio-reactive typographic hooks.",
    duration: "00:15 CUT",
    retention: "89% RETENTION",
    image: "/images/media__1789795957723.png",
  },
  {
    id: "02",
    label: "METRO ARCHIVE",
    category: "2026 // CULTURAL",
    title: "Heritage Teaser Cut",
    desc: "Tactile macro zooms paired with spatial subterranean foley.",
    duration: "00:30 TEASER",
    retention: "94% RETENTION",
    image: "/images/work_arclab_spatial_1789796381832.png",
  },
  {
    id: "03",
    label: "CHRONO SCULPT",
    category: "2025 // EDITORIAL",
    title: "Micro Arc Narrative",
    desc: "Three-act structure compressed into eighteen ruthless seconds.",
    duration: "00:19 STORY",
    retention: "86% RETENTION",
    image: "/images/work_motion_stories_1789796354503.png",
  },
  {
    id: "04",
    label: "TECTONIC SOUND",
    category: "2025 // EXPERIMENTAL",
    title: "Audio-Driven Cut",
    desc: "Sound-designed cuts where every transition is triggered by sub-bass.",
    duration: "00:45 AUDIO CUT",
    retention: "91% RETENTION",
    image: "/images/work_vanguard_hardware_1789796410306.png",
  },
  {
    id: "05",
    label: "CODEVERSE SPATIAL",
    category: "2026 // BRAND LAUNCH",
    title: "Spatial Launch Cut",
    desc: "Precision typographic overlays with motion-tracked spatial cuts.",
    duration: "01:42 TRAILER",
    retention: "92% RETENTION",
    image: "/images/work_codeverse_platform_1789796324968.png",
  },
  {
    id: "06",
    label: "TERRACOTTA ATELIER",
    category: "2025 // PRINT & FILM",
    title: "Tactile Material Film",
    desc: "Paced to mimic the slow mechanical turning of an artisan wheel.",
    duration: "00:40 ESSAY",
    retention: "88% RETENTION",
    image: "/images/media__1789794671970.png",
  },
];

// Deterministic vertical offsets for visual rhythm (HIGH, LOW, MIDDLE pattern)
const VERTICAL_OFFSETS = [
  "-translate-y-12 md:-translate-y-16", // HIGH
  "translate-y-10 md:translate-y-12",   // LOW
  "-translate-y-3 md:-translate-y-4",   // MIDDLE
  "-translate-y-14 md:-translate-y-18", // HIGH
  "translate-y-12 md:translate-y-14",   // LOW
  "-translate-y-4 md:-translate-y-5",   // MIDDLE
];

export default function SelectedReels() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Triple array for 100% seamless infinite looping
  const infiniteReels = [...REELS, ...REELS, ...REELS];

  return (
    <section
      id="selected-work"
      className="relative w-full py-24 border-t overflow-hidden select-none drafting-grid"
      style={{
        backgroundColor: "#fbf9f3",
        borderColor: "#e4e2dd",
        backgroundImage: `
          linear-gradient(to right, rgba(228, 226, 221, 0.45) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(228, 226, 221, 0.45) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    >
      {/* Inline Keyframes for 100% Guaranteed Fail-Safe Infinite Marquee */}
      <style jsx global>{`
        @keyframes reelMarqueeLoop {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.33333%, 0, 0);
          }
        }
        .animate-reel-marquee {
          animation: reelMarqueeLoop 30s linear infinite;
          will-change: transform;
        }
        .animate-reel-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Section Header Container */}
      <div className="max-w-[1400px] mx-auto w-full px-5 md:px-8 lg:px-12 mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-6 border-b border-[#e4e2dd] gap-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] text-[#b6240f] uppercase tracking-widest mb-2 font-bold line-reveal">
              <span>02 / RETENTION &amp; MOMENTUM</span>
              <span className="w-4 h-px bg-[#b6240f]" />
              <span>INFINITE FILM WALL MATRIX</span>
            </div>
            <h2
              className="text-[#1b1c18] uppercase tracking-tight text-reveal"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                fontWeight: 700,
              }}
            >
              REELS &amp; SHORT FORM
            </h2>
          </div>
          <p
            className="text-[#747878] max-w-md font-sans text-sm md:text-base leading-relaxed text-reveal"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            All film frames share identical dimensions (280 × 400). Floating across a drafting coordinate grid, vertical rhythm offsets travel endlessly.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Staggered Marquee Container with Ample Vertical Clearance */}
      <div className="relative w-full py-20 min-h-[580px] md:min-h-[640px] flex items-center overflow-hidden">
        {/* Continuous Horizontal Infinite Slider Track */}
        <div className="flex items-center gap-8 md:gap-10 w-max animate-reel-marquee">
          {infiniteReels.map((reel, index) => {
            const offsetClass = VERTICAL_OFFSETS[index % VERTICAL_OFFSETS.length];
            const isHovered = hoveredIdx === index;
            const isAnyHovered = hoveredIdx !== null;

            return (
              <div
                key={`${reel.id}-${index}`}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`flex-shrink-0 w-[270px] h-[390px] md:w-[300px] md:h-[430px] transition-all duration-500 cursor-pointer ${offsetClass} ${
                  isHovered ? "scale-105 z-30 opacity-100" : isAnyHovered ? "opacity-50 scale-95 z-10" : "z-20 opacity-100"
                }`}
              >
                {/* Reel Card Frame */}
                <div className="w-full h-full p-3.5 bg-[#f5f3ed] border border-[#e4e2dd] hover:border-[#1b1c18] shadow-md hover:shadow-2xl flex flex-col justify-between transition-colors">
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between font-mono text-[9px] text-[#747878] border-b border-[#e4e2dd] pb-1.5 mb-2">
                    <span className="text-[#b6240f] font-bold">[{reel.id} / REEL]</span>
                    <span className="text-[#1b1c18] font-semibold">{reel.duration}</span>
                  </div>

                  {/* Image Frame (Identical aspect 9/16 image container) */}
                  <div className="relative w-full flex-1 bg-[#1b1c18] overflow-hidden mb-3 border border-[#e4e2dd]">
                    <img
                      src={reel.image}
                      alt={reel.title}
                      className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 hover:scale-105"
                    />

                    {/* Hover Play Button Overlay */}
                    <div className="absolute inset-0 bg-[#1b1c18]/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="w-11 h-11 rounded-full bg-[#b6240f] text-white flex items-center justify-center font-mono text-[14px] shadow-lg">
                        ▶
                      </span>
                    </div>

                    {/* Top Left Tag */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#1b1c18]/90 text-white font-mono text-[8px] font-bold tracking-wider">
                      {reel.label}
                    </div>

                    {/* Bottom Right Retention Badge */}
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#fbf9f3] text-[#b6240f] font-mono text-[8px] font-bold border border-[#e4e2dd]">
                      {reel.retention}
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div>
                    <div className="flex items-center justify-between font-mono text-[9px] text-[#747878] mb-1">
                      <span>{reel.category}</span>
                      <span className="text-[#b6240f] font-bold">ACTIVE</span>
                    </div>

                    <h3
                      className="text-[#1b1c18] uppercase text-base md:text-lg font-bold leading-tight truncate"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {reel.title}
                    </h3>

                    <p
                      className="text-[#747878] text-[11px] leading-tight mt-1 line-clamp-1"
                      style={{ fontFamily: "'Manrope', sans-serif" }}
                    >
                      {reel.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
