import wealthBg from "../../imports/WealthUpPage/eae313a48883a46e7a2a60ee806e73a8052191be.png";
import wealthCover from "../../imports/WealthUpPage/95c82e1d0a90e065aac80527ab897b3accc1c5ba.png";
import chocBg from "../../imports/ChocBanaPage/eae313a48883a46e7a2a60ee806e73a8052191be.png";
import chocCover from "../../imports/ChocBanaPage/3886b8406b0199ba6fd7d19f2fce4bf739c43683.png";
import aniBg from "../../imports/AniDrugsPage/eae313a48883a46e7a2a60ee806e73a8052191be.png";
import aniCover from "../../imports/AniDrugsPage/84213c8a1a7f7540399bdd805b3362bf7341b824.png";
import bookBg from "../../imports/BookBuffetPage/eae313a48883a46e7a2a60ee806e73a8052191be.png";
import bookCover from "../../imports/BookBuffetPage/f01949c08c080a220a2a5101729ad4e937255226.png";
import kkrBg from "../../imports/KkrPage/eae313a48883a46e7a2a60ee806e73a8052191be.png";
import kkrCover from "../../imports/KkrPage/3c5f2fce0a48dfa1ec7afa7b7aebecb6de52b33b.png";
import enonBg from "../../imports/EnonPage/eae313a48883a46e7a2a60ee806e73a8052191be.png";
import enonCover from "../../imports/EnonPage/67348ba3db652d0306491cd03fdb4c53082e75f8.png";
import enonLiteBg from "../../imports/EnonLitePage/eae313a48883a46e7a2a60ee806e73a8052191be.png";
import enonLiteCover from "../../imports/EnonLitePage/b04eb831ce95872b41d195bb0be2ce203d1894f4.png";
import rhiliBg from "../../imports/RhiliPage/eae313a48883a46e7a2a60ee806e73a8052191be.png";
import rhiliCover from "../../imports/RhiliPage/72e339a087fcb1c9bcde4fe47f1358d29bf8d080.png";
import starBg from "../../imports/StarbucksPage/eae313a48883a46e7a2a60ee806e73a8052191be.png";
import starCover from "../../imports/StarbucksPage/8074bda1d7137b12c927bba9eb3dbcb0894302c2.png";
import kriaBg from "../../imports/KriaPage/eae313a48883a46e7a2a60ee806e73a8052191be.png";
import kriaCover from "../../imports/KriaPage/1a3bd12f2eb0c44a388feaa28bf75b14f02fd05a.png";
import gcfiBg from "../../imports/GcFiPage/eae313a48883a46e7a2a60ee806e73a8052191be.png";
import gcfiCoverA from "../../imports/GcFiPage/13bb1669546c3334d6e12d9c7b46c41a32fd5304.png";
import gcfiCoverB from "../../imports/GcFiPage/75a5b36ca63f107ab14eac0b0d06e02610c29196.png";
import piaBg from "../../imports/PiaPage/eae313a48883a46e7a2a60ee806e73a8052191be.png";
import piaCover from "../../imports/PiaPage/e964c1b8942b6ea5974a1466b47fceb6364812df.png";
import justCover from "../../imports/JustPage/1bdd84ab3b9eb4e195e924761b263aea26cddc8c.png";
import justFinCover from "../../imports/JustFinPage/03a65bfd42f6130054b001afb81117c529cd5c4d.png";
import justInvestCover from "../../imports/JustInvestPage/415bfe6db5f035639333255fa19c810542ba235d.png";
import justServiceCover from "../../imports/JustServicePage/c76c13915578059468dc69dd30fbc96dfbb479b7.png";
import dmmsPeaCollage from "../../imports/DmmsPeaPage/dmms-pea-collage.png";
import logPoseCover from "../../imports/DmmsPeaPage/logpose-card-cover.png";
import dealerVisionCover from "../../imports/DealerVisionPage/dealervision-card-cover.png";
import hMeterCover from "../../imports/HMeterPage/hmeter-card-cover.png";
import pdpaAmarinCover from "../../imports/PdpaAmarinPage/pdpa-amarin-card-cover.png";
import oneTruthCover from "../../imports/OneTruthPage/1truth-card-cover.png";
import sasCardGameCover from "../../imports/SasCardGamePage/sas-cardgame-card-cover.png";
import peaLogin from "../../imports/CaseStudies/pea-login.webp";
import peaSubmission from "../../imports/CaseStudies/pea-submission.webp";
import peaInspection from "../../imports/CaseStudies/pea-inspection.webp";
import obLocation from "../../imports/CaseStudies/ob-location.webp";
import obSpecialHours from "../../imports/CaseStudies/ob-special-hours.webp";
import obState from "../../imports/CaseStudies/ob-state.webp";
import obNodes from "../../imports/CaseStudies/ob-nodes.webp";
import obAppHome from "../../imports/CaseStudies/ob-app-home.webp";
import obAppMap from "../../imports/CaseStudies/ob-app-map.webp";
import obAppMapIndoor from "../../imports/CaseStudies/ob-app-map-indoor.webp";
import obAppDirectory from "../../imports/CaseStudies/ob-app-directory.webp";
import amDashboard from "../../imports/CaseStudies/am-dashboard.webp";
import amDashboardDark from "../../imports/CaseStudies/am-dashboard-dark.webp";
import amExpiry from "../../imports/CaseStudies/am-expiry.webp";
import amConsent from "../../imports/CaseStudies/am-consent.webp";
import amFiles from "../../imports/CaseStudies/am-files.webp";
import dvLogin from "../../imports/CaseStudies/dv-login.webp";
import dvCrm from "../../imports/CaseStudies/dv-crm.webp";
import dvStockTransfer from "../../imports/CaseStudies/dv-stock-transfer.webp";
import dvSparePart from "../../imports/CaseStudies/dv-spare-part.webp";
import dvBilling from "../../imports/CaseStudies/dv-billing.webp";

