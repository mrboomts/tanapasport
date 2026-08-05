import { ThemeProvider } from "./theme/ThemeProvider";
import { Nav } from "./components/Nav";
import { Hero } from "./components/sections/Hero";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Certifications } from "./components/sections/Certifications";
import { About } from "./components/sections/About";
import { Hobbies } from "./components/sections/Hobbies";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen w-full" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <Nav />
        <Hero />
        <Experience />
        <Projects />
        <Certifications />
        <About />
        <Hobbies />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
