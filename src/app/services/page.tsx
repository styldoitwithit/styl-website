export const dynamic = 'force-dynamic';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactSection } from '@/components/sections/ContactSection';
import { getServices } from '@/lib/firestore';
import { Service } from '@/types';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  MegaphoneIcon,
  ChartBarIcon,
  VideoCameraIcon,
  StarIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  search: MagnifyingGlassIcon,
  megaphone: MegaphoneIcon,
  chart: ChartBarIcon,
  video: VideoCameraIcon,
  star: StarIcon,
  globe: GlobeAltIcon,
};

const fallbackServices: Service[] = [
  { id: '1', slug: 'seo', title: 'Rank No.1 in Google Searches', icon: 'search', summary: 'Technical SEO, organic traffic from healthcare searches, Google Business Profile optimization.', bullets: ['Technical SEO for better visibility', 'Organic traffic from healthcare searches', 'Google Business Profile optimization'], order: 1 },
  { id: '2', slug: 'social-media', title: 'Let Your Voice Reach Millions', icon: 'megaphone', summary: 'Platform-optimized healthcare content, active social media communication, strategic brand storytelling.', bullets: ['Platform-optimized healthcare content', 'Active social media communication', 'Strategic brand storytelling'], order: 2 },
  { id: '3', slug: 'paid-ads', title: 'Exposure to International Clients', icon: 'chart', summary: 'Location-based patient lead campaigns, maximum ROI with data-driven tracking, ad campaigns that drive appointments.', bullets: ['Location-based patient lead campaigns', 'Maximum ROI with data-driven tracking', 'Ad campaigns that drive appointments'], order: 3 },
  { id: '4', slug: 'video-production', title: 'Experienced Video Production Team', icon: 'video', summary: 'Patient treatment explainer videos, high-quality medical visual content, video for website and social media.', bullets: ['Patient treatment explainer videos', 'High-quality medical visual content', 'Video for website and social media'], order: 4 },
  { id: '5', slug: 'branding', title: 'Personalized Brand Consulting', icon: 'star', summary: 'Hospital brand patients trust instantly, logos and messaging for healthcare, long-term brand recognition strategy.', bullets: ['Hospital brand patients trust instantly', 'Logos and messaging for healthcare', 'Long-term brand recognition strategy'], order: 5 },
  { id: '6', slug: 'web-design', title: 'Website Designed For Hospitals', icon: 'globe', summary: 'Fast, mobile-friendly patient websites, SEO-ready structure for search visibility, seamless appointment booking flow.', bullets: ['Fast, mobile-friendly patient websites', 'SEO-ready structure for search visibility', 'Seamless appointment booking flow'], order: 6 },
];

export default async function ServicesPage() {
  let services: Service[] = fallbackServices;
  try {
    const fetched = await getServices();
    if (fetched.length) services = fetched as Service[];
  } catch { /* use fallback */ }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.06)_0%,transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block font-body text-xs font-medium tracking-[0.3em] text-gold uppercase mb-6 px-4 py-2 border border-gold/30 rounded-full bg-gold/5">
              What We Do
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-semibold text-white leading-tight mb-6">
              Services Built for{' '}
              <span className="text-gold italic">Healthcare</span>
            </h1>
            <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Every service we offer is designed specifically for hospitals and healthcare providers — not generic marketing.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => {
                const Icon = iconMap[service.icon] || GlobeAltIcon;
                return (
                  <div
                    key={service.id}
                    className="group bg-background border border-border rounded-xl p-10 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(201,168,76,0.08)] transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                      <Icon className="w-7 h-7 text-gold" />
                    </div>
                    <h2 className="font-heading text-2xl text-white mb-3">{service.title}</h2>
                    <p className="font-body text-sm text-text-secondary mb-6 leading-relaxed">{service.summary}</p>
                    <ul className="space-y-2 mb-8">
                      {service.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 font-body text-sm text-text-secondary">
                          <span className="text-gold mt-0.5 shrink-0">✓</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 font-body text-sm font-medium text-gold border border-gold/30 px-5 py-2.5 rounded-md hover:bg-gold hover:text-black transition-all duration-200"
                    >
                      Learn More →
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
