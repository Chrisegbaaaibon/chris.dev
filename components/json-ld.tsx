import { siteConfig } from "@/lib/data";

interface JsonLdProps {
  type?: "person" | "website";
}

export function JsonLd({ type = "website" }: JsonLdProps) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "Full-Stack Engineer & Software Architect",
    description: siteConfig.description,
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Development",
      "Backend Engineering",
      "DevOps",
      "Cloud Infrastructure",
      "System Architecture",
      "API Design",
      "Node.js",
      "TypeScript",
      "React",
      "Next.js",
      "Docker",
      "AWS",
      "PostgreSQL",
      "MongoDB",
    ],
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/projects`,
      "query-input": "required name=search_term_string",
    },
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} — Engineering Services`,
    url: `${siteConfig.url}/services`,
    description:
      "Backend & API Engineering, Full-Stack Web Applications, DevOps & Cloud Infrastructure, and Technical Architecture & Consulting.",
    provider: {
      "@type": "Person",
      name: siteConfig.name,
    },
    areaServed: "Worldwide",
    serviceType: [
      "Backend & API Engineering",
      "Full-Stack Web Applications",
      "DevOps & Cloud Infrastructure",
      "Technical Architecture & Consulting",
    ],
  };

  const schemas =
    type === "person"
      ? [personSchema]
      : [personSchema, websiteSchema, professionalServiceSchema];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

interface BreadcrumbJsonLdProps {
  items: { name: string; href: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
