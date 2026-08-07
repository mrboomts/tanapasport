import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * Floating call to action. Scrolls to the contact block and gets out of
 * the way once that block is on screen, so it never covers what it points at.
 */
export function GrandContactCta() {
  const [hidden, setHidden] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const target = document.getElementById("g-contact");
    if (!target) return;
    const obs = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      threshold: 0.25,
    });
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  // only appear once the hero is behind us
  useEffect(() => {
    let raf = 0;
    const update = () => setLifted(window.scrollY > window.innerHeight * 0.5);
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

  return (
    <a href="#g-contact" className="g-cta-float" data-hidden={hidden || !lifted}>
      <span className="g-cta-dot" aria-hidden />
      Let’s talk
      <ArrowRight className="w-4 h-4" aria-hidden />
    </a>
  );
}
