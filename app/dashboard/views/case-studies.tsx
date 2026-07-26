"use client";

import { useEffect, useState } from "react";
import { useAdmin, uid } from "@/lib/admin-store";
import type { CaseStudy } from "@/lib/admin-data";
import { BlkHead, StateChip } from "./shared";

export function CaseStudiesView({ openId }: { openId?: string | null }) {
  const { state, patch, add, remove, confirmed } = useAdmin();
  const [editing, setEditing] = useState<string | null>(null);

  // Arriving from the "New case study" button in the top bar opens its editor.
  useEffect(() => {
    if (openId) setEditing(openId);
  }, [openId]);

  const create = () => {
    const cs: CaseStudy = {
      id: uid(),
      title: "Untitled case study",
      system: state.systems[0]?.title ?? "",
      status: "todo",
      words: 0,
      note: "",
    };
    add("caseStudies", cs);
    setEditing(cs.id);
  };

  const drop = (cs: CaseStudy) => {
    if (!confirmed(`Delete the case study "${cs.title}"?`)) return;
    remove("caseStudies", cs.id);
    if (editing === cs.id) setEditing(null);
  };

  const missing = state.systems.filter((s) => s.caseStudy === "Not started");

  return (
    <>
      <section className="blk">
        <BlkHead title="Case studies" note="long-form writing, one per system" />

        <div className="toolbar">
          <span className="m" style={{ fontSize: ".6rem", color: "var(--ink-40)" }}>
            {state.caseStudies.length} in progress
          </span>
          <span className="spacer" />
          <button className="btn fill sm" onClick={create}>
            New case study
          </button>
        </div>

        {state.caseStudies.length === 0 ? (
          <div className="empty">
            None yet. The systems entries are carrying the weight on their own.
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th className="hide">System</th>
                <th>Words</th>
                <th>State</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {state.caseStudies.map((cs) => (
                <tr key={cs.id}>
                  <td className="t">{cs.title}</td>
                  <td className="mm hide">{cs.system}</td>
                  <td className="mm num">{cs.words}</td>
                  <td>
                    <StateChip
                      value={cs.status}
                      onChange={(next) => patch("caseStudies", cs.id, { status: next })}
                    />
                  </td>
                  <td className="row-act">
                    <button
                      className="btn sm"
                      onClick={() => setEditing(editing === cs.id ? null : cs.id)}
                    >
                      {editing === cs.id ? "Close" : "Edit"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {editing &&
          (() => {
            const cs = state.caseStudies.find((x) => x.id === editing);
            if (!cs) return null;
            return (
              <div className="editor">
                <div className="field wide">
                  <label htmlFor="cs-title">Title</label>
                  <input
                    id="cs-title"
                    type="text"
                    value={cs.title}
                    onChange={(e) => patch("caseStudies", cs.id, { title: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="cs-system">System</label>
                  <select
                    id="cs-system"
                    value={cs.system}
                    onChange={(e) => patch("caseStudies", cs.id, { system: e.target.value })}
                  >
                    {state.systems.map((s) => (
                      <option key={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="cs-words">Words drafted</label>
                  <input
                    id="cs-words"
                    type="text"
                    inputMode="numeric"
                    value={cs.words}
                    onChange={(e) =>
                      patch("caseStudies", cs.id, {
                        words: Number(e.target.value.replace(/\D/g, "")) || 0,
                      })
                    }
                  />
                </div>
                <div className="field wide">
                  <label htmlFor="cs-note">Note to self</label>
                  <textarea
                    id="cs-note"
                    rows={3}
                    value={cs.note}
                    onChange={(e) => patch("caseStudies", cs.id, { note: e.target.value })}
                  />
                </div>
                <div className="editor-acts">
                  <button className="btn sm danger" onClick={() => drop(cs)}>
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

      <section className="blk" style={{ marginTop: "2rem" }}>
        <BlkHead title="Still to write" note={`${missing.length} systems with nothing behind them`} />
        {missing.length === 0 ? (
          <div className="empty">Every system has something written against it.</div>
        ) : (
          <ul className="pagelist">
            {missing.map((s) => (
              <li key={s.id}>
                <span>{s.title}</span>
                <span className="m">{s.kind || "kind not set"}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
