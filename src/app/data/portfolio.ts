export const profile = {
  greeting: "Hello, I'm",
  fullName: "Tanapas Suppamongkol",
  nickname: "Boom",
  role: "UX/UI Designer",
  intro:
    "Welcome to my portfolio.\nThis portfolio shows my experience, projects, certifications, and information about me.\nI hope you understand me more and let's connect.",
  experienceIntro:
    "I changed my career field. At first, I worked in the banking sector as an Assistant Relationship Manager (Credit Analyst). I recognize the growth opportunities in this field and like it. I decided to start learning and eventually changed my career field to become a UX/UI Designer.",
  resumeUrl: "https://drive.google.com/file/d/1VO2XaVt02cob08jPOEcDQC7AzR0Cz-eb/view",
  birthday: "16 Feb 1991",
  address: "Samutprakarn, Thailand",
  email: "tanapas.sup@gmail.com",
  phone: "065-857-1555",
  linkedin: {
    label: "Tanapas Suppamongkol",
    url: "https://www.linkedin.com/in/tanapas-suppamongkol-1958b5212/",
  },
  languages: [
    { name: "Thai", level: "Native" },
    { name: "English", level: "Intermediate" },
    { name: "Japanese", level: "Beginner" },
  ],
  about:
    "I'm Tanapas Suppamongkol, known as Boom. I graduated from Kasetsart University with a major in Operations Management from the Faculty of Business Administration. After graduation, I worked for approximately 5 years in the banking sector, serving as a Relationship Officer and Assistant Relationship Manager (Credit Analyst).\n\nIn today's world, where smartphones have integrated into our daily lives, I continually find myself questioning the design of applications and websites. As time progressed, I discovered the career field of \"UX/UI Design\" and recognized the growth opportunities within it, then I decided on a learning journey, ultimately leading to a successful career transition from banker to UX/UI Designer.",
  skills: [
    "AI","Claude","Vercel","Supabase","Git","Midjourney","Lovable","Suno","ChatGPT","Gemini","Grok",
    "Figma","Adobe XD","Adobe Illustrator","Adobe Photoshop",
    "Affinity Designer","Affinity Photo","Prototype","Wireframes","User flow",
    "User journey","Persona","HTML","CSS","Javascript","SCSS","Bootstrap",
    "Youtube","SEO","Google analytics","Investment","Financial analyzing",
  ],
};

/** Same skills as profile.skills, grouped so they can be scanned rather
 *  than watched scrolling past. */
export const skillGroups = [
  {
    label: "Design",
    items: ["Figma", "Adobe XD", "Adobe Illustrator", "Adobe Photoshop", "Affinity Designer", "Affinity Photo"],
  },
  {
    label: "Method",
    items: ["Wireframes", "Prototype", "User flow", "User journey", "Persona", "Design systems"],
  },
  {
    label: "Build",
    items: ["HTML", "CSS", "SCSS", "Javascript", "Bootstrap", "Git", "Vercel", "Supabase"],
  },
  {
    label: "AI",
    items: ["Claude", "ChatGPT", "Gemini", "Grok", "Midjourney", "Lovable", "Suno", "Vibe coding"],
  },
  {
    label: "Growth & analysis",
    items: ["SEO", "Google analytics", "Youtube", "Investment", "Financial analyzing"],
  },
];

/** Organisations the products I designed were delivered for — used by the
 *  ticker band. Ordered roughly by recency. */
export const organisations: { name: string; full?: string }[] = [
  { name: "PEA", full: "Provincial Electricity Authority" },
  { name: "One Bangkok" },
  { name: "Amarin Group" },
  { name: "Hino Thailand" },
  { name: "Nissan Thailand" },
  { name: "Suzuki Thailand" },
  { name: "Ford Thailand" },
  { name: "Srisawad Capital" },
  { name: "Worldlease" },
  { name: "ECL Auto Cash" },
  { name: "Just Car" },
  { name: "Krispy Kreme Thailand" },
];

