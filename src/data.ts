import { Project, SkillCategory, Testimonial, Achievement, EducationStage } from './types';

export const PERSONAL_INFO = {
  name: "Alisher Ozodov",
  title: "AI Engineer / Developer",
  institution: "Muhammad al-Khwarizmi ICT School",
  location: "Tashkent, Uzbekistan",
  bio: "just cooking",
  status: "STUDENT",
  github: "https://github.com/alisherozodov",
  telegram: "https://t.me/nyxlvoid",
  linkedin: "https://linkedin.com/in/alisherozodov",
  twitter: "https://x.com/alisherozodov",
  email: "aiisher.ozodoff@gmail.com",
  stats: []
};

export const PROJECTS: Project[] = [
  {
    id: "techify",
    title: "techify",
    subtitle: "Tech Products Sales Website",
    category: "Full-Stack Web App",
    description: "A web store platform for browsing and purchasing technology products.",
    longDescription: "Techify is a sales website designed for tech products, hardware, peripherals, and electronics. Features responsive layouts, item filtering, cart management, and product navigation.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "E-Commerce"],
    metrics: [
      { label: "Type", value: "Tech Store" },
      { label: "Repository", value: "GitHub" },
      { label: "Stack", value: "React/TS" }
    ],
    accentColor: "#A58B5E",
    liveUrl: "https://github.com/alisherozodov/techify",
    githubUrl: "https://github.com/alisherozodov/techify",
    architectureHighlights: [
      "Responsive layout with product catalog filtering",
      "Clean cart management and item state UI",
      "Open source repository hosted on GitHub"
    ],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "the-aurora-group",
    title: "The Aurora Group",
    subtitle: "Debate & Speaking Night Events Hub",
    category: "Events & Community",
    description: "A web platform for debate events, speaking nights, and community gatherings.",
    longDescription: "The Aurora Group platform connects speakers, debaters, and attendees for structured debate night events, workshops, and speaking sessions.",
    tags: ["React", "Vercel", "Tailwind CSS", "Community Platform", "Event Hub"],
    metrics: [
      { label: "Production", value: "Live Site" },
      { label: "Focus", value: "Debates" },
      { label: "Deploy", value: "Vercel" }
    ],
    accentColor: "#d4af37",
    liveUrl: "https://theauroragroup.vercel.app",
    githubUrl: "https://github.com/alisherozodov",
    architectureHighlights: [
      "Speaking event schedule and participant showcase views",
      "Clean UI designed for debaters and event attendees",
      "Deployed on Vercel"
    ],
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "theuzbekistantimes",
    title: "The Uzbekistan Times",
    subtitle: "Independent News & Articles Website",
    category: "News & Media",
    description: "An independent news portal for articles and regional news coverage.",
    longDescription: "The Uzbekistan Times serves as a digital news portal. Built for mobile and desktop reading with categorized news feeds and clean typography.",
    tags: ["React", "Netlify", "News Portal", "Tailwind CSS", "TypeScript"],
    metrics: [
      { label: "Production", value: "Live Site" },
      { label: "Domain", value: "News & Media" },
      { label: "Deploy", value: "Netlify" }
    ],
    accentColor: "#8c734b",
    liveUrl: "https://theuzbekistantimes.netlify.app",
    githubUrl: "https://github.com/alisherozodov",
    architectureHighlights: [
      "Article layout with structured navigation",
      "Fast page loads on mobile and desktop",
      "Hosted on Netlify"
    ],
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "sat-yangiaryk",
    title: "SAT Yangiaryk",
    subtitle: "Study Centre Web Platform",
    category: "Education & EdTech",
    description: "Web platform built for an educational study centre in Yangiaryk.",
    longDescription: "A web platform designed for SAT preparation and educational resources for students at a study centre in Yangiaryk.",
    tags: ["React", "Vercel", "Tailwind CSS", "Education", "SAT Prep"],
    metrics: [
      { label: "Location", value: "Yangiaryk" },
      { label: "Focus", value: "SAT Prep" },
      { label: "Deploy", value: "Vercel" }
    ],
    accentColor: "#3b82f6",
    liveUrl: "https://satyangiaryk.vercel.app",
    githubUrl: "https://github.com/alisherozodov",
    architectureHighlights: [
      "Dedicated SAT preparation resources and course information",
      "Tailored for study centre students in Yangiaryk",
      "Hosted live on Vercel"
    ],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "turbocoin",
    title: "Turbocoin",
    subtitle: "Interactive Clicker Web App",
    category: "Web Application / Game",
    description: "An interactive crypto-style clicker game web application.",
    longDescription: "Turbocoin is an interactive clicker application featuring coin tapping mechanics, dynamic counters, and fluid animation feedback.",
    tags: ["React", "JavaScript", "Netlify", "Clicker Game"],
    metrics: [
      { label: "Type", value: "Clicker App" },
      { label: "Deploy", value: "Netlify" },
      { label: "Stack", value: "React" }
    ],
    accentColor: "#f59e0b",
    liveUrl: "https://turboclicker.netlify.app/",
    githubUrl: "https://github.com/alisherozodov",
    architectureHighlights: [
      "Interactive clicker game mechanics and real-time counter",
      "Responsive layout for mobile and desktop play",
      "Hosted on Netlify"
    ],
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "zakovat-bot",
    title: "Zakovat Bot",
    subtitle: "Telegram Quiz & Trivia Bot",
    category: "Telegram Bot / Automation",
    description: "Interactive Telegram bot designed for Zakovat intellectual quiz games.",
    longDescription: "A Telegram bot built to facilitate Zakovat intellectual quiz competitions, managing questions, trivia challenges, and player interactions.",
    tags: ["Telegram Bot", "Python", "Automation", "Zakovat Quiz"],
    metrics: [
      { label: "Platform", value: "Telegram" },
      { label: "Category", value: "Quiz Bot" },
      { label: "Target", value: "Zakovat" }
    ],
    accentColor: "#10b981",
    liveUrl: "https://t.me/zakovatazavr_bot",
    githubUrl: "https://github.com/alisherozodov",
    architectureHighlights: [
      "Automated Zakovat quiz game logic and question delivery",
      "Direct integration with Telegram API (@zakovatazavr_bot)",
      "Designed for community intellectual games"
    ],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "robocoder",
    title: "Robocoder",
    subtitle: "Robotics & Coding School Website",
    category: "Web Platform",
    description: "Official web portal for Robocoder coding and robotics school.",
    longDescription: "Robocoder website showcases STEM workshops, robotics courses, and student programs with clean navigation and course details.",
    tags: ["React", "Netlify", "Tailwind CSS", "Robotics", "Education"],
    metrics: [
      { label: "Domain", value: "Robotics/Coding" },
      { label: "Deploy", value: "Netlify" },
      { label: "Stack", value: "React/TS" }
    ],
    accentColor: "#ef4444",
    liveUrl: "https://ss-robocoder.netlify.app",
    githubUrl: "https://github.com/alisherozodov",
    architectureHighlights: [
      "Course catalog and workshop showcase for robotics education",
      "Fast, responsive layout hosted on Netlify",
      "Clean UI for students and parents"
    ],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    featured: true
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "linguist-2024",
    title: "Linguist 2024",
    category: "Special Academic Distinction",
    value: "2024 Award",
    description: "Recognized as Linguist 2024 for overall linguistic excellence and multilingual communication skills.",
    badge: "Honoree",
    icon: "Award"
  },
  {
    id: "cefr-58",
    title: "CEFR Certificate",
    category: "Language Qualification",
    value: "Score 58",
    description: "Official Common European Framework of Reference for Languages (CEFR) qualification score of 58.",
    badge: "Certified",
    icon: "CheckCircle2"
  },
  {
    id: "regional-english-olympiad",
    title: "Regional English Olympiad",
    category: "Academic Competition",
    value: "3rd Place 🥉",
    description: "Awarded 3rd place in the Regional English Academic Olympiad testing advanced grammar, rhetoric, and comprehension.",
    badge: "Bronze Medalist",
    icon: "Trophy"
  },
  {
    id: "regional-it-olympiad",
    title: "Regional IT Olympiad",
    category: "Computer Science Competition",
    value: "3rd Place 🥉",
    description: "Awarded 3rd place in the Regional IT Olympiad for algorithmic problem solving and software engineering skills.",
    badge: "Bronze Medalist",
    icon: "Cpu"
  },
  {
    id: "ielts-7",
    title: "IELTS International Certification",
    category: "Language Certification",
    value: "Band 7.0",
    description: "Achieved an overall IELTS score of 7.0 demonstrating advanced English proficiency across Listening, Reading, Writing, and Speaking.",
    badge: "Global Standard",
    icon: "Sparkles"
  }
];

