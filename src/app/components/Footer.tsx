import { ArrowUp, Mail, Linkedin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { navLinks, profile } from "../data/portfolio";
import portfolioQr from "../../imports/QrCode/portfolio-qr.png";

export function Footer() {
  return (
    <footer className="px-6 md:px-16 py-12" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-start">
        <div>
          <p className="font-display" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            {profile.fullName}
          </p>
          <p className="text-sm mt-1" style={{ color: "var(--on-surface-muted)" }}>
            {profile.role} · {profile.address}
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-[var(--accent-brand)] transition">
              <Mail className="w-5 h-5" />
            </a>
            <a href={profile.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[var(--accent-brand)] transition">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={`tel:${profile.phone}`} aria-label="Phone" className="hover:text-[var(--accent-brand)] transition">
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-[var(--accent-brand)] transition">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-4">
          <motion.a
            href="#home"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-[var(--accent-brand)] hover:text-[var(--primary-foreground)] hover:border-transparent transition"
            style={{ borderColor: "var(--pill-outline)", boxShadow: "5px 5px 20px rgba(0,0,0,0.4)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </motion.a>
          <div className="flex flex-col items-center gap-1.5">
            <img
              src={portfolioQr}
              alt="QR code linking to this portfolio"
              className="rounded-lg"
              style={{ width: 96, height: 96, background: "#fff", padding: 6 }}
            />
            <a
              href="https://tanapasport.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:text-[var(--accent-brand)] transition"
              style={{ color: "var(--on-surface-muted)" }}
            >
              tanapasport.vercel.app
            </a>
          </div>
        </div>
      </div>
      <p
        className="max-w-6xl mx-auto mt-10 text-xs"
        style={{ color: "var(--on-surface-muted)" }}
      >
        © {new Date().getFullYear()} {profile.fullName}. All rights reserved.
      </p>
    </footer>
  );
}
