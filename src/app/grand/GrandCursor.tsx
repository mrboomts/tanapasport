import { useEffect, useRef } from "react";

const SPARKS = 18;

/**
 * Pointer flourish: a soft glow that trails the cursor plus sparks that
 * shed when it moves quickly. Fine-pointer devices only, and disabled
 * under prefers-reduced-motion — it is pure decoration.
 */
export function GrandCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;

    const layer = layerRef.current;
    const glow = glowRef.current;
    if (!layer || !glow) return;

    // reusable pool so we never churn DOM nodes
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
        const jitterX = (Math.random() - 0.5) * 26;
        const jitterY = (Math.random() - 0.5) * 26;
        s.style.left = `${tx + jitterX}px`;
        s.style.top = `${ty + jitterY}px`;
        s.style.setProperty("--dx", `${(Math.random() - 0.5) * 44}px`);
        s.style.setProperty("--dy", `${18 + Math.random() * 34}px`);
        s.style.setProperty("--sz", `${3 + Math.random() * 3}px`);
        // restart the animation on a reused node
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
    </div>
  );
}
