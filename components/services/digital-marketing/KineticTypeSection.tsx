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

      // Parallax scroll effect on the type
      gsap.to(".kinetic-left-words", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(".kinetic-right-words", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
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

        <div className="relative w-full min-h-[500px] md:min-h-[660px] overflow-hidden py-7 md:py-10">
          <div className="absolute inset-x-[2.5%] top-5 bottom-4 mx-auto h-full border border-[#E8E2D5] bg-[#f8f6f1]" />
          <div className="absolute left-8 top-14 h-[72%] w-px bg-[#E8E2D5] md:left-14" />
          <div className="absolute right-8 top-14 h-[72%] w-px bg-[#E8E2D5] md:right-14" />
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#E8E2D5] opacity-80" />

          <div className="kinetic-left-words absolute left-5 top-12 md:left-12 md:top-16 lg:left-16 flex flex-col leading-none select-none" style={{ zIndex: 1 }}>
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
                  fontFamily: "'Newsreader', Georgia, serif",
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

          <div className="kinetic-right-words absolute right-5 top-20 md:right-12 md:top-24 lg:right-20 flex flex-col items-end text-right leading-none select-none" style={{ zIndex: 1 }}>
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

          <div className="absolute inset-x-0 top-[65%] z-[2] flex -translate-y-1/2 justify-center px-8 md:px-12">
            <div className="max-w-2xl text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2.1em", marginTop: "2.8rem" }}>
              <div
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
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
                strategy / creative / conversion
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
                built for visibility, resonance, and performance across every scroll.
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 md:gap-5" style={{ zIndex: 2 }}>
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
              PERFORMANCE
            </span>
            <span className="h-[2px] w-12 bg-[#151515] md:w-20" />
          </div>

          <div className="absolute bottom-20 left-8 md:left-12" style={{ zIndex: 2 }}>
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

          <div className="absolute bottom-20 right-8 md:right-12" style={{ zIndex: 2 }}>
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
