"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUIUXProjectActions } from "./UIUXProjectProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnnotationItem {
  id: string;
  num: string;
  title: string;
  sub: string;
  desc: string;
  targetZone: {
    top: string;
    left: string;
    width: string;
    height: string;
    label: string;
  };
}

const ANNOTATIONS: AnnotationItem[] = [
  {
    id: "transition",
    num: "01",
    title: "TRANSITION",
    sub: "SPATIAL CONTINUITY",
    desc: "Eased viewport shifts, spatial continuity, and state changes between user actions.",
    targetZone: {
      top: "4%",
      left: "4%",
      width: "92%",
      height: "22%",
      label: "NAV & VIEWPORT TRANSITION LAYER",
    },
  },
  {
    id: "feedback",
    num: "02",
    title: "FEEDBACK",
    sub: "TACTILE RESPONSE",
    desc: "Immediate reactive tactile response to cursor gestures, active inputs, and system triggers.",
    targetZone: {
      top: "30%",
      left: "8%",
      width: "84%",
      height: "36%",
      label: "INTERACTIVE CONTROL CORE",
    },
  },
  {
    id: "hierarchy",
    num: "03",
    title: "HIERARCHY",
    sub: "STRUCTURAL PATHWAYS",
    desc: "Calculated typographical weights, negative space, and clear visual focal pathways.",
    targetZone: {
      top: "70%",
      left: "6%",
      width: "88%",
      height: "26%",
      label: "TYPOGRAPHIC & DATA ARCHITECTURE",
    },
  },
];

