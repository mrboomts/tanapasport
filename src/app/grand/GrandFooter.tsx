import { ArrowUp } from "lucide-react";
import { profile } from "../data/portfolio";
import portfolioQr from "../../imports/QrCode/portfolio-qr.png";

export function GrandFooter() {
  return (
    <footer className="g-footer">
      <p className="g-footer-kicker">Open to new work</p>

      <a href={`mailto:${profile.email}`} className="g-footer-mail">
        {profile.email}
      </a>

      <div className="g-footer-grid">
        <div className="g-footer-col">
          <span className="g-footer-h">Elsewhere</span>
          <a href={profile.linkedin.url} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`tel:${profile.phone}`}>{profile.phone}</a>
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>

        <div className="g-footer-col">
          <span className="g-footer-h">This site</span>
          <img src={portfolioQr} alt="QR code linking to this portfolio" className="g-footer-qr" />
          <a href="https://tanapasport.vercel.app" target="_blank" rel="noopener noreferrer">
            tanapasport.vercel.app
          </a>
        </div>

        <div className="g-footer-col g-footer-col--end">
          <a href="#g-index" className="g-btn g-btn--ghost">
            Back to top <ArrowUp className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="g-footer-rule" />

      <p className="g-footer-fine">
        © {new Date().getFullYear()} {profile.fullName} — {profile.role}
      </p>
    </footer>
  );
}
