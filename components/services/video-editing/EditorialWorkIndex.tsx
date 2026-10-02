"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  externalUrl: string;
  objectPosition?: string;
};

const PROJECTS: Project[] = [
  {
    id: "edit-01",
    title: "Momentum Cut",
    category: "VIDEO EDITING",
    description: "High-velocity cuts, rhythm-first pacing and sharp visual payoff for platform-native storytelling.",
    image: "/edit/edit1.png",
    externalUrl: "https://www.youtube.com/watch?v=VtPESKSUSxQ",
    objectPosition: "center center",
  },
  {
    id: "edit-02",
    title: "Portrait Tempo",
    category: "SOCIAL EDIT",
    description: "A close-frame editorial rhythm built to hold attention and keep the message intimate.",
    image: "/edit/edit2.png",
    externalUrl: "https://drive.google.com/file/d/1tkLVRjUp3QZ_thv_CcziQvoR5nlP48FD/view?usp=sharing",
    objectPosition: "center 18%",
  },
  {
    id: "edit-03",
    title: "Frame Study",
    category: "CAMPAIGN EDIT",
    description: "Structured visual storytelling designed for campaign clarity and cinematic motion.",
    image: "/edit/edit3.png",
    externalUrl: "https://framefolio.in/sauravhere",
    objectPosition: "center center",
  },
  {
    id: "edit-04",
    title: "Still in Motion",
    category: "EDITORIAL",
    description: "A restrained, tactile edit where pacing and composition carry the emotional arc.",
    image: "/edit/edit4.png",
    externalUrl: "https://www.instagram.com/reel/DcnQMUqoRKU/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
    objectPosition: "center center",
  },
  {
    id: "edit-05",
    title: "Vertical Rhythm",
    category: "MOTION",
    description: "Format-aware motion designed for vertical storytelling, speed and sharper retention hooks.",
    image: "/edit/edit5.png",
    externalUrl: "https://drive.google.com/file/d/1g22reEJBsO1Z0cQ3tD3_79Fmw2E2n-Bk/view",
    objectPosition: "center top",
  },
  {
    id: "edit-06",
    title: "Wide Format Cut",
    category: "LONG-FORM",
    description: "A broad, narrative-led frame balancing stillness, tension and a clean editorial flow.",
    image: "/edit/edit6.png",
    externalUrl: "https://drive.google.com/file/d/1j8IdQoCS3lqGJlm4zPOuEZ_vjSy8sVaK/view",
    objectPosition: "center center",
  },
  {
    id: "edit-07",
    title: "Narrative Sequence",
    category: "BRAND FILM",
    description: "A cinematic sequence built around story structure, tone and measured momentum.",
    image: "/edit/edit7.png",
    externalUrl: "https://thecreatorhub.in/",
    objectPosition: "center center",
  },
];

const AUTOPLAY_DELAY = 4600;

