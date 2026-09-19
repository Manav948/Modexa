import Link from "next/link";

interface DetailPlaceholderProps {
  type: "SERVICE" | "WORK";
}

export default function DetailPlaceholder({ type }: DetailPlaceholderProps) {
  return (
    <main className="min-h-screen bg-[#fbf9f3] text-[#1b1c18] px-5 py-8 md:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1400px] flex-col">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e4e2dd] pb-6">
          <Link
            href="/"
            className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#b6240f]"
          >
            MODEXA
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#747878]">
            {type} DOSSIER
          </span>
        </header>

        <section className="flex flex-1 items-center py-20">
          <div className="w-full border border-[#e4e2dd] bg-[#f5f3ed] p-6 sm:p-10 md:p-16">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#b6240f]">
              CONTENT RESERVED
            </span>
            <h1
              className="mt-5 max-w-3xl text-[clamp(2.5rem,7vw,6rem)] leading-[0.95]"
              style={{ fontFamily: "'Newsreader', Georgia, serif" }}
            >
              {type === "SERVICE" ? "SERVICE DETAILS." : "PROJECT DETAILS."}
            </h1>
            <p className="mt-6 max-w-xl font-mono text-xs uppercase leading-relaxed tracking-wider text-[#747878]">
              This dossier is ready for content, imagery, and case study notes.
            </p>
            <Link
              href="/"
              className="mt-10 inline-flex border border-[#1b1c18] px-4 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors hover:bg-[#b6240f] hover:text-white"
            >
              RETURN TO MODEXA <span className="ml-3">→</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
