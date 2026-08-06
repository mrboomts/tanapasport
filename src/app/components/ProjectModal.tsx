import { useEffect } from "react";
import { motion } from "motion/react";
import type { ProjectDetail } from "../data/projectDetails";
import { Button } from "./ds/Button";

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
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
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

        <div className="flex flex-col gap-5">
          <h1
            className="font-display"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.15, fontWeight: 700 }}
          >
            {detail.title}
          </h1>

          <div className="flex flex-col lg:flex-row gap-[50px] items-stretch">
            {detail.coverB ? (
              <div className="flex flex-col gap-[10px] shrink-0">
                {[detail.cover, detail.coverB, detail.coverC]
                  .filter((src): src is string => Boolean(src))
                  .map((src, i) => (
                  <div
                    key={i}
                    className="relative rounded-[20px] overflow-hidden flex items-center justify-center"
                    style={{
                      width: 270,
                      height: 200,
                      backgroundImage: `url(${detail.bg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <img src={src} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="relative rounded-[30px] overflow-hidden flex items-center justify-center shrink-0"
                style={{
                  width: "100%",
                  maxWidth: 560,
                  height: 420,
                  background: detail.whiteCard ? "#ffffff" : undefined,
                  backgroundImage: detail.whiteCard ? undefined : `url(${detail.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <img
                  src={detail.cover}
                  alt={detail.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex-1 flex flex-col gap-5 justify-between">
              <div className="flex flex-col gap-3">
                <p
                  className="font-display"
                  style={{ fontSize: "22px", lineHeight: 1.5, color: "var(--foreground)" }}
                >
                  {detail.description}
                </p>
                {detail.note ? (
                  <p className="font-display" style={{ fontSize: "16px", color: "var(--foreground)" }}>
                    {detail.note}
                  </p>
                ) : null}
                {detail.noteRed ? (
                  <p
                    className="font-display bg-white px-2.5 py-0.5 rounded"
                    style={{ fontSize: "12px", color: "#ce1124" }}
                  >
                    {detail.noteRed}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-[10px]">
                {detail.actions.map((a) => (
                  <Button key={a.label} variant={a.variant} href={a.href}>
                    {a.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
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
