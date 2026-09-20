"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHAPTERS = [
  { time: "00:00 — 04:12", title: "I. PROLOGUE", sub: "Cold opening & Thesis", timecode: "02:15 / 38:10", progress: "15%" },
  { time: "04:12 — 18:40", title: "II. THE MONOLITH", sub: "Investigation & Archive Cuts", timecode: "14:32 / 38:10", progress: "42%" },
  { time: "18:40 — 38:10", title: "III. RESONANCE", sub: "Culmination & Outro", timecode: "28:50 / 38:10", progress: "78%" },
];

const SECONDARY_PROJECTS = [
  {
    id: "01",
    tag: "INTERVIEW ESSAY // 48 MIN",
    ep: "EPISODE 04",
    title: "DISPATCH / 04 — The Specialist Dialogue",
    desc: "Dual-camera high-level philosophical discourse. Seamless multi-cam switching governed by micro-reactions, custom animated slide-deck inserts, and noise-isolated vocal warmth.",
    views: "1.2M VIEWS • 54% AVG RETENTION",
    image: "/images/work_motion_stories_1789796354503.png",
    spec: "DUAL 4K PRORES // MULTICAM 24-BIT",
  },
  {
    id: "02",
    tag: "KEYNOTE EDIT // 32 MIN",
    ep: "ANNUAL FORUM",
    title: "DESIGN CADENCE — Keynote & Deep Dive",
    desc: "Technical engineering keynote edited with cinematic pacing. Screen-recording zooms, motion-tracked annotations, and rhythmically synced transitions that never let attention sag.",
    views: "PRORES MASTER ARCHIVE",
    image: "/images/work_codeverse_platform_1789796324968.png",
    spec: "SCREEN GRAPHICS // DaVinci ACES",
  },
];