export type ExperienceEntry = {
  role: string;
  company?: string;
  companies?: { name: string; period: string }[];
  period?: string;
  description: string;
  skills: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "UX/UI Designer",
    companies: [
      { name: "The Island Digital Solution", period: "Mar.2025 - Present" },
      { name: "SeniorCom", period: "Jan.2024 - Mar.2025" },
      { name: "Just Car", period: "Dec.2022 - Oct.2023" },
    ],
    description: "UX/UI designing applications and responsive websites.",
    skills: ["Figma","Adobe XD","Wireframes","Prototype","User flows","User journey map","Responsive site","AI","Vibe Coding"],
  },
  {
    role: "UX/UI Designer (Internship)",
    company: "Probatus",
    period: "Jun.2022 - Aug.2022",
    description: "Designed responsive landing pages and dashboards for clients.",
    skills: ["Figma","Adobe XD","Wireframes","Prototype","User flows","User journey map","Responsive site","Persona","Coding","HTML","CSS","SCSS","Javascript","Bootstrap"],
  },
  {
    role: "Assistant Relationship Manager",
    companies: [
      { name: "Land and house Bank (LH Bank)", period: "Jul.2019 - May.2021" },
      { name: "Kasikorn Leasing (KLeasing)", period: "Sep.2018 - Jul.2019" },
    ],
    description: "Credit analyzing for business loans, and Coordinating between bank and customer.",
    skills: ["Company analyzing","Financial analyzing","Coordinating","Risk management"],
  },
  {
    role: "Relationship Officer",
    company: "Bangkok Bank (BBL)",
    period: "Sep.2018 - Jul.2019",
    description: "Business loan credit analysis and customer relationship development.",
    skills: ["Company analyzing","Financial analyzing","Coordinating","Risk management","Sales","E-commerce"],
  },
];

export type Project = {
  title: string;
  period: string;
  type: string;
  href?: string;
  accent: string;
  imagePos?: string;
  imageZoom?: number;
  imageAspect?: string;
};

export type ProjectSubGroup = { company: string; items: Project[] };

