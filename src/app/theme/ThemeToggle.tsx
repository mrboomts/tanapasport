import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="inline-flex items-center gap-2 rounded-full border px-2.5 min-[400px]:px-4 py-2 text-sm transition hover:bg-white/20"
      style={{ borderColor: "rgba(255,255,255,0.8)", color: "#ffffff", boxShadow: "5px 5px 20px rgba(0,0,0,0.4)" }}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      <span className="hidden min-[400px]:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
