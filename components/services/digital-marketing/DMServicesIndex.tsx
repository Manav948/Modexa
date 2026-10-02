"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  { num: "01", title: "Social Media", desc: "Content and creative for the social channels your audience uses.", tag: "SOCIAL / CONTENT" },
  { num: "02", title: "Content Strategy", desc: "A clear plan for what to say, show and share.", tag: "PLAN / PUBLISH" },
  { num: "03", title: "Campaign Creative", desc: "Campaign ideas and visuals that keep the message clear.", tag: "CAMPAIGNS / CREATIVE" },
  { num: "04", title: "Digital Strategy", desc: "Plan who to reach, what to share and where.", tag: "AUDIENCE / CONTENT" },
  { num: "05", title: "Content Direction", desc: "Set a consistent look and voice across your content.", tag: "LOOK / VOICE" },
  { num: "06", title: "Distribution", desc: "Put content in the right places.", tag: "CONTENT / CHANNELS" },
];

export default function DMServicesIndex() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dm-service-label",
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".dm-service-label", start: "top 82%", once: true },
        }
      );
      gsap.fromTo(
        ".dm-service-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: ".dm-service-heading", start: "top 82%", once: true },
        }
      );
      gsap.fromTo(
        ".dm-svc-row",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.85, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: ".dm-svc-row", start: "top 85%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dm-services"
      className="w-full px-5 md:px-8 lg:px-14 py-24 border-t"
      style={{ backgroundColor: "#f0ede6", borderColor: "#E8E2D5" }}
    >
      <div className="max-w-[1400px] mx-auto w-full">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[#E8E2D5] gap-4">
          <div>
            <h2
              className="dm-service-heading text-[#151515] uppercase tracking-tight leading-none"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 700,
              }}
            >
                DIGITAL MARKETING SERVICES
            </h2>
          </div>
            <span
              className="font-mono text-[10px] text-[#55534E] uppercase tracking-wider font-bold"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              [ATTENTION / CONTENT / CAMPAIGNS]
            </span>
        </div>

        {/* Services list */}
        <div className="flex flex-col border-b border-[#E8E2D5]">
          {SERVICES.map((svc) => (
            <div
              key={svc.num}
              className="dm-svc-row group py-6 border-t border-[#E8E2D5] flex flex-col md:flex-row md:items-center justify-between gap-4 px-3 cursor-pointer hover:bg-[#f7f5ef] transition-colors"
            >
              <div className="flex items-start md:items-center gap-6">
                <span
                  className="font-mono text-[11px] text-[#E7472E] font-bold pt-0.5"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {svc.num}
                </span>
                <div>
                  <h3
                    className="text-[#151515] group-hover:text-[#E7472E] uppercase transition-colors text-xl md:text-2xl"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400 }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="text-[#55534E] text-sm mt-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {svc.desc}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 pt-2 md:pt-0">
                <span
                  className="font-mono text-[10px] text-[#55534E] uppercase tracking-widest hidden lg:inline font-semibold"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {svc.tag}
                </span>
                <span className="font-mono text-[14px] text-[#E7472E] group-hover:translate-x-2 transition-transform font-bold">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
