"use client";

export default function AtmosphericBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Layer 1: Ethereal silver-white fluid crest */}
      <div
        className="absolute -top-[25%] -left-[20%] w-[140%] h-[140%] rounded-full blur-[140px] pointer-events-none mix-blend-screen opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(200,205,210,0.06) 40%, transparent 75%)",
        }}
      />

      {/* Layer 2: Low-frequency charcoal smoke drift */}
      <div
        className="absolute -bottom-[20%] -right-[15%] w-[120%] h-[120%] rounded-full blur-[160px] pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(140,145,155,0.12) 0%, rgba(50,55,65,0.04) 50%, transparent 80%)",
        }}
      />

      {/* Layer 3: Core kinetic illumination ray */}
      <div
        className="absolute top-1/4 left-1/5 w-[75vw] h-[360px] rounded-full blur-[120px] pointer-events-none opacity-15 transform -rotate-12"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
        }}
      />

      {/* Architectural subtle hairline matrix lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex justify-between px-6 md:px-12 lg:px-16">
        <div className="w-px h-full bg-white/20" />
        <div className="w-px h-full bg-white/20 hidden md:block" />
        <div className="w-px h-full bg-white/20 hidden lg:block" />
        <div className="w-px h-full bg-white/20" />
      </div>

    </div>
  );
}
