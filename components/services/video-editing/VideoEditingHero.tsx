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
  const imageRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const headline = headlineRef.current;
    const image = imageRef.current;
    const support = supportRef.current;
    const cta = ctaRef.current;

    if (!hero || !headline || !image || !support || !cta) return;

    let cleanupPointer: (() => void) | undefined;

    const context = gsap.context(() => {
      const headlineLines = headline.querySelectorAll<HTMLElement>("[data-headline-line]");
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set([headlineLines, image, support, cta], { clearProps: "all" });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(
          headlineLines,
          { x: -26, yPercent: -105, autoAlpha: 0, filter: "blur(3px)" },
          { x: 0, yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.85, stagger: 0.1 },
          0.2,
        )
        .fromTo(
          image,
          { scale: 0.94, y: 24, autoAlpha: 0 },
          { scale: 1, y: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" },
          0.3,
        )
        .fromTo(
          support,
          { x: -16, y: 10, autoAlpha: 0 },
          { x: 0, y: 0, autoAlpha: 1, duration: 0.6 },
          0.85,
        )
        .fromTo(
          cta,
          { x: 16, y: 10, autoAlpha: 0 },
          { x: 0, y: 0, autoAlpha: 1, duration: 0.6 },
          1.05,
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
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      if (window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) {
        const imageX = gsap.quickTo(image, "x", { duration: 0.6, ease: "power3.out" });
        const imageY = gsap.quickTo(image, "y", { duration: 0.6, ease: "power3.out" });
        const headlineX = gsap.quickTo(headline, "x", { duration: 0.6, ease: "power3.out" });

        const handlePointerMove = (event: PointerEvent) => {
          const bounds = hero.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          imageX(x * 5);
          imageY(y * 4);
          headlineX(x * 2);
        };
        const resetPointer = () => {
          imageX(0);
          imageY(0);
          headlineX(0);
        };

        hero.addEventListener("pointermove", handlePointerMove, { passive: true });
        hero.addEventListener("pointerleave", resetPointer, { passive: true });
        cleanupPointer = () => {
          hero.removeEventListener("pointermove", handlePointerMove);
          hero.removeEventListener("pointerleave", resetPointer);
          gsap.killTweensOf([image, headline]);
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
      className="relative isolate -mt-20 min-h-[100svh] overflow-hidden bg-[#111820] text-white"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src="/edit/editHero.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-[#111820]/20" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1680px] flex-col justify-center px-5 pb-12 pt-24 sm:px-8 lg:px-12">
        <div className="relative z-10 max-w-[40rem] lg:ml-[3%] lg:mt-[-2rem] lg:w-[56%]">
            <h1
              id="editing-hero-title"
              ref={headlineRef}
              className="font-display text-[clamp(3.2rem,12vw,7.4rem)] font-medium uppercase leading-[0.79] tracking-[-0.065em] text-white lg:text-[clamp(4.2rem,7vw,7.2rem)]"
            >
              {["EVERY CUT", "CHANGES", "THE STORY."].map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.09em]">
                  <span className="block" data-headline-line>{line}</span>
                </span>
              ))}
            </h1>
            <p ref={supportRef} className="mt-5 max-w-[24rem] text-sm leading-relaxed text-white/90 sm:text-base">
              Editing shaped by rhythm, emotion and the moments worth keeping.
            </p>
            <div ref={ctaRef} className="mt-6 flex items-center">
              <Link href="#selected-work" className="inline-flex min-h-11 items-center gap-3 bg-[#b6240f] px-4 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#941d0d] sm:px-5">
                EXPLORE SELECTED WORK <span aria-hidden="true">→</span>
              </Link>
            </div>
        </div>
      </div>
    </section>
  );
}