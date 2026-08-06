import type { ReactNode } from "react";
import { motion } from "motion/react";

type Variant = "primary" | "secondary" | "ghost" | "appstore" | "playstore";

const styles: Record<Variant, { bg: string; fg: string; border: string }> = {
  primary: { bg: "#946e52", fg: "#ffffff", border: "#ffffff" },
  secondary: { bg: "#ffffff", fg: "#946e52", border: "#946e52" },
  ghost: { bg: "transparent", fg: "var(--foreground)", border: "rgba(255,255,255,0.85)" },
  appstore: { bg: "#1468e5", fg: "#ffffff", border: "#ffffff" },
  playstore: { bg: "#307353", fg: "#ffffff", border: "#ffffff" },
};

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  fullWidth,
}: {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}) {
  const s = styles[variant];
  const Comp: any = href ? motion.a : motion.button;
  return (
    <Comp
      href={href}
      onClick={onClick}
      data-variant={variant}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] border px-5 py-2.5 font-display text-base whitespace-nowrap transition hover:brightness-110 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      style={{
        background: s.bg,
        color: s.fg,
        borderColor: s.border,
        fontWeight: 500,
        boxShadow: "5px 5px 20px rgba(0,0,0,0.4)",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}
