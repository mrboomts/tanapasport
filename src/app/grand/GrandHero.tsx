import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowDown } from "lucide-react";
import { experience, profile, projectGroups } from "../data/portfolio";
import { images } from "../data/images";
import { certRows } from "../components/sections/Certifications";
import { GrandArtifact } from "./GrandArtifact";

const UX_START_YEAR = 2022;

/** Figures derived from the real data so they cannot drift out of date. */
function getFigures() {
  const projects = projectGroups.reduce((total, group) => {
    const direct = group.items?.length ?? 0;
    const nested = group.subGroups?.reduce((n, s) => n + s.items.length, 0) ?? 0;
    return total + direct + nested;
  }, 0);

  const companies = new Set<string>();
  experience
    .filter((e) => e.role.startsWith("UX/UI"))
    .forEach((e) => {
      if (e.company) companies.add(e.company);
      e.companies?.forEach((c) => companies.add(c.name));
    });

  return [
    { value: new Date().getFullYear() - UX_START_YEAR, suffix: "+", label: "Years in UX/UI" },
    { value: projects, suffix: "", label: "Projects" },
    { value: companies.size, suffix: "", label: "Companies" },
    { value: certRows.length, suffix: "", label: "Certifications" },
  ];
}

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 900;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function GrandHero() {
  const figures = getFigures();
  const [firstName, ...rest] = profile.fullName.split(" ");
  const lastName = rest.join(" ");

  return (
    <>
      <section id="g-index" className="g-hero">
        <div className="g-hero-grid">
          <div className="g-hero-copy">
            <motion.p className="g-eyebrow" custom={0} variants={rise} initial="hidden" animate="show">
              <span className="g-eyebrow-rule" />
              {profile.role} — {profile.address}
            </motion.p>

            <motion.h1 className="g-display" custom={1} variants={rise} initial="hidden" animate="show">
              <span className="g-display-line">{firstName}</span>
              <span className="g-display-line g-display-line--gold">{lastName}</span>
            </motion.h1>

            <motion.div className="g-alias-row" custom={2} variants={rise} initial="hidden" animate="show">
              <img className="g-alias-avatar" src={images.profilePhoto} alt={profile.fullName} />
              <p className="g-alias">“{profile.nickname}”</p>
            </motion.div>

            <motion.p className="g-hero-intro" custom={3} variants={rise} initial="hidden" animate="show">
              {profile.intro}
            </motion.p>

            <motion.a href="#g-work" className="g-cta" custom={4} variants={rise} initial="hidden" animate="show">
              <span>See selected work</span>
              <ArrowDown className="w-4 h-4" />
            </motion.a>
          </div>

          <motion.div
            className="g-hero-object"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <GrandArtifact />
          </motion.div>
        </div>

        <div className="g-scrollcue" aria-hidden>
          <span className="g-scrollcue-line" />
          Scroll
        </div>
      </section>

      {/* Skills ticker */}
      <div className="g-marquee" aria-hidden>
        <div className="g-marquee-track">
          {[0, 1].map((copy) => (
            <div className="g-marquee-group" key={copy}>
              {profile.skills.map((s) => (
                <span className="g-marquee-item" key={`${copy}-${s}`}>
                  {s}
                  <i className="g-marquee-dot" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="sr-only">Skills: {profile.skills.join(", ")}</p>

      {/* Figures */}
      <section className="g-figures">
        {figures.map((f, i) => (
          <motion.div
            className="g-figure"
            key={f.label}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="g-figure-value">
              <CountUp to={f.value} suffix={f.suffix} />
            </span>
            <span className="g-figure-label">{f.label}</span>
          </motion.div>
        ))}
      </section>
    </>
  );
}
