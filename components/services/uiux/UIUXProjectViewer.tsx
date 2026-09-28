"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { UIUX_PROJECTS } from "./UIUXProjects";

const N = UIUX_PROJECTS.length;
const ZOOM_LEVELS = [50, 75, 100, 125, 150, 175, 200];

type UIUXProjectViewerProps = {
  projectIndex: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

export default function UIUXProjectViewer({
  projectIndex,
  onClose,
  onNavigate,
}: UIUXProjectViewerProps) {
  const project = UIUX_PROJECTS[projectIndex] || UIUX_PROJECTS[0];

  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const designWrapperRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [zoom, setZoom] = useState(100);
  const [navDirection, setNavDirection] = useState<-1 | 1>(1);

  // Truly infinite viewer navigation
  const move = useCallback(
    (direction: -1 | 1) => {
      setNavDirection(direction);
      const nextIndex = (projectIndex + direction + N) % N;
      onNavigate(nextIndex);
    },
    [onNavigate, projectIndex],
  );

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom((prev) => {
      const idx = ZOOM_LEVELS.indexOf(prev);
      if (idx !== -1 && idx < ZOOM_LEVELS.length - 1) {
        return ZOOM_LEVELS[idx + 1];
      }
      return prev;
    });
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const idx = ZOOM_LEVELS.indexOf(prev);
      if (idx > 0) {
        return ZOOM_LEVELS[idx - 1];
      }
      return prev;
    });
  };

  const handleResetZoom = () => {
    setZoom(100);
  };

  const handleToggleZoom = () => {
    setZoom((prev) => (prev === 100 ? 150 : 100));
  };

  // Close with smooth animation and restore page scroll
  const handleClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      onClose();
      return;
    }

    gsap.to(dialog, {
      opacity: 0,
      duration: 0.28,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [onClose]);

  // Lock background page scroll & preserve exact position
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const priorBodyStyle = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const priorHtmlOverflow = html.style.overflow;
    const priorScrollBehavior = html.style.scrollBehavior;

    // Lock background page
    window.dispatchEvent(new CustomEvent("modexa:lenis-lock", { detail: true }));
    // The overlay is a separate fixed scroll context. Only lock the document behind it;
    // fixing <body> would also interfere with wheel scrolling in the nested viewer on desktop.
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${bodyPaddingRight + scrollbarWidth}px`;

    closeButtonRef.current?.focus();

    return () => {
      // Restore background page exactly
      body.style.overflow = priorBodyStyle.overflow;
      body.style.paddingRight = priorBodyStyle.paddingRight;
      html.style.overflow = priorHtmlOverflow;
      html.style.scrollBehavior = "auto";

      window.scrollTo(0, scrollY);

      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
        window.dispatchEvent(new CustomEvent("modexa:lenis-lock", { detail: false }));
        previousFocusRef.current?.focus({ preventScroll: true });
        html.style.scrollBehavior = priorScrollBehavior;
      });
    };
  }, []);

  // Opening animation (Part 7)
  useEffect(() => {
    const dialog = dialogRef.current;
    const design = designWrapperRef.current;
    if (!dialog || !design) return;

    gsap.fromTo(
      dialog,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
    );

    gsap.fromTo(
      design,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" },
    );
    return () => {
      gsap.killTweensOf(dialog);
      gsap.killTweensOf(design);
    };
  }, []);

  // Reset scroll to top and animate when switching project
  useEffect(() => {
    setZoom(100);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      scrollContainerRef.current.scrollLeft = 0;
    }

    const design = designWrapperRef.current;
    if (!design) return;

    // Directional transition matching navigation button
    const startX = navDirection * 35;
    gsap.fromTo(
      design,
      { opacity: 0, x: startX, scale: 0.98 },
      { opacity: 1, x: 0, scale: 1, duration: 0.48, ease: "power3.out", overwrite: true },
    );
    return () => gsap.killTweensOf(design);
  }, [projectIndex, navDirection]);

  // Keyboard controls (Part 11)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
        return;
      }
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        handleZoomIn();
        return;
      }
      if (event.key === "-" || event.key === "_") {
        event.preventDefault();
        handleZoomOut();
        return;
      }

      // Trap focus inside modal
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex="0"]',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose, move]);

  if (!project) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="uiux-viewer-title"
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      className="viewer-overlay fixed inset-0 z-[120] flex flex-col bg-[#f7f5ef] text-[#151515]"
    >
      {/* ── Fixed Header ── */}
      <header className="relative z-20 flex shrink-0 items-center justify-between border-b border-[#dcd7cb] bg-[#f7f5ef]/95 px-4 py-3 backdrop-blur-md sm:px-8 sm:py-3.5 lg:px-12">
        <div className="min-w-0 pr-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#E7472E] sm:text-[10px]">
            UI/UX DESIGN <span className="px-1 text-[#8f8b82]">{"//"}</span> COMPLETE DESIGN VIEW
          </p>
          <h2
            id="uiux-viewer-title"
            className="mt-0.5 truncate font-editorial text-lg uppercase leading-none sm:text-xl text-[#151515]"
          >
            {project.title} <span className="hidden font-mono text-xs font-normal text-[#747878] sm:inline">[{project.category}]</span>
          </h2>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-[#747878]">
            {String(project.index).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Close design viewer"
            className="inline-flex items-center gap-1.5 border border-[#dcd7cb] bg-[#fbf9f3] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#151515] transition-colors hover:border-[#E7472E] hover:bg-[#E7472E] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E7472E] cursor-pointer"
          >
            <span className="text-base font-bold leading-none">×</span>
            <span className="font-bold">CLOSE</span>
          </button>
        </div>
      </header>

      {/* ── Internal Scrollable Viewport (Supports tall full-page scroll from top to bottom) ── */}
      <div
        ref={scrollContainerRef}
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="viewer-scroll-area relative min-h-0 flex-1 overflow-y-auto overflow-x-auto overscroll-contain touch-auto [scrollbar-gutter:stable]"
        tabIndex={0}
      >
        <div
          className="min-h-full flex flex-col items-center justify-start p-3 sm:p-6 lg:p-10 pb-28 pt-6 sm:pt-8"
          style={{ minWidth: "100%" }}
        >
          {/* Complete Uncropped Design Container */}
          <div
            ref={designWrapperRef}
            onDoubleClick={handleToggleZoom}
            title="Double-click to toggle 100% / 150% zoom"
            className="relative border border-[#dcd7cb] bg-white shadow-[0_24px_64px_rgba(30,28,20,0.12)] cursor-zoom-in transition-[width,max-width] duration-300 ease-out"
            style={{
              width: `${Math.round(100 * (zoom / 100))}%`,
              maxWidth: `${Math.round(1400 * (zoom / 100))}px`,
              minWidth: `${Math.round(320 * (zoom / 100))}px`,
            }}
          >
            {/* The COMPLETE uncropped design with its natural aspect ratio */}
            <img
              key={project.id}
              src={project.src}
              alt={project.alt}
              className="block w-full h-auto"
              width={project.width}
              height={project.height}
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* ── Fixed Bottom Floating Control Toolbar ── */}
      <footer data-lenis-prevent="true" className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-4 rounded-none border border-[#dcd7cb] bg-[#f7f5ef]/98 px-3 py-2 shadow-[0_12px_36px_rgba(30,28,20,0.16)] backdrop-blur-md max-w-[94vw]">
        {/* Previous Design (Works Infinitely) */}
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Previous design"
          className="inline-flex items-center gap-1.5 border border-[#dcd7cb] bg-[#fbf9f3] px-2.5 sm:px-3 py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#151515] transition-colors hover:border-[#E7472E] hover:bg-[#E7472E] hover:text-white cursor-pointer"
        >
          <span>←</span>
          <span className="hidden sm:inline font-bold">PREVIOUS</span>
        </button>

        {/* Zoom Controls (−  100%  +) */}
        <div className="flex items-center border border-[#dcd7cb] bg-[#fbf9f3]">
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

        {/* Next Design (Works Infinitely) */}
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Next design"
          className="inline-flex items-center gap-1.5 border border-[#dcd7cb] bg-[#fbf9f3] px-2.5 sm:px-3 py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#151515] transition-colors hover:border-[#E7472E] hover:bg-[#E7472E] hover:text-white cursor-pointer"
        >
          <span className="hidden sm:inline font-bold">NEXT</span>
          <span>→</span>
        </button>
      </footer>
    </div>
  );
}
