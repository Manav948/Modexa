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
      style={{ backgroundColor: "#f7f5ef", minHeight: "70vh" }}
    >
      {/* Meta line at top */}
      <div
        className="kinetic-meta flex items-center gap-6 px-5 md:px-8 lg:px-14 pt-10 pb-0 font-mono text-[10px] uppercase tracking-widest border-t"
        style={{ borderColor: "#E8E2D5", color: "#55534E", fontFamily: "'DM Mono', monospace" }}
      >
        <span>06 // KINETIC METRIC POSTER</span>
        <span className="w-4 h-px bg-[#E8E2D5]" />
        <span className="text-[#E7472E] font-bold">SYSTEM STATEMENT</span>
      </div>

      {/* Main kinetic type composition */}
      <div className="relative w-full flex">

        {/* LEFT: Partially cropped large words — extends beyond left edge */}
        <div
          className="kinetic-left-words absolute left-0 top-0 bottom-0 flex flex-col justify-start pt-4"
          style={{ zIndex: 1 }}
        >
          {/* "ENTION" — last part of ATTENTION (partially cropped left edge) */}
          <div
            className="leading-none select-none"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(6rem, 16vw, 18rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#151515",
              marginLeft: "-0.12em",
              opacity: 0.9,
              lineHeight: 0.88,
            }}
          >
            ON
          </div>
          {/* "TENT" — part of CONTENT */}
          <div
            className="leading-none select-none"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(6rem, 16vw, 18rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#E8E2D5",
              marginLeft: "-0.12em",
              lineHeight: 0.88,
            }}
          >
            E
          </div>
          {/* Dash separator — matches reference */}
          <div className="flex items-center gap-3 pl-3 mt-2">
            <span className="w-12 h-[2px]" style={{ backgroundColor: "#E8E2D5" }} />
          </div>
          <div
            className="leading-none select-none mt-1"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(6rem, 16vw, 18rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#E8E2D5",
              marginLeft: "-0.12em",
              lineHeight: 0.88,
            }}
          >
            Y
          </div>
        </div>

        {/* RIGHT: "REACH into CONVE..." — right-anchored and partially cropped */}
        <div
          className="kinetic-right-words absolute right-0 bottom-6 flex flex-col items-end text-right"
          style={{ zIndex: 1 }}
        >
          {/* "REACH into" — serif mix */}
          <div className="flex items-baseline gap-3 leading-none select-none">
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(4rem, 10vw, 12rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: "#E8E2D5",
                lineHeight: 0.88,
              }}
            >
              REACH
            </span>
            <span
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: "clamp(3rem, 7.5vw, 9rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#E7472E",
                lineHeight: 0.88,
              }}
            >
              into
            </span>
          </div>

          {/* Dash line — matches reference */}
          <div className="flex items-center gap-3 justify-end pr-4 my-1">
            <span className="w-16 h-[2px]" style={{ backgroundColor: "#E8E2D5" }} />
          </div>

          {/* "CONVE..." — partially cropped right edge */}
          <div
            className="leading-none select-none overflow-hidden"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(5rem, 13vw, 15rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#151515",
              marginRight: "-0.08em",
              lineHeight: 0.88,
            }}
          >
            CONVER
          </div>
        </div>

        {/* Invisible spacer to give the section its height */}
        <div className="w-full" style={{ height: "60vh", minHeight: "420px" }} />
      </div>
    </section>
  );
}
