import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import LinguWidget from "@/app/components/lingu-widget";
import { cn } from "@/lib/utils";
import {GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const gtAmericaRegular = localFont({
  src: "./fonts/GT-America-Regular.otf",
});

export const metadata: Metadata = {
  title: "Christopher Egbaaibon - Software | DevOps Engineer",
  description: "Software Engineer, Math",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          gtAmericaRegular.className,
          "md:container md:mx-auto overflow-x-hidden"
        )}
      >
        <GoogleAnalytics gaId="G-WTPMMSFEEP" />
        <Navbar />
        <div className="w-full p-3">
          {children}

          <br />
          <br />
          <br />
          <Footer />
        </div>
        <Script id="lingu-config" strategy="beforeInteractive">
          {`
            window.linguConfig = {
              apiKey: 'lingu_521982aca4ed6e89b783733db43891023555afa3156b352c7921c61809474fd2',
              baseURL: 'https://api.uselingu.app/api', // optional override
              autoOpen: false, // optional
              // widgetPosition: 'bottom-left' // optional (bottom-right | bottom-left | top-right | top-left)
            };
          `}
        </Script>

        <Script
          id="lingu-widget"
          src="https://chrisegbaaaibon.github.io/lingu/lingu-widget.js"
          type="module"
          strategy="afterInteractive"
        />      </body>
    </html>
  );
}
