import { NextResponse } from "next/server";

/**
 * Spotify, via a long-lived refresh token. Needs SPOTIFY_CLIENT_ID,
 * SPOTIFY_CLIENT_SECRET and SPOTIFY_REFRESH_TOKEN; the token must carry the
 * user-read-currently-playing and user-read-recently-played scopes.
 */
export const revalidate = 20;

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const PLAYER_URL = "https://api.spotify.com/v1/me/player";

type SpotifyTrack = {
  name: string;
  artists: { name: string }[];
  album?: { name: string; images?: { url: string }[] };
  external_urls?: { spotify?: string };
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

const EMPTY: NowPlayingState = { playing: false, recent: [] };
const CACHE = { "Cache-Control": "public, s-maxage=20, stale-while-revalidate=60" };

const artists = (t: SpotifyTrack) => t.artists.map((a) => a.name).join(", ");

async function accessToken(id: string, secret: string, refresh: string) {
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
    // Access tokens last an hour; reuse one for 50 minutes rather than minting per request.
    next: { revalidate: 3000 },
  });
  if (!res.ok) throw new Error(`spotify token ${res.status}`);
  return (await res.json()).access_token as string;
}

export async function GET() {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!id || !secret || !refresh) return NextResponse.json(EMPTY);

  try {
    const auth = { Authorization: `Bearer ${await accessToken(id, secret, refresh)}` };
    const get = (path: string) => fetch(PLAYER_URL + path, { headers: auth, next: { revalidate } });

    const [nowRes, recentRes] = await Promise.all([
      get("/currently-playing"),
      get("/recently-played?limit=5"),
    ]);
    if (!recentRes.ok) throw new Error(`spotify recent ${recentRes.status}`);

    // 204 means nothing is playing. `item` is null for ads, and podcasts have no artists.
    const now = nowRes.status === 200 ? await nowRes.json() : null;
    const live: SpotifyTrack | null = now?.is_playing && now.item?.artists ? now.item : null;

    const history: { track: SpotifyTrack; played_at: string }[] = (await recentRes.json()).items ?? [];
    const recent = history.map((h) => ({
      track: h.track.name,
      artist: artists(h.track),
      url: h.track.external_urls?.spotify,
      playedAt: Date.parse(h.played_at),
    }));

    const t = live ?? history[0]?.track;
    if (!t) return NextResponse.json(EMPTY, { headers: CACHE });

    const state: NowPlayingState = {
      playing: Boolean(live),
      track: t.name,
      artist: artists(t),
      album: t.album?.name,
      art: t.album?.images?.[0]?.url ?? null,
      url: t.external_urls?.spotify,
      playedAt: live ? null : recent[0].playedAt,
      recent: live ? recent : recent.slice(1),
    };
    return NextResponse.json(state, { headers: CACHE });
  } catch {
    // A dead or unauthorised Spotify should leave no trace on the page.
    return NextResponse.json(EMPTY);
  }
}
