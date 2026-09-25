import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "MODEXA — Flagship Creative Platform",
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
    title: "MODEXA",
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
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <head>
      </head>
      <body className="min-h-full flex flex-col bg-[#fbf9f3] text-[#1b1c18]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
