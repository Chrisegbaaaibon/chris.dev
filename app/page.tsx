import Link from "next/link";
import { TopNav, Rail } from "@/components/runbook/nav";
import { Systems } from "@/components/runbook/systems";
import { RecordTable } from "@/components/runbook/record-table";
import { ContactActions } from "@/components/runbook/contact-actions";
import {
  alsoRecord,
  contact,
  figures,
  now,
  opening,
  practice,
  siteConfig,
  toolkit,
} from "@/lib/data";

export default function Home() {
  return (
    <div className="runbook">
      <div className="shell">
        <header className="topbar">
          <div className="wordmark">
            {siteConfig.name} <span>/ {siteConfig.seat.toLowerCase()}</span>
          </div>
          <TopNav />
        </header>

        <div className="doc">
          <Rail />

          <main className="body">
            <div className="open" id="top">
              <h1>
                {opening.headline[0]}
                <em>{opening.headline[1]}</em>
                {opening.headline[2]}
              </h1>
              <p className="lede">{opening.lede}</p>

              <div className="who">
                {opening.who.map((w) => (
                  <dl key={w.dt}>
                    <dt>{w.dt}</dt>
                    <dd>{w.dd}</dd>
                  </dl>
                ))}
              </div>

              <div className="actions">
                <a className="btn fill" href="#systems">
                  Read the systems
                </a>
                <a className="btn" href="#contact">
                  Start a conversation
                </a>
                <a className="btn" href="#record">
                  Full record
                </a>
              </div>

              <div className="figures">
                {figures.map((f) => (
                  <div key={f.src}>
                    <div className="v num">{f.v}</div>
                    <div className="k">{f.k}</div>
                    <div className="src">{f.src}</div>
                  </div>
                ))}
              </div>
            </div>

            <section id="now">
              <div className="head">
                <span className="tag">01</span>
                <h2>What I am on right now</h2>
                <span className="fill-rule" />
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>Seat and remit</th>
                    <th>Since</th>
                    <th>Working in</th>
                  </tr>
                </thead>
                <tbody>
                  {now.map((r) => (
                    <tr key={r.org}>
                      <td className="org">
                        {r.org} {r.mark && <span className="mark">{r.mark}</span>}
                        {r.where && <small>{r.where}</small>}
                      </td>
                      <td>{r.remit}</td>
                      <td className="yr num">{r.since}</td>
                      <td className="stack">{r.stack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section id="systems">
              <div className="head">
                <span className="tag">02</span>
                <h2>Systems, and what happened to them</h2>
                <span className="fill-rule" />
              </div>
              <Systems />
            </section>

            <section id="record">
              <div className="head">
                <span className="tag">03</span>
                <h2>Eight teams, five years</h2>
                <span className="fill-rule" />
              </div>
              <RecordTable />

              <table style={{ marginTop: "2.4rem" }}>
                <thead>
                  <tr>
                    <th>Also</th>
                    <th>What it is</th>
                    <th>Since</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {alsoRecord.map((a) => (
                    <tr key={a.org}>
                      <td className="org">{a.org}</td>
                      <td>{a.what}</td>
                      <td className="yr">{a.since}</td>
                      <td className="stack">{a.stack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section id="practice">
              <div className="head">
                <span className="tag">04</span>
                <h2>How the work actually goes</h2>
                <span className="fill-rule" />
              </div>
              <div className="practice">
                {practice.map((p) => (
                  <article key={p.n}>
                    <span className="n num">{p.n}</span>
                    <h3>{p.h}</h3>
                    <p>{p.p}</p>
                    <ul>
                      {p.li.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section id="toolkit">
              <div className="head">
                <span className="tag">05</span>
                <h2>What I reach for</h2>
                <span className="fill-rule" />
              </div>
              <dl className="kit">
                {toolkit.map((t) => (
                  <div key={t.dt} style={{ display: "contents" }}>
                    <dt>{t.dt}</dt>
                    <dd>
                      {t.dd.map((d, i) => (d.b ? <b key={i}>{d.t}</b> : <span key={i}>{d.t}</span>))}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="contact" style={{ borderBottom: "none" }}>
              <div className="contact">
                <div>
                  <h2>{contact.h}</h2>
                  <p>{contact.p}</p>
                  <ContactActions />
                </div>
                <ul className="links">
                  {contact.links.map((l) => (
                    <li key={l.k}>
                      {l.href.startsWith("/") ? (
                        <Link href={l.href}>
                          <span className="k">{l.k}</span>
                          <span>{l.v}</span>
                        </Link>
                      ) : (
                        <a href={l.href}>
                          <span className="k">{l.k}</span>
                          <span>{l.v}</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <footer>
              <p>
                Written and maintained by <b>{siteConfig.name}</b>.
                <br />
                Every figure on this page comes from work I did, and I will walk you through any of
                them.
              </p>
              <p>
                Set in <b>Bricolage Grotesque</b> and <b>Azeret Mono</b>.
                <br />
                Variant 01, Runbook. &copy; 2026.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
