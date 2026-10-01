"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const WORDS = [
  { text: "RHYTHM", color: "text-white" },
  { text: "STORY", color: "text-[#f06443]" },
  { text: "PACE", color: "text-[#c4c7c7] italic" },
];

export default function KineticTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const loop = gsap.to(track, {
      xPercent: -50,
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    return () => {
      loop.kill();
    };
  }, []);

  return (
    <section
      aria-label="Rhythm, story and pace"
      className="relative w-full overflow-hidden border-y border-[#30312d] bg-[#1b1c18] py-10 text-white select-none sm:py-14"
    >
      <p className="sr-only">Rhythm. Story. Pace.</p>
      <div className="overflow-hidden whitespace-nowrap">
        <div ref={trackRef} aria-hidden="true" className="flex w-max items-center will-change-transform">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className={`flex shrink-0 items-center gap-7 pr-7 sm:gap-10 sm:pr-10 md:gap-12 md:pr-12 ${copy === 1 ? "motion-reduce:hidden" : ""}`}
            >
              {WORDS.map((item) => (
                <span key={item.text} className="flex items-center gap-7 sm:gap-10 md:gap-12">
                  <span className={`font-display text-[2.8rem] font-medium uppercase leading-none tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-8xl ${item.color}`}>
                    {item.text}
                  </span>
                  <span className="font-mono text-sm text-[#f06443] sm:text-base" aria-hidden="true">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
