import type { ReactNode } from "react";
import { motion } from "motion/react";

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`relative px-6 md:px-16 py-10 md:py-12 ${className}`}>
      {id ? <span id={id} aria-hidden className="absolute left-0 top-10 md:top-12" /> : null}
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      className="font-display tracking-tight mb-12"
      style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", lineHeight: 1.2, fontWeight: 700 }}
    >
      {children}
    </h2>
  );
}
