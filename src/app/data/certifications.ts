import imgPrompt from "../../imports/Certifications/5be78f1a79cbef3bc564fa68c6b139f2f752b153.png";
import imgGoogleLogo from "../../imports/Certifications/41b9e95b557c3da74bb1d0ceca00127931d499e7.png";
import imgGoogleDetails from "../../imports/Certifications/2d82f5db16e16df22946880a389eda334b2ab686.png";
import imgGoogleBadge from "../../imports/Certifications/b7976f8122d21b5d561fdc5c6281773328840e69.png";
import imgVanderbiltLogo from "../../imports/Certifications/bb0a364819916ed9825a78a005aa34d44e29d0f3.png";
import imgJohnsHopkinsLogo from "../../imports/Certifications/adc020019a1289f8f2186e09e93e7876edfe3f5d.png";
import imgWebDev from "../../imports/Certifications/7c9cee71188a6ee257d3f97dc636da04592217f2.png";
import imgIcdlLogo from "../../imports/Certifications/888058bbe0cb3dc508093d6058e33b1bf5e34f18.png";
import imgIcdlThailand from "../../imports/Certifications/af3dfde782bbe52134efeafa32a375794e623bab.png";
import imgIcdlAsia from "../../imports/Certifications/a9f3e12003157399b74f6f65d9b38a9e741b1fed.png";

export type CertAction = { label: string; href: string; filled?: boolean };

export type CertImg = { src: string; w: number; h: number };

export type CertRow = {
  title: string;
  issuer: string;
  issued: string;
  logo?: CertImg & { whiteCard?: boolean; darkCard?: boolean; lightCard?: boolean };
  images: { src: string; w: number; h: number; actions: CertAction[] }[];
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
