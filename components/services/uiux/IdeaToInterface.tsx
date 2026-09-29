"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUIUXProjectActions } from "./UIUXProjectProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function IdeaToInterface() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  // Stage element refs
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const stage4Ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { openProject } = useUIUXProjectActions();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Reveal Section Header
      const headingLines = headingRef.current?.querySelectorAll<HTMLElement>("[data-split-line]");
      if (headingLines && headingLines.length > 0) {
        gsap.fromTo(
          headingLines,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 86%",
              once: true,
            },
          }
        );
      }

      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // 2. Horizontal Progress Bar Scrub along Section
      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "bottom 85%",
              scrub: 0.8,
            },
          }
        );
      }

      // 3. Stage-by-Stage Progressive Scroll Reveals
      const stages = [
        { ref: stage1Ref.current, delay: 0 },
        { ref: stage2Ref.current, delay: 0.05 },
        { ref: stage3Ref.current, delay: 0.1 },
        { ref: stage4Ref.current, delay: 0.15 },
      ];

      stages.forEach(({ ref }) => {
        if (!ref) return;

        // Visual artifact reveal
        const visual = ref.querySelector<HTMLElement>("[data-stage-visual]");
        const text = ref.querySelector<HTMLElement>("[data-stage-text]");
        const line = ref.querySelector<HTMLElement>("[data-connector-line]");

        if (visual) {
          gsap.fromTo(
            visual,
            {
              clipPath: "inset(10% 0 10% 0)",
              opacity: 0,
              scale: 0.97,
              y: 25,
            },
            {
              clipPath: "inset(0% 0 0% 0)",
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.25,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ref,
                start: "top 82%",
                once: true,
              },
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        if (line) {
          gsap.fromTo(
            line,
            { scaleY: 0 },
            {
              scaleY: 1,
              transformOrigin: "top center",
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref,
                start: "top 80%",
                once: true,
              },
            }
          );
        }
      });

      // 4. Subtle Parallax for the Final Large Interface Visual (Desktop only)
      const isDesktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
      const stage4Visual = stage4Ref.current?.querySelector<HTMLElement>("[data-stage-visual]");
      if (isDesktop && stage4Visual) {
        gsap.to(stage4Visual, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: stage4Ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      // 5. Intelligent Video Lifecycle (Play only when in viewport)
      const videoEl = videoRef.current;
      let videoObserver: IntersectionObserver | null = null;
      if (videoEl) {
        videoObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                videoEl.play().catch(() => {});
              } else {
                videoEl.pause();
              }
            });
          },
          { threshold: 0.15 }
        );
        videoObserver.observe(videoEl);
      }

      return () => {
        videoObserver?.disconnect();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="idea-to-interface"
      className="relative w-full border-t border-[#E8E2D5] bg-[#F7F5EF] px-5 py-20 sm:px-8 md:py-28 lg:px-14 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Editorial Section Header */}
        <div className="mb-14 grid grid-cols-1 gap-8 md:mb-20 md:grid-cols-12 md:items-end lg:gap-12">
          <div className="md:col-span-7 lg:col-span-7">
            {/* Small label */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E7472E]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-[#E7472E]">
                05 / DESIGN PROCESS
              </span>
            </div>

            {/* Main Headline */}
            <h2
              ref={headingRef}
              className="font-display uppercase text-[#151515] leading-[0.88] tracking-[-0.05em] text-[clamp(2.75rem,8vw,5.5rem)]"
            >
              <span className="block overflow-hidden pb-1">
                <span data-split-line className="block">FROM IDEA</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span data-split-line className="block">TO INTERFACE.</span>
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-end md:col-span-5 lg:col-span-5">
            {/* Supporting text */}
            <p
              ref={textRef}
              className="font-sans text-[15px] leading-relaxed text-[#55534E] sm:text-[16px] md:max-w-md"
            >
              An interface starts with a problem, becomes a structure, and
              finally turns into something people can understand, use and remember.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#E8E2D5] pt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-[#55534E]">
              <span>METHOD: ART-DIRECTED CHOREOGRAPHY</span>
              <span className="text-[#E7472E]">4 CONTINUOUS PHASES</span>
            </div>
          </div>
        </div>

        {/* 
          CONTINUOUS EDITORIAL JOURNEY HEADER
          IDEA ───────── STRUCTURE ───────── INTERACTION ───────── INTERFACE
          Desktop horizontal progress track with animated vermilion runner
        */}
        <div className="mb-16 hidden md:block">
          <div className="relative mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#151515]">
            <div className="flex items-center gap-2">
              <span className="text-[#E7472E] font-bold">01</span>
              <span>IDEA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#E7472E] font-bold">02</span>
              <span>STRUCTURE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#E7472E] font-bold">03</span>
              <span>INTERACTION</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#E7472E] font-bold">04</span>
              <span>INTERFACE</span>
            </div>
          </div>

          {/* Master Connector Baseline & Progress Line */}
          <div className="relative h-[2px] w-full bg-[#E8E2D5]">
            <div
              ref={progressLineRef}
              className="absolute inset-0 h-full bg-[#E7472E]"
            />
            {/* Visual Milestones */}
            <span className="absolute left-0 -top-1 h-2.5 w-2.5 rounded-full border border-[#151515] bg-[#E7472E]" />
            <span className="absolute left-[33.3%] -top-1 h-2.5 w-2.5 rounded-full border border-[#151515] bg-[#FFFFFF]" />
            <span className="absolute left-[66.6%] -top-1 h-2.5 w-2.5 rounded-full border border-[#151515] bg-[#FFFFFF]" />
            <span className="absolute right-0 -top-1 h-2.5 w-2.5 rounded-full border border-[#151515] bg-[#151515]" />
          </div>
        </div>

        {/* 
          CONTINUOUS EDITORIAL COMPOSITION
          Asymmetric positioning, varied scales, overlapping supporting visuals,
          connecting lines, whitespace, and real UI assets.
        */}
        <div className="relative flex flex-col space-y-20 md:space-y-32">
          {/* ========================================================= */}
          {/* STAGE 01 — IDEA: Typography, Problem, Intent */}
          {/* ========================================================= */}
          <div
            ref={stage1Ref}
            className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center lg:gap-14"
          >
            <div data-stage-text className="md:col-span-5 lg:col-span-5">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#E7472E] font-bold mb-3">
                <span>STAGE 01</span>
                <span>//</span>
                <span>FOUNDATION & INTENT</span>
              </div>
              <h3 className="font-display text-[2rem] sm:text-[2.5rem] uppercase leading-[0.95] tracking-tight text-[#151515] mb-4">
                IDEA
              </h3>
              <p className="font-sans text-[14px] leading-relaxed text-[#55534E] mb-6">
                Every digital interface begins with intent. We define the typography,
                spatial rhythm, and content hierarchy before drawing a single button.
              </p>

              {/* Editorial Spec Callouts */}
              <div className="space-y-2 border-t border-[#E8E2D5] pt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-[#55534E]">
                <div className="flex items-center justify-between">
                  <span>TYPOGRAPHY SYSTEM</span>
                  <span className="text-[#151515] font-bold">SPACE GROTESK + INTER</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>SPATIAL BASE GRID</span>
                  <span className="text-[#151515] font-bold">8PT HARMONIC INTERVAL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>PROBLEM DEFINITION</span>
                  <span className="text-[#E7472E] font-bold">TASK CLARITY & FLOW</span>
                </div>
              </div>
            </div>

            {/* Stage 1 Visual — Real Editorial Layout Asset from /public/ui&ux/ui9.png */}
            <div className="relative md:col-span-7 lg:col-span-7">
              <div
                data-stage-visual
                className="relative overflow-hidden rounded-[2px] border border-[#E8E2D5] bg-[#FFFFFF] p-2.5 sm:p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              >
                <div className="mb-2 flex items-center justify-between border-b border-[#E8E2D5] pb-2 font-mono text-[8px] uppercase tracking-wider text-[#747878]">
                  <span>FIG 01 // TYPOGRAPHY & LAYOUT STUDY</span>
                  <span className="text-[#151515]">UI ARCHIVE 09</span>
                </div>

                <div className="relative h-[240px] sm:h-[320px] w-full overflow-hidden border border-[#E8E2D5] bg-[#F7F5EF]">
                  <Image
                    src="/ui%26ux/ui9.png"
                    alt="Design process: Typography and conceptual layout study"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    quality={65}
                    loading="lazy"
                    className="object-cover object-top"
                  />
                  {/* Visual Spec Overlay */}
                  <div className="pointer-events-none absolute bottom-3 left-3 bg-[#151515]/90 px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest text-white backdrop-blur-sm">
                    TYPE SPEC: CLARITY-FIRST HIERARCHY
                  </div>
                </div>
              </div>

              {/* Vertical connector toward Stage 2 */}
              <div
                data-connector-line
                className="hidden md:block absolute -bottom-24 left-[20%] h-24 w-[1px] bg-[#E8E2D5]"
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* STAGE 02 — STRUCTURE: Wireframe, Spatial Hierarchy */}
          {/* ========================================================= */}
          <div
            ref={stage2Ref}
            className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center lg:gap-14"
          >
            {/* Visual offset left / asymmetric */}
            <div className="order-2 md:order-1 relative md:col-span-7 lg:col-span-7">
              <div
                data-stage-visual
                className="relative overflow-hidden rounded-[2px] border border-[#E8E2D5] bg-[#FFFFFF] p-2.5 sm:p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              >
                <div className="mb-2 flex items-center justify-between border-b border-[#E8E2D5] pb-2 font-mono text-[8px] uppercase tracking-wider text-[#747878]">
                  <span>FIG 02 // SPATIAL ARCHITECTURE & WIREFRAME</span>
                  <span className="text-[#151515]">UI ARCHIVE 11</span>
                </div>

                <div className="relative h-[260px] sm:h-[340px] w-full overflow-hidden border border-[#E8E2D5] bg-[#F7F5EF]">
                  <Image
                    src="/ui%26ux/ui11.png"
                    alt="Design process: Structural layout and wireframe balance"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    quality={65}
                    loading="lazy"
                    className="object-cover object-top"
                  />
                  <div className="pointer-events-none absolute bottom-3 right-3 bg-[#151515]/90 px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest text-white backdrop-blur-sm">
                    STRUCTURAL GRID: 12-COLUMN MODULAR
                  </div>
                </div>
              </div>

              {/* Vertical connector toward Stage 3 */}
              <div
                data-connector-line
                className="hidden md:block absolute -bottom-24 right-[25%] h-24 w-[1px] bg-[#E8E2D5]"
              />
            </div>

            <div data-stage-text className="order-1 md:order-2 md:col-span-5 lg:col-span-5">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#E7472E] font-bold mb-3">
                <span>STAGE 02</span>
                <span>//</span>
                <span>SPATIAL ARCHITECTURE</span>
              </div>
              <h3 className="font-display text-[2rem] sm:text-[2.5rem] uppercase leading-[0.95] tracking-tight text-[#151515] mb-4">
                STRUCTURE
              </h3>
              <p className="font-sans text-[14px] leading-relaxed text-[#55534E] mb-6">
                Balancing information density against negative space. Organizing complex
                workflows into intuitive visual containers and structured pathways.
              </p>

              <div className="space-y-2 border-t border-[#E8E2D5] pt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-[#55534E]">
                <div className="flex items-center justify-between">
                  <span>LAYOUT SCAFFOLD</span>
                  <span className="text-[#151515] font-bold">12-COL ASYMMETRIC GRID</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>READABILITY DENSITY</span>
                  <span className="text-[#151515] font-bold">BALANCED WHITE SPACE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>NAVIGATION LOGIC</span>
                  <span className="text-[#E7472E] font-bold">DIRECT ACTION PATHS</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* STAGE 03 — INTERACTION: Motion & Feedback Cadence */}
          {/* ========================================================= */}
          <div
            ref={stage3Ref}
            className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center lg:gap-14"
          >
            <div data-stage-text className="md:col-span-5 lg:col-span-5">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#E7472E] font-bold mb-3">
                <span>STAGE 03</span>
                <span>//</span>
                <span>MOTION & FEEDBACK</span>
              </div>
              <h3 className="font-display text-[2rem] sm:text-[2.5rem] uppercase leading-[0.95] tracking-tight text-[#151515] mb-4">
                INTERACTION
              </h3>
              <p className="font-sans text-[14px] leading-relaxed text-[#55534E] mb-6">
                Motion gives life to structure. Choreographing feedback cadence,
                micro-transitions, and responsive touchpoints so interactions feel
                direct, tactile, and effortless.
              </p>

              <div className="space-y-2 border-t border-[#E8E2D5] pt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-[#55534E]">
                <div className="flex items-center justify-between">
                  <span>EASING CURVE</span>
                  <span className="text-[#151515] font-bold">CUBIC-BEZIER(0.16, 1, 0.3, 1)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>FEEDBACK CADENCE</span>
                  <span className="text-[#151515] font-bold">REAL-TIME TACTILE ACCORD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>FRAME RATE</span>
                  <span className="text-[#E7472E] font-bold">60FPS LIQUID PERFORMANCE</span>
                </div>
              </div>
            </div>

            {/* Stage 3 Visual — Live Motion Study using /videos/video1.mp4 */}
            <div className="relative md:col-span-7 lg:col-span-7">
              <div
                data-stage-visual
                className="relative overflow-hidden rounded-[2px] border border-[#E8E2D5] bg-[#FFFFFF] p-2.5 sm:p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              >
                <div className="mb-2 flex items-center justify-between border-b border-[#E8E2D5] pb-2 font-mono text-[8px] uppercase tracking-wider text-[#747878]">
                  <span>FIG 03 // LIVE KINETIC INTERACTION STUDY</span>
                  <span className="text-[#E7472E] font-bold">LOOPING MOTION REVEAL</span>
                </div>

                <div className="relative h-[240px] sm:h-[320px] w-full overflow-hidden border border-[#E8E2D5] bg-[#0E1015]">
                  <video
                    ref={videoRef}
                    src="/videos/video1.mp4"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover object-center"
                  />
                  {/* Live Motion Status Tag */}
                  <div className="pointer-events-none absolute top-3 right-3 flex items-center gap-1.5 bg-[#151515]/90 px-2.5 py-1 font-mono text-[8px] uppercase tracking-widest text-white backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E7472E] animate-pulse" />
                    <span>MOTION STUDY // LIVE 60FPS</span>
                  </div>
                </div>
              </div>

              {/* Vertical connector toward Stage 4 */}
              <div
                data-connector-line
                className="hidden md:block absolute -bottom-24 left-[30%] h-24 w-[1px] bg-[#E8E2D5]"
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* STAGE 04 — INTERFACE: The Final Experience (Dominant Visual) */}
          {/* ========================================================= */}
          <div
            ref={stage4Ref}
            className="relative pt-6 sm:pt-10"
          >
            {/* Top Anchor Headline for Final Stage */}
            <div
              data-stage-text
              className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#E8E2D5] pb-6"
            >
              <div>
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#E7472E] font-bold mb-3">
                  <span>STAGE 04</span>
                  <span>//</span>
                  <span>CULMINATION & EXPERIENCE</span>
                </div>
                <h3 className="font-display text-[2.4rem] sm:text-[3.2rem] md:text-[4rem] uppercase leading-[0.9] tracking-tight text-[#151515]">
                  FINAL INTERFACE
                </h3>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <p className="font-sans text-[14px] leading-relaxed text-[#55534E] max-w-md md:text-right">
                  Where concept, structure, and kinetic motion unite into a singular,
                  memorable digital experience that users trust and enjoy.
                </p>
                <div className="mt-3 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#55534E]">
                  <span>RESOLUTION: COMPLETE DESIGN SYSTEM</span>
                  <span className="text-[#E7472E] font-bold">FULL FIDELITY</span>
                </div>
              </div>
            </div>

            {/* 
              The Largest and Strongest Final UI Visual
              Dominant physical presence, high-resolution visual from /public/ui&ux/ui4.jpg
            */}
            <div
              data-stage-visual
              className="relative mx-auto w-full overflow-hidden rounded-[2px] border border-[#E8E2D5] bg-[#FFFFFF] p-3 sm:p-5 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
            >
              {/* Studio Telemetry Bar */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E2D5] pb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#55534E]">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 border border-[#151515] bg-[#151515]" />
                  <span className="font-bold text-[#151515]">FINAL INTERFACE SPEC // CANDIDATE 04</span>
                  <span className="hidden sm:inline text-[#747878]">•</span>
                  <span className="hidden sm:inline text-[#747878]">3840 × 15766 PX MASTER FILE</span>
                </div>

                <button
                  type="button"
                  onClick={() => openProject("ui-04")}
                  className="group inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#151515] transition-colors hover:text-[#E7472E]"
                  title="Inspect full uncropped interface design"
                >
                  <span>INSPECT FULL INTERFACE</span>
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#E7472E]">
                    ↗
                  </span>
                </button>
              </div>

              {/* The Dominant Final UI Image Container */}
              <div
                className="relative w-full overflow-hidden border border-[#E8E2D5] bg-[#0A0C10]"
                style={{
                  aspectRatio: "16 / 9",
                  minHeight: "360px",
                  maxHeight: "720px",
                }}
              >
                <Image
                  src="/ui%26ux/ui4.jpg"
                  alt="Final complete UI/UX interface design"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 95vw, 1360px"
                  quality={65}
                  loading="lazy"
                  className="object-cover object-top"
                />

                {/* Corner registration marks */}
                <div className="pointer-events-none absolute top-2 left-2 font-mono text-[8px] text-white/40">
                  ┌ DESIGN CANDIDATE 04
                </div>
                <div className="pointer-events-none absolute top-2 right-2 font-mono text-[8px] text-white/40">
                  SYSTEM COMPLETE ┐
                </div>
                <div className="pointer-events-none absolute bottom-2 left-2 font-mono text-[8px] text-white/40">
                  └ PRODUCTION READY
                </div>
                <div className="pointer-events-none absolute bottom-2 right-2 font-mono text-[8px] text-white/40">
                  MODEXA ARCHIVE ┘
                </div>
              </div>

              {/* Final Architecture Legend Bar */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8E2D5] pt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#55534E]">
                <div className="flex items-center gap-3">
                  <span className="text-[#E7472E] font-bold">ALL DISCIPLINES RESOLVED</span>
                  <span>•</span>
                  <span>INTENT → STRUCTURE → MOTION → INTERFACE</span>
                </div>
                <div className="text-[#151515]">
                  MODEXA STUDIO PRACTICE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
