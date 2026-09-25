"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// The kinetic typography section at the bottom of the reference image:
// Left side: Large partially-cropped words ("...ON", "...E")
// Right side: "REACH into" (mix of serif) then "CONVE..." being cut off
// This is a large architectural type composition occupying most of the viewport

export default function KineticTypeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // The small meta line at the top
      gsap.fromTo(
        ".kinetic-meta",
        { opacity: 0, y: 10 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".kinetic-meta", start: "top 85%", once: true },
        }
      );

      // Left side words animate from left
      gsap.fromTo(
        ".kinetic-left-words",
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1.5, ease: "power3.out",
          scrollTrigger: { trigger: ".kinetic-left-words", start: "top 80%", once: true },
        }
      );

      // Right side words animate from right
      gsap.fromTo(
        ".kinetic-right-words",
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 1.5, ease: "power3.out",
          scrollTrigger: { trigger: ".kinetic-right-words", start: "top 80%", once: true },
        }
      );

      // The desktop poster parallax is deliberately omitted on touch layouts.
      media.add("(min-width: 1024px)", () => {
        gsap.to(".kinetic-left-words", {
          yPercent: -15,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5, invalidateOnRefresh: true },
        });
        gsap.to(".kinetic-right-words", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5, invalidateOnRefresh: true },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      media.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dm-kinetic"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#f7f5ef" }}
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-14">
        <div
          className="kinetic-meta flex items-center gap-4 md:gap-6 pt-10 pb-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest border-t"
          style={{ borderColor: "#E8E2D5", color: "#55534E", fontFamily: "'DM Mono', monospace" }}
        >
          <span>06 // KINETIC METRIC POSTER</span>
          <span className="w-4 h-px bg-[#E8E2D5]" />
          <span className="text-[#E7472E] font-bold">SYSTEM STATEMENT</span>
        </div>

        <div className="relative w-full min-h-[380px] lg:min-h-[660px] overflow-hidden py-7 md:py-10">
          <div className="absolute inset-x-[2.5%] top-5 bottom-4 mx-auto h-full border border-[#E8E2D5] bg-[#f8f6f1]" />
          <div className="absolute left-8 top-14 h-[72%] w-px bg-[#E8E2D5] md:left-14" />
          <div className="absolute right-8 top-14 h-[72%] w-px bg-[#E8E2D5] md:right-14" />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#E8E2D5] opacity-80" />

          <div className="kinetic-left-words absolute left-5 top-12 md:left-12 md:top-16 lg:left-16 hidden flex-col leading-none select-none md:flex" style={{ zIndex: 1 }}>
            <div
              className="block"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(3.8rem, 9vw, 12rem)",
                fontWeight: 700,
                letterSpacing: "-0.08em",
                color: "#151515",
                lineHeight: 0.8,
              }}
            >
              REACH
            </div>
            <div
              className="flex items-end gap-2 md:gap-4"
              style={{ marginTop: "0.2em" }}
            >
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2.4rem, 6vw, 8rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.06em",
                  color: "#151515",
                  lineHeight: 0.8,
                }}
              >
                INTO
              </span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2rem, 4.5vw, 6rem)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#E7472E",
                  lineHeight: 0.8,
                }}
              >
                motion
              </span>
            </div>
          </div>

          <div className="kinetic-right-words absolute right-5 top-20 md:right-12 md:top-24 lg:right-20 hidden flex-col items-end text-right leading-none select-none md:flex" style={{ zIndex: 1 }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(3.8rem, 9vw, 12rem)",
                fontWeight: 700,
                letterSpacing: "-0.08em",
                color: "#151515",
                lineHeight: 0.8,
              }}
            >
              CONVER
            </div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.6rem, 6vw, 7.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.08em",
                color: "#E7472E",
                lineHeight: 0.8,
                marginTop: "0.2em",
              }}
            >
              SION
            </div>
          </div>

          <div className="relative z-[1] flex min-h-[310px] flex-col justify-center gap-2 px-6 py-10 md:hidden">
            <div className="font-display text-[clamp(3.25rem,18vw,5rem)] font-bold leading-[0.78] tracking-[-0.08em] text-[#151515]">REACH</div>
            <div className="flex items-end gap-2 font-display text-[clamp(2.5rem,13vw,4rem)] font-bold leading-[0.8] tracking-[-0.07em] text-[#151515]">
              INTO <span className="font-editorial text-[clamp(2rem,10vw,3rem)] font-normal italic tracking-normal text-[#E7472E]">motion</span>
            </div>
            <div className="mt-8 self-end font-display text-[clamp(3.25rem,18vw,5rem)] font-bold leading-[0.78] tracking-[-0.08em] text-[#151515]">CONVER<span className="text-[#E7472E]">SION</span></div>
            <p className="mt-8 max-w-[15rem] self-center text-center font-editorial text-xl italic leading-tight text-[#151515]/80">Creative systems that turn attention into connection.</p>
          </div>

          <div className="absolute inset-x-0 top-[65%] z-[2] hidden -translate-y-1/2 justify-center px-8 md:flex md:px-12">
            <div className="max-w-2xl text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2.1em", marginTop: "2.8rem" }}>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.5rem, 2.8vw, 2.8rem)",
                  lineHeight: 1.12,
                  color: "#151515",
                  fontStyle: "italic",
                  opacity: 0.82,
                }}
              >
                Creative systems that turn attention into measurable growth.
              </div>
              <div
                className="font-mono uppercase"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.58rem",
                  letterSpacing: "0.24em",
                  color: "#55534E",
                }}
              >
                strategy / creative / distribution
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(0.72rem, 1vw, 0.9rem)",
                  lineHeight: 1.7,
                  color: "#55534E",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  maxWidth: "540px",
                }}
              >
                built for attention, connection and the right destination.
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex md:gap-5" style={{ zIndex: 2 }}>
            <span className="h-[2px] w-12 bg-[#151515] md:w-20" />
            <span
              className="font-mono uppercase tracking-[0.28em]"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.56rem",
                color: "#55534E",
                letterSpacing: "0.28em",
              }}
            >
              CONNECTION
            </span>
            <span className="h-[2px] w-12 bg-[#151515] md:w-20" />
          </div>

          <div className="absolute bottom-20 left-8 hidden md:left-12 md:block" style={{ zIndex: 2 }}>
            <div
              className="font-mono uppercase"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                color: "#55534E",
                letterSpacing: "0.2em",
              }}
            >
              01 // SIGNAL
            </div>
          </div>

          <div className="absolute bottom-20 right-8 hidden md:right-12 md:block" style={{ zIndex: 2 }}>
            <div
              className="font-mono uppercase"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.58rem",
                color: "#55534E",
                letterSpacing: "0.2em",
              }}
            >
              02 // SCALE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
