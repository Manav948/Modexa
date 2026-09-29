"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { UIUX_PROJECTS, UIUXProject } from "./UIUXProjects";
import { useUIUXProjectRegistration } from "./UIUXProjectProvider";

const N = UIUX_PROJECTS.length; // 14
const CLONE_COUNT = 3;

// Minimal clones: 3 clones before [11, 12, 13], 14 originals [0..13], 3 clones after [0, 1, 2]
// Total = 20 slides. Reduces DOM tree by >52% compared to 42 clones!
const CLONES_BEFORE = UIUX_PROJECTS.slice(-CLONE_COUNT);
const CLONES_AFTER = UIUX_PROJECTS.slice(0, CLONE_COUNT);
const SLIDES: UIUXProject[] = [...CLONES_BEFORE, ...UIUX_PROJECTS, ...CLONES_AFTER];
const ORIGINAL_START_INDEX = CLONE_COUNT; // 3
const ORIGINAL_END_INDEX = CLONE_COUNT + N - 1; // 16

const ZOOM_LEVELS = [50, 75, 100, 125, 150, 175, 200];

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  startTrackX: number;
  lastX: number;
  lastTime: number;
  velocity: number;
  axis: "pending" | "horizontal" | "vertical";
};

type UIUXDesignCarouselProps = {
  /** Optional externally controlled project ID (e.g. from hero or external links) */
  externalOpenProjectId?: string | null;
  onExternalClose?: () => void;
};

