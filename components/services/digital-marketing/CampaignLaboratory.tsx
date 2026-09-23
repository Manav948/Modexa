"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CampaignLaboratory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Large "Strategy" word reveal
      gsap.fromTo(
        ".strategy-word",
        { opacity: 0, y: 40, skewY: 2 },
        {
          opacity: 1, y: 0, skewY: 0, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: ".strategy-word", start: "top 80%", once: true },
        }
      );

      // Quote reveal
      gsap.fromTo(
        ".lab-quote",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: "power2.out",
          scrollTrigger: { trigger: ".lab-quote", start: "top 82%", once: true },
        }
      );

      // Left card reveal
      gsap.fromTo(
        ".left-camp-card",
        { opacity: 0, x: -35 },
        {
          opacity: 1, x: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: ".left-camp-card", start: "top 80%", once: true },
        }
      );

      // Right card reveal
      gsap.fromTo(
        ".right-camp-card",
        { opacity: 0, x: 35 },
        {
          opacity: 1, x: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: ".right-camp-card", start: "top 80%", once: true },
        }
      );

      // Metrics card
      gsap.fromTo(
        ".metrics-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: "power2.out",
          scrollTrigger: { trigger: ".metrics-card", start: "top 85%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dm-campaigns"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#f7f5ef" }}
    >
      {/* ═══════════════════════════════════════════════════════
          MAIN ASYMMETRIC COMPOSITION AREA
          ═══════════════════════════════════════════════════════ */}
      <div className="relative w-full px-5 md:px-8 lg:px-14 py-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Three-column asymmetric grid (matches reference) */}
          <div className="relative grid grid-cols-12 gap-6 items-start min-h-[680px]">

            {/* ── LEFT dark portrait card ── */}
            <div className="left-camp-card col-span-12 md:col-span-4 lg:col-span-3 relative">
              <div
                className="relative flex flex-col shadow-xl"
                style={{ backgroundColor: "#151515" }}
              >
                {/* Card header */}
                <div
                  className="flex items-center justify-between px-3 py-2 border-b font-mono text-[9px] uppercase tracking-wider"
                  style={{ borderColor: "rgba(255,255,255,0.08)", fontFamily: "'DM Mono', monospace" }}
                >
                  <span className="px-1.5 py-0.5 text-white font-bold text-[8px]" style={{ backgroundColor: "#E7472E" }}>
                    SOCIAL 01
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>04:15:47</span>
                </div>

                {/* Portrait image */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "2/3" }}>
                  <img
                    src="/images/work_motion_stories_1789796354503.png"
                    alt="Campaign portrait"
                    className="w-full h-full object-cover grayscale contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/20 to-transparent" />

                  {/* Red progress line */}
                  <div className="absolute" style={{ bottom: "30%", left: 0, right: 0, height: "1px", backgroundColor: "#E7472E", opacity: 0.7 }} />

                  {/* Bottom quote on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p
                      className="text-white leading-tight italic text-xs mb-1"
                      style={{ fontFamily: "'Newsreader', Georgia, serif" }}
                    >
                      "Curve followed silence until the room answered."
                    </p>
                    <div
                      className="font-mono text-[8px] uppercase tracking-widest"
                      style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace" }}
                    >
                      CONTENT DIRECTION
                    </div>
                  </div>
                </div>

                {/* Bottom meta */}
                <div
                  className="flex items-center justify-between px-3 py-2 font-mono text-[8px] uppercase"
                  style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Mono', monospace" }}
                >
                  <span>EDIT: 01 // SOCIAL</span>
                  <span className="text-[#E7472E] font-bold">HD CUT</span>
                </div>
              </div>
            </div>

            {/* ── CENTER: large italic word + editorial quote ── */}
            <div className="col-span-12 md:col-span-8 lg:col-span-5 flex flex-col justify-start pt-6">
              {/* Large italic "Strategy" word */}
              <div
                className="strategy-word mb-6 leading-none"
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: "clamp(3.5rem, 7vw, 7rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#151515",
                  letterSpacing: "-0.02em",
                }}
              >
                Strategy
              </div>

              {/* Small description top-right (matches reference floating text) */}
              <p
                className="text-[#55534E] text-xs leading-relaxed max-w-[200px] mb-8 self-end -mt-10 hidden lg:block"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Decisive content systems — built around typography, platform context, and cultural timing.
              </p>

              {/* Editorial metadata line */}
              <div
                className="lab-quote flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#E7472E] font-bold mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                <span>CAMPAIGN DIRECTION // CONTENT BRIEF</span>
                <span className="flex-1 h-px" style={{ backgroundColor: "#E8E2D5" }} />
                <span className="text-[#55534E]">01 MKT</span>
              </div>

              {/* The big editorial quote */}
              <blockquote className="lab-quote">
                <p
                  className="leading-[1.0] mb-4 tracking-tight"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(1.75rem, 3.2vw, 3rem)",
                    fontWeight: 700,
                    color: "#151515",
                  }}
                >
                  "THE HOOK MUST{" "}
                  <span
                    className="underline decoration-[#E7472E] decoration-[3px] underline-offset-4"
                    style={{ color: "#E7472E" }}
                  >
                    BREATHE
                  </span>{" "}
                  BEFORE IT CONVERTS."
                </p>

                {/* Body paragraph below quote */}
                <p
                  className="text-[#55534E] text-sm leading-relaxed max-w-sm mb-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Most digital marketing misses because it demands attention before it
                  earns it. We design content that creates trust on the first scroll,
                  then drives behavior on the second.
                </p>

                {/* CTA + metadata row */}
                <div className="flex items-center justify-between border-t border-[#E8E2D5] pt-4">
                  <a
                    href="#dm-services"
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#151515] hover:text-[#E7472E] transition-colors"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    DISCOVER MORE →
                  </a>
                  <span
                    className="font-mono text-[10px] text-[#55534E] uppercase"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    CONTENT / CAMPAIGNS
                  </span>
                </div>
              </blockquote>
            </div>

            {/* ── RIGHT: second portrait card ── */}
            <div className="right-camp-card hidden lg:block col-span-4 lg:col-span-4 relative">
              {/* This card sits slightly lower — matches reference stagger */}
              <div className="mt-20">
                <div
                  className="relative flex flex-col border shadow-lg"
                  style={{ backgroundColor: "#151515", borderColor: "#2a2a2a" }}
                >
                  {/* Image */}
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
                    <img
                      src="/images/media__1789794671970.png"
                      alt="Campaign portrait 2"
                      className="w-full h-full object-cover sepia-[0.3] contrast-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-70" />
                  </div>

                  {/* Bottom editorial label */}
                  <div
                    className="px-3 py-3 border-t"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    <div
                      className="font-mono text-[8px] text-[#E7472E] uppercase tracking-widest font-bold mb-1"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      CONTENT DIRECTION
                    </div>
                    <div
                      className="text-white text-sm font-semibold mb-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                        A CLEARER SIGNAL
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-[8px] text-[#55534E] uppercase"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        EDITORIAL / 01
                      </span>
                      <span
                        className="font-mono text-[8px] text-[#E7472E] font-bold uppercase"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        SOCIAL BRIEF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              BOTTOM: Metrics / Analytics Card (horizontal)
              ═══════════════════════════════════════════════════════ */}
          <div className="metrics-card mt-12">
            <div
              className="w-full border flex flex-col md:flex-row items-stretch"
              style={{ borderColor: "#E8E2D5" }}
            >
              {/* Left: label and title */}
              <div
                className="px-6 py-5 border-b md:border-b-0 md:border-r flex flex-col justify-between min-w-[220px]"
                style={{ borderColor: "#E8E2D5" }}
              >
                <div>
                  <div
                    className="font-mono text-[9px] text-[#E7472E] uppercase tracking-widest font-bold mb-1"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    SONIC IDENTITY LAB
                  </div>
                  <div
                    className="text-[#55534E] font-mono text-[9px] uppercase"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    CAMPAIGN DIRECTION
                  </div>
                </div>
                <div
                  className="font-mono text-[10px] text-[#E7472E] font-bold mt-3 uppercase tracking-widest"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  CONTENT SYSTEM
                </div>
              </div>

              {/* Center: waveform bars */}
              <div className="flex-1 px-6 py-5 flex flex-col justify-center">
                <div className="flex items-end gap-[3px] h-14">
                  {[6, 12, 20, 8, 28, 15, 22, 10, 32, 18, 25, 9, 35, 14, 28, 19, 11, 30, 22, 17, 8, 24, 16, 13, 29, 21, 12, 26, 18, 10].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 min-w-[3px] transition-all"
                      style={{
                        height: `${(h / 35) * 56}px`,
                        backgroundColor:
                          i % 5 === 0 ? "#E7472E"
                          : i % 5 === 2 ? "#151515"
                          : "#E8E2D5",
                      }}
                    />
                  ))}
                </div>
                <p
                  className="text-[#55534E] text-xs leading-relaxed mt-3 max-w-md"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  A sonic-first content strategy generating consistent brand recall
                  across all platforms. Voice tonality mapped to each vertical.
                </p>
              </div>

              {/* Right: metadata column */}
              <div
                className="flex flex-col justify-center px-6 py-5 border-t md:border-t-0 md:border-l gap-2 min-w-[160px]"
                style={{ borderColor: "#E8E2D5" }}
              >
                <div
                  className="font-mono text-[9px] uppercase text-[#55534E]"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  REACH / RIGHT PLACES
                </div>
                <div
                  className="font-mono text-[9px] uppercase text-[#55534E]"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  RETENTION / RETURN
                </div>
                <div
                  className="font-mono text-[9px] uppercase text-[#E7472E] font-bold"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  CONNECTION ↑
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
