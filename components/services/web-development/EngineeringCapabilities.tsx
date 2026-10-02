"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CAPABILITIES = [
  {
    number: "01",
    title: "PLAN THE SYSTEM",
    description: "Plan data, APIs and how each part of the website works together.",
  },
  {
    number: "02",
    title: "TURN DESIGN INTO CODE",
    description: "Build responsive styles and reusable components from the design.",
  },
  {
    number: "03",
    title: "INTERACTION AND MOTION",
    description: "Add scroll, cursor and page animations that support the experience.",
  },
  {
    number: "04",
    title: "CONNECT SERVICES",
    description: "Connect APIs, accounts and data the project needs.",
  },
  {
    number: "05",
    title: "TEST ON REAL SCREENS",
    description: "Check performance and layouts on phones, tablets and desktops.",
  },
  {
    number: "06",
    title: "DEPLOY AND MONITOR",
    description: "Prepare the website for launch and check how it runs.",
  },
];

export default function EngineeringCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const label = section.querySelector<HTMLElement>("[data-capabilities-label]");
      if (label) {
        gsap.fromTo(
          label,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: { trigger: section, start: "top 82%", once: true },
          },
        );
      }

      section.querySelectorAll<HTMLElement>("[data-capability]").forEach((panel) => {
        const phase = panel.querySelector<HTMLElement>("[data-capability-phase]");
        const title = panel.querySelector<HTMLElement>("[data-capability-title]");
        const description = panel.querySelector<HTMLElement>("[data-capability-description]");
        const dot = panel.querySelector<HTMLElement>("[data-capability-dot]");
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top 88%",
            once: true,
          },
        });

        timeline.fromTo(
          panel,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        );
        if (phase) {
          timeline.fromTo(phase, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, "<0.05");
        }
        if (title) {
          timeline.fromTo(title, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.46, ease: "power2.out" }, "<0.06");
        }
        if (description) {
          timeline.fromTo(description, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "<0.07");
        }
        if (dot) {
          timeline.fromTo(dot, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.32, ease: "power2.out" }, "<0.08");
        }
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Engineering capabilities"
      className="w-full border-t border-[#E8E2D5] bg-[#F7F5EF] px-5 py-16 text-[#151515] sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">

        <div className="grid grid-cols-1 border-l border-t border-[#E8E2D5] sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((capability) => (
            <article
              key={capability.number}
              data-capability
              className="group flex min-h-[270px] min-w-0 flex-col border-b border-r border-[#E8E2D5] bg-[#FBF9F3] p-5 transition-colors duration-300 hover:border-[#d8d2c5] hover:bg-[#f9f7f1] motion-reduce:transition-none sm:min-h-[300px] sm:p-6 lg:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <p data-capability-phase className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#747878] sm:text-[11px]">
                  PHASE <span className="px-1 text-[#E7472E]">{"//"}</span> {capability.number}
                </p>
                <span data-capability-dot aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E7472E] transition-transform duration-300 group-hover:scale-[1.15] motion-reduce:transition-none" />
              </div>

              <h2 data-capability-title className="mt-8 font-editorial text-[clamp(1.7rem,2.5vw,2.45rem)] font-normal uppercase leading-[1.02] tracking-[-0.025em] text-[#151515] transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none">
                {capability.title}
              </h2>
              <p data-capability-description className="mt-auto max-w-[440px] pt-6 font-sans text-sm leading-relaxed text-[#77736c] transition-colors duration-300 group-hover:text-[#55534E] motion-reduce:transition-none">
                {capability.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}