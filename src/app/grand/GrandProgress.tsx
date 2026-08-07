import { useEffect, useRef } from "react";

/** Thin reading-progress rule. Works without a pointer, so it is one of the
 *  few ambient cues that touch devices get too. */
export function GrandProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="g-progress" aria-hidden>
      <div className="g-progress-bar" ref={ref} />
    </div>
  );
}
