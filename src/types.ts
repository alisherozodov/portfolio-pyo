export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  liveUrl?: string;
  githubUrl?: string;
  architectureHighlights: string[];
  image: string;
  featured: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  category: string;
  value: string;
  year?: string;
  description: string;
  badge: string;
  icon?: string;
}

export interface EducationStage {
  id: string;
  schoolName: string;
  location: string;
  experienceNote: string;
  specialization?: string;
  status: string;
  searchQuery: string;
  timelineOrder: number;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: string;
  skills: {
    name: string;
    level: number;
    experience: string;
    description: string;
    highlight?: boolean;
    tag: string;
  }[];
}

export interface CareerMilestone {
  year: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  achievements: string[];
  techUsed: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
  badge: string;
}

export type WebGLShapeType = 'particleField' | 'quantumKnot' | 'torusMesh' | 'cyberLattice';
export type WebGLPalette = 'midnightCyber' | 'solarFlare' | 'emeraldMatrix' | 'deepViolet';
