"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STACK_LAYERS = [
  {
    number: "01",
    title: "NEXT.JS 16",
    description: "App Router pages and server rendering for fast, responsive websites.",
    category: "FRAMEWORK",
    detail: "APP ROUTER",
  },
  {
    number: "02",
    title: "TYPESCRIPT 5",
    description: "Types help catch errors and keep application code clear.",
    category: "LANGUAGE",
    detail: "TYPE SYSTEM",
  },
  {
    number: "03",
    title: "GSAP + LENIS",
    description: "Scroll-triggered animation and smooth scrolling where they support the experience.",
    category: "MOTION",
    detail: "SCROLLTRIGGER",
  },
  {
    number: "04",
    title: "TAILWIND CSS",
    description: "Responsive styles built from a consistent set of colors and type.",
    category: "STYLING",
    detail: "DESIGN TOKENS",
  },
  {
    number: "05",
    title: "SERVER / DATA",
    description: "Connect websites to APIs, data and the services each project needs.",
    category: "BACKEND",
    detail: "API INTEGRATION",
  },
];

export default function EngineeringStack() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      section.querySelectorAll<HTMLElement>("[data-stack-row]").forEach((row) => {
        const title = row.querySelector<HTMLElement>("[data-stack-title]");
        const description = row.querySelector<HTMLElement>("[data-stack-description]");
        const metadata = row.querySelector<HTMLElement>("[data-stack-meta]");
        const rule = row.querySelector<HTMLElement>("[data-stack-rule]");
        if (!title || !description || !metadata || !rule) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 86%",
            once: true,
          },
        });

        timeline
          .fromTo(rule, { scaleX: 0.55, transformOrigin: "left center", opacity: 0.35 }, { scaleX: 1, opacity: 1, duration: 0.65, ease: "power2.out" })
          .fromTo(title, { y: 22, opacity: 0, filter: "blur(3px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.72, ease: "power3.out" }, "<0.04")
          .fromTo(description, { y: 14, opacity: 0, filter: "blur(2px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.62, ease: "power2.out" }, "<0.1")
          .fromTo(metadata, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "<0.08");
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack"
      ref={sectionRef}
      aria-labelledby="engineering-stack-title"
      className="w-full bg-[#f7f5ef] px-5 pb-20 pt-16 text-[#151515] sm:px-8 md:px-12 lg:px-16 lg:pb-28 lg:pt-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="border-b border-[#E8E2D5] pb-8 md:pb-10">
          <div className="mt-5 flex flex-col gap-5 md:mt-6 md:flex-row md:items-end md:justify-between">
            <h2 id="engineering-stack-title" className="font-display text-[clamp(2.2rem,5vw,4.6rem)] font-normal uppercase leading-[0.94] tracking-[-0.055em]">
              TOOLS FOR<br />THE WEB
            </h2>
            <p className="max-w-[420px] font-sans text-sm leading-relaxed text-[#55534E] md:pb-1 md:text-[15px]">
              The tools we use to build websites and digital products.
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          {STACK_LAYERS.map((layer) => (
            <article
              key={layer.number}
              data-stack-row
              className="group relative grid grid-cols-1 gap-x-6 gap-y-3 border-b border-[#E8E2D5] py-7 sm:py-8 md:grid-cols-[32px_minmax(0,1fr)] md:gap-x-6 lg:grid-cols-[42px_minmax(0,1.25fr)_minmax(220px,1fr)_minmax(125px,0.62fr)] lg:items-center lg:gap-x-10 lg:py-9"
            >
              <span className="font-mono text-[10px] tracking-[0.12em] text-[#E7472E] md:self-start md:pt-2">{layer.number}</span>
              <h3 data-stack-title className="font-editorial text-[clamp(2rem,3.4vw,3.4rem)] font-normal leading-[0.98] tracking-[-0.035em] text-[#151515] transition-transform duration-300 ease-out group-hover:translate-x-1">
                {layer.title}
              </h3>
              <p data-stack-description className="max-w-[390px] font-sans md:col-start-2 lg:col-auto text-sm leading-relaxed text-[#55534E] md:text-[14px]">
                {layer.description}
              </p>
              <div data-stack-meta className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#747878] md:col-start-2 md:flex-col md:items-start md:gap-1.5 lg:col-auto lg:justify-self-end">
                <span>{layer.category}</span>
                <span aria-hidden="true" className="text-[#E8E2D5] md:hidden">/</span>
                <span>{layer.detail}</span>
              </div>
              <span data-stack-rule aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#d8d2c5] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}