import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Healthcare Marketing Services | STYL Digital',
  description: 'SEO, social media, content creation, branding, ad production, web development, and ads management — built exclusively for hospitals and healthcare providers in India.',
  alternates: { canonical: 'https://doitinstyl.com/services' },
  openGraph: {
    title: 'Healthcare Marketing Services | STYL Digital',
    description: 'SEO, social media, content creation, branding, ad production, web development, and ads management — built exclusively for hospitals and healthcare providers in India.',
    url: 'https://doitinstyl.com/services',
  },
};

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/components/sections/ContactSection';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  MegaphoneIcon,
  ChartBarIcon,
  DocumentTextIcon,
  StarIcon,
  GlobeAltIcon,
  FilmIcon,
  PhoneArrowUpRightIcon,
} from '@heroicons/react/24/outline';

const services = [
  {
    slug: 'social-media',
    icon: MegaphoneIcon,
    title: 'Social Media Marketing',
    summary: 'Build a hospital brand that patients follow, trust, and refer others to — across Instagram, Facebook, and YouTube.',
    bullets: [
      'Platform-optimised healthcare content calendars',
      'Doctor spotlight reels and patient awareness posts',
      'Community management and review responses',
      'Monthly analytics and performance reporting',
    ],
  },
  {
    slug: 'seo',
    icon: MagnifyingGlassIcon,
    title: 'Search Engine Optimisation',
    summary: 'Dominate Google for your speciality — before your competitors do. We engineer page-1 rankings that bring in patients 24/7.',
    bullets: [
      'Technical SEO and Core Web Vitals optimisation',
      'Healthcare keyword research and on-page strategy',
      'Google Business Profile management',
      'Local SEO for clinic and hospital discovery',
    ],
  },
  {
    slug: 'content-creation',
    icon: DocumentTextIcon,
    title: 'Content Creation',
    summary: 'Healthcare-compliant content that satisfies Google and earns patient trust — articles, procedure pages, and doctor profiles that convert.',
    bullets: [
      'SEO-rich medical articles and blog posts',
      'Procedure and condition explainer pages',
      'Doctor biography and expertise profiles',
      'Patient education content for social media',
    ],
  },
  {
    slug: 'branding',
    icon: StarIcon,
    title: 'Brand Consulting',
    summary: 'Build a healthcare brand so coherent and trustworthy that patients choose you before they have even spoken to your team.',
    bullets: [
      'Brand strategy, positioning and promise',
      'Logo design and full visual identity system',
      'Tone of voice and patient communication guidelines',
      'Brand rollout across digital and physical touchpoints',
    ],
  },
  {
    slug: 'ad-production',
    icon: FilmIcon,
    title: 'Ad Production',
    summary: 'Scroll-stopping healthcare creatives — from cinematic doctor reels to patient testimonials — engineered for performance across every platform.',
    bullets: [
      'Doctor introduction and testimonial videos',
      'Procedure explainer and facility tour content',
      'Short-form reels for Instagram and YouTube Shorts',
      'Ad creatives for Google and Meta campaigns',
    ],
  },
  {
    slug: 'web-design',
    icon: GlobeAltIcon,
    title: 'Web Development',
    summary: 'Fast, mobile-first hospital websites that rank on Google and convert visitors into booked appointments — built and maintained by our team.',
    bullets: [
      'Responsive, SEO-ready hospital websites',
      'Doctor profiles and speciality service pages',
      'Appointment booking and enquiry flow integration',
      'CMS training so your team can self-manage content',
    ],
  },
  {
    slug: 'paid-ads',
    icon: ChartBarIcon,
    title: 'Ads Management',
    summary: 'Google and Meta ad campaigns managed with surgical precision — every rupee tracked, every patient lead accounted for.',
    bullets: [
      'Google Search and Display campaign management',
      'Meta Ads for awareness and patient lead generation',
      'Dedicated conversion-optimised landing pages',
      'Real-time optimisation and monthly ROI reports',
    ],
  },
  {
    slug: null,
    icon: PhoneArrowUpRightIcon,
    title: 'Start Your Growth Journey',
    summary: 'Not sure which service fits your goals? Tell us about your hospital and we\'ll map out the exact strategy that will move the needle for you.',
    bullets: [
      'Free first consultation — no obligation',
      'Custom strategy built around your goals',
      'Clear deliverables and transparent pricing',
      'Results-focused from day one',
    ],
    isContact: true,
  },
];

export default function ServicesPage() {
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
            <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed mb-6">
              Every service we offer is designed specifically for hospitals and healthcare providers — not generic marketing repurposed for healthcare.
            </p>
            <Link
              href="/process"
              className="inline-flex font-body text-sm font-medium text-gold border border-gold/30 px-5 py-2.5 rounded-full hover:bg-gold/10 transition-all duration-200"
            >
              See how we work →
            </Link>
          </div>
        </section>

        {/* Services grid */}
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => {
                const Icon = service.icon;
                const cardContent = (
                  <div className={`group bg-background border rounded-xl p-10 transition-all duration-300 h-full ${
                    service.isContact
                      ? 'border-gold/30 hover:border-gold hover:shadow-[0_0_40px_rgba(201,168,76,0.12)]'
                      : 'border-border hover:border-gold/50 hover:shadow-[0_0_30px_rgba(201,168,76,0.08)]'
                  }`}>
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                      service.isContact
                        ? 'bg-gold/20 border border-gold/40 group-hover:bg-gold/30'
                        : 'bg-gold/10 border border-gold/20 group-hover:bg-gold/20'
                    }`}>
                      <Icon className="w-7 h-7 text-gold" />
                    </div>
                    <h2 className={`font-heading text-2xl mb-3 ${service.isContact ? 'text-gold' : 'text-white'}`}>
                      {service.title}
                    </h2>
                    <p className="font-body text-sm text-text-secondary mb-6 leading-relaxed">{service.summary}</p>
                    <ul className="space-y-2 mb-8">
                      {service.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 font-body text-sm text-text-secondary">
                          <span className="text-gold mt-0.5 shrink-0">✓</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    {!service.isContact && (
                      <span className="inline-flex items-center gap-2 font-body text-sm font-medium text-gold border border-gold/30 px-5 py-2.5 rounded-md group-hover:bg-gold group-hover:text-black transition-all duration-200">
                        Learn More →
                      </span>
                    )}
                    {service.isContact && (
                      <span className="inline-flex items-center gap-2 font-body text-sm font-medium bg-gold text-black px-5 py-2.5 rounded-md group-hover:bg-gold-light transition-all duration-200">
                        Get in Touch →
                      </span>
                    )}
                  </div>
                );

                return service.isContact ? (
                  <Link key={service.title} href="/#contact" className="block">
                    {cardContent}
                  </Link>
                ) : (
                  <Link key={service.slug!} href={`/services/${service.slug}`} className="block">
                    {cardContent}
                  </Link>
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
