"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AtmosphericBackground from "./AtmosphericBackground";
import StartProjectButton from "@/components/motion/StartProjectButton";

gsap.registerPlugin(ScrollTrigger);

// ─── helpers ────────────────────────────────────────────────────────────────

/** Split a string into individual word/whitespace spans for staggered reveals */
function SplitWords({
  text,
  className,
  wordClassName,
  "data-hero-word": dataAttr,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  "data-hero-word"?: string;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <span
            className={wordClassName}
            data-hero-word={dataAttr}
            aria-hidden="true"
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {word}
            {i < text.split(" ").length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

// ─── component ──────────────────────────────────────────────────────────────

export default function WebDevHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLButtonElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);

  // ── scroll to section helper ─────────────────────────────────────────────
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // ── entrance + scroll animations ─────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Make everything visible immediately without animation
      gsap.set(
        [pillRef.current, line1Ref.current, line2Ref.current, paraRef.current, ctaRef.current, scrollBarRef.current],
        { opacity: 1, y: 0, clipPath: "none" }
      );
      return;
    }

    // ── Collect inner word spans for line-by-line reveal ───────────────────
    const l1Words = line1Ref.current
      ? Array.from(line1Ref.current.querySelectorAll<HTMLSpanElement>("[data-hero-word='line1']"))
      : [];
    const l2Words = line2Ref.current
      ? Array.from(line2Ref.current.querySelectorAll<HTMLSpanElement>("[data-hero-word='line2']"))
      : [];

    // ── Initial hidden state ────────────────────────────────────────────────
    gsap.set(pillRef.current, { opacity: 0, y: 18, filter: "blur(4px)" });
    gsap.set([...l1Words, ...l2Words], { y: "115%", opacity: 0 });
    gsap.set(paraRef.current, { opacity: 0, y: 22, filter: "blur(3px)" });
    gsap.set(ctaRef.current, { opacity: 0, y: 20, filter: "blur(2px)" });
    gsap.set(scrollBarRef.current, { opacity: 0 });

    // ── Master entrance timeline ────────────────────────────────────────────
    const tl = gsap.timeline({ delay: 0.12 });

    tl.to(pillRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.7,
      ease: "power3.out",
    });

    tl.to(
      l1Words,
      {
        y: "0%",
        opacity: 1,
        duration: 0.82,
        ease: "power3.out",
        stagger: 0.048,
      },
      "-=0.35"
    );

    tl.to(
      l2Words,
      {
        y: "0%",
        opacity: 1,
        duration: 0.78,
        ease: "power3.out",
        stagger: 0.044,
      },
      "-=0.55"
    );

    tl.to(
      paraRef.current,
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
      "-=0.42"
    );

    tl.to(
      ctaRef.current,
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65, ease: "power3.out" },
      "-=0.5"
    );

    tl.to(
      scrollBarRef.current,
      { opacity: 1, duration: 0.5, ease: "power2.inOut" },
      "-=0.25"
    );

    // ── Scroll-exit: gently push content up as user scrolls away ───────────
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        if (p < 0.01) return;
        gsap.set([line1Ref.current, line2Ref.current], {
          y: `${-p * 40}px`,
          opacity: 1 - p * 1.8,
        });
        gsap.set(paraRef.current, {
          y: `${-p * 24}px`,
          opacity: 1 - p * 2.4,
        });
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Magnetic primary CTA ─────────────────────────────────────────────────
  useEffect(() => {
    const btn = primaryBtnRef.current;
    if (!btn) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const setX = gsap.quickTo(btn, "x", { duration: 0.55, ease: "power3.out" });
    const setY = gsap.quickTo(btn, "y", { duration: 0.55, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      setX(dx * 0.38);
      setY(dy * 0.38);
    };

    const handleLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.55)" });
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
      aria-labelledby="web-development-title"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden bg-black px-5 pb-8 pt-24 text-white sm:px-8 md:px-12 lg:px-16"
    >
      <AtmosphericBackground />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-12 text-center md:py-16">

        {/* Pill / label */}
        <div
          ref={pillRef}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/35 px-4 py-2 font-sans text-xs text-white/85 shadow-[0_0_28px_rgba(255,255,255,0.06)] sm:mb-10 sm:text-sm"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]"
          />
          <span>
            WEB DEVELOPMENT{" "}
            <span className="px-1 text-white/35">/</span>{" "}
            DIGITAL EXPERIENCES
          </span>
        </div>

        {/* Headline with word-level mask reveal */}
        <h1
          id="web-development-title"
          className="max-w-[1200px] font-display text-[clamp(3rem,7.2vw,7.5rem)] font-normal uppercase leading-[0.94] tracking-[-0.055em] text-white"
          style={{ textShadow: "0 0 54px rgba(255,255,255,0.09)" }}
          aria-label="WE BUILD DIGITAL EXPERIENCES."
        >
          {/* Line 1 */}
          <span
            ref={line1Ref}
            style={{ display: "block", overflow: "hidden" }}
            aria-hidden="true"
          >
            <SplitWords
              text="WE BUILD DIGITAL"
              wordClassName="inline-block"
              data-hero-word="line1"
            />
          </span>
          <br aria-hidden="true" />
          {/* Line 2 */}
          <span
            ref={line2Ref}
            style={{ display: "block", overflow: "hidden" }}
            aria-hidden="true"
            className="font-light"
          >
            <SplitWords
              text="EXPERIENCES."
              wordClassName="inline-block"
              data-hero-word="line2"
            />
          </span>
        </h1>

        {/* Sub-copy */}
        <p
          ref={paraRef}
          className="mt-6 max-w-[620px] px-2 font-sans text-sm leading-relaxed text-white/65 sm:mt-8 sm:text-base"
        >
          Websites and digital products built where design, interaction and
          technology meet.
        </p>

        {/* CTA cluster */}
        <div
          ref={ctaRef}
          className="mt-8 flex w-full max-w-[720px] flex-col items-stretch justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
        >
          {/*
            Wrap StartProjectButton in a span so we can attach our own ref
            to the <a> element it renders inside.
            The magnetic effect targets the anchor via `primaryBtnRef`.
          */}
          <span
            ref={(span) => {
              // Reach into the span to find the rendered anchor
              if (span) {
                const anchor = span.querySelector<HTMLAnchorElement>("a");
                if (anchor) {
                    primaryBtnRef.current = anchor;
                }
              }
            }}
            style={{ display: "contents" }}
          >
            <StartProjectButton
              href="#inquiry-station"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("inquiry-station");
              }}
            />
          </span>

          <a
            href="#works"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("works");
            }}
            className="rounded-xl border border-white/35 bg-black/35 px-5 py-3 font-sans text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/75 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            VIEW OUR WORK
          </a>

          <a
            href="#stack"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("stack");
            }}
            className="rounded-xl border border-white/35 bg-black/35 px-5 py-3 font-sans text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/75 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            EXPLORE WEB DEVELOPMENT
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <button
        ref={scrollBarRef}
        type="button"
        onClick={() => scrollToSection("stack")}
        aria-label="Scroll down to explore web development"
        className="relative z-10 mx-auto flex w-full max-w-[820px] items-center gap-4 border-t border-white/10 px-1 pt-5 text-left font-sans text-xs text-white/55 transition-colors hover:text-white/80 sm:gap-6 sm:pt-6 sm:text-sm"
      >
        <span className="shrink-0">Scroll down</span>
        <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
        <span
          aria-hidden="true"
          className="relative flex h-7 w-4 shrink-0 justify-center rounded-full border border-white/70 before:mt-1 before:h-1.5 before:w-px before:animate-[scroll-nudge_2.2s_ease-in-out_infinite] before:bg-white/80 motion-reduce:before:animate-none"
        />
        <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
        <span className="shrink-0">to explore</span>
      </button>
    </section>
  );
}
