"use client";

import Link from "next/link";
import { sections, siteConfig } from "@/lib/data";
import { useActiveSection } from "./use-active-section";
import { NowPlaying } from "./now-playing";

const IDS = sections.map((s) => s.id);

export function TopNav() {
  const active = useActiveSection(IDS);
  // The opening has no entry up here, so it reads against the first section.
  const marked = active === "top" ? "now" : active;
  const items = sections.filter((s) => s.nav);

  return (
    <nav className="nav">
      {items.slice(0, -1).map((s) => (
        <a key={s.id} href={`#${s.id}`} aria-current={marked === s.id ? "page" : undefined}>
          {s.label}
        </a>
      ))}
      <a
        href="#contact"
        aria-current={marked === "contact" ? "page" : undefined}
      >
        Contact
      </a>
    </nav>
  );
}

export function Rail() {
  const active = useActiveSection(IDS);

  return (
    <aside className="rail">
      <div className="rail-inner">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className={active === s.id ? "on" : undefined}>
            <span className="rn">{s.rn}</span> {s.label}
          </a>
        ))}
        <div className="avail">
          <b>{siteConfig.availability.headline}</b>
          {siteConfig.availability.lines.map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </div>
        <NowPlaying />
      </div>
    </aside>
  );
}
