import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft } from "lucide-react";
import { profile } from "../data/portfolio";
import { GrandCursor } from "../grand/GrandCursor";
import { GrandExperience } from "../grand/GrandExperience";
import { GrandProjects } from "../grand/GrandProjects";
import { GrandCredentials } from "../grand/GrandCredentials";
import { GrandProfile } from "../grand/GrandProfile";
import { GrandFooter } from "../grand/GrandFooter";
import { IndexRoom } from "./IndexRoom";
import { ROOMS, roomByKey, useRoom, type RoomKey } from "./rooms";
import type { HubScene } from "./scene";

/** Mirrors SEQ_END in scene.ts — kept here so the scene can stay lazy. */
const SEQ_MS = 1400;
/** When a played room starts fading in: as the solid unfolds. */
const ROOM_DELAY = "0.8s";
const PREVIEW_EVERY = 3200;

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
    case "index":
      return <IndexRoom />;
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
  const sceneRef = useRef<HubScene | null>(null);
  const [ready, setReady] = useState(false);

  const [hovered, setHovered] = useState<number | null>(null);
  const [cycle, setCycle] = useState(0);
  const preview = hovered ?? ROOMS[cycle % ROOMS.length].solid;

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
  }, []);

  useEffect(() => {
    if (!ready) return;
    measure();
    const ro = new ResizeObserver(measure);
    if (hubStageRef.current) ro.observe(hubStageRef.current);
    if (roomStageRef.current) ro.observe(roomStageRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ready, measure]);

  /* ---------- hub preview: cycle the solids until someone points at one ---------- */
  useEffect(() => {
    if (room || hovered !== null) return;
    const id = window.setInterval(() => setCycle((c) => c + 1), PREVIEW_EVERY);
    return () => window.clearInterval(id);
  }, [room, hovered]);

  useEffect(() => {
    if (ready && !room) sceneRef.current?.setPreview(preview);
  }, [ready, room, preview]);

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
      setPlaying(!instant);
      roomRef.current?.focus({ preventScroll: true });
      if (!instant) {
        const id = window.setTimeout(() => setPlaying(false), SEQ_MS);
        return () => window.clearTimeout(id);
      }
    } else {
      scene?.leave();
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

      {/* ---------- the hub ---------- */}
      <main className="h-hub" data-hidden={!!room} aria-hidden={!!room}>
        <header className="h-hub-top">
          <span className="g-monogram">TS</span>
          <span className="h-hub-role">
            {profile.role} — {profile.address}
          </span>
        </header>

        <div className="h-hub-name">
          <h1 className="g-display">
            <span className="g-display-line">{firstName}</span>
            <span className="g-display-line g-display-line--gold">{rest.join(" ")}</span>
          </h1>
          <p className="h-hub-alias">
            “{profile.nickname}” <span aria-hidden>·</span> choose a room
          </p>
        </div>

        <div className="h-stage" ref={hubStageRef} aria-hidden>
          <span className="h-stage-caption">
            {ROOMS.find((r) => r.solid === preview)?.element} ·{" "}
            {ROOMS.find((r) => r.solid === preview)?.shape}
          </span>
        </div>

        <nav className="h-menu" aria-label="Rooms">
          {ROOMS.map((r) => (
            <button
              key={r.key}
              type="button"
              className="h-menu-item"
              data-preview={preview === r.solid}
              ref={(el) => {
                menuRefs.current[r.key] = el;
              }}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(r.solid)}
              onPointerLeave={() => setHovered(null)}
              onFocus={() => setHovered(r.solid)}
              onBlur={() => setHovered(null)}
              onClick={() => go(r.key)}
            >
              <span className="h-menu-num">{r.num}</span>
              <span className="h-menu-text">
                <span className="h-menu-label">{r.label}</span>
                <span className="h-menu-meta">{r.blurb}</span>
              </span>
              <span className="h-menu-el" aria-hidden>
                {r.element}
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
