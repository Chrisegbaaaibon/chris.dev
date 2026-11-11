import type { CSSProperties } from "react";
import Image from "next/image";
import { Dock } from "@/components/runbook/dock";
import { CopyEmail } from "@/components/runbook/copy-email";
import { NowPlaying } from "@/components/runbook/now-playing";
import { bio, companies, connect, experience, intro, record, siteConfig, work } from "@/lib/data";

/** Stagger position for the reveal animation. */
const i = (n: number) => ({ "--i": n }) as CSSProperties;

const list = new Intl.ListFormat("en-GB", { type: "conjunction" });

// Statically rendered, so this is the date of the last deploy.
const updated = new Date().toLocaleString("en-GB", { month: "long", year: "numeric" });

export default function Home() {
  return (
    <main className="folio" id="top">
      <div className="stack">
        <section className="intro" style={i(0)}>
          <Image className="avatar" src="/avatar.jpg" alt={siteConfig.name} width={48} height={48} priority />
          <h1>{intro.title}</h1>
          <div>
            <p className="sub">{intro.about}</p>
            <p className="sub">
              {intro.now[0]}
              <span className="logos">
                {companies.map((c) => (
                  <a key={c.name} href={c.url} title={c.name} target="_blank" rel="noopener noreferrer">
                    <Image src={c.logo} alt={c.name} width={20} height={20} />
                  </a>
                ))}
              </span>
              {intro.now[1]}
              <a href="#experience">a few others</a>.
            </p>
          </div>
        </section>

        <section id="work" style={i(1)}>
          <h2>Work</h2>
          <p className="sub">{work.sub}</p>
          <ul className="list">
            {work.items.map((w) => (
              <li key={w.title} className="item">
                <span className="t">{w.title}</span>
                <span className="d">{w.line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="experience" style={i(2)}>
          <h2>Experience</h2>
          <p className="sub">{experience.sub}</p>
          <ul className="list">
            {record
              .filter((r) => !experience.earlier.includes(r.org))
              .map((r) => (
                <li key={r.org} className="item row">
                  <span className="t">
                    {r.org} <span>· {r.seat}</span>
                  </span>
                  <span className="d">{r.dates}</span>
                </li>
              ))}
          </ul>
          <p className="sub">Earlier experiences: {list.format(experience.earlier)}.</p>
        </section>

        <section id="bio" style={i(3)}>
          <h2>Bio</h2>
          <p className="sub">{bio.sub}</p>
          {bio.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {bio.more.map((m) => (
            <div key={m.h}>
              <h3>{m.h}</h3>
              <p>{m.p}</p>
            </div>
          ))}
        </section>

        <section id="connect" style={i(4)}>
          <h2>Connect</h2>
          <h3>{connect.h}</h3>
          <p>{connect.p}</p>
          <div className="links">
            <CopyEmail />
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={siteConfig.links.linktree} target="_blank" rel="noopener noreferrer">
              More
            </a>
          </div>
        </section>

        <section className="foot" style={i(5)}>
          <NowPlaying />
          <p>Last updated {updated}</p>
        </section>
      </div>
      <div className="fade" />
      <Dock />
    </main>
  );
}