export default function InteractionExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const annotationsRef = useRef<HTMLDivElement>(null);

  const [activeAnnotation, setActiveAnnotation] = useState<number | null>(null);
  const { openProject } = useUIUXProjectActions();

  useEffect(() => {
    const section = sectionRef.current;
    const board = boardRef.current;
    const imageWrapper = imageWrapperRef.current;
    if (!section || !board || !imageWrapper) return;

    const ctx = gsap.context(() => {
      // 1. Reveal Label & Typography separately
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
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // 2. Large UI Image progressive reveal
      // Starts slightly clipped: inset(8% 0 8% 0), opacity 0, scale 0.96
      // Progressively reveals to: inset(0 0 0 0), opacity 1, scale 1
      gsap.fromTo(
        imageWrapper,
        {
          clipPath: "inset(8% 0% 8% 0%)",
          opacity: 0,
          scale: 0.96,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          scale: 1,
          duration: 1.35,
          ease: "power3.out",
          scrollTrigger: {
            trigger: board,
            start: "top 82%",
            once: true,
          },
        }
      );

      // 3. Image parallax layer (Desktop only for peak mobile performance)
      const isDesktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
      if (isDesktop) {
        gsap.to(imageWrapper, {
          y: -35,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        // 4. Subtle typography counter-drift for layered depth
        if (headingRef.current) {
          gsap.to(headingRef.current, {
            y: -12,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          });
        }
      }

      // 5. Small metadata and annotations appear after the main image
      if (metaRef.current) {
        gsap.fromTo(
          metaRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: board,
              start: "top 70%",
              once: true,
            },
          }
        );
      }

      if (annotationsRef.current) {
        const items = annotationsRef.current.querySelectorAll<HTMLElement>("[data-annotation-item]");
        gsap.fromTo(
          items,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: annotationsRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="interaction-experience"
      className="relative w-full border-t border-[#E8E2D5] bg-[#F7F5EF] px-5 py-20 sm:px-8 md:py-28 lg:px-14 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Editorial Top Section Header */}
        <div className="mb-14 grid grid-cols-1 gap-8 md:mb-20 md:grid-cols-12 md:items-end lg:gap-12">
          <div className="md:col-span-7 lg:col-span-7">
            {/* Small label */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E7472E]" />
            </div>

            {/* Main Headline */}
            <h2
              ref={headingRef}
              className="font-display uppercase text-[#151515] leading-[0.88] tracking-[-0.05em] text-[clamp(2.75rem,8vw,5.5rem)]"
            >
              <span className="block overflow-hidden pb-1">
                <span data-split-line className="block">DESIGN IS</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span data-split-line className="block">MORE THAN</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span data-split-line className="block">THE SCREEN.</span>
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-end md:col-span-5 lg:col-span-5">
            {/* Supporting Editorial Copy */}
            <p
              ref={textRef}
              className="font-sans text-[15px] leading-relaxed text-[#55534E] sm:text-[16px] md:max-w-md"
            >
              We design the moments between actions — the transitions, feedback,
              hierarchy and movement that make a digital experience feel clear,
              responsive and intentional.
            </p>

            <div
              ref={metaRef}
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#E8E2D5] pt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-[#55534E]"
            >
              <span>CORE STUDY: PRODUCT INTERACTION</span>
              <span className="text-[#E7472E]">FIGURE 04-A</span>
              <span className="hidden sm:inline">STATE CADENCE: 60FPS</span>
            </div>
          </div>
        </div>

        {/* 
          Large Interactive Editorial Composition
          Treated as an architect's / design director's physical study board.
          Dominant, responsive, preserving authentic UI proportions.
        */}
        <div
          ref={boardRef}
          className="relative mx-auto w-full max-w-[1180px] rounded-[2px] border border-[#E8E2D5] bg-[#FFFFFF] p-3 sm:p-5 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
        >
          {/* Architectural Board Header / Technical Metadata */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E2D5] pb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#55534E]">
            <div className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 border border-[#151515] bg-[#E7472E]" />
              <span className="font-bold text-[#151515]">DESIGN STUDY // SPEC 04.1</span>
              <span className="hidden sm:inline text-[#747878]">•</span>
              <span className="hidden sm:inline text-[#747878]">INTERFACE SYSTEM: 2160 × 11267 PX</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[#747878]">
                {activeAnnotation !== null ? (
                  <span className="text-[#E7472E]">
                    ACTIVE: {ANNOTATIONS[activeAnnotation].title}
                  </span>
                ) : (
                  "HOVER ANNOTATION TO INSPECT"
                )}
              </span>
              <button
                type="button"
                onClick={() => openProject("ui-01")}
                className="group inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#151515] transition-colors hover:text-[#E7472E]"
                title="Inspect full uncropped interface design"
              >
                <span>OPEN FULL STUDY</span>
                <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#E7472E]">
                  ↗
                </span>
              </button>
            </div>
          </div>

          {/* The Large Dominant UI Image Container */}
          <div
            ref={imageWrapperRef}
            className="relative w-full overflow-hidden border border-[#E8E2D5] bg-[#0E1015]"
            style={{
              // Natural editorial aspect ratio tailored to the UI composition
              aspectRatio: "16 / 10",
              minHeight: "360px",
              maxHeight: "720px",
            }}
          >
            {/* The Real UI Image from /public/ui&ux/ui1.jpg */}
            <div
              className="relative h-full w-full transition-transform duration-500 ease-out"
              style={{
                transform:
                  activeAnnotation !== null
                    ? "translateY(-4px) scale(1.01)"
                    : "translateY(0px) scale(1)",
              }}
            >
              <Image
                src="/ui%26ux/optimized/ui1.webp"
                alt="UI/UX Interaction & Experience design study"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 90vw, 1180px"
                quality={65}
                loading="lazy"
                className="object-cover object-top transition-opacity duration-300"
              />

              {/* Editorial architectural grid lines over the study */}
              <div className="pointer-events-none absolute inset-0 z-10">
                {/* Horizontal reference hairline */}
                <div className="absolute top-[28%] left-0 right-0 h-[1px] bg-white/10" />
                <div className="absolute top-[66%] left-0 right-0 h-[1px] bg-white/10" />
                {/* Vertical reference hairline */}
                <div className="absolute top-0 bottom-0 left-[33%] w-[1px] bg-white/10" />
                <div className="absolute top-0 bottom-0 right-[33%] w-[1px] bg-white/10" />
              </div>

              {/* Interactive Inspection Reticles triggered on annotation hover */}
              {ANNOTATIONS.map((anno, index) => {
                const isActive = activeAnnotation === index;
                return (
                  <div
                    key={anno.id}
                    className="pointer-events-none absolute z-20 transition-all duration-300 ease-out"
                    style={{
                      top: anno.targetZone.top,
                      left: anno.targetZone.left,
                      width: anno.targetZone.width,
                      height: anno.targetZone.height,
                      border: isActive
                        ? "1px solid #E7472E"
                        : "1px dashed rgba(255,255,255,0.14)",
                      backgroundColor: isActive
                        ? "rgba(231, 71, 46, 0.08)"
                        : "transparent",
                      boxShadow: isActive
                        ? "0 0 20px rgba(231, 71, 46, 0.25)"
                        : "none",
                    }}
                  >
                    {/* Reticle Corner Brackets */}
                    <span
                      className="absolute -top-1 -left-1 h-2 w-2 border-t-2 border-l-2 transition-colors duration-200"
                      style={{ borderColor: isActive ? "#E7472E" : "rgba(255,255,255,0.4)" }}
                    />
                    <span
                      className="absolute -top-1 -right-1 h-2 w-2 border-t-2 border-r-2 transition-colors duration-200"
                      style={{ borderColor: isActive ? "#E7472E" : "rgba(255,255,255,0.4)" }}
                    />
                    <span
                      className="absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2 transition-colors duration-200"
                      style={{ borderColor: isActive ? "#E7472E" : "rgba(255,255,255,0.4)" }}
                    />
                    <span
                      className="absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 transition-colors duration-200"
                      style={{ borderColor: isActive ? "#E7472E" : "rgba(255,255,255,0.4)" }}
                    />

                    {/* Zone Badge */}
                    <div
                      className="absolute left-2 top-2 flex items-center gap-1.5 px-2 py-1 font-mono text-[8px] uppercase tracking-wider transition-opacity duration-200"
                      style={{
                        backgroundColor: isActive ? "#E7472E" : "rgba(0,0,0,0.6)",
                        color: "#FFFFFF",
                        opacity: isActive ? 1 : 0.45,
                      }}
                    >
                      <span className="font-bold">{anno.num}</span>
                      <span>//</span>
                      <span>{anno.targetZone.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Corner Architectural Tick Marks on the canvas */}
            <div className="pointer-events-none absolute top-2 left-2 font-mono text-[8px] text-white/50">
              + [0, 0]
            </div>
            <div className="pointer-events-none absolute top-2 right-2 font-mono text-[8px] text-white/50">
              [2160, 0] +
            </div>
            <div className="pointer-events-none absolute bottom-2 left-2 font-mono text-[8px] text-white/50">
              + [0, 11267]
            </div>
            <div className="pointer-events-none absolute bottom-2 right-2 font-mono text-[8px] text-white/50">
              [2160, 11267] +
            </div>
          </div>

          {/* Board Footer Dimension Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8E2D5] pt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#55534E]">
            <div className="flex items-center gap-2">
              <span className="text-[#E7472E]">SCALE: 1:1 RENDERING</span>
              <span>•</span>
              <span className="hidden sm:inline">SUBPIXEL PRECISION</span>
            </div>
            <div className="text-[#151515]">
              MODEXA UI ARCHIVE / STUDY 01
            </div>
          </div>
        </div>

        {/* 
          EDITORIAL ANNOTATIONS AROUND THE COMPOSITION
          01 / TRANSITION
          02 / FEEDBACK
          03 / HIERARCHY
          These are NOT cards. They are annotations around a design study.
          Hovering an annotation subtly highlights the corresponding UI zone,
          turns vermilion, connects toward the image with a subtle line, and shifts the image slightly.
        */}
        <div
          ref={annotationsRef}
          className="mx-auto mt-12 grid w-full max-w-[1180px] grid-cols-1 gap-6 pt-6 sm:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12"
        >
          {ANNOTATIONS.map((anno, index) => {
            const isActive = activeAnnotation === index;
            return (
              <div
                key={anno.id}
                data-annotation-item
                onMouseEnter={() => setActiveAnnotation(index)}
                onMouseLeave={() => setActiveAnnotation(null)}
                className="group relative cursor-pointer border-t border-[#E8E2D5] pt-5 transition-colors duration-200"
              >
                {/* Connecting hairline indicator that activates on hover */}
                <div
                  className="absolute -top-[1px] left-0 h-[2px] transition-all duration-300 ease-out"
                  style={{
                    width: isActive ? "100%" : "0%",
                    backgroundColor: "#E7472E",
                  }}
                />

                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-[11px] font-bold tracking-widest transition-colors duration-200"
                      style={{ color: isActive ? "#E7472E" : "#151515" }}
                    >
                      {anno.num} /
                    </span>
                    <h3
                      className="font-display text-[15px] sm:text-[16px] font-bold uppercase tracking-wider transition-colors duration-200"
                      style={{ color: isActive ? "#E7472E" : "#151515" }}
                    >
                      {anno.title}
                    </h3>
                  </div>

                  <span
                    className="font-mono text-[8px] uppercase tracking-wider transition-colors duration-200"
                    style={{ color: isActive ? "#E7472E" : "#747878" }}
                  >
                    {anno.sub}
                  </span>
                </div>

                {/* Editorial description */}
                <p className="font-sans text-[13px] leading-relaxed text-[#55534E]">
                  {anno.desc}
                </p>

                {/* Subtle connecting cue */}
                <div className="mt-3 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wider text-[#747878]">
                  <span
                    className="inline-block h-1 w-1 rounded-full transition-colors duration-200"
                    style={{ backgroundColor: isActive ? "#E7472E" : "#55534E" }}
                  />
                  <span
                    className="transition-colors duration-200"
                    style={{ color: isActive ? "#E7472E" : "#747878" }}
                  >
                    {isActive ? "TARGETING VIEWPORT ZONE" : "INSPECT TARGET ZONE"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
