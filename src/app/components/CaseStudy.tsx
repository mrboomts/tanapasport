import { motion } from "motion/react";
import type { CaseStudy as CaseStudyData, Screenshot } from "../data/projectDetails";

/**
 * Device frames. Which one a screen wants depends on how it was captured:
 * the PEA exports already carry real browser chrome, the Log Pose CMS
 * captures are raw UI and need a window drawn round them, and the app
 * captures want a handset.
 */
function Framed({ src, caption, frame }: { src: string; caption: string; frame: Screenshot["frame"] }) {
  const img = <img src={src} alt={caption} loading="lazy" decoding="async" />;

  if (frame === "mac") {
    return (
      <div className="g-mac">
        <div className="g-mac-lid">
          <div className="g-mac-screen">{img}</div>
        </div>
        <div className="g-mac-base" aria-hidden>
          <span className="g-mac-notch" />
        </div>
      </div>
    );
  }

  if (frame === "phone") {
    return (
      <div className="g-phone">
        <div className="g-phone-screen">{img}</div>
      </div>
    );
  }

  if (frame === "browser") {
    return (
      <div className="g-win">
        <div className="g-win-bar" aria-hidden>
          <span className="g-win-dot" />
          <span className="g-win-dot" />
          <span className="g-win-dot" />
          <span className="g-win-url" />
        </div>
        <div className="g-win-view">{img}</div>
      </div>
    );
  }

  return <div className="g-plain">{img}</div>;
}

function Screen({ shot, index }: { shot: Screenshot; index: number }) {
  return (
    <motion.figure
      className="g-cs-screen"
      data-side={index % 2 === 0 ? "left" : "right"}
      data-frame={shot.frame}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="g-cs-media">
        <Framed src={shot.src} caption={shot.caption} frame={shot.frame} />
      </div>

      <figcaption className="g-cs-cap">
        <span className="g-cs-fignum">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="g-cs-caph">{shot.caption}</h3>
        {shot.note ? <p className="g-cs-capp">{shot.note}</p> : null}
      </figcaption>
    </motion.figure>
  );
}

export function CaseStudy({
  title,
  study,
  overview,
  note,
  noteRed,
}: {
  title: string;
  study: CaseStudyData;
  overview: string;
  note?: string;
  noteRed?: string;
}) {
  const [hero, ...rest] = study.screens;

  return (
    <div className="g-cs">
      <header className="g-cs-head">
        <span className="g-eyebrow">
          <span className="g-eyebrow-rule" aria-hidden />
          Case study
        </span>
        <h1 className="g-cs-title">{title}</h1>
        {study.subtitle ? <p className="g-cs-sub">{study.subtitle}</p> : null}
      </header>

      <dl className="g-cs-meta">
        {study.meta.map((m) => (
          <div key={m.label}>
            <dt>{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
      </dl>

      {hero ? (
        <div className="g-cs-hero" data-frame={hero.frame}>
          <Framed src={hero.src} caption={hero.caption} frame={hero.frame} />
        </div>
      ) : null}

      <div className="g-cs-body" data-single={!study.highlights?.length}>
        <div>
          <h2 className="g-cs-h2">Overview</h2>
          <p className="g-cs-copy">{overview}</p>
          {note ? <p className="g-cs-note">{note}</p> : null}
          {noteRed ? <p className="g-cs-note g-cs-note--warn">{noteRed}</p> : null}
        </div>

        {study.highlights?.length ? (
          <div>
            <h2 className="g-cs-h2">What it does</h2>
            <ul className="g-cs-list">
              {study.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {rest.length ? (
        <section className="g-cs-screens">
          {rest.map((shot, i) => (
            <div key={shot.src}>
              {shot.group && shot.group !== rest[i - 1]?.group ? (
                <h2 className="g-cs-h2 g-cs-group">{shot.group}</h2>
              ) : null}
              <Screen shot={shot} index={i} />
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}
