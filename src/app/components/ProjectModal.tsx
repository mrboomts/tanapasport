import { useEffect } from "react";
import { motion } from "motion/react";
import { buildStudy, orderedActions, type ProjectDetail } from "../data/projectDetails";
import { Button } from "./ds/Button";
import { CaseStudy } from "./CaseStudy";

export function ProjectModal({
  detail,
  onClose,
}: {
  detail: ProjectDetail | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!detail) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    // the rail, the scroll ring, the progress bar and the floating CTA all
    // sit above or beside the page; none of them belong over a detail view
    document.body.dataset.modalOpen = "true";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.modalOpen;
      window.removeEventListener("keydown", onKey);
    };
  }, [detail, onClose]);

  if (!detail) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ background: "var(--background)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClose}
    >
      <motion.div
        className="relative mx-auto w-full max-w-[1320px] px-6 md:px-[60px] py-[72px]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <p
          className="font-display text-center mb-12"
          style={{ fontSize: "30px", fontWeight: 700, color: "var(--foreground)" }}
        >
          Projects
        </p>

        <CaseStudy
          title={detail.title}
          study={buildStudy(detail.title, detail)}
          overview={detail.description}
          note={detail.note}
          noteRed={detail.noteRed}
        />

        <div className="g-cs-actions">
          {orderedActions(detail.actions).map((a) => (
            <Button key={a.label} variant={a.variant} href={a.href}>
              {a.label}
            </Button>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <motion.button
            onClick={onClose}
            data-variant="close"
            className="font-display rounded-[10px] border px-8 py-2.5"
            style={{
              fontSize: "18px",
              fontWeight: 500,
              background: "transparent",
              color: "var(--foreground)",
              borderColor: "currentColor",
              boxShadow: "5px 5px 20px rgba(0,0,0,0.4)",
              minWidth: 150,
            }}
            whileHover={{
              scale: 1.05,
              background: "var(--accent-brand)",
              color: "var(--primary-foreground)",
              borderColor: "transparent",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
