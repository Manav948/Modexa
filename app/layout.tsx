import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STUDIO DIRECTION — Flagship Creative Platform",
  description:
    "A unified, tactile design atelier binding motion, code, architectural interfaces, and editorial typography into one clear physical cadence.",
  keywords: [
    "creative direction",
    "motion design",
    "UI/UX",
    "web development",
    "branding",
    "editorial",
  ],
  openGraph: {
    title: "STUDIO DIRECTION",
    description:
      "Many ideas. Many specialized crafts. One creative direction.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&family=Manrope:wght@400;500;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fbf9f3] text-[#1b1c18]">
        {children}
      </body>
    </html>
  );
}