export default function LongFormArchive() {
  const [activeChapter, setActiveChapter] = useState(1);
  const [isMainHovered, setIsMainHovered] = useState(false);
  const [activeSecondary, setActiveSecondary] = useState<typeof SECONDARY_PROJECTS[0] | null>(null);

  const previewRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cardPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Smooth cursor-follow preview logic for long-form project cards
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const updateCard = () => {
      if (previewRef.current) {
        const targetX = mousePos.current.x - 180;
        const targetY = mousePos.current.y - 120;

        cardPos.current.x += (targetX - cardPos.current.x) * 0.15;
        cardPos.current.y += (targetY - cardPos.current.y) * 0.15;

        previewRef.current.style.transform = `translate3d(${cardPos.current.x}px, ${cardPos.current.y}px, 0px)`;
      }
      rafRef.current = requestAnimationFrame(updateCard);
    };
    rafRef.current = requestAnimationFrame(updateCard);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="long-form"
      className="relative w-full px-5 md:px-8 lg:px-12 py-24 border-t select-none"
      style={{ backgroundColor: "#fbf9f3", borderColor: "#e4e2dd" }}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#e4e2dd] gap-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] text-[#b6240f] uppercase tracking-widest mb-2 font-bold">
              <span>03 / NARRATIVE VELOCITY</span>
              <span className="w-4 h-px bg-[#b6240f]" />
              <span>EXPANDED ARCHIVE</span>
            </div>
            <h2
              className="text-[#1b1c18] uppercase tracking-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                fontWeight: 700,
              }}
            >
              Long Form
            </h2>
          </div>
          <p
            className="text-[#747878] max-w-md font-sans text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Hover over the master player or project cards to trigger interactive video playback, optical HUD viewfinders, and stem preview audio monitors.
          </p>
        </div>

        {/* Heroic Featured Project Player Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#f5f3ed] p-6 border border-[#e4e2dd] mb-16">
          {/* Video Player Visual Mockup (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <div
              onMouseEnter={() => setIsMainHovered(true)}
              onMouseLeave={() => setIsMainHovered(false)}
              className="relative aspect-video w-full bg-[#1b1c18] overflow-hidden group border border-[#e4e2dd] cursor-pointer shadow-lg"
            >
              {/* Main Image Plate */}
              <img
                src="/images/work_arclab_spatial_1789796381832.png"
                alt="The Architecture of Silence Documentary"
                className={`w-full h-full object-cover grayscale contrast-125 transition-all duration-700 ${
                  isMainHovered ? "scale-105 contrast-140" : "scale-100"
                }`}
              />

              {/* Hover Dark Glass Overlay */}
              <div
                className={`absolute inset-0 bg-[#1b1c18]/40 backdrop-blur-[2px] transition-opacity duration-500 pointer-events-none ${
                  isMainHovered ? "opacity-100" : "opacity-40"
                }`}
              />

              {/* Viewfinder Corner Crop Hairlines */}
              <div className="absolute inset-0 p-4 pointer-events-none">
                <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#b6240f]" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#b6240f]" />
                <div className="absolute bottom-16 left-4 w-4 h-4 border-b-2 border-l-2 border-[#b6240f]" />
                <div className="absolute bottom-16 right-4 w-4 h-4 border-b-2 border-r-2 border-[#b6240f]" />
              </div>

              {/* Center Pulsing Play / Viewfinder Badge on Hover */}
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 pointer-events-none ${
                  isMainHovered ? "scale-100 opacity-100" : "scale-90 opacity-0"
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-[#b6240f] text-white flex items-center justify-center font-mono text-[20px] shadow-2xl mb-2 animate-pulse">
                  ▶
                </div>
                <span className="font-mono text-[10px] text-white bg-[#1b1c18]/90 px-3 py-1 uppercase tracking-widest font-bold border border-white/20">
                  PLAYING LIVE STEM // {CHAPTERS[activeChapter].title}
                </span>
              </div>

              {/* Scrubber Timeline UI Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1b1c18] via-[#1b1c18]/90 to-transparent">
                <div className="w-full h-1.5 bg-[#444748]/50 rounded-full relative mb-3 cursor-pointer overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#b6240f] transition-all duration-500"
                    style={{ width: CHAPTERS[activeChapter].progress }}
                  />
                </div>
                <div className="flex items-center justify-between font-mono text-[10px] text-white">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[#b6240f] font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#b6240f] animate-ping" />
                      REC ● {isMainHovered ? "PLAYING" : "STANDBY"}
                    </span>
                    <span className="text-[#c4c7c7]">{CHAPTERS[activeChapter].timecode}</span>
                    <span className="text-[#444748]">|</span>
                    <span className="text-white uppercase font-bold">
                      {CHAPTERS[activeChapter].title}
                    </span>
                  </div>

                  {/* Equalizer Waveform bars on hover */}
                  <div className="flex items-center gap-1.5">
                    <div className="hidden sm:flex items-end gap-[2px] h-4">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 bg-[#b6240f] transition-all duration-300 ${
                            isMainHovered ? "animate-pulse" : "h-1"
                          }`}
                          style={{
                            height: isMainHovered ? `${Math.floor(Math.random() * 12) + 4}px` : "3px",
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-[#b6240f] font-bold">ACEScc REC709</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Chapter Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 font-mono text-[10px]">
              {CHAPTERS.map((chap, idx) => (
                <button
                  key={chap.title}
                  onClick={() => setActiveChapter(idx)}
                  className={`p-3 border text-left flex flex-col transition-all cursor-pointer ${
                    activeChapter === idx
                      ? "bg-[#1b1c18] text-white border-[#1b1c18] border-l-4 border-l-[#b6240f] shadow-md"
                      : "bg-[#fbf9f3] text-[#1b1c18] border-[#e4e2dd] hover:border-[#1b1c18]"
                  }`}
                >
                  <span className={activeChapter === idx ? "text-[#b6240f] font-bold" : "text-[#747878]"}>
                    {chap.time}
                  </span>
                  <span className="font-bold uppercase mt-1">{chap.title}</span>
                  <span className={activeChapter === idx ? "text-[#c4c7c7] text-[9px]" : "text-[#747878] text-[9px]"}>
                    {chap.sub}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Project Specification Breakdown (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between pt-2">
            <div>
              <span className="font-mono text-[10px] text-[#747878] tracking-widest uppercase font-bold">
                DIRECTORIAL DOCUMENTARY CUT
              </span>
              <h3
                className="text-[#1b1c18] uppercase leading-tight mt-1 mb-4 text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                The Architecture of Silence
              </h3>
              <p
                className="text-[#747878] text-sm leading-relaxed mb-6"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                A 38-minute deep-dive documentary exploring architectural acoustics and void spaces. We unified 18 hours of raw 6K footage into a tightly structured narrative arc that maintains retention while honoring festival cinema standards.
              </p>

              <div className="flex flex-col gap-2.5 border-t border-[#e4e2dd] pt-4 font-mono text-[10px]">
                <div className="flex justify-between border-b border-[#f0eee8] pb-1">
                  <span className="text-[#747878]">DIRECTOR:</span>
                  <span className="text-[#1b1c18] font-bold">M. VAN DER ROHE</span>
                </div>
                <div className="flex justify-between border-b border-[#f0eee8] pb-1">
                  <span className="text-[#747878]">TIMELINE CADENCE:</span>
                  <span className="text-[#1b1c18] font-bold">MICRO-REST / ACCELERATION</span>
                </div>
                <div className="flex justify-between border-b border-[#f0eee8] pb-1">
                  <span className="text-[#747878]">COLOR PIPELINE:</span>
                  <span className="text-[#1b1c18] font-bold">DaVinci ACES 1.3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#747878]">SOUND MIX:</span>
                  <span className="text-[#1b1c18] font-bold">5.1 CINEMATIC STEMS</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#e4e2dd] mt-6">
              <a
                href="#initiation"
                className="w-full py-3 bg-[#1b1c18] text-white font-mono text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-[#b6240f] transition-colors shadow-md"
              >
                <span>COMMISSION SIMILAR FEATURE</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Secondary 2-Column Split Projects with Cursor Hover Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SECONDARY_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              onMouseEnter={() => setActiveSecondary(proj)}
              onMouseLeave={() => setActiveSecondary(null)}
              className="flex flex-col p-6 bg-[#f5f3ed] border border-[#e4e2dd] group cursor-pointer hover:border-[#1b1c18] transition-all hover:shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-[#747878] mb-2">
                <span>{proj.tag}</span>
                <span className="text-[#b6240f] font-bold">{proj.ep}</span>
              </div>

              <h4
                className="text-[#1b1c18] uppercase text-2xl group-hover:text-[#b6240f] transition-colors font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {proj.title}
              </h4>

              <p
                className="text-[#747878] text-xs leading-relaxed mt-2 mb-6"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {proj.desc}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-[#e4e2dd] font-mono text-[10px]">
                <span className="text-[#1b1c18] font-bold">{proj.views}</span>
                <span className="text-[#b6240f] group-hover:translate-x-2 transition-transform font-bold">
                  PLAY PREVIEW →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Cursor-Follow Video Preview Card */}
        <div
          ref={previewRef}
          className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
          style={{
            width: "360px",
            height: "220px",
            willChange: "transform",
            display: activeSecondary ? "block" : "none",
          }}
        >
          <AnimatePresence mode="wait">
            {activeSecondary && (
              <motion.div
                key={activeSecondary.id}
                initial={{ scale: 0.85, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                className="w-full h-full bg-[#1b1c18] border border-[#1b1c18] shadow-2xl overflow-hidden flex flex-col border border-white/20"
              >
                {/* Media Container */}
                <div className="relative w-full flex-1 overflow-hidden">
                  <img
                    src={activeSecondary.image}
                    alt={activeSecondary.title}
                    className="w-full h-full object-cover grayscale contrast-125 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c18] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#1b1c18]/90 font-mono text-[9px] text-white uppercase font-bold border border-white/20">
                    [ PREVIEW STEM // {activeSecondary.id} ]
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 bg-[#b6240f] font-mono text-[9px] text-white uppercase font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    PLAYING
                  </div>
                </div>

                {/* Bottom Spec Bar */}
                <div className="w-full px-3 py-2 bg-[#1b1c18] border-t border-[#30312d] flex items-center justify-between font-mono text-[9px]">
                  <span className="text-[#b6240f] font-bold truncate max-w-[240px]">
                    {activeSecondary.title}
                  </span>
                  <span className="text-white">▶</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
