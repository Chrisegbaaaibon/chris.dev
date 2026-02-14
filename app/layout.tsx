import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CursorGlow } from "@/components/cursor-glow";
import { JsonLd } from "@/components/json-ld";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const BASE_URL = siteConfig.url;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0C" },
    { media: "(prefers-color-scheme: light)", color: "#F5F5F5" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Christopher Egbaaibon — Full-Stack Engineer & Software Architect",
    template: "%s | Christopher Egbaaibon",
  },
  description:
    "Full-Stack Engineer, Backend Specialist, DevOps Engineer & Software Architect. Building scalable systems, high-performance APIs & production-ready platforms.",
  keywords: [
    "Christopher Egbaaibon",
    "Full-Stack Engineer",
    "Backend Engineer",
    "DevOps Engineer",
    "Software Architect",
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
    "Software Developer",
    "API Development",
    "Cloud Infrastructure",
    "System Design",
    "Portfolio",
  ],
  authors: [{ name: "Christopher Egbaaibon", url: BASE_URL }],
  creator: "Christopher Egbaaibon",
  publisher: "Christopher Egbaaibon",
  category: "technology",
  classification: "Software Engineering Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Christopher Egbaaibon — Full-Stack Engineer & Software Architect",
    description:
      "Building scalable systems, high-performance APIs & production-ready platforms.",
    siteName: "Christopher Egbaaibon",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Christopher Egbaaibon — Full-Stack Engineer & Software Architect",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Egbaaibon — Full-Stack Engineer & Software Architect",
    description:
      "Building scalable systems, high-performance APIs & production-ready platforms.",
    images: ["/og-image.png"],
    creator: "@chrisegbaaibon",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans bg-deep text-off-white antialiased`}
      >
        <JsonLd type="website" />

        {/* Background gradient */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-deep" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-chrome-dark/5 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-chrome-dark/3 rounded-full blur-[128px]" />
        </div>

        <CursorGlow />
        <Navbar />
        <main className="pt-20 min-h-screen">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
