import { useEffect, useRef } from "react";

const IDLE_SPIN = 0.14;

/**
 * Decorative armillary sphere. Drag to spin it; it eases back into a slow
 * idle rotation on release. Rotation is written straight to the node via a
 * rAF loop so React never re-renders per frame.
 */
export function GrandArtifact() {
  const stageRef = useRef<HTMLDivElement>(null);
  const s = useRef({ rx: -16, ry: 22, vx: 0, vy: IDLE_SPIN, dragging: false, px: 0, py: 0 });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const apply = () => {
      if (stageRef.current) {
        stageRef.current.style.transform = `rotateX(${s.current.rx}deg) rotateY(${s.current.ry}deg)`;
      }
    };

    if (reduce) {
      apply();
      return;
    }

    let raf = 0;
    const tick = () => {
      const c = s.current;
      if (!c.dragging) {
        c.ry += c.vy;
        c.rx += c.vx;
        // ease flung momentum back toward the resting spin
        c.vy += (IDLE_SPIN - c.vy) * 0.035;
        c.vx += (0 - c.vx) * 0.07;
        c.rx += (-16 - c.rx) * 0.004;
      }
      apply();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const c = s.current;
    c.dragging = true;
    c.px = e.clientX;
    c.py = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const c = s.current;
    if (!c.dragging) return;
    const dx = e.clientX - c.px;
    const dy = e.clientY - c.py;
    c.px = e.clientX;
    c.py = e.clientY;
    c.ry += dx * 0.45;
    c.rx = Math.max(-70, Math.min(70, c.rx - dy * 0.4));
    c.vy = dx * 0.12;
    c.vx = -dy * 0.08;
    if (stageRef.current) {
      stageRef.current.style.transform = `rotateX(${c.rx}deg) rotateY(${c.ry}deg)`;
    }
  };

  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    s.current.dragging = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className="g-artifact">
      <div
        className="g-orb"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        aria-hidden
      >
        <div className="g-orb-stage" ref={stageRef}>
          <span className="g-ring g-ring--a" />
          <span className="g-ring g-ring--b" />
          <span className="g-ring g-ring--c" />

          <div className="g-cube">
            {["fr", "bk", "rt", "lf", "tp", "bm"].map((f) => (
              <span key={f} className={`g-face g-face--${f}`} />
            ))}
          </div>

          <span className="g-orb-core" />
        </div>
        <span className="g-orb-shadow" />
      </div>

      <p className="g-artifact-hint">Drag to rotate</p>
    </div>
  );
}
