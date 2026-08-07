import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projectGroups, type Project } from "../data/portfolio";
import { images } from "../data/images";
import { projectDetails } from "../data/projectDetails";
import { ProjectModal } from "../components/ProjectModal";

const TABS = [
  { key: "work", label: "Work and Internship", groups: ["Work projects", "Internship projects"] },
  { key: "personal", label: "Personal and Study", groups: ["My personal projects", "Study projects (Google)"] },
] as const;

type TabKey = (typeof TABS)[number]["key"];

type Row =
  | { kind: "group"; label: string; key: string }
  | { kind: "company"; label: string; key: string }
  | { kind: "project"; project: Project; index: number };

/** group.label is always the heading; the company name sits under it —
 *  either from group.company (e.g. Internship projects / Probatus) or
 *  from each sub-group (Work projects / The Island, SeniorCom, …). */
function buildRows(tab: TabKey): Row[] {
  const allowed = TABS.find((t) => t.key === tab)!.groups as readonly string[];
  const rows: Row[] = [];
  let n = 0;

  for (const group of projectGroups) {
    if (!allowed.includes(group.label)) continue;
    rows.push({ kind: "group", label: group.label, key: `g:${group.label}` });

    if (group.subGroups) {
      for (const sub of group.subGroups) {
        if (!sub.items.length) continue;
        rows.push({ kind: "company", label: sub.company, key: `c:${group.label}:${sub.company}` });
        for (const project of sub.items) rows.push({ kind: "project", project, index: ++n });
      }
    } else {
      if (group.company) {
        rows.push({ kind: "company", label: group.company, key: `c:${group.label}` });
      }
      for (const project of group.items ?? []) rows.push({ kind: "project", project, index: ++n });
    }
  }

  return rows;
}

export function GrandProjects() {
  const [active, setActive] = useState<string | null>(null);
  const [tab, setTab] = useState<TabKey>("work");
  const detail = active ? projectDetails[active] ?? null : null;
  const rows = buildRows(tab);

  return (
    <section id="g-work" className="g-section">
      <motion.header
        className="g-section-head"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="g-section-num" aria-hidden>
          03
        </span>
        <div>
          <h2 className="g-section-title">Selected work</h2>
          <p className="g-section-lede">
            An index of what I have designed. Open any line for prototypes, design systems and case studies.
          </p>
        </div>
      </motion.header>

      <div className="g-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            className="g-tab"
            data-active={tab === t.key}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            {tab === t.key ? <motion.span layoutId="g-tab-ink" className="g-tab-ink" /> : null}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          className="g-index"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {rows.map((row, i) => {
            if (row.kind === "group") {
              return (
                <h3 className="g-index-group" key={row.key}>
                  {row.label}
                </h3>
              );
            }
            if (row.kind === "company") {
              return (
                <h4 className="g-index-company" key={row.key}>
                  <span className="g-index-company-rule" aria-hidden />
                  {row.label}
                </h4>
              );
            }
            return (
              <motion.button
                type="button"
                key={row.project.title}
                className="g-proj"
                onClick={() => setActive(row.project.title)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.035, 0.4), ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="g-proj-num" aria-hidden>
                  {String(row.index).padStart(2, "0")}
                </span>

                <span className="g-proj-main">
                  <span className="g-proj-title">{row.project.title}</span>
                  <span className="g-proj-type">{row.project.type}</span>
                </span>

                <span className="g-proj-period">{row.project.period}</span>

                <span className="g-proj-thumb" aria-hidden>
                  {images.projects[row.project.title] ? (
                    <img src={images.projects[row.project.title]} alt="" loading="lazy" decoding="async" />
                  ) : null}
                </span>

                <ArrowUpRight className="g-proj-arrow w-5 h-5" aria-hidden />
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <ProjectModal detail={detail} onClose={() => setActive(null)} />
    </section>
  );
}
