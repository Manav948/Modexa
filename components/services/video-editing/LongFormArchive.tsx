"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StartProjectButton from "@/components/motion/StartProjectButton";

const CHAPTERS = [
  { mark: "00%", title: "I. PROLOGUE", sub: "Opening / tone", offset: 0 },
  { mark: "34%", title: "II. THE BUILD", sub: "Structure / momentum", offset: 0.34 },
  { mark: "68%", title: "III. RESONANCE", sub: "Finish / release", offset: 0.68 },
];

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
};

const SECONDARY_PROJECTS = [
  {
    id: "01",
    tag: "INTERVIEW / LONG-FORM",
    ep: "PROJECT 01",
    title: "THE SPECIALIST DIALOGUE",
    desc: "A conversation shaped through considered multicam editing, clear pacing and warm sound.",
    views: "VIDEO / STORY / SOUND",
    image: "/edit/edit3.png",
    spec: "DUAL 4K PRORES // MULTICAM 24-BIT",
  },
  {
    id: "02",
    tag: "TALK / LONG-FORM",
    ep: "PROJECT 02",
    title: "DESIGN CADENCE",
    desc: "A long-form edit shaped with structure, screen detail and a clear narrative rhythm.",
    views: "VIDEO / EDIT / DELIVERY",
    image: "/edit/edit4.png",
    spec: "SCREEN GRAPHICS // DaVinci ACES",
  },
];

