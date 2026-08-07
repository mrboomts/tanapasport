import { motion } from "motion/react";
import { Section } from "../ds/Section";
import imgPrompt from "../../../imports/Certifications/5be78f1a79cbef3bc564fa68c6b139f2f752b153.png";
import imgGoogleLogo from "../../../imports/Certifications/41b9e95b557c3da74bb1d0ceca00127931d499e7.png";
import imgGoogleDetails from "../../../imports/Certifications/2d82f5db16e16df22946880a389eda334b2ab686.png";
import imgGoogleBadge from "../../../imports/Certifications/b7976f8122d21b5d561fdc5c6281773328840e69.png";
import imgVanderbiltLogo from "../../../imports/Certifications/bb0a364819916ed9825a78a005aa34d44e29d0f3.png";
import imgJohnsHopkinsLogo from "../../../imports/Certifications/adc020019a1289f8f2186e09e93e7876edfe3f5d.png";
import imgWebDev from "../../../imports/Certifications/7c9cee71188a6ee257d3f97dc636da04592217f2.png";
import imgIcdlLogo from "../../../imports/Certifications/888058bbe0cb3dc508093d6058e33b1bf5e34f18.png";
import imgIcdlThailand from "../../../imports/Certifications/af3dfde782bbe52134efeafa32a375794e623bab.png";
import imgIcdlAsia from "../../../imports/Certifications/a9f3e12003157399b74f6f65d9b38a9e741b1fed.png";

type Action = { label: string; href: string; filled?: boolean };

type CertImg = { src: string; w: number; h: number };

type CertRow = {
  title: string;
  issuer: string;
  issued: string;
  logo?: CertImg & { whiteCard?: boolean; darkCard?: boolean; lightCard?: boolean };
  images: { src: string; w: number; h: number; actions: Action[] }[];
};

export const certRows: CertRow[] = [
  {
    title: "Prompt Engineering for ChatGPT",
    issuer: "Vanderbilt University",
    issued: "Issued: Mar.2024",
    logo: { src: imgPrompt, w: 160, h: 120, lightCard: true },
    images: [
      {
        src: imgVanderbiltLogo,
        w: 350,
        h: 270,
        actions: [
          { label: "View", href: "https://drive.google.com/file/d/1a80Z2txZnKfQ8lMi35wCxcLTjm_8Rj7G/view" },
          { label: "Verify", href: "https://www.coursera.org/account/accomplishments/verify/NZYB3JEK787L", filled: true },
        ],
      },
    ],
  },
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    issued: "Issued: Feb.2022",
    logo: { src: imgGoogleLogo, w: 180, h: 92 },
    images: [
      {
        src: imgGoogleDetails,
        w: 350,
        h: 270,
        actions: [
          { label: "View", href: "https://drive.google.com/file/d/1vMGeood0ZHEfvgI24UbIEC_XFigBABi7/view?usp=sharing" },
          { label: "Verify", href: "https://coursera.org/verify/professional-cert/6R6DNFJS8TGB", filled: true },
        ],
      },
      {
        src: imgGoogleBadge,
        w: 350,
        h: 270,
        actions: [
          { label: "View", href: "https://drive.google.com/file/d/1_xRvj3Kx9Xnu3HvhC6VJdQGWGnhKXcF4/view?usp=sharing" },
          { label: "Verify", href: "https://www.credly.com/go/g08grqFM", filled: true },
        ],
      },
    ],
  },
  {
    title: "HTML, CSS, and Javascript for Web Developers",
    issuer: "Johns Hopkins University",
    issued: "Issued: Mar.2022",
    logo: { src: imgJohnsHopkinsLogo, w: 260, h: 92, darkCard: true },
    images: [
      {
        src: imgWebDev,
        w: 350,
        h: 270,
        actions: [
          { label: "View", href: "https://drive.google.com/file/d/1F_LeqqOW94ZCHMeQISF9XJs8JMKqmqMV/view?usp=sharing" },
          { label: "Verify", href: "https://coursera.org/verify/3GKQEHNFB8AP", filled: true },
        ],
      },
    ],
  },
  {
    title: "International Computer Driving License (ICDL Thailand, ICDL Asia)",
    issuer: "Digital Marketing",
    issued: "Issued: Nov.2020",
    logo: { src: imgIcdlLogo, w: 120, h: 80, whiteCard: true },
    images: [
      {
        src: imgIcdlThailand,
        w: 350,
        h: 250,
        actions: [{ label: "View", href: "https://drive.google.com/file/d/1DMHghIHvf4bxAbXwFF2t4hFi69x-XrQ8/view?usp=sharing" }],
      },
      {
        src: imgIcdlAsia,
        w: 177,
        h: 250,
        actions: [{ label: "View", href: "https://drive.google.com/file/d/1Fn5Cg903BYCw5QTfgzdQmbDBfkGKkbK6/view?usp=sharing" }],
      },
    ],
  },
];

