import { ThemeProvider, useTheme } from "./theme/ThemeProvider";
import { Nav } from "./components/Nav";
import { Hero } from "./components/sections/Hero";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Certifications } from "./components/sections/Certifications";
import { About } from "./components/sections/About";
import { Footer } from "./components/Footer";
import { GrandLayout } from "./grand/GrandLayout";

/** The Grand theme ships its own layout; light/dark share the classic one. */
function AppShell() {
  const { theme } = useTheme();

  if (theme === "grand") return <GrandLayout />;

  return (
    <div className="min-h-screen w-full" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Nav />
      <Hero />
      <Experience />
      <Projects />
      <Certifications />
      <About />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
