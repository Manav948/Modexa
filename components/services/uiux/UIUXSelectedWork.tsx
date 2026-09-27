"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { UIUX_PROJECTS } from "./UIUXProjects";
import { useUIUXProjectActions } from "./UIUXProjectProvider";

function getProjectCards(track: HTMLDivElement | null) {
  return Array.from(track?.querySelectorAll<HTMLButtonElement>("[data-project-card]") || []);
}

function getProjectTargetX(
  viewport: HTMLDivElement | null,
  track: HTMLDivElement | null,
  index: number,
) {
  const card = getProjectCards(track)[index];
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
  const activeIndexRef = useRef(0);
  const suppressClickUntilRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { openProject } = useUIUXProjectActions();

  const updateFocus = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const center = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    getProjectCards(trackRef.current).forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      const influence = Math.max(0, 1 - distance / (viewport.clientWidth * 0.86));
      cardScaleXRef.current[index]?.(0.92 + influence * 0.08);
      cardScaleYRef.current[index]?.(0.92 + influence * 0.08);
      cardOpacityRef.current[index]?.(0.62 + influence * 0.38);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });

    if (nearest !== activeIndexRef.current) {
      activeIndexRef.current = nearest;
      setActiveIndex(nearest);
    }
  }, []);

  const settleAtNearest = useCallback(
    (projectedX: number) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const items = getProjectCards(track);
      let bestIndex = 0;
      let bestX = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      items.forEach((card, index) => {
        const targetX = viewport.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
        const distance = Math.abs(targetX - projectedX);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
          bestX = targetX;
        }
      });

      activeIndexRef.current = bestIndex;
      setActiveIndex(bestIndex);
      gsap.to(track, {
        x: bestX,
        duration: 0.72,
        ease: "power3.out",
        overwrite: true,
        onUpdate: updateFocus,
        onComplete: updateFocus,
      });
    },
    [updateFocus],
  );

  const navigate = useCallback(
    (direction: -1 | 1) => {
      const nextIndex = Math.max(0, Math.min(UIUX_PROJECTS.length - 1, activeIndexRef.current + direction));
      const track = trackRef.current;
      if (!track || nextIndex === activeIndexRef.current) return;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      gsap.to(track, {
        x: getProjectTargetX(viewportRef.current, track, nextIndex),
        duration: 0.78,
        ease: "power3.out",
        overwrite: true,
        onUpdate: updateFocus,
        onComplete: updateFocus,
      });
    },
    [updateFocus],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      const projectCards = getProjectCards(track);
      const first = projectCards[0];
      if (!first) return;
      const sidePadding = Math.max(18, (viewport.clientWidth - first.getBoundingClientRect().width) / 2);
      track.style.paddingLeft = sidePadding + "px";
      track.style.paddingRight = sidePadding + "px";

      cardScalesRef.current = projectCards.map((card) =>
        gsap.quickTo(card, "scale", { duration: 0.38, ease: "power2.out" }),
      );
      cardOpacityRef.current = projectCards.map((card) =>
        gsap.quickTo(card, "opacity", { duration: 0.38, ease: "power2.out" }),
      );

      gsap.set(track, { x: getProjectTargetX(viewport, track, activeIndexRef.current) });
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
    const viewport = viewportRef.current;
    if (!drag || !track || !viewport || drag.pointerId !== event.pointerId) return;

    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 4 && !drag.moved) {
      drag.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (!drag.moved) return;

    const firstTarget = getProjectTargetX(viewport, track, 0);
    const lastTarget = getProjectTargetX(viewport, track, UIUX_PROJECTS.length - 1);
    const nextX = Math.max(lastTarget, Math.min(firstTarget, drag.startTrackX + delta));
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
      suppressClickUntilRef.current = Date.now() + 220;
      settleAtNearest((Number(gsap.getProperty(trackRef.current, "x")) || 0) + drag.velocity * 170);
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

  const current = UIUX_PROJECTS[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="uiux-selected-work"
      aria-labelledby="uiux-selected-work-title"
      className="w-full overflow-hidden border-y border-[#E8E2D5] bg-[#f0ede6] py-14 text-[#151515] sm:py-20 lg:py-24"
    >
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

      <div
        ref={viewportRef}
        role="region"
        aria-label="Selected UI and UX work. Drag or use arrow keys to browse."
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
          {UIUX_PROJECTS.map((project) => (
            <button
              key={project.id}
              type="button"
              data-project-card
              data-project-id={project.id}
              aria-label={"View " + project.title + ", " + project.category}
              aria-haspopup="dialog"
              className="group w-[min(78vw,44rem)] shrink-0 origin-center text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E7472E]"
            >
              <span className="relative block aspect-[4/5] overflow-hidden border border-[#d8d2c5] bg-[#fbf9f3] shadow-[0_16px_42px_rgba(30,28,20,0.08)]">
                <Image
                  src={project.src}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 78vw, min(704px, 78vw)"
                  quality={62}
                  loading="lazy"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.015] group-focus-visible:scale-[1.015]"
                  draggable={false}
                />
                <span className="absolute inset-x-0 top-0 flex items-center justify-between bg-[#151515]/75 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.13em] text-white transition-colors group-hover:bg-[#151515]/90 sm:px-4 sm:py-3 sm:text-[9px]">
                  <span>{String(project.index).padStart(2, "0")} <span className="px-1 text-[#E7472E]">/</span> {project.category}</span>
                  <span className="text-[#E7472E] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">VIEW PROJECT →</span>
                </span>
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#151515]/85 via-[#151515]/35 to-transparent px-3 pb-3 pt-12 text-white sm:px-5 sm:pb-5">
                  <span className="font-editorial text-xl uppercase tracking-[-0.03em] sm:text-2xl">{project.title}</span>
                  <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/70 sm:text-[9px]">OPEN DESIGN</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-5 flex max-w-[1440px] items-center justify-between px-5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#747878] sm:px-8 sm:text-[10px] lg:px-14">
        <p aria-live="polite">
          <span className="text-[#E7472E]">{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="px-1">/</span>
          {String(UIUX_PROJECTS.length).padStart(2, "0")}
          <span className="ml-3 hidden text-[#8f8b82] sm:inline">{current?.category}</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={activeIndex === 0}
            aria-label="Previous design"
            className="flex h-9 w-9 items-center justify-center border border-[#d8d2c5] text-lg transition-colors hover:border-[#E7472E] hover:text-[#E7472E] disabled:cursor-not-allowed disabled:opacity-40"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => navigate(1)}
            disabled={activeIndex === UIUX_PROJECTS.length - 1}
            aria-label="Next design"
            className="flex h-9 w-9 items-center justify-center border border-[#d8d2c5] text-lg transition-colors hover:border-[#E7472E] hover:text-[#E7472E] disabled:cursor-not-allowed disabled:opacity-40"
          >
            →
          </button>
        </div>
        <p className="hidden sm:block">DRAG / ARROW KEYS TO EXPLORE</p>
        <p className="sm:hidden">SWIPE TO EXPLORE</p>
      </div>
    </section>
  );
}
