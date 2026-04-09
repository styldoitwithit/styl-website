import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ClientCarousel } from '@/components/sections/ClientCarousel';
import { CaseStudySlider } from '@/components/sections/CaseStudySlider';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { ProblemsSection } from '@/components/sections/ProblemsSection';
import { SolutionsSection } from '@/components/sections/SolutionsSection';
import { StatsBar } from '@/components/sections/StatsBar';
import { VideoTestimonials } from '@/components/sections/VideoTestimonials';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { ContactSection } from '@/components/sections/ContactSection';
export const dynamic = 'force-dynamic';

import { getClients, getTestimonials, getCaseStudies, getServices, getStats } from '@/lib/firestore';
import { Client, Testimonial, CaseStudy, Service, Stats } from '@/types';

// Fallback data for when Firestore is not configured
const fallbackClients: Client[] = [
  { id: '1', name: 'ATLAS HOSPITALS', logo: '/assets/ATLAS HOSPITALS.png', category: 'Healthcare', order: 1 },
  { id: '2', name: 'DR ANILKUMAR EYE HOSPITAL', logo: '/assets/DR ANILKUMAR EYE HOSPITAL.jpg', category: 'Healthcare', order: 2 },
  { id: '3', name: 'MUKESH ARTHRO CARE HOSPITAL', logo: '/assets/MUKESH ARTHRO CARE HOSPITAL.png', category: 'Healthcare', order: 3 },
  { id: '4', name: 'SRI RAMAKRISHNA SPECIALTY HOSPITALS', logo: '/assets/SRI RAMAKRISHNA SPECIALTY HOSPITALS.jpg', category: 'Healthcare', order: 4 },
  { id: '5', name: 'SHREE CLINIC', logo: '', category: 'Healthcare', order: 5 },
];

const fallbackTestimonials: Testimonial[] = [
  { id: '1', author: 'DR JAIKISH S', role: 'CEO', company: 'ATLAS HOSPITALS', quote: 'As a doctor, I was looking for a reliable digital marketing team to grow my hospital\'s online presence. This team did an excellent job with Google Ads, social media marketing, and patient engagement. I\'ve seen a noticeable increase in appointments and inquiries. Highly recommended for healthcare marketing!', order: 1 },
  { id: '2', author: 'DR MADHUPRIYA', role: 'Managing Director', company: 'Shree Centre for Fertility and Women\'s Care', quote: 'We truly trust and value the digital marketing support provided for our fertility and women\'s care services. Their approach has genuinely helped us expand our reach and build stronger patient engagement. The team is reliable, responsive, and clearly understands the sensitivity and importance of healthcare communication.', order: 2 },
  { id: '3', author: 'DR VIJAYANAD', role: 'Founder', company: 'SRI RAMAKRISHNA SPECIALTY HOSPITALS', quote: 'We partnered with this digital marketing team to enhance our hospital\'s online reach. Their strategies in SEO, Google Ads, and social media have significantly improved our patient inflow. They understand the healthcare industry well and provide consistent support. Highly satisfied with their service.', order: 3 },
];

const fallbackCaseStudies: CaseStudy[] = [
  {
    id: '1', client: 'ATLAS HOSPITALS', logo: '/assets/ATLAS HOSPITALS.png', category: 'Healthcare',
    challenge: 'Low patient acquisition rate and declining referral numbers across outpatient departments.',
    strategy: 'Deployed a targeted paid ads campaign combined with a referral incentive programme across key catchment areas.',
    result: 'Significant growth in new patient registrations within the first 60 days of the campaign.',
    metrics: [
      { label: 'ROI', value: '320%', direction: 'up' }, { label: 'Leads Generated', value: '250+', direction: 'up' },
      { label: 'Growth Rate', value: '40%', direction: 'up' }, { label: 'Cost Per Lead', value: '↓60%', direction: 'down' },
    ], order: 1,
  },
  {
    id: '2', client: 'DR ANILKUMAR EYE HOSPITAL', logo: '/assets/DR ANILKUMAR EYE HOSPITAL.jpg', category: 'Healthcare',
    challenge: 'Struggling to convert online enquiries into booked appointments despite high website traffic.',
    strategy: 'Redesigned the enquiry funnel and introduced automated follow-up sequences to nurture leads effectively.',
    result: 'Conversion rate tripled within 45 days, with a measurable drop in enquiry response time.',
    metrics: [
      { label: 'Conversion Rate', value: '3×', direction: 'up' }, { label: 'Appointments Booked', value: '180+', direction: 'up' },
      { label: 'Faster Response', value: '55%', direction: 'up' }, { label: 'Revenue Growth', value: '↑28%', direction: 'up' },
    ], order: 2,
  },
  {
    id: '3', client: 'MUKESH ARTHRO CARE HOSPITAL', logo: '/assets/MUKESH ARTHRO CARE HOSPITAL.png', category: 'Healthcare',
    challenge: 'Lack of brand visibility in a competitive regional market with multiple established providers.',
    strategy: 'Executed a multi-channel brand awareness campaign including content marketing, local SEO, and community events.',
    result: 'Brand recall improved substantially and organic search traffic increased month on month.',
    metrics: [
      { label: 'Search Visibility', value: '5×', direction: 'up' }, { label: 'New Patients', value: '400+', direction: 'up' },
      { label: 'Organic Traffic', value: '70%', direction: 'up' }, { label: 'Brand Recall', value: '↑45%', direction: 'up' },
    ], order: 3,
  },
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
    const [clients, testimonials, caseStudies, services, stats] = await Promise.all([
      getClients(),
      getTestimonials(),
      getCaseStudies(),
      getServices(),
      getStats(),
    ]);
    return {
      clients: clients.length ? clients as Client[] : fallbackClients,
      testimonials: testimonials.length ? testimonials as Testimonial[] : fallbackTestimonials,
      caseStudies: caseStudies.length ? caseStudies as CaseStudy[] : fallbackCaseStudies,
      services: services.length ? services as Service[] : fallbackServices,
      stats: stats as Stats | null,
    };
  } catch {
    return {
      clients: fallbackClients,
      testimonials: fallbackTestimonials,
      caseStudies: fallbackCaseStudies,
      services: fallbackServices,
      stats: null,
    };
  }
}

export default async function HomePage() {
  const { clients, testimonials, caseStudies, services, stats } = await fetchData();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ClientCarousel clients={clients} />
        <CaseStudySlider caseStudies={caseStudies} />
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
