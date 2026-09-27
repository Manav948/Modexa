"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UIUX_PROJECTS } from "./UIUXProjects";

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
  const project = UIUX_PROJECTS[projectIndex];
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const move = useCallback(
    (direction: -1 | 1) => {
      const length = UIUX_PROJECTS.length;
      onNavigate((projectIndex + direction + length) % length);
    },
    [onNavigate, projectIndex],
  );

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const priorBody = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    const priorHtmlOverflow = html.style.overflow;

    window.dispatchEvent(new CustomEvent("modexa:lenis-lock", { detail: true }));
    html.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = "-" + scrollY + "px";
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      body.style.position = priorBody.position;
      body.style.top = priorBody.top;
      body.style.left = priorBody.left;
      body.style.right = priorBody.right;
      body.style.width = priorBody.width;
      body.style.overflow = priorBody.overflow;
      html.style.overflow = priorHtmlOverflow;

      const priorScrollBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      window.dispatchEvent(new CustomEvent("modexa:lenis-lock", { detail: false }));
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
        previousFocusRef.current?.focus({ preventScroll: true });
        html.style.scrollBehavior = priorScrollBehavior;
      });
    };
  }, []);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        dialogRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, ease: "power2.out" },
      );
    });
    closeButtonRef.current?.focus();

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    const imageFrame = imageFrameRef.current;
    if (!imageFrame) return;

    gsap.fromTo(
      imageFrame,
      { autoAlpha: 0, x: 16 },
      { autoAlpha: 1, x: 0, duration: 0.42, ease: "power2.out", overwrite: true },
    );
  }, [projectIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
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
  }, [move, onClose]);

  if (!project) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="uiux-viewer-title"
      className="fixed inset-0 z-[120] flex flex-col bg-[#f7f5ef] text-[#151515]"
    >
      <header className="relative z-10 flex shrink-0 items-center justify-between border-b border-[#dcd7cb] bg-[#f7f5ef]/95 px-4 py-3 backdrop-blur-md sm:px-8 sm:py-4 lg:px-12">
        <div className="min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#E7472E] sm:text-[10px]">
            UI/UX DESIGN <span className="px-1 text-[#8f8b82]">{"//"}</span> PROJECT VIEWER
          </p>
          <h2 id="uiux-viewer-title" className="mt-1 truncate font-editorial text-lg uppercase leading-none sm:text-xl">
            {project.title}
          </h2>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close project viewer"
          className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center border border-[#dcd7cb] text-2xl leading-none transition-colors hover:border-[#E7472E] hover:text-[#E7472E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E7472E]"
        >
          ×
        </button>
      </header>

      <main
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        }}
        onTouchEnd={(event) => {
          const start = touchStartRef.current;
          const touch = event.changedTouches[0];
          touchStartRef.current = null;
          if (!start || !touch) return;
          const dx = touch.clientX - start.x;
          const dy = touch.clientY - start.y;
          if (Math.abs(dx) > 72 && Math.abs(dx) > Math.abs(dy) * 1.35) {
            move(dx < 0 ? 1 : -1);
          }
        }}
      >
        <div className="mx-auto w-full max-w-[1050px] px-3 py-5 sm:px-6 sm:py-8 lg:px-10">
          <div className="mb-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-[#747878] sm:text-[10px]">
            <span>{project.category}</span>
            <span>{String(project.index).padStart(2, "0")} / {String(UIUX_PROJECTS.length).padStart(2, "0")}</span>
          </div>
          <div
            ref={imageFrameRef}
            className="relative mx-auto w-full max-w-[900px] overflow-hidden border border-[#dcd7cb] bg-white shadow-[0_16px_50px_rgba(30,28,20,0.08)]"
          >
            <Image
              key={project.id}
              src={project.src}
              alt={project.alt}
              width={project.width}
              height={project.height}
              sizes="(max-width: 767px) 100vw, min(900px, 76vw)"
              quality={80}
              loading="eager"
              fetchPriority="high"
              className="block h-auto w-full"
              onLoad={() => ScrollTrigger.refresh()}
              draggable={false}
            />
          </div>
        </div>

        <footer className="sticky bottom-0 z-10 flex items-center justify-between border-t border-[#dcd7cb] bg-[#f7f5ef]/95 px-4 py-3 backdrop-blur-md sm:px-8 lg:px-12">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#747878] sm:text-[10px]">
            {String(project.index).padStart(2, "0")} <span className="px-1 text-[#E7472E]">/</span> {String(UIUX_PROJECTS.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous design"
              className="flex h-10 w-10 items-center justify-center border border-[#dcd7cb] text-xl transition-colors hover:border-[#E7472E] hover:text-[#E7472E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E7472E]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next design"
              className="flex h-10 w-10 items-center justify-center border border-[#dcd7cb] text-xl transition-colors hover:border-[#E7472E] hover:text-[#E7472E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E7472E]"
            >
              →
            </button>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#8f8b82] sm:text-[9px]">
            Scroll to explore
          </span>
        </footer>
      </main>
    </div>
  );
}