export default function LongFormArchive() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMainHovered, setIsMainHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeSecondary, setActiveSecondary] = useState<typeof SECONDARY_PROJECTS[0] | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cardPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const seekArchiveVideo = (event: React.MouseEvent<HTMLButtonElement>) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    video.currentTime = video.duration * ratio;
  };

  const seekToChapter = (index: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.currentTime = video.duration * CHAPTERS[index].offset;
    setActiveChapter(index);
    if (isMainHovered) void video.play().catch(() => setIsMainHovered(false));
  };

  // Smooth cursor-follow preview logic for long-form project cards
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const updateCard = () => {
      if (previewRef.current) {
        const targetX = mousePos.current.x - 180;
        const targetY = mousePos.current.y - 120;

        cardPos.current.x += (targetX - cardPos.current.x) * 0.15;
        cardPos.current.y += (targetY - cardPos.current.y) * 0.15;

        previewRef.current.style.transform = `translate3d(${cardPos.current.x}px, ${cardPos.current.y}px, 0px)`;
      }
      rafRef.current = requestAnimationFrame(updateCard);
    };
    rafRef.current = requestAnimationFrame(updateCard);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="long-form"
      className="relative w-full px-5 md:px-8 lg:px-12 py-24 border-t select-none"
      style={{ backgroundColor: "#fbf9f3", borderColor: "#e4e2dd" }}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#e4e2dd] gap-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] text-[#b6240f] uppercase tracking-widest mb-2 font-bold line-reveal">
              <span className="w-4 h-px bg-[#b6240f]" />
              <span>EXPANDED ARCHIVE</span>
            </div>
            <h2
              className="text-[#1b1c18] uppercase tracking-tight text-reveal"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                fontWeight: 700,
              }}
            >
              Long Form
            </h2>
          </div>
          <p
            className="text-[#747878] max-w-md font-sans text-sm md:text-base leading-relaxed text-reveal"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A long-form master cut shaped through pacing, sound and a clear editorial point of view.
          </p>
        </div>

        {/* Heroic Featured Project Player Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#f5f3ed] p-6 border border-[#e4e2dd] mb-16">
          {/* Hover preview player (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <div
              onPointerEnter={() => setIsMainHovered(true)}
              onPointerLeave={() => setIsMainHovered(false)}
              className="relative aspect-video w-full overflow-hidden border border-[#e4e2dd] bg-[#1b1c18] shadow-lg"
            >
              <video
                ref={videoRef}
                src="/videos/video2.mp4"
                poster="/edit/edit6.png"
                preload="auto"
                autoPlay
                muted
                loop
                controls
                playsInline
                onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
                onTimeUpdate={(event) => {
                  const video = event.currentTarget;
                  if (!video.duration) return;
                  setDuration((current) => current === video.duration ? current : video.duration);
                  setIsPlaying(true);
                  const currentProgress = video.currentTime / video.duration;
                  setCurrentTime(video.currentTime);
                  setProgress(currentProgress * 100);
                  const chapter = CHAPTERS.reduce(
                    (selected, item, index) => currentProgress >= item.offset ? index : selected,
                    0,
                  );
                  setActiveChapter((current) => current === chapter ? current : chapter);
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                aria-label="Long-form editing archive video"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 p-4">
                <div className="absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-[#b6240f]" />
                <div className="absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-[#b6240f]" />
                <div className="absolute bottom-16 left-4 h-4 w-4 border-b-2 border-l-2 border-[#b6240f]" />
                <div className="absolute bottom-16 right-4 h-4 w-4 border-b-2 border-r-2 border-[#b6240f]" />
              </div>

              <div aria-hidden="true" className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${isMainHovered ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
                <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-[#b6240f]/90 font-mono text-lg text-white shadow-lg">
                  ▶
                </span>
                <span className="border border-white/20 bg-[#1b1c18]/90 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-white">
                  {isPlaying ? "PLAYING / VIDEO 02" : "VIDEO 02 / BUFFERING"}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-[#1b1c18]/85 p-4 pt-3">
                <button
                  type="button"
                  onClick={seekArchiveVideo}
                  className="mb-3 block h-2 w-full cursor-pointer overflow-hidden bg-white/20"
                  aria-label="Seek in video 2"
                >
                  <span className="block h-full origin-left bg-[#b6240f] transition-[width] duration-100" style={{ width: `${progress}%` }} />
                </button>
                <div className="flex items-center justify-between gap-3 font-mono text-[9px] uppercase text-white sm:text-[10px]">
                  <span className="flex items-center gap-2 text-[#b6240f]">
                    <span className={`h-2 w-2 rounded-full bg-[#b6240f] ${isMainHovered ? "animate-pulse" : ""}`} />
                      {isPlaying ? "PLAYING" : "BUFFERING"}
                  </span>
                  <span className="text-white/75">{formatTime(currentTime)} / {formatTime(duration)}</span>
                  <span className="hidden truncate font-bold sm:inline">{CHAPTERS[activeChapter].title}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 font-mono text-[10px] sm:grid-cols-3">
              {CHAPTERS.map((chapter, index) => (
                <button
                  key={chapter.title}
                  type="button"
                  onClick={() => seekToChapter(index)}
                  className={`flex min-h-20 flex-col border p-3 text-left transition-colors ${activeChapter === index ? "border-[#1b1c18] border-l-4 border-l-[#b6240f] bg-[#1b1c18] text-white" : "border-[#e4e2dd] bg-[#fbf9f3] text-[#1b1c18] hover:border-[#1b1c18]"}`}
                >
                  <span className={activeChapter === index ? "font-bold text-[#b6240f]" : "text-[#747878]"}>{chapter.mark}</span>
                  <span className="mt-1 font-bold uppercase">{chapter.title}</span>
                  <span className={`text-[9px] ${activeChapter === index ? "text-[#c4c7c7]" : "text-[#747878]"}`}>{chapter.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Project Specification Breakdown (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between pt-2">
            <div>
              <span className="font-mono text-[10px] text-[#747878] tracking-widest uppercase font-bold">
                DIRECTORIAL DOCUMENTARY CUT
              </span>
              <h3
                className="text-[#1b1c18] uppercase leading-tight mt-1 mb-4 text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                The Architecture of Silence
              </h3>
              <p
                className="text-[#747878] text-sm leading-relaxed mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                A long-form narrative shaped through structure, pacing, sound and a clear editorial point of view.
              </p>

              <div className="flex flex-col gap-2.5 border-t border-[#e4e2dd] pt-4 font-mono text-[10px]">
                <div className="flex justify-between border-b border-[#f0eee8] pb-1">
                  <span className="text-[#747878]">DIRECTOR:</span>
                  <span className="text-[#1b1c18] font-bold">M. VAN DER ROHE</span>
                </div>
                <div className="flex justify-between border-b border-[#f0eee8] pb-1">
                  <span className="text-[#747878]">TIMELINE CADENCE:</span>
                  <span className="text-[#1b1c18] font-bold">MICRO-REST / ACCELERATION</span>
                </div>
                <div className="flex justify-between border-b border-[#f0eee8] pb-1">
                  <span className="text-[#747878]">COLOR PIPELINE:</span>
                  <span className="text-[#1b1c18] font-bold">DaVinci ACES 1.3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#747878]">SOUND MIX:</span>
                  <span className="text-[#1b1c18] font-bold">5.1 CINEMATIC STEMS</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#e4e2dd] mt-6">
              <StartProjectButton href="#initiation" className="w-full" />
            </div>
          </div>
        </div>

        {/* Secondary 2-Column Split Projects with Cursor Hover Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SECONDARY_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              onMouseEnter={() => setActiveSecondary(proj)}
              onMouseLeave={() => setActiveSecondary(null)}
              className="flex flex-col p-6 bg-[#f5f3ed] border border-[#e4e2dd] group cursor-pointer hover:border-[#1b1c18] transition-all hover:shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-[#747878] mb-2">
                <span>{proj.tag}</span>
                <span className="text-[#b6240f] font-bold">{proj.ep}</span>
              </div>

              <h3
                className="text-[#1b1c18] uppercase text-2xl group-hover:text-[#b6240f] transition-colors font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {proj.title}
              </h3>

              <p
                className="text-[#747878] text-xs leading-relaxed mt-2 mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {proj.desc}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-[#e4e2dd] font-mono text-[10px]">
                <span className="text-[#1b1c18] font-bold">{proj.views}</span>
                <span className="text-[#b6240f] group-hover:translate-x-2 transition-transform font-bold">
                  PLAY PREVIEW →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Cursor-Follow Video Preview Card */}
        <div
          ref={previewRef}
          className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
          style={{
            width: "360px",
            height: "220px",
            willChange: "transform",
            display: activeSecondary ? "block" : "none",
          }}
        >
          <AnimatePresence mode="wait">
            {activeSecondary && (
              <motion.div
                key={activeSecondary.id}
                initial={{ scale: 0.85, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                className="w-full h-full bg-[#1b1c18] border border-[#1b1c18] shadow-2xl overflow-hidden flex flex-col border border-white/20"
              >
                {/* Media Container */}
                <div className="relative w-full flex-1 overflow-hidden">
                  <img
                    src={activeSecondary.image}
                    alt={activeSecondary.title}
                    className="w-full h-full object-cover grayscale contrast-125 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b1c18] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#1b1c18]/90 font-mono text-[9px] text-white uppercase font-bold border border-white/20">
                    [ PREVIEW STEM // {activeSecondary.id} ]
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 bg-[#b6240f] font-mono text-[9px] text-white uppercase font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    PLAYING
                  </div>
                </div>

                {/* Bottom Spec Bar */}
                <div className="w-full px-3 py-2 bg-[#1b1c18] border-t border-[#30312d] flex items-center justify-between font-mono text-[9px]">
                  <span className="text-[#b6240f] font-bold truncate max-w-[240px]">
                    {activeSecondary.title}
                  </span>
                  <span className="text-white">▶</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
