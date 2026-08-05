import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1 text-sm"
      style={{ borderColor: "var(--pill-outline)", background: "transparent", color: "var(--foreground)" }}
    >
      {children}
    </span>
  );
}

export function TagGroup({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <Tag key={it}>{it}</Tag>
      ))}
    </div>
  );
}
