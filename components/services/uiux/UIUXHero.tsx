"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UIUX_HERO_PROJECT_IDS, UIUX_PROJECTS } from "./UIUXProjects";
import { useUIUXProjectActions } from "./UIUXProjectProvider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LAYER_CLASSES = [
  "left-[14%] top-[17%] z-20 h-[65%] w-[70%] sm:left-[16%] sm:w-[66%]",
  "left-[1%] top-[9%] z-10 h-[56%] w-[35%]",
  "right-[0%] top-[5%] z-30 h-[48%] w-[32%]",
  "right-[7%] bottom-[1%] z-40 h-[47%] w-[38%]",
];

const LAYER_ROTATIONS = [-1.2, 1.8, 1.3, -1.5];

export default function UIUXHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const layerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { openProject } = useUIUXProjectActions();

  const heroProjects = UIUX_HERO_PROJECT_IDS.map((id) =>
    UIUX_PROJECTS.find((project) => project.id === id),
  ).filter((project) => project !== undefined);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const lines = textRef.current?.querySelectorAll<HTMLElement>("[data-hero-line]");
        gsap.fromTo(
          lines || [],
          { yPercent: 108, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.95, stagger: 0.1, ease: "power3.out", delay: 0.08 },
        );

        const cards = layerRefs.current.filter(
          (card): card is HTMLButtonElement => card !== null,
        );
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            {
              autoAlpha: 0,
              y: 24 + index * 5,
              x: index % 2 === 0 ? 18 : -18,
              rotation: LAYER_ROTATIONS[index] * 1.8,
              clipPath: "inset(14% 8% 18% 8%)",
            },
            {
              autoAlpha: 1,
              y: 0,
              x: 0,
              rotation: LAYER_ROTATIONS[index],
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.05,
              delay: 0.18 + index * 0.1,
              ease: "power3.out",
            },
          );
        });

        const stage = section.querySelector<HTMLElement>("[data-hero-stage]");
        if (!stage) return;

        const pointerSetters = cards.map((card, index) => ({
          x: gsap.quickTo(card, "x", { duration: 0.55 + index * 0.08, ease: "power3.out" }),
          y: gsap.quickTo(card, "y", { duration: 0.55 + index * 0.08, ease: "power3.out" }),
        }));

        const canParallax =
          window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
        const onPointerMove = (event: MouseEvent) => {
          if (!canParallax) return;
          const rect = stage.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          pointerSetters.forEach((setter, index) => {
            const depth = 5 + index * 2.5;
            setter.x(x * depth);
            setter.y(y * depth * 0.65);
          });
        };
        const onPointerLeave = () => {
          pointerSetters.forEach((setter) => {
            setter.x(0);
            setter.y(0);
          });
        };

        if (canParallax) {
          stage.addEventListener("mousemove", onPointerMove, { passive: true });
          stage.addEventListener("mouseleave", onPointerLeave);
        }

        cards.forEach((card, index) => {
          const spreadX = index % 2 === 0 ? -12 - index * 2 : 12 + index * 2;
          const spreadY = index % 2 === 0 ? -8 : 9;
          gsap.to(card, {
            xPercent: spreadX,
            yPercent: spreadY,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        });

        return () => {
          stage.removeEventListener("mousemove", onPointerMove);
          stage.removeEventListener("mouseleave", onPointerLeave);
        };
      });

      gsap.fromTo(
        section.querySelectorAll("[data-hero-meta]"),
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08, delay: 0.55, ease: "power2.out" },
      );
    }, section);

    return () => context.revert();
  }, []);

  const emphasizeLayer = (activeIndex: number | null) => {
    layerRefs.current.forEach((card, index) => {
      if (!card) return;
      const active = activeIndex === index;
      gsap.to(card, {
        scale: active ? 1.035 : activeIndex === null ? 1 : 0.975,
        opacity: active || activeIndex === null ? 1 : 0.58,
        duration: 0.32,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  };

  return (
    <section
      ref={sectionRef}
      id="uiux-hero"
      className="relative w-full overflow-hidden border-b border-[#E8E2D5] bg-[#f7f5ef]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E2D5] px-5 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#55534E] md:px-8 lg:px-14">
        <span data-hero-meta className="font-bold text-[#E7472E]">UI/UX DESIGN / 02</span>
        <span data-hero-meta>DESIGN SYSTEM IN MOTION</span>
        <span data-hero-meta className="hidden sm:inline">CLARITY / STRUCTURE / INTERACTION</span>
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-5 px-5 pb-8 pt-8 sm:px-8 sm:pb-12 md:pt-12 lg:grid-cols-12 lg:gap-4 lg:px-14 lg:pb-14 lg:pt-14">
        <div className="relative z-50 lg:col-span-5">
          <p data-hero-meta className="mb-4 font-mono text-[9px] uppercase tracking-[0.15em] text-[#747878]">
            INDEPENDENT DIGITAL DESIGN
          </p>
          <h1 ref={textRef} className="font-display uppercase leading-[0.84] tracking-[-0.065em] text-[#151515]">
            <span className="block overflow-hidden pb-1"><span data-hero-line className="block text-[clamp(2.75rem,11vw,4.2rem)] lg:text-[clamp(3.3rem,6vw,6.2rem)]">DESIGNING</span></span>
            <span className="block overflow-hidden pb-1"><span data-hero-line className="block text-[clamp(2.75rem,11vw,4.2rem)] lg:text-[clamp(3.3rem,6vw,6.2rem)]">DIGITAL</span></span>
            <span className="block overflow-hidden pb-1"><span data-hero-line className="block whitespace-nowrap text-[clamp(2.75rem,9.7vw,4.2rem)] lg:text-[clamp(3rem,5.55vw,5.8rem)]">EXPERIENCES<span className="text-[#E7472E]">.</span></span></span>
          </h1>
          <div data-hero-meta className="mt-6 flex max-w-md items-start gap-4 sm:mt-8">
            <span className="mt-2 h-px w-8 shrink-0 bg-[#E7472E]" />
            <p className="font-sans text-sm leading-relaxed text-[#55534E] sm:text-[15px]">
              We design digital experiences with clarity, structure and intent.
            </p>
          </div>
          <p data-hero-meta className="mt-7 font-mono text-[8px] uppercase tracking-[0.14em] text-[#8f8b82]">
            INTERFACE / SYSTEM / MOTION
          </p>
        </div>

        <div
          data-hero-stage
          className="relative isolate h-[min(112vw,31rem)] min-h-[360px] w-full overflow-hidden sm:min-h-[430px] lg:col-span-7 lg:h-[min(56vw,44rem)] lg:min-h-[510px]"
          aria-label="Layered previews of UI and UX design work"
        >
          <div className="pointer-events-none absolute inset-0 drafting-grid opacity-40" />
          {heroProjects.map((project, index) => (
            <button
              key={project.id}
              ref={(node) => {
                layerRefs.current[index] = node;
              }}
              type="button"
              onClick={() => openProject(project.id)}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") emphasizeLayer(index);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "mouse") emphasizeLayer(null);
              }}
              onFocus={() => emphasizeLayer(index)}
              onBlur={() => emphasizeLayer(null)}
              aria-label={"Open " + project.title + " in the project viewer"}
              aria-haspopup="dialog"
              className={"group absolute overflow-hidden border border-[#d8d2c5] bg-[#fbf9f3] p-0 text-left shadow-[0_18px_45px_rgba(25,22,18,0.14)] focus-visible:z-[60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E7472E] " + LAYER_CLASSES[index]}
              style={{ transformOrigin: "center center" }}
            >
              <Image
                src={project.src}
                alt=""
                fill
                sizes="(max-width: 767px) 75vw, (max-width: 1023px) 65vw, 36vw"
                quality={60}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover object-top transition-[filter] duration-500 group-hover:brightness-[1.02]"
                draggable={false}
              />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-[#151515]/90 px-2 py-1.5 font-mono text-[7px] uppercase tracking-[0.12em] text-white opacity-90 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:px-3 sm:py-2 sm:text-[9px]">
                <span>{String(project.index).padStart(2, "0")} <span className="text-[#E7472E]">/</span> {project.category}</span>
                <span className="whitespace-nowrap text-[#E7472E] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">VIEW DESIGN →</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#E8E2D5] px-5 py-2 font-mono text-[8px] uppercase tracking-[0.13em] text-[#8f8b82] sm:px-8 lg:px-14">
        <span data-hero-meta>SELECT A LAYER TO EXPLORE</span>
        <span data-hero-meta>{String(heroProjects.length).padStart(2, "0")} PREVIEWS / FULL DESIGN VIEW</span>
      </div>
    </section>
  );
}
