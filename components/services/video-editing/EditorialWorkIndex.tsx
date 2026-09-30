"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  category: string;
  desktopHeight: string;
  mobileHeight: number;
  offset: string;
};

type DragState = {
  id: number;
  startX: number;
  startY: number;
  startTrackX: number;
  lastX: number;
  lastTime: number;
  velocity: number;
  axis: "pending" | "horizontal" | "vertical";
};

const PROJECTS: Project[] = [
  { id: "edit-01", src: "/edit/edit1.png", width: 442, height: 240, title: "Momentum Cut", category: "SHORT-FORM", desktopHeight: "clamp(250px, 25vw, 390px)", mobileHeight: 260, offset: "md:-translate-y-7" },
  { id: "edit-02", src: "/edit/edit2.png", width: 375, height: 538, title: "Portrait Tempo", category: "SOCIAL EDIT", desktopHeight: "clamp(345px, 33vw, 480px)", mobileHeight: 390, offset: "md:translate-y-8" },
  { id: "edit-03", src: "/edit/edit3.png", width: 978, height: 910, title: "Frame Study", category: "CAMPAIGN EDIT", desktopHeight: "clamp(300px, 29vw, 430px)", mobileHeight: 330, offset: "md:-translate-y-2" },
  { id: "edit-04", src: "/edit/edit4.png", width: 739, height: 674, title: "Still in Motion", category: "EDITORIAL", desktopHeight: "clamp(315px, 30vw, 450px)", mobileHeight: 340, offset: "md:translate-y-5" },
  { id: "edit-05", src: "/edit/edit5.png", width: 607, height: 1078, title: "Vertical Rhythm", category: "MOTION", desktopHeight: "clamp(370px, 35vw, 500px)", mobileHeight: 405, offset: "md:-translate-y-10" },
  { id: "edit-06", src: "/edit/edit6.png", width: 1917, height: 1078, title: "Wide Format Cut", category: "LONG-FORM", desktopHeight: "clamp(265px, 27vw, 420px)", mobileHeight: 255, offset: "md:translate-y-7" },
  { id: "edit-07", src: "/edit/edit7.png", width: 1281, height: 712, title: "Narrative Sequence", category: "BRAND FILM", desktopHeight: "clamp(275px, 28vw, 430px)", mobileHeight: 265, offset: "md:-translate-y-5" },
];

const DRAG_THRESHOLD = 8;

function cardStyle(project: Project): CSSProperties {
  return {
    "--desktop-height": project.desktopHeight,
    "--mobile-width": `min(78vw, ${Math.round(project.mobileHeight * (project.width / project.height))}px)`,
    aspectRatio: `${project.width} / ${project.height}`,
  } as CSSProperties;
}

