/**
 * Tipos de los archivos de datos JSON.
 */

export interface SiteConfig {
  name: string;
  fullName: string;
  roles: string[];
  tagline: string;
  location: string;
  availability: string;
  email: string;
  phone: string;
  whatsapp: string;
  cvUrl: string;
  social: Record<'linkedin' | 'youtube' | 'instagram' | 'facebook' | 'tiktok', string>;
  hero: {
    image: string;
    poster: string;
    eyebrow: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
    keywords: string;
  };
}

export interface Metric {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
  icon: string;
  note?: string;
}

export interface Service {
  title: string;
  icon: string;
  description: string;
  tags: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ProjectResult {
  value: number;
  suffix: string;
  label: string;
}

export interface Project {
  id: string;
  client: string;
  category: string;
  title: string;
  hero: string;
  year: string;
  summary: string;
  objective: string;
  problem: string;
  solution: string;
  myRole: string;
  tools: string[];
  results: ProjectResult[];
  gallery: string[];
  video: {
    id: string;
    label: string;
  };
  link?: string;
}

export interface Video {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  views: string;
  platform: 'youtube' | 'tiktok' | 'facebook' | 'instagram';
  url: string;
}

export interface GalleryItem {
  src: string;
  thumb: string;
  caption: string;
  category: string;
}

export interface Tool {
  name: string;
  category: string;
  monogram: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  tools: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
  avatar: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  label: string;
  links: NavLink[];
  cta: {
    label: string;
    href: string;
  };
}
