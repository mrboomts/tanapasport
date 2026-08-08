import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { experience, profile } from "../data/portfolio";
import { GrandGolden } from "./GrandGolden";

export function GrandExperience() {
  return (
    <section id="g-experience" className="g-section">
      <motion.header
        className="g-section-head"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="g-section-num" aria-hidden>
          02
        </span>
        <div>
          <h2 className="g-section-title">Experience</h2>
          <p className="g-section-lede">{profile.experienceIntro}</p>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="g-btn g-btn--gold"
          >
            View my resume <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </motion.header>

      <div className="g-exp-grid">
        <ol className="g-timeline">
          {experience.map((e, entryIndex) => (
            <motion.li
              className="g-tl-item"
              key={e.role + (e.company ?? "")}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: entryIndex * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="g-tl-dot" aria-hidden />

              <div className="g-tl-body">
                <h3 className="g-tl-role">{e.role}</h3>

                <ul className="g-tl-orgs">
                  {e.companies
                    ? e.companies.map((c) => (
                        <li key={c.name}>
                          <span className="g-tl-org">{c.name}</span>
                          <span className="g-tl-period">{c.period}</span>
                        </li>
                      ))
                    : (
                        <li>
                          <span className="g-tl-org">{e.company}</span>
                          <span className="g-tl-period">{e.period}</span>
                        </li>
                      )}
                </ul>

                <p className="g-tl-desc">{e.description}</p>

                <p className="g-tl-skills">
                  {e.skills.map((s, i) => (
                    <span key={s}>
                      {s}
                      {i < e.skills.length - 1 ? <i className="g-sep">/</i> : null}
                    </span>
                  ))}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        <GrandGolden />
      </div>
    </section>
  );
}
