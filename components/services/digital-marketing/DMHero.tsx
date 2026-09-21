"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function DMHero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Line mask reveals for headline
      const lines = headlineRef.current?.querySelectorAll(".line-mask");
      if (lines) {
        gsap.fromTo(
          lines,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.1,
          }
        );
      }

      // Label reveal
      gsap.fromTo(
        ".dm-hero-label",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.05 }
      );

      // Body copy reveal
      gsap.fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power2.out", delay: 0.55 }
      );

      // Right card reveal
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 40, y: 20 },
        { opacity: 1, x: 0, y: 0, duration: 1.3, ease: "power3.out", delay: 0.25 }
      );

      // Subtle mouse parallax on card
      const handleMouseMove = (e: MouseEvent) => {
        if (!cardRef.current || !heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        gsap.to(cardRef.current, {
          x: dx * 18,
          y: dy * 12,
          duration: 0.9,
          ease: "power2.out",
        });
      };

      const el = heroRef.current;
      el?.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => el?.removeEventListener("mousemove", handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="dm-hero"
      className="relative w-full min-h-screen overflow-hidden select-none"
      style={{ backgroundColor: "#f7f5ef" }}
    >
      <div className="relative max-w-[1400px] mx-auto w-full px-5 md:px-8 lg:px-14 pt-14 pb-20 min-h-screen flex flex-col justify-between overflow-x-hidden">

        {/* Top editorial label */}
        <div className="dm-hero-label flex items-center gap-3 mb-8 md:mb-10">
          <span
            className="font-mono text-[9px] sm:text-[10px] px-2.5 py-1 border text-[#E7472E] tracking-widest uppercase font-bold"
            style={{ borderColor: "#E8E2D5", fontFamily: "'DM Mono', monospace" }}
          >
            [ DIGITAL MARKETING & ATTENTION ARCHITECTURE ]
          </span>
        </div>

        {/* Main composition row */}
        <div className="flex-1 grid grid-cols-12 gap-0 items-start">

          {/* LEFT: Giant editorial headline */}
          <div className="col-span-12 lg:col-span-8 xl:col-span-7 flex flex-col">
            <div ref={headlineRef} className="mb-6 md:mb-8 max-w-full">
              <div className="overflow-hidden mb-1">
                <div
                  className="line-mask block w-full max-w-full"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(3.25rem, 8vw, 10rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                    lineHeight: 0.88,
                    color: "#151515",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                  }}
                >
                  ATTENTION
                </div>
              </div>
              <div className="overflow-hidden mb-1">
                <div
                  className="line-mask block w-full max-w-full"
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    fontSize: "clamp(2.15rem, 5vw, 5.5rem)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    letterSpacing: "-0.02em",
                    lineHeight: 0.92,
                    color: "#55534E",
                    maxWidth: "100%",
                  }}
                >
                  is not captured.
                </div>
              </div>
              <div className="overflow-hidden mb-1">
                <div
                  className="line-mask block w-full max-w-full"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(3.25rem, 8vw, 10rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                    lineHeight: 0.88,
                    color: "#151515",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                  }}
                >
                  IT IS
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className="line-mask block w-full max-w-full"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(3.25rem, 8vw, 10rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                    lineHeight: 0.88,
                    color: "#151515",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                  }}
                >
                  DESIGNED.
                </div>
              </div>
            </div>

            {/* Body copy — two column layout */}
            <div ref={bodyRef} className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
              <div>
                <p
                  className="text-[#55534E] text-[0.8rem] sm:text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  We build digital marketing through strategy, content, and
                  creative direction — engineering the moments that make brands
                  impossible to scroll past.
                </p>
                <a
                  href="#dm-campaigns"
                  className="inline-flex items-center gap-2 mt-5 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#151515] border-b border-[#151515] pb-0.5 hover:text-[#E7472E] hover:border-[#E7472E] transition-colors"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  EXPLORE THE ARCHITECTURE ↓
                </a>
              </div>
              <div
                className="flex flex-col gap-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider"
                style={{ fontFamily: "'DM Mono', monospace", color: "#55534E" }}
              >
                <div className="flex justify-between border-b border-[#E8E2D5] pb-1.5">
                  <span>01 / CONTENT</span>
                  <span className="text-[#E7472E] font-bold">SOCIAL</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E2D5] pb-1.5">
                  <span>02 / STRATEGY</span>
                  <span>AUDIENCE</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E2D5] pb-1.5">
                  <span>03 / CREATIVE</span>
                  <span>CAMPAIGN</span>
                </div>
                <div className="flex justify-between pb-1.5">
                  <span>04 / GROWTH</span>
                  <span className="text-[#E7472E] font-bold">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Floating dark media card */}
          <div className="hidden lg:flex col-span-4 xl:col-span-5 justify-end items-start pt-4">
            <div
              ref={cardRef}
              className="relative w-full max-w-[340px] xl:max-w-[380px] flex flex-col shadow-2xl"
              style={{ backgroundColor: "#151515" }}
            >
              {/* Card top bar */}
              <div
                className="flex items-center justify-between px-3 py-2 border-b font-mono text-[9px] uppercase tracking-wider"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  fontFamily: "'DM Mono', monospace",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <span className="px-1.5 py-0.5 text-white font-bold" style={{ backgroundColor: "#E7472E" }}>
                  CAMPAIGN 01
                </span>
                <span>FRM 04:17:03</span>
              </div>

              {/* Campaign image */}
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img
                  src="/images/media__1789795957723.png"
                  alt="Campaign visual"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p
                    className="text-white text-xs leading-snug italic mb-2"
                    style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: "0.8rem" }}
                  >
                    "Every brand silence is someone else's moment."
                  </p>
                  <div
                    className="font-mono text-[8px] uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Mono', monospace" }}
                  >
                    SOCIAL DIRECTION // CONTENT LAB
                  </div>
                </div>
              </div>

              {/* Card bottom */}
              <div className="px-3 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div
                  className="text-white font-semibold text-sm mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Campaign Velocity & Content Structure
                </div>
                <div className="flex items-end gap-[2px] h-6">
                  {[4, 7, 10, 6, 14, 8, 12, 5, 9, 16, 7, 11, 4, 13].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1"
                      style={{
                        height: `${h}px`,
                        backgroundColor: i % 3 === 0 ? "#E7472E" : "rgba(255,255,255,0.3)",
                      }}
                    />
                  ))}
                </div>
                <div
                  className="font-mono text-[8px] uppercase tracking-widest mt-2"
                  style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace" }}
                >
                  EST. 24 / Q3 STUDIO
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
