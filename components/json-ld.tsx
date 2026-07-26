import { record, siteConfig, systems } from "@/lib/data";

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: siteConfig.seat,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Lagos",
    },
    worksFor: record
      .filter((r) => r.current)
      .map((r) => ({ "@type": "Organization", name: r.org })),
    knowsAbout: [
      "Backend engineering",
      "REST API design",
      "Payments and reconciliation",
      "Node.js",
      "TypeScript",
      "NestJS",
      "MySQL",
      "PostgreSQL",
      "AWS",
      "Terraform",
      "DevOps",
    ],
    sameAs: [siteConfig.links.linkedin, siteConfig.links.github, siteConfig.links.linktree],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
  };

  const work = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Systems",
    itemListElement: systems.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      description: s.kind,
    })),
  };

  return (
    <>
      {[person, website, work].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
