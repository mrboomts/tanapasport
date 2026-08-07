import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { certRows } from "../data/certifications";

/** Some issuer marks are single-colour and need a guaranteed backdrop:
 *  lightCard = black artwork, darkCard = white artwork. */
function logoBackdrop(logo: NonNullable<(typeof certRows)[number]["logo"]>) {
  if (logo.lightCard) return "#ffffff";
  if (logo.darkCard) return "#14121f";
  if (logo.whiteCard) return "rgba(255,255,255,0.06)";
  return "transparent";
}

export function GrandCredentials() {
  return (
    <section id="g-credentials" className="g-section">
      <header className="g-section-head">
        <span className="g-section-num" aria-hidden>
          04
        </span>
        <div>
          <h2 className="g-section-title">Certifications</h2>
          <p className="g-section-lede">
            UX/UI design, front-end development and digital marketing programmes — each one verifiable at
            source.
          </p>
        </div>
      </header>

      <div className="g-creds">
        {certRows.map((cert, i) => (
          <motion.article
            className="g-cred"
            key={cert.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {cert.logo ? (
              <div className="g-cred-mark" style={{ background: logoBackdrop(cert.logo) }}>
                <img src={cert.logo.src} alt={cert.issuer} loading="lazy" decoding="async" />
              </div>
            ) : null}

            <h3 className="g-cred-title">{cert.title}</h3>

            <p className="g-cred-meta">
              {cert.issuer}
              <i className="g-sep">/</i>
              {cert.issued.replace("Issued: ", "")}
            </p>

            <div className="g-cred-links">
              {cert.images.flatMap((doc, docIndex) =>
                doc.actions.map((a) => (
                  <a
                    key={`${docIndex}-${a.label}`}
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="g-link"
                  >
                    {a.label}
                    {cert.images.length > 1 ? ` ${docIndex + 1}` : ""}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )),
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
