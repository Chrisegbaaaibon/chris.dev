"use client";

import { useState } from "react";
import { useAdmin, uid } from "@/lib/admin-store";
import type { CaseStudyState, SystemRow } from "@/lib/admin-data";
import { BlkHead, StateChip } from "./shared";

const CASE_STATES: CaseStudyState[] = ["Written", "Outline only", "Not started"];

export function SystemsView() {
  const { state, patch, add, remove, move, confirmed } = useAdmin();
  const [editing, setEditing] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const rows = state.systems.filter((s) =>
    (s.title + " " + s.kind).toLowerCase().includes(q.toLowerCase())
  );

  const addSystem = () => {
    const row: SystemRow = {
      id: uid(),
      title: "Untitled system",
      kind: "",
      caseStudy: "Not started",
      state: "todo",
    };
    add("systems", row);
    setEditing(row.id);
    setQ("");
  };

  const drop = (row: SystemRow) => {
    if (!confirmed(`Delete "${row.title}" from the systems list?`)) return;
    remove("systems", row.id);
  };

  return (
    <section className="blk">
      <BlkHead title="Systems" note="the order here is the order on the public page" />

      <div className="toolbar">
        <input
          type="search"
          placeholder="Filter by title or kind"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <span className="m" style={{ fontSize: ".6rem", color: "var(--ink-40)" }}>
          {rows.length} of {state.systems.length}
        </span>
        <span className="spacer" />
        <button className="btn fill sm" onClick={addSystem}>
          Add a system
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th className="hide">Kind</th>
            <th>Case study</th>
            <th>State</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => {
            const i = state.systems.findIndex((x) => x.id === s.id);
            return (
              <tr key={s.id}>
                <td className="t">{s.title}</td>
                <td className="mm hide">{s.kind || "not set"}</td>
                <td className="mm">
                  <select
                    value={s.caseStudy}
                    aria-label={`Case study state for ${s.title}`}
                    onChange={(e) =>
                      patch("systems", s.id, { caseStudy: e.target.value as CaseStudyState })
                    }
                  >
                    {CASE_STATES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <StateChip
                    value={s.state}
                    onChange={(next) => patch("systems", s.id, { state: next })}
                  />
                </td>
                <td className="row-act">
                  <button
                    className="btn sm"
                    title="Move up"
                    disabled={i === 0 || q !== ""}
                    onClick={() => move("systems", s.id, -1)}
                  >
                    ↑
                  </button>
                  <button
                    className="btn sm"
                    title="Move down"
                    disabled={i === state.systems.length - 1 || q !== ""}
                    onClick={() => move("systems", s.id, 1)}
                  >
                    ↓
                  </button>
                  <button
                    className="btn sm"
                    onClick={() => setEditing(editing === s.id ? null : s.id)}
                  >
                    {editing === s.id ? "Close" : "Edit"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {rows.length === 0 && <div className="empty">Nothing matches &quot;{q}&quot;.</div>}

      {editing &&
        (() => {
          const s = state.systems.find((x) => x.id === editing);
          if (!s) return null;
          return (
            <div className="editor">
              <div className="field wide">
                <label htmlFor="sys-title">Title</label>
                <input
                  id="sys-title"
                  type="text"
                  value={s.title}
                  onChange={(e) => patch("systems", s.id, { title: e.target.value })}
                />
              </div>
              <div className="field wide">
                <label htmlFor="sys-kind">Kind</label>
                <input
                  id="sys-kind"
                  type="text"
                  value={s.kind}
                  placeholder="Fintech, DevOps, Open source"
                  onChange={(e) => patch("systems", s.id, { kind: e.target.value })}
                />
              </div>
              <div className="editor-acts">
                <button className="btn sm danger" onClick={() => drop(s)}>
                  Delete
                </button>
                <button className="btn sm" onClick={() => setEditing(null)}>
                  Done
                </button>
              </div>
            </div>
          );
        })()}
    </section>
  );
}
