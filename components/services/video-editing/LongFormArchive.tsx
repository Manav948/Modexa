"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const CHAPTERS = [
  { time: "00:00 — 04:12", title: "I. PROLOGUE", sub: "Cold opening & Thesis" },
  { time: "04:12 — 18:40", title: "II. THE MONOLITH", sub: "Investigation & Archive Cuts" },
  { time: "18:40 — 38:10", title: "III. RESONANCE", sub: "Culmination & Outro" },
];

export default function LongFormArchive() {
  const [activeChapter, setActiveChapter] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section
      id="long-form"
      className="w-full px-5 md:px-8 lg:px-12 py-24 border-t"
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
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 400,
              }}
            >
              Long Form
            </h2>
          </div>
          <p
            className="text-[#747878] max-w-md font-sans text-sm md:text-base leading-relaxed"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Long-form editing built around clarity, narrative momentum, and sustained viewer immersion across YouTube, keynotes, and documentary pieces.
          </p>
        </div>

        {/* Heroic Featured Project Player Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#f5f3ed] p-6 border border-[#e4e2dd] mb-16">
          {/* Video Player Visual Mockup (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative aspect-video w-full bg-[#1b1c18] overflow-hidden group border border-[#e4e2dd]">
              <img
                src="/images/work_arclab_spatial_1789796381832.png"
                alt="The Architecture of Silence Documentary"
                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Scrubber Timeline UI Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1b1c18] via-[#1b1c18]/80 to-transparent">
                <div className="w-full h-1 bg-[#444748]/50 rounded-full relative mb-3 cursor-pointer">
                  <div className="absolute top-0 left-0 h-full w-2/5 bg-[#b6240f]" />
                  <div className="absolute top-1/2 left-2/5 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md" />
                </div>
                <div className="flex items-center justify-between font-mono text-[10px] text-white">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-[#b6240f] transition-colors cursor-pointer text-sm font-bold"
                    >
                      {isPlaying ? "❚❚ PAUSE" : "▶ PLAY"}
                    </button>
                    <span className="text-[#c4c7c7]">14:32 / 38:10</span>
                    <span className="text-[#444748]">|</span>
                    <span className="text-white uppercase font-bold">
                      {CHAPTERS[activeChapter].title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-[#b6240f] font-bold">ACEScc REC709</span>
                    <span className="text-white">4K MASTER</span>
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
                      ? "bg-[#1b1c18] text-white border-[#1b1c18] border-l-4 border-l-[#b6240f]"
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
                className="text-[#1b1c18] uppercase leading-tight mt-1 mb-4 text-2xl md:text-3xl"
                style={{ fontFamily: "'Newsreader', Georgia, serif", fontWeight: 400 }}
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

        {/* Secondary 2-Column Split Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 01 */}
          <div className="flex flex-col p-6 bg-[#f5f3ed] border border-[#e4e2dd] group cursor-pointer hover:border-[#1b1c18] transition-colors">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#747878] mb-2">
              <span>INTERVIEW ESSAY // 48 MIN</span>
              <span className="text-[#b6240f] font-bold">EPISODE 04</span>
            </div>
            <h4
              className="text-[#1b1c18] uppercase text-2xl group-hover:text-[#b6240f] transition-colors"
              style={{ fontFamily: "'Newsreader', Georgia, serif" }}
            >
              DISPATCH / 04 — The Specialist Dialogue
            </h4>
            <p className="text-[#747878] text-xs leading-relaxed mt-2 mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Dual-camera high-level philosophical discourse. Seamless multi-cam switching governed by micro-reactions, custom animated slide-deck inserts, and noise-isolated vocal warmth.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-[#e4e2dd] font-mono text-[10px]">
              <span className="text-[#1b1c18] font-bold">1.2M VIEWS • 54% AVG RETENTION</span>
              <span className="text-[#b6240f] group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Project 02 */}
          <div className="flex flex-col p-6 bg-[#f5f3ed] border border-[#e4e2dd] group cursor-pointer hover:border-[#1b1c18] transition-colors">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#747878] mb-2">
              <span>KEYNOTE EDIT // 32 MIN</span>
              <span className="text-[#b6240f] font-bold">ANNUAL FORUM</span>
            </div>
            <h4
              className="text-[#1b1c18] uppercase text-2xl group-hover:text-[#b6240f] transition-colors"
              style={{ fontFamily: "'Newsreader', Georgia, serif" }}
            >
              DESIGN CADENCE — Keynote &amp; Deep Dive
            </h4>
            <p className="text-[#747878] text-xs leading-relaxed mt-2 mb-6" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Technical engineering keynote edited with cinematic pacing. Screen-recording zooms, motion-tracked annotations, and rhythmically synced transitions that never let attention sag.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-[#e4e2dd] font-mono text-[10px]">
              <span className="text-[#1b1c18] font-bold">PRORES MASTER ARCHIVE</span>
              <span className="text-[#b6240f] group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
