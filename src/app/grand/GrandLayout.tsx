import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "../data/portfolio";
import { ThemeToggle } from "../theme/ThemeToggle";
import { GrandHero } from "./GrandHero";
import { GrandJourney } from "./GrandJourney";
import { GrandExperience } from "./GrandExperience";
import { GrandProjects } from "./GrandProjects";
import { GrandCredentials } from "./GrandCredentials";
import { GrandProfile } from "./GrandProfile";
import { GrandFooter } from "./GrandFooter";

export const GRAND_SECTIONS = [
  { id: "g-index", num: "01", label: "Index" },
  { id: "g-experience", num: "02", label: "Experience" },
  { id: "g-work", num: "03", label: "Work" },
  { id: "g-credentials", num: "04", label: "Credentials" },
  { id: "g-profile", num: "05", label: "Profile" },
];

/** Marks whichever section last crossed the top of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState(GRAND_SECTIONS[0].id);

  useEffect(() => {
    const nodes = GRAND_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    let raf = 0;
    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = nodes[0].id;
      for (const n of nodes) {
        if (n.getBoundingClientRect().top <= line) current = n.id;
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

  return active;
}

export function GrandLayout() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="g-root">
      {/* ---------- Desktop side rail ---------- */}
      <aside className="g-rail" aria-label="Section navigation">
        <a href="#g-index" className="g-monogram">
          TS
        </a>

        <nav className="g-rail-nav">
          {GRAND_SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="g-rail-link" data-active={active === s.id}>
              <span className="g-rail-num">{s.num}</span>
              <span className="g-rail-label">{s.label}</span>
            </a>
          ))}
        </nav>

        <div className="g-rail-foot">
          <ThemeToggle />
        </div>
      </aside>

      {/* ---------- Mobile bar ---------- */}
      <header className="g-topbar">
        <a href="#g-index" className="g-monogram g-monogram--sm">
          TS
        </a>
        <div className="g-topbar-actions">
          <ThemeToggle />
          <button
            type="button"
            className="g-iconbtn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="g-menu" role="dialog" aria-modal="true">
          {GRAND_SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="g-menu-link" onClick={() => setMenuOpen(false)}>
              <span className="g-rail-num">{s.num}</span>
              {s.label}
            </a>
          ))}
          <div className="g-menu-meta">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin.url} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      ) : null}

      {/* ---------- Content ---------- */}
      <main className="g-main">
        <GrandHero />
        <GrandJourney />
        <GrandExperience />
        <GrandProjects />
        <GrandCredentials />
        <GrandProfile />
        <GrandFooter />
      </main>
    </div>
  );
}
