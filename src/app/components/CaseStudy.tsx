import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy as CaseStudyData, Screenshot, SocialLink, SocialPlatform } from "../data/projectDetails";

/**
 * Brand-coloured badges for the "poster" layout's social row. Hand-drawn
 * rather than pulled from an icon set — lucide-react has Facebook,
 * Instagram and YouTube but neither TikTok, the current X mark, nor LINE,
 * and a mismatched icon style across the row would be worse than none.
 */
const SOCIAL_BRAND: Record<SocialPlatform, { bg: string; icon: ReactNode }> = {
  youtube: {
    bg: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path d="M9.5 8.3v7.4l6.5-3.7-6.5-3.7Z" fill="#fff" />
      </svg>
    ),
  },
  tiktok: {
    bg: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
        <path d="M16.6 5.82a4.28 4.28 0 0 1-3.03-3.02h-2.9v13.6a2.6 2.6 0 1 1-1.85-2.49v-2.97a5.56 5.56 0 1 0 4.75 5.5V9.4a7.15 7.15 0 0 0 4.03 1.24V7.62a4.27 4.27 0 0 1-1-.18v-.01Z" />
      </svg>
    ),
  },
  facebook: {
    bg: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
      </svg>
    ),
  },
  instagram: {
    bg: "linear-gradient(135deg, #f9ce34 0%, #ee2a7b 55%, #6228d7 100%)",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="#fff" stroke="none" />
      </svg>
    ),
  },
  x: {
    bg: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" width="17" height="17" fill="#fff">
        <path d="M13.6 10.6 20.4 3h-1.7l-5.9 6.6L8.1 3H3l7.1 9.9L3 21h1.7l6.2-7 5 7h5.1l-7.4-10.4Zm-2.2 2.5-.7-1L5 4.3h2.6l4.6 6.4.7 1 6 8.3h-2.6l-4.9-6.9Z" />
      </svg>
    ),
  },
  line: {
    bg: "#06C755",
    icon: (
      <svg viewBox="0 0 24 24" width="21" height="21" fill="#fff">
        <path d="M12 5C7.6 5 4 7.8 4 11.3c0 3.1 2.8 5.7 6.6 6.2.4.1.6.3.5.7l-.2 1c-.1.3.1.6.5.5.2 0 3.1-1.9 5.4-3.5 1.5-1 2.5-2.2 2.9-3.5.2-.5.3-1 .3-1.4C20 7.8 16.4 5 12 5Z" />
      </svg>
    ),
  },
};

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

/** One row of the "poster" layout's social list — brand badge, a short call to action, no bare URL. */
function SocialRow({ social }: { social: SocialLink }) {
  const brand = SOCIAL_BRAND[social.platform];
  return (
    <a className="g-cs-social-row" href={social.href} target="_blank" rel="noopener noreferrer">
      <span className="g-cs-social-badge" style={{ background: brand.bg }} aria-hidden>
        {brand.icon}
      </span>
      <span className="g-cs-social-label">{social.label}</span>
      <ArrowUpRight className="g-cs-social-arrow" aria-hidden />
    </a>
  );
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
  const pair = study.layout === "pair";
  const poster = study.layout === "poster";
  const [hero, ...rest] = pair ? [undefined, ...study.screens] : study.screens;

  return (
    <div className="g-cs">
      <header className="g-cs-head">
        <span className="g-eyebrow">
          <span className="g-eyebrow-rule" aria-hidden />
          {poster ? "Project" : "Case study"}
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

      {poster ? (
        <>
          <p className="g-cs-copy g-cs-poster-blurb">{overview}</p>

          {study.socials?.length ? (
            <section className="g-cs-socials">
              <span className="g-cs-socials-pill">Official socials</span>
              <div className="g-cs-social-list">
                {study.socials.map((s) => (
                  <SocialRow key={s.platform} social={s} />
                ))}
              </div>
            </section>
          ) : null}

          {study.stickers ? (
            <a
              className="g-cs-sticker"
              href={study.stickers.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="g-cs-sticker-badge" style={{ background: SOCIAL_BRAND.line.bg }} aria-hidden>
                {SOCIAL_BRAND.line.icon}
              </span>
              <div className="g-cs-sticker-body">
                <span className="g-cs-sticker-sub">{study.stickers.sub}</span>
                <h3 className="g-cs-sticker-title">{study.stickers.title}</h3>
                <p className="g-cs-sticker-blurb">{study.stickers.blurb}</p>
              </div>
              {study.stickers.thumb ? (
                <img className="g-cs-sticker-thumb" src={study.stickers.thumb} alt="" loading="lazy" decoding="async" />
              ) : null}
              <span className="g-cs-sticker-cta">
                {study.stickers.cta}
                <ArrowUpRight aria-hidden />
              </span>
            </a>
          ) : null}
        </>
      ) : null}

      {pair ? (
        <div className="g-cs-pair">
          {study.screens.map((shot) => (
            <figure key={shot.src} className="g-cs-pairitem">
              <Framed src={shot.src} caption={shot.caption} frame={shot.frame} />
              {shot.caption ? <figcaption className="g-cs-caph">{shot.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      ) : null}

      {!poster ? (
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
      ) : null}

      {study.problem ? (
        <section className="g-cs-problem">
          <h2 className="g-cs-h2">The problem it solves</h2>
          <div className="g-cs-problem-grid">
            <div className="g-cs-problem-cell" data-when="before">
              <span className="g-cs-problem-tag">Before</span>
              <p>{study.problem.before}</p>
            </div>
            <div className="g-cs-problem-cell" data-when="after">
              <span className="g-cs-problem-tag">After</span>
              <p>{study.problem.after}</p>
            </div>
          </div>
        </section>
      ) : null}

      {!pair && !poster && rest.length ? (
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
