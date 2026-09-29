"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WebDevHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgGridRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLDivElement>(null);
  const headingLine2Ref = useRef<HTMLDivElement>(null);
  const headingLine3Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);

  // Installation cluster & fragment refs
  const clusterRef = useRef<HTMLDivElement>(null);
  const fragBrowserRef = useRef<HTMLDivElement>(null);
  const fragMobileRef = useRef<HTMLDivElement>(null);
  const fragCodeRef = useRef<HTMLDivElement>(null);
  const fragTypeRef = useRef<HTMLDivElement>(null);
  const fragCropRef = useRef<HTMLDivElement>(null);
  const fragGridRef = useRef<HTMLDivElement>(null);
  const fragLabelsRef = useRef<HTMLDivElement>(null);
  const fragReticleRef = useRef<HTMLDivElement>(null);

  // Scroll indicator
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Elements for entrance sequence
    const headingLines = [
      headingLine1Ref.current,
      headingLine2Ref.current,
      headingLine3Ref.current,
    ].filter(Boolean);

    const secondaryFragments = [
      fragMobileRef.current,
      fragCodeRef.current,
      fragTypeRef.current,
      fragCropRef.current,
      fragGridRef.current,
      fragReticleRef.current,
    ].filter(Boolean);

    if (prefersReducedMotion) {
      // Instant reveal for accessibility
      gsap.set(
        [
          metadataRef.current,
          ...headingLines,
          subtextRef.current,
          buttonsRef.current,
          fragBrowserRef.current,
          ...secondaryFragments,
          fragLabelsRef.current,
          scrollIndicatorRef.current,
          bgGridRef.current,
        ],
        { opacity: 1, y: 0, clipPath: "none", filter: "none" }
      );
      return;
    }

    // =========================================================================
    // 1. INITIAL STATES FOR CINEMATIC ENTRANCE
    // =========================================================================
    gsap.set(bgGridRef.current, { opacity: 0 });
    gsap.set(metadataRef.current, { opacity: 0, y: 16 });

    // Line-by-line clip-path reveal setup (Section 7)
    gsap.set(headingLines, {
      opacity: 0,
      y: 70,
      clipPath: "inset(100% 0 0 0)",
    });

    gsap.set(subtextRef.current, { opacity: 0, y: 20 });
    gsap.set(buttonsRef.current, { opacity: 0, y: 20 });
    gsap.set(fragBrowserRef.current, {
      opacity: 0,
      y: 35,
      scale: 0.94,
    });
    gsap.set(secondaryFragments, {
      opacity: 0,
      y: 25,
      scale: 0.95,
    });
    gsap.set(fragLabelsRef.current, { opacity: 0 });
    gsap.set(scrollIndicatorRef.current, { opacity: 0, y: 10 });

    // =========================================================================
    // 2. MASTER ENTRANCE TIMELINE (Section 8)
    // =========================================================================
    const masterTl = gsap.timeline({ delay: 0.08 });

    // 0.0s: background grid subtle fade-in
    masterTl.to(
      bgGridRef.current,
      { opacity: 1, duration: 1.0, ease: "power2.out" },
      0.0
    );

    // 0.15s: metadata pill
    masterTl.to(
      metadataRef.current,
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      0.15
    );

    // 0.25s: heading lines reveal line-by-line (power4.out, stagger 0.1s)
    masterTl.to(
      headingLines,
      {
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
        duration: 1.15,
        stagger: 0.1,
        ease: "power4.out",
      },
      0.25
    );

    // 0.55s: main visual browser preview reveals
    masterTl.to(
      fragBrowserRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: "power3.out",
      },
      0.55
    );

    // 0.75s: secondary fragments appear
    masterTl.to(
      secondaryFragments,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        stagger: 0.07,
        ease: "power3.out",
      },
      0.75
    );

    // 1.0s: supporting text
    masterTl.to(
      subtextRef.current,
      { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
      1.0
    );

    // 1.15s: CTA buttons
    masterTl.to(
      buttonsRef.current,
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      1.15
    );

    // 1.4s: small technical labels & connector lines
    masterTl.to(
      fragLabelsRef.current,
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      1.4
    );

    // Bottom scroll indicator
    masterTl.to(
      scrollIndicatorRef.current,
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      1.5
    );

    // =========================================================================
    // 3. SUBTLE AMBIENT MOVEMENT (Section 9) — 8-15s unconscious drift
    // =========================================================================
    const ambientTweens: gsap.core.Tween[] = [];

    if (fragBrowserRef.current) {
      ambientTweens.push(
        gsap.to(fragBrowserRef.current, {
          y: "-=3px",
          duration: 11,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      );
    }

    if (fragMobileRef.current) {
      ambientTweens.push(
        gsap.to(fragMobileRef.current, {
          rotation: "+=1.4deg",
          y: "+=3px",
          duration: 13,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      );
    }

    if (fragCodeRef.current) {
      ambientTweens.push(
        gsap.to(fragCodeRef.current, {
          y: "-=2.5px",
          duration: 9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      );
    }

    if (fragCropRef.current) {
      ambientTweens.push(
        gsap.to(fragCropRef.current, {
          scale: 1.014,
          duration: 14,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      );
    }

    if (fragGridRef.current) {
      ambientTweens.push(
        gsap.to(fragGridRef.current, {
          opacity: 0.85,
          duration: 8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      );
    }

    // =========================================================================
    // 4. SCROLL TRANSITION (Section 19)
    // =========================================================================
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        if (p < 0.01) return;

        // Heading moves slightly upward
        gsap.set(headingLines, {
          y: `${-p * 45}px`,
          opacity: Math.max(0, 1 - p * 1.9),
        });

        // Supporting text & buttons fade out faster
        gsap.set([subtextRef.current, buttonsRef.current], {
          y: `${-p * 30}px`,
          opacity: Math.max(0, 1 - p * 2.3),
        });

        // Visual installation moves slightly slower (depth parallax)
        if (clusterRef.current) {
          gsap.set(clusterRef.current, {
            y: `${-p * 22}px`,
            opacity: Math.max(0, 1 - p * 1.6),
          });
        }

        // Technical lines & metadata fade
        gsap.set(
          [metadataRef.current, fragLabelsRef.current, scrollIndicatorRef.current],
          {
            opacity: Math.max(0, 1 - p * 2.8),
          }
        );
      },
    });

    return () => {
      masterTl.kill();
      ambientTweens.forEach((t) => t.kill());
      scrollTriggerInstance.kill();
    };
  }, []);

  // ===========================================================================
  // 5. HOVER & CURSOR INTERACTION WITH MAGNETIC DEPTH FIELD (Sections 4, 5, 6)
  // ===========================================================================
  useEffect(() => {
    const cluster = clusterRef.current;
    if (!cluster) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    // quickTo setters for inertia and 60fps performance without state
    const setBrowserX = gsap.quickTo(fragBrowserRef.current, "x", {
      duration: 0.85,
      ease: "power3.out",
    });
    const setBrowserY = gsap.quickTo(fragBrowserRef.current, "y", {
      duration: 0.85,
      ease: "power3.out",
    });
    const setBrowserRot = gsap.quickTo(fragBrowserRef.current, "rotation", {
      duration: 0.85,
      ease: "power3.out",
    });

    const setMobileX = gsap.quickTo(fragMobileRef.current, "x", {
      duration: 0.75,
      ease: "power3.out",
    });
    const setMobileY = gsap.quickTo(fragMobileRef.current, "y", {
      duration: 0.75,
      ease: "power3.out",
    });
    const setMobileRot = gsap.quickTo(fragMobileRef.current, "rotation", {
      duration: 0.75,
      ease: "power3.out",
    });

    const setCodeX = gsap.quickTo(fragCodeRef.current, "x", {
      duration: 0.8,
      ease: "power3.out",
    });
    const setCodeY = gsap.quickTo(fragCodeRef.current, "y", {
      duration: 0.8,
      ease: "power3.out",
    });

    const setTypeX = gsap.quickTo(fragTypeRef.current, "x", {
      duration: 0.9,
      ease: "power3.out",
    });
    const setTypeY = gsap.quickTo(fragTypeRef.current, "y", {
      duration: 0.9,
      ease: "power3.out",
    });

    const setCropX = gsap.quickTo(fragCropRef.current, "x", {
      duration: 0.7,
      ease: "power3.out",
    });
    const setCropY = gsap.quickTo(fragCropRef.current, "y", {
      duration: 0.7,
      ease: "power3.out",
    });

    const setGridX = gsap.quickTo(fragGridRef.current, "x", {
      duration: 1.1,
      ease: "power3.out",
    });
    const setGridY = gsap.quickTo(fragGridRef.current, "y", {
      duration: 1.1,
      ease: "power3.out",
    });

    const setReticleX = gsap.quickTo(fragReticleRef.current, "x", {
      duration: 0.5,
      ease: "power2.out",
    });
    const setReticleY = gsap.quickTo(fragReticleRef.current, "y", {
      duration: 0.5,
      ease: "power2.out",
    });

    const handlePointerMove = (e: MouseEvent) => {
      const rect = cluster.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized coordinates: -1 to 1
      const nx = (e.clientX - centerX) / (rect.width / 2);
      const ny = (e.clientY - centerY) / (rect.height / 2);

      // Distance from center for magnetic expansion effect (Section 5)
      const dist = Math.hypot(nx, ny);
      const expandFactor = Math.max(0, 1 - Math.min(dist, 1.4) / 1.4); // 0 to 1

      // 1. Main Browser Window: Subtle counter-shift & tilt
      setBrowserX(nx * 14);
      setBrowserY(ny * 12);
      setBrowserRot(nx * 1.2);

      // 2. Mobile Frame (bottom left): Expands down-left magnetically
      setMobileX(nx * 22 - expandFactor * 26);
      setMobileY(ny * 20 + expandFactor * 24);
      setMobileRot(-2 + nx * 1.8);

      // 3. Code Fragment (top left): Expands up-left magnetically
      setCodeX(nx * 18 - expandFactor * 28);
      setCodeY(ny * 16 - expandFactor * 22);

      // 4. Typographic Specimen (bottom right): Expands down-right
      setTypeX(nx * 16 + expandFactor * 24);
      setTypeY(ny * 18 + expandFactor * 20);

      // 5. Image Detail Crop (top right): Expands up-right
      setCropX(nx * 24 + expandFactor * 30);
      setCropY(ny * 20 - expandFactor * 25);

      // 6. Blueprint Grid: Deep background micro-parallax (2-5px)
      setGridX(nx * 4);
      setGridY(ny * 4);

      // 7. Reticle: Kinetic proximity tracking
      setReticleX(nx * 32);
      setReticleY(ny * 32);
    };

    const handlePointerLeave = () => {
      // Section 6: Smooth return with power3.out over 0.8-1.2s
      const resetTargets = [
        { ref: fragBrowserRef.current, rot: 0 },
        { ref: fragMobileRef.current, rot: -2 },
        { ref: fragCodeRef.current, rot: 1 },
        { ref: fragTypeRef.current, rot: 0 },
        { ref: fragCropRef.current, rot: -1 },
        { ref: fragGridRef.current, rot: 0 },
        { ref: fragReticleRef.current, rot: 0 },
      ];

      resetTargets.forEach((target) => {
        if (target.ref) {
          gsap.to(target.ref, {
            x: 0,
            y: 0,
            rotation: target.rot,
            duration: 1.0,
            ease: "power3.out",
          });
        }
      });
    };

    cluster.addEventListener("mousemove", handlePointerMove);
    cluster.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      cluster.removeEventListener("mousemove", handlePointerMove);
      cluster.removeEventListener("mouseleave", handlePointerLeave);
      [
        fragBrowserRef.current,
        fragMobileRef.current,
        fragCodeRef.current,
        fragTypeRef.current,
        fragCropRef.current,
        fragGridRef.current,
        fragReticleRef.current,
      ].forEach((el) => {
        if (el) gsap.killTweensOf(el);
      });
    };
  }, []);

  // ===========================================================================
  // 6. MAGNETIC CTA BUTTON (Section 16)
  // ===========================================================================
  useEffect(() => {
    const btn = primaryBtnRef.current;
    if (!btn) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const setX = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
    const setY = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setX((e.clientX - cx) * 0.3);
      setY((e.clientY - cy) * 0.3);
    };

    const handleLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1, 0.6)" });
    };

    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
      gsap.killTweensOf(btn);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="web-dev-hero-title"
      className="relative isolate flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#070707] px-5 pb-8 pt-28 text-white sm:px-8 md:px-12 lg:px-16 lg:pt-36"
    >
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BACKGROUND & SUBTLE BLUEPRINT GRID (Sections 13, 14, 15)           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        ref={bgGridRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      >
        {/* Subtle radial illumination focused around the installation */}
        <div
          className="absolute -right-20 top-1/4 h-[750px] w-[750px] rounded-full opacity-40 blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(231,71,46,0.02) 40%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* 1px Architectural Hairline Grid with Crosshairs */}
        <div
          className="absolute inset-0 opacity-[0.038]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)
            `,
            backgroundSize: "84px 84px",
          }}
        />

        {/* Architectural Crosshair Intersections */}
        <span className="absolute left-[12%] top-[18%] font-mono text-[10px] text-white/15">+</span>
        <span className="absolute right-[22%] top-[16%] font-mono text-[10px] text-white/20">+</span>
        <span className="absolute left-[45%] bottom-[24%] font-mono text-[10px] text-white/15">+</span>
        <span className="absolute right-[8%] bottom-[32%] font-mono text-[10px] text-white/20">+</span>

        {/* Technical Blueprint Perimeter Telemetry */}
        <div className="absolute left-6 top-24 hidden font-mono text-[9px] uppercase tracking-[0.25em] text-white/20 xl:block">
          SYS.ID // MODEXA.DEV.04
        </div>
        <div className="absolute right-8 top-24 hidden font-mono text-[9px] uppercase tracking-[0.25em] text-white/20 xl:block">
          CADENCE // 60FPS STABLE
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ASYMMETRIC EDITORIAL HERO CONTENT (Sections 1 & 2)                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center py-6 md:py-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-14">

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* LEFT / CENTER: STRONG EDITORIAL STATEMENT                       */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="flex flex-col items-start lg:col-span-6 xl:col-span-5">

            {/* Metadata Pill / Telemetry (Section 17) */}
            <div
              ref={metadataRef}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/70 backdrop-blur-sm sm:mb-8 sm:text-xs"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#E7472E] shadow-[0_0_8px_#E7472E]"
              />
              <span>WEB DEVELOPMENT</span>
              <span className="text-white/25">/</span>
              <span className="text-white/45">DIGITAL EXPERIENCES</span>
            </div>

            {/* Main Editorial Heading (Section 1 & 7) */}
            <h1
              id="web-dev-hero-title"
              className="font-display text-[clamp(2.75rem,5.6vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.045em] text-white"
            >
              {/* Line 1: WE BUILD */}
              <div style={{ overflow: "hidden" }}>
                <div ref={headingLine1Ref} className="block will-change-transform">
                  WE BUILD
                </div>
              </div>

              {/* Line 2: DIGITAL */}
              <div style={{ overflow: "hidden" }}>
                <div
                  ref={headingLine2Ref}
                  className="block font-medium italic tracking-[-0.035em] text-white/95 will-change-transform"
                >
                  DIGITAL
                </div>
              </div>

              {/* Line 3: EXPERIENCES. */}
              <div style={{ overflow: "hidden" }}>
                <div ref={headingLine3Ref} className="block text-white will-change-transform">
                  EXPERIENCES.
                </div>
              </div>
            </h1>

            {/* Supporting Copy (Section 2) */}
            <p
              ref={subtextRef}
              className="mt-6 max-w-[460px] font-sans text-sm leading-relaxed text-white/65 sm:mt-7 sm:text-base"
            >
              Websites and digital products built where design, interaction
              and technology meet.
            </p>

            {/* Action Buttons (Section 16) */}
            <div
              ref={buttonsRef}
              className="mt-8 flex w-full flex-col items-stretch gap-3.5 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
            >
              {/* Primary Button — Vermilion with magnetic feel */}
              <a
                ref={primaryBtnRef}
                href="#inquiry-station"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("inquiry-station");
                }}
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#E7472E] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-[0_8px_20px_-4px_rgba(231,71,46,0.35)] transition-all duration-300 hover:bg-[#ff5538] hover:shadow-[0_12px_28px_-4px_rgba(231,71,46,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E7472E] sm:text-sm"
              >
                <span>START A PROJECT</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </a>

              {/* Secondary Button — Transparent with subtle border */}
              <a
                href="#works"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("works");
                }}
                className="group inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/20 bg-white/[0.03] px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-sm"
              >
                <span>VIEW OUR WORK</span>
                <span
                  aria-hidden="true"
                  className="text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
                >
                  →
                </span>
              </a>
            </div>

            {/* Quick architectural spec metrics below buttons */}
            <div className="mt-8 flex items-center gap-6 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-wider text-white/40">
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span>STACK: NEXT 15+ / TS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span>LATENCY &lt; 14MS</span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* RIGHT: INTERACTIVE DIGITAL WORKSPACE INSTALLATION               */}
          {/* (Sections 3, 4, 5, 9, 10, 11, 12)                              */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="relative flex w-full items-center justify-center lg:col-span-6 xl:col-span-7">
            
            {/* ── DESKTOP & TABLET: MULTI-LAYER INTERACTIVE CLUSTER ─────── */}
            <div
              ref={clusterRef}
              className="relative hidden h-[480px] w-full max-w-[660px] cursor-crosshair md:block lg:h-[530px] xl:h-[570px]"
            >
              {/* Background Wireframe Grid Plate (Fragment 6) */}
              <div
                ref={fragGridRef}
                className="absolute inset-8 rounded-2xl border border-white/[0.07] bg-white/[0.01] p-4 backdrop-blur-[2px] transition-opacity duration-300"
              >
                <div className="flex h-full w-full flex-col justify-between border border-dashed border-white/[0.05] p-3">
                  <div className="flex items-center justify-between font-mono text-[9px] tracking-widest text-white/20">
                    <span>TOPOLOGY MATRIX // 01</span>
                    <span>COORDS [37.77, -122.41]</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[9px] tracking-widest text-white/20">
                    <span>AXIS: 3D KINETIC FIELD</span>
                    <span>EXP: MODEXA.RELEASE</span>
                  </div>
                </div>
              </div>

              {/* ────────────────────────────────────────────────────────── */}
              {/* FRAGMENT 1: MAIN BROWSER WINDOW (Centerpiece)              */}
              {/* ────────────────────────────────────────────────────────── */}
              <div
                ref={fragBrowserRef}
                className="absolute left-[8%] top-[12%] z-20 w-[84%] max-w-[530px] rounded-xl border border-white/18 bg-[#0e0e10] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] transition-shadow duration-500 hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.98)]"
              >
                {/* Browser Window Chrome */}
                <div className="flex items-center justify-between border-b border-white/10 bg-[#141416] px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-white/10 bg-black/40 px-3 py-1 font-mono text-[10px] text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>modexa.systems/experiences</span>
                  </div>
                  <span className="font-mono text-[9px] tracking-wider text-white/35">
                    1440×900
                  </span>
                </div>

                {/* Browser Content: Real Web Project Asset (web1.png) */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-b-xl bg-black">
                  <Image
                    src="/images/web1.png"
                    alt="Web development project experience preview"
                    fill
                    sizes="(max-width: 1200px) 500px, 560px"
                    className="object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                    priority
                  />
                  {/* Subtle inner top-edge vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* On-screen status badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md border border-white/15 bg-black/70 px-2.5 py-1 font-mono text-[10px] text-white/80 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E7472E]" />
                    <span>PROD RELEASE // ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* ────────────────────────────────────────────────────────── */}
              {/* FRAGMENT 2: MOBILE INTERFACE FRAME (Bottom-Left)           */}
              {/* ────────────────────────────────────────────────────────── */}
              <div
                ref={fragMobileRef}
                style={{ transform: "rotate(-2deg)" }}
                className="absolute -bottom-2 left-[2%] z-30 w-[155px] rounded-2xl border border-white/25 bg-[#121214] p-1.5 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.9)] xl:w-[175px]"
              >
                {/* Mobile screen bezel & notch */}
                <div className="relative aspect-[9/18] w-full overflow-hidden rounded-[13px] bg-black">
                  <div className="absolute top-1.5 left-1/2 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-white/25" />
                  <Image
                    src="/images/web6.png"
                    alt="Mobile responsive web experience preview"
                    fill
                    sizes="180px"
                    className="object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  <div className="absolute bottom-2 inset-x-2 text-center font-mono text-[8px] uppercase tracking-wider text-white/80">
                    MOBILE CADENCE
                  </div>
                </div>
              </div>

              {/* ────────────────────────────────────────────────────────── */}
              {/* FRAGMENT 3: SMALL TECHNICAL CODE FRAGMENT (Top-Left)       */}
              {/* (Section 11)                                              */}
              {/* ────────────────────────────────────────────────────────── */}
              <div
                ref={fragCodeRef}
                style={{ transform: "rotate(1deg)" }}
                className="absolute -top-3 left-[3%] z-30 w-[215px] rounded-lg border border-white/15 bg-[#0b0b0d]/95 p-3.5 shadow-2xl backdrop-blur-md"
              >
                <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-1.5 font-mono text-[9px] text-white/40">
                  <span>SYS.SPEC // CONFIG</span>
                  <span className="text-[#E7472E]">TS</span>
                </div>
                <pre className="font-mono text-[10px] leading-relaxed text-white/80">
                  <code>
                    <span className="text-white/45">const </span>
                    <span className="text-white">experience </span>
                    <span className="text-white/45">= </span>
                    {"{\n"}
                    {"  "}
                    <span className="text-white/70">design: </span>
                    <span className="text-[#E7472E]">true</span>
                    {",\n"}
                    {"  "}
                    <span className="text-white/70">interaction: </span>
                    <span className="text-[#E7472E]">true</span>
                    {",\n"}
                    {"  "}
                    <span className="text-white/70">performance: </span>
                    <span className="text-[#E7472E]">true</span>
                    {"\n"}
                    {"};"}
                  </code>
                </pre>
              </div>

              {/* ────────────────────────────────────────────────────────── */}
              {/* FRAGMENT 4: TYPOGRAPHY & SPRING DYNAMICS CARD (Bottom-Right)*/}
              {/* ────────────────────────────────────────────────────────── */}
              <div
                ref={fragTypeRef}
                className="absolute -bottom-4 right-[6%] z-30 w-[190px] rounded-lg border border-white/15 bg-[#101012]/95 p-3.5 shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-white/40">
                  <span>SPRING DYNAMICS</span>
                  <span className="text-emerald-400">80FPS</span>
                </div>
                <div className="my-2 h-[26px] w-full">
                  {/* Kinetic Waveform curve SVG */}
                  <svg
                    viewBox="0 0 100 24"
                    fill="none"
                    className="h-full w-full stroke-white/60"
                  >
                    <path
                      d="M0 12 Q 15 2, 30 12 T 60 12 T 85 12 T 100 12"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M0 12 Q 20 22, 40 12 T 70 12 T 100 12"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      stroke="rgba(231,71,46,0.6)"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between font-mono text-[9px] text-white/50">
                  <span>DAMPING: 0.82</span>
                  <span className="text-white/80">INERTIA: ON</span>
                </div>
              </div>

              {/* ────────────────────────────────────────────────────────── */}
              {/* FRAGMENT 5: CREATIVE DETAIL CROP (Top-Right)                */}
              {/* ────────────────────────────────────────────────────────── */}
              <div
                ref={fragCropRef}
                style={{ transform: "rotate(-1.5deg)" }}
                className="absolute -top-4 right-[2%] z-20 w-[165px] rounded-lg border border-white/18 bg-[#121214] p-1.5 shadow-2xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-black">
                  <Image
                    src="/images/web3.png"
                    alt="Creative detail crop"
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                  <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 font-mono text-[8px] text-white/80">
                    CROP [03]
                  </div>
                </div>
              </div>

              {/* ────────────────────────────────────────────────────────── */}
              {/* FRAGMENT 7: TECHNICAL LABELS & CONNECTORS (Section 12)     */}
              {/* ────────────────────────────────────────────────────────── */}
              <div
                ref={fragLabelsRef}
                className="pointer-events-none absolute inset-0 z-40 select-none"
              >
                {/* 01: INTERACTION */}
                <div className="absolute -left-6 top-[28%] flex items-center gap-2 font-mono text-[9px] tracking-wider text-white/60">
                  <span className="text-[#E7472E]">01</span>
                  <span>INTERACTION</span>
                  <span className="h-px w-6 bg-white/20" />
                </div>

                {/* 02: FRONTEND */}
                <div className="absolute -right-6 top-[24%] flex items-center gap-2 font-mono text-[9px] tracking-wider text-white/60">
                  <span className="h-px w-6 bg-white/20" />
                  <span>FRONTEND</span>
                  <span className="text-[#E7472E]">02</span>
                </div>

                {/* 03: MOTION */}
                <div className="absolute left-[30%] -bottom-6 flex items-center gap-2 font-mono text-[9px] tracking-wider text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E7472E]" />
                  <span>MOTION</span>
                  <span className="text-[#E7472E]">03</span>
                </div>

                {/* 04: PERFORMANCE */}
                <div className="absolute -right-4 bottom-[28%] flex items-center gap-2 font-mono text-[9px] tracking-wider text-white/60">
                  <span className="h-px w-6 bg-white/20" />
                  <span>PERFORMANCE</span>
                  <span className="text-[#E7472E]">04</span>
                </div>
              </div>

              {/* ────────────────────────────────────────────────────────── */}
              {/* FRAGMENT 8: RETICLE TARGET INDICATOR                       */}
              {/* ────────────────────────────────────────────────────────── */}
              <div
                ref={fragReticleRef}
                className="pointer-events-none absolute right-[18%] top-[8%] z-40 flex items-center gap-1.5 font-mono text-[8px] text-white/40"
              >
                <div className="relative flex h-4 w-4 items-center justify-center rounded-full border border-white/30">
                  <span className="h-1 w-1 rounded-full bg-[#E7472E]" />
                </div>
                <span>TGT: PHYSICS_CORE</span>
              </div>
            </div>

            {/* ── MOBILE DEDICATED COMPOSITION (Section 22) ─────────────── */}
            {/* Clean, controlled vertical installation without chaotic overlap */}
            <div className="flex w-full flex-col gap-4 md:hidden">
              
              {/* Mobile Main Browser Window */}
              <div className="relative w-full rounded-xl border border-white/18 bg-[#0e0e10] shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 bg-[#141416] px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white/25" />
                    <span className="h-2 w-2 rounded-full bg-white/25" />
                    <span className="h-2 w-2 rounded-full bg-white/25" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded border border-white/10 bg-black/40 px-2.5 py-0.5 font-mono text-[9px] text-white/60">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                    <span>modexa.systems</span>
                  </div>
                  <span className="font-mono text-[8px] text-white/40">PROD</span>
                </div>
                <div className="relative aspect-[16/10] w-full bg-black">
                  <Image
                    src="/images/web1.png"
                    alt="Web development project experience preview"
                    fill
                    sizes="100vw"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Mobile Supporting Cards: Code + Spec */}
              <div className="grid grid-cols-2 gap-3">
                {/* Code Card */}
                <div className="rounded-lg border border-white/12 bg-[#0c0c0e] p-3 font-mono text-[9px] leading-tight text-white/80">
                  <div className="mb-1 text-white/40">SYS.CONFIG</div>
                  <div>
                    <span className="text-white/50">design: </span>
                    <span className="text-[#E7472E]">true</span>
                  </div>
                  <div>
                    <span className="text-white/50">interact: </span>
                    <span className="text-[#E7472E]">true</span>
                  </div>
                  <div>
                    <span className="text-white/50">perf: </span>
                    <span className="text-[#E7472E]">true</span>
                  </div>
                </div>

                {/* Mobile Spec Card */}
                <div className="flex flex-col justify-between rounded-lg border border-white/12 bg-[#0c0c0e] p-3 font-mono text-[9px] text-white/70">
                  <div className="text-white/40">CADENCE</div>
                  <div className="font-semibold text-white">60FPS // NEXT.JS</div>
                  <div className="text-emerald-400">LATENCY &lt; 14MS</div>
                </div>
              </div>

              {/* Mobile Technical Labels Strip */}
              <div className="flex flex-wrap items-center justify-between border-t border-white/10 pt-3 font-mono text-[9px] uppercase tracking-wider text-white/50">
                <span className="flex items-center gap-1">
                  <span className="text-[#E7472E]">01</span> INTERACTION
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#E7472E]">02</span> FRONTEND
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#E7472E]">03</span> MOTION
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#E7472E]">04</span> PERF
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* MINIMAL BOTTOM SCROLL INDICATOR (Section 18)                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-10 mx-auto mt-4 flex w-full max-w-[1440px] items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-wider text-white/45 sm:text-[11px]"
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          <span>SPEC: DEV.04 // MODEXA</span>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection("stack")}
          aria-label="Scroll to explore web development"
          className="group flex items-center gap-3 transition-colors hover:text-white"
        >
          <span className="tracking-widest">SCROLL TO EXPLORE</span>
          <span
            aria-hidden="true"
            className="relative flex h-5 w-3.5 items-center justify-center rounded-full border border-white/40 transition-colors group-hover:border-white"
          >
            <span className="h-1 w-0.5 -translate-y-0.5 rounded-full bg-white transition-transform duration-300 group-hover:translate-y-0.5" />
          </span>
        </button>

        <div className="hidden sm:block text-right text-white/35">
          GRID REF. 7180-819-8828
        </div>
      </div>
    </section>
  );
}
