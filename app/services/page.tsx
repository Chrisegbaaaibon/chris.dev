import type { Metadata } from "next";
import { ServicesPage } from "./services-client";
import { BreadcrumbJsonLd } from "@/components/json-ld";

const title = "Services";
const description =
  "Professional engineering services by Christopher Egbaaibon — Backend & API Engineering, Full-Stack Web Applications, DevOps & Cloud Infrastructure, and Technical Architecture & Consulting.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${title} | Christopher Egbaaibon`,
    description,
    url: "/services",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Christopher Egbaaibon's Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Christopher Egbaaibon`,
    description,
    images: ["/og-image.png"],
  },
};

export default function Services() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />
      <ServicesPage />
    </>
  );
}
