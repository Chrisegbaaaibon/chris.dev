import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import LinguWidget from "@/app/components/lingu-widget";
import { cn } from "@/lib/utils";
import {GoogleAnalytics } from "@next/third-parties/google";

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
        <LinguWidget apiKey="lingu-63b1967f3e78b404d7545f860f787d136f5b482e56ea32941bd554ef2b08c4dd" />
      </body>
    </html>
  );
}
