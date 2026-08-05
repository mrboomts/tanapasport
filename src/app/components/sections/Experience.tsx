import type { ExperienceEntry } from "../../data/portfolio";
import { experience, profile } from "../../data/portfolio";
import { Section, SectionHeading } from "../ds/Section";
import { PillButton } from "../ds/Card";
import { TagGroup } from "../ds/Tag";

function CompanyBlock({ job }: { job: ExperienceEntry }) {
  if (job.companies) {
    return (
      <ul className="mt-2 flex flex-col gap-1" style={{ listStyleType: "disc", paddingLeft: "1.2rem" }}>
        {job.companies.map((c) => (
          <li key={c.name}>
            <p className="font-display" style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--on-surface-muted)", lineHeight: 1.35 }}>
              {c.name}
            </p>
            <p className="font-display" style={{ fontSize: "0.85rem", color: "var(--on-surface-muted)", opacity: 0.8 }}>
              {c.period}
            </p>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <>
      <p className="mt-2" style={{ color: "var(--on-surface-muted)", fontSize: "0.9rem" }}>{job.company}</p>
      <p className="mt-1" style={{ color: "var(--on-surface-muted)", fontSize: "0.8rem" }}>{job.period}</p>
    </>
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading>Experience</SectionHeading>
      <p className="mb-6 max-w-3xl" style={{ lineHeight: 1.7, fontSize: "0.9rem" }}>
        {profile.experienceIntro}
      </p>
      <div className="mb-12">
        <PillButton href={profile.resumeUrl}>View my resume</PillButton>
      </div>
      <div className="flex flex-col gap-10">
        {experience.map((job) => (
          <div
            key={job.role}
            className="grid sm:grid-cols-[220px_1fr] md:grid-cols-[280px_1fr] gap-5 sm:gap-8 pb-10"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div>
              <h3 className="font-display" style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.25 }}>
                {job.role}
              </h3>
              <CompanyBlock job={job} />
            </div>
            <div>
              <p className="mb-4" style={{ fontSize: "0.9rem", lineHeight: 1.65 }}>{job.description}</p>
              <TagGroup items={job.skills} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
