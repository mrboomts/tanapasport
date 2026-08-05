import { motion } from "motion/react";
import { hobbies } from "../../data/portfolio";
import { images } from "../../data/images";
import { Section, SectionHeading } from "../ds/Section";

export function Hobbies() {
  return (
    <Section id="hobbies">
      <SectionHeading underline={false}>Hobbies & Interests</SectionHeading>
      <div className="grid sm:grid-cols-2 gap-6">
        {hobbies.map((h, i) => {
          const img = images.hobbies[h.name];
          return (
            <motion.div
              key={h.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1 + Math.floor(i / 2) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-5 flex items-center justify-between gap-4 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-xl"
              style={{ background: "var(--surface)" }}
            >
              <p
                className="font-display flex-1"
                style={{ fontSize: "1.4rem", fontWeight: 700, lineHeight: 1.15 }}
              >
                {h.name}
              </p>
              <div
                className="shrink-0 w-[80px] h-[80px] rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: "#fff" }}
              >
                {img ? (
                  <img src={img} alt={h.name} decoding="async" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl">{h.emoji}</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
