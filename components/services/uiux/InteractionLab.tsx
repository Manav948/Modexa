"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PILLARS = [
  {
    num: "LAB. 01",
    sub: "HOVER ADDITION",
    title: "Hover Dynamics",
    desc: "Displacement-first interaction calibrated to anticipate cursor state human direction targets and handle friction.",
    // Mini UI: button hover demo
    ui: "button",
  },
  {
    num: "LAB. 02",
    sub: "KINETIC ENTITY",
    title: "Kinetic Transitions",
    desc: "Direct linear morphing from temporal transition and harmonic circular reality high-density rendering.",
    // Mini UI: progress bar / timeline
    ui: "progress",
  },
  {
    num: "LAB. 03",
    sub: "ALGORITHM ARCH.",
    title: "Spatial Structure",
    desc: "Physical plane and structure removing balanced editorial time class without macro artificial blur overlays.",
    // Mini UI: grid fragment
    ui: "grid",
  },
  {
    num: "LAB. 04",
    sub: "HAPTIC PROFILE",
    title: "Feedback Cadence",
    desc: "Where mechanical vibro-stimulation harmonic filter requency response for tactile audio routines.",
    // Mini UI: pulse line
    ui: "pulse",
  },
];

function MiniUI({ type }: { type: string }) {
  if (type === "button") {
    return (
      <div className="p-4" style={{ backgroundColor: "#f7f5ef" }}>
        <div
          className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest font-bold text-white"
          style={{ backgroundColor: "#151515", fontFamily: "'DM Mono', monospace" }}
        >
          TEST MOMENT
        </div>
        <div
          className="mt-2 font-mono text-[8px] text-[#55534E] uppercase"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          &lt;E: 0.7px // &lt;E: 17.7px
        </div>
      </div>
    );
  }
  if (type === "progress") {
    return (
      <div className="p-4" style={{ backgroundColor: "#f7f5ef" }}>
        <div
          className="flex items-center justify-between font-mono text-[8px] uppercase mb-2"
          style={{ fontFamily: "'DM Mono', monospace", color: "#55534E" }}
        >
          <span>⊞ PRIORITY</span>
          <span>⊞ COMPLETE</span>
        </div>
        <div className="w-full h-1.5 bg-[#E8E2D5]">
          <div className="h-full w-[65%]" style={{ backgroundColor: "#E7472E" }} />
        </div>
        <div
          className="mt-2 font-mono text-[8px] text-[#55534E] uppercase leading-relaxed"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          (ARC): cadence(action [DL &gt;TB,<br />1.β.δ. T])
        </div>
      </div>
    );
  }
  if (type === "grid") {
    return (
      <div className="p-4" style={{ backgroundColor: "#f7f5ef" }}>
        <div
          className="font-mono text-[8px] text-[#E7472E] font-bold mb-2 uppercase"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          F-DB // ROUTING MESH
        </div>
        {[
          ["1-7 // 1] / 6[20", "BACK BUTTON"],
          ["1-10 | / 1] 6[0", "SIGNAL CELL"],
          ["2-10 | / 6] 4[0", "ACTION REF"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between py-1 border-b font-mono text-[8px] uppercase"
            style={{ borderColor: "#E8E2D5", fontFamily: "'DM Mono', monospace", color: "#55534E" }}
          >
            <span>{k}</span>
            <span className="text-[#151515] font-bold">{v}</span>
          </div>
        ))}
      </div>
    );
  }
  if (type === "pulse") {
    return (
      <div className="p-4" style={{ backgroundColor: "#f7f5ef" }}>
        <div
          className="flex items-center justify-between font-mono text-[8px] uppercase mb-2"
          style={{ fontFamily: "'DM Mono', monospace", color: "#55534E" }}
        >
          <span className="text-[#E7472E] font-bold">PULSOR FLASH</span>
          <span>LOGIC TICK</span>
        </div>
        <svg viewBox="0 0 200 40" className="w-full" style={{ height: "40px" }}>
          <polyline
            points="0,20 30,20 45,5 60,35 80,20 110,8 130,30 160,20 200,20"
            fill="none"
            stroke="#E7472E"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <div className="mt-1 font-mono text-[8px] text-[#55534E] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
          EPS RESPONSE: 108 AL →
        </div>
      </div>
    );
  }
  return null;
}

export default function InteractionLab() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Big italic heading — word-by-word stagger
      gsap.fromTo(".lab-word",
        { opacity: 0, y: 30, skewY: 1.5 },
        {
          opacity: 1, y: 0, skewY: 0, duration: 1.1, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".lab-heading", start: "top 80%", once: true },
        }
      );

      // Label + body
      gsap.fromTo(".lab-top-meta",
        { opacity: 0, y: 14 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".lab-top-meta", start: "top 85%", once: true },
        }
      );

      // 4 columns staggered
      gsap.fromTo(".lab-pillar",
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: ".lab-pillars", start: "top 82%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="uiux-interaction-lab"
      className="w-full pt-16 pb-16"
      style={{ backgroundColor: "#f7f5ef" }}
    >
      <div className="max-w-[1400px] mx-auto w-full px-5 md:px-8 lg:px-14">

        {/* Section header */}
        <div className="lab-top-meta flex flex-wrap items-start justify-between gap-6 mb-12">
          <div>
            <div
              className="font-mono text-[9px] uppercase tracking-widest text-[#E7472E] font-bold mb-2"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              SECTION 02 // RESEARCH BODY
            </div>

            {/* The large italic Interaction Laboratory heading */}
            <div className="lab-heading overflow-visible">
              <div className="flex flex-wrap gap-x-4 gap-y-0">
                {["The", "Interaction", "Laboratory"].map((word) => (
                  <span
                    key={word}
                    className="lab-word inline-block"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)",
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: "#151515",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.0,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right body copy */}
          <div className="max-w-xs pt-2">
            <p
              className="text-[#55534E] text-sm leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We design digital experiences with clarity, structure and intent. Motion and feedback make the next action feel natural.
            </p>
          </div>
        </div>

        {/* Four pillars */}
        <div className="lab-pillars grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#E8E2D5]">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.num}
              className={`lab-pillar flex flex-col ${i < 3 ? "border-r border-[#E8E2D5]" : ""}`}
            >
              {/* Pillar header */}
              <div className="px-4 pt-5 pb-4 border-b border-[#E8E2D5]">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-mono text-[8px] uppercase tracking-widest text-[#E7472E] font-bold"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {pillar.num}
                  </span>
                  <span
                    className="font-mono text-[8px] uppercase tracking-wider text-[#55534E]"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {pillar.sub}
                  </span>
                </div>
                <h3
                  className="text-[#151515] mb-2"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.35rem",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="text-[#55534E] text-xs leading-snug"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {pillar.desc}
                </p>
              </div>

              {/* Mini UI preview */}
              <MiniUI type={pillar.ui} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