export const projectGroups: {
  label: string;
  company?: string;
  items?: Project[];
  subGroups?: ProjectSubGroup[];
}[] = [
  {
    label: "My personal projects",
    items: [
      { title: "1truth", period: "Nov.2025 - Present", type: "Responsive website", accent: "#0c0f18" },
      { title: "SAS Card game", period: "Dec.2025 - Present", type: "Card game (Figma)", accent: "#1c0a2e" },
      { title: "Wealth Up", period: "Oct.2023 - Nov.2023", type: "Mobile app (Figma)", accent: "#3a6b4a" },
      { title: "AniDrugs", period: "Oct.2022", type: "Mobile app (Figma)", accent: "#c9a86a" },
      { title: "ChocBana", period: "Sep.2022", type: "Mobile app (Figma)", accent: "#8a4a2c", imageAspect: "1 / 1" },
      { title: "Starbucks website redesign", period: "Apr.2022", type: "Responsive website (Figma)", accent: "#1e4d3a" },
      { title: "Book Buffet", period: "Mar.2022", type: "Mobile app (Figma)", accent: "#d97a3a", imageAspect: "1 / 1" },
    ],
  },
  {
    label: "Work projects",
    subGroups: [
      {
        company: "The Island Digital Solution",
        items: [
          { title: "DMMS-PEA", period: "Mar.2025 - Present", type: "Responsive website", accent: "#6b1a5e" },
          { title: "Log Pose - One Bangkok", period: "Mar.2025 - Present", type: "Mobile app and Responsive website", accent: "#2a2a2e" },
          { title: "PDPA Manager - Amarin", period: "Mar.2025 - Present", type: "Responsive website", accent: "#0d2b26" },
        ],
      },
      {
        company: "SeniorCom",
        items: [
          { title: "Dealer Vision", period: "Jan.2024 - Mar.2025", type: "Responsive website", accent: "#1f4e8c" },
          { title: "H-Meter", period: "Jan.2024 - Mar.2025", type: "Responsive website", accent: "#2f6fb0" },
        ],
      },
      {
        company: "Just Car",
        items: [
          { title: "Just super app (Revamp)", period: "Jul.2023 - Oct.2023", type: "Mobile app", accent: "#2d5a8a", imagePos: "center top" },
          { title: "Just Fin", period: "Sep.2023 - Oct.2023", type: "Mobile app", accent: "#8a3a5a" },
          { title: "Just service", period: "Aug.2023 - Oct.2023", type: "Mobile app", accent: "#5a8a3a" },
          { title: "Just invest (Just Fin)", period: "Feb.2023 - Mar.2023", type: "Responsive website (Figma)", accent: "#3a3a8a" },
        ],
      },
    ],
  },
  {
    label: "Internship projects",
    company: "Probatus",
    items: [
      { title: "Krispy Kreme Rewards website", period: "Jul.2022 - Aug.2022", type: "Responsive website (Figma)", accent: "#1f6f3a" },
      { title: "ENON (Landing page)", period: "Jul.2022 - Aug.2022", type: "Responsive website (Figma)", accent: "#3a4a6b", imagePos: "center top" },
      { title: "ENON Lite", period: "Jul.2022 - Aug.2022", type: "Desktop website (Figma)", accent: "#6b3a4a", imagePos: "center top" },
      { title: "RHILI (Landing page)", period: "Jul.2022 - Aug.2022", type: "Responsive website (Figma)", accent: "#8a5a3a", imagePos: "center top" },
      { title: "KRIA (Landing page)", period: "Jul.2022 - Aug.2022", type: "Responsive website (Figma)", accent: "#3a6b8a", imagePos: "center top" },
    ],
  },
  {
    label: "Study projects (Google)",
    items: [
      { title: "PIA [Pay It All]", period: "Oct.2021", type: "Mobile app (Figma)", accent: "#6b4a8a" },
      { title: "GCFi [Golden Cloud Finance]", period: "Sep.2021", type: "Mobile app & Responsive website (Figma)", accent: "#c9a86a" },
    ],
  },
];

export const certifications = [
  {
    title: "Prompt Engineering for ChatGPT",
    issuer: "Vanderbilt University",
    issued: "Issued: Mar.2024",
    actions: [{ label: "View", href: "#" }, { label: "Verify", href: "#" }],
  },
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Google",
    issued: "Issued: Feb.2022",
    actions: [{ label: "View", href: "#" }, { label: "Verify", href: "#" }],
  },
  {
    title: "HTML, CSS, and Javascript for Web Developers",
    issuer: "Johns Hopkins University",
    issued: "Issued: Mar.2022",
    actions: [{ label: "View", href: "#" }, { label: "Verify", href: "#" }],
  },
  {
    title: "Digital Marketing",
    issuer: "ICDL Thailand, ICDL Asia",
    issued: "Issued: Nov.2020",
    actions: [{ label: "View", href: "#" }],
  },
];

export const hobbies = [
  { name: "Universe", emoji: "🌌" },
  { name: "Sacred Geometry", emoji: "🔯" },
  { name: "Spiritual", emoji: "🪷" },
  { name: "Stocks", emoji: "📈" },
  { name: "Crypto Currencies & Blockchains", emoji: "🪙" },
  { name: "Cooking", emoji: "🍳" },
  { name: "Reading", emoji: "📚" },
  { name: "Gaming", emoji: "🎮" },
  { name: "Anime & Manga", emoji: "🍥" },
  { name: "Models / Figures / Toys / Collectible", emoji: "🧸" },
  { name: "Music", emoji: "🎧" },
  { name: "Movies", emoji: "🎬" },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "About me", href: "#about" },
];
