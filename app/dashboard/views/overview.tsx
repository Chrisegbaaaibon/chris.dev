"use client";

import { deploys, pageRank, visits14, visitLabels } from "@/lib/admin-data";
import { record } from "@/lib/data";
import { useAdmin } from "@/lib/admin-store";
import { Bars, BlkHead, StateChip } from "./shared";
import type { ViewId } from "../views";

export function Overview({ go }: { go: (v: ViewId) => void }) {
  const { state, patch, set } = useAdmin();
  const { systems, caseStudies, enquiries, tasks, noticeResolved } = state;

  const open = enquiries.filter((e) => !e.archived);
  const unread = open.filter((e) => !e.read).length;
  // An outline is not a case study, so anything short of written still counts.
  const needCaseStudy = systems.filter((s) => s.caseStudy !== "Written").length;
  const current = record.filter((r) => r.current).length;

  /** The counter bug is fixed in this build: the figures are fixed values, not animated. */
  const resolveNotice = () => {
    set("noticeResolved", true);
    const counterTask = tasks.find((t) => t.text.toLowerCase().includes("counter"));
    if (counterTask && !counterTask.done) patch("tasks", counterTask.id, { done: true });
  };

  return (
    <>
      {noticeResolved ? (
        <div className="notice done">
          <span>
            <b>Homepage counters fixed.</b> The four figures render as fixed values in the markup
            now, so there is no scroll trigger left to miss. Nothing to do here.
          </span>
          <button className="btn sm" onClick={() => set("noticeResolved", false)}>
            Reopen
          </button>
        </div>
      ) : (
        <div className="notice">
          <span>
            <b>Homepage counters are rendering zero.</b> The scroll-triggered animation never fires,
            so all four stats read &quot;0+&quot; on the live site. Set them to fixed values or fix
            the trigger.
          </span>
          <button className="btn sm" onClick={resolveNotice}>
            Open the fix
          </button>
        </div>
      )}

      <div className="counts">
        <div>
          <div className="v num">5</div>
          <div className="k">Years in production</div>
          <div className="d">since Oct 2021, Frolancer onward</div>
        </div>
        <div>
          <div className="v num">{record.length}</div>
          <div className="k">Teams shipped with</div>
          <div className="d">{current} of them current</div>
        </div>
        <div>
          <div className="v num">{systems.length}</div>
          <div className="k">Systems published</div>
          <div className="d">{needCaseStudy} need a case study</div>
        </div>
        <div>
          <div className="v num">{open.length}</div>
          <div className="k">Open enquiries</div>
          <div className={unread ? "d up" : "d"}>{unread} unread</div>
        </div>
      </div>

      <div className="cols">
        <div>
          <section className="blk">
            <BlkHead
              title="Systems"
              note={`${systems.length} entries, ordered as they appear on the site`}
            />
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
                {systems.map((s) => (
                  <tr key={s.id}>
                    <td className="t">{s.title}</td>
                    <td className="mm hide">{s.kind}</td>
                    <td className="mm">{s.caseStudy}</td>
                    <td>
                      <StateChip
                        value={s.state}
                        onChange={(next) => patch("systems", s.id, { state: next })}
                      />
                    </td>
                    <td className="row-act">
                      <button className="btn sm" onClick={() => go("systems")}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="blk" style={{ marginTop: "2rem" }}>
            <BlkHead title="Enquiries" note="sample data" />
            <ul className="inbox">
              {open.slice(0, 4).map((e) => (
                <li key={e.id} className={e.read ? undefined : "unread"}>
                  <span className="who">{e.initials}</span>
                  <div>
                    <button className="open-row" onClick={() => go("enquiries")}>
                      <h3>
                        {e.subject} <time>{e.when}</time>
                      </h3>
                      <p>{e.body}</p>
                    </button>
                    <div className="tags">
                      {e.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div>
          <section className="blk">
            <BlkHead title="On the desk" note="this week" />
            <ul className="queue">
              {tasks.map((t) => (
                <li key={t.id} className={t.done ? "done" : undefined}>
                  <button
                    className={t.done ? "box done" : "box"}
                    aria-label={t.done ? `Reopen: ${t.text}` : `Complete: ${t.text}`}
                    aria-pressed={t.done}
                    onClick={() => patch("tasks", t.id, { done: !t.done })}
                  />
                  <span>{t.text}</span>
                  <span className="m">{t.area}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="blk" style={{ marginTop: "2rem" }}>
            <BlkHead title="Visits" note="last 14 days, sample" />
            <Bars
              data={visits14}
              labels={visitLabels[14] as [string, string]}
              caption="peak: CV shared in a group chat"
            />
            <ul className="pagelist">
              {pageRank.map((p) => (
                <li key={p.page}>
                  <span>{p.page}</span>
                  <span className="m">{p.note}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="blk" style={{ marginTop: "2rem" }}>
            <BlkHead title="Deploys" note="main branch" />
            <table>
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
        </div>
      </div>
    </>
  );
}
