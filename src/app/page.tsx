export const dynamic = 'force-dynamic';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ClientsShowcase } from '@/components/sections/ClientsShowcase';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { ProblemsSection } from '@/components/sections/ProblemsSection';
import { SolutionsSection } from '@/components/sections/SolutionsSection';
import { StatsBar } from '@/components/sections/StatsBar';
import { VideoTestimonials } from '@/components/sections/VideoTestimonials';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { ContactSection } from '@/components/sections/ContactSection';
import { getTestimonials, getServices, getStats } from '@/lib/firestore';
import { Testimonial, Service, Stats } from '@/types';

const fallbackTestimonials: Testimonial[] = [
  { id: '1', author: 'DR JAIKISH S', role: 'CEO', company: 'ATLAS HOSPITALS', quote: "As a doctor, I was looking for a reliable digital marketing team to grow my hospital's online presence. This team did an excellent job with Google Ads, social media marketing, and patient engagement. I've seen a noticeable increase in appointments and inquiries. Highly recommended for healthcare marketing!", order: 1 },
  { id: '2', author: 'DR MADHUPRIYA', role: 'Managing Director', company: "Shree Centre for Fertility and Women's Care", quote: "We truly trust and value the digital marketing support provided for our fertility and women's care services. Their approach has genuinely helped us expand our reach and build stronger patient engagement. The team is reliable, responsive, and clearly understands the sensitivity and importance of healthcare communication.", order: 2 },
  { id: '3', author: 'DR VIJAYANAD', role: 'Founder', company: 'SRI RAMAKRISHNA SPECIALTY HOSPITALS', quote: "We partnered with this digital marketing team to enhance our hospital's online reach. Their strategies in SEO, Google Ads, and social media have significantly improved our patient inflow. They understand the healthcare industry well and provide consistent support. Highly satisfied with their service.", order: 3 },
];

const fallbackServices: Service[] = [
  { id: '1', slug: 'seo', title: 'Rank No.1 in Google Searches', icon: 'search', summary: 'Technical SEO for better visibility', bullets: ['Technical SEO for better visibility', 'Organic traffic from healthcare searches', 'Google Business Profile optimization'], order: 1 },
  { id: '2', slug: 'social-media', title: 'Let Your Voice Reach Millions', icon: 'megaphone', summary: 'Platform-optimized healthcare content', bullets: ['Platform-optimized healthcare content', 'Active social media communication', 'Strategic brand storytelling'], order: 2 },
  { id: '3', slug: 'paid-ads', title: 'Exposure to International Clients', icon: 'chart', summary: 'Location-based patient lead campaigns', bullets: ['Location-based patient lead campaigns', 'Maximum ROI with data-driven tracking', 'Ad campaigns that drive appointments'], order: 3 },
  { id: '4', slug: 'video-production', title: 'Experienced Video Production Team', icon: 'video', summary: 'Patient treatment explainer videos', bullets: ['Patient treatment explainer videos', 'High-quality medical visual content', 'Video for website and social media'], order: 4 },
  { id: '5', slug: 'branding', title: 'Personalized Brand Consulting', icon: 'star', summary: 'Hospital brand patients trust instantly', bullets: ['Hospital brand patients trust instantly', 'Logos and messaging for healthcare', 'Long-term brand recognition strategy'], order: 5 },
  { id: '6', slug: 'web-design', title: 'Website Designed For Hospitals', icon: 'globe', summary: 'Fast, mobile-friendly patient websites', bullets: ['Fast, mobile-friendly patient websites', 'SEO-ready structure for search visibility', 'Seamless appointment booking flow'], order: 6 },
];

async function fetchData() {
  try {
    const [testimonials, services, stats] = await Promise.all([
      getTestimonials(),
      getServices(),
      getStats(),
    ]);
    return {
      testimonials: testimonials.length ? testimonials as Testimonial[] : fallbackTestimonials,
      services: services.length ? services as Service[] : fallbackServices,
      stats: stats as Stats | null,
    };
  } catch {
    return {
      testimonials: fallbackTestimonials,
      services: fallbackServices,
      stats: null,
    };
  }
}

export default async function HomePage() {
  const { testimonials, services, stats } = await fetchData();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ClientsShowcase />
        <ServicesGrid services={services} />
        <ProblemsSection />
        <SolutionsSection />
        <StatsBar stats={stats} />
        <VideoTestimonials />
        <TestimonialsCarousel testimonials={testimonials} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
