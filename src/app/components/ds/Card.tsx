import type { ReactNode } from "react";

export function SurfaceCard({
  children,
  className = "",
  elevated = false,
}: {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl p-6 md:p-8 ${className}`}
      style={{
        background: elevated ? "var(--surface-elevated)" : "var(--surface)",
        color: "var(--foreground)",
        boxShadow: elevated ? "5px 5px 24px rgba(0,0,0,0.18)" : "none",
      }}
    >
      {children}
    </div>
  );
}

export { Button as PillButton } from "./Button";
