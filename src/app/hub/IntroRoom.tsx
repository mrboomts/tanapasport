import { motion } from "motion/react";
import { organisations, profile } from "../data/portfolio";
import { images } from "../data/images";
import { CountUp, getFigures } from "../grand/GrandHero";
import { GrandJourney } from "../grand/GrandJourney";

/** Room 01, Intro — the hero's introduction, the organisations ticker, the
 *  figures and the career-switch band, minus the name (the hub has it). */
export function IntroRoom() {
  const figures = getFigures();

  return (
    <>
      <section id="g-index" className="g-section">
        <header className="g-section-head">
          <span className="g-section-num" aria-hidden>
            01
          </span>
          <div>
            <h2 className="g-section-title">Hello, I’m {profile.nickname}</h2>
            <div className="g-alias-row">
              <span className="g-alias-avatar">
                <img src={images.profileFace} alt={profile.fullName} />
              </span>
              <p className="g-section-lede h-index-intro">{profile.intro}</p>
            </div>
          </div>
        </header>
      </section>

      <div className="g-marquee">
        <p className="g-marquee-label">Organisations my work has shipped for</p>
        <div className="g-marquee-viewport">
          <div className="g-marquee-track" aria-hidden>
            {[0, 1].map((copy) => (
              <div className="g-marquee-group" key={copy}>
                {organisations.map((o) => (
                  <span className="g-marquee-item" key={`${copy}-${o.name}`}>
                    {o.name}
                    {o.full ? <em className="g-marquee-full">({o.full})</em> : null}
                    <i className="g-marquee-dot" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className="sr-only">{organisations.map((o) => (o.full ? `${o.name} (${o.full})` : o.name)).join(", ")}</p>
      </div>

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

      <GrandJourney />
    </>
  );
}
