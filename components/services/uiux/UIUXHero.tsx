"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function UIUXHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Label fade
      gsap.fromTo(".uiux-label",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.05 }
      );

      // Line-by-line masked reveal
      const lines = sectionRef.current?.querySelectorAll(".hero-line");
      if (lines) {
        gsap.fromTo(lines,
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.25, stagger: 0.1, ease: "power3.out", delay: 0.15 }
        );
      }

      // Body + tags fade up
      gsap.fromTo(".uiux-body-right",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power2.out", delay: 0.55 }
      );

      // Dashboard screen — clip-path reveal from bottom
      gsap.fromTo(screenRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.4, ease: "power3.out", delay: 0.6 }
      );

      gsap.fromTo(imageRef.current,
        { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
        { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.45 }
      );

      // Floating dark card slides in from right
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: 30, y: -10 },
        { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power3.out", delay: 1.0 }
      );

      // Subtle parallax on screen while scrolling
      gsap.to(screenRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Mouse tilt on floating card
      const onMouseMove = (e: MouseEvent) => {
        if (!cardRef.current || !sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const dy = (e.clientY - rect.top - rect.height / 2) / rect.height;
        gsap.to(cardRef.current, { x: dx * 14, y: dy * 10, duration: 0.8, ease: "power2.out" });
      };
      sectionRef.current?.addEventListener("mousemove", onMouseMove, { passive: true });
      return () => sectionRef.current?.removeEventListener("mousemove", onMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="uiux-hero"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#f7f5ef" }}
    >
      {/* ── Top editorial metadata bar ── */}
      <div
        className="uiux-label w-full border-b px-5 md:px-8 lg:px-14 py-2 flex flex-wrap items-center gap-6 justify-between font-mono text-[9px] uppercase tracking-widest"
        style={{ borderColor: "#E8E2D5", fontFamily: "'DM Mono', monospace", color: "#55534E" }}
      >
        <div className="flex items-center gap-6">
          <span className="text-[#E7472E] font-bold">UI/UX DESIGN / 02</span>
          <span className="hidden md:inline">CLARITY / STRUCTURE</span>
          <span className="hidden md:inline">INTERACTION / SYSTEMS</span>
        </div>
        <div className="flex items-center gap-6 hidden lg:flex">
          <span>[DIGITAL PRODUCTS / WEB]</span>
          <span className="text-[#E7472E]">[RESPONSIVE / TACTILE]</span>
        </div>
      </div>

      {/* ── Secondary label row ── */}
      <div
        className="uiux-label w-full border-b px-5 md:px-8 lg:px-14 py-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest"
        style={{ borderColor: "#E8E2D5", fontFamily: "'DM Mono', monospace", color: "#55534E" }}
      >
        <span className="border border-[#E8E2D5] px-2 py-0.5">CLARITY → INTERACTION</span>
        <span className="hidden md:inline">DIGITAL PRODUCTS / WEB</span>
      </div>

      {/* ── Main hero content ── */}
      <div className="relative px-5 md:px-8 lg:px-14 pt-8 pb-0 max-w-[1400px] mx-auto w-full">

        {/* Small label above heading */}
        <div
          className="uiux-label font-mono text-[9px] uppercase tracking-widest text-[#E7472E] font-bold mb-3"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          UI/UX DESIGN / DIGITAL EXPERIENCES
        </div>

        {/* ── Two-column row: HUGE heading left + body right ── */}
        <div className="grid grid-cols-12 gap-6 items-end">
          {/* LEFT: The mega heading */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-7">
            <div className="flex flex-col">
              {/* WHERE */}
              <div className="overflow-hidden">
                <div
                  className="hero-line leading-[0.88] tracking-tight"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(3.75rem, 8.5vw, 9rem)",
                    fontWeight: 700,
                    color: "#151515",
                    letterSpacing: "-0.03em",
                  }}
                >
                  INTERFACES
                </div>
              </div>
              {/* STRUCTURE */}
              <div className="overflow-hidden">
                <div
                  className="hero-line leading-[0.88] tracking-tight"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(3.75rem, 8.5vw, 9rem)",
                    fontWeight: 700,
                    color: "#151515",
                    letterSpacing: "-0.03em",
                  }}
                >
                  BUILT TO FEEL
                </div>
              </div>
              {/* meets — italic serif, smaller */}
              <div className="overflow-hidden">
                <div
                  className="hero-line leading-[1.0]"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(3rem, 6.5vw, 7rem)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#55534E",
                    letterSpacing: "-0.01em",
                  }}
                >
                  as good as
                </div>
              </div>
              {/* INTERACTION. */}
              <div className="overflow-hidden">
                <div
                  className="hero-line leading-[0.88] tracking-tight"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(2.75rem, 6vw, 6.5rem)",
                    fontWeight: 700,
                    color: "#151515",
                    letterSpacing: "-0.03em",
                  }}
                >
                  THEY WORK
                  <span style={{ color: "#E7472E" }}>.</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: image, body copy, and tags */}
          <div className="uiux-body-right col-span-12 lg:col-span-5 xl:col-span-5 flex flex-col justify-end pt-8 lg:pt-0">
            <div ref={imageRef} className="relative aspect-[4/3] w-full overflow-hidden border" style={{ borderColor: "#E8E2D5" }}>
              <Image
                src="/images/service_ui_ux_1789796467059.png"
                alt="Interface design system displayed on a studio monitor"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#151515]/90 px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-white" style={{ fontFamily: "'DM Mono', monospace" }}>
                <span>FIELD STUDY / 01</span>
                <span className="text-[#E7472E]">LIVE SYSTEM</span>
              </div>
            </div>
            <p
              className="text-[#55534E] text-sm leading-relaxed max-w-sm mt-5 mb-5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Interfaces with structure, rhythm, and tactile intent.
            </p>
            {/* Tags */}
            <div
              className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-widest"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <span className="text-[#55534E]">DESIGN PROCESS:</span>
              {["FEEL UX", "SYSTEMS", "INTERACTION"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 border text-[#151515] font-bold hover:border-[#E7472E] hover:text-[#E7472E] transition-colors cursor-default"
                  style={{ borderColor: "#E8E2D5" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Dashboard UI screenshot row ── */}
      <div className="relative w-full mt-6">
        {/* Thin border line at top */}
        <div className="w-full border-t" style={{ borderColor: "#E8E2D5" }}>
          {/* Playbar chrome meta */}
          <div
            className="px-5 md:px-8 lg:px-14 py-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest"
            style={{ fontFamily: "'DM Mono', monospace", color: "#55534E", backgroundColor: "#f0ede6" }}
          >
            <div className="flex items-center gap-4">
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E7472E" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E8E2D5" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#E8E2D5" }} />
              </span>
              <span>CANVAS 01 ARCH/v_COPY — v.1.13.4</span>
            </div>
            <div className="flex items-center gap-4">
              <span>STATE — PROGRESS:LIVE</span>
              <span className="border px-2 py-0.5" style={{ borderColor: "#E8E2D5" }}>SELECTED WORK</span>
            </div>
          </div>
        </div>

        {/* The main screen composition */}
        <div ref={screenRef} className="relative w-full flex" style={{ backgroundColor: "#f0ede6" }}>
          {/* Left panel — sidebar list */}
          <div
            className="hidden lg:flex flex-col border-r"
            style={{ minWidth: "220px", backgroundColor: "#f7f5ef", borderColor: "#E8E2D5" }}
          >
            <div className="p-4 border-b" style={{ borderColor: "#E8E2D5" }}>
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#55534E] mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>
                PRIMARY MEDIA
              </div>
              {[
                { label: "01 / MATRIX ATRIUM", active: true },
                { label: "02 / TYPOGRAPHIC ATLAS", active: false },
                { label: "03 / TOPOLOGY RENDER", active: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-2 border-b font-mono text-[9px] uppercase"
                  style={{ borderColor: "#E8E2D5", fontFamily: "'DM Mono', monospace", color: item.active ? "#151515" : "#55534E" }}
                >
                  <span>{item.label}</span>
                  {item.active && <span className="w-2 h-2" style={{ backgroundColor: "#E7472E" }} />}
                </div>
              ))}
            </div>
            <div className="p-4 mt-auto border-t text-[9px] font-mono uppercase" style={{ borderColor: "#E8E2D5", fontFamily: "'DM Mono', monospace", color: "#55534E" }}>
              <div>BINARY CACHE: 0.12.88</div>
              <div>INTERACTION: READY</div>
            </div>
          </div>

          {/* CENTER: waveform chart */}
          <div className="flex-1 relative border-r" style={{ borderColor: "#E8E2D5" }}>
            <div
              className="px-4 py-2 border-b font-mono text-[9px] uppercase tracking-widest flex items-center justify-between"
              style={{ borderColor: "#E8E2D5", fontFamily: "'DM Mono', monospace", color: "#55534E" }}
            >
              <span>PALLATINI FREQUENCY // LIVE SAMPLE</span>
              <span className="text-[#E7472E] font-bold">TIME 0.001</span>
            </div>
            {/* SVG Waveform */}
            <div className="relative w-full" style={{ height: "160px", padding: "16px 24px" }}>
              <svg viewBox="0 0 800 120" className="w-full h-full" preserveAspectRatio="none">
                <polyline
                  points="0,60 60,60 80,20 100,100 120,40 150,90 180,50 220,75 260,60 300,15 330,90 360,55 400,70 440,30 470,85 510,60 550,45 590,80 630,60 670,50 720,65 760,60 800,60"
                  fill="none"
                  stroke="#151515"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Metrics row */}
            <div
              className="flex items-center border-t"
              style={{ borderColor: "#E8E2D5" }}
            >
              {[
                { label: "FPX LOCK", value: "88.90" },
                { label: "GEO ROUGH", value: "1.808" },
                { label: "COHERENCE", value: "88 ACTS" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="flex-1 px-4 py-3 border-r font-mono text-[9px] uppercase"
                  style={{ borderColor: "#E8E2D5", fontFamily: "'DM Mono', monospace" }}
                >
                  <div className="text-[#55534E] mb-1">{m.label}</div>
                  <div className="text-[#151515] font-bold text-sm">{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: description panel */}
          <div className="hidden xl:flex flex-col" style={{ minWidth: "240px" }}>
            <div className="p-4 border-b" style={{ borderColor: "#E8E2D5" }}>
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#55534E] mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                SPATIAL STRUCTURE
              </div>
              <p className="text-[#55534E] text-xs leading-snug" style={{ fontFamily: "'Inter', sans-serif" }}>
                Zero non-semantic layout erasures. Modular composition geometry adhering to flow constraints.
              </p>
            </div>
          </div>

          {/* FLOATING dark card (overlapping right edge) */}
          <div
            ref={cardRef}
            className="absolute right-4 -bottom-8 z-20 hidden shadow-2xl md:block md:right-8"
            style={{ width: "clamp(220px, 22vw, 280px)" }}
          >
            <div style={{ backgroundColor: "#151515" }}>
              {/* Card top bar */}
              <div
                className="px-3 py-2 border-b font-mono text-[8px] uppercase tracking-wider flex items-center justify-between"
                style={{ borderColor: "rgba(255,255,255,0.08)", fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.45)" }}
              >
                <span>ELEMENT_ARCH01 // CRAFT</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#E7472E" }} />
              </div>
              {/* Card tag */}
              <div className="px-3 pt-3 pb-1">
                <span
                  className="font-mono text-[8px] uppercase tracking-widest font-bold"
                  style={{ fontFamily: "'DM Mono', monospace", color: "#E7472E" }}
                >
                  01 / TACTILE ELEMENT
                </span>
              </div>
              {/* Card quote */}
              <div className="px-3 pb-3">
                <p
                  className="text-white leading-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 400, fontStyle: "italic" }}
                >
                  &quot;Gesture-first tactile feedback with physical momentum damping.&quot;
                </p>
              </div>
              {/* Progress bar */}
              <div className="px-3 pb-3">
                <div className="w-full h-1 bg-[rgba(255,255,255,0.1)] rounded-none">
                  <div className="h-1 w-3/4" style={{ backgroundColor: "#E7472E" }} />
                </div>
              </div>
              {/* Footer */}
              <div
                className="px-3 pb-3 flex items-center justify-between font-mono text-[8px] uppercase"
                style={{ fontFamily: "'DM Mono', monospace", color: "rgba(255,255,255,0.4)" }}
              >
                <span>OPS.ML 110.14</span>
                <a
                  href="#"
                  className="text-white font-bold hover:text-[#E7472E] transition-colors"
                >
                  READY →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
