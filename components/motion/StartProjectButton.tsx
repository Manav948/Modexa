"use client";

interface StartProjectButtonProps {
  href?: string;
  className?: string;
  theme?: "light" | "dark";
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function StartProjectButton({
  href = "https://mail.google.com/mail/?view=cm&fs=1&to=modexa1819@gmail.com&su=Project%20Inquiry%20%2F%2F%20Modexa",
  className = "",
  theme = "light",
  onClick,
}: StartProjectButtonProps) {
  const isDark = theme === "dark";

  return (
    <a
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2.5 rounded-none px-6 py-3.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
        isDark
          ? "bg-[#E7472E] text-white hover:bg-white hover:text-[#1b1c18] shadow-[0_4px_16px_rgba(231,71,46,0.3)]"
          : "bg-[#E7472E] text-white hover:bg-[#1b1c18] hover:text-white shadow-[0_4px_16px_rgba(231,71,46,0.2)]"
      } ${className}`}
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      <span>START A PROJECT</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1.5"
      >
        →
      </span>
    </a>
  );
}
