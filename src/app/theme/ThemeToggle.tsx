import { Moon, Sparkles, Sun } from "lucide-react";
import { THEMES, useTheme, type ThemeName } from "./ThemeProvider";

const NEXT_LABEL: Record<ThemeName, string> = {
  light: "Light",
  dark: "Dark",
  grand: "Grand",
};

const NEXT_ICON: Record<ThemeName, typeof Sun> = {
  light: Sun,
  dark: Moon,
  grand: Sparkles,
};

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
  const Icon = NEXT_ICON[next];

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      className="inline-flex items-center gap-2 rounded-full border px-2.5 min-[400px]:px-4 py-2 text-sm transition hover:bg-white/20"
      style={{ borderColor: "rgba(255,255,255,0.8)", color: "#ffffff", boxShadow: "5px 5px 20px rgba(0,0,0,0.4)" }}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden min-[400px]:inline">{NEXT_LABEL[next]}</span>
    </button>
  );
}
