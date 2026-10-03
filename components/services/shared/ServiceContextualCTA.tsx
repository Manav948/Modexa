"use client";

import Link from "next/link";
import StartProjectButton from "@/components/motion/StartProjectButton";

interface ServiceContextualCTAProps {
  discipline: string;
  headlinePrefix: string;
  headlineItalic: string;
  description: string;
  subject: string;
}

export default function ServiceContextualCTA({
  discipline,
  headlinePrefix,
  headlineItalic,
  description,
  subject,
}: ServiceContextualCTAProps) {
  const encodedSubject = encodeURIComponent(subject);
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=modexa1819@gmail.com&su=${encodedSubject}`;
  const mailtoUrl = `mailto:modexa1819@gmail.com?subject=${encodedSubject}`;

  return (
    <section
      id="service-cta"
      className="relative w-full border-t border-[#2a2a2a] bg-[#121214] px-5 py-16 sm:py-20 md:px-8 lg:px-12 text-[#fbf9f3] overflow-hidden"
      aria-label="Service project initiation"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* Headline & Description */}
          <div className="lg:col-span-8 flex flex-col items-start">
            <div
              className="mb-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#E7472E] font-bold"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <span>{discipline}</span>
              <span className="h-px w-4 bg-[#E7472E]" />
              <span className="text-white/50">LET&apos;S TALK</span>
            </div>

            <h2
              className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-[-0.035em] text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {headlinePrefix}
              <br />
              <span className="font-normal italic text-white/80">{headlineItalic}</span>
            </h2>

            <p
              className="mt-4 max-w-xl font-sans text-sm sm:text-base leading-relaxed text-white/60"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start gap-4">
            <StartProjectButton
              theme="dark"
              href={gmailComposeUrl}
              mobileHref={mailtoUrl}
              className="w-full sm:w-auto lg:w-full text-center"
            />
            
            <Link
              href="/#services"
              className="inline-flex w-full sm:w-auto lg:w-full items-center justify-center border border-white/20 bg-transparent px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-white/80 transition-colors hover:border-white hover:text-white"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              <span>VIEW ALL SERVICES →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
