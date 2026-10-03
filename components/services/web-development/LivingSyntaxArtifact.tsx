"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const WORKSPACE_VIDEO = "/videos/video1.mp4";

export default function LivingSyntaxArtifact() {
  const stageRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPreviewOpen) {
      video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isPreviewOpen]);

  const movePreview = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !previewRef.current) return;

    const preview = previewRef.current;
    const margin = 16;
    const offset = 24;
    const width = preview.offsetWidth;
    const height = preview.offsetHeight;
    const left = event.clientX + width + offset + margin > window.innerWidth
      ? event.clientX - width - offset
      : event.clientX + offset;
    const top = event.clientY + height + offset + margin > window.innerHeight
      ? event.clientY - height - offset
      : event.clientY + offset;

    preview.style.left = `${Math.max(margin, left)}px`;
    preview.style.top = `${Math.max(margin, top)}px`;
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    setIsPreviewOpen(true);
    movePreview(event);
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") setIsPreviewOpen(false);
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
          onPointerMove={movePreview}
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
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-4 p-5 text-white sm:p-8 lg:p-10">
            <p className="max-w-lg font-display text-2xl uppercase leading-[1.05] sm:text-3xl lg:text-4xl">
              A digital experience, in motion.
            </p>
            <button
              type="button"
              aria-expanded={isPreviewOpen}
              onClick={() => setIsPreviewOpen((open) => !open)}
              className="inline-flex min-h-11 items-center gap-3 border border-white/70 bg-black/30 px-4 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-[#151515] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
            >
              <span aria-hidden="true">{isPreviewOpen ? "×" : "▶"}</span>
              {isPreviewOpen ? "CLOSE PREVIEW" : "PLAY VIDEO PREVIEW"}
            </button>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-white/80 md:inline">
              HOVER TO PLAY THE PREVIEW
            </span>
          </div>

          <div
            ref={previewRef}
            className={`fixed left-4 right-4 top-1/2 z-[60] w-auto -translate-y-1/2 overflow-hidden border border-white/20 bg-[#101010] shadow-[0_24px_80px_rgba(0,0,0,0.55)] transition-[opacity,scale] duration-200 md:left-0 md:right-auto md:top-0 md:w-[min(360px,calc(100vw-32px))] md:translate-y-0 ${isPreviewOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-[0.96] opacity-0"}`}
            aria-hidden={!isPreviewOpen}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-white/70">
              <span>WEB DEVELOPMENT / PREVIEW</span>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="min-h-8 min-w-8 text-base text-white hover:text-[#E7472E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:hidden"
                aria-label="Close video preview"
              >
                ×
              </button>
            </div>
            <video
              ref={videoRef}
              src={WORKSPACE_VIDEO}
              poster="/images/web6.png"
              className="block aspect-video w-full bg-black object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              aria-label="Web development video preview"
            />
            <div className="flex items-center justify-between px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-white/60">
              <span>{isPlaying ? "PLAYING" : "PAUSED"}</span>
              <span>VIDEO 01 / LOOP</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