export default function UIUXDesignCarousel({
  externalOpenProjectId,
  onExternalClose,
}: UIUXDesignCarouselProps) {
  // Context integration with UIUXProjectProvider
  const projectContext = useUIUXProjectRegistration();

  // ── Carousel Refs ──
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

  const targetsRef = useRef<number[]>([]);
  const trackXRef = useRef(0);
  const activeTrackIndexRef = useRef(ORIGINAL_START_INDEX); // Start at Project 0
  const targetTrackIndexRef = useRef(ORIGINAL_START_INDEX);
  const isNavigatingRef = useRef(false);
  const suppressClickUntilRef = useRef(0);

  const autoplayTimerRef = useRef<gsap.core.Tween | null>(null);
  const restartTimerRef = useRef<gsap.core.Tween | null>(null);
  const transitionTweenRef = useRef<gsap.core.Tween | null>(null);
  const pauseReasonsRef = useRef({
    hover: false,
    interaction: false,
    viewer: false,
    reducedMotion: false,
  });

  // ── Viewer Refs ──
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const designWrapperRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // ── React State (Strictly limited: only updates when slide or viewer changes) ──
  const [activeIndex, setActiveIndex] = useState(0); // 0 .. N-1
  const [localViewerProjectId, setLocalViewerProjectId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [viewerNavDirection, setViewerNavDirection] = useState<-1 | 1>(1);

  // Register with UIUXProjectProvider as the canonical viewer renderer
  useEffect(() => {
    projectContext?.registerViewer?.();
    return () => {
      projectContext?.unregisterViewer?.();
    };
  }, [projectContext]);

  // Determine active project for the viewer (from external prop, provider context, or local card click)
  const effectiveViewerProjectId =
    externalOpenProjectId !== undefined
      ? externalOpenProjectId
      : projectContext?.activeProjectId ?? localViewerProjectId;

  const activeViewerIndex =
    effectiveViewerProjectId !== null
      ? UIUX_PROJECTS.findIndex((p) => p.id === effectiveViewerProjectId)
      : -1;

  const activeViewerProject =
    activeViewerIndex >= 0 ? UIUX_PROJECTS[activeViewerIndex] : null;

  // ─────────────────────────────────────────────────────────────
  // 1. CAROUSEL GEOMETRY & MEASUREMENT (Calculated once on mount/resize)
  // ─────────────────────────────────────────────────────────────
  const measureLayout = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const cards = Array.from(
      track.querySelectorAll<HTMLButtonElement>("[data-project-card]")
    );
    if (!cards.length) return;

    const firstCard = cards[0];
    const cardWidth = firstCard.offsetWidth;
    const viewportWidth = viewport.clientWidth;
    const sidePadding = Math.max(16, (viewportWidth - cardWidth) / 2);

    track.style.paddingLeft = `${sidePadding}px`;
    track.style.paddingRight = `${sidePadding}px`;

    // Compute target X for every card so it centers in the viewport
    targetsRef.current = cards.map((card) => {
      return viewportWidth / 2 - (card.offsetLeft + card.offsetWidth / 2);
    });

    // Snap to current active card without animation
    const curTargetX = targetsRef.current[activeTrackIndexRef.current] ?? 0;
    track.style.transform = `translate3d(${curTargetX}px, 0, 0)`;
    trackXRef.current = curTargetX;
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 2. SILENT NORMALIZATION (Seamless loop without visible jump)
  // ─────────────────────────────────────────────────────────────
  const normalizeTrackPosition = useCallback(() => {
    const track = trackRef.current;
    const targets = targetsRef.current;
    if (!track || !targets.length) return;

    const curIndex = activeTrackIndexRef.current;
    if (curIndex > ORIGINAL_END_INDEX) {
      // Wrapped past right boundary: jump back into middle original set
      const wrapped = curIndex - N;
      const wrappedX = targets[wrapped] ?? 0;
      track.style.transform = `translate3d(${wrappedX}px, 0, 0)`;
      trackXRef.current = wrappedX;
      activeTrackIndexRef.current = wrapped;
      targetTrackIndexRef.current = wrapped;
    } else if (curIndex < ORIGINAL_START_INDEX) {
      // Wrapped before left boundary: jump forward into middle original set
      const wrapped = curIndex + N;
      const wrappedX = targets[wrapped] ?? 0;
      track.style.transform = `translate3d(${wrappedX}px, 0, 0)`;
      trackXRef.current = wrappedX;
      activeTrackIndexRef.current = wrapped;
      targetTrackIndexRef.current = wrapped;
    }
  }, []);

  // ─────────────────────────────────────────────────────────────
  // 3. CAROUSEL NAVIGATION (Previous / Next with GSAP)
  // ─────────────────────────────────────────────────────────────
  const navigate = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      const targets = targetsRef.current;
      if (!track || !targets.length) return;

      autoplayTimerRef.current?.kill();
      autoplayTimerRef.current = null;
      restartTimerRef.current?.kill();

      if (isNavigatingRef.current) {
        gsap.killTweensOf(track);
        transitionTweenRef.current = null;
        isNavigatingRef.current = false;
        normalizeTrackPosition();
      }

      // Pre-normalize boundary if needed
      if (direction === 1 && targetTrackIndexRef.current > ORIGINAL_END_INDEX) {
        normalizeTrackPosition();
      } else if (
        direction === -1 &&
        targetTrackIndexRef.current < ORIGINAL_START_INDEX
      ) {
        normalizeTrackPosition();
      }

      const nextTargetIndex = targetTrackIndexRef.current + direction;
      targetTrackIndexRef.current = nextTargetIndex;
      isNavigatingRef.current = true;

      const targetX = targets[nextTargetIndex] ?? 0;
      const realIndex =
        (((nextTargetIndex - ORIGINAL_START_INDEX) % N) + N) % N;

      transitionTweenRef.current = gsap.to(track, {
        x: targetX,
        duration: pauseReasonsRef.current.reducedMotion ? 0.1 : 0.75,
        ease: "power2.out",
        force3D: true,
        overwrite: "auto",
        onUpdate: () => {
          trackXRef.current = Number(gsap.getProperty(track, "x")) || targetX;
        },
        onComplete: () => {
          transitionTweenRef.current = null;
          isNavigatingRef.current = false;
          activeTrackIndexRef.current = nextTargetIndex;

          normalizeTrackPosition();
          setActiveIndex(realIndex);

          scheduleAutoplay();
        },
      });
    },
    [normalizeTrackPosition]
  );

  // ─────────────────────────────────────────────────────────────
  // 4. AUTOPLAY CONTROLLER (Single GSAP delayedCall)
  // ─────────────────────────────────────────────────────────────
  const scheduleAutoplay = useCallback(() => {
    autoplayTimerRef.current?.kill();
    autoplayTimerRef.current = null;
    if (Object.values(pauseReasonsRef.current).some(Boolean)) return;

    autoplayTimerRef.current = gsap.delayedCall(3.5, () => {
      navigate(1);
    });
  }, [navigate]);

  // Settle at nearest card after pointer swipe release
  const settleAtNearest = useCallback(
    (projectedX: number) => {
      const track = trackRef.current;
      const targets = targetsRef.current;
      if (!track || !targets.length) return;

      let bestIndex = activeTrackIndexRef.current;
      let bestX = targets[bestIndex] ?? 0;
      let minDistance = Number.POSITIVE_INFINITY;

      targets.forEach((targetX, index) => {
        const dist = Math.abs(targetX - projectedX);
        if (dist < minDistance) {
          minDistance = dist;
          bestIndex = index;
          bestX = targetX;
        }
      });

      targetTrackIndexRef.current = bestIndex;
      isNavigatingRef.current = true;
      const realIndex =
        (((bestIndex - ORIGINAL_START_INDEX) % N) + N) % N;

      transitionTweenRef.current = gsap.to(track, {
        x: bestX,
        duration: pauseReasonsRef.current.reducedMotion ? 0.1 : 0.65,
        ease: "power3.out",
        force3D: true,
        overwrite: "auto",
        onUpdate: () => {
          trackXRef.current = Number(gsap.getProperty(track, "x")) || bestX;
        },
        onComplete: () => {
          transitionTweenRef.current = null;
          isNavigatingRef.current = false;
          activeTrackIndexRef.current = bestIndex;

          normalizeTrackPosition();
          setActiveIndex(realIndex);

          // Resume autoplay after ~2 seconds
          restartTimerRef.current?.kill();
          restartTimerRef.current = gsap.delayedCall(2.0, scheduleAutoplay);
        },
      });
    },
    [normalizeTrackPosition, scheduleAutoplay]
  );

  // ─────────────────────────────────────────────────────────────
  // 5. LIFECYCLE & RESIZE LISTENER
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    measureLayout();

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    pauseReasonsRef.current.reducedMotion = media.matches;

    const handleResize = () => {
      measureLayout();
    };

    let resizeTimer: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 60);
    };

    window.addEventListener("resize", debouncedResize, { passive: true });
    scheduleAutoplay();

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimer);
      autoplayTimerRef.current?.kill();
      restartTimerRef.current?.kill();
      transitionTweenRef.current?.kill();
    };
  }, [measureLayout, scheduleAutoplay]);

  // ─────────────────────────────────────────────────────────────
  // 6. HIGH-PERFORMANCE POINTER EVENTS (Zero React setState on drag)
  // ─────────────────────────────────────────────────────────────
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;

    autoplayTimerRef.current?.kill();
    autoplayTimerRef.current = null;
    restartTimerRef.current?.kill();
    transitionTweenRef.current?.kill();
    isNavigatingRef.current = false;

    pauseReasonsRef.current.interaction = true;

    const currentX = trackXRef.current;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startTrackX: currentX,
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
      axis: "pending",
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const track = trackRef.current;
    if (!drag || !track || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    // Strict gesture direction detection: Horizontal carousel swipe vs Vertical page scroll
    if (drag.axis === "pending") {
      const distance = Math.hypot(dx, dy);
      if (distance < 5) return;

      if (Math.abs(dx) <= Math.abs(dy)) {
        // Vertical page scroll gesture: release control completely to browser
        drag.axis = "vertical";
        return;
      }

      // Horizontal swipe detected: capture pointer
      drag.axis = "horizontal";
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // Fallback
      }
    }

    if (drag.axis !== "horizontal") return;

    // Prevent default only when horizontal carousel drag is active
    if (event.cancelable) event.preventDefault();

    const now = performance.now();
    const dt = Math.max(1, now - drag.lastTime);
    drag.velocity = (event.clientX - drag.lastX) / dt;
    drag.lastX = event.clientX;
    drag.lastTime = now;

    const nextX = drag.startTrackX + dx;
    trackXRef.current = nextX;

    // DIRECT GPU TRANSFORM (No setState, no re-render, no layout query)
    track.style.transform = `translate3d(${nextX}px, 0, 0)`;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const wasHorizontal = drag.axis === "horizontal";
    dragRef.current = null;
    pauseReasonsRef.current.interaction = false;

    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      // Ignored
    }

    if (wasHorizontal) {
      suppressClickUntilRef.current = Date.now() + 260;
      const projectedX = trackXRef.current + drag.velocity * 160;
      settleAtNearest(projectedX);
    } else {
      restartTimerRef.current?.kill();
      restartTimerRef.current = gsap.delayedCall(2.0, scheduleAutoplay);
    }
  };

  const handleCardClick = (slideIndex: number) => {
    if (Date.now() < suppressClickUntilRef.current) return;
    const realIndex =
      (((slideIndex - ORIGINAL_START_INDEX) % N) + N) % N;
    const clickedProject = UIUX_PROJECTS[realIndex];
    if (!clickedProject) return;

    if (projectContext?.openProject) {
      projectContext.openProject(clickedProject.id);
    } else {
      setLocalViewerProjectId(clickedProject.id);
    }
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

  // ─────────────────────────────────────────────────────────────
  // 7. FULL-SCREEN DESIGN VIEWER LOGIC (Desktop & Mobile)
  // ─────────────────────────────────────────────────────────────
  const handleCloseViewer = useCallback(() => {
    const dialog = dialogRef.current;
    const cleanupClose = () => {
      if (projectContext?.closeProject) {
        projectContext.closeProject();
      }
      setLocalViewerProjectId(null);
      onExternalClose?.();
    };

    if (!dialog) {
      cleanupClose();
      return;
    }

    gsap.to(dialog, {
      opacity: 0,
      duration: 0.22,
      ease: "power2.in",
      onComplete: cleanupClose,
    });
  }, [projectContext, onExternalClose]);

  const moveViewer = useCallback(
    (direction: -1 | 1) => {
      if (activeViewerIndex < 0) return;
      setViewerNavDirection(direction);
      const nextIdx = (activeViewerIndex + direction + N) % N;
      const nextProj = UIUX_PROJECTS[nextIdx];
      if (!nextProj) return;

      if (projectContext?.openProject) {
        projectContext.openProject(nextProj.id);
      } else {
        setLocalViewerProjectId(nextProj.id);
      }
    },
    [activeViewerIndex, projectContext]
  );

  const handleZoomIn = () => {
    setZoom((prev) => {
      const idx = ZOOM_LEVELS.indexOf(prev);
      return idx < ZOOM_LEVELS.length - 1 ? ZOOM_LEVELS[idx + 1] : prev;
    });
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const idx = ZOOM_LEVELS.indexOf(prev);
      return idx > 0 ? ZOOM_LEVELS[idx - 1] : prev;
    });
  };

  const handleResetZoom = () => setZoom(100);
  const handleToggleZoom = () => setZoom((prev) => (prev === 100 ? 150 : 100));

  // Background Scroll-Lock & Lenis Lock
  useEffect(() => {
    if (!activeViewerProject) return;

    pauseReasonsRef.current.viewer = true;
    autoplayTimerRef.current?.kill();

    const body = document.body;
    const html = document.documentElement;
    const priorScrollY = window.scrollY;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    // Measure scrollbar width to prevent background layout shift
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const priorBodyPadding = body.style.paddingRight;
    const priorBodyOverflow = body.style.overflow;
    const priorHtmlOverflow = html.style.overflow;

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";

    // Pause Lenis smooth scrolling on main page
    window.dispatchEvent(
      new CustomEvent("modexa:lenis-lock", { detail: true })
    );

    closeButtonRef.current?.focus();

    return () => {
      body.style.paddingRight = priorBodyPadding;
      body.style.overflow = priorBodyOverflow;
      html.style.overflow = priorHtmlOverflow;

      window.scrollTo(0, priorScrollY);
      // Resume Lenis smooth scrolling
      window.dispatchEvent(
        new CustomEvent("modexa:lenis-lock", { detail: false })
      );

      pauseReasonsRef.current.viewer = false;
      restartTimerRef.current?.kill();
      restartTimerRef.current = gsap.delayedCall(2.0, scheduleAutoplay);

      previousFocusRef.current?.focus({ preventScroll: true });
    };
  }, [activeViewerProject, scheduleAutoplay]);

  // Reset scroll position & subtle animate on viewer project change
  useEffect(() => {
    if (!activeViewerProject) return;
    setZoom(100);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      scrollContainerRef.current.scrollLeft = 0;
    }

    const design = designWrapperRef.current;
    if (design) {
      const startX = viewerNavDirection * 24;
      gsap.fromTo(
        design,
        { opacity: 0, x: startX, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        }
      );
    }
  }, [activeViewerProject?.id, viewerNavDirection]);

  // Viewer Keyboard Navigation
  useEffect(() => {
    if (!activeViewerProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleCloseViewer();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveViewer(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        moveViewer(1);
      } else if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        handleZoomIn();
      } else if (event.key === "-" || event.key === "_") {
        event.preventDefault();
        handleZoomOut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeViewerProject, handleCloseViewer, moveViewer]);

  const currentProject = UIUX_PROJECTS[activeIndex] || UIUX_PROJECTS[0];

  return (
    <>
      <section
        ref={sectionRef}
        id="uiux-selected-work"
        aria-labelledby="uiux-selected-work-title"
        className="w-full overflow-hidden border-y border-[#E8E2D5] bg-[#F0EDE6] py-14 text-[#151515] sm:py-20 lg:py-24 select-none"
      >
        {/* Section Header */}
        <div className="mx-auto mb-8 flex max-w-[1440px] flex-col gap-5 px-5 sm:mb-10 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-14">
          <div>
            <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#E7472E] sm:text-[10px]">
              UI/UX DESIGN <span className="px-1 text-[#8F8B82]">{"//"}</span> SELECTED WORK
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

        {/* 
          Carousel Viewport:
          - touch-action: pan-y (enables normal vertical page scroll while swiping horizontally)
          - Single Pointer Events system
        */}
        <div
          ref={viewportRef}
          role="region"
          aria-label="Selected UI/UX work carousel. Drag horizontally or use buttons to navigate."
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerEnter={() => {
            if (window.matchMedia("(hover: hover)").matches) {
              pauseReasonsRef.current.hover = true;
              autoplayTimerRef.current?.kill();
            }
          }}
          onPointerLeave={() => {
            if (window.matchMedia("(hover: hover)").matches) {
              pauseReasonsRef.current.hover = false;
              scheduleAutoplay();
            }
          }}
          className="w-full touch-pan-y cursor-grab overflow-hidden outline-none active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E7472E]"
        >
          {/* Moving Track */}
          <div
            ref={trackRef}
            className="relative flex w-max items-start gap-4 sm:gap-6 lg:gap-8 [will-change:transform]"
          >
            {SLIDES.map((project, slideIndex) => {
              const isInitialCenter = slideIndex === ORIGINAL_START_INDEX;
              return (
                <button
                  key={`${project.id}-slide-${slideIndex}`}
                  type="button"
                  data-project-card
                  data-project-id={project.id}
                  onClick={() => handleCardClick(slideIndex)}
                  aria-label={`Open complete design for ${project.title}, ${project.category}`}
                  aria-haspopup="dialog"
                  className="group w-[80vw] max-w-[42rem] shrink-0 text-left cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E7472E]"
                >
                  <div className="relative block aspect-[4/5] overflow-hidden border border-[#D8D2C5] bg-[#FBF9F3]">
                    <Image
                      src={project.src}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 70vw, 672px"
                      quality={60}
                      priority={isInitialCenter}
                      loading={isInitialCenter ? "eager" : "lazy"}
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                      draggable={false}
                    />

                    {/* Card Top Metadata Bar */}
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-[#151515]/80 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-white transition-colors group-hover:bg-[#151515]/90 sm:px-4 sm:py-2.5 sm:text-[9px]">
                      <span>
                        {String(project.index).padStart(2, "0")}{" "}
                        <span className="px-1 text-[#E7472E]">/</span> {project.category}
                      </span>
                      <span className="text-[#E7472E] font-bold">
                        INSPECT DESIGN →
                      </span>
                    </div>

                    {/* Card Bottom Title Bar */}
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#151515]/90 via-[#151515]/40 to-transparent px-3 pb-3 pt-10 text-white sm:px-5 sm:pb-4">
                      <span className="font-editorial text-lg uppercase tracking-[-0.03em] sm:text-2xl">
                        {project.title}
                      </span>
                      <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/90 sm:text-[9px] bg-white/10 px-2.5 py-1 border border-white/20">
                        OPEN FULL VIEW
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls Bar: Index display + Real Previous/Next Buttons */}
        <div className="mx-auto mt-6 flex max-w-[1440px] items-center justify-between px-5 font-mono text-[9px] uppercase tracking-[0.12em] text-[#747878] sm:px-8 sm:text-[10px] lg:px-14">
          {/* Index Counter */}
          <p aria-live="polite" className="flex items-center">
            <span className="text-[#E7472E] font-bold">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="px-1 text-[#8F8B82]">/</span>
            <span>{String(N).padStart(2, "0")}</span>
            <span className="ml-3 hidden font-semibold text-[#151515] sm:inline">
              {currentProject.category}
            </span>
          </p>

          {/* Previous & Next Navigation Buttons (Real buttons, Never disabled) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Previous design"
              className="inline-flex items-center gap-2 border border-[#D8D2C5] bg-[#FBF9F3] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#151515] transition-colors hover:border-[#E7472E] hover:bg-[#E7472E] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E7472E] cursor-pointer"
            >
              <span>←</span>
              <span className="hidden sm:inline font-bold">PREVIOUS</span>
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              aria-label="Next design"
              className="inline-flex items-center gap-2 border border-[#D8D2C5] bg-[#FBF9F3] px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#151515] transition-colors hover:border-[#E7472E] hover:bg-[#E7472E] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E7472E] cursor-pointer"
            >
              <span className="hidden sm:inline font-bold">NEXT</span>
              <span>→</span>
            </button>
          </div>

          <p className="hidden sm:block text-[#8F8B82]">DRAG / ARROWS TO EXPLORE</p>
          <p className="sm:hidden text-[#8F8B82]">SWIPE TO EXPLORE</p>
        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 8. FULL-SCREEN DESIGN VIEWER MODAL (Works on Desktop & Mobile) */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeViewerProject && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="uiux-viewer-title"
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="viewer-overlay fixed inset-0 z-[9999] flex flex-col bg-[#F7F5EF] text-[#151515] overflow-hidden"
        >
          {/* Fixed Top Header Toolbar */}
          <header
            data-lenis-prevent="true"
            className="viewer-toolbar relative z-20 flex shrink-0 items-center justify-between border-b border-[#DCD7CB] bg-[#F7F5EF]/98 px-4 py-3 sm:px-8 sm:py-3.5 lg:px-12 backdrop-blur-md"
          >
            <div className="min-w-0 pr-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#E7472E] sm:text-[10px]">
                UI/UX DESIGN <span className="px-1 text-[#8F8B82]">{"//"}</span> COMPLETE DESIGN VIEW
              </p>
              <h2
                id="uiux-viewer-title"
                className="mt-0.5 truncate font-editorial text-lg uppercase leading-none sm:text-xl text-[#151515]"
              >
                {activeViewerProject.title}{" "}
                <span className="hidden font-mono text-xs font-normal text-[#747878] sm:inline">
                  [{activeViewerProject.category}]
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-[#747878]">
                {String(activeViewerProject.index).padStart(2, "0")} / {String(N).padStart(2, "0")}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleCloseViewer}
                aria-label="Close design viewer"
                className="inline-flex items-center gap-1.5 border border-[#DCD7CB] bg-[#FBF9F3] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#151515] transition-colors hover:border-[#E7472E] hover:bg-[#E7472E] hover:text-white cursor-pointer"
              >
                <span className="text-base font-bold leading-none">×</span>
                <span className="font-bold">CLOSE</span>
              </button>
            </div>
          </header>

          {/* 
            Native Scroll Container:
            - data-lenis-prevent ensures Lenis never prevents wheel events
            - onWheel e.stopPropagation() isolates viewer scrolling from parent window
            - overflow-y: auto + overflow-x: auto enable native vertical + horizontal scrolling
          */}
          <div
            ref={scrollContainerRef}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            tabIndex={0}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="viewer-scroll-area relative min-h-0 flex-1 overflow-y-auto overflow-x-auto overscroll-contain touch-auto [scrollbar-gutter:stable]"
            style={{
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div
              className="min-h-full flex flex-col items-center justify-start p-3 sm:p-6 lg:p-10 pb-28 pt-6 sm:pt-8"
              style={{ minWidth: "100%" }}
            >
              {/* Scaled Design Wrapper for Zoom Support */}
              <div
                ref={designWrapperRef}
                onDoubleClick={handleToggleZoom}
                title="Double-click to toggle 100% / 150% zoom"
                className="viewer-design relative border border-[#DCD7CB] bg-white shadow-[0_20px_50px_rgba(30,28,20,0.1)] cursor-zoom-in transition-[width,max-width] duration-200 ease-out"
                style={{
                  width: `${Math.round(100 * (zoom / 100))}%`,
                  maxWidth: `${Math.round(1400 * (zoom / 100))}px`,
                  minWidth: `${Math.round(320 * (zoom / 100))}px`,
                }}
              >
                {/* Natural Aspect Ratio Image (Can be 11,000px+ tall) */}
                <img
                  key={activeViewerProject.id}
                  src={activeViewerProject.src}
                  alt={activeViewerProject.alt}
                  className="block w-full h-auto"
                  width={activeViewerProject.width}
                  height={activeViewerProject.height}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* Fixed Floating Bottom Control Toolbar */}
          <footer
            data-lenis-prevent="true"
            className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-4 border border-[#DCD7CB] bg-[#F7F5EF]/98 px-3 py-2 shadow-[0_12px_36px_rgba(30,28,20,0.16)] backdrop-blur-md max-w-[94vw]"
          >
            {/* Previous Design in Viewer */}
            <button
              type="button"
              onClick={() => moveViewer(-1)}
              aria-label="Previous design"
              className="inline-flex items-center gap-1.5 border border-[#DCD7CB] bg-[#FBF9F3] px-2.5 sm:px-3 py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#151515] transition-colors hover:border-[#E7472E] hover:bg-[#E7472E] hover:text-white cursor-pointer"
            >
              <span>←</span>
              <span className="hidden sm:inline font-bold">PREVIOUS</span>
            </button>

            {/* Zoom Controls (−  100%  +) */}
            <div className="flex items-center border border-[#DCD7CB] bg-[#FBF9F3]">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 50}
                aria-label="Zoom out"
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center font-mono text-base font-bold transition-colors hover:bg-[#E7472E] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
              >
                −
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                aria-label="Reset zoom to 100%"
                title="Click to reset zoom to 100%"
                className="px-2 sm:px-3 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#151515] transition-colors hover:text-[#E7472E] cursor-pointer"
              >
                {zoom}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 200}
                aria-label="Zoom in"
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center font-mono text-base font-bold transition-colors hover:bg-[#E7472E] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Next Design in Viewer */}
            <button
              type="button"
              onClick={() => moveViewer(1)}
              aria-label="Next design"
              className="inline-flex items-center gap-1.5 border border-[#DCD7CB] bg-[#FBF9F3] px-2.5 sm:px-3 py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#151515] transition-colors hover:border-[#E7472E] hover:bg-[#E7472E] hover:text-white cursor-pointer"
            >
              <span className="hidden sm:inline font-bold">NEXT</span>
              <span>→</span>
            </button>
          </footer>
        </div>
      )}
    </>
  );
}