import { projectGroups, type Project } from "./portfolio";

export type Action = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "appstore" | "playstore";
};

/**
 * A screen in the case-study layout.
 *
 * `frame` says how it was captured, not what it is: "plain" for artwork
 * that already sits on its own backdrop, "browser" for raw UI that needs a
 * window drawn round it, "mac" to stand a wide capture in a laptop, and
 * "phone" for handset captures. The PEA exports came out of Chrome with
 * real browser chrome in the frame, so those take "plain".
 */
export type Screenshot = {
  src: string;
  caption: string;
  frame: "plain" | "browser" | "mac" | "phone";
  /** Optional prose. Left off until there is something worth saying. */
  note?: string;
  /** Starts a new titled run of screens when it changes. */
  group?: string;
  /** Backdrop for "plain" frames, for artwork exported without one. */
  bg?: string;
};

/**
 * The long-form project layout. Projects that declare one get the full
 * treatment; everything else gets a minimal one synthesised from the
 * portfolio data (see buildStudy), so the detail view is consistent.
 */
export type CaseStudy = {
  subtitle?: string;
  /**
   * "pair" drops the hero/alternating rhythm and lays every screen out at
   * one size — side by side on a wide screen, stacked on a narrow one.
   * It is what a project wants when its artwork is a set of equals rather
   * than a lead shot plus supporting ones.
   */
  layout?: "pair";
  meta: { label: string; value: string }[];
  highlights?: string[];
  screens: Screenshot[];
};

export type ProjectDetail = {
  title: string;
  bg: string;
  cover: string;
  coverB?: string;
  coverC?: string;
  whiteCard?: boolean;
  description: string;
  note?: string;
  noteRed?: string;
  actions: Action[];
  study?: CaseStudy;
};

/**
 * One gold button per project, and a fixed order for the ones that repeat
 * across projects.
 *
 * Several projects grew a second and third primary as buttons were added
 * — Krispy Kreme had three — which leaves nothing looking like the main
 * action. So: "View more info" leads, then any prototype, then everything
 * else in the order it was written; the first button takes the gold and
 * every other primary steps down to secondary.
 *
 * A project with no primary at all is left alone: the store buttons on
 * Just super app carry their own colours and are not a hierarchy problem.
 */
function rank(label: string): number {
  // the destination itself leads: a live site where there is one, the
  // write-up where there is not. The two never appear on the same project.
  if (/^visit website/i.test(label) || /^view more info/i.test(label)) return 0;
  if (/prototype/i.test(label)) return 1;
  return 2;
}

export function orderedActions(actions: Action[]): Action[] {
  const sorted = actions
    .map((action, i) => ({ action, i }))
    .sort((a, b) => rank(a.action.label) - rank(b.action.label) || a.i - b.i)
    .map((x) => x.action);

  if (!sorted.some((a) => a.variant === "primary")) return sorted;

  return sorted.map((action, i) => {
    if (i === 0) return { ...action, variant: "primary" as const };
    return action.variant === "primary" ? { ...action, variant: "secondary" as const } : action;
  });
}

/**
 * Every project gets the case-study layout. Where one has not been written
 * by hand, this synthesises the least it needs from the index data: the
 * meta strip and whatever cover artwork exists, with the captions left
 * blank rather than invented.
 */
export function buildStudy(title: string, detail: ProjectDetail): CaseStudy {
  if (detail.study) return detail.study;

  let company: string | undefined;
  let project: Project | undefined;
  for (const group of projectGroups) {
    for (const sub of group.subGroups ?? []) {
      const hit = sub.items.find((p) => p.title === title);
      if (hit) {
        project = hit;
        company = sub.company;
      }
    }
    const hit = group.items?.find((p) => p.title === title);
    if (hit) {
      project = hit;
      company = group.company;
    }
  }

  const meta = [{ label: "Role", value: "UX/UI Designer" }];
  if (company) meta.push({ label: "At", value: company });
  if (project?.period) meta.push({ label: "Period", value: project.period });
  if (project?.type) meta.push({ label: "Platform", value: project.type });

  const screens: Screenshot[] = [detail.cover, detail.coverB, detail.coverC]
    .filter((src): src is string => Boolean(src))
    .map((src) => ({
      src,
      caption: "",
      frame: "plain" as const,
      bg: detail.whiteCard ? undefined : detail.bg,
    }));

  return { meta, screens, layout: screens.length > 1 ? "pair" : undefined };
}

