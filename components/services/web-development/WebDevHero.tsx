"use client";

import AtmosphericBackground from "./AtmosphericBackground";
import StartProjectButton from "@/components/motion/StartProjectButton";

export default function WebDevHero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="web-development-title"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-black px-5 pb-8 pt-24 text-white sm:px-8 md:px-12 lg:px-16"
    >
      <AtmosphericBackground />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-12 text-center md:py-16">
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/35 px-4 py-2 font-sans text-xs text-white/85 shadow-[0_0_28px_rgba(255,255,255,0.06)] sm:mb-10 sm:text-sm">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
          <span>WEB DEVELOPMENT <span className="px-1 text-white/35">/</span> DIGITAL EXPERIENCES</span>
        </div>

        <h1
          id="web-development-title"
          className="max-w-[1200px] font-display text-[clamp(3rem,7.2vw,7.5rem)] font-normal uppercase leading-[0.94] tracking-[-0.055em] text-white"
          style={{ textShadow: "0 0 54px rgba(255,255,255,0.09)" }}
        >
          WE BUILD DIGITAL
          <br />
          <span className="font-light">EXPERIENCES.</span>
        </h1>

        <p className="mt-6 max-w-[620px] px-2 font-sans text-sm leading-relaxed text-white/65 sm:mt-8 sm:text-base">
          Websites and digital products built where design, interaction and technology meet.
        </p>

        <div className="mt-8 flex w-full max-w-[720px] flex-col items-stretch justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
          <StartProjectButton href="#inquiry-station" onClick={(event) => { event.preventDefault(); scrollToSection("inquiry-station"); }} />
          <a
            href="#works"
            onClick={(event) => { event.preventDefault(); scrollToSection("works"); }}
            className="rounded-xl border border-white/35 bg-black/35 px-5 py-3 font-sans text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/75 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >VIEW OUR WORK</a>
          <a
            href="#stack"
            onClick={(event) => { event.preventDefault(); scrollToSection("stack"); }}
            className="rounded-xl border border-white/35 bg-black/35 px-5 py-3 font-sans text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/75 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >EXPLORE WEB DEVELOPMENT</a>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToSection("stack")}
        aria-label="Scroll down to explore web development"
        className="relative z-10 mx-auto flex w-full max-w-[820px] items-center gap-4 border-t border-white/10 px-1 pt-5 text-left font-sans text-xs text-white/55 transition-colors hover:text-white/80 sm:gap-6 sm:pt-6 sm:text-sm"
      >
        <span className="shrink-0">Scroll down</span>
        <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
        <span aria-hidden="true" className="relative flex h-7 w-4 shrink-0 justify-center rounded-full border border-white/70 before:mt-1 before:h-1.5 before:w-px before:animate-[scroll-nudge_2.2s_ease-in-out_infinite] before:bg-white/80 motion-reduce:before:animate-none" />
        <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
        <span className="shrink-0">to explore</span>
      </button>
    </section>
  );
}
