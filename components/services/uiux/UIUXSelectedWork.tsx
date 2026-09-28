"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { UIUX_PROJECTS } from "./UIUXProjects";
import { useUIUXProjectActions } from "./UIUXProjectProvider";

const N = UIUX_PROJECTS.length;
// 3 cloned sets: [Set 0 (clone before), Set 1 (middle original), Set 2 (clone after)]
const SLIDES = [...UIUX_PROJECTS, ...UIUX_PROJECTS, ...UIUX_PROJECTS];

function getProjectCards(track: HTMLDivElement | null) {
  return Array.from(track?.querySelectorAll<HTMLButtonElement>("[data-project-card]") || []);
}

function getProjectTargetX(
  viewport: HTMLDivElement | null,
  track: HTMLDivElement | null,
  index: number,
) {
  const cards = getProjectCards(track);
  const card = cards[index];
  if (!viewport || !card) return 0;
  return viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
}

type DragState = {
  pointerId: number;
  startX: number;
  startTrackX: number;
  lastX: number;
  lastTime: number;
  velocity: number;
  moved: boolean;
};

export default function UIUXSelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

  const cardScaleXRef = useRef<Array<(value: number) => void>>([]);
  const cardScaleYRef = useRef<Array<(value: number) => void>>([]);
  const cardOpacityRef = useRef<Array<(value: number) => void>>([]);

  // Start in the middle copy (index N)
  const activeTrackIndexRef = useRef(N);
  const targetTrackIndexRef = useRef(N);
  const isNavigatingRef = useRef(false);
  const suppressClickUntilRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const { openProject } = useUIUXProjectActions();

  // Updates card scaling and opacity based on distance to viewport center
  const updateFocus = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const center = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
    let nearestTrackIndex = activeTrackIndexRef.current;
    let nearestDistance = Number.POSITIVE_INFINITY;

    const cards = getProjectCards(track);
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      const influence = Math.max(0, 1 - distance / (viewport.clientWidth * 0.86));
      cardScaleXRef.current[index]?.(0.92 + influence * 0.08);
      cardScaleYRef.current[index]?.(0.92 + influence * 0.08);
      cardOpacityRef.current[index]?.(0.62 + influence * 0.38);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestTrackIndex = index;
      }
    });

    const realIndex = ((nearestTrackIndex % N) + N) % N;
    activeTrackIndexRef.current = nearestTrackIndex;
    setActiveIndex(realIndex);
  }, []);

  // Normalizes track position to the middle set [N, 2*N - 1] without any visual discontinuity
  const normalizeTrackPosition = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const curIndex = activeTrackIndexRef.current;
    if (curIndex >= 2 * N) {
      const wrapped = curIndex - N;
      const wrappedX = getProjectTargetX(viewport, track, wrapped);
      gsap.set(track, { x: wrappedX });
      activeTrackIndexRef.current = wrapped;
      targetTrackIndexRef.current = wrapped;
    } else if (curIndex < N) {
      const wrapped = curIndex + N;
      const wrappedX = getProjectTargetX(viewport, track, wrapped);
      gsap.set(track, { x: wrappedX });
      activeTrackIndexRef.current = wrapped;
      targetTrackIndexRef.current = wrapped;
    }
  }, []);

  // Truly infinite seamless navigation
  const navigate = useCallback(
    (direction: -1 | 1) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const cards = getProjectCards(track);
      if (!cards.length) return;

      // Silently normalize if we are at boundary before starting the next transition
      const setWidth = cards[N].offsetLeft - cards[0].offsetLeft;
      if (direction === 1 && targetTrackIndexRef.current >= 2 * N) {
        const curX = Number(gsap.getProperty(track, "x")) || 0;
        gsap.set(track, { x: curX + setWidth });
        targetTrackIndexRef.current -= N;
        activeTrackIndexRef.current -= N;
      } else if (direction === -1 && targetTrackIndexRef.current <= 0) {
        const curX = Number(gsap.getProperty(track, "x")) || 0;
        gsap.set(track, { x: curX - setWidth });
        targetTrackIndexRef.current += N;
        activeTrackIndexRef.current += N;
      }

      const nextTargetIndex = targetTrackIndexRef.current + direction;
      targetTrackIndexRef.current = nextTargetIndex;
      isNavigatingRef.current = true;

      const targetX = getProjectTargetX(viewport, track, nextTargetIndex);

      gsap.to(track, {
        x: targetX,
        duration: 0.68,
        ease: "power3.out",
        overwrite: "auto",
        onUpdate: updateFocus,
        onComplete: () => {
          isNavigatingRef.current = false;
          // Silently reposition to middle set if outside [N, 2*N - 1]
          if (nextTargetIndex >= 2 * N) {
            const wrapped = nextTargetIndex - N;
            const wrappedX = getProjectTargetX(viewport, track, wrapped);
            gsap.set(track, { x: wrappedX });
            activeTrackIndexRef.current = wrapped;
            targetTrackIndexRef.current = wrapped;
          } else if (nextTargetIndex < N) {
            const wrapped = nextTargetIndex + N;
            const wrappedX = getProjectTargetX(viewport, track, wrapped);
            gsap.set(track, { x: wrappedX });
            activeTrackIndexRef.current = wrapped;
            targetTrackIndexRef.current = wrapped;
          } else {
            activeTrackIndexRef.current = nextTargetIndex;
            targetTrackIndexRef.current = nextTargetIndex;
          }
          updateFocus();
        },
      });
    },
    [updateFocus],
  );

  const settleAtNearest = useCallback(
    (projectedX: number) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const cards = getProjectCards(track);
      let bestIndex = activeTrackIndexRef.current;
      let bestX = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const targetX = viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
        const distance = Math.abs(targetX - projectedX);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
          bestX = targetX;
        }
      });

      targetTrackIndexRef.current = bestIndex;
      gsap.to(track, {
        x: bestX,
        duration: 0.68,
        ease: "power3.out",
        overwrite: "auto",
        onUpdate: updateFocus,
        onComplete: () => {
          normalizeTrackPosition();
          updateFocus();
        },
      });
    },
    [normalizeTrackPosition, updateFocus],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      const cards = getProjectCards(track);
      const first = cards[0];
      if (!first) return;
      const sidePadding = Math.max(18, (viewport.clientWidth - first.getBoundingClientRect().width) / 2);
      track.style.paddingLeft = sidePadding + "px";
      track.style.paddingRight = sidePadding + "px";

      cardScaleXRef.current = cards.map((card) =>
        gsap.quickTo(card, "scaleX", { duration: 0.35, ease: "power2.out" }),
      );
      cardScaleYRef.current = cards.map((card) =>
        gsap.quickTo(card, "scaleY", { duration: 0.35, ease: "power2.out" }),
      );
      cardOpacityRef.current = cards.map((card) =>
        gsap.quickTo(card, "opacity", { duration: 0.35, ease: "power2.out" }),
      );

      // Position in middle set
      const initialTargetX = getProjectTargetX(viewport, track, activeTrackIndexRef.current);
      gsap.set(track, { x: initialTargetX });
      updateFocus();
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    getProjectCards(track).forEach((card) => observer.observe(card));
    measure();

    return () => {
      observer.disconnect();
      gsap.killTweensOf(track);
      cardScaleXRef.current = [];
      cardScaleYRef.current = [];
      cardOpacityRef.current = [];
    };
  }, [updateFocus]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;

    gsap.killTweensOf(track);
    const x = Number(gsap.getProperty(track, "x")) || 0;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startTrackX: x,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      moved: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track || drag.pointerId !== event.pointerId) return;

    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 4 && !drag.moved) {
      drag.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (!drag.moved) return;

    const nextX = drag.startTrackX + delta;
    const now = performance.now();
    const elapsed = Math.max(1, now - drag.lastTime);
    drag.velocity = (event.clientX - drag.lastX) / elapsed;
    drag.lastX = event.clientX;
    drag.lastTime = now;

    gsap.set(track, { x: nextX });
    updateFocus();
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (drag.moved) {
      suppressClickUntilRef.current = Date.now() + 240;
      settleAtNearest((Number(gsap.getProperty(trackRef.current, "x")) || 0) + drag.velocity * 160);
    }
  };

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (Date.now() < suppressClickUntilRef.current) return;
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-project-card]");
    const projectId = target?.dataset.projectId;
    if (projectId) openProject(projectId);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigate(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      navigate(1);
    }
  };

  const current = UIUX_PROJECTS[activeIndex] || UIUX_PROJECTS[0];

  return (
    <section
      ref={sectionRef}
      id="uiux-selected-work"
      aria-labelledby="uiux-selected-work-title"
      className="w-full overflow-hidden border-y border-[#E8E2D5] bg-[#f0ede6] py-14 text-[#151515] sm:py-20 lg:py-24 select-none"
    >
      {/* Header */}
      <div className="mx-auto mb-8 flex max-w-[1440px] flex-col gap-5 px-5 sm:mb-10 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-14">
        <div>
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.15em] text-[#E7472E] sm:text-[10px]">
            UI/UX DESIGN <span className="px-1 text-[#8f8b82]">{"//"}</span> SELECTED WORK
          </p>
          <h2
            id="uiux-selected-work-title"
            className="font-display text-4xl uppercase leading-[0.92] tracking-[-0.055em] sm:text-5xl lg:text-6xl"
          >
            SELECTED UI/UX WORK
          </h2>
        </div>
        <p className="max-w-[460px] font-sans text-sm leading-relaxed text-[#55534E] sm:text-[15px]">
          Interfaces, systems and digital experiences designed around clarity,
          interaction and visual language.
        </p>
      </div>

      {/* Featured Carousel Viewport */}
      <div
        ref={viewportRef}
        role="region"
        aria-label="Selected UI and UX work carousel. Use navigation buttons or drag to browse."
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleCardClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full touch-pan-y cursor-grab overflow-hidden outline-none active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E7472E]"
      >
        <div ref={trackRef} className="relative flex w-max items-start gap-4 sm:gap-6 lg:gap-8">
          {SLIDES.map((project, slideIndex) => {
            const isMiddleCopy = slideIndex >= N && slideIndex < 2 * N;
            return (
              <button
                key={`${project.id}-slide-${slideIndex}`}
                type="button"
                data-project-card
                data-project-id={project.id}
                data-slide-index={slideIndex}
                aria-label={`Open complete design for ${project.title}, ${project.category}`}
                aria-haspopup="dialog"
                className="group w-[min(78vw,44rem)] shrink-0 origin-center text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E7472E] cursor-pointer"
              >
                <span className="relative block aspect-[4/5] overflow-hidden border border-[#d8d2c5] bg-[#fbf9f3] shadow-[0_16px_42px_rgba(30,28,20,0.08)]">
                  <Image
                    src={project.src}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 767px) 78vw, min(704px, 78vw)"
                    quality={65}
                    loading={isMiddleCopy ? "eager" : "lazy"}
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015] group-focus-visible:scale-[1.015]"
                    draggable={false}
                  />

                  {/* Top Bar */}
                  <span className="absolute inset-x-0 top-0 flex items-center justify-between bg-[#151515]/75 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.13em] text-white transition-colors group-hover:bg-[#151515]/90 sm:px-4 sm:py-3 sm:text-[9px]">
                    <span>
                      {String(project.index).padStart(2, "0")}{" "}
                      <span className="px-1 text-[#E7472E]">/</span> {project.category}
                    </span>
                    <span className="text-[#E7472E] opacity-90 transition-opacity group-hover:opacity-100 font-bold">
                      INSPECT DESIGN →
                    </span>
                  </span>

                  {/* Bottom Gradient Overlay */}
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#151515]/85 via-[#151515]/35 to-transparent px-3 pb-3 pt-12 text-white sm:px-5 sm:pb-5">
                    <span className="font-editorial text-xl uppercase tracking-[-0.03em] sm:text-2xl">
                      {project.title}
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/80 sm:text-[9px] bg-white/10 px-2.5 py-1 backdrop-blur-sm border border-white/20">
                      OPEN FULL VIEW
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls Bar */}
      <div className="mx-auto mt-6 flex max-w-[1440px] items-center justify-between px-5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#747878] sm:px-8 sm:text-[10px] lg:px-14">
        {/* Index display */}
        <p aria-live="polite" className="flex items-center">
          <span className="text-[#E7472E] font-bold">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="px-1 text-[#8f8b82]">/</span>
          <span>{String(N).padStart(2, "0")}</span>
          <span className="ml-3 hidden font-semibold text-[#151515] sm:inline">
            {current.category}
          </span>
        </p>

        {/* Existing Navigation Buttons: PREVIOUS and NEXT (Work Infinitely, Never Disabled) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Previous design"
            className="inline-flex items-center gap-2 border border-[#d8d2c5] bg-[#fbf9f3] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#151515] transition-colors hover:border-[#E7472E] hover:bg-[#E7472E] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E7472E] cursor-pointer"
          >
            <span>←</span>
            <span className="hidden sm:inline font-bold">PREVIOUS</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(1)}
            aria-label="Next design"
            className="inline-flex items-center gap-2 border border-[#d8d2c5] bg-[#fbf9f3] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#151515] transition-colors hover:border-[#E7472E] hover:bg-[#E7472E] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E7472E] cursor-pointer"
          >
            <span className="hidden sm:inline font-bold">NEXT</span>
            <span>→</span>
          </button>
        </div>

        {/* Hints */}
        <p className="hidden sm:block text-[#8f8b82]">DRAG / ARROWS TO EXPLORE</p>
        <p className="sm:hidden text-[#8f8b82]">SWIPE TO EXPLORE</p>
      </div>
    </section>
  );
}
