"use client";

import { useMemo, useState } from "react";
import { useAdmin } from "@/lib/admin-store";
import { BlkHead } from "./shared";

type Filter = "open" | "unread" | "archived";

export function EnquiriesView() {
  const { state, patch, remove, confirmed } = useAdmin();
  const [filter, setFilter] = useState<Filter>("open");
  const [tag, setTag] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const tags = useMemo(
    () => Array.from(new Set(state.enquiries.flatMap((e) => e.tags))).sort(),
    [state.enquiries]
  );

  const rows = state.enquiries.filter((e) => {
    if (filter === "archived" && !e.archived) return false;
    if (filter !== "archived" && e.archived) return false;
    if (filter === "unread" && e.read) return false;
    if (tag && !e.tags.includes(tag)) return false;
    return true;
  });

  const counts = {
    open: state.enquiries.filter((e) => !e.archived).length,
    unread: state.enquiries.filter((e) => !e.archived && !e.read).length,
    archived: state.enquiries.filter((e) => e.archived).length,
  };

  const openRow = (id: string, read: boolean) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    if (next && !read && state.settings.markReadOnOpen) patch("enquiries", id, { read: true });
  };

  return (
    <section className="blk">
      <BlkHead title="Enquiries" note="sample data, nothing here is a real person" />

      <div className="toolbar">
        <div className="tabs" role="tablist">
          {(["open", "unread", "archived"] as Filter[]).map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
            >
              {f} {counts[f]}
            </button>
          ))}
        </div>
        <span className="spacer" />
        <div className="tabs">
          {tags.map((t) => (
            <button key={t} aria-pressed={tag === t} onClick={() => setTag(tag === t ? null : t)}>
              {t}
            </button>
          ))}
          {tag && <button onClick={() => setTag(null)}>clear</button>}
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="empty">Nothing in this pile.</div>
      ) : (
        <ul className="inbox">
          {rows.map((e) => (
            <li key={e.id} className={e.read ? undefined : "unread"}>
              <span className="who">{e.initials}</span>
              <div>
                <button
                  className="open-row"
                  aria-expanded={openId === e.id}
                  onClick={() => openRow(e.id, e.read)}
                >
                  <h3>
                    {e.subject} <time>{e.when}</time>
                  </h3>
                  <p className={openId === e.id ? "full" : undefined}>{e.body}</p>
                </button>

                <div className="tags">
                  {e.tags.map((t) => (
                    <button
                      key={t}
                      aria-pressed={tag === t}
                      onClick={() => setTag(tag === t ? null : t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {openId === e.id && (
                  <div className="acts">
                    <a
                      className="btn sm fill"
                      href={`mailto:${e.email}?subject=${encodeURIComponent("Re: " + e.subject)}`}
                    >
                      Reply
                    </a>
                    <button
                      className="btn sm"
                      onClick={() => patch("enquiries", e.id, { read: !e.read })}
                    >
                      Mark {e.read ? "unread" : "read"}
                    </button>
                    <button
                      className="btn sm"
                      onClick={() => patch("enquiries", e.id, { archived: !e.archived })}
                    >
                      {e.archived ? "Restore" : "Archive"}
                    </button>
                    <button
                      className="btn sm danger"
                      onClick={() => {
                        if (confirmed(`Delete the enquiry from ${e.initials}?`))
                          remove("enquiries", e.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
