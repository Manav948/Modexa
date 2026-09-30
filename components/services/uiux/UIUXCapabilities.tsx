"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUIUXProjectActions } from "./UIUXProjectProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CapabilityItem {
  id: string;
  num: string;
  title: string;
  category: string;
  desc: string;
  targetId: "primary" | "secondary" | "mobile" | "detail";
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "structure",
    num: "01",
    title: "STRUCTURE",
    category: "SPATIAL TOPOLOGY",
    desc: "12-column modular scaffolds, calculated white space and content hierarchy.",
    targetId: "primary",
  },
  {
    id: "interface",
    num: "02",
    title: "INTERFACE",
    category: "VISUAL LANGUAGE",
    desc: "Harmonic typography scales, contrast calibration and purposeful color systems.",
    targetId: "primary",
  },
  {
    id: "responsive",
    num: "03",
    title: "RESPONSIVE",
    category: "VIEWPORT DYNAMICS",
    desc: "Adaptive layouts crafted for high-density mobile screens and wide desktop displays.",
    targetId: "mobile",
  },
  {
    id: "interaction",
    num: "04",
    title: "INTERACTION",
    category: "FEEDBACK CADENCE",
    desc: "Micro-gestures, tactile state transitions and 60fps kinetic motion.",
    targetId: "secondary",
  },
  {
    id: "systems",
    num: "05",
    title: "SYSTEMS",
    category: "DESIGN TOKENS",
    desc: "Scalable component libraries, design tokens and consistent multi-platform foundations.",
    targetId: "detail",
  },
  {
    id: "prototype",
    num: "06",
    title: "PROTOTYPE",
    category: "TANGIBLE TESTING",
    desc: "High-fidelity interactive models validating user workflows before engineering.",
    targetId: "mobile",
  },
];

const CAPABILITY_INDEX = [
  { id: "ui", label: "UI DESIGN", targetId: "primary" },
  { id: "ux", label: "UX DESIGN", targetId: "primary" },
  { id: "web", label: "WEB", targetId: "secondary" },
  { id: "mobile", label: "MOBILE", targetId: "mobile" },
  { id: "systems", label: "SYSTEMS", targetId: "detail" },
  { id: "prototyping", label: "PROTOTYPING", targetId: "mobile" },
  { id: "interaction", label: "INTERACTION", targetId: "secondary" },
];