export const EDUCATION_STAGES: EducationStage[] = [
  {
    id: "khwarizmi-tashkent",
    schoolName: "Specialised School under the name of Muhammad al-Khwarizmi",
    location: "Tashkent city, Yashnobod region",
    experienceNote: "Flagship specialized ICT school in Tashkent focusing on computer science, AI engineering, and information technology.",
    specialization: "",
    status: "Current School",
    searchQuery: "Specialized school under the name of Muhammad al-Khwarizmi Tashkent",
    timelineOrder: 1
  },
  {
    id: "khwarizmi-urgench",
    schoolName: "Specialised School under the name of Muhammad al-Khwarizmi Urgench Branch",
    location: "Urgench, Khorezm",
    experienceNote: "Previously studied, lowkey good, in Urgench.",
    specialization: "",
    status: "Previously Studied",
    searchQuery: "Specialized school under the name of Muhammad al-Khwarizmi Urgench branch",
    timelineOrder: 2
  },
  {
    id: "yangiaryk-specialized",
    schoolName: "Yangiaryk Specialised School",
    location: "Yangiaryk, Khorezm",
    experienceNote: "Specialized in mathematics, physics and english.",
    specialization: "",
    status: "Specialized Education",
    searchQuery: "Yangiaryk specialized school",
    timelineOrder: 3
  },
  {
    id: "school-31",
    schoolName: "Secondary School No. 31",
    location: "Yangiaryk, Khorezm",
    experienceNote: "3-day new school then left, Yangiaryk.",
    specialization: "",
    status: "3-Day Transition",
    searchQuery: "Secondary school number 31 Yangiaryk",
    timelineOrder: 4
  },
  {
    id: "school-15",
    schoolName: "Secondary School No. 15",
    location: "Yangiaryk, Khorezm",
    experienceNote: "Located in Yangiaryk, was not so good experience.",
    specialization: "",
    status: "Early Secondary",
    searchQuery: "Secondary school number 15 Yangiaryk",
    timelineOrder: 5
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & Full-Stack Development",
    description: "Core technical tools and frameworks employed across projects.",
    icon: "Code2",
    skills: [
      { name: "Python & Gemini AI API", level: 95, experience: "2 yrs", description: "LLM prompt pipelines, agent workflows, server proxies", highlight: true, tag: "AI Core" },
      { name: "React 19 & TypeScript", level: 96, experience: "3 yrs", description: "Modern component architecture, state management, UI design", highlight: true, tag: "Frontend" },
      { name: "Tailwind CSS & Styling", level: 98, experience: "3 yrs", description: "Responsive layouts, dark themes, glassmorphic UI", tag: "Styling" },
      { name: "Node.js & Deployment", level: 92, experience: "2 yrs", description: "Express APIs, Vercel & Netlify continuous integration", tag: "DevOps" }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Alisher combines sharp technical skills in AI and web development with impressive linguistic ability. His work on Techify and The Aurora Group shows exceptional dedication.",
    author: "Muhammad al-Khwarizmi ICT Mentor",
    title: "Senior IT Instructor",
    company: "Muhammad al-Khwarizmi ICT School",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    badge: "Academic Endorsement"
  },
  {
    quote: "The Aurora Group platform provided an outstanding digital hub for our debate events. Clean design, reliable performance, and great user experience.",
    author: "Debate Community Lead",
    title: "Event Organizer",
    company: "The Aurora Group",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    badge: "Event Partner"
  }
];

export const LAB_EXPERIMENTS = [
  {
    id: "exp-1",
    title: "Liquid Particle Attractor",
    type: "Interactive Canvas 2D/3D",
    description: "Drag cursor across canvas to create gravity wells pulling thousands of colored energy vectors.",
    tag: "Physics Engine"
  },
  {
    id: "exp-2",
    title: "Inertia Multiplier Tester",
    type: "Lenis Physics",
    description: "Interactive slider tool to benchmark scroll velocity dampening, touch friction, and spring tension.",
    tag: "Motion Tuning"
  },
  {
    id: "exp-3",
    title: "Chromatic Distortion Glass",
    type: "GLSL Shader",
    description: "Real-time glass refraction shader with chromatic aberration and dynamic light dispersion.",
    tag: "Fragment Shader"
  }
];