export const projectDetails: Record<string, ProjectDetail> = {
  "Wealth Up": {
    title: "Wealth Up",
    bg: wealthBg,
    cover: wealthCover,
    description:
      "Wealth Up is a financial app that lets you invest in car loans, home loans, and startup capital. If you want more options for borrowing apart from financial institutions, Wealth Up is what you need.",
    actions: [
      {
        label: "View prototype",
        href: "https://www.figma.com/proto/WiykpfT8AeBWf7rsfQz5aE/Wealth-Up?page-id=0%3A1&type=design&node-id=456-5230&viewport=426%2C487%2C0.03&t=VqnCHi9p8ntDN1ti-1&scaling=scale-down&starting-point-node-id=456%3A5230&mode=design",
        variant: "primary",
      },
      {
        label: "View UX",
        href: "https://drive.google.com/file/d/1OOd9pGFcBj1rdt_Ymr5ZKIgUKVwqcRsV/view?usp=sharing",
        variant: "secondary",
      },
      {
        label: "View Figma file",
        href: "https://www.figma.com/file/WiykpfT8AeBWf7rsfQz5aE/Wealth-Up?type=design&node-id=0%3A1&mode=design&t=UVaVgcXWD9Sczajx-1",
        variant: "secondary",
      },
    ],
  },
  ChocBana: {
    title: "ChocBana",
    bg: chocBg,
    cover: chocCover,
    description:
      "ChocBana is a colorful shopping app that follows vertical media trends. Make your online store easier to work with without having to crop the size of your images and videos. And the buyers can share the product's experience by chatting.",
    actions: [
      {
        label: "View prototype",
        href: "https://www.figma.com/proto/Nw4V7hl4EDsQgiECb506Km/ChocBana?page-id=0%3A1&type=design&node-id=28-1100&viewport=-1852%2C371%2C0.49&t=DUmr2dXe266Y9XR8-1&scaling=scale-down&starting-point-node-id=28%3A1100&mode=design",
        variant: "primary",
      },
      {
        label: "View UX",
        href: "https://drive.google.com/file/d/15o-5wMHnC6qltrGRT4NcHermFK-VgoS2/view?usp=sharing",
        variant: "secondary",
      },
      {
        label: "View Figma file",
        href: "https://www.figma.com/file/Nw4V7hl4EDsQgiECb506Km/ChocBana?type=design&node-id=0%3A1&mode=design&t=h7ZD7cJgCh9Wn6xB-1",
        variant: "secondary",
      },
    ],
  },
  AniDrugs: {
    title: "AniDrugs",
    bg: aniBg,
    cover: aniCover,
    description:
      "AniDrugs is an app about drugs for the livestock (animals for agriculture) market. This app has a mini social network that allows veterinarians, livestock farmers, and sellers of drugs for livestock to share their knowledge.",
    note: "*ภาษาไทย",
    actions: [
      {
        label: "View prototype",
        href: "https://www.figma.com/proto/uDpKjL1Hbsyyl0GfNty8ua/Anidrugs?page-id=0%3A1&type=design&node-id=84-768&viewport=383%2C265%2C0.1&t=BoB3PY0OUcC77CHL-1&scaling=scale-down&starting-point-node-id=84%3A768&mode=design",
        variant: "primary",
      },
      {
        label: "View UX",
        href: "https://drive.google.com/file/d/1DAQfbDKVkYvqdD9uZIolvPBxLqUH-EHj/view?usp=sharing",
        variant: "secondary",
      },
      {
        label: "View Figma file",
        href: "https://www.figma.com/file/uDpKjL1Hbsyyl0GfNty8ua/Anidrugs?type=design&node-id=0%3A1&mode=design&t=pqODznq6uA8ZP9OU-1",
        variant: "secondary",
      },
    ],
  },
  "Book Buffet": {
    title: "Book Buffet",
    bg: bookBg,
    cover: bookCover,
    description:
      "Book Buffet is an NFT Books marketplace app. This app lets you collect your favorite books as NFTs. You can also buy subscription tokens to rent any number of books like Buffet.",
    actions: [
      {
        label: "View prototype (Desktop)",
        href: "https://www.figma.com/proto/gXZaTH8qGx7p8R8qVAz18y/BookBuffet?page-id=23%3A1083&type=design&node-id=23-1084&viewport=178%2C576%2C0.15&t=sGZ4DqRFPWa8fZys-1&scaling=scale-down&starting-point-node-id=23%3A1155&mode=design",
        variant: "primary",
      },
      {
        label: "View Figma file (Desktop)",
        href: "https://www.figma.com/file/gXZaTH8qGx7p8R8qVAz18y/BookBuffet?type=design&node-id=23%3A1083&mode=design&t=Wouuqtf4cLRzaUOB-1",
        variant: "secondary",
      },
      {
        label: "View prototype (Mobile)",
        href: "https://www.figma.com/proto/gXZaTH8qGx7p8R8qVAz18y/BookBuffet?page-id=0%3A1&type=design&node-id=1-38&viewport=377%2C324%2C0.34&t=BOD0ujUDALjrJhbM-1&scaling=scale-down&starting-point-node-id=1%3A38&mode=design",
        variant: "primary",
      },
      {
        label: "View Figma file (Mobile)",
        href: "https://www.figma.com/file/gXZaTH8qGx7p8R8qVAz18y/BookBuffet?type=design&node-id=23%3A1552&mode=design&t=Wouuqtf4cLRzaUOB-1",
        variant: "secondary",
      },
    ],
  },
  "Starbucks website redesign": {
    title: "Starbucks website redesign",
    bg: starBg,
    cover: starCover,
    description:
      "I redesigned the Starbucks website to make the most viewed menus show on the first page. Easier to find the most viewed menus.",
    note: "* This project is not the official Starbucks website and is not affiliated with any Starbucks companies. It is solely my personal design.",
    actions: [
      {
        label: "View prototype (Desktop)",
        href: "https://www.figma.com/proto/HC2fcNeLWe0OUAqS0CRtkE/Starbucks-desktop-website-redesign?page-id=0%3A1&type=design&node-id=13-261&viewport=212%2C271%2C0.09&t=BW76oF9UQHXHvEZE-1&scaling=scale-down&starting-point-node-id=13%3A261&mode=design",
        variant: "primary",
      },
      {
        label: "View Figma file (Desktop)",
        href: "https://www.figma.com/file/HC2fcNeLWe0OUAqS0CRtkE/Starbucks-desktop-website-redesign?type=design&node-id=0%3A1&mode=design&t=eVxDrCQkdipPbl32-1",
        variant: "secondary",
      },
      {
        label: "View prototype (Mobile)",
        href: "https://www.figma.com/proto/HC2fcNeLWe0OUAqS0CRtkE/Starbucks-desktop-website-redesign?page-id=17%3A264&type=design&node-id=17-265&viewport=369%2C201%2C0.35&t=dUl9wXZ9wQYqBaFW-1&scaling=scale-down&starting-point-node-id=17%3A265&mode=design",
        variant: "primary",
      },
      {
        label: "View Figma file (Mobile)",
        href: "https://www.figma.com/file/HC2fcNeLWe0OUAqS0CRtkE/Starbucks-desktop-website-redesign?type=design&node-id=17%3A264&mode=design&t=eVxDrCQkdipPbl32-1",
        variant: "secondary",
      },
    ],
  },
  "Krispy Kreme Rewards website": {
    title: "Krispy Kreme Rewards website",
    bg: kkrBg,
    cover: kkrCover,
    description:
      "This is the Krispy Kreme Thailand's membership website. It's a project while I worked as an intern.",
    note: "* My internship ended before the website launch. The company is still developing this project at this time.",
    actions: [
      {
        label: "View more info",
        href: "https://drive.google.com/file/d/1HtJgCNUeX5yl8shqQgd9slFCi9H-xLKl/view?usp=sharing",
        variant: "primary",
      },
      {
        label: "View prototype (Desktop)",
        href: "https://www.figma.com/proto/24KHHfYbXiBVv7AwzglBOX/Krispy-Kreme-web?page-id=517%3A18282&type=design&node-id=517-18820&viewport=418%2C611%2C0.19&t=n0ZXHJwXj2eSn7l3-1&scaling=contain&starting-point-node-id=517%3A18820&mode=design",
        variant: "primary",
      },
      {
        label: "View Figma file (Desktop)",
        href: "https://www.figma.com/file/24KHHfYbXiBVv7AwzglBOX/Krispy-Kreme-web?type=design&node-id=517%3A18282&mode=design&t=gWT2uS64RaFvmlFm-1",
        variant: "secondary",
      },
      {
        label: "View prototype (Mobile)",
        href: "https://www.figma.com/proto/24KHHfYbXiBVv7AwzglBOX/Krispy-Kreme-web?page-id=517%3A19051&type=design&node-id=517-19648&viewport=-404%2C407%2C0.23&t=u4pOsfMiYoizVpZT-1&scaling=scale-down&starting-point-node-id=517%3A19648&mode=design",
        variant: "primary",
      },
      {
        label: "View Figma file (Mobile)",
        href: "https://www.figma.com/file/24KHHfYbXiBVv7AwzglBOX/Krispy-Kreme-web?type=design&node-id=517%3A19051&mode=design&t=gWT2uS64RaFvmlFm-1",
        variant: "secondary",
      },
    ],
  },
  "ENON (Landing page)": {
    title: "ENON (Landing page)",
    bg: enonBg,
    cover: enonCover,
    description:
      "This is the coded structure responsive. ENON is an accounting and inventory management browser based for businesses.",
    actions: [
      {
        label: "View more info",
        href: "https://drive.google.com/file/d/1aSRtrBrDoOe-XqwNIucyDW5dm4VMUE9U/view?usp=sharing",
        variant: "primary",
      },
    ],
  },
  "ENON Lite": {
    title: "ENON Lite",
    bg: enonLiteBg,
    cover: enonLiteCover,
    description:
      "For selling to SME businesses, the ENON Lite version (browser based) is a small version of ENON that removes some functions from the full version that are not necessary to SMEs and has a more beautiful friendly interface.",
    actions: [
      {
        label: "View more info",
        href: "https://drive.google.com/file/d/1uP5ni_WAvT_-1hTjrc4M-vU-nRR3F8I9/view?usp=sharing",
        variant: "primary",
      },
      {
        label: "View prototype",
        href: "https://www.figma.com/proto/4jRzfqZpLbO6UQyaRXnk4c/ENON-Program?page-id=0%3A1&type=design&node-id=116-2535&viewport=-4538%2C3280%2C0.22&t=ZzuUhEk189Xx4V6L-1&scaling=contain&starting-point-node-id=116%3A2535&mode=design",
        variant: "primary",
      },
      {
        label: "View Figma file",
        href: "https://www.figma.com/file/4jRzfqZpLbO6UQyaRXnk4c/ENON-Program?type=design&node-id=0%3A1&mode=design&t=gVfgn0PnrNDzOAxn-1",
        variant: "secondary",
      },
    ],
  },
  "RHILI (Landing page)": {
    title: "RHILI (Landing page)",
    bg: rhiliBg,
    cover: rhiliCover,
    description:
      "RHILI is a live streaming application that can stream to many social platforms at the same time. And has an A.I. to detect keywords of selling and buying comments to manage inventory.",
    actions: [
      {
        label: "View more info",
        href: "https://drive.google.com/file/d/1tgkJE3nQJh5RJ7HbXRrFYZIZJjmcmYpT/view?usp=sharing",
        variant: "primary",
      },
    ],
  },
  "KRIA (Landing page)": {
    title: "KRIA (Landing page)",
    bg: kriaBg,
    cover: kriaCover,
    description:
      "KRIA is a jobs matcher that matches by AI application. You can chatting with the bot to create resume and pre-interview with it before interviewing with employer.",
    actions: [
      {
        label: "View more info",
        href: "https://drive.google.com/file/d/14jRTqcdqfslvoGlrFZW7yd22J4qPGP7j/view?usp=sharing",
        variant: "primary",
      },
      {
        label: "View UX",
        href: "https://drive.google.com/file/d/1M7Upd-SN7HPO-UDR5riCA9hRO2vhijh6/view?usp=sharing",
        variant: "secondary",
      },
    ],
  },
  "GCFi [Golden Cloud Finance]": {
    title: "GCFi [Golden Cloud Finance]",
    bg: gcfiBg,
    cover: gcfiCoverA,
    coverB: gcfiCoverB,
    description:
      "GCFi is a cryptocurrency finance app and website that provides the most of features that people want to use in one app with a simple interface. Give you more security with a hardware wallet connection.",
    actions: [
      {
        label: "View UX (Website)",
        href: "https://drive.google.com/file/d/1hFPP-PEb3R9w77S_NtKLdnkIIhFfriHW/view?usp=sharing",
        variant: "secondary",
      },
      {
        label: "View prototype (App)",
        href: "https://www.figma.com/proto/opjEgGjmmCDxkSpBGJjcaj/GC-Finance-hifi?page-id=0%3A1&type=design&node-id=135-1588&viewport=38%2C839%2C0.31&t=MNYQKlM03TuAM1J4-1&scaling=scale-down&starting-point-node-id=135%3A1588&mode=design",
        variant: "primary",
      },
      {
        label: "View UX (App)",
        href: "https://drive.google.com/file/d/1ANrldD3iKwgvfb8bdrj-V7tK1PbX-IIl/view?usp=sharing",
        variant: "secondary",
      },
      {
        label: "View Figma file (App)",
        href: "https://www.figma.com/file/opjEgGjmmCDxkSpBGJjcaj/GC-Finance-hifi?type=design&node-id=0%3A1&mode=design&t=7qYAnU8Xgm9zWSPm-1",
        variant: "secondary",
      },
    ],
  },
  "PIA [Pay It All]": {
    title: "PIA [Pay It All]",
    bg: piaBg,
    cover: piaCover,
    description:
      "PIA (Pay It All) is a financial app where you can pay all the subscriptions and bills in alternative currencies in one app.",
    actions: [
      {
        label: "View prototype",
        href: "https://www.figma.com/proto/ViMFUlW1krJq2FVscT5g6L/PIA?page-id=0%3A1&type=design&node-id=1-331&viewport=424%2C345%2C0.17&t=1qZlUIxrmNZRuViH-1&scaling=min-zoom&starting-point-node-id=1%3A331&mode=design",
        variant: "primary",
      },
      {
        label: "View UX",
        href: "https://drive.google.com/file/d/1_3NsBty94UlGtfSwE1lQniIW3GIAkcPh/view",
        variant: "secondary",
      },
      {
        label: "View Figma file",
        href: "https://www.figma.com/file/ViMFUlW1krJq2FVscT5g6L/PIA?type=design&node-id=0%3A1&mode=design&t=cWuuDRTcpAdHtVum-1",
        variant: "secondary",
      },
    ],
  },
  "Just super app (Revamp)": {
    title: "Just (Super app)",
    bg: "",
    cover: justCover,
    whiteCard: true,
    description:
      "Just is a super app that provides a cars market, car bidding (now available), and car loans, home loans, and car services (in the future). The company's target is to make this app all about Thailand's second-hand cars complete service.",
    note: "The app is now available to download.",
    actions: [
      {
        label: "Download on App store",
        href: "https://apps.apple.com/th/app/just/id1633206350?l=th",
        variant: "appstore",
      },
      {
        label: "Download on Play store",
        href: "https://play.google.com/store/apps/details?id=com.justcar.justcar",
        variant: "playstore",
      },
      {
        label: "View Figma file",
        href: "https://www.figma.com/design/f2MjULw4rHH5U4OLp9Nlyw/Just?node-id=0-1&p=f&t=dmpSHO551NdGMTqG-0",
        variant: "secondary",
      },
    ],
  },
  "Just Fin": {
    title: "Just Fin",
    bg: "",
    cover: justFinCover,
    whiteCard: true,
    description:
      "Just Fin is an app-specific for investors who want to provide car loans, and home loans, and give funds to businesses.",
    noteRed:
      "* This project is still in development. I can't share more details because of the company's asset policies.",
    actions: [],
  },
  "Just invest (Just Fin)": {
    title: "Just Invest (Landing page)",
    bg: "",
    cover: justInvestCover,
    whiteCard: true,
    description:
      "Just Invest is the landing page website of the Just Fin app.\nThis website shows the initial information of the app and a link to download the app.",
    note: "* Just Invest is the old name of Just Fin due to the financial services law of Thailand, The company will change it later.",
    actions: [{ label: "Visit website", href: "https://justfin.co.th/", variant: "primary" }],
  },
  "Just service": {
    title: "Just Service",
    bg: "",
    cover: justServiceCover,
    whiteCard: true,
    description:
      "Just Service is an app specific for riders or mechanics to provide car services like tire changes, petrol refills, and more, operating under the Just Car brand.",
    noteRed:
      "* This project is still in development. I can't share more details because of the company's asset policies.",
    actions: [],
  },
  "DMMS-PEA": {
    title: "DMMS-PEA",
    bg: dmmsPeaCollage,
    cover: dmmsPeaCollage,
    study: {
      subtitle:
        "A grid-connected renewable energy platform for Thailand's Provincial Electricity Authority",
      meta: [
        { label: "Role", value: "UX/UI Designer" },
        { label: "Client", value: "Provincial Electricity Authority (PEA)" },
        { label: "At", value: "The Island Digital Solution" },
        { label: "Period", value: "Mar.2025 - Present" },
        { label: "Platform", value: "Responsive website" },
      ],
      highlights: [
        "Registration, inspection and contract flows for VSPP renewable producers",
        "Document submission with queue booking and walk-in scheduling",
        "Bilingual interface — Thai content with a TH/EN switch",
        "User flows mapped on a FigJam board before any UI was drawn",
        "A Figma design system covering components, tokens and states",
      ],
      screens: [
        {
          src: peaLogin,
          caption: "Authentication",
          frame: "mac",
          note: "Producers sign in with Thailand's Digital ID or a DMMS account. Juristic persons are pushed to Digital ID, which is the route the regulator trusts.",
        },
        {
          src: peaSubmission,
          caption: "Document submission and queue booking",
          frame: "plain",
          note: "Step 7 of the purchase process. The applicant picks a date inside the open window, or books a walk-in slot, and the table below tracks every document already handed in.",
        },
        {
          src: peaInspection,
          caption: "Power plant inspection",
          frame: "plain",
          note: "Officers filter 600+ plants by name, project area, last inspection date and status, then work the list from the table.",
        },
      ],
    },
    description:
      "DMMS (DERs Management and Monitoring System) is a platform for the Provincial Electricity Authority (PEA) that lets individuals and juristic persons sell electricity they generate themselves, such as from solar cells, back into the grid. It handles registration, inspection, and contract management for renewable energy producers.",
    actions: [
      { label: "Visit website", href: "https://dmms-dev.pea.co.th/", variant: "primary" },
      {
        label: "View design system",
        href: "https://www.figma.com/design/wH4Ep2Fe0DI8PxwoR9WbNt/PEA-DMMS-Design-System?m=auto&t=33VXgN0JpVynazuK-6",
        variant: "secondary",
      },
      {
        label: "Sample Prototype",
        href: "https://www.figma.com/proto/f6jHbaHAC3dSNxtU9GMxWc/PEA-UI-x-WF--Prototype-?node-id=5-143827&p=f&t=LnVHxDGnrJxXPBJW-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=5%3A143827&show-proto-sidebar=1&page-id=3%3A2",
        variant: "secondary",
      },
      {
        label: "Sample User Flows",
        href: "https://www.figma.com/board/HOH23t3b6xNVgIYAHnOfep/User-Flows?node-id=0-1&p=f&t=SmuQyKp4NIR6onqN-0",
        variant: "secondary",
      },
    ],
  },
  "Log Pose - One Bangkok": {
    title: "Log Pose - One Bangkok",
    bg: logPoseCover,
    cover: logPoseCover,
    study: {
      subtitle:
        "The back-office CMS that places every shop and venue on the One Bangkok map",
      meta: [
        { label: "Role", value: "UX/UI Designer" },
        { label: "Client", value: "One Bangkok" },
        { label: "At", value: "The Island Digital Solution" },
        { label: "Period", value: "Mar.2025 - Present" },
        { label: "Platform", value: "Responsive website and mobile app" },
      ],
      highlights: [
        "Every location record is authored in three languages — English, Thai and Chinese",
        "Regular and special opening hours, with per-day overrides and apply-to-all",
        "Location states scheduled between a start and end date",
        "Per-node hours that inherit from the parent location or override it",
        "UI adjustments to the map menu in the One Bangkok app itself",
      ],
      screens: [
        {
          src: obLocation,
          caption: "Location information and regular hours",
          frame: "mac",
          note: "One record per shop or venue: names in three languages, type, nodes, relationships to other locations, then a full week of opening hours with an apply-to-all shortcut.",
        },
        {
          src: obSpecialHours,
          caption: "Special hours",
          frame: "browser",
          group: "Back-office CMS",
          note: "Date-ranged overrides for holidays and events, each with its own on/off switch, so the regular week never has to be edited.",
        },
        {
          src: obState,
          caption: "Location state scheduling",
          frame: "browser",
          group: "Back-office CMS",
          note: "States such as renovation or coming-soon are scheduled between a start and an end date, and stack when they overlap.",
        },
        {
          src: obNodes,
          caption: "Per-node hours",
          frame: "browser",
          group: "Back-office CMS",
          note: "A location can span several nodes on the map. Each node either inherits the parent hours or breaks away with its own.",
        },
        {
          src: obAppHome,
          caption: "App home",
          frame: "phone",
          group: "The app the CMS feeds",
          note: "The shortcut grid the CMS content surfaces in — promotions, dining, rewards and the map.",
        },
        {
          src: obAppMap,
          caption: "Project map",
          frame: "phone",
          group: "The app the CMS feeds",
          note: "The whole One Bangkok site as a 3D map, with a building picker and a floor selector. Every pin here is a record placed in Log Pose.",
        },
        {
          src: obAppMapIndoor,
          caption: "Indoor wayfinding",
          frame: "phone",
          group: "The app the CMS feeds",
          note: "Down to floor level, with the visitor's own position — the node positions set in the CMS are what put the shops where they are.",
        },
        {
          src: obAppDirectory,
          caption: "Building directory",
          frame: "phone",
          group: "The app the CMS feeds",
          note: "Browsing by building. This is the map menu section whose UI I adjusted.",
        },
      ],
    },
    description:
      "Log Pose is a back-office web app for the One Bangkok app, used by staff to set the position of each shop and location within the One Bangkok project area. It also includes some UI adjustments to the map menu section of the app itself.",
    actions: [
      { label: "Visit website", href: "https://log-pose.vitalsea.net/", variant: "primary" },
      {
        label: "View Figma",
        href: "https://www.figma.com/design/DVI8SZzg7AbTa2RuahFMY2/Logpose-CMS?t=srMvrYsBJBp7QiEX-0",
        variant: "secondary",
      },
      {
        label: "Download on App store",
        href: "https://apps.apple.com/th/app/one-bangkok/id6475669593",
        variant: "appstore",
      },
      {
        label: "Download on Play store",
        href: "https://play.google.com/store/apps/details?id=com.onebangkok.prod&pcampaignid=web_share",
        variant: "playstore",
      },
    ],
  },
  "Dealer Vision": {
    title: "Dealer Vision",
    bg: dealerVisionCover,
    cover: dealerVisionCover,
    study: {
      subtitle:
        "An all-in-one dealer management system running dealerships for Hino, Nissan, Suzuki and Ford Thailand",
      meta: [
        { label: "Role", value: "UX/UI Designer" },
        { label: "Client", value: "SeniorCom" },
        { label: "At", value: "SeniorCom" },
        { label: "Period", value: "Jan.2024 - Mar.2025" },
        { label: "Platform", value: "Responsive website" },
      ],
      highlights: [
        "Nine modules under one roof — CRM, Sales, Stock, Service, Spare parts, Accounting, Inspection and Master data",
        "A customer profile that centres on the vehicle: notes, service history and complaints in one view",
        "Vehicle stock transfers tracked between branches with a full status and cancellation trail",
        "Spare-part receiving reconciled against shipment number, tax invoice and logistics company",
        "Accounts receivable — bill placement letters — tracked from waiting to received to cancelled",
      ],
      screens: [
        {
          src: dvLogin,
          caption: "Sign in",
          frame: "mac",
          note: "Google SSO or a username, plus the dealership's own call-centre details on the same screen for anyone locked out.",
        },
        {
          src: dvCrm,
          caption: "Customer profile",
          frame: "browser",
          note: "Search finds or creates a customer in one step; the profile that opens keeps vehicles, notes and a colour-coded activity feed together rather than behind separate tabs.",
        },
        {
          src: dvStockTransfer,
          caption: "Vehicle stock transfer",
          frame: "browser",
          note: "Every transfer between branches or parking areas, who moved it, and whether it completed, is still in transit, or was cancelled.",
        },
        {
          src: dvSparePart,
          caption: "Spare part receiving",
          frame: "browser",
          note: "Incoming shipments are matched against tax invoice, delivery note and logistics company before they are accepted into stock.",
        },
        {
          src: dvBilling,
          caption: "Bill placement letter",
          frame: "browser",
          note: "Accounts receivable for the dealership — amount, status and who cancelled it when one falls through.",
        },
      ],
    },
    description:
      "Dealer Vision is a dealer management system for automotive dealerships, covering stock, spare parts, and various after-sales services. Its key clients include Hino Thailand, Nissan Thailand, Suzuki Thailand, and Ford Thailand.",
    actions: [
      {
        label: "Visit website",
        href: "https://seniorcom.club/DealerVisionStandardGateway/Frontend/Identity/Login",
        variant: "primary",
      },
      {
        label: "View Design System",
        href: "https://www.figma.com/design/XXhNUqrFJMmcwfPbkzThug/DV-Design-System-2024--Butter-_-Boom-?node-id=386-2399&p=f&t=tklOoStnpJOg9nlK-0",
        variant: "secondary",
      },
    ],
  },
  "H-Meter": {
    title: "H-Meter",
    bg: hMeterCover,
    cover: hMeterCover,
    description:
      "H-Meter is a credit management system for various types of credit companies. Its clients include Srisawad Capital, Worldlease, and ECL Auto Cash.",
    actions: [
      { label: "Visit website", href: "https://seniorcom.club/standardnewpayment", variant: "primary" },
    ],
  },
  "PDPA Manager - Amarin": {
    study: {
      subtitle:
        "A personal-data file manager built to keep Amarin Group inside Thailand's PDPA",
      meta: [
        { label: "Role", value: "UX/UI Designer" },
        { label: "Client", value: "Amarin Group" },
        { label: "At", value: "The Island Digital Solution" },
        { label: "Period", value: "Mar.2025 - Present" },
        { label: "Platform", value: "Responsive website" },
      ],
      highlights: [
        "A dashboard covering file types, data sources, monthly trend and consent status",
        "Retention periods per file, with an expiry countdown and a calendar of what lapses when",
        "Consent requests tracked by channel — email, SMS or in-app — and approved or rejected in place",
        "Data-store locations plotted on a map of Thailand, grouped by region",
        "Light and dark themes across the whole system",
      ],
      screens: [
        {
          src: amDashboard,
          caption: "System overview",
          frame: "mac",
          note: "Everything the data protection officer needs on one screen: what file types are held, where they came from, the six-month trend, and how many consents are still outstanding.",
        },
        {
          src: amExpiry,
          caption: "Expiry calendar",
          frame: "browser",
          note: "Retention periods land on a month view, so the days when files lapse are visible before they arrive rather than after.",
        },
        {
          src: amFiles,
          caption: "File management",
          frame: "browser",
          note: "Every file with its data subject, category, expiry date and days left. Anything inside the warning window flags itself as expiring.",
        },
        {
          src: amConsent,
          caption: "Consent requests",
          frame: "browser",
          note: "Requests are tracked by the channel they went out on and cleared or refused from the row itself.",
        },
        {
          src: amDashboardDark,
          caption: "Dark theme and navigation",
          frame: "browser",
          note: "The same dashboard in dark, with the section drawer open. Both themes were drawn as one system rather than as an afterthought.",
        },
      ],
    },
    title: "PDPA Manager - Amarin",
    bg: pdpaAmarinCover,
    cover: pdpaAmarinCover,
    description:
      "PDPA Manager is a document management program related to PDPA compliance for Amarin Group. This project was designed entirely using Figma Make (AI).",
    noteRed: "* This project is still under negotiation regarding pricing and timeline.",
    actions: [
      {
        label: "Visit website",
        href: "https://nectar-navy-87091056.figma.site/",
        variant: "primary",
      },
    ],
  },
  "1truth": {
    title: "1truth",
    bg: oneTruthCover,
    cover: oneTruthCover,
    description:
      "1truth is a website about the universe's truths — everything about the cosmos and existence that humans should know.",
    noteRed: "* Please read the terms and consider your readiness before viewing.",
    actions: [{ label: "Visit website", href: "https://1truth.io", variant: "primary" }],
  },
  "SAS Card game": {
    title: "Soul & Spell",
    bg: sasCardGameCover,
    cover: sasCardGameCover,
    description: "Soul & Spell is a personal card game project, covering the visual design and card system.",
    actions: [
      {
        label: "View Figma",
        href: "https://www.figma.com/design/8rqARVPGs1bAk5WN7dI3Zo/Card?node-id=0-1&p=f&t=0He1qeVHKHK1DSFB-0",
        variant: "primary",
      },
    ],
  },
};
