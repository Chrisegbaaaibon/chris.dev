import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Azeret_Mono, Inter } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { Analytics } from "@useorbits/analytics/next";
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

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const BASE_URL = siteConfig.url;

const OG_DESCRIPTION = siteConfig.description;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#161616" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: siteConfig.title,
    template: "%s | Christopher Egbaaibon",
  },
  description: siteConfig.description,
  keywords: [
    "Christopher Egbaaibon",
    "Full-Stack Engineer",
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
    title: siteConfig.title,
    description: OG_DESCRIPTION,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.title,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
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
    icon: [{ url: "/favicon.ico", sizes: "48x48" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The font variables live on <html> so :root can resolve --display and --mono.
    <html lang="en" suppressHydrationWarning className={`${bricolage.variable} ${azeret.variable} ${inter.variable}`}>
      <body>
        {/* Applies a saved light/dark choice before first paint, so there is no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
        <JsonLd />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
