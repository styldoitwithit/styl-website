export interface Client {
  id: string;
  name: string;
  logo: string;
  category: string;
  order: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  order: number;
}

export interface Metric {
  label: string;
  value: string;
  direction: 'up' | 'down';
}

export interface CaseStudy {
  id: string;
  client: string;
  logo: string;
  category: string;
  challenge: string;
  strategy: string;
  result: string;
  metrics: Metric[];
  order: number;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  icon: string;
  summary: string;
  bullets: string[];
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published: boolean;
  coverImage?: string;
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt?: { seconds: number; nanoseconds: number };
}

export interface Stats {
  id: string;
  clients_served: string;
  average_roi: string;
  video_hours: string;
  years_experience: string;
  cost_per_lead_reduction: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: { seconds: number; nanoseconds: number };
  read: boolean;
}