function ProjectSlide({
  project,
  isActive,
  onPrev,
  onNext,
  onProjectActivate,
}: {
  project: Project;
  isActive: boolean;
  onPrev: () => void;
  onNext: () => void;
  onProjectActivate: () => void;
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<HTMLAnchorElement>(null);

  const showPlayControl = () => {
    if (!playRef.current) return;
    gsap.to(playRef.current, {
      opacity: 1,
      scale: 1,
      autoAlpha: 1,
      duration: 0.25,
      ease: "power3.out",
    });
    gsap.set(playRef.current, { pointerEvents: "auto" });
  };

  const hidePlayControl = () => {
    if (!playRef.current) return;
    gsap.to(playRef.current, {
      opacity: 0,
      scale: 0.86,
      autoAlpha: 0,
      duration: 0.22,
      ease: "power3.out",
    });
    gsap.set(playRef.current, { pointerEvents: "none" });
  };

  useEffect(() => {
    if (!isActive) return;
    const image = imageRef.current;
    const textNodes = textRef.current?.querySelectorAll<HTMLElement>("[data-reveal]") ?? [];
    if (!image) return;

    gsap.fromTo(
      image,
      { scale: 1.08, clipPath: "inset(9% 0 9% 0 round 22px)", opacity: 0.35 },
      { scale: 1, clipPath: "inset(0% 0 0% 0 round 22px)", opacity: 1, duration: 0.8, ease: "power3.out" },
    );

    gsap.fromTo(
      Array.from(textNodes),
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "power3.out" },
    );

    gsap.set(playRef.current, {
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0.86,
      autoAlpha: 0,
      pointerEvents: "none",
    });
  }, [isActive]);

  return (
    <div className="grid w-full gap-6 lg:grid-cols-[1.6fr_0.9fr] lg:gap-10">
      <div className="relative">
        <div className="group relative block overflow-hidden border border-[#dcd7cb] bg-[#f5f3ed] shadow-[0_25px_50px_rgba(27,28,24,0.08)] transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(27,28,24,0.12)]">
          <div
            ref={imageRef}
            className="relative aspect-[3/2] w-full overflow-hidden bg-[#f5f3ed]"
            onPointerEnter={() => {
              showPlayControl();
            }}
            onPointerLeave={hidePlayControl}
          >
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onProjectActivate}
              aria-label={`Open ${project.title} project in a new tab`}
              className="absolute inset-0 z-0 block"
            >
              <Image
                key={project.id}
                src={project.image}
                alt={`${project.title} — ${project.category.toLowerCase()}`}
                fill
                priority={isActive}
                sizes="(max-width: 768px) 100vw, 70vw"
                className="h-full w-full object-contain transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-[0.72] group-hover:blur-[0.5px]"
                style={{ objectPosition: project.objectPosition ?? "center" }}
              />

              <div className="pointer-events-none absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
            </a>

            <a
              ref={playRef}
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onProjectActivate}
              className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/40 bg-[#111111]/80 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.28em] text-white shadow-[0_20px_30px_rgba(17,17,17,0.22)] backdrop-blur-sm opacity-100 md:pointer-events-none md:opacity-0 md:group-hover:opacity-100 md:group-hover:pointer-events-auto"
              aria-label={`Play ${project.title}`}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/35 bg-white/5 text-[10px] leading-none">
                ▶
              </span>
              <span>Play</span>
            </a>
          </div>
        </div>
      </div>

      <div ref={textRef} className="flex flex-col justify-end">
        <span data-reveal className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#b6240f]">
          {project.category}
        </span>
        <h3 data-reveal className="mb-4 max-w-[18ch] text-[clamp(2.2rem,4vw,4.6rem)] font-bold uppercase leading-[0.9] tracking-[-0.06em] text-[#1b1c18]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {project.title}
        </h3>
        <p data-reveal className="max-w-md text-sm leading-relaxed text-[#747878] sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
          {project.description}
        </p>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#e4e2dd] pt-5">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous project"
            className="inline-flex items-center gap-2 rounded-full border border-[#dcd7cb] bg-[#fbf9f3] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1b1c18] transition-all duration-300 hover:border-[#b6240f] hover:bg-[#b6240f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6240f]"
          >
            <span aria-hidden="true">←</span>
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next project"
            className="inline-flex items-center gap-2 rounded-full border border-[#dcd7cb] bg-[#fbf9f3] px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1b1c18] transition-all duration-300 hover:border-[#b6240f] hover:bg-[#b6240f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6240f]"
          >
            Next
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <a
          data-reveal
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onProjectActivate}
          className="mt-7 inline-flex w-fit items-center gap-2 border border-[#1b1c18] bg-[#1b1c18] px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#fbf9f3] transition-colors hover:border-[#b6240f] hover:bg-[#b6240f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6240f]"
        >
          View project <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

