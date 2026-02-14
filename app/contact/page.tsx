import type { Metadata } from "next";
import { ContactPage } from "./contact-client";
import { BreadcrumbJsonLd } from "@/components/json-ld";

const title = "Contact";
const description =
  "Get in touch with Christopher Egbaaibon for engineering projects, technical consulting, contract work, or collaboration opportunities.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${title} | Christopher Egbaaibon`,
    description,
    url: "/contact",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact Christopher Egbaaibon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Christopher Egbaaibon`,
    description,
    images: ["/og-image.png"],
  },
};

export default function Contact() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <ContactPage />
    </>
  );
}
