"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/data";

export function ContactActions() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
    } catch {
      // Clipboard blocked, the mailto button next to this still works.
      setCopied(false);
    }
  };

  return (
    <div className="actions">
      <a className="btn fill" href={siteConfig.links.email}>
        {siteConfig.email}
      </a>
      <button type="button" className="btn" onClick={copy} aria-live="polite">
        {copied ? "Copied ✓" : "Copy address"}
      </button>
      <a className="btn" href={siteConfig.cv} download>
        Download the CV
      </a>
    </div>
  );
}
