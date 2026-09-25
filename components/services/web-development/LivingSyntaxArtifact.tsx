"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WORKSPACE_VIDEO = "/videos/video1.mp4";

export default function LivingSyntaxArtifact() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!section || !frame || !video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          /* Autoplay can be blocked until interaction; muted + playsInline usually allow it. */
        });
      }
    };

    const onLoaded = () => {
      ScrollTrigger.refresh();
      tryPlay();
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("loadeddata", onLoaded);

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(frame, { opacity: 1, y: 0, scale: 1, clipPath: "none" });
        tryPlay();
        return;
      }

      gsap.fromTo(
        frame,
        {
          opacity: 0,
          y: 28,
          scale: 0.98,
          clipPath: "inset(8% 6% 8% 6%)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
            onEnter: () => tryPlay(),
          },
        },
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => tryPlay(),
        onEnterBack: () => tryPlay(),
        onLeave: () => video.pause(),
        onLeaveBack: () => video.pause(),
      });
    }, section);

    // Ensure layout measurements include the video frame
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("loadeddata", onLoaded);
      context.revert();
    };
  }, []);

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

        {/* Video occupies the previous console visual role — content-driven height */}
        <div
          ref={frameRef}
          className="group relative w-full overflow-hidden border border-[#1b1c18]/15 bg-[#0a0a0a] will-change-transform"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#151515] px-4 py-3 text-white/60">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#e7472e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#7c8061]" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <span className="min-w-0 truncate font-mono text-xs tracking-wider text-white/90">
                workspace / living-environment.mp4
              </span>
            </div>
            <span className="font-mono text-[11px] text-white/40">AUTO // LOOP // MUTED</span>
          </div>

          <div className="relative aspect-video w-full bg-[#0a0a0a]">
            <video
              ref={videoRef}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              src={WORKSPACE_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              controls={false}
              disablePictureInPicture
              aria-label="Living code workspace demonstration"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#0e0e0e] px-4 py-2 font-mono text-[11px] text-white/50">
            <div className="flex items-center gap-4">
              <span className="text-[#e7472e]">● PLAYING</span>
              <span className="hidden sm:inline">ENGINEERING DEMO REEL</span>
            </div>
            <span className="font-medium text-white">LIVING CODE WORKSPACE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
