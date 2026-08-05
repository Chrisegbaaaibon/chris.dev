import { NextResponse } from "next/server";

export const revalidate = 20;

type LastfmImage = { "#text": string; size: string };
type LastfmTrack = {
  name: string;
  artist: { "#text"?: string; name?: string };
  album?: { "#text"?: string };
  image?: LastfmImage[];
  url: string;
  date?: { uts: string };
  "@attr"?: { nowplaying?: string };
};

export type NowPlayingState = {
  playing: boolean;
  track?: string;
  artist?: string;
  album?: string;
  art?: string | null;
  url?: string;
  playedAt?: number | null;
  recent: { track: string; artist?: string; url?: string; playedAt: number | null }[];
};

export async function GET() {
  const user = process.env.LASTFM_USER;
  const key = process.env.LASTFM_API_KEY;

  if (!user || !key) {
    return NextResponse.json({ playing: false, recent: [] } satisfies NowPlayingState, { status: 200 });
  }

  const url =
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks" +
    `&user=${encodeURIComponent(user)}&api_key=${encodeURIComponent(key)}&format=json&limit=5`;

  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) throw new Error(`lastfm ${res.status}`);
    const json = await res.json();
    const list: LastfmTrack[] = json?.recenttracks?.track ?? [];

    if (!list.length) {
      return NextResponse.json({ playing: false, recent: [] } satisfies NowPlayingState, {
        headers: { "Cache-Control": "public, s-maxage=20, stale-while-revalidate=60" },
      });
    }

    const [t, ...rest] = list;
    const live = Boolean(t["@attr"]?.nowplaying);
    const img = [...(t.image ?? [])].reverse().find((i) => i["#text"]);

    const state: NowPlayingState = {
      playing: live,
      track: t.name,
      artist: t.artist?.["#text"] || t.artist?.name,
      album: t.album?.["#text"],
      art: img ? img["#text"] : null,
      url: t.url,
      playedAt: live ? null : t.date ? Number(t.date.uts) * 1000 : null,
      recent: rest.map((x) => ({
        track: x.name,
        artist: x.artist?.["#text"] || x.artist?.name,
        url: x.url,
        playedAt: x.date ? Number(x.date.uts) * 1000 : null,
      })),
    };

    return NextResponse.json(state, {
      headers: { "Cache-Control": "public, s-maxage=20, stale-while-revalidate=60" },
    });
  } catch {
    return NextResponse.json({ playing: false, recent: [] } satisfies NowPlayingState, { status: 200 });
  }
}
