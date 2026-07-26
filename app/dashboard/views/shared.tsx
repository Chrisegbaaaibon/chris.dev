"use client";

import { useState } from "react";
import type { PublishState } from "@/lib/admin-data";

export const STATE_LABEL: Record<PublishState, string> = {
  live: "Live",
  draft: "Draft",
  todo: "To write",
};

const ORDER: PublishState[] = ["live", "draft", "todo"];

/** Click to cycle live to draft to to-write. */
export function StateChip({
  value,
  onChange,
  label,
}: {
  value: PublishState;
  onChange?: (next: PublishState) => void;
  label?: string;
}) {
  const text = label ?? STATE_LABEL[value];
  if (!onChange) return <span className={`state ${value}`}>{text}</span>;

  return (
    <button
      type="button"
      className={`state ${value}`}
      title="Cycle the publish state"
      onClick={() => onChange(ORDER[(ORDER.indexOf(value) + 1) % ORDER.length])}
    >
      {text}
    </button>
  );
}

export function BlkHead({ title, note }: { title: string; note?: string }) {
  return (
    <div className="blk-head">
      <h2>{title}</h2>
      {note && <span className="m">{note}</span>}
    </div>
  );
}

/** Sample visit series, drawn with divs. Hovering reads the day out below. */
export function Bars({
  data,
  labels,
  caption,
}: {
  data: number[];
  labels: [string, string];
  caption: string;
}) {
  const [at, setAt] = useState<number | null>(null);
  const peak = Math.max(...data);

  return (
    <>
      <div className="bars" onMouseLeave={() => setAt(null)}>
        {data.map((h, i) => (
          <i
            key={i}
            className={h === peak ? "hi" : undefined}
            style={{ height: `${h}%` }}
            onMouseEnter={() => setAt(i)}
          />
        ))}
      </div>
      <div className="bar-key">
        <span>{labels[0]}</span>
        <span>{caption}</span>
        <span>{labels[1]}</span>
      </div>
      <div className="readout num">
        {at === null ? (
          <span>Peak {peak} visits. Hover a bar for a day.</span>
        ) : (
          <span>
            Day {at + 1} of {data.length}, <b>{data[at]} visits</b>
            {data[at] === peak ? ", the peak" : ""}
          </span>
        )}
      </div>
    </>
  );
}
