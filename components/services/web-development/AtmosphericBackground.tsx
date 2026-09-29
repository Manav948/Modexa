"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AtmosphericBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // ── Respect reduced-motion preference ──────────────────────────────────
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ── Skip heavy pointer tracking on touch-primary devices ───────────────
    const isTouchPrimary =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (isTouchPrimary) return;

    // ── quickTo setters for smooth pointer-follow ───────────────────────────
    const setX = gsap.quickTo(el, "x", { duration: 1.8, ease: "power2.out" });
    const setY = gsap.quickTo(el, "y", { duration: 1.8, ease: "power2.out" });

    const handlePointerMove = (e: PointerEvent) => {
      // Map pointer position to a subtle translation (±24px)
      const cx = e.clientX / window.innerWidth - 0.5;   // –0.5 … +0.5
      const cy = e.clientY / window.innerHeight - 0.5;
      setX(cx * 48);
      setY(cy * 28);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Reset to origin when pointer leaves the viewport
    const handlePointerLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 2.4, ease: "power3.out" });
    };
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* The animated atmospheric form – moved by quickTo on pointer */}
      <div ref={wrapperRef} className="atmosphere-ribbon absolute inset-[-18%] will-change-transform">
        <svg
          className="h-full w-full"
          viewBox="0 0 1800 1000"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient
              id="fabric-light"
              x1="170"
              y1="780"
              x2="1550"
              y2="260"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" stopOpacity="0" />
              <stop offset=".38" stopColor="#c7c9cb" stopOpacity=".26" />
              <stop offset=".62" stopColor="#f2f2f2" stopOpacity=".64" />
              <stop offset=".82" stopColor="#aeb1b4" stopOpacity=".2" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <filter
              id="soft-fabric"
              x="-30%"
              y="-80%"
              width="160%"
              height="260%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation="34" />
            </filter>
          </defs>

          {/* Wide diffuse ribbon */}
          <path
            d="M-80 810 C240 770 315 920 520 788 C680 685 665 645 850 612 C1080 570 1120 385 1305 376 C1460 370 1515 505 1880 424"
            stroke="url(#fabric-light)"
            strokeWidth="190"
            filter="url(#soft-fabric)"
          />
          {/* Mid accent ribbon */}
          <path
            d="M-80 810 C240 770 315 920 520 788 C680 685 665 645 850 612 C1080 570 1120 385 1305 376 C1460 370 1515 505 1880 424"
            stroke="url(#fabric-light)"
            strokeWidth="72"
            opacity=".42"
            filter="url(#soft-fabric)"
          />
          {/* Fine hair-line edge */}
          <path
            d="M-100 865 C240 825 320 960 550 825 C700 738 718 690 900 650 C1110 603 1160 435 1320 422 C1495 408 1580 545 1900 470"
            stroke="url(#fabric-light)"
            strokeWidth="2"
            opacity=".28"
          />
        </svg>
      </div>

      {/* Radial vignette – keeps edges dark */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_54%_48%,transparent_10%,rgba(0,0,0,0.2)_58%,#000_100%)]" />

      <style>{`
        @keyframes atmosphere-drift {
          0%, 100% { transform: translate3d(-1.2%, 0, 0) scale(1); }
          50%       { transform: translate3d(1.2%, -1%, 0) scale(1.025); }
        }
        @keyframes scroll-nudge {
          0%, 100% { transform: translateY(0); opacity: .45; }
          50%       { transform: translateY(4px); opacity: 1; }
        }
        .atmosphere-ribbon { animation: atmosphere-drift 28s ease-in-out infinite; }
        @media (max-width: 767px) {
          .atmosphere-ribbon { inset: -8% -55%; opacity: .58; animation-duration: 38s; }
        }
        @media (prefers-reduced-motion: reduce) {
          .atmosphere-ribbon { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