export default function EditorialWorkIndex() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const loopRef = useRef<gsap.core.Tween | null>(null);
  const manualRef = useRef<gsap.core.Tween | null>(null);
  const resumeRef = useRef<gsap.core.Tween | null>(null);
  const loopWidthRef = useRef(0);
  const pauseRef = useRef({ hover: false, drag: false, offscreen: false, reduced: false });
  const suppressClickRef = useRef(false);
  const suppressTimerRef = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const playButtonSettersRef = useRef(new WeakMap<HTMLElement, { x: (value: number) => void; y: (value: number) => void }>());
  const playButtonElementsRef = useRef(new Set<HTMLElement>());

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(100);
  const [hasFinePointer, setHasFinePointer] = useState(false);

  const wrapX = (value: number) => {
    const width = loopWidthRef.current;
    if (!width) return value;
    const wrapped = value % width;
    return wrapped > 0 ? wrapped - width : wrapped;
  };

  const canPlay = () => !Object.values(pauseRef.current).some(Boolean);

  const pause = () => {
    resumeRef.current?.kill();
    loopRef.current?.pause();
  };

  const resume = (delay = 0) => {
    resumeRef.current?.kill();
    if (!canPlay()) return;
    resumeRef.current = gsap.delayedCall(delay, () => {
      const track = trackRef.current;
      const loop = loopRef.current;
      const width = loopWidthRef.current;
      if (!track || !loop || !width || !canPlay()) return;
      const x = wrapX(Number(gsap.getProperty(track, "x")) || 0);
      gsap.set(track, { x });
      loop.pause().progress(Math.abs(x) / width).play();
    });
  };

  const moveBy = (direction: -1 | 1) => {
    const track = trackRef.current;
    const width = loopWidthRef.current;
    if (!track || !width) return;
    pause();
    manualRef.current?.kill();
    const step = Math.min(440, width * 0.2);
    let current = Number(gsap.getProperty(track, "x")) || 0;
    const target = current - direction * step;
    if (target < -width) {
      current += width;
      gsap.set(track, { x: current });
    } else if (target > 0) {
      current -= width;
      gsap.set(track, { x: current });
    }
    manualRef.current = gsap.to(track, {
      x: current - direction * step,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
      onComplete: () => resume(0.35),
    });
  };

  const openProject = (id: string) => {
    if (suppressClickRef.current) return;
    const index = PROJECTS.findIndex((project) => project.id === id);
    if (index < 0) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setZoom(100);
    setActiveIndex(index);
  };

  const closeProject = () => {
    setActiveIndex(null);
    previousFocusRef.current?.focus({ preventScroll: true });
  };

  const moveViewer = (direction: -1 | 1) => {
    setZoom(100);
    setActiveIndex((index) => index === null ? null : (index + direction + PROJECTS.length) % PROJECTS.length);
  };

  const movePlayButton = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!hasFinePointer) return;
    const playButton = event.currentTarget.querySelector<HTMLElement>("[data-play-button]");
    if (!playButton) return;

    let setters = playButtonSettersRef.current.get(playButton);
    if (!setters) {
      setters = {
        x: gsap.quickTo(playButton, "x", { duration: 0.45, ease: "power3.out" }),
        y: gsap.quickTo(playButton, "y", { duration: 0.45, ease: "power3.out" }),
      };
      playButtonSettersRef.current.set(playButton, setters);
      playButtonElementsRef.current.add(playButton);
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
    setters.x(x);
    setters.y(y);
  };

  const resetPlayButton = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const playButton = event.currentTarget.querySelector<HTMLElement>("[data-play-button]");
    const setters = playButton ? playButtonSettersRef.current.get(playButton) : undefined;
    setters?.x(0);
    setters?.y(0);
  };

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointer = () => setHasFinePointer(query.matches);
    updatePointer();
    query.addEventListener("change", updatePointer);
    return () => query.removeEventListener("change", updatePointer);
  }, []);

  useEffect(() => () => {
    playButtonElementsRef.current.forEach((element) => gsap.killTweensOf(element));
    playButtonElementsRef.current.clear();
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    dragRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startTrackX: Number(gsap.getProperty(track, "x")) || 0,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      axis: "pending",
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track || drag.id !== event.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (drag.axis === "pending") {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < DRAG_THRESHOLD) return;
      drag.axis = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
      if (drag.axis === "vertical") {
        dragRef.current = null;
        return;
      }
      pauseRef.current.drag = true;
      pause();
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (drag.axis !== "horizontal") return;
    event.preventDefault();
    const now = performance.now();
    drag.velocity = (event.clientX - drag.lastX) / Math.max(1, now - drag.lastTime);
    drag.lastX = event.clientX;
    drag.lastTime = now;
    gsap.set(track, { x: wrapX(drag.startTrackX + deltaX) });
  };

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track || drag.id !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (drag.axis !== "horizontal") return;
    suppressClickRef.current = true;
    if (suppressTimerRef.current !== null) window.clearTimeout(suppressTimerRef.current);
    suppressTimerRef.current = window.setTimeout(() => {
      suppressClickRef.current = false;
      suppressTimerRef.current = null;
    }, 0);
    manualRef.current?.kill();
    manualRef.current = gsap.to(track, {
      x: wrapX((Number(gsap.getProperty(track, "x")) || 0) + drag.velocity * 230),
      duration: 0.42,
      ease: "power3.out",
      overwrite: true,
      onComplete: () => {
        pauseRef.current.drag = false;
        resume(0.45);
      },
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    const firstSet = firstSetRef.current;
    const viewport = viewportRef.current;
    if (!track || !firstSet || !viewport) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    pauseRef.current.reduced = motion.matches;

    const buildLoop = () => {
      const width = firstSet.getBoundingClientRect().width;
      if (!width) return;
      const progress = loopRef.current?.progress() ?? 0;
      loopRef.current?.kill();
      loopWidthRef.current = width;
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      const duration = mobile ? Math.min(100, Math.max(55, width / 45)) : Math.min(70, Math.max(35, width / 85));
      loopRef.current = gsap.to(track, { x: -width, duration, ease: "none", repeat: -1, paused: true });
      loopRef.current.progress(progress);
      resume();
    };
    const resize = new ResizeObserver(buildLoop);
    resize.observe(firstSet);
    resize.observe(viewport);
    const observer = new IntersectionObserver(([entry]) => {
      pauseRef.current.offscreen = !entry.isIntersecting;
      if (entry.isIntersecting) resume(); else pause();
    }, { threshold: 0.08 });
    observer.observe(viewport);
    const updateMotion = () => {
      pauseRef.current.reduced = motion.matches;
      if (motion.matches) pause(); else resume();
    };
    motion.addEventListener("change", updateMotion);
    const frame = requestAnimationFrame(buildLoop);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      motion.removeEventListener("change", updateMotion);
      loopRef.current?.kill();
      manualRef.current?.kill();
      resumeRef.current?.kill();
      if (suppressTimerRef.current !== null) window.clearTimeout(suppressTimerRef.current);
    };
  // The loop owns live refs and must only be initialized once; re-running it would reset the reel position.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const viewport = viewportRef.current;
    if (!section || !header || !viewport || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      const reveal = gsap.timeline({ scrollTrigger: { trigger: section, start: "top 78%", once: true } });
      reveal.fromTo(header, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" });
      reveal.fromTo(viewport, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "<0.12");
    }, section);
    return () => context.revert();
  }, []);

  const viewerOpen = activeIndex !== null;
  const activeProject = viewerOpen ? PROJECTS[activeIndex] : null;

  useEffect(() => {
    if (!viewerOpen) return;
    const body = document.body;
    const html = document.documentElement;
    const previous = { bodyOverflow: body.style.overflow, bodyPadding: body.style.paddingRight, htmlOverflow: html.style.overflow };
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("modexa:lenis-lock", { detail: true }));
    closeButtonRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
      if (event.key === "ArrowLeft") moveViewer(-1);
      if (event.key === "ArrowRight") moveViewer(1);
      if (event.key === "+" || event.key === "=") setZoom((value) => Math.min(200, value + 25));
      if (event.key === "-" || event.key === "_") setZoom((value) => Math.max(50, value - 25));
    };
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("keydown", keydown);
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.bodyPadding;
      html.style.overflow = previous.htmlOverflow;
      window.dispatchEvent(new CustomEvent("modexa:lenis-lock", { detail: false }));
    };
  }, [viewerOpen]);

  const renderCard = (project: Project, index: number, duplicate = false) => (
    <button
      key={`${project.id}-${index}`}
      type="button"
      tabIndex={duplicate ? -1 : undefined}
      aria-hidden={duplicate || undefined}
      aria-label={`Open ${project.title}`}
      onClick={() => openProject(project.id)}
      style={cardStyle(project)}
      onPointerMove={hasFinePointer ? movePlayButton : undefined}
      onPointerLeave={hasFinePointer ? resetPlayButton : undefined}
      className={`relative h-auto w-[var(--mobile-width)] flex-none overflow-hidden border border-[#dcd7cb] bg-[#151515] text-left shadow-[0_14px_35px_rgba(27,28,24,0.1)] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b6240f] md:h-[var(--desktop-height)] md:w-auto ${hasFinePointer ? "group transition-[transform,box-shadow,border-color] duration-500 hover:z-10 hover:scale-[1.025] hover:border-[#b6240f] hover:shadow-[0_22px_50px_rgba(27,28,24,0.2)]" : ""} ${project.offset}`}
    >
      <Image src={project.src} width={project.width} height={project.height} alt={`${project.title}, ${project.category.toLowerCase()} video editing work`} sizes="(max-width: 767px) 78vw, (max-width: 1024px) 55vw, 760px" quality={75} className={`block h-full w-full object-contain ${hasFinePointer ? "transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.01] group-hover:blur-[3px]" : ""}`} />
      <span aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-black ${hasFinePointer ? "opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-[0.55]" : "hidden"}`} />
      <span className="absolute left-3 top-3 border border-white/30 bg-[#101010]/75 px-2 py-1 font-mono text-[9px] font-bold tracking-[0.14em] text-white backdrop-blur-sm">{String(index + 1).padStart(2, "0")}</span>
      <span data-play-button aria-hidden="true" className={`pointer-events-none absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#E7472E] sm:h-16 sm:w-16 ${hasFinePointer ? "translate-y-2 scale-75 opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100" : "hidden"}`}><span className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white sm:border-y-[8px] sm:border-l-[13px]" /></span>
      <span className={`pointer-events-none absolute bottom-3 left-3 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white ${hasFinePointer ? "translate-y-2 opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100" : "opacity-85"}`}>{project.category}</span>
    </button>
  );

  return (
    <section ref={sectionRef} id="selected-work" aria-labelledby="selected-work-title" className="relative w-full overflow-hidden border-t border-[#e4e2dd] bg-[#fbf9f3] py-20 text-[#1b1c18] sm:py-24">
      <div ref={headerRef} className="mx-auto mb-10 flex w-full max-w-[1400px] flex-col gap-6 px-5 sm:px-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div>
          <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#b6240f]">Selected work</p>
          <h2 id="selected-work-title" className="font-display text-[clamp(2.4rem,5vw,5rem)] uppercase leading-[0.9] tracking-[-0.04em]">The editing reel.</h2>
        </div>
        <p className="max-w-sm font-sans text-sm leading-relaxed text-[#747878] sm:text-base">A selection of editing, motion and content work.</p>
      </div>

      <div className="mx-auto mb-6 flex w-full max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#747878]">Drag to explore</p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => moveBy(-1)} aria-label="Previous selected work" className="grid h-9 w-9 place-items-center border border-[#dcd7cb] bg-[#fbf9f3] font-mono text-sm transition-colors hover:border-[#b6240f] hover:bg-[#b6240f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6240f]">←</button>
          <button type="button" onClick={() => moveBy(1)} aria-label="Next selected work" className="grid h-9 w-9 place-items-center border border-[#dcd7cb] bg-[#fbf9f3] font-mono text-sm transition-colors hover:border-[#b6240f] hover:bg-[#b6240f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6240f]">→</button>
        </div>
      </div>

      <div ref={viewportRef} className="relative h-[450px] cursor-grab overflow-hidden pl-5 touch-pan-y select-none sm:h-[490px] sm:pl-8 md:h-[610px] lg:h-[650px] lg:pl-12" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={finishDrag} onPointerCancel={finishDrag} onMouseEnter={() => { pauseRef.current.hover = true; pause(); }} onMouseLeave={() => { pauseRef.current.hover = false; resume(0.25); }}>
        <div ref={trackRef} className="flex h-full w-max items-center will-change-transform">
          <div ref={firstSetRef} className="flex h-full items-center gap-4 pr-4 sm:gap-6 sm:pr-6 lg:gap-8 lg:pr-8">{PROJECTS.map((project, index) => renderCard(project, index))}</div>
          <div aria-hidden="true" className="flex h-full items-center gap-4 pr-4 sm:gap-6 sm:pr-6 lg:gap-8 lg:pr-8">{PROJECTS.map((project, index) => renderCard(project, index, true))}</div>
        </div>
      </div>

      {activeProject && (
        <div role="dialog" aria-modal="true" aria-labelledby="editing-viewer-title" data-lenis-prevent="true" className="fixed inset-0 z-[150] flex flex-col bg-[#f7f5ef] text-[#151515]">
          <header className="flex shrink-0 items-center justify-between border-b border-[#dcd7cb] bg-[#f7f5ef]/95 px-4 py-3 backdrop-blur-md sm:px-8">
            <div className="min-w-0 pr-4"><p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#b6240f]">Selected work / {activeProject.category}</p><h2 id="editing-viewer-title" className="mt-1 truncate font-display text-xl uppercase leading-none sm:text-2xl">{activeProject.title}</h2></div>
            <button ref={closeButtonRef} type="button" onClick={closeProject} className="border border-[#dcd7cb] bg-[#fbf9f3] px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-colors hover:border-[#b6240f] hover:bg-[#b6240f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b6240f]">Close ×</button>
          </header>
          <div data-lenis-prevent="true" className="min-h-0 flex-1 overflow-auto overscroll-contain p-4 sm:p-8 lg:p-12">
            <div className="mx-auto transition-[width,max-width] duration-300" style={{ width: `${zoom}%`, maxWidth: `${Math.round(activeProject.width * 1.35 * (zoom / 100))}px` }}><Image src={activeProject.src} width={activeProject.width} height={activeProject.height} alt={`${activeProject.title}, ${activeProject.category.toLowerCase()} video editing work`} sizes="100vw" quality={75} className="block h-auto w-full border border-[#dcd7cb] bg-[#151515] shadow-[0_20px_55px_rgba(27,28,24,0.14)]" /></div>
          </div>
          <footer className="fixed bottom-4 left-1/2 z-10 flex max-w-[94vw] -translate-x-1/2 items-center gap-2 border border-[#dcd7cb] bg-[#f7f5ef]/95 p-2 shadow-[0_12px_36px_rgba(27,28,24,0.15)] backdrop-blur-md">
            <button type="button" onClick={() => moveViewer(-1)} aria-label="Previous project" className="px-3 py-2 font-mono text-[10px] uppercase tracking-wider hover:text-[#b6240f]">← Previous</button><button type="button" onClick={() => setZoom((value) => Math.max(50, value - 25))} aria-label="Zoom out" className="h-8 w-8 font-mono text-lg hover:text-[#b6240f]">−</button><button type="button" onClick={() => setZoom(100)} className="min-w-12 px-2 py-2 font-mono text-[10px] font-bold">{zoom}%</button><button type="button" onClick={() => setZoom((value) => Math.min(200, value + 25))} aria-label="Zoom in" className="h-8 w-8 font-mono text-lg hover:text-[#b6240f]">+</button><button type="button" onClick={() => moveViewer(1)} aria-label="Next project" className="px-3 py-2 font-mono text-[10px] uppercase tracking-wider hover:text-[#b6240f]">Next →</button>
          </footer>
        </div>
      )}
    </section>
  );
}
