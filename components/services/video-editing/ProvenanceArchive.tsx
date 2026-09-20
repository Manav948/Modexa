"use client";

const ARCHIVE = [
  { ref: "[01]", name: "KINETIC DRAFTING REVIEW", format: "Brand Campaign • 9:16 + 16:9", year: "2026", status: "DELIVERED", active: true },
  { ref: "[02]", name: "SPATIAL COMPUTING HORIZONS", format: "Tech Keynote Edit • 4K ProRes", year: "2026", status: "DELIVERED", active: true },
  { ref: "[03]", name: "ATELIER NOIR", format: "Fashion Week Reel Series • 9:16", year: "2025", status: "ARCHIVED", active: false },
  { ref: "[04]", name: "VOID RESONANCE", format: "Music Film & Sound Sculpture", year: "2025", status: "ARCHIVED", active: false },
  { ref: "[05]", name: "MONOLITHIC URBANISM", format: "Architectural Documentary • 4:3", year: "2025", status: "ARCHIVED", active: false },
  { ref: "[06]", name: "EPHEMERAL INK", format: "Brand Story • Multi-Platform", year: "2024", status: "ARCHIVED", active: false },
];

export default function ProvenanceArchive() {
  return (
    <section
      id="archive-index"
      className="w-full px-5 md:px-8 lg:px-12 py-24 border-t"
      style={{ backgroundColor: "#f5f3ed", borderColor: "#e4e2dd" }}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#e4e2dd]">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#1b1c18] line-reveal">
            <span className="text-[#b6240f] font-bold">06 / PROVENANCE INDEX</span>
            <span className="text-[#747878]">— ARCHIVAL REGISTRY</span>
          </div>
          <span className="font-mono text-[10px] text-[#747878] uppercase line-reveal">VOL. VI • 2024–2026</span>
        </div>

        {/* Archival Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left font-mono text-[11px] uppercase">
            <thead>
              <tr className="text-[#747878] border-b border-[#e4e2dd]">
                <th className="py-3 font-normal">REF. ID</th>
                <th className="py-3 font-normal">PROJECT NAME</th>
                <th className="py-3 font-normal">DISCIPLINE &amp; FORMAT</th>
                <th className="py-3 font-normal">YEAR</th>
                <th className="py-3 font-normal text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e2dd]">
              {ARCHIVE.map((row) => (
                <tr key={row.ref} className="hover:bg-[#fbf9f3] cursor-pointer group transition-colors">
                  <td className="py-4 text-[#b6240f] font-bold">{row.ref}</td>
                  <td className="py-4 text-[#1b1c18] font-sans uppercase font-medium group-hover:text-[#b6240f]">
                    {row.name}
                  </td>
                  <td className="py-4 text-[#747878]">{row.format}</td>
                  <td className="py-4 text-[#1b1c18]">{row.year}</td>
                  <td className={`py-4 text-right font-bold ${row.active ? "text-[#b6240f]" : "text-[#747878]"}`}>
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