export default function EditorialWorkIndex() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const dragTweenRef = useRef<gsap.core.Tween | null>(null);
  const suppressClickRef = useRef(false);
  const autoplayRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; deltaX: number; isDragging: boolean } | null>(null);

  const clearAutoplay = useCallback(() => {
    if (autoplayRef.current !== null) {
      window.clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const goTo = useCallback((direction: -1 | 1, preserveDragOffset = false) => {
    dragTweenRef.current?.kill();
    dragTweenRef.current = null;
    if (!preserveDragOffset && slideRef.current) {
      gsap.set(slideRef.current, { x: 0 });
    }
    const nextIndex = (activeIndexRef.current + direction + PROJECTS.length) % PROJECTS.length;
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  }, []);

  const triggerInteraction = useCallback(() => {
    clearAutoplay();
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = window.setTimeout(() => {
      if (!isHovering && !reducedMotion) {
        clearAutoplay();
        autoplayRef.current = window.setTimeout(() => {
          goTo(1);
        }, AUTOPLAY_DELAY);
      }
    }, 800);
  }, [clearAutoplay, goTo, isHovering, reducedMotion]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(media.matches);
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || isHovering) {
      clearAutoplay();
      return;
    }
    clearAutoplay();
    autoplayRef.current = window.setTimeout(() => {
      goTo(1);
    }, AUTOPLAY_DELAY);
    return clearAutoplay;
  }, [activeIndex, clearAutoplay, isHovering, reducedMotion, goTo]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        triggerInteraction();
        goTo(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        triggerInteraction();
        goTo(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goTo, triggerInteraction]);

  useEffect(() => () => {
    clearAutoplay();
    dragTweenRef.current?.kill();
    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
    }
  }, [clearAutoplay]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("button")) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    suppressClickRef.current = false;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, deltaX: 0, isDragging: false };
    triggerInteraction();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - drag.startX;
    drag.deltaX = deltaX;
    if (Math.abs(deltaX) > 8) {
      suppressClickRef.current = true;
      if (!drag.isDragging) {
        drag.isDragging = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      gsap.set(slideRef.current, { x: deltaX, force3D: true });
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const shouldAdvance = Math.abs(drag.deltaX) > 72;
    if (shouldAdvance) {
      goTo(drag.deltaX < 0 ? 1 : -1, true);
    }
    dragTweenRef.current?.kill();
    dragTweenRef.current = gsap.to(slideRef.current, {
      x: 0,
      duration: 0.45,
      ease: "power3.out",
      onComplete: () => {
        dragTweenRef.current = null;
      },
    });
    dragRef.current = null;
    triggerInteraction();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const activeProject = PROJECTS[activeIndex];

  return (
    <section
      id="selected-work"
      aria-labelledby="selected-work-title"
      className="relative w-full overflow-hidden border-t border-[#e4e2dd] bg-[#fbf9f3] py-20 text-[#1b1c18] sm:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#b6240f]">
              Selected edits
            </p>
            <h2 id="selected-work-title" className="font-display text-[clamp(2.6rem,5vw,5rem)] uppercase leading-[0.9] tracking-[-0.05em]">
              Selected edits
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#747878] sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            A selection of work shaped through rhythm, pacing, story and motion.
          </p>
        </div>

        <div
          ref={slideRef}
          className="relative overflow-hidden rounded-[2px] border border-[#e4e2dd] bg-[#f5f3ed] p-4 sm:p-6 lg:p-8"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onClickCapture={(event) => {
            if (!suppressClickRef.current) return;
            event.preventDefault();
            event.stopPropagation();
            suppressClickRef.current = false;
          }}
          style={{ touchAction: "pan-y" }}
        >
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#e4e2dd] pb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#747878]">
              {String(activeIndex + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  triggerInteraction();
                  goTo(-1);
                }}
                aria-label="Previous project"
                className="grid h-11 w-11 place-items-center rounded-full border border-[#dcd7cb] bg-[#fbf9f3] font-mono text-base text-[#1b1c18] transition-all duration-300 hover:border-[#b6240f] hover:bg-[#b6240f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6240f]"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerInteraction();
                  goTo(1);
                }}
                aria-label="Next project"
                className="grid h-11 w-11 place-items-center rounded-full border border-[#dcd7cb] bg-[#fbf9f3] font-mono text-base text-[#1b1c18] transition-all duration-300 hover:border-[#b6240f] hover:bg-[#b6240f] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b6240f]"
              >
                →
              </button>
            </div>
          </div>

          <ProjectSlide
            project={activeProject}
            isActive
            onPrev={() => {
              triggerInteraction();
              goTo(-1);
            }}
            onNext={() => {
              triggerInteraction();
              goTo(1);
            }}
            onProjectActivate={triggerInteraction}
          />
        </div>
      </div>
    </section>
  );
}
