"use client";

export default function ProvenanceArchive() {
  return (
    <section
      id="editing-story"
      className="w-full border-t px-5 py-20 md:px-8 md:py-24 lg:px-12"
      style={{ backgroundColor: "#f5f3ed", borderColor: "#e4e2dd" }}
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-[#e4e2dd] pb-3 sm:mb-14">
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#b6240f]">
            VIDEO EDITING / 01
          </span>
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#747878] sm:text-[10px]">
            STORY / PACE / SOUND
          </span>
        </div>

        <div className="grid grid-cols-1 items-end gap-8 border-b border-[#e4e2dd] pb-10 md:grid-cols-12 md:gap-10 md:pb-14">
          <h2 className="font-display text-6xl font-normal uppercase leading-[0.82] tracking-[-0.055em] text-[#1b1c18] sm:text-7xl md:col-span-8 lg:text-8xl">
            RHYTHM
            <br />
            <span className="font-editorial italic text-[#b6240f]">MATTERS.</span>
          </h2>
          <p className="max-w-md font-sans text-sm leading-relaxed text-[#55534E] sm:text-base md:col-span-4 md:pb-2">
            The right cut can change how a moment feels. We shape each edit around its story, pace and audience.
          </p>
        </div>

        <div className="grid grid-cols-1 divide-y divide-[#e4e2dd] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="py-5 sm:pr-5 sm:py-6 md:pr-8">
            <span className="font-mono text-[10px] font-bold text-[#b6240f]">01 / STORY</span>
            <p className="mt-2 font-display text-xl uppercase text-[#1b1c18] sm:text-2xl">Find the moment.</p>
          </div>
          <div className="py-5 sm:px-5 sm:py-6 md:px-8">
            <span className="font-mono text-[10px] font-bold text-[#b6240f]">02 / PACE</span>
            <p className="mt-2 font-display text-xl uppercase text-[#1b1c18] sm:text-2xl">Let it breathe.</p>
          </div>
          <div className="py-5 sm:pl-5 sm:py-6 md:pl-8">
            <span className="font-mono text-[10px] font-bold text-[#b6240f]">03 / SOUND</span>
            <p className="mt-2 font-display text-xl uppercase text-[#1b1c18] sm:text-2xl">Make it land.</p>
          </div>
        </div>
      </div>
    </section>
  );
}