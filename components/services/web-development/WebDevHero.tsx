"use client";

import AtmosphericBackground from "./AtmosphericBackground";

export default function WebDevHero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative w-full min-h-[94vh] lg:min-h-screen bg-[#000000] text-[#ffffff] flex flex-col justify-between overflow-hidden pt-28 pb-10 px-5 md:px-10 lg:px-16 select-none"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Living Atmospheric Canvas + Multi-layer smoke/light */}
      <AtmosphericBackground />

      {/* Top Telemetry Ribbon */}
      <div
        className="relative z-10 w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-b border-white/10 pb-4 font-mono text-[10px] md:text-[11px] tracking-widest text-white/60 uppercase"
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e7472e] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e7472e]" />
          </span>
          <span className="text-white font-medium">WEB DEVELOPMENT / 04</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-white/50">
          <span>RUNTIME: NEXT.JS / REACT / TS</span>
          <span>RESPONSIVE BY DESIGN</span>
        </div>

        <div className="flex items-center gap-2 text-white/70">
          <span>INTERACTIVE WEB</span>
          <span className="text-[#e7472e]">●</span>
          <span>DESIGN / CODE / DELIVERY</span>
        </div>
      </div>

      {/* Hero Monumental Headline & Narrative Engine */}
      <div className="relative z-10 my-auto py-10 lg:py-16 max-w-5xl">
        {/* Discipline Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-white/5 border border-white/15 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#ffdad4]">
          <span>WEB DEVELOPMENT</span>
          <span className="opacity-40">/</span>
          <span>DESIGN + TECHNOLOGY</span>
        </div>

        {/* H1 Headline */}
        <h1
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[88px] uppercase tracking-tight leading-[0.92] text-white mb-6"
          style={{
            textShadow: "0 0 50px rgba(255,255,255,0.18), 0 0 90px rgba(255,255,255,0.08)",
          }}
        >
          WE BUILD<br />
          DIGITAL<br />
          <span
            className="font-editorial italic font-normal text-[#f0eee8] tracking-normal lowercase pr-3"
            style={{ fontFamily: "'Newsreader', Georgia, serif" }}
          >
            experiences
          </span>
          .
        </h1>

        {/* Supporting Editorial Body */}
        <p className="font-sans text-sm sm:text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
          Websites and digital products built where design, interaction and technology meet.
        </p>

        {/* Physical CTAs */}
        <div className="flex flex-wrap items-center gap-4 mt-10">
          <a
            href="#ledger"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("ledger");
            }}
            className="inline-flex items-center justify-center px-6 py-3.5 bg-[#e7472e] text-white font-mono text-xs uppercase tracking-wider hover:bg-[#b6240f] transition-all duration-300 shadow-[0_0_25px_rgba(231,71,46,0.35)]"
          >
            START A PROJECT →
          </a>

          <a
            href="#stack"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("stack");
            }}
            className="inline-flex items-center justify-center px-6 py-3.5 border border-white/25 text-white font-mono text-xs uppercase tracking-wider hover:border-white hover:bg-white/10 transition-all duration-300"
          >
            EXPLORE WORK
          </a>
        </div>
      </div>

      {/* Hero Bottom Ribbon & Kinetic Scroll Prompt */}
      <div
        className="relative z-10 w-full flex justify-between items-end border-t border-white/10 pt-4 font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-white/60"
      >
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="hidden sm:inline">PARIS 48.8566° N</span>
          <span className="hidden sm:inline opacity-30">/</span>
          <span className="hidden sm:inline">NYC 40.7128° W</span>
          <span className="hidden md:inline opacity-30">/</span>
          <span>DESIGN / INTERACTION / TECHNOLOGY</span>
        </div>

        <button
          onClick={() => scrollToSection("stack")}
          className="flex items-center gap-2.5 group cursor-pointer text-left bg-transparent border-none p-0"
        >
          <span className="text-white/80 group-hover:text-[#ffdad4] transition-colors">
            SCROLL TO EXPLORE
          </span>
          <div className="w-8 h-px bg-white/30 relative overflow-hidden">
            <div className="w-2.5 h-full bg-[#e7472e] absolute top-0 left-0 animate-pulse" />
          </div>
        </button>
      </div>
    </section>
  );
}
