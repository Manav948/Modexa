"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoEditingHero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    const imageFrame = imageFrameRef.current;
    const image = imageRef.current;
    const timeline = timelineRef.current;
    const playhead = playheadRef.current;
    const metadata = metadataRef.current;
    const rule = ruleRef.current;

    if (!hero || !headline || !imageFrame || !image || !timeline || !playhead || !metadata || !rule) return;

    let cleanupPointer: (() => void) | undefined;

    const context = gsap.context(() => {
      const headlineLines = headline.querySelectorAll<HTMLElement>("[data-headline-line]");
      const metadataItems = metadata.querySelectorAll<HTMLElement>("[data-meta]");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set([headlineLines, imageFrame, image, timeline, metadataItems, rule], { clearProps: "all" });
        gsap.set(playhead, { left: "68%" });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(rule, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.65 }, 0.05)
        .fromTo(timeline, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.9 }, 0.22)
        .fromTo(
          playhead,
          { left: "0%", opacity: 0 },
          { left: "68%", opacity: 1, duration: 2.2, ease: "power2.inOut" },
          0.48,
        )
        .fromTo(
          headlineLines,
          { yPercent: 108, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.13 },
          0.58,
        )
        .fromTo(
          imageFrame,
          { clipPath: "inset(0 0 100% 0)", autoAlpha: 0.6 },
          { clipPath: "inset(0 0 0% 0)", autoAlpha: 1, duration: 1.1, ease: "power3.inOut" },
          0.95,
        )
        .fromTo(image, { scale: 1.09 }, { scale: 1, duration: 2, ease: "power2.out" }, 0.95)
        .fromTo(
          metadataItems,
          { y: 8, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.07 },
          1.25,
        );

      gsap.to(headline, {
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.7,
        },
      });
      gsap.to(image, {
        scale: 1.06,
        yPercent: -3,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.to(timeline, {
        xPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });
      gsap.to(metadataItems, {
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom 45%",
          scrub: 0.8,
        },
      });

      if (window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) {
        const imageX = gsap.quickTo(image, "x", { duration: 0.6, ease: "power3.out" });
        const imageY = gsap.quickTo(image, "y", { duration: 0.6, ease: "power3.out" });
        const ruleX = gsap.quickTo(rule, "x", { duration: 0.7, ease: "power3.out" });
        const ruleY = gsap.quickTo(rule, "y", { duration: 0.7, ease: "power3.out" });
        const playheadX = gsap.quickTo(playhead, "x", { duration: 0.5, ease: "power3.out" });

        const handlePointerMove = (event: PointerEvent) => {
          const bounds = hero.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          imageX(x * 5);
          imageY(y * 4);
          ruleX(x * -2);
          ruleY(y * 1.5);
          playheadX(x * 2);
        };
        const resetPointer = () => {
          imageX(0);
          imageY(0);
          ruleX(0);
          ruleY(0);
          playheadX(0);
        };

        hero.addEventListener("pointermove", handlePointerMove, { passive: true });
        hero.addEventListener("pointerleave", resetPointer, { passive: true });
        cleanupPointer = () => {
          hero.removeEventListener("pointermove", handlePointerMove);
          hero.removeEventListener("pointerleave", resetPointer);
          gsap.killTweensOf([image, rule, playhead]);
        };
      }
    }, hero);

    return () => {
      cleanupPointer?.();
      context.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      aria-labelledby="editing-hero-title"
      className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden border-b border-white/15 bg-[#1b1c18] text-[#fbf9f3]"
    >
      <div ref={imageFrameRef} className="absolute inset-0">
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src="/images/editing-hero-unsplash.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[#17100d]/45" />
        <div className="absolute inset-0 bg-[#8c2d16]/20 mix-blend-multiply" />
      </div>

      <div className="pointer-events-none absolute inset-x-[5%] top-[19%] hidden h-px origin-left bg-white/30 lg:block" ref={ruleRef} />

      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-[1680px] flex-col px-5 pb-6 pt-5 sm:px-8 lg:px-12">
        <div ref={metadataRef} className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.15em] text-white/75 sm:text-[10px]">
          <span data-meta>VIDEO EDITING / 01</span>
          <span className="hidden sm:inline" data-meta>SHORT FORM / LONG FORM / MOTION</span>
          <span data-meta>VISUAL STUDY / UNSPLASH</span>
        </div>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-16 text-center">
          <p className="mb-5 flex items-center gap-2 font-mono text-[9px] font-medium uppercase tracking-[0.22em] text-white/85 sm:text-[10px]" data-meta>
            <span className="h-px w-6 bg-[#f06443]" /> THE EDIT STARTS BEFORE THE CUT
          </p>
          <h1
            id="editing-hero-title"
            ref={headlineRef}
            aria-label="We make people feel the story."
            className="w-full font-display text-[clamp(2.7rem,6.3vw,6.8rem)] font-medium leading-[0.9] tracking-[-0.055em] text-white lg:text-[clamp(4rem,6.3vw,6.8rem)]"
          >
            <span className="hidden overflow-hidden pb-[0.08em] lg:block">
              <span className="block" data-headline-line>WE MAKE PEOPLE</span>
            </span>
            <span className="hidden overflow-hidden pb-[0.08em] lg:block">
              <span className="block" data-headline-line>FEEL THE STORY.</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] lg:hidden">
              <span className="block" data-headline-line>WE MAKE</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] lg:hidden">
              <span className="block" data-headline-line>PEOPLE FEEL</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em] lg:hidden">
              <span className="block" data-headline-line>THE STORY.</span>
            </span>
          </h1>
          <p className="mt-5 max-w-md text-xs leading-relaxed text-white/80 sm:text-sm" data-meta>
            Rhythm, timing and restraint turn footage into feeling.
          </p>
          <Link
            href="#selected-work"
            className="mt-7 inline-flex min-h-11 items-center gap-3 border border-white/50 px-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white transition-colors hover:border-[#f06443] hover:bg-[#b6240f]"
            data-meta
          >
            Explore the edit <span aria-hidden="true" className="text-[#f06443]">↓</span>
          </Link>
        </div>

        <div className="mt-auto">
          <div className="mb-2 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.14em] text-white/70 sm:text-[9px]">
            <span data-meta>00:00:12:08 / 24 FPS</span>
            <span className="hidden sm:inline" data-meta>FOOTAGE / CUT / RHYTHM / STORY</span>
            <span data-meta>FRAME 001</span>
          </div>
          <div ref={timelineRef} className="relative h-8 border-t border-white/35" aria-label="Editorial timeline">
            <div className="absolute inset-x-0 top-0 flex justify-between" aria-hidden="true">
              {Array.from({ length: 49 }, (_, index) => (
                <span key={index} className={`w-px bg-white/50 ${index % 4 === 0 ? "h-2" : "h-1"}`} />
              ))}
            </div>
            <div ref={playheadRef} aria-hidden="true" className="absolute -top-1 left-0 h-5 w-px bg-[#f06443]">
              <span className="absolute -left-[3px] -top-1 h-1.5 w-1.5 rotate-45 bg-[#f06443]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}