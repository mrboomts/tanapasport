import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft } from "lucide-react";
import { profile } from "../data/portfolio";
import { GrandCursor } from "../grand/GrandCursor";
import { GrandExperience } from "../grand/GrandExperience";
import { GrandProjects } from "../grand/GrandProjects";
import { GrandCredentials } from "../grand/GrandCredentials";
import { GrandProfile } from "../grand/GrandProfile";
import { GrandFooter } from "../grand/GrandFooter";
import { IntroRoom } from "./IntroRoom";
import { SolidIcon } from "./SolidIcon";
import { sound } from "./sound";
import { SoundMenu } from "./SoundMenu";
import { ROOMS, roomByKey, useRoom, type RoomKey } from "./rooms";
import type { HubScene } from "./scene";

/** Mirrors SEQ_END in scene.ts — kept here so the scene can stay lazy. */
const SEQ_MS = 1450;
/** When a played room starts fading in: as the solid unfolds. */
const ROOM_DELAY = "0.85s";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const liteDevice = () =>
  window.matchMedia("(max-width: 767px), (pointer: coarse)").matches || (navigator.hardwareConcurrency ?? 8) <= 4;

/** WebGL at all, and not on a device that told us it is starved of memory. */
function canRun3d() {
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (mem !== undefined && mem <= 2) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function RoomContent({ room }: { room: RoomKey }) {
  switch (room) {
    case "intro":
      return <IntroRoom />;
    case "experience":
      return <GrandExperience />;
    case "work":
      return <GrandProjects />;
    case "certifications":
      return <GrandCredentials />;
    case "profile":
      return (
        <>
          <GrandProfile />
          <GrandFooter />
        </>
      );
  }
}

/**
 * The full-3D shell. One screen, no page scroll: the hub holds the name,
 * the WebGL scene and the five rooms. Choosing a room plays the scene's
 * sequence and opens that room over it as its own scroller; "Menu",
 * Escape, or the browser's back step out again.
 *
 * Content never waits on the animation — the room mounts at once (so it
 * is focusable and readable by assistive tech immediately) and only its
 * fade is delayed; any click, key or wheel during the sequence skips it.
 * Without WebGL, on a memory-starved device, or with reduced motion, the
 * rooms cut in directly and the aurora carries the background alone.
 */
export function GrandHub() {
  const { room, go, home } = useRoom();
  const [initialRoom] = useState(() => room);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hubStageRef = useRef<HTMLDivElement>(null);
  const roomStageRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const menuRefs = useRef<Partial<Record<RoomKey, HTMLButtonElement | null>>>({});
  const slotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sceneRef = useRef<HubScene | null>(null);
  const dragFrom = useRef<{ x: number; y: number } | null>(null);
  const [ready, setReady] = useState(false);

  const [hovered, setHovered] = useState<number | null>(null);

  const [playing, setPlaying] = useState(false);

  const prevRoom = useRef<RoomKey | null | undefined>(undefined);

  /* ---------- load the scene (lazily: three is its own chunk) ---------- */
  useEffect(() => {
    if (!canRun3d()) return;
    let disposed = false;
    let scene: HubScene | null = null;
    import("./scene")
      .then(({ createHubScene }) => {
        if (disposed || !canvasRef.current) return;
        scene = createHubScene(canvasRef.current, { reduced: reducedMotion(), lite: liteDevice() });
        sceneRef.current = scene;
        setReady(true);
      })
      .catch(() => {
        /* no scene — the aurora is the fallback */
      });
    return () => {
      disposed = true;
      scene?.dispose();
      sceneRef.current = null;
    };
  }, []);

  /* ---------- keep the scene's stages on the DOM's ---------- */
  const measure = useCallback(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    for (const [which, el] of [
      ["hub", hubStageRef.current],
      ["room", roomStageRef.current],
    ] as const) {
      if (!el) continue;
      const r = el.getBoundingClientRect();
      scene.setStage(which, { x: r.left, y: r.top, w: r.width, h: r.height });
    }
    // slots are indexed by solid, not by room order
    const slots: ({ x: number; y: number; w: number; h: number } | null)[] = [];
    ROOMS.forEach((room, i) => {
      const el = slotRefs.current[i];
      if (!el) return;
      const r = el.getBoundingClientRect();
      slots[room.solid] = { x: r.left, y: r.top, w: r.width, h: r.height };
    });
    scene.setSlots(slots);
  }, []);

  useEffect(() => {
    if (!ready) return;
    measure();
    const ro = new ResizeObserver(measure);
    if (hubStageRef.current) ro.observe(hubStageRef.current);
    if (roomStageRef.current) ro.observe(roomStageRef.current);
    slotRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ready, measure]);

  useEffect(() => {
    if (ready) sceneRef.current?.setHover(room ? null : hovered);
  }, [ready, room, hovered]);

  /* ---------- room changes drive the sequence ---------- */
  useEffect(() => {
    const prev = prevRoom.current;
    prevRoom.current = room;
    const scene = sceneRef.current;

    if (room) {
      // the first room of a visit (a shared link, the QR poster) cuts
      // straight in; choosing one from the hub plays the sequence
      const instant = prev === undefined || reducedMotion() || !scene;
      scene?.enter(roomByKey(room).solid, { instant });
      if (!instant) sound.enter(roomByKey(room).solid);
      setPlaying(!instant);
      roomRef.current?.focus({ preventScroll: true });
      if (!instant) {
        const id = window.setTimeout(() => setPlaying(false), SEQ_MS);
        return () => window.clearTimeout(id);
      }
    } else {
      scene?.leave();
      if (prev) sound.leave();
      setPlaying(false);
      if (prev) menuRefs.current[prev]?.focus({ preventScroll: true });
    }
  }, [room]);

  // the scene loaded after a deep-linked room was already open
  useEffect(() => {
    if (ready && initialRoom && room === initialRoom) {
      measure();
      sceneRef.current?.enter(roomByKey(room).solid, { instant: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const skip = useCallback(() => {
    if (!playing) return;
    sceneRef.current?.skip();
    setPlaying(false);
  }, [playing]);

  /* ---------- Escape steps out (unless a project card has it) ---------- */
  useEffect(() => {
    if (!room) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || document.body.dataset.modalOpen) return;
      home();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [room, home]);

  const [firstName, ...rest] = profile.fullName.split(" ");
  const current = room ? roomByKey(room) : null;

  return (
    <div className="h-root" data-room={room ?? "hub"} data-3d={ready}>
      <div className="g-aurora" aria-hidden />
      <div className="g-aurora-veil" aria-hidden />
      <canvas className="h-canvas" ref={canvasRef} aria-hidden />
      <GrandCursor ring={false} />
      <div className="h-room-stage" ref={roomStageRef} aria-hidden />

      <SoundMenu />

      {/* ---------- the hub ---------- */}
      <main className="h-hub" data-hidden={!!room} aria-hidden={!!room}>
        <header className="h-hub-top">
          <span className="g-monogram">TS</span>
          <span className="h-hub-role">
            {profile.role} — {profile.address}
          </span>
        </header>

        <div className="h-hub-name">
          <p className="h-hub-kicker">
            <span className="g-eyebrow-rule" aria-hidden />
            UX/UI Design Portfolio
          </p>
          <h1 className="g-display">
            <span className="g-display-line">{firstName}</span>
            <span className="g-display-line g-display-line--gold">{rest.join(" ")}</span>
          </h1>
          <p className="h-hub-alias">
            “{profile.nickname}” <span aria-hidden>·</span> Choose a shape to explore
          </p>
        </div>

        {/* hold (click or touch) and drag to turn the centre */}
        <div
          className="h-stage"
          ref={hubStageRef}
          aria-hidden
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            dragFrom.current = { x: e.clientX, y: e.clientY };
            sceneRef.current?.grab(true);
          }}
          onPointerMove={(e) => {
            const from = dragFrom.current;
            if (!from) return;
            sceneRef.current?.drag(e.clientX - from.x, e.clientY - from.y);
            dragFrom.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerUp={() => {
            dragFrom.current = null;
            sceneRef.current?.grab(false);
          }}
          onPointerCancel={() => {
            dragFrom.current = null;
            sceneRef.current?.grab(false);
          }}
        />

        {/* The solids are the menu. With WebGL the scene draws them over
            each slot; without it, a static line drawing stands in. */}
        <nav className="h-menu" aria-label="Rooms">
          {ROOMS.map((r, i) => (
            <button
              key={r.key}
              type="button"
              className="h-orb"
              data-hover={hovered === r.solid}
              ref={(el) => {
                menuRefs.current[r.key] = el;
              }}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                setHovered(r.solid);
                sound.hover(r.solid);
              }}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => setHovered(r.solid)}
              onBlur={() => setHovered(null)}
              onClick={() => go(r.key)}
            >
              <span
                className="h-orb-slot"
                aria-hidden
                ref={(el) => {
                  slotRefs.current[i] = el;
                }}
              >
                {ready ? null : <SolidIcon solid={r.solid} />}
              </span>
              <span className="h-orb-text">
                <span className="h-menu-num">{r.num}</span>
                <span className="h-orb-label">{r.label}</span>
              </span>
            </button>
          ))}
        </nav>
      </main>

      {/* ---------- the open room ---------- */}
      {current ? (
        <div
          key={current.key}
          ref={roomRef}
          className="h-room"
          role="region"
          aria-label={current.label}
          tabIndex={-1}
          data-playing={playing}
          style={{ "--h-delay": playing ? ROOM_DELAY : "0s" } as CSSProperties}
          onPointerDown={skip}
          onWheel={skip}
          onKeyDown={skip}
        >
          <header className="h-room-bar">
            <button type="button" className="h-back" onClick={home}>
              <ArrowLeft className="w-4 h-4" aria-hidden />
              Menu
            </button>

            <nav className="h-room-tabs" aria-label="Rooms">
              {ROOMS.map((r) => (
                <a
                  key={r.key}
                  href={`#${r.key}`}
                  className="h-room-tab"
                  aria-current={r.key === current.key ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    if (r.key !== current.key) go(r.key);
                  }}
                >
                  <span className="h-menu-num">{r.num}</span>
                  {r.label}
                </a>
              ))}
            </nav>

            <span className="h-room-title">
              <span className="h-menu-num">{current.num}</span>
              {current.label}
            </span>
          </header>

          <div className="h-room-body">
            <RoomContent room={current.key} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
