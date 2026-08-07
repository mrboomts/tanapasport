import { useEffect, useRef, useState } from "react";
import { SOLIDS, project, rotate } from "./platonic";

const SIZE = 400;
const MAX_V = Math.max(...SOLIDS.map((s) => s.vertices.length));
const MAX_E = Math.max(...SOLIDS.map((s) => s.edges.length));
const IDLE_SPIN = 0.0035;
const HOLD_MS = 5200;
const FADE_MS = 620;

/**
 * The five Platonic solids as rotating wireframes. CSS 3D cannot express a
 * dodecahedron honestly, so the geometry is projected to SVG each frame —
 * that also makes depth cueing and morphing between solids straightforward.
 *
 * Drag to spin; it eases back to an idle rotation and keeps cycling shapes.
 */
export function GrandArtifact() {
  const svgRef = useRef<SVGSVGElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const [label, setLabel] = useState(SOLIDS[0].name);

  const st = useRef({
    rx: -0.28,
    ry: 0.4,
    vx: 0,
    vy: IDLE_SPIN,
    dragging: false,
    px: 0,
    py: 0,
    index: 0,
    phase: 0, // ms since the current shape appeared
    fade: 1,
  });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();

    const draw = () => {
      const s = st.current;
      const solid = SOLIDS[s.index];
      const pts = solid.vertices.map((v) => project(rotate(v, s.rx, s.ry), SIZE));

      for (let i = 0; i < MAX_E; i++) {
        const el = lineRefs.current[i];
        if (!el) continue;
        const e = solid.edges[i];
        if (!e) {
          el.setAttribute("opacity", "0");
          continue;
        }
        const a = pts[e[0]];
        const b = pts[e[1]];
        const depth = (a.depth + b.depth) / 2;
        el.setAttribute("x1", a.x.toFixed(2));
        el.setAttribute("y1", a.y.toFixed(2));
        el.setAttribute("x2", b.x.toFixed(2));
        el.setAttribute("y2", b.y.toFixed(2));
        el.setAttribute("opacity", ((0.22 + depth * 0.78) * s.fade).toFixed(3));
        el.setAttribute("stroke-width", (0.7 + depth * 1.5).toFixed(2));
      }

      for (let i = 0; i < MAX_V; i++) {
        const el = dotRefs.current[i];
        if (!el) continue;
        const p = pts[i];
        if (!p) {
          el.setAttribute("opacity", "0");
          continue;
        }
        el.setAttribute("cx", p.x.toFixed(2));
        el.setAttribute("cy", p.y.toFixed(2));
        el.setAttribute("r", (1.1 + p.depth * 2.2).toFixed(2));
        el.setAttribute("opacity", ((0.3 + p.depth * 0.7) * s.fade).toFixed(3));
      }
    };

    const tick = (now: number) => {
      const s = st.current;
      const dt = Math.min(now - last, 50);
      last = now;

      if (!s.dragging) {
        s.ry += s.vy;
        s.rx += s.vx;
        s.vy += (IDLE_SPIN - s.vy) * 0.04;
        s.vx += (0 - s.vx) * 0.07;
        s.rx += (-0.28 - s.rx) * 0.005;
      }

      // shape cycling: fade out, swap, fade back in
      s.phase += dt;
      if (s.phase < HOLD_MS) {
        s.fade = Math.min(1, s.fade + dt / FADE_MS);
      } else {
        s.fade -= dt / FADE_MS;
        if (s.fade <= 0) {
          s.fade = 0;
          s.index = (s.index + 1) % SOLIDS.length;
          s.phase = 0;
          setLabel(SOLIDS[s.index].name);
        }
      }

      draw();
      raf = requestAnimationFrame(tick);
    };

    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(raf);
  }, []);

  const onDown = (e: React.PointerEvent) => {
    const s = st.current;
    s.dragging = true;
    s.px = e.clientX;
    s.py = e.clientY;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.px;
    const dy = e.clientY - s.py;
    s.px = e.clientX;
    s.py = e.clientY;
    s.ry += dx * 0.008;
    s.rx = Math.max(-1.3, Math.min(1.3, s.rx + dy * 0.008));
    s.vy = dx * 0.0022;
    s.vx = dy * 0.0016;
  };

  const onUp = (e: React.PointerEvent) => {
    st.current.dragging = false;
    const el = e.currentTarget as Element;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="g-artifact">
      <div
        className="g-orb"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        role="img"
        aria-label={`Rotating wireframe of the five Platonic solids, currently a ${label}`}
      >
        <span className="g-orb-core" aria-hidden />
        <svg
          ref={svgRef}
          className="g-solid"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          fill="none"
          aria-hidden
        >
          {Array.from({ length: MAX_E }, (_, i) => (
            <line
              key={`e${i}`}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              stroke="url(#gGold)"
              strokeLinecap="round"
              opacity="0"
            />
          ))}
          {Array.from({ length: MAX_V }, (_, i) => (
            <circle
              key={`v${i}`}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              fill="#f7e2a8"
              opacity="0"
            />
          ))}
          <defs>
            <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f7e2a8" />
              <stop offset="55%" stopColor="#e9c877" />
              <stop offset="100%" stopColor="#a97fe0" />
            </linearGradient>
          </defs>
        </svg>
        <span className="g-orb-shadow" aria-hidden />
      </div>

      <p className="g-artifact-hint">Drag to rotate</p>
    </div>
  );
}
