"use client";

import { useEffect, useRef, useState } from "react";
import type { NowPlayingState } from "@/app/api/now-playing/route";

const POLL_MS = 30000;

function ago(ts: number | null | undefined) {
  if (!ts) return "";
  const d = Math.floor((Date.now() - ts) / 1000);
  if (d < 90) return "just now";
  if (d < 3600) return `${Math.round(d / 60)} min ago`;
  if (d < 7200) return "an hour ago";
  if (d < 86400) return `${Math.round(d / 3600)} hours ago`;
  if (d < 172800) return "yesterday";
  const dt = new Date(ts);
  return `${dt.getDate()} ${dt.toLocaleString("en-GB", { month: "short" })}`;
}

function Meter() {
  return (
    <span className="np-meter" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

export function NowPlaying() {
  const [state, setState] = useState<NowPlayingState | null>(null);
  const gen = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function pull() {
      const mine = ++gen.current;
      try {
        const res = await fetch("/api/now-playing");
        const next: NowPlayingState = await res.json();
        if (cancelled || mine !== gen.current) return;
        setState(next);
      } catch {
        // A dead API should leave no trace on the page.
      }
    }

    pull();
    const timer = setInterval(pull, POLL_MS);
    const onVisible = () => {
      if (!document.hidden) pull();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  if (!state?.track) return null;

  const title = state.url ? (
    <a href={state.url} target="_blank" rel="noopener noreferrer" className="np-title">
      {state.track}
    </a>
  ) : (
    <div className="np-title">{state.track}</div>
  );

  return (
    <div className="np-rail">
      <div className="np-head">
        {state.playing ? (
          <>
            <span className="np-lbl on">Now playing</span>
            <Meter />
          </>
        ) : (
          <span className="np-lbl">Last played</span>
        )}
      </div>
      {title}
      <div className="np-artist">{state.artist}</div>
      <div className="np-when">{state.playing ? "on repeat, probably" : ago(state.playedAt)}</div>
    </div>
  );
}
