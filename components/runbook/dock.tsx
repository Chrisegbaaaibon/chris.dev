"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type TargetAndTransition,
} from "framer-motion";
import { Github } from "lucide-react";
import { siteConfig } from "@/lib/data";

/** Section ids in page order, for the active dot. */
const SECTIONS = ["top", "work", "experience", "bio", "connect"];

type Pos = "top" | "right" | "bottom" | "left";
const POSITIONS: Pos[] = ["top", "right", "bottom", "left"];
const POS_KEY = "dock-position";

const MAGNIFY = { range: 150, base: 40, max: 80, icon: 20, iconMax: 40 };
const MAGNIFY_SPRING = { mass: 0.1, stiffness: 150, damping: 12 };
const MOVE_SPRING = { stiffness: 240, damping: 16, mass: 0.4 };
/** Drag feels held back until it passes this many px, then follows the pointer. */
const DRAG_TRIGGER = 10;

let audio: AudioContext | undefined;

/** One mechanical tick: a few milliseconds of filtered noise, gone almost as it starts. */
function tick(ctx: AudioContext, at: number, level: number, hz: number) {
  const length = Math.round(ctx.sampleRate * 0.012);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  const decay = ctx.sampleRate * 0.002;
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / decay);
  const src = ctx.createBufferSource();
  const band = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  src.buffer = buffer;
  band.type = "bandpass";
  band.frequency.value = hz;
  band.Q.value = 0.7;
  gain.gain.value = level;
  src.connect(band).connect(gain).connect(ctx.destination);
  src.start(at);
}

/**
 * A small tap you can feel. Android has the Vibration API; iOS Safari does not,
 * but flipping a native switch control ticks the Taptic Engine, so one is
 * created, toggled and thrown away. Everywhere else this does nothing.
 */
function haptic(ms: number) {
  try {
    if (navigator.vibrate) {
      navigator.vibrate(ms);
      return;
    }
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.setAttribute("switch", "");
    label.style.display = "none";
    label.appendChild(input);
    document.head.appendChild(label);
    label.click();
    label.remove();
  } catch {
    // No haptics on this device.
  }
}

/**
 * Synthesized UI sounds, so there are no audio files to ship. A link is a
 * press-and-release double tick; the theme is a single snap like a light
 * switch, brighter going on and duller going off.
 */
function blip(kind: "click" | "on" | "off") {
  // Felt as well as heard: a light tap for links, a firmer one for the theme switch.
  haptic(kind === "click" ? 8 : 16);
  try {
    audio ??= new AudioContext();
    const t = audio.currentTime;
    if (kind === "click") {
      tick(audio, t, 0.5, 4500);
      tick(audio, t + 0.025, 0.9, 5500);
    } else if (kind === "on") {
      tick(audio, t, 0.7, 7000);
    } else {
      tick(audio, t, 1, 3700);
    }
  } catch {
    // No audio available: the dock simply stays silent.
  }
}

function toggleTheme() {
  const el = document.documentElement;
  const dark = el.dataset.theme
    ? el.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = dark ? "light" : "dark";
  el.dataset.theme = next;
  blip(next === "light" ? "on" : "off");
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Private mode: the choice just lasts for this page view.
  }
}

/* ---------- icons: two tones, .a is the lighter plate, .b the darker detail ---------- */

/** The part of an icon that moves when its button is hovered. */
function A({ to, children }: { to: TargetAndTransition; children: ReactNode }) {
  return (
    <motion.g
      variants={{ hover: to }}
      transition={{ type: "spring", stiffness: 300, damping: 14 }}
      style={{ transformBox: "fill-box", originX: "50%", originY: "50%" }}
    >
      {children}
    </motion.g>
  );
}

