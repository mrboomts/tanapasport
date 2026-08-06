import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/* Drop "grand" from this list to retire the Grand theme; a stored
   value that is no longer listed falls back to defaultTheme. */
export const THEMES = ["light", "dark", "grand"] as const;

export type ThemeName = (typeof THEMES)[number];

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "tanapa-theme";

export function ThemeProvider({ children, defaultTheme = "light" }: { children: ReactNode; defaultTheme?: ThemeName }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window === "undefined") return defaultTheme;
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    return stored && THEMES.includes(stored) ? stored : defaultTheme;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (t: ThemeName) => setThemeState(t);
  const toggle = () => setThemeState((p) => THEMES[(THEMES.indexOf(p) + 1) % THEMES.length]);

  return <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
