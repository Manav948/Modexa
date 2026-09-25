"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORKSPACE_VIDEO = "/videos/video1.mp4";

function drawCover(canvas: HTMLCanvasElement, video: HTMLVideoElement, focusX = 0.5) {
  if (video.videoWidth === 0 || video.videoHeight === 0) return;
  const bounds = canvas.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.round(bounds.width * dpr);
  const height = Math.round(bounds.height * dpr);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  const videoRatio = video.videoWidth / video.videoHeight;
  const viewportRatio = width / height;
  let sx = 0;
  let sy = 0;
  let sw = video.videoWidth;
  let sh = video.videoHeight;

  if (videoRatio > viewportRatio) {
    sw = video.videoHeight * viewportRatio;
    sx = (video.videoWidth - sw) * Math.max(0, Math.min(1, focusX));
  } else {
    sh = video.videoWidth / viewportRatio;
    sy = (video.videoHeight - sh) / 2;
  }

  const context = canvas.getContext("2d", { alpha: false });
  context?.drawImage(video, sx, sy, sw, sh, 0, 0, width, height);
}

export default function LivingSyntaxArtifact() {
  const sectionRef = useRef<HTMLElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);
  const phoneCanvasRef = useRef<HTMLCanvasElement>(null);
  const phoneMotionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointer = () => setIsFinePointer(query.matches);
    updatePointer();
    query.addEventListener("change", updatePointer);
    return () => query.removeEventListener("change", updatePointer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!section || !stage || !video) return;

    let visible = false;
    let frameId = 0;

    const renderFrames = () => {
      if (!visible || video.paused || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return;
      if (mainCanvasRef.current) drawCover(mainCanvasRef.current, video, 0.5);
      if (phoneCanvasRef.current) {
        const focusPercent = parseFloat(
          getComputedStyle(phoneCanvasRef.current).getPropertyValue("--video-focus-x"),
        );
        drawCover(phoneCanvasRef.current, video, Number.isFinite(focusPercent) ? focusPercent / 100 : 0.6);
      }
      frameId = window.requestAnimationFrame(renderFrames);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      setIsVisible(visible);
      if (visible) {
        video.play().then(() => {
          window.cancelAnimationFrame(frameId);
          renderFrames();
        }).catch(() => undefined);
      } else {
        video.pause();
        window.cancelAnimationFrame(frameId);
      }
    }, { threshold: 0.15 });

    const context = gsap.context(() => {
      gsap.fromTo(
        stage,
        { width: "92%" },
        {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            end: "top 28%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    const resizeObserver = new ResizeObserver(() => {
      if (visible && !video.paused) renderFrames();
    });
    resizeObserver.observe(stage);
    if (phoneCanvasRef.current) resizeObserver.observe(phoneCanvasRef.current);
    observer.observe(section);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frameId);
      video.pause();
      context.revert();
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isFinePointer || !phoneMotionRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - (bounds.left + bounds.width / 2)) / bounds.width;
    const offsetY = (event.clientY - (bounds.top + bounds.height / 2)) / bounds.height;
    const x = Math.max(-25, Math.min(25, offsetX * 35));
    const y = Math.max(-20, Math.min(20, offsetY * 28));

    gsap.to(phoneMotionRef.current, {
      x,
      y,
      rotation: (x / 25) * 2,
      duration: 0.65,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const showDesktopPhone = isFinePointer && isHovered;
  const phoneVisibility = showDesktopPhone
    ? "md:translate-y-0 md:scale-100 md:opacity-100 md:pointer-events-auto"
    : "md:translate-y-5 md:scale-[0.88] md:opacity-0 md:pointer-events-none";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="living-code-workspace-title"
      className="w-full border-t px-5 py-20 md:px-10 lg:px-16 lg:py-28"
      style={{ backgroundColor: "#f0eee8", borderColor: "#e4e2dd" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-3 md:flex-row md:items-baseline">
          <div>
            <span className="mb-1 block font-mono text-xs font-medium uppercase tracking-widest text-[#e7472e]">
              SECTION 03 // LIVING CODE WORKSPACE
            </span>
            <h2
              id="living-code-workspace-title"
              className="font-display text-2xl uppercase text-[#1b1c18] sm:text-3xl md:text-4xl"
            >
              SYNTAX AS AN EDITORIAL ARTIFACT
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-[#747878]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#e7472e]" />
              LIVE ENVIRONMENT
            </span>
            <span>•</span>
            <span>MOTION + INTERFACE</span>
            <span>•</span>
            <span className="font-bold text-[#1b1c18]">DEVELOPMENT DEMO</span>
          </div>
        </div>

        <p className="mb-6 max-w-2xl font-sans text-sm leading-relaxed text-[#55534E] sm:text-[15px]">
          A living interface where code, interaction, motion and visual systems come together —
          shown as an ambient engineering workspace rather than a static diagram.
        </p>

        <div className="relative w-full border border-[#1b1c18]/15 bg-[#0a0a0a]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#151515] px-4 py-3 text-white/60">
            <div className="flex min-w-0 items-center gap-4">
              <div aria-hidden="true" className="flex shrink-0 gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#e7472e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#7c8061]" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <span className="min-w-0 truncate font-mono text-xs tracking-wider text-white/90">
                workspace / living-environment.mp4
              </span>
            </div>
            <span className="font-mono text-[11px] text-white/50">AUTO / LOOP / MUTED</span>
          </div>

          <video
            ref={videoRef}
            className="pointer-events-none absolute h-px w-px opacity-0"
            src={WORKSPACE_VIDEO}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            controls={false}
            disablePictureInPicture
            aria-hidden="true"
          />

          <div
            ref={compositionRef}
            className="relative"
            onPointerEnter={() => { if (isFinePointer) setIsHovered(true); }}
            onPointerLeave={() => {
              setIsHovered(false);
              if (phoneMotionRef.current) {
                gsap.to(phoneMotionRef.current, { x: 0, y: 0, rotation: 0, duration: 0.7, ease: "power3.out" });
              }
            }}
            onPointerMove={handlePointerMove}
          >
            <div ref={stageRef} className="mx-auto aspect-video w-full bg-[#0a0a0a]">
              <canvas
                ref={mainCanvasRef}
                role="img"
                aria-label="Landscape 16 by 9 video preview of a living code workspace"
                className="block h-full w-full"
              />
            </div>

            <div
              className={`living-phone-frame relative mx-auto mt-6 w-[min(62vw,240px)] aspect-[9/16] transition-[opacity,transform] duration-500 ease-out md:absolute md:bottom-5 md:right-5 md:mx-0 md:mt-0 md:w-[190px] lg:w-[240px] 2xl:w-[280px] ${phoneVisibility}`}
            >
              <div ref={phoneMotionRef} className="absolute inset-0">
                <div className="absolute inset-0 overflow-hidden rounded-[18px] border border-[#353535] bg-[#080808] p-[5px] shadow-xl">
                  <canvas
                    ref={phoneCanvasRef}
                    role="img"
                    aria-label="Portrait crop preview of the same landscape video"
                    className="block h-full w-full rounded-[14px] object-cover"
                  />
                  <span aria-hidden="true" className="absolute left-1/2 top-2 h-1 w-8 -translate-x-1/2 rounded-full bg-black/80 ring-1 ring-white/15" />
                  <span aria-hidden="true" className="absolute right-3 top-2 h-1.5 w-1.5 rounded-full bg-black/80 ring-1 ring-white/15" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#0e0e0e] px-4 py-2 font-mono text-[11px] text-white/60">
            <div className="flex items-center gap-4">
              <span className="text-[#e7472e]">{isVisible ? "● PLAYING" : "● READY"}</span>
              <span className="hidden sm:inline">ENGINEERING DEMO REEL</span>
            </div>
            <span className="font-medium text-white">16:9 EXPERIENCE / 9:16 CROP</span>
          </div>
        </div>
      </div>
    </section>
  );
}
