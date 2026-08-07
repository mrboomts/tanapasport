import { useEffect, useRef, useState } from "react";

const SPARKS = 18;
const RING_LABEL = "SCROLL\u00A0DOWN\u00A0•\u00A0SCROLL\u00A0DOWN\u00A0•\u00A0";

/**
 * Pointer flourish plus the rotating "scroll down" ring.
 *
 * The ring is the same motif on every device, it just gets a different
 * home: it trails the cursor where there is one, and parks itself in the
 * hero on touch. It retires once the hero is behind you, because by then
 * the instruction is no longer true.
 *
 * The glow and sparks are pointer-only decoration and stay disabled for
 * touch and for prefers-reduced-motion.
 */
export function GrandCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const [showRing, setShowRing] = useState(true);

  // Stretch the label to exactly one revolution so the spacing between
  // every word and bullet is identical, including across the wrap point.
  useEffect(() => {
    const path = pathRef.current;
    const textPath = textPathRef.current;
    if (!path || !textPath) return;
    const len = path.getTotalLength();
    textPath.setAttribute("textLength", String(len));
    textPath.setAttribute("lengthAdjust", "spacing");
  }, []);

  // Retire the ring once the hero is scrolled past.
  useEffect(() => {
    let raf = 0;
    const update = () => setShowRing(window.scrollY < window.innerHeight * 0.55);
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;

    const layer = layerRef.current;
    const glow = glowRef.current;
    if (!layer || !glow) return;

    const pool: HTMLSpanElement[] = [];
    for (let i = 0; i < SPARKS; i++) {
      const s = document.createElement("span");
      s.className = "g-spark";
      layer.appendChild(s);
      pool.push(s);
    }

    let cursor = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let gx = tx;
    let gy = ty;
    let rx = tx;
    let ry = ty;
    let lastX = tx;
    let lastY = ty;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;

      if (!visible) {
        visible = true;
        glow.style.opacity = "1";
      }

      const dx = tx - lastX;
      const dy = ty - lastY;
      const speed = Math.hypot(dx, dy);
      lastX = tx;
      lastY = ty;

      if (speed > 9) {
        const s = pool[cursor];
        cursor = (cursor + 1) % SPARKS;
        s.style.left = `${tx + (Math.random() - 0.5) * 26}px`;
        s.style.top = `${ty + (Math.random() - 0.5) * 26}px`;
        s.style.setProperty("--dx", `${(Math.random() - 0.5) * 44}px`);
        s.style.setProperty("--dy", `${18 + Math.random() * 34}px`);
        s.style.setProperty("--sz", `${3 + Math.random() * 3}px`);
        s.classList.remove("is-on");
        void s.offsetWidth;
        s.classList.add("is-on");
      }
    };

    const onLeave = () => {
      visible = false;
      glow.style.opacity = "0";
    };

    let raf = 0;
    const tick = () => {
      gx += (tx - gx) * 0.13;
      gy += (ty - gy) * 0.13;
      glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;

      // the ring lags a little further behind for a trailing feel
      if (ringRef.current) {
        rx += (tx - rx) * 0.08;
        ry += (ty - ry) * 0.08;
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      pool.forEach((s) => s.remove());
    };
  }, []);

  return (
    <div className="g-cursor" aria-hidden>
      <div className="g-cursor-glow" ref={glowRef} />
      <div className="g-cursor-sparks" ref={layerRef} />

      <div className="g-ring" ref={ringRef} data-hidden={!showRing}>
        <svg viewBox="0 0 100 100" className="g-ring-svg">
          <defs>
            <path ref={pathRef} id="g-ring-path" d="M 50,11 a 39,39 0 1,1 -0.01,0" fill="none" />
          </defs>
          <text className="g-ring-text">
            <textPath ref={textPathRef} href="#g-ring-path" startOffset="0">
              {RING_LABEL}
            </textPath>
          </text>
        </svg>
        <svg className="g-ring-arrow" viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
          <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
