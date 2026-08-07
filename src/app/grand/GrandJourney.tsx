function Walker() {
  return (
    <svg className="g-walker" viewBox="0 0 44 64" fill="none" aria-hidden>
      <circle cx="22" cy="9" r="7" className="g-walker-head" />
      <line x1="22" y1="17" x2="22" y2="38" className="g-walker-body" />
      <line x1="22" y1="22" x2="10" y2="30" className="g-walker-limb g-walker-arm-a" />
      <line x1="22" y1="22" x2="34" y2="30" className="g-walker-limb g-walker-arm-b" />
      <line x1="22" y1="38" x2="12" y2="58" className="g-walker-limb g-walker-leg-a" />
      <line x1="22" y1="38" x2="32" y2="58" className="g-walker-limb g-walker-leg-b" />
    </svg>
  );
}

/**
 * The career switch, told as a loop: the figure walks itself across the
 * band, its label flipping from Banker to UX/UI Designer as it passes
 * through SELF-LEARNING. All timing is CSS so it runs independently of
 * scrolling, and stops entirely under prefers-reduced-motion.
 */
export function GrandJourney() {
  return (
    <section className="g-journey">
      <p className="g-eyebrow">
        <span className="g-eyebrow-rule" />
        The switch
      </p>

      <h2 className="g-journey-title">From reading balance sheets to reading people</h2>

      <div className="g-journey-stage">
        <span className="g-journey-word" aria-hidden>
          SELF-LEARNING
        </span>
        <span className="g-journey-word g-journey-word--fill" aria-hidden>
          SELF-LEARNING
        </span>

        <span className="g-journey-track" aria-hidden>
          <span className="g-journey-track-fill" />
        </span>

        <div className="g-journey-walker" aria-hidden>
          <span className="g-journey-tags">
            <span className="g-journey-tag g-journey-tag--before">Banker</span>
            <span className="g-journey-tag g-journey-tag--after">UX/UI Designer</span>
          </span>
          <Walker />
        </div>
      </div>

      <ol className="g-journey-marks">
        <li>
          <span>2018 — 2021</span>
          Credit analyst &amp; relationship manager
        </li>
        <li>
          <span>2021 — 2022</span>
          Google UX certificate, nights and weekends
        </li>
        <li>
          <span>2022 — now</span>
          Designing products full time
        </li>
      </ol>
    </section>
  );
}