function CertButton({ a }: { a: Action }) {
  return (
    <motion.a
      href={a.href}
      target="_blank"
      rel="noopener noreferrer"
      data-variant={a.filled ? "primary" : "secondary"}
      className="font-display flex-1 min-w-0 inline-flex items-center justify-center rounded-[8px] border px-2 py-1.5 whitespace-nowrap transition hover:brightness-110"
      style={{
        background: a.filled ? "#946e52" : "transparent",
        color: a.filled ? "#fff" : "var(--foreground)",
        borderColor: "currentColor",
        boxShadow: "3px 3px 12px rgba(0,0,0,0.3)",
        fontSize: 12,
        fontWeight: 500,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {a.label}
    </motion.a>
  );
}

export function Certifications() {
  return (
    <Section id="certifications">
      <div className="flex flex-col gap-3 mb-10">
        <h2
          className="font-display inline-block self-start"
          style={{
            fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
            lineHeight: 1.2,
            fontWeight: 700,
            color: "var(--foreground)",
            borderBottom: "3px solid var(--accent-brand)",
            paddingBottom: "0.3em",
          }}
        >
          Certifications
        </h2>
        <p className="font-display" style={{ fontSize: 14, color: "var(--foreground)" }}>
          I learned UX/UI design, Front-end development, and digital marketing courses and got certificates.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {certRows.map((r) => (
          <div key={r.title} className="flex flex-col lg:flex-row gap-[40px] items-start">
            <div className="flex flex-col gap-5 items-start justify-center lg:flex-1">
              <div className="flex flex-col gap-1">
                <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)", lineHeight: 1.2 }}>
                  {r.title}
                </h3>
                <p className="font-display" style={{ fontSize: 13, color: "var(--foreground)" }}>{r.issuer}</p>
                <p className="font-display" style={{ fontSize: 13, color: "var(--foreground)" }}>{r.issued}</p>
              </div>
              {r.logo ? (
                r.logo.whiteCard || r.logo.darkCard || r.logo.lightCard ? (
                  <div
                    className="rounded-[12px] overflow-hidden flex items-center justify-center"
                    style={{
                      background: r.logo.darkCard ? "#1c140e" : r.logo.lightCard ? "#ffffff" : "var(--surface)",
                      padding: r.logo.darkCard ? 12 : 4,
                      width: "100%",
                      maxWidth: r.logo.w,
                      aspectRatio: `${r.logo.w} / ${r.logo.h}`,
                    }}
                  >
                    <img
                      src={r.logo.src}
                      alt={r.issuer}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <img
                    src={r.logo.src}
                    alt={r.issuer}
                    loading="lazy"
                    decoding="async"
                    className="object-contain"
                    style={{ width: "100%", maxWidth: r.logo.w, aspectRatio: `${r.logo.w} / ${r.logo.h}` }}
                  />
                )
              ) : null}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:flex-1">
              {r.images.map((img, i) => (
                <div key={i} className="flex flex-col gap-2" style={{ maxWidth: 180 }}>
                  <a
                    href={img.actions[0]?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[10px] overflow-hidden w-full block transition hover:brightness-110"
                    style={{ aspectRatio: `${img.w} / ${img.h}`, background: "var(--surface)" }}
                  >
                    <img
                      src={img.src}
                      alt={r.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <div className="flex gap-2 w-full">
                    {img.actions.map((a) => (
                      <CertButton key={a.label} a={a} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
