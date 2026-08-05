import { useState } from "react";
import { motion } from "motion/react";
import { projectGroups, type Project } from "../../data/portfolio";
import { images } from "../../data/images";
import { projectDetails } from "../../data/projectDetails";
import { Section, SectionHeading } from "../ds/Section";
import { ProjectModal } from "../ProjectModal";

function ProjectCard({
  project,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: (title: string) => void;
  index: number;
}) {
  const cover = images.projects[project.title];
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project.title)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay: (index % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-[20px] overflow-hidden flex flex-col text-left transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl w-full h-full bg-white"
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "4 / 3", background: project.accent }}
      >
        {cover ? (
          <img
            src={cover}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              objectPosition: project.imagePos ?? "center",
              transform: project.imageZoom ? `scale(${project.imageZoom})` : undefined,
              transformOrigin: project.imagePos ?? "center",
            }}
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-0.5 px-3 pt-2.5 pb-3 flex-1">
        <p className="text-right" style={{ color: "#3c3330", fontSize: "11px" }}>
          {project.period}
        </p>
        <p
          className="font-display"
          style={{ color: "#3c3330", fontSize: "14px", fontWeight: 700, lineHeight: 1.25 }}
        >
          {project.title}
        </p>
        <p
          className="font-display"
          style={{ color: "#3c3330", fontSize: "11px", fontWeight: 700 }}
        >
          {project.type}
        </p>
        <div className="mt-auto pt-6">
          <span
            className="font-display inline-flex w-full items-center justify-center rounded-[8px] px-3 py-2"
            style={{
              background: "#946e52",
              color: "#fff",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            View details
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function CompanyLine({ company, showName = true }: { company: string; showName?: boolean }) {
  return (
    <p className="mb-4" style={{ fontSize: 13, color: "var(--on-surface-muted)" }}>
      {showName ? `${company} — see` : "See"} the full role in{" "}
      <a href="#experience" className="underline hover:opacity-80">
        Experience
      </a>
      .
    </p>
  );
}

function ProjectGrid({
  items,
  onOpen,
}: {
  items: Project[];
  onOpen: (title: string) => void;
}) {
  if (items.length === 0) {
    return (
      <div
        className="rounded-[20px] border border-dashed flex items-center justify-center"
        style={{ borderColor: "var(--pill-outline)", color: "var(--on-surface-muted)", minHeight: 140, fontSize: 13 }}
      >
        Case studies coming soon
      </div>
    );
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 auto-rows-fr">
      {items.map((p, i) => (
        <ProjectCard key={p.title} project={p} onOpen={onOpen} index={i} />
      ))}
    </div>
  );
}

const TABS = [
  { key: "work", label: "Work and Internship Projects", groups: ["Work projects", "Internship projects"] },
  { key: "personal", label: "My Personal and Study Projects", groups: ["My personal projects", "Study projects (Google)"] },
] as const;

export function Projects() {
  const [active, setActive] = useState<string | null>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("work");
  const detail = active ? projectDetails[active] ?? null : null;
  const visibleGroups = projectGroups.filter((g) => TABS.find((t) => t.key === tab)!.groups.includes(g.label));

  return (
    <Section id="projects">
      <SectionHeading>Projects</SectionHeading>
      <p className="mb-6 max-w-2xl" style={{ color: "var(--on-surface-muted)", fontSize: 14 }}>
        Note: The Figma prototypes and case studies are linked on each card.
      </p>
      <div className="flex flex-wrap gap-3 mb-10">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className="font-display rounded-full border px-5 py-2.5 transition cursor-pointer"
            style={{
              fontSize: 14,
              fontWeight: 500,
              background: tab === t.key ? "var(--accent-brand)" : "transparent",
              color: tab === t.key ? "var(--primary-foreground)" : "var(--foreground)",
              borderColor: tab === t.key ? "transparent" : "var(--pill-outline)",
              boxShadow: "5px 5px 20px rgba(0,0,0,0.4)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="space-y-12">
        {visibleGroups.map((group) => (
          <div key={group.label}>
            <h3
              className="font-display mb-2"
              style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--accent-brand)" }}
            >
              {group.label}
            </h3>

            {group.subGroups ? (
              <div className="flex flex-col gap-10">
                {group.subGroups.map((sub) => (
                  <div key={sub.company}>
                    <h4
                      className="font-display mb-1"
                      style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)" }}
                    >
                      {sub.company}
                    </h4>
                    <CompanyLine company={sub.company} showName={false} />
                    <ProjectGrid items={sub.items} onOpen={setActive} />
                  </div>
                ))}
              </div>
            ) : (
              <>
                {group.company ? <CompanyLine company={group.company} /> : <div className="mb-4" />}
                <ProjectGrid items={group.items ?? []} onOpen={setActive} />
              </>
            )}
          </div>
        ))}
      </div>
      <ProjectModal detail={detail} onClose={() => setActive(null)} />
    </Section>
  );
}
