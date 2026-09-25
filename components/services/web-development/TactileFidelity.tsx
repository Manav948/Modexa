"use client";

import { useState } from "react";

const MODULES = [
  {
    number: "01",
    label: "MOTION RESPONSE",
    title: "KINETIC SPRING DAMPING",
    description: "Natural movement, controlled acceleration and a smooth, deliberate settle.",
    visual: "spring",
  },
  {
    number: "02",
    label: "RESPONSIVE SYSTEM",
    title: "HARDWARE THREAD ISOLATION",
    description: "Separate interaction work from expensive rendering so input remains responsive.",
    visual: "threads",
  },
  {
    number: "03",
    label: "VISUAL SYSTEM",
    title: "FLUID CLIP PATH TOPOLOGY",
    description: "Controlled clip-path transitions create smooth visual movement without unnecessary layout work.",
    visual: "clip-path",
  },
  {
    number: "04",
    label: "INPUT RESPONSE",
    title: "ZERO-DELAY TACTILE TRIGGERS",
    description: "Direct interaction should feel immediate, physical and predictable.",
    visual: "tactile",
  },
] as const;

const THREAD_BARS = [
  { label: "THREAD", heights: ["h-8", "h-10", "h-9", "h-12", "h-10"] },
  { label: "INPUT", heights: ["h-7", "h-11", "h-9", "h-8", "h-10"] },
  { label: "RENDER", heights: ["h-12", "h-10", "h-14", "h-11", "h-13"] },
  { label: "RESPONSE", heights: ["h-8", "h-9", "h-11", "h-8", "h-10"] },
];

