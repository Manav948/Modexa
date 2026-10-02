import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "MODEXA — Creative Studio",
  description:
    "MODEXA brings design, video, technology and digital marketing together around the needs of each project.",
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
      "The right specialists, working in one clear direction.",
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
