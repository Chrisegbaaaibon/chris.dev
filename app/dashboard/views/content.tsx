"use client";

import { useState } from "react";
import { alsoRecord, practice, record, toolkit } from "@/lib/data";
import { useAdmin, uid } from "@/lib/admin-store";
import { BlkHead } from "./shared";

export function ExperienceView() {
  return (
    <>
      <section className="blk">
        <BlkHead title="Experience" note={`${record.length} teams, five years, from the CV`} />
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th className="hide">Seat</th>
              <th>Dates</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {record.map((r) => (
              <tr key={r.org}>
                <td className="t">
                  {r.org}
                  <div className="mm" style={{ fontWeight: 400 }}>
                    {r.where}
                  </div>
                </td>
                <td className="mm hide">{r.seat}</td>
                <td className="mm">{r.dates}</td>
                <td>
                  <span className={r.current ? "state live" : "state draft"}>
                    {r.current ? "Current" : "Past"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="blk" style={{ marginTop: "2rem" }}>
        <BlkHead title="Also on the record" note="side work, open source, education" />
        <table>
          <tbody>
            {alsoRecord.map((a) => (
              <tr key={a.org}>
                <td className="t">{a.org}</td>
                <td>{a.what}</td>
                <td className="mm">{a.since}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export function StackView() {
  const [copied, setCopied] = useState(false);

  const flat = toolkit
    .map((t) => `${t.dt}: ${t.dd.map((d) => d.t).join("")}`)
    .join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(flat);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="blk">
      <BlkHead title="Stack list" note="what renders in section 05 of the public page" />
      <div className="toolbar">
        <span className="spacer" />
        <button className="btn sm" onClick={copy}>
          {copied ? "Copied ✓" : "Copy as plain text"}
        </button>
      </div>
      <table>
        <tbody>
          {toolkit.map((t) => (
            <tr key={t.dt}>
              <td className="t" style={{ width: "9rem" }}>
                {t.dt}
              </td>
              <td>
                {t.dd.map((d, i) => (d.b ? <b key={i}>{d.t}</b> : <span key={i}>{d.t}</span>))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function ServicesView() {
  return (
    <section className="blk">
      <BlkHead title="Services" note="section 04, how the work actually goes" />
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Offer</th>
            <th className="hide">What it covers</th>
          </tr>
        </thead>
        <tbody>
          {practice.map((p) => (
            <tr key={p.n}>
              <td className="mm num">{p.n}</td>
              <td className="t">
                {p.h}
                <div style={{ fontWeight: 400, fontSize: ".8rem", color: "var(--ink-60)" }}>
                  {p.p}
                </div>
              </td>
              <td className="mm hide">{p.li.join(" / ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function NotesView() {
  const { state, add, patch, remove, confirmed } = useAdmin();
  const [draft, setDraft] = useState("");

  const save = () => {
    const text = draft.trim();
    if (!text) return;
    add("notes", {
      id: uid(),
      text,
      when: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    });
    setDraft("");
  };

  return (
    <section className="blk">
      <BlkHead title="Notes" note="open questions about the site, kept in this browser" />

      <div className="editor" style={{ marginBottom: "1rem" }}>
        <div className="field wide">
          <label htmlFor="note">New note</label>
          <textarea
            id="note"
            rows={3}
            value={draft}
            placeholder="Something to settle before this goes live"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) save();
            }}
          />
        </div>
        <div className="editor-acts">
          <span className="m" style={{ fontSize: ".56rem", color: "var(--ink-40)" }}>
            Cmd or Ctrl and Enter to save
          </span>
          <button className="btn sm fill" onClick={save} disabled={!draft.trim()}>
            Add note
          </button>
        </div>
      </div>

      {state.notes.length === 0 ? (
        <div className="empty">No notes.</div>
      ) : (
        <ul className="notes">
          {state.notes.map((n) => (
            <li key={n.id}>
              <div>
                <p>{n.text}</p>
                <div className="when">{n.when}</div>
              </div>
              <div className="row-act">
                <button
                  className="btn sm"
                  onClick={() => {
                    const next = window.prompt("Edit the note", n.text);
                    if (next !== null && next.trim()) patch("notes", n.id, { text: next.trim() });
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn sm danger"
                  onClick={() => {
                    if (confirmed("Delete this note?")) remove("notes", n.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
