"use client";

import { useRef } from "react";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  id?: string;
}

export default function MagneticButton({
  href = "#",
  onClick,
  children,
  className = "",
  variant = "primary",
  id,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    btn.style.transform = `translate(${relX * 0.22}px, ${relY * 0.22}px)`;
    btn.style.transition = "transform 0.1s ease-out";
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0px, 0px)";
    btn.style.transition = "transform 0.4s cubic-bezier(0.16,1,0.3,1)";
  };

  const baseStyles: React.CSSProperties = {
    fontFamily: "'Space Mono', monospace",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
    padding: "16px 32px",
    fontSize: "11px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 700,
    textDecoration: "none",
    cursor: "pointer",
    willChange: "transform",
    transition: "background-color 0.2s ease",
    ...(variant === "primary"
      ? { backgroundColor: "#1b1c18", color: "#ffffff" }
      : { backgroundColor: "transparent", color: "#1b1c18", border: "1px solid #1b1c18" }),
  };

  return (
    <a
      ref={btnRef}
      id={id}
      href={href}
      onClick={onClick}
      style={baseStyles}
      className={`magnetic-btn group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}
