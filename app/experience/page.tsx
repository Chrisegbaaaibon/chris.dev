import type { Metadata } from "next";
import { ExperiencePage } from "./experience-client";
import { BreadcrumbJsonLd } from "@/components/json-ld";

const title = "Experience";
const description =
  "Professional experience of Christopher Egbaaibon — roles across software engineering, DevOps, and technical leadership at startups and enterprises.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/experience" },
  openGraph: {
    title: `${title} | Christopher Egbaaibon`,
    description,
    url: "/experience",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Christopher Egbaaibon's Experience" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Christopher Egbaaibon`,
    description,
    images: ["/og-image.png"],
  },
};

export default function Experience() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Experience", href: "/experience" },
        ]}
      />
      <ExperiencePage />
    </>
  );
}
