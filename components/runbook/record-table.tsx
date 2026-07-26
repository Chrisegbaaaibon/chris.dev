"use client";

import { useMemo, useState } from "react";
import { record } from "@/lib/data";

type Col = "org" | "seat" | "start";
type Dir = "asc" | "desc";

const HEADS: { col: Col; label: string }[] = [
  { col: "org", label: "Team" },
  { col: "seat", label: "Seat" },
  { col: "start", label: "Dates" },
];

export function RecordTable() {
  const [sort, setSort] = useState<{ col: Col; dir: Dir } | null>(null);

  const rows = useMemo(() => {
    if (!sort) return record;
    const dir = sort.dir === "asc" ? 1 : -1;
    return [...record].sort((a, b) => String(a[sort.col]).localeCompare(String(b[sort.col])) * dir);
  }, [sort]);

  /** asc, then desc, then back to the order the document was written in. */
  const cycle = (col: Col) =>
    setSort((prev) => {
      if (!prev || prev.col !== col) return { col, dir: "asc" };
      if (prev.dir === "asc") return { col, dir: "desc" };
      return null;
    });

  return (
    <table>
      <thead>
        <tr>
          {HEADS.map((h) => {
            const on = sort?.col === h.col;
            return (
              <th
                key={h.col}
                className="sort"
                aria-sort={on ? (sort!.dir === "asc" ? "ascending" : "descending") : undefined}
              >
                <button type="button" onClick={() => cycle(h.col)}>
                  {h.label}
                  <span className="dir">{on ? (sort!.dir === "asc" ? "▲" : "▼") : "↕"}</span>
                </button>
              </th>
            );
          })}
          <th>Working in</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.org}>
            <td className="org">
              {r.org}
              <small>{r.where}</small>
            </td>
            <td>{r.seat}</td>
            <td className="yr num">{r.dates}</td>
            <td className="stack">{r.stack}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
