import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

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

export function GrandJourney() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "88%"]);
  const bankerOpacity = useTransform(scrollYProgress, [0, 0.38, 0.5], [1, 1, 0]);
  const designerOpacity = useTransform(scrollYProgress, [0.5, 0.62, 1], [0, 1, 1]);
  const wordFill = useTransform(scrollYProgress, [0.25, 0.72], [0, 1]);
  const trackFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="g-journey" ref={ref}>
      <p className="g-eyebrow">
        <span className="g-eyebrow-rule" />
        The switch
      </p>

      <h2 className="g-journey-title">From reading balance sheets to reading people</h2>

      <div className="g-journey-stage">
        <span className="g-journey-word" aria-hidden>
          SELF-LEARNING
        </span>
        <motion.span className="g-journey-word g-journey-word--fill" style={{ opacity: wordFill }} aria-hidden>
          SELF-LEARNING
        </motion.span>

        <span className="g-journey-track" aria-hidden>
          <motion.span className="g-journey-track-fill" style={{ width: trackFill }} />
        </span>

        <motion.div className="g-journey-walker" style={{ left: x }}>
          <span className="g-journey-tags">
            <motion.span className="g-journey-tag" style={{ opacity: bankerOpacity }}>
              Banker
            </motion.span>
            <motion.span className="g-journey-tag g-journey-tag--gold" style={{ opacity: designerOpacity }}>
              UX/UI Designer
            </motion.span>
          </span>
          <Walker />
        </motion.div>
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