const line = { className: "bs", strokeWidth: 1.67, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;

const icons = {
  home: (
    <>
      <path className="a" d="M4 9.5h12V16a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 16z" />
      <rect className="b" x="8.25" y="12" width="3.5" height="5.5" rx=".8" />
      <A to={{ y: -1.5 }}>
        <path {...line} d="M2.5 10 10 3.2 17.5 10" />
      </A>
    </>
  ),
  work: (
    <>
      <A to={{ y: -1.5 }}>
        <path {...line} d="M7.5 6.5V5a1.25 1.25 0 0 1 1.25-1.25h2.5A1.25 1.25 0 0 1 12.5 5v1.5" />
      </A>
      <rect className="a" x="2.5" y="6.5" width="15" height="10.5" rx="2" />
      <rect className="b" x="2.5" y="10" width="15" height="1.67" />
      <rect className="b" x="8.75" y="9.4" width="2.5" height="2.9" rx=".6" />
    </>
  ),
  experience: (
    <>
      <rect className="a" x="4" y="2.5" width="12" height="15" rx="1.67" />
      <rect className="b" x="8.5" y="13" width="3" height="4.5" rx=".6" />
      <A to={{ opacity: 0.35 }}>
        <path {...line} d="M7.5 6h1M11.5 6h1M7.5 9.5h1M11.5 9.5h1" />
      </A>
    </>
  ),
  bio: (
    <>
      <circle className="a" cx="10" cy="10" r="8.33" />
      <A to={{ y: -1 }}>
        <circle className="b" cx="10" cy="7.8" r="2.9" />
      </A>
      <path className="b" d="M4.6 15.6a5.6 5.6 0 0 1 10.8 0A8.3 8.3 0 0 1 10 18.33a8.3 8.3 0 0 1-5.4-2.73z" />
    </>
  ),
  connect: (
    <>
      <path
        className="a"
        d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v6a2.5 2.5 0 0 1-2.5 2.5H9l-3.6 3v-3A2.5 2.5 0 0 1 3 11.5z"
      />
      <A to={{ y: -1.5 }}>
        <circle className="b" cx="7" cy="8.5" r="1" />
        <circle className="b" cx="10" cy="8.5" r="1" />
        <circle className="b" cx="13" cy="8.5" r="1" />
      </A>
    </>
  ),
  linkedin: (
    <>
      <rect className="a" x="1.67" y="1.67" width="16.67" height="16.67" rx="3" />
      <rect className="b" x="4.6" y="8" width="2.2" height="7" />
      <circle className="b" cx="5.7" cy="5.4" r="1.3" />
      <path
        className="b"
        d="M8.6 8h2.1v1c.5-.8 1.3-1.2 2.4-1.2 1.9 0 2.6 1.2 2.6 3.2V15h-2.2v-3.6c0-.9-.3-1.5-1.2-1.5-1 0-1.5.7-1.5 1.7V15H8.6z"
      />
    </>
  ),
  github: (
    <>
      <circle className="a" cx="10" cy="10" r="8.33" />
      <Github x={4.5} y={4.5} width={11} height={11} className="bs" strokeWidth={2.4} />
    </>
  ),
  mail: (
    <>
      <rect className="a" x="1.67" y="4" width="16.67" height="12" rx="2" />
      <A to={{ y: 1 }}>
        <path {...line} d="M2.5 6.2 10 11l7.5-4.8" />
      </A>
    </>
  ),
  // Sun shows in dark mode, moon in light: the icon is where the click takes you.
  theme: (
    <>
      <g className="i-sun">
        <circle className="b" cx="10" cy="10" r="3.6" />
        <A to={{ rotate: 45 }}>
          <path {...line} d="M10 1.9v1.7M10 16.4v1.7M1.9 10h1.7M16.4 10h1.7M4.3 4.3l1.2 1.2M14.5 14.5l1.2 1.2M4.3 15.7l1.2-1.2M14.5 5.5l1.2-1.2" />
        </A>
      </g>
      <g className="i-moon">
        <A to={{ rotate: -20 }}>
          <path className="b" d="M16.5 11.6A7 7 0 1 1 8.4 3.5a5.5 5.5 0 0 0 8.1 8.1z" />
        </A>
      </g>
    </>
  ),
};

/* ---------- one button ---------- */

function Item({
  pointer,
  vertical,
  label,
  k,
  href,
  onClick,
  active,
  children,
}: {
  pointer: MotionValue<number>;
  vertical: boolean;
  label: string;
  k: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const jump = useAnimationControls();
  // Distance from the pointer to this button's centre drives its size.
  const distance = useTransform(pointer, (p) => {
    const b = ref.current?.getBoundingClientRect();
    if (!b) return Infinity;
    return vertical ? p - b.top - b.height / 2 : p - b.left - b.width / 2;
  });
  const { range, base, max, icon, iconMax } = MAGNIFY;
  const size = useSpring(useTransform(distance, [-range, 0, range], [base, max, base]), MAGNIFY_SPRING);
  const glyph = useSpring(useTransform(distance, [-range, 0, range], [icon, iconMax, icon]), MAGNIFY_SPRING);

  const inner = (
    <motion.span
      ref={ref}
      className="dock-icon"
      style={{ width: size, height: size }}
      animate={jump}
      whileHover="hover"
      // Touch has no hover to magnify, so a tap gets a little hop instead.
      onTap={(e) => {
        if ((e as PointerEvent).pointerType === "mouse") return;
        jump.start({
          y: [0, -20, 0, -4, 0],
          transition: { duration: 0.6, times: [0, 0.4, 0.68, 0.84, 1], ease: ["easeOut", "easeIn", "easeOut", "easeIn"] },
        });
      }}
    >
      <motion.span className="dock-glyph" style={{ width: glyph, height: glyph }}>
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {children}
        </svg>
      </motion.span>
      {active && <span className="dock-dot" />}
      <span className="dock-tip" aria-hidden="true">
        {label}
        <kbd>{k}</kbd>
      </span>
    </motion.span>
  );

  const external = href?.startsWith("http");
  return href ? (
    <a
      href={href}
      aria-label={label}
      data-key={k}
      draggable={false}
      onClick={() => blip("click")}
      aria-current={active ? "true" : undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  ) : (
    <button type="button" aria-label={label} data-key={k} onClick={onClick}>
      {inner}
    </button>
  );
}

/* ---------- the dock ---------- */

const centre = (b: DOMRect) => ({ x: b.left + b.width / 2, y: b.top + b.height / 2 });

export function Dock() {
  // null until mounted: the saved edge lives in localStorage, which the server cannot see.
  const [pos, setPos] = useState<Pos | null>(null);
  const [active, setActive] = useState("top");
  const nav = useRef<HTMLElement>(null);
  const pointer = useMotionValue(Infinity);
  const x = useSpring(0, MOVE_SPRING);
  const y = useSpring(0, MOVE_SPRING);
  const dragging = useRef(false);
  const far = useRef(false);
  /** Where the dock was when it was thrown, so it can fly from there to its new edge. */
  const thrownFrom = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(POS_KEY);
    } catch {}
    setPos(POSITIONS.includes(saved as Pos) ? (saved as Pos) : "bottom");

    const spy = () => {
      // At the very bottom the last section wins, even if it is too short to reach the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        return setActive(SECTIONS[SECTIONS.length - 1]);
      }
      const mark = window.innerHeight * 0.4;
      let current = SECTIONS[0];
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mark) current = id;
      }
      setActive(current);
    };
    const keys = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if ((e.target as HTMLElement).closest("input,textarea,select,[contenteditable]")) return;
      const key = e.key.toLowerCase();
      document.querySelectorAll<HTMLElement>(".dock [data-key]").forEach((el) => {
        if (el.dataset.key === key) el.click();
      });
    };
    spy();
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("keydown", keys);
    return () => {
      window.removeEventListener("scroll", spy);
      window.removeEventListener("keydown", keys);
    };
  }, []);

  // After a throw the dock is already laid out on its new edge: start it visually
  // where it was let go, then let the spring carry it home.
  useLayoutEffect(() => {
    const from = thrownFrom.current;
    if (!from || !nav.current) return;
    thrownFrom.current = null;
    const now = centre(nav.current.getBoundingClientRect());
    x.jump(from.x - (now.x - x.get()));
    y.jump(from.y - (now.y - y.get()));
    x.set(0);
    y.set(0);
  }, [pos, x, y]);

  if (!pos) return null;
  const vertical = pos === "left" || pos === "right";
  const is = (id: string) => active === id;
  const item = { pointer, vertical };

  return (
    <div className="dock-wrap" data-pos={pos}>
      <motion.nav
        ref={nav}
        aria-label="Main"
        className="dock"
        style={{ x, y }}
        onPointerMove={(e) => {
          if (e.pointerType === "mouse" && !dragging.current) pointer.set(vertical ? e.clientY : e.clientX);
        }}
        onPointerLeave={() => pointer.set(Infinity)}
        onPanStart={(e) => {
          // Mouse only: on touch the row scrolls sideways instead.
          if ((e as PointerEvent).pointerType !== "mouse") return;
          dragging.current = true;
          pointer.set(Infinity);
        }}
        onPan={(_, { offset }) => {
          if (!dragging.current) return;
          far.current = Math.hypot(offset.x, offset.y) > DRAG_TRIGGER;
          const give = far.current ? 1 : 0.5;
          x.set(offset.x * give);
          y.set(offset.y * give);
        }}
        onPanEnd={(_, { velocity }) => {
          if (!dragging.current || !nav.current) return;
          const c = centre(nav.current.getBoundingClientRect());
          // Project the throw a little way along its velocity, then pick the nearest edge.
          const px = c.x + velocity.x * 0.15;
          const py = c.y + velocity.y * 0.15;
          const gap = { top: py, bottom: window.innerHeight - py, left: px, right: window.innerWidth - px };
          const next = POSITIONS.reduce((a, b) => (gap[b] < gap[a] ? b : a));
          if (far.current && next !== pos) {
            thrownFrom.current = c;
            setPos(next);
            try {
              localStorage.setItem(POS_KEY, next);
            } catch {}
          } else {
            x.set(0);
            y.set(0);
          }
          far.current = false;
          // Let the click that ends the drag be swallowed first.
          setTimeout(() => (dragging.current = false), 0);
        }}
        onClickCapture={(e) => {
          if (dragging.current) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div className="dock-row">
          <Item {...item} label="Home" k="1" href="#top" active={is("top")}>
            {icons.home}
          </Item>
          <Item {...item} label="Work" k="2" href="#work" active={is("work")}>
            {icons.work}
          </Item>
          <Item {...item} label="Experience" k="3" href="#experience" active={is("experience")}>
            {icons.experience}
          </Item>
          <Item {...item} label="Bio" k="4" href="#bio" active={is("bio")}>
            {icons.bio}
          </Item>
          <Item {...item} label="Connect" k="5" href="#connect" active={is("connect")}>
            {icons.connect}
          </Item>
          <Item {...item} label="LinkedIn" k="l" href={siteConfig.links.linkedin}>
            {icons.linkedin}
          </Item>
          <Item {...item} label="GitHub" k="g" href={siteConfig.links.github}>
            {icons.github}
          </Item>
          <Item {...item} label="Mail" k="m" href={siteConfig.links.email}>
            {icons.mail}
          </Item>
          <Item {...item} label="Toggle Theme" k="\" onClick={toggleTheme}>
            {icons.theme}
          </Item>
        </div>
      </motion.nav>
    </div>
  );
}
