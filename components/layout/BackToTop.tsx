"use client";

interface BackToTopProps {
  className?: string;
}

export function scrollToTop() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("modexa:scroll-to-top"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function BackToTop({ className = "" }: BackToTopProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollToTop();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll back to top of current page"
      className={`group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors hover:text-[#E7472E] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E7472E] ${className}`}
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      <span>BACK TO TOP</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        ↑
      </span>
    </button>
  );
}