export default function TactileFidelity() {
  const [isResponseActive, setIsResponseActive] = useState(false);

  return (
    <section
      aria-labelledby="interaction-metrics-title"
      className="w-full border-t border-[#E8E2D5] bg-[#F7F5EF] px-5 py-16 text-[#151515] sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-10 border-b border-[#E8E2D5] pb-8 sm:mb-12 sm:pb-10 lg:mb-14">
          <p data-interaction-intro className="mb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#747878] sm:text-[11px]">
            SECTION 04 <span className="px-1.5 text-[#E7472E]">{"//"}</span> INTERACTION METRICS
          </p>
          <h2
            id="interaction-metrics-title"
            data-interaction-intro
            className="font-display text-[clamp(2.5rem,7vw,5.75rem)] font-normal uppercase leading-[0.92] tracking-[-0.06em]"
          >
            <span className="block">DEVELOPMENT</span>
            <span className="mt-1 block">
              IS <span className="font-editorial font-normal italic lowercase tracking-[-0.035em] text-[#55534E]">how it</span>{" "}
              <span className="font-display font-medium not-italic">FEELS</span>
            </span>
          </h2>
          <p data-interaction-intro className="mt-5 max-w-[610px] font-sans text-sm leading-relaxed text-[#55534E] sm:mt-6 sm:text-[15px]">
            Visual aesthetics mean nothing if the physical responsiveness of an interface feels sluggish or uncertain.
          </p>
        </header>

        <div className="grid grid-cols-1 border-l border-t border-[#E8E2D5] md:grid-cols-2">
          {MODULES.map((module) => (
            <article
              key={module.number}
              data-interaction-module
              className="flex min-w-0 flex-col border-b border-r border-[#E8E2D5] bg-[#F7F5EF] p-5 sm:p-7 lg:p-8"
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#E8E2D5] pb-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#E7472E] sm:text-[11px]">
                  {module.number} <span className="px-1">{"//"}</span> {module.label}
                </p>
                <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-[#E8E2D5]" />
              </div>

              <h3 data-module-title className="mt-5 font-display text-xl font-medium uppercase leading-tight tracking-[-0.035em] sm:text-2xl lg:text-[26px]">
                {module.title}
              </h3>
              <p data-module-description className="mt-2 max-w-[460px] font-sans text-sm leading-relaxed text-[#55534E]">
                {module.description}
              </p>

              <div className="mt-auto flex min-h-[132px] items-end pt-8" aria-label={`${module.title} technical visualization`}>
                {module.visual === "spring" && (
                  <svg aria-hidden="true" className="h-[92px] w-full overflow-visible" fill="none" viewBox="0 0 440 96" preserveAspectRatio="none">
                    <path d="M0 58H440" stroke="#E8E2D5" strokeWidth="1" />
                    <path data-draw-path d="M0 57 C38 57 48 56 72 53 C94 50 98 17 124 16 C154 14 151 81 183 79 C212 77 207 32 238 31 C267 30 265 67 296 66 C327 65 329 45 357 46 C387 47 392 58 440 58" stroke="#E7472E" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="124" cy="16" r="2.5" fill="#E7472E" />
                    <circle cx="440" cy="58" r="2.5" fill="#151515" />
                  </svg>
                )}

                {module.visual === "threads" && (
                  <div className="w-full">
                    <div className="grid grid-cols-4 gap-3 sm:gap-5">
                      {THREAD_BARS.map((group, groupIndex) => (
                        <div key={group.label} className="flex h-[86px] items-end justify-between gap-1 border-b border-[#E8E2D5] px-1">
                          {group.heights.map((height, barIndex) => (
                            <span
                              key={`${group.label}-${barIndex}`}
                              data-thread-bar
                              className={`block w-[3px] origin-bottom ${height} ${groupIndex === 1 && barIndex === 2 ? "bg-[#E7472E]" : "bg-[#c9c5bc]"}`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 grid grid-cols-4 gap-3 sm:gap-5">
                      {THREAD_BARS.map((group) => (
                        <span key={group.label} className="text-center font-mono text-[8px] uppercase tracking-[0.08em] text-[#747878] sm:text-[9px]">
                          {group.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {module.visual === "clip-path" && (
                  <svg aria-hidden="true" className="h-[92px] w-full" fill="none" viewBox="0 0 440 96" preserveAspectRatio="none">
                    <path d="M0 77H440" stroke="#E8E2D5" strokeWidth="1" />
                    <path d="M0 64 C82 64 97 62 147 52 C207 40 227 13 281 15 C341 18 359 48 440 27" stroke="#c9c5bc" strokeWidth="1" />
                    <path data-draw-path d="M0 71 C82 71 99 67 150 58 C210 46 228 20 284 22 C345 25 365 54 440 34" stroke="#151515" strokeWidth="1.5" strokeLinecap="round" />
                    <circle data-response-ring cx="284" cy="22" r="4" fill="#E7472E" />
                  </svg>
                )}

                {module.visual === "tactile" && (
                  <div className="flex w-full items-center justify-between gap-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#747878]">READY <span className="text-[#E8E2D5]">/</span> INPUT</span>
                    <button
                      type="button"
                      aria-label="Toggle the tactile response visualization"
                      aria-pressed={isResponseActive}
                      onClick={() => setIsResponseActive((active) => !active)}
                      className="group/trigger relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-[#E8E2D5] transition-colors duration-300 hover:border-[#c9c5bc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E7472E]"
                    >
                      <svg aria-hidden="true" className="h-20 w-20" fill="none" viewBox="0 0 80 80">
                        <circle data-response-ring cx="40" cy="40" r="27" stroke="#c9c5bc" strokeWidth="1" />
                        <circle data-response-ring cx="40" cy="40" r="17" stroke="#E8E2D5" strokeWidth="1" />
                        <circle cx="40" cy="40" r="4" fill={isResponseActive ? "#E7472E" : "#151515"} className="transition-colors duration-200" />
                        <circle cx="59" cy="29" r="2.5" fill="#E7472E" />
                      </svg>
                    </button>
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#747878]">RESPONSE <span className="text-[#E8E2D5]">/</span> SETTLE</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
