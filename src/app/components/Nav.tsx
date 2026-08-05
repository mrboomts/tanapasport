import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Mail, Linkedin, Menu, X } from "lucide-react";
import { ThemeToggle } from "../theme/ThemeToggle";
import { navLinks, profile } from "../data/portfolio";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const headerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    let raf = 0;
    const update = () => {
      const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 88;
      const line = navHeight + 1;
      let current = sections[0].id;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) current = s.id;
      }
      setActive(current);
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
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => {
      document.documentElement.style.setProperty("--nav-height", `${el.offsetHeight}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <header ref={headerRef} className="sticky top-0 z-40" style={{ background: "#946e52" }}>
      <div
        className="mx-auto flex items-center justify-between gap-4 px-6 md:px-12"
        style={{ maxWidth: 1440, height: 88 }}
      >
        <div
          className="flex items-stretch rounded-[10px] overflow-hidden shrink-0"
          style={{ background: "rgba(0,0,0,0.1)", height: 60 }}
        >
          <a
            href="#home"
            className="flex items-center justify-center shrink-0"
            style={{ background: "rgba(0,0,0,0.1)", padding: "6px clamp(8px, 3vw, 14px)" }}
          >
            <span
              className="font-display"
              style={{ fontSize: "clamp(16px, 5vw, 22px)", fontWeight: 700, color: "#fff", lineHeight: 1 }}
            >
              {profile.nickname}
            </span>
          </a>
          <div className="flex items-center min-w-0" style={{ padding: "6px clamp(6px, 2.5vw, 14px)" }}>
            <p
              className="font-display whitespace-nowrap"
              style={{ fontSize: "clamp(10px, 3vw, 15px)", lineHeight: 1.15, color: "#fff", fontWeight: 400 }}
            >
              Tanapas
              <br />
              Suppamongkol
            </p>
          </div>
        </div>

        <div className="flex items-center" style={{ gap: 12 }}>
          <div className="hidden sm:flex items-center" style={{ gap: 12 }}>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="hover:opacity-80 transition"
              style={{ color: "#fff" }}
            >
              <Mail style={{ width: 24, height: 24 }} />
            </a>
            <a
              href={profile.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:opacity-80 transition"
              style={{ color: "#fff" }}
            >
              <Linkedin style={{ width: 24, height: 24 }} />
            </a>
          </div>
          <ThemeToggle />
          <motion.button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="hover:opacity-80 transition"
            style={{ color: "#fff" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {open ? (
              <X style={{ width: 36, height: 36, strokeWidth: 1.5 }} />
            ) : (
              <Menu style={{ width: 36, height: 36, strokeWidth: 1.5 }} />
            )}
          </motion.button>
        </div>
      </div>

      <div
        className="overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background: "#946e52",
          maxHeight: open ? 600 : 0,
          opacity: open ? 1 : 0,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <ul
          className="mx-auto flex flex-col items-center justify-center"
          style={{ maxWidth: 1440, gap: 4, padding: "8px 24px 16px" }}
        >
          {navLinks.map((l) => {
            const isActive = active === l.href.replace("#", "");
            return (
              <li key={l.href} className="w-full">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display block w-full text-center transition hover:opacity-80 rounded-md"
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#fff",
                    padding: "8px 16px",
                    background: isActive ? "rgba(255,255,255,0.18)" : "transparent",
                  }}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
          <li className="w-full sm:hidden">
            <div
              className="flex items-center justify-center gap-6 mt-2 pt-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}
            >
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="hover:opacity-80 transition"
                style={{ color: "#fff" }}
                onClick={() => setOpen(false)}
              >
                <Mail style={{ width: 22, height: 22 }} />
              </a>
              <a
                href={profile.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:opacity-80 transition"
                style={{ color: "#fff" }}
                onClick={() => setOpen(false)}
              >
                <Linkedin style={{ width: 22, height: 22 }} />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}
