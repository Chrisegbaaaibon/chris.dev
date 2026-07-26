"use client";

import { useMemo, useState } from "react";
import { systems, type System } from "@/lib/data";

function Outcome({ parts }: { parts: NonNullable<System["outcome"]> }) {
  return (
    <div className="outcome">
      {parts.map((p, i) => (p.marks.length ? <b key={i}>{p.text}</b> : <span key={i}>{p.text}</span>))}
    </div>
  );
}

export function Systems() {
  const [tag, setTag] = useState<string | null>(null);

  // The number is the entry's place in the document, so it survives filtering.
  const numbered = useMemo(
    () => systems.map((s, i) => ({ ...s, idx: String(i + 1).padStart(2, "0") })),
    []
  );

  const shown = useMemo(
    () => (tag ? numbered.filter((s) => s.chips.includes(tag)) : numbered),
    [tag, numbered]
  );

  return (
    <>
      {tag && (
        <div className="filter">
          <span className="lbl">Filtered by</span>
          <div className="chips" style={{ marginTop: 0 }}>
            <button type="button" aria-pressed="true" onClick={() => setTag(null)}>
              {tag}
            </button>
          </div>
          <button type="button" className="clear" onClick={() => setTag(null)}>
            clear
          </button>
          <span className="count num">
            {shown.length} of {systems.length}
          </span>
        </div>
      )}

      {shown.map((s) => (
        <article className="sys" key={s.id}>
          <div className="sys-row">
            <div className="idx num">{s.idx}</div>
            <div>
              <h3>
                {s.title} <span className="kind">{s.kind}</span>
              </h3>
              <p>{s.body}</p>

              {s.spec && (
                <div className="spec">
                  {s.spec.map((sp) => (
                    <div key={sp.b}>
                      <b>{sp.b}</b> {sp.t}
                    </div>
                  ))}
                </div>
              )}

              {s.outcome && <Outcome parts={s.outcome} />}

              <div className="chips">
                {s.chips.map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={tag === c}
                    title={tag === c ? `Clear the ${c} filter` : `Show only systems using ${c}`}
                    onClick={() => setTag(tag === c ? null : c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="meta">
              <b>{s.role}</b>
              {s.when}
            </div>
          </div>
        </article>
      ))}

      {shown.length === 0 && (
        <div className="empty">Nothing here uses {tag}. Clear the filter to see all eight.</div>
      )}
    </>
  );
}
