"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/data";

export function CopyEmail() {
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
      // Clipboard blocked, fall back to the mail client.
      window.location.href = siteConfig.links.email;
    }
  };

  return (
    <button
      type="button"
      className="copy"
      onClick={copy}
      aria-label={`Copy email address ${siteConfig.email}`}
    >
      <span aria-live="polite">{copied ? "Copied" : "Email"}</span>
    </button>
  );
}
