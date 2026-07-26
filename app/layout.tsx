import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Azeret_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/lib/data";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz"],
  display: "swap",
});

const azeret = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-azeret",
  display: "swap",
});

const BASE_URL = siteConfig.url;

/** Matches the line typeset into the OG card. */
const OG_DESCRIPTION =
  "APIs, data models, queues and pipelines. Five years, eight teams, mostly fintech.";

export const viewport: Viewport = {
  themeColor: "#F3F0E9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Christopher Egbaaibon, senior backend engineer",
    template: "%s | Christopher Egbaaibon",
  },
  description: siteConfig.description,
  keywords: [
    "Christopher Egbaaibon",
    "Senior Backend Engineer",
    "Backend Engineer",
    "DevOps Engineer",
    "Fintech Engineer",
    "Node.js",
    "TypeScript",
    "NestJS",
    "MySQL",
    "AWS",
    "Terraform",
    "API Design",
    "Payments and reconciliation",
    "Lagos Nigeria",
  ],
  authors: [{ name: siteConfig.name, url: BASE_URL }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  classification: "Software Engineering Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Christopher Egbaaibon, senior backend engineer",
    description: OG_DESCRIPTION,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Christopher Egbaaibon, senior backend engineer. 50,000+ users served, 99.9999% uptime, 5 years.",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christopher Egbaaibon, senior backend engineer",
    description: OG_DESCRIPTION,
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
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The font variables live on <html> so :root can resolve --display and --mono.
    <html lang="en" className={`${bricolage.variable} ${azeret.variable}`}>
      <body>
        <JsonLd />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
