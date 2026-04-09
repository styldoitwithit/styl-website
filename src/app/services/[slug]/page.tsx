export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/components/sections/ContactSection';
import { getServiceBySlug, getServices } from '@/lib/firestore';
import { Service } from '@/types';
import Link from 'next/link';
import {
  MagnifyingGlassIcon, MegaphoneIcon, ChartBarIcon,
  VideoCameraIcon, StarIcon, GlobeAltIcon,
} from '@heroicons/react/24/outline';

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  search: MagnifyingGlassIcon, megaphone: MegaphoneIcon, chart: ChartBarIcon,
  video: VideoCameraIcon, star: StarIcon, globe: GlobeAltIcon,
};

const fallbackServices: Record<string, Service> = {
  'seo': { id: '1', slug: 'seo', title: 'Rank No.1 in Google Searches', icon: 'search', summary: 'Comprehensive SEO strategy tailored for healthcare providers to dominate local and national search results.', bullets: ['Technical SEO for better visibility', 'Organic traffic from healthcare searches', 'Google Business Profile optimization', 'Local SEO for clinic/hospital discovery', 'Healthcare keyword research and content strategy'], order: 1 },
  'social-media': { id: '2', slug: 'social-media', title: 'Let Your Voice Reach Millions', icon: 'megaphone', summary: 'Strategic social media presence that builds trust, engages patients, and grows your healthcare brand.', bullets: ['Platform-optimized healthcare content', 'Active social media communication', 'Strategic brand storytelling', 'Patient education content creation', 'Community engagement and reputation management'], order: 2 },
  'paid-ads': { id: '3', slug: 'paid-ads', title: 'Exposure to International Clients', icon: 'chart', summary: 'High-performance paid advertising campaigns that drive qualified patient leads at the lowest possible cost.', bullets: ['Location-based patient lead campaigns', 'Maximum ROI with data-driven tracking', 'Ad campaigns that drive appointments', 'Google Ads and Meta Ads management', 'Remarketing to website visitors'], order: 3 },
  'video-production': { id: '4', slug: 'video-production', title: 'Experienced Video Production Team', icon: 'video', summary: 'Professional healthcare video content that educates patients, builds authority, and drives engagement.', bullets: ['Patient treatment explainer videos', 'High-quality medical visual content', 'Video for website and social media', 'Doctor introduction and testimonial videos', 'Procedure walkthrough animations'], order: 4 },
  'branding': { id: '5', slug: 'branding', title: 'Personalized Brand Consulting', icon: 'star', summary: 'Build a healthcare brand that patients trust before they even walk through your doors.', bullets: ['Hospital brand patients trust instantly', 'Logos and messaging for healthcare', 'Long-term brand recognition strategy', 'Brand guidelines and visual identity', 'Patient journey touchpoint branding'], order: 5 },
  'web-design': { id: '6', slug: 'web-design', title: 'Website Designed For Hospitals', icon: 'globe', summary: 'Fast, beautiful, patient-friendly websites that rank on Google and convert visitors into appointments.', bullets: ['Fast, mobile-friendly patient websites', 'SEO-ready structure for search visibility', 'Seamless appointment booking flow', 'Patient portal integration', 'HIPAA-compliant form handling'], order: 6 },
};

export function generateStaticParams() {
  return Object.keys(fallbackServices).map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let service: Service | null = null;
  try {
    service = await getServiceBySlug(slug) as Service | null;
  } catch { /* use fallback */ }

  if (!service) service = fallbackServices[slug] ?? null;
  if (!service) notFound();

  const Icon = iconMap[service.icon] || GlobeAltIcon;

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.06)_0%,transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link href="/services" className="inline-flex items-center gap-2 font-body text-sm text-text-secondary hover:text-gold transition-colors mb-8">
              ← Back to Services
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-gold" />
                </div>
                <h1 className="font-heading text-5xl md:text-6xl font-semibold text-white leading-tight mb-6">
                  {service.title}
                </h1>
                <p className="font-body text-lg text-text-secondary leading-relaxed mb-8">
                  {service.summary}
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex font-body font-medium px-8 py-4 bg-gold text-black rounded-md hover:bg-gold-light transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
              <div className="bg-surface border border-border rounded-2xl p-10">
                <h2 className="font-heading text-2xl text-white mb-6">What&apos;s Included</h2>
                <ul className="space-y-4">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-gold text-xs">✓</span>
                      </span>
                      <span className="font-body text-sm text-text-secondary">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
