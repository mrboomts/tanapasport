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

export type Action = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "appstore" | "playstore";
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
};

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
    actions: [{ label: "Go to the site", href: "https://justfin.co.th/", variant: "primary" }],
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
    description:
      "Log Pose is a back-office web app for the One Bangkok app, used by staff to set the position of each shop and location within the One Bangkok project area. It also includes some UI adjustments to the map menu section of the app itself.",
    actions: [
      { label: "Visit website", href: "https://log-pose.vitalsea.net/", variant: "primary" },
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
    description:
      "Dealer Vision is a dealer management system for automotive dealerships, covering stock, spare parts, and various after-sales services. Its key clients include Hino Thailand, Nissan Thailand, Suzuki Thailand, and Ford Thailand.",
    actions: [
      {
        label: "Visit site",
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
      { label: "Visit site", href: "https://seniorcom.club/standardnewpayment", variant: "primary" },
    ],
  },
  "PDPA Manager - Amarin": {
    title: "PDPA Manager - Amarin",
    bg: pdpaAmarinCover,
    cover: pdpaAmarinCover,
    description:
      "PDPA Manager is a document management program related to PDPA compliance for Amarin Group. This project was designed entirely using Figma Make (AI).",
    noteRed: "* This project is still under negotiation regarding pricing and timeline.",
    actions: [
      {
        label: "Visit site",
        href: "https://www.figma.com/make/WqdS2wWt3NRFC9YdpLNxFR/PDPA-File-Management-Features--Copy-?p=f&t=omyucMblZwmTXeJ6-0",
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
    actions: [{ label: "Visit site", href: "https://1truth.io", variant: "primary" }],
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
