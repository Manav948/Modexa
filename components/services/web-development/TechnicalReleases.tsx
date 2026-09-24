"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    id: "01",
    title: "PROJECT 01",
    description: "A wellness landing page pairing editorial type with a full-bleed landscape image.",
    image: "/images/web1.png",
    width: 1285,
    height: 766,
    alt: "Yoga and meditation landing page with a mountain landscape",
  },
  {
    id: "02",
    title: "PROJECT 02",
    description: "An illustrated pet-care landing page designed around friendly service discovery.",
    image: "/images/web2.png",
    width: 666,
    height: 310,
    alt: "Pet care website with illustrated animals and service information",
  },
  {
    id: "03",
    title: "PROJECT 03",
    description: "A travel landing page pairing destination imagery with route discovery.",
    image: "/images/web3.png",
    width: 1052,
    height: 575,
    alt: "Travel website featuring a coastal road and destination imagery",
  },
  {
    id: "04",
    title: "PROJECT 04",
    description: "A sustainability landing page centered on environmental messaging and a nature-led visual system.",
    image: "/images/web4.png",
    width: 628,
    height: 285,
    alt: "Sustainability landing page with environmental messaging and green landscape imagery",
  },
];

const PROJECT_SPEED = 27;

export default function TechnicalReleases() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const reelTweenRef = useRef<gsap.core.Tween | null>(null);
  const activeIndexRef = useRef(0);
  const hoveredRef = useRef(false);
  const visibleRef = useRef(false);
  const playingRef = useRef(true);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstSet = firstSetRef.current;
    if (!section || !viewport || !track || !firstSet) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const intro = section.querySelectorAll<HTMLElement>("[data-work-intro]");
      gsap.fromTo(
        intro,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        },
      );

      const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
      const loopDistance = firstSet.getBoundingClientRect().width + gap;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const speed = isMobile ? 15 : PROJECT_SPEED;
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-project-frame]"));
      const scaleSetters = cards.map((card) => gsap.quickTo(card, "scale", { duration: 0.42, ease: "power2.out" }));
      const opacitySetters = cards.map((card) => gsap.quickTo(card, "opacity", { duration: 0.42, ease: "power2.out" }));

      const updateFocus = () => {
        const center = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
        let nearestIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
          const bounds = card.getBoundingClientRect();
          const distance = Math.abs(bounds.left + bounds.width / 2 - center);
          const influence = Math.max(0, 1 - distance / (viewport.clientWidth * 0.72));
          scaleSetters[index](0.965 + influence * 0.055);
          opacitySetters[index](0.76 + influence * 0.24);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = Number(card.dataset.projectIndex) || 0;
          }
        });

        if (nearestIndex !== activeIndexRef.current) {
          activeIndexRef.current = nearestIndex;
          setActiveProjectIndex(nearestIndex);
        }
      };

      const tween = gsap.to(track, {
        x: -loopDistance,
        duration: loopDistance / speed,
        ease: "none",
        repeat: -1,
        paused: true,
        onUpdate: updateFocus,
      });
      reelTweenRef.current = tween;
      updateFocus();

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          visibleRef.current = true;
          if (playingRef.current) tween.play();
        },
        onEnterBack: () => {
          visibleRef.current = true;
          if (playingRef.current) tween.play();
        },
        onLeave: () => {
          visibleRef.current = false;
          tween.pause();
        },
        onLeaveBack: () => {
          visibleRef.current = false;
          tween.pause();
        },
        onUpdate: (self) => {
          if (hoveredRef.current) return;
          const velocityInfluence = Math.min(Math.abs(self.getVelocity()) / 14000, 0.16);
          const factor = self.direction > 0 ? 1 + velocityInfluence : 1 - velocityInfluence * 0.55;
          tween.timeScale(factor);
        },
      });
    }, section);

    return () => {
      context.revert();
      reelTweenRef.current = null;
      visibleRef.current = false;
    };
  }, []);

  const renderProjects = (duplicate: boolean) =>
    PROJECTS.map((project, index) => (
      <article
        key={`${duplicate ? "copy" : "original"}-${project.id}`}
        data-project-frame
        data-project-index={index}
        className="project-frame group w-[clamp(260px,82vw,960px)] shrink-0 origin-center will-change-transform sm:w-[clamp(320px,68vw,960px)]"
      >
        <div className="relative aspect-[16/9] overflow-hidden border border-[#E8E2D5] bg-[#eeece5]">
          <Image
            src={project.image}
            alt={project.alt}
            width={project.width}
            height={project.height}
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 68vw, 960px"
            className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            draggable={false}
          />
          <span className="absolute left-3 top-3 border border-[#E8E2D5] bg-[#F7F5EF]/95 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[#55534E] sm:left-4 sm:top-4 sm:text-[10px]">
            {project.id} <span className="px-1 text-[#E7472E]">{"//"}</span> WEB DEVELOPMENT
          </span>
        </div>
        <div className="grid grid-cols-[1fr_auto] items-start gap-x-5 gap-y-2 border-b border-[#E8E2D5] py-4 sm:py-5">
          <h3 className="font-editorial text-2xl uppercase leading-none tracking-[-0.02em] text-[#151515] sm:text-3xl">{project.title}</h3>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#747878] sm:text-[10px]">{project.id} / {String(PROJECTS.length).padStart(2, "0")}</span>
          <p className="col-span-2 max-w-[560px] font-sans text-sm leading-relaxed text-[#55534E]">{project.description}</p>
        </div>
      </article>
    ));

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    hoveredRef.current = true;
    reelTweenRef.current?.timeScale(0.28);
  };

  const handlePointerLeave = () => {
    hoveredRef.current = false;
    reelTweenRef.current?.timeScale(1);
  };

  const togglePlayback = () => {
    const nextPlaying = !playingRef.current;
    playingRef.current = nextPlaying;
    setIsPlaying(nextPlaying);
    if (!nextPlaying) {
      reelTweenRef.current?.pause();
      return;
    }
    if (visibleRef.current) reelTweenRef.current?.play();
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="selected-work-title"
      className="w-full overflow-hidden border-t border-[#E8E2D5] bg-[#F7F5EF] py-16 text-[#151515] sm:py-20 lg:py-24"
    >
      <div className="mx-auto mb-9 flex max-w-[1440px] flex-col gap-5 px-5 sm:mb-12 sm:px-8 md:flex-row md:items-end md:justify-between md:px-12 lg:px-16">
        <div>
          <p data-work-intro className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#747878] sm:text-[11px]">
            SECTION 07 <span className="px-1.5 text-[#E7472E]">{"//"}</span> SELECTED WORK
          </p>
          <h2 data-work-intro id="selected-work-title" className="font-display text-4xl font-normal uppercase leading-none tracking-[-0.05em] sm:text-5xl lg:text-6xl">
            SELECTED WORK
          </h2>
        </div>
        <p data-work-intro className="max-w-[470px] font-sans text-sm leading-relaxed text-[#55534E] sm:text-[15px]">
          A selection of digital experiences built across design, development and interaction.
        </p>
      </div>

      <div
        ref={viewportRef}
        role="region"
        aria-label="Selected web development projects"
        tabIndex={0}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="w-full overflow-hidden outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#E7472E] motion-reduce:overflow-x-auto"
      >
        <div ref={trackRef} className="flex w-max gap-5 pl-[9vw] pr-[9vw] sm:gap-8 sm:pl-[16vw] sm:pr-[16vw] motion-reduce:transform-none">
          <div ref={firstSetRef} className="flex w-max shrink-0 gap-5 sm:gap-8">
            {renderProjects(false)}
          </div>
          <div aria-hidden="true" className="flex w-max shrink-0 gap-5 sm:gap-8 motion-reduce:hidden">
            {renderProjects(true)}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5 flex max-w-[1440px] items-center justify-between px-5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#747878] sm:mt-6 sm:px-8 sm:text-[10px] md:px-12 lg:px-16">
        <p aria-live="polite"><span className="text-[#E7472E]">{String(activeProjectIndex + 1).padStart(2, "0")}</span> / {String(PROJECTS.length).padStart(2, "0")}</p>
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause project reel" : "Play project reel"}
          className="border-b border-[#c9c5bc] pb-1 transition-colors hover:border-[#E7472E] hover:text-[#151515] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E7472E] motion-reduce:hidden"
        >
          {isPlaying ? "PAUSE REEL" : "PLAY REEL"}
        </button>
        <p>DRAG / SCROLL TO EXPLORE</p>
      </div>
    </section>
  );
}