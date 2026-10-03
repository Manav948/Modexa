"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

interface EmailLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  mobileHref: string;
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

export default function EmailLink({
  href,
  mobileHref,
  onClick,
  target,
  ...props
}: EmailLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || isMobileDevice()) return;

    event.preventDefault();
    if (target === "_blank") {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.assign(href);
    }
  };

  return <a {...props} href={mobileHref} target={target} onClick={handleClick} />;
}
