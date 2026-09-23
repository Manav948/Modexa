"use client";

import { motion } from "framer-motion";

export default function VideoEditingHero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-between bg-[#1b1c18] text-[#fbf9f3] overflow-hidden border-b border-[#30312d] select-none">
      {/* Background Full-Width Cinematic Media Plate */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/service_video_motion_1789796437874.png"
          alt="Cinematic Brutalist Film Frame"
          className="w-full h-full object-cover grayscale contrast-125 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c18] via-[#1b1c18]/60 to-[#1b1c18]/80" />
      </div>

      {/* Top HUD / Overlay Header Bar */}
      <div className="relative z-10 w-full border-b border-white/10 px-5 md:px-8 lg:px-12 py-4 bg-[#1b1c18]/70 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-y-2 font-mono text-[10px] tracking-widest uppercase text-[#c4c7c7]">
          <div className="flex items-center gap-3">
            <a
              href="/#services"
              className="hover:text-[#b6240f] transition-colors inline-flex items-center gap-1 font-bold text-white"
            >
              <span>← RETURN TO SERVICES</span>
            </a>
            <span className="text-[#444748]">/</span>
            <span className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-[#b6240f] animate-pulse" />
              <span className="text-[#b6240f] font-bold">VIDEO EDITING / 01</span>
            </span>
            <span className="hidden sm:inline text-[#444748]">|</span>
            <span className="hidden sm:inline font-mono">SMPTE: 00:01:24:08</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline">TIMEBASE: 24.000 FPS</span>
            <span className="hidden md:inline text-[#444748]">|</span>
            <span className="px-2 py-0.5 bg-[#b6240f] text-white font-bold">
              SHORT-FORM / LONG-FORM / MOTION
            </span>
            <span className="hidden lg:inline px-2 py-0.5 bg-white/10 text-white border border-white/20">
              4K PRORES 4444
            </span>
          </div>
        </div>
      </div>

      {/* Hero Central Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-5 md:px-8 lg:px-12 py-16 md:py-24 flex flex-col justify-center flex-1">
        <div className="max-w-4xl">
          {/* Sub-tag */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] px-2.5 py-1 bg-white/10 text-white tracking-widest font-semibold uppercase backdrop-blur-sm border border-white/10">
              CUT THE NOISE / KEEP THE STORY
            </span>
            <span className="font-mono text-[10px] text-[#b6240f] font-bold tracking-widest uppercase">
              —— RHYTHM → PACING → PURPOSE
            </span>
          </div>

          {/* Headline matching Reference Image with line-by-line word-by-word mask reveal */}
          <h1
            className="text-white uppercase leading-[0.92] tracking-tight mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(3.25rem, 7.5vw, 6.75rem)",
            }}
          >
            <div className="overflow-hidden inline-block pr-4">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] as const }}
                className="inline-block"
              >
                EVERY
              </motion.span>
            </div>
            {" "}
            <div className="overflow-hidden inline-block">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="inline-block"
              >
                CUT
              </motion.span>
            </div>
            <br />
            <div className="overflow-hidden inline-block">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                className="inline-block italic font-normal text-[#fbf9f3] lowercase tracking-normal"
                style={{ fontFamily: "'Newsreader', Georgia, serif" }}
              >
                changes the story.
              </motion.span>
            </div>
          </h1>

          {/* Sub-description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#c4c7c7] max-w-2xl text-base md:text-xl leading-relaxed mb-10"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Editing is more than putting clips together. It is rhythm, pacing, emotion and knowing what deserves to stay.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#selected-work"
              className="px-8 py-3.5 bg-[#b6240f] text-white font-mono text-[11px] tracking-widest uppercase font-bold hover:bg-[#fe573c] transition-colors inline-flex items-center gap-2 shadow-lg"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              <span>EXPLORE WORK</span>
              <span>↓</span>
            </a>
            <a
              href="#initiation"
              className="px-8 py-3.5 border border-white/30 hover:border-white bg-black/40 backdrop-blur-sm text-white font-mono text-[11px] tracking-widest uppercase transition-colors"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              START A PROJECT →
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom HUD Bar of Hero */}
      <div className="relative z-10 w-full border-t border-white/10 px-5 md:px-8 lg:px-12 py-3.5 bg-[#1b1c18]/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-y-2 font-mono text-[10px] text-[#747878]">
          <div className="flex items-center gap-3">
            <span className="text-[#b6240f] font-bold">[01 / CADENCE]</span>
            <span className="text-white font-bold uppercase tracking-wider">
              RHYTHM / PACING / STORY
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#c4c7c7] font-mono">
            <span>MOTION / SOUND / EDIT</span>
            <span>•</span>
            <span className="text-[#b6240f] font-bold">FINAL CUT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
