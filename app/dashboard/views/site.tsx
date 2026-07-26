"use client";

import { useState } from "react";
import {
  deploys,
  pageRank,
  visitLabels,
  visits14,
  visits30,
  type Settings,
} from "@/lib/admin-data";
import { useAdmin, uid } from "@/lib/admin-store";
import { Bars, BlkHead } from "./shared";

export function TrafficView() {
  const [range, setRange] = useState<14 | 30>(14);
  const data = range === 14 ? visits14 : visits30;

  return (
    <>
      <section className="blk">
        <BlkHead title="Visits" note={`last ${range} days, sample`} />
        <div className="toolbar">
          <div className="tabs" role="tablist">
            {([14, 30] as const).map((r) => (
              <button key={r} role="tab" aria-selected={range === r} onClick={() => setRange(r)}>
                {r} days
              </button>
            ))}
          </div>
          <span className="spacer" />
          <span className="m" style={{ fontSize: ".6rem", color: "var(--ink-40)" }}>
            total {data.reduce((a, b) => a + b, 0)}
          </span>
        </div>
        <Bars
          data={data}
          labels={visitLabels[range] as [string, string]}
          caption="peak: CV shared in a group chat"
        />
      </section>

      <section className="blk" style={{ marginTop: "2rem" }}>
        <BlkHead title="Pages" note="most read first" />
        <ul className="pagelist">
          {pageRank.map((p) => (
            <li key={p.page}>
              <span>{p.page}</span>
              <span className="m">{p.note}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function RedirectsView() {
  const { state, patch, add, remove, confirmed } = useAdmin();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const create = () => {
    if (!from.trim() || !to.trim()) return;
    add("redirects", {
      id: uid(),
      from: from.trim().startsWith("/") ? from.trim() : `/${from.trim()}`,
      to: to.trim(),
      hits: 0,
      on: true,
    });
    setFrom("");
    setTo("");
  };

  return (
    <section className="blk">
      <BlkHead title="Redirects" note="old routes from the previous site, kept alive" />

      <table>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th className="hide">Hits</th>
            <th>State</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {state.redirects.map((r) => (
            <tr key={r.id}>
              <td className="mm">{r.from}</td>
              <td className="mm">{r.to}</td>
              <td className="mm hide num">{r.hits}</td>
              <td>
                <button
                  className={r.on ? "state live" : "state todo"}
                  onClick={() => patch("redirects", r.id, { on: !r.on })}
                >
                  {r.on ? "On" : "Off"}
                </button>
              </td>
              <td className="row-act">
                <button
                  className="btn sm danger"
                  onClick={() => {
                    if (confirmed(`Delete the redirect from ${r.from}?`)) remove("redirects", r.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="editor">
        <div className="field">
          <label htmlFor="rd-from">From</label>
          <input
            id="rd-from"
            type="text"
            value={from}
            placeholder="/old-path"
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="rd-to">To</label>
          <input
            id="rd-to"
            type="text"
            value={to}
            placeholder="/#systems"
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div className="editor-acts">
          <button className="btn sm fill" onClick={create} disabled={!from.trim() || !to.trim()}>
            Add redirect
          </button>
        </div>
      </div>
    </section>
  );
}

export function DeploysView() {
  return (
    <section className="blk">
      <BlkHead title="Deploys" note="main branch, sample data" />
      <table>
        <thead>
          <tr>
            <th>When</th>
            <th>What shipped</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {deploys.map((d) => (
            <tr key={d.when}>
              <td className="mm">{d.when}</td>
              <td>{d.what}</td>
              <td>
                <span className={`state ${d.cls}`}>{d.state}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

const SETTINGS: { key: keyof Settings; h: string; p: string }[] = [
  {
      key: "markReadOnOpen",
      h: "Mark enquiries read when opened",
      p: "Opening a letter in the inbox moves it out of the unread count straight away.",
    },
    {
      key: "confirmDestructive",
      h: "Confirm before deleting",
      p: "Ask first when removing a system, a case study, a note or a redirect.",
    },
    {
      key: "showArchived",
      h: "Count archived enquiries",
      p: "Include archived letters in the sidebar count instead of hiding them.",
    },
    {
      key: "sampleData",
      h: "Label sample data",
      p: "Keep the sample data notes visible on visits, deploys and the inbox.",
    },
  ];

export function SettingsView() {
  const { state, set, reset } = useAdmin();

  return (
    <section className="blk">
      <BlkHead title="Settings" note="stored in this browser only" />

      {SETTINGS.map((s) => {
        const on = state.settings[s.key];
        return (
          <div className="setting" key={s.key}>
            <div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </div>
            <button
              className="switch"
              role="switch"
              aria-checked={on}
              aria-label={s.h}
              onClick={() => set("settings", { ...state.settings, [s.key]: !on })}
            />
          </div>
        );
      })}

      <div className="setting">
        <div>
          <h3>Reset the dashboard</h3>
          <p>
            Put every list back to the values it shipped with. This clears anything edited here, and
            it does not touch the public page.
          </p>
        </div>
        <button
          className="btn sm danger"
          onClick={() => {
            if (window.confirm("Reset every list back to the shipped values?")) reset();
          }}
        >
          Reset
        </button>
      </div>

      <p className="m" style={{ fontSize: ".6rem", color: "var(--ink-40)", marginTop: "1rem" }}>
        Edits persist to localStorage under runbook.admin.v1.
      </p>
    </section>
  );
}
