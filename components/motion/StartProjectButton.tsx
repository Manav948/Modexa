"use client";

import EmailLink from "@/components/contact/EmailLink";

interface StartProjectButtonProps {
  href?: string;
  mobileHref?: string;
  className?: string;
  theme?: "light" | "dark";
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function StartProjectButton({
  href = "https://mail.google.com/mail/?view=cm&fs=1&to=modexa1819@gmail.com&su=Project%20Inquiry%20%2F%2F%20Modexa",
  mobileHref = "mailto:modexa1819@gmail.com?subject=Project%20Inquiry%20%2F%2F%20Modexa",
  className = "",
  theme = "light",
  onClick,
}: StartProjectButtonProps) {
  const isDark = theme === "dark";
  const isEmailLink = href.startsWith("https://mail.google.com/mail/");
  const linkClassName = `group inline-flex items-center justify-center gap-2 px-5 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors ${
    isDark
      ? "bg-white text-[#1b1c18] hover:bg-[#E7472E] hover:text-white"
      : "bg-[#E7472E] text-white hover:bg-[#1b1c18]"
  } ${className}`;
  const children = (
    <>
      <span>START A PROJECT</span>
      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </>
  );

  if (isEmailLink) {
    return (
      <EmailLink
        href={href}
        mobileHref={mobileHref}
        onClick={onClick}
        className={linkClassName}
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {children}
      </EmailLink>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={linkClassName}
      style={{ fontFamily: "'DM Mono', monospace" }}
    >
      {children}
    </a>
  );
}
