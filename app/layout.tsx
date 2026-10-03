import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MODEXA | Digital Services",
  description:
    "MODEXA is a creative studio delivering web development, UI/UX design, video editing and digital marketing for brands and digital products.",
  applicationName: "MODEXA",
  keywords: [
    "MODEXA",
    "creative studio",
    "web development",
    "UI/UX design",
    "video editing",
    "motion design",
    "digital marketing",
    "content and campaigns",
    "digital experiences",
  ],
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png", sizes: "1280x1280" }],
    shortcut: ["/images/logo.png"],
    apple: [{ url: "/images/logo.png", type: "image/png", sizes: "1280x1280" }],
  },
  openGraph: {
    title: "MODEXA | Digital Services",
    description:
      "Web development, UI/UX design, video editing and digital marketing for brands and digital products.",
    type: "website",
    siteName: "MODEXA",
    images: [
      {
        url: "/images/logo.png",
        width: 1280,
        height: 1280,
        alt: "MODEXA logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MODEXA | Digital Services",
    description:
      "Web development, UI/UX design, video editing and digital marketing for brands and digital products.",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col bg-[#fbf9f3] text-[#1b1c18]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
