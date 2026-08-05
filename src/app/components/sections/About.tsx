import { profile } from "../../data/portfolio";
import { Section } from "../ds/Section";
import { images } from "../../data/images";
import { HandPointRight } from "../icons/HandPointRight";
import flagPaths from "../../../imports/Frame15/svg-0bkrx7ub1q";

const flagThai = (
  <svg width="24" height="24" viewBox="0 0 30 30" aria-hidden="true">
    <path d={flagPaths.p3e2dc900} fill="#1C30AB" />
    <path d={flagPaths.p13c7d700} fill="#EC1C24" />
    <path d={flagPaths.pe16cd00} fill="#fff" />
  </svg>
);
const flagEng = (
  <svg width="24" height="24" viewBox="0 0 30 30" aria-hidden="true">
    <path d={flagPaths.p1199abc0} fill="#fff" />
    <path d={flagPaths.p17386dc0} fill="#CE1124" />
  </svg>
);
const flagJp = (
  <svg width="24" height="24" viewBox="0 0 30 30" aria-hidden="true">
    <path d={flagPaths.p14a47a80} fill="#fff" />
    <path d={flagPaths.p2e53c900} fill="#ED1B2F" />
  </svg>
);

const langs = [
  { name: "Thai", level: "Native", flag: flagThai },
  { name: "English", level: "Intermediate", flag: flagEng },
  { name: "Japanese", level: "Beginner", flag: flagJp },
];

const personalRows: { label: string; value: string }[] = [
  { label: "Name:", value: profile.fullName },
  { label: "Nickname:", value: profile.nickname },
  { label: "Birthday:", value: profile.birthday },
  { label: "Address:", value: profile.address },
];

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-[50px] items-start w-full">
      <div className="md:w-[160px] shrink-0">
        <p className="font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)" }}>{label}</p>
      </div>
      <div className="flex-1 min-w-0 flex items-center">{children}</div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-display rounded-full border"
      style={{
        background: "#946e52",
        color: "#fff",
        borderColor: "#fff",
        padding: "3px 12px",
        fontSize: 12,
      }}
    >
      {children}
    </span>
  );
}

function SkillTag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-display rounded-full border"
      style={{ background: "transparent", color: "var(--foreground)", borderColor: "var(--pill-outline)", padding: "3px 12px", fontSize: 12 }}
    >
      {children}
    </span>
  );
}

export function About() {
  return (
    <Section id="about">
      <h2
        className="font-display mb-12"
        style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", lineHeight: 1.2, fontWeight: 700, color: "var(--foreground)" }}
      >
        About me
      </h2>

      <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-12 items-start">
        <div className="rounded-[20px] overflow-hidden aspect-[3/4] w-full max-w-[320px] mx-auto lg:mx-0 bg-white">
          <img src={images.aboutPhoto} alt={profile.fullName} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-12">
          <p className="font-display" style={{ fontSize: 14, lineHeight: 1.6, color: "var(--foreground)" }}>
            {profile.about}
          </p>

          <div className="flex flex-col gap-5">
            <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)" }}>
              Personal info
            </h3>
            <div className="flex flex-col gap-[10px]">
              {personalRows.map((r) => (
                <Row key={r.label} label={r.label}>
                  <p className="font-display" style={{ fontSize: 16, color: "var(--foreground)" }}>{r.value}</p>
                </Row>
              ))}

              <Row label="Languages:">
                <div className="flex flex-col gap-[10px]">
                  {langs.map((l) => (
                    <div key={l.name} className="flex items-center gap-5">
                      {l.flag}
                      <span className="font-display" style={{ fontSize: 16, color: "var(--foreground)" }}>{l.name}</span>
                      <Tag>{l.level}</Tag>
                    </div>
                  ))}
                </div>
              </Row>

              <Row label="Skills:">
                <div className="flex flex-wrap gap-[10px]">
                  {profile.skills.map((s) => (
                    <SkillTag key={s}>{s}</SkillTag>
                  ))}
                </div>
              </Row>
            </div>
          </div>

          <div id="contact" className="flex flex-col gap-5">
            <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--foreground)" }}>
              Contact
            </h3>
            <div className="flex flex-col gap-[10px]">
              <Row label="Mail:">
                <div className="flex flex-wrap items-center gap-5">
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-display underline"
                    style={{ fontSize: 16, color: "var(--foreground)" }}
                  >
                    {profile.email}
                  </a>
                  <span className="flex items-center gap-1">
                    <HandPointRight />
                    <span className="font-display" style={{ fontSize: 18, color: "var(--foreground)" }}>
                      Click to send mail to me
                    </span>
                  </span>
                </div>
              </Row>
              <Row label="Phone:">
                <a
                  href={`tel:${profile.phone}`}
                  className="font-display"
                  style={{ fontSize: 16, color: "var(--foreground)" }}
                >
                  {profile.phone}
                </a>
              </Row>
              <Row label="LinkedIn:">
                <div className="flex flex-wrap items-center gap-5">
                  <a
                    href={profile.linkedin.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display underline"
                    style={{ fontSize: 16, color: "var(--foreground)" }}
                  >
                    {profile.linkedin.label}
                  </a>
                  <span className="flex items-center gap-1">
                    <HandPointRight />
                    <span className="font-display" style={{ fontSize: 18, color: "var(--foreground)" }}>
                      Click to my LinkedIn page
                    </span>
                  </span>
                </div>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
