"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const WORKSPACE_VIDEO = "/videos/video1.mp4";

export default function LivingSyntaxArtifact() {
  const stageRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewContentRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isMobilePlaying, setIsMobilePlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const cardPosRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const updateCard = () => {
      const preview = previewRef.current;
      if (preview && isHoveringRef.current) {
        const margin = 16;
        const targetX = Math.max(margin, Math.min(pointerPosRef.current.x - 140, window.innerWidth - 296));
        const targetY = Math.max(margin, Math.min(pointerPosRef.current.y - 210, window.innerHeight - 436));
        cardPosRef.current.x += (targetX - cardPosRef.current.x) * 0.12;
        cardPosRef.current.y += (targetY - cardPosRef.current.y) * 0.12;
        preview.style.transform = `translate3d(${cardPosRef.current.x}px, ${cardPosRef.current.y}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(updateCard);
    };

    rafRef.current = requestAnimationFrame(updateCard);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    const content = previewContentRef.current;
    const video = videoRef.current;
    if (!preview || !content || !video) return;

    gsap.killTweensOf(content);
    if (isPreviewOpen) {
      gsap.set(preview, { display: "block" });
      gsap.fromTo(
        content,
        { scale: 0.85, opacity: 0, y: 15, rotate: -1 },
        { scale: 1, opacity: 1, y: 0, rotate: 0, duration: 0.5, ease: "power3.out" },
      );
      video.play().catch(() => undefined);
    } else {
      video.pause();
      gsap.to(content, {
        scale: 0.85,
        opacity: 0,
        y: 15,
        rotate: 1,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => gsap.set(preview, { display: "none" }),
      });
    }

    return () => gsap.killTweensOf(content);
  }, [isPreviewOpen]);

  useEffect(() => {
    const video = mobileVideoRef.current;
    if (!video) return;
    if (isMobilePlaying) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isMobilePlaying]);

  const updatePointerPosition = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    pointerPosRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    isHoveringRef.current = true;
    updatePointerPosition(event);
    setIsPreviewOpen(true);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      isHoveringRef.current = false;
      setIsPreviewOpen(false);
    }
  };

  return (
    <section
      aria-labelledby="living-code-workspace-title"
      className="w-full border-t border-[#e4e2dd] bg-[#f0eee8] px-5 py-16 sm:py-20 md:px-10 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="living-code-workspace-title"
            className="font-display text-2xl uppercase leading-tight text-[#1b1c18] sm:text-3xl md:text-4xl"
          >
            DESIGN AND CODE, WORKING TOGETHER
          </h2>
          <p className="max-w-md font-sans text-sm leading-relaxed text-[#55534E] sm:text-[15px]">
            Explore the interface, then open the video preview.
          </p>
        </div>

        <div
          ref={stageRef}
          className="group relative isolate aspect-[4/3] w-full overflow-hidden bg-[#111820] sm:aspect-[16/9]"
          onPointerEnter={handlePointerEnter}
          onPointerMove={updatePointerPosition}
          onPointerLeave={handlePointerLeave}
        >
          <Image
            src="/images/web6.png"
            alt="Sports gear product website shown in a desktop browser"
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />
          <div className={`pointer-events-none absolute inset-0 z-10 bg-black/60 backdrop-blur-md transition-opacity duration-500 ${isPreviewOpen ? "opacity-100" : "opacity-0"}`} />
          <video
            ref={mobileVideoRef}
            src={WORKSPACE_VIDEO}
            poster="/images/web6.png"
            className="absolute inset-0 z-20 h-full w-full object-cover md:hidden"
            style={{ display: isMobilePlaying ? "block" : "none" }}
            muted
            loop
            playsInline
            controls
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            aria-label="Web development video preview"
          />
          <div className={`absolute z-30 flex flex-col items-start gap-4 text-white ${isMobilePlaying ? "right-4 top-4 p-0" : "inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10"}`}>
            <p className={`max-w-lg font-display text-2xl uppercase leading-[1.05] sm:text-3xl lg:text-4xl ${isMobilePlaying ? "hidden" : ""}`}>
              A digital experience, in motion.
            </p>
            <button
              type="button"
              aria-expanded={isMobilePlaying}
              onClick={() => setIsMobilePlaying((playing) => !playing)}
              className={`inline-flex min-h-11 items-center gap-3 border border-white/70 bg-black/30 px-4 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#151515] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden ${isMobilePlaying ? "min-h-9 px-3" : ""}`}
            >
              <span aria-hidden="true">{isMobilePlaying ? "×" : "▶"}</span>
              {isMobilePlaying ? "CLOSE PREVIEW" : "PLAY VIDEO PREVIEW"}
            </button>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-white/80 md:inline">
              HOVER TO PLAY THE PREVIEW
            </span>
          </div>
        </div>

        <div
          ref={previewRef}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[420px] w-[280px] will-change-transform md:block"
          style={{ display: "none" }}
          aria-hidden={!isPreviewOpen}
        >
          <div
            ref={previewContentRef}
            className="flex h-full w-full flex-col overflow-hidden border border-[#1b1c18] bg-[#1b1c18] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]"
          >
            <div className="flex w-full items-center justify-between border-b border-[#30312d] bg-[#1b1c18] px-4 py-2.5 font-mono text-[9px] text-[#747878]">
              <span className="flex items-center gap-1.5 font-bold text-[#b6240f]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#b6240f]" />
                WEB PREVIEW
              </span>
              <span>[ 01 // SPEC ]</span>
            </div>
            <div className="relative w-full flex-1 overflow-hidden bg-black">
              <video
                ref={videoRef}
                src={WORKSPACE_VIDEO}
                poster="/images/web6.png"
                className="h-full w-full object-cover object-center"
                muted
                loop
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                aria-label="Web development video preview"
              />
              {!isPlaying && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="flex h-12 w-12 items-center justify-center border border-white/40 bg-[#1b1c18]/90 font-mono text-base text-[#b6240f] shadow-2xl">▶</span>
                  <span className="border border-[#30312d] bg-[#1b1c18]/90 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-white">LIVE PREVIEW</span>
                </div>
              )}
              <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-0.5 border border-[#30312d] bg-[#1b1c18]/95 p-2.5">
                <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#b6240f]">01 / WEB</span>
                <span className="truncate font-editorial text-xs text-white">DESIGN AND CODE, WORKING TOGETHER</span>
              </div>
            </div>
            <div className="flex w-full items-center justify-between border-t border-[#30312d] bg-[#1b1c18] px-4 py-2 font-mono text-[9px] text-[#747878]">
              <span>SELECTED WORK</span>
              <span className="text-[#b6240f]">{isPlaying ? "PLAYING" : "PAUSED"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