export default function UIUXCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const exhibitionStageRef = useRef<HTMLDivElement>(null);

  // Exhibition Visual Layer Refs
  const primaryCardRef = useRef<HTMLDivElement>(null);
  const secondaryCardRef = useRef<HTMLDivElement>(null);
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const detailCardRef = useRef<HTMLDivElement>(null);
  const annotationLayerRef = useRef<HTMLDivElement>(null);
  const indexRowRef = useRef<HTMLDivElement>(null);

  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);
  const { openProject } = useUIUXProjectActions();

  useEffect(() => {
    const section = sectionRef.current;
    const stage = exhibitionStageRef.current;
    if (!section || !stage) return;

    const ctx = gsap.context(() => {
      // 1. Heading line-by-line reveal
      const headingLines = headingRef.current?.querySelectorAll<HTMLElement>("[data-split-line]");
      if (headingLines && headingLines.length > 0) {
        gsap.fromTo(
          headingLines,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 86%",
              once: true,
            },
          }
        );
      }

      // Supporting Copy reveal
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
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

      // 2. Primary Dominant Visual reveal (clip-path + subtle scale)
      if (primaryCardRef.current) {
        gsap.fromTo(
          primaryCardRef.current,
          {
            clipPath: "inset(12% 0% 12% 0%)",
            opacity: 0,
            scale: 1.03,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            scale: 1,
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: primaryCardRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // 3. Secondary & Floating Visuals entrance
      const secondaryCards = [
        secondaryCardRef.current,
        mobileCardRef.current,
        detailCardRef.current,
      ].filter((el): el is HTMLDivElement => el !== null);

      if (secondaryCards.length > 0) {
        gsap.fromTo(
          secondaryCards,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stage,
              start: "top 78%",
              once: true,
            },
          }
        );
      }

      // 4. Progressively draw hairline annotation connector lines
      const connectors = stage.querySelectorAll<HTMLElement>("[data-connector-hairline]");
      if (connectors.length > 0) {
        gsap.fromTo(
          connectors,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stage,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // 5. Minimal Bottom Capability Index entrance
      if (indexRowRef.current) {
        gsap.fromTo(
          indexRowRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: indexRowRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }

      // 6. Desktop Interaction: GSAP quickTo Physical Depth on Mouse Move
      const isDesktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
      if (isDesktop) {
        // Subtle layered scroll parallax
        if (primaryCardRef.current) {
          gsap.to(primaryCardRef.current, {
            y: -15,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
        if (secondaryCardRef.current) {
          gsap.to(secondaryCardRef.current, {
            y: -26,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
        if (mobileCardRef.current) {
          gsap.to(mobileCardRef.current, {
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.3,
            },
          });
        }
        if (annotationLayerRef.current) {
          gsap.to(annotationLayerRef.current, {
            y: -8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          });
        }

        // Pointer inertia setters (Direct transforms, zero React re-renders)
        const primaryQuickX = primaryCardRef.current
          ? gsap.quickTo(primaryCardRef.current, "x", { duration: 0.7, ease: "power2.out" })
          : null;
        const primaryQuickY = primaryCardRef.current
          ? gsap.quickTo(primaryCardRef.current, "y", { duration: 0.7, ease: "power2.out" })
          : null;

        const secondaryQuickX = secondaryCardRef.current
          ? gsap.quickTo(secondaryCardRef.current, "x", { duration: 0.85, ease: "power2.out" })
          : null;
        const secondaryQuickY = secondaryCardRef.current
          ? gsap.quickTo(secondaryCardRef.current, "y", { duration: 0.85, ease: "power2.out" })
          : null;

        const mobileQuickX = mobileCardRef.current
          ? gsap.quickTo(mobileCardRef.current, "x", { duration: 0.75, ease: "power2.out" })
          : null;
        const mobileQuickY = mobileCardRef.current
          ? gsap.quickTo(mobileCardRef.current, "y", { duration: 0.75, ease: "power2.out" })
          : null;

        const detailQuickX = detailCardRef.current
          ? gsap.quickTo(detailCardRef.current, "x", { duration: 0.9, ease: "power2.out" })
          : null;
        const detailQuickY = detailCardRef.current
          ? gsap.quickTo(detailCardRef.current, "y", { duration: 0.9, ease: "power2.out" })
          : null;

        const onPointerMove = (e: MouseEvent) => {
          const rect = stage.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;

          // Controlled physical displacement with opposing depth planes
          primaryQuickX?.(relX * 8);
          primaryQuickY?.(relY * 6);

          secondaryQuickX?.(relX * -12);
          secondaryQuickY?.(relY * -9);

          mobileQuickX?.(relX * 10);
          mobileQuickY?.(relY * 11);

          detailQuickX?.(relX * -8);
          detailQuickY?.(relY * 8);
        };

        const onPointerLeave = () => {
          primaryQuickX?.(0);
          primaryQuickY?.(0);
          secondaryQuickX?.(0);
          secondaryQuickY?.(0);
          mobileQuickX?.(0);
          mobileQuickY?.(0);
          detailQuickX?.(0);
          detailQuickY?.(0);
        };

        stage.addEventListener("mousemove", onPointerMove, { passive: true });
        stage.addEventListener("mouseleave", onPointerLeave);

        return () => {
          stage.removeEventListener("mousemove", onPointerMove);
          stage.removeEventListener("mouseleave", onPointerLeave);
        };
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Highlight response when hovering capabilities or annotations
  const handleHighlight = (targetId: string | null) => {
    setActiveHighlight(targetId);
  };

  return (
    <section
      ref={sectionRef}
      id="uiux-capabilities"
      aria-labelledby="designing-the-experience-title"
      className="relative w-full border-t border-[#E8E2D5] bg-[#F7F5EF] px-5 py-20 sm:px-8 md:py-28 lg:px-14 lg:py-32 select-none overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* ========================================================= */}
        {/* SECTION HEADER: Editorial Typography & Restrained Meta    */}
        {/* ========================================================= */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:mb-16 md:grid-cols-12 md:items-end lg:gap-14">
          <div className="md:col-span-7 lg:col-span-7">
            {/* Small Label */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E7472E]" />
            </div>

            {/* Large Editorial Heading */}
            <h2
              ref={headingRef}
              id="designing-the-experience-title"
              className="font-display uppercase text-[#151515] leading-[0.88] tracking-[-0.05em] text-[clamp(2.75rem,8vw,5.5rem)]"
            >
              <span className="block overflow-hidden pb-1">
                <span data-split-line className="block">DESIGNING</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span data-split-line className="block">THE EXPERIENCE.</span>
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-end md:col-span-5 lg:col-span-5">
            {/* Supporting Copy */}
            <p
              ref={textRef}
              className="font-sans text-[15px] leading-relaxed text-[#55534E] sm:text-[16px] md:max-w-md"
            >
              From structure and interface to interaction and motion, we design
              the details that make digital products feel clear, useful and alive.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#E8E2D5] pt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-[#55534E]">
              <span>CURATED DESIGN EXHIBITION</span>
              <span className="text-[#E7472E]">DISCIPLINES IN PRACTICE</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP & TABLET ASYMMETRIC EDITORIAL EXHIBITION STAGE   */}
        {/* ========================================================= */}
        <div
          ref={exhibitionStageRef}
          className="relative hidden md:block min-h-[780px] lg:min-h-[880px] w-full"
        >
          {/* Subtle architectural drafting grid background */}
          <div className="pointer-events-none absolute inset-0 drafting-grid opacity-35" />

          {/* ── 1. DOMINANT PRIMARY UI VISUAL (~50% Width) ── */}
          {/* Real asset: /public/ui&ux/ui5.jpg (2880 × 13214, Commerce & System) */}
          <div
            ref={primaryCardRef}
            className="absolute left-[2%] top-[6%] z-20 w-[50%] lg:w-[48%] transition-all duration-300 ease-out"
            style={{
              opacity: activeHighlight && activeHighlight !== "primary" ? 0.72 : 1,
              transformOrigin: "center center",
            }}
          >
            <div className="group relative overflow-hidden rounded-[2px] border border-[#D8D2C5] bg-[#FFFFFF] p-2.5 sm:p-4 shadow-[0_20px_50px_rgba(25,22,18,0.09)] transition-shadow duration-300 hover:shadow-[0_28px_60px_rgba(25,22,18,0.14)]">
              {/* Studio Telemetry Header */}
              <div className="mb-2.5 flex items-center justify-between border-b border-[#E8E2D5] pb-2 font-mono text-[8px] uppercase tracking-wider text-[#747878]">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-[#E7472E]" />
                  <span className="font-bold text-[#151515]">FIG 06-A // COMMERCE SYSTEM</span>
                  <span className="hidden lg:inline text-[#8F8B82]">• 2880 × 13214 PX</span>
                </div>
                <button
                  type="button"
                  onClick={() => openProject("ui-05")}
                  className="inline-flex items-center gap-1 font-bold text-[#151515] transition-colors hover:text-[#E7472E] cursor-pointer"
                  title="Inspect full uncropped interface design"
                >
                  <span>INSPECT</span>
                  <span className="text-[#E7472E]">→</span>
                </button>
              </div>

              {/* Natural Proportion Image Container */}
              <div className="relative aspect-[16/11] w-full overflow-hidden border border-[#E8E2D5] bg-[#0A0D0E]">
                <Image
                  src="/ui%26ux/optimized/ui5.webp"
                  alt="Primary UI/UX design: Commerce and digital system"
                  fill
                  sizes="(max-width: 1024px) 50vw, 680px"
                  quality={65}
                  loading="lazy"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                />
                {/* Structural Reference Line Overlay */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute top-[35%] left-0 right-0 h-[1px] bg-white/10" />
                  <div className="absolute top-0 bottom-0 left-[40%] w-[1px] bg-white/10" />
                </div>
                <div className="pointer-events-none absolute bottom-2.5 left-2.5 bg-[#151515]/90 px-2.5 py-1 font-mono text-[8px] uppercase tracking-widest text-white backdrop-blur-sm">
                  CORE SPEC: STRUCTURE & INTERFACE
                </div>
              </div>
            </div>
          </div>

          {/* ── 2. SECONDARY INTERFACE VISUAL (Overlapping Top-Right) ── */}
          {/* Real asset: /public/ui&ux/ui2.png (2880 × 8496, Wellness & Editorial) */}
          <div
            ref={secondaryCardRef}
            className="absolute right-[2%] top-[0%] z-30 w-[36%] lg:w-[34%] transition-all duration-300 ease-out"
            style={{
              opacity: activeHighlight && activeHighlight !== "secondary" ? 0.72 : 1,
              transformOrigin: "center center",
            }}
          >
            <div className="group relative overflow-hidden rounded-[2px] border border-[#D8D2C5] bg-[#FFFFFF] p-2.5 sm:p-3.5 shadow-[0_18px_45px_rgba(25,22,18,0.08)] transition-shadow duration-300 hover:shadow-[0_24px_55px_rgba(25,22,18,0.12)]">
              <div className="mb-2 flex items-center justify-between border-b border-[#E8E2D5] pb-2 font-mono text-[8px] uppercase tracking-wider text-[#747878]">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 bg-[#151515]" />
                  <span className="font-bold text-[#151515]">FIG 06-B // EDITORIAL WEB</span>
                </div>
                <button
                  type="button"
                  onClick={() => openProject("ui-02")}
                  className="inline-flex items-center gap-1 font-bold text-[#151515] transition-colors hover:text-[#E7472E] cursor-pointer"
                  title="Inspect design"
                >
                  <span>VIEW</span>
                  <span className="text-[#E7472E]">→</span>
                </button>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#E8E2D5] bg-[#F7F5EF]">
                <Image
                  src="/ui%26ux/optimized/ui2.webp"
                  alt="Secondary UI/UX design: Wellness and editorial interface"
                  fill
                  sizes="(max-width: 1024px) 36vw, 480px"
                  quality={65}
                  loading="lazy"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute bottom-2.5 right-2.5 bg-[#151515]/90 px-2 py-1 font-mono text-[8px] uppercase tracking-widest text-white backdrop-blur-sm">
                  SPEC: INTERACTION CADENCE
                </div>
              </div>
            </div>
          </div>

          {/* ── 3. MOBILE & PORTRAIT INTERFACE VISUAL (Bottom-Right Floating) ── */}
          {/* Real asset: /public/ui&ux/ui8.png (1440 × 5339, Healthcare & Mobile) */}
          <div
            ref={mobileCardRef}
            className="absolute right-[11%] bottom-[4%] z-40 w-[24%] lg:w-[22%] transition-all duration-300 ease-out"
            style={{
              opacity: activeHighlight && activeHighlight !== "mobile" ? 0.72 : 1,
              transformOrigin: "center center",
            }}
          >
            <div className="group relative overflow-hidden rounded-[2px] border border-[#D8D2C5] bg-[#FFFFFF] p-2 sm:p-3 shadow-[0_22px_55px_rgba(25,22,18,0.12)] transition-shadow duration-300 hover:shadow-[0_28px_65px_rgba(25,22,18,0.16)]">
              <div className="mb-2 flex items-center justify-between border-b border-[#E8E2D5] pb-1.5 font-mono text-[8px] uppercase tracking-wider text-[#747878]">
                <span className="font-bold text-[#151515]">FIG 06-C // MOBILE</span>
                <button
                  type="button"
                  onClick={() => openProject("ui-08")}
                  className="text-[#E7472E] font-bold transition-transform group-hover:translate-x-0.5 cursor-pointer"
                  title="Inspect mobile design"
                >
                  ↗
                </button>
              </div>

              <div className="relative aspect-[9/16] w-full overflow-hidden border border-[#E8E2D5] bg-[#F7F5EF]">
                <Image
                  src="/ui%26ux/optimized/ui8.webp"
                  alt="Mobile UI/UX design: Responsive healthcare interface"
                  fill
                  sizes="(max-width: 1024px) 24vw, 320px"
                  quality={65}
                  loading="lazy"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
                <div className="pointer-events-none absolute bottom-2 left-2 bg-[#151515]/90 px-2 py-0.5 font-mono text-[7px] uppercase tracking-widest text-white backdrop-blur-sm">
                  RESPONSIVE / PROTOTYPE
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. SMALL SUPPORTING SYSTEM DETAIL (Bottom-Left Anchor) ── */}
          {/* Real asset: /public/ui&ux/ui12.jpg (2880 × 11860, Visual Systems & Contrast) */}
          <div
            ref={detailCardRef}
            className="absolute left-[6%] bottom-[2%] z-10 w-[30%] lg:w-[28%] transition-all duration-300 ease-out"
            style={{
              opacity: activeHighlight && activeHighlight !== "detail" ? 0.72 : 1,
              transformOrigin: "center center",
            }}
          >
            <div className="group relative overflow-hidden rounded-[2px] border border-[#D8D2C5] bg-[#FFFFFF] p-2 sm:p-3 shadow-[0_12px_30px_rgba(25,22,18,0.06)]">
              <div className="mb-1.5 flex items-center justify-between border-b border-[#E8E2D5] pb-1.5 font-mono text-[8px] uppercase tracking-wider text-[#747878]">
                <span>FIG 06-D // DESIGN SYSTEM TOKEN</span>
                <span className="text-[#E7472E] font-bold">TOKENS</span>
              </div>
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-[#E8E2D5] bg-[#111111]">
                <Image
                  src="/ui%26ux/optimized/ui12.webp"
                  alt="Design system tokens and interface components"
                  fill
                  sizes="(max-width: 1024px) 30vw, 380px"
                  quality={65}
                  loading="lazy"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute bottom-2 right-2 bg-[#151515]/90 px-2 py-0.5 font-mono text-[7px] uppercase tracking-widest text-white backdrop-blur-sm">
                  SYSTEM MODULARITY
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* EDITORIAL ANNOTATIONS & VERY THIN HAIRLINE CONNECTORS     */}
          {/* ========================================================= */}
          <div ref={annotationLayerRef} className="pointer-events-none absolute inset-0 z-50">
            {/* Annotation 01: STRUCTURE (Top Left of Primary) */}
            <div
              className="pointer-events-auto absolute left-[-1%] top-[3%] flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider transition-opacity duration-200"
              onMouseEnter={() => handleHighlight("primary")}
              onMouseLeave={() => handleHighlight(null)}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E7472E]" />
              <span className="font-bold text-[#151515]">01 / STRUCTURE</span>
              <span
                data-connector-hairline
                className="hidden lg:inline-block h-[1px] w-20 bg-[#D8D2C5]"
              />
            </div>

            {/* Annotation 02: INTERFACE (Center Spine between Primary and Secondary) */}
            <div
              className="pointer-events-auto absolute left-[44%] top-[2%] flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider transition-opacity duration-200"
              onMouseEnter={() => handleHighlight("primary")}
              onMouseLeave={() => handleHighlight(null)}
            >
              <span className="font-bold text-[#151515]">02 / INTERFACE</span>
              <span
                data-connector-hairline
                className="hidden lg:inline-block h-[1px] w-14 bg-[#D8D2C5]"
              />
              <span className="text-[#8F8B82] hidden xl:inline">[HIERARCHY]</span>
            </div>

            {/* Annotation 03: RESPONSIVE (Above Mobile Frame) */}
            <div
              className="pointer-events-auto absolute right-[12%] top-[48%] flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider transition-opacity duration-200"
              onMouseEnter={() => handleHighlight("mobile")}
              onMouseLeave={() => handleHighlight(null)}
            >
              <span
                data-connector-hairline
                className="hidden lg:inline-block h-[1px] w-12 bg-[#D8D2C5]"
              />
              <span className="font-bold text-[#E7472E]">03 / RESPONSIVE</span>
              <span className="text-[#151515]">[VIEWPORT]</span>
            </div>

            {/* Annotation 04: INTERACTION (Beneath Secondary Frame) */}
            <div
              className="pointer-events-auto absolute right-[4%] top-[40%] flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider transition-opacity duration-200"
              onMouseEnter={() => handleHighlight("secondary")}
              onMouseLeave={() => handleHighlight(null)}
            >
              <span className="font-bold text-[#151515]">04 / INTERACTION</span>
              <span
                data-connector-hairline
                className="hidden lg:inline-block h-[1px] w-16 bg-[#D8D2C5]"
              />
              <span className="text-[#8F8B82] hidden xl:inline">[60FPS]</span>
            </div>

            {/* Annotation 05: SYSTEMS (Anchor next to Detail) */}
            <div
              className="pointer-events-auto absolute left-[38%] bottom-[7%] flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider transition-opacity duration-200"
              onMouseEnter={() => handleHighlight("detail")}
              onMouseLeave={() => handleHighlight(null)}
            >
              <span
                data-connector-hairline
                className="hidden lg:inline-block h-[1px] w-16 bg-[#D8D2C5]"
              />
              <span className="font-bold text-[#151515]">05 / SYSTEMS</span>
              <span className="text-[#8F8B82] hidden xl:inline">[REUSABLE]</span>
            </div>

            {/* Annotation 06: PROTOTYPE (Far Right Bottom) */}
            <div
              className="pointer-events-auto absolute right-[1%] bottom-[6%] flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider transition-opacity duration-200"
              onMouseEnter={() => handleHighlight("mobile")}
              onMouseLeave={() => handleHighlight(null)}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E7472E]" />
              <span className="font-bold text-[#151515]">06 / PROTOTYPE</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MOBILE DEDICATED COMPOSITION (No cramped scaling)         */}
        {/* ========================================================= */}
        <div className="flex md:hidden flex-col space-y-8">
          {/* Mobile Card 1: Dominant UI with Annotations 01 & 02 */}
          <div className="overflow-hidden rounded-[2px] border border-[#D8D2C5] bg-[#FFFFFF] p-3 shadow-[0_8px_24px_rgba(25,22,18,0.06)]">
            <div className="mb-2 flex items-center justify-between border-b border-[#E8E2D5] pb-2 font-mono text-[8px] uppercase tracking-wider text-[#747878]">
              <span className="font-bold text-[#151515]">FIG 06-A // COMMERCE SYSTEM</span>
              <button
                type="button"
                onClick={() => openProject("ui-05")}
                className="text-[#E7472E] font-bold"
              >
                INSPECT →
              </button>
            </div>
            <div className="relative aspect-[16/11] w-full overflow-hidden border border-[#E8E2D5] bg-[#0A0D0E]">
              <Image
                src="/ui%26ux/optimized/ui5.webp"
                alt="Primary UI design"
                fill
                sizes="92vw"
                quality={65}
                loading="lazy"
                className="object-cover object-top"
              />
            </div>
            {/* Inline Annotations */}
            <div className="mt-3 flex items-center justify-between font-mono text-[8px] uppercase tracking-widest text-[#55534E]">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E7472E]" />
                <span className="font-bold text-[#151515]">01 / STRUCTURE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#151515]">02 / INTERFACE</span>
              </div>
            </div>
          </div>

          {/* Mobile Card 2: Secondary UI with Annotations 03 & 04 */}
          <div className="overflow-hidden rounded-[2px] border border-[#D8D2C5] bg-[#FFFFFF] p-3 shadow-[0_8px_24px_rgba(25,22,18,0.06)]">
            <div className="mb-2 flex items-center justify-between border-b border-[#E8E2D5] pb-2 font-mono text-[8px] uppercase tracking-wider text-[#747878]">
              <span className="font-bold text-[#151515]">FIG 06-B // EDITORIAL WEB</span>
              <button
                type="button"
                onClick={() => openProject("ui-02")}
                className="text-[#E7472E] font-bold"
              >
                INSPECT →
              </button>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#E8E2D5] bg-[#F7F5EF]">
              <Image
                src="/ui%26ux/optimized/ui2.webp"
                alt="Secondary UI design"
                fill
                sizes="92vw"
                quality={65}
                loading="lazy"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[8px] uppercase tracking-widest text-[#55534E]">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#E7472E]">03 / RESPONSIVE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#151515]">04 / INTERACTION</span>
              </div>
            </div>
          </div>

          {/* Mobile Card 3: Mobile Portrait UI with Annotations 05 & 06 */}
          <div className="overflow-hidden rounded-[2px] border border-[#D8D2C5] bg-[#FFFFFF] p-3 shadow-[0_8px_24px_rgba(25,22,18,0.06)]">
            <div className="mb-2 flex items-center justify-between border-b border-[#E8E2D5] pb-2 font-mono text-[8px] uppercase tracking-wider text-[#747878]">
              <span className="font-bold text-[#151515]">FIG 06-C // MOBILE APP</span>
              <button
                type="button"
                onClick={() => openProject("ui-08")}
                className="text-[#E7472E] font-bold"
              >
                INSPECT →
              </button>
            </div>
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#E8E2D5] bg-[#F7F5EF]">
              <Image
                src="/ui%26ux/optimized/ui8.webp"
                alt="Mobile portrait UI design"
                fill
                sizes="92vw"
                quality={65}
                loading="lazy"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[8px] uppercase tracking-widest text-[#55534E]">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#151515]">05 / SYSTEMS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E7472E]" />
                <span className="font-bold text-[#151515]">06 / PROTOTYPE</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MINIMAL HORIZONTAL CAPABILITY INDEX LINE                  */}
        {/* Editorial index: hover illuminates tiny vermilion dot     */}
        {/* ========================================================= */}
        <div
          ref={indexRowRef}
          className="mt-12 sm:mt-16 border-t border-[#E8E2D5] pt-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-y-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#747878]">
            <span className="font-bold text-[#151515] hidden sm:inline">
              CAPABILITY INDEX:
            </span>

            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2">
              {CAPABILITY_INDEX.map((item, idx) => {
                const isHovered = activeHighlight === item.targetId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => handleHighlight(item.targetId)}
                    onMouseLeave={() => handleHighlight(null)}
                    onClick={() => {
                      if (item.targetId === "primary") openProject("ui-05");
                      else if (item.targetId === "secondary") openProject("ui-02");
                      else if (item.targetId === "mobile") openProject("ui-08");
                      else openProject("ui-12");
                    }}
                    className="group inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span
                      className={`h-1 w-1 rounded-full transition-colors ${
                        isHovered ? "bg-[#E7472E]" : "bg-transparent group-hover:bg-[#E7472E]"
                      }`}
                    />
                    <span
                      className={`transition-colors ${
                        isHovered
                          ? "text-[#151515] font-bold"
                          : "text-[#747878] group-hover:text-[#151515]"
                      }`}
                    >
                      {item.label}
                    </span>
                    {idx < CAPABILITY_INDEX.length - 1 && (
                      <span className="text-[#D8D2C5] ml-2 sm:ml-3">/</span>
                    )}
                  </button>
                );
              })}
            </div>

            <span className="text-[#8F8B82] hidden lg:inline">
              [DISCIPLINES SYNCHRONIZED]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
