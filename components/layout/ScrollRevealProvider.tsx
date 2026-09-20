"use client";

import { useEffect } from "react";

export default function ScrollRevealProvider() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const observeElements = () => {
      const revealEls = document.querySelectorAll(
        ".reveal-on-scroll, .image-mask-wrap, .line-reveal, .word-reveal, .text-reveal"
      );
      revealEls.forEach((el) => observer.observe(el));
    };

    observeElements();
    const timer = setTimeout(observeElements, 200);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}

