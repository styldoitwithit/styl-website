export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactSection } from '@/components/sections/ContactSection';
import { getServiceBySlug, getPageContent } from '@/lib/firestore';
import { Service } from '@/types';
import { serviceContent, type ServiceContent } from '@/lib/serviceDefaults';
import Link from 'next/link';
import {
  MagnifyingGlassIcon, MegaphoneIcon, ChartBarIcon,
  VideoCameraIcon, StarIcon, GlobeAltIcon, CheckCircleIcon,
} from '@heroicons/react/24/outline';

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  search: MagnifyingGlassIcon, megaphone: MegaphoneIcon, chart: ChartBarIcon,
  video: VideoCameraIcon, star: StarIcon, globe: GlobeAltIcon,
};

// ─── Fallback base service data ───────────────────────────────────────────────

const fallbackServices: Record<string, Service> = {
  'social-media':      { id:'1', slug:'social-media',      title:'Social Media Marketing',        icon:'megaphone', summary:'Strategic social media presence that builds trust, engages patients, and grows your healthcare brand.',           bullets:['Platform-optimised healthcare content','Active social media communication','Strategic brand storytelling','Patient education content creation','Community engagement and reputation management'],  order:1 },
  'seo':               { id:'2', slug:'seo',               title:'Search Engine Optimisation',     icon:'search',    summary:'Comprehensive SEO strategy tailored for healthcare providers to dominate local and national search results.',   bullets:['Technical SEO for better visibility','Organic traffic from healthcare searches','Google Business Profile optimisation','Local SEO for clinic/hospital discovery','Healthcare keyword research and content strategy'], order:2 },
  'content-creation':  { id:'3', slug:'content-creation',  title:'Content Creation',              icon:'search',    summary:'Healthcare-compliant content that earns patient trust and Google rankings simultaneously.',                      bullets:['SEO-rich medical articles and blog posts','Procedure and condition explainer pages','Doctor biography and expertise profiles','Patient education content for social media','Monthly content performance reporting'],  order:3 },
  'branding':          { id:'4', slug:'branding',          title:'Brand Consulting',              icon:'star',      summary:'Build a healthcare brand that patients trust before they even walk through your doors.',                          bullets:['Brand strategy, positioning and promise','Logo design and full visual identity system','Tone of voice and patient communication guidelines','Brand rollout across all touchpoints','Patient journey touchpoint branding'],  order:4 },
  'ad-production':     { id:'5', slug:'ad-production',     title:'Ad Production',                 icon:'video',     summary:'Cinematic healthcare creatives — from doctor reels to patient testimonials — built to perform on every platform.', bullets:['Doctor introduction and testimonial videos','Procedure explainer and facility tour content','Short-form reels for Instagram and YouTube Shorts','Ad creatives for Google and Meta campaigns','Multi-format delivery for all platforms'],  order:5 },
  'web-design':        { id:'6', slug:'web-design',        title:'Web Development',               icon:'globe',     summary:'Fast, beautiful, patient-friendly websites that rank on Google and convert visitors into appointments.',          bullets:['Fast, mobile-friendly patient websites','SEO-ready structure for search visibility','Seamless appointment booking flow','Patient portal integration','CMS training for your team'],  order:6 },
  'paid-ads':          { id:'7', slug:'paid-ads',          title:'Ads Management',                icon:'chart',     summary:'Google and Meta ad campaigns managed with surgical precision — every rupee tracked, every patient lead accounted for.', bullets:['Google Search and Display campaign management','Meta Ads for awareness and patient lead generation','Dedicated conversion-optimised landing pages','Real-time optimisation and monthly ROI reports','Full budget transparency'],  order:7 },
  'video-production':  { id:'8', slug:'video-production',  title:'Video Production',              icon:'video',     summary:'Professional healthcare video content that educates patients, builds authority, and drives engagement.',          bullets:['Patient treatment explainer videos','High-quality medical visual content','Video for website and social media','Doctor introduction and testimonial videos','Procedure walkthrough animations'],  order:8 },
};

const otherServices = Object.values(fallbackServices);

export function generateStaticParams() {
  return Object.keys(fallbackServices).map((slug) => ({ slug }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let service: Service | null = null;
  try { service = await getServiceBySlug(slug) as Service | null; } catch { /* use fallback */ }
  if (!service) service = fallbackServices[slug] ?? null;
  if (!service) notFound();

  // Try Firestore for rich page content, fall back to hardcoded defaults
  let content: ServiceContent | null = null;
  try {
    const raw = await getPageContent(`service_${slug}`);
    if (raw) content = raw as unknown as ServiceContent;
  } catch { /* ignore */ }
  if (!content) content = serviceContent[slug] ?? null;

  const Icon    = iconMap[service.icon] || GlobeAltIcon;
  const related = otherServices.filter(s => s.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.07)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(26,26,46,0.5)_0%,transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link href="/services" className="inline-flex items-center gap-2 font-body text-sm text-text-secondary hover:text-gold transition-colors mb-10">
              ← Back to Services
            </Link>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-gold" />
                </div>
                <h1 className="font-heading text-5xl md:text-6xl font-semibold text-white leading-tight mb-4">
                  {service.title}
                </h1>
                {content && (
                  <p className="font-body text-lg text-gold/80 italic mb-4">{content.tagline}</p>
                )}
                <p className="font-body text-base text-text-secondary leading-relaxed mb-8">
                  {service.summary}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/#contact" className="inline-flex font-body font-medium px-8 py-4 bg-gold text-black rounded-md hover:bg-gold-light transition-all duration-200">
                    Get Started
                  </Link>
                  <Link href="#process" className="inline-flex font-body font-medium px-8 py-4 border border-white/20 text-white rounded-md hover:border-gold hover:text-gold transition-all duration-200">
                    See How It Works
                  </Link>
                </div>
              </div>
              <div className="bg-surface border border-border rounded-2xl p-10">
                <h2 className="font-heading text-2xl text-white mb-6">What&apos;s Included</h2>
                <ul className="space-y-4">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-text-secondary">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {content && <>

          {/* ── Stats Strip ───────────────────────────────────────────── */}
          <section className="py-14 bg-surface border-y border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="font-heading text-5xl font-bold text-gold mb-2">{stat.value}</div>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Process ───────────────────────────────────────────────── */}
          <section id="process" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-4">How We Do It</h2>
                <p className="font-body text-text-secondary max-w-xl mx-auto">A proven process built specifically for healthcare — no guesswork, no generic playbooks.</p>
                <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.process.map((step, i) => (
                  <div key={i} className="bg-surface border border-border rounded-xl p-7 hover:border-gold/30 transition-colors group">
                    <div className="font-heading text-4xl font-bold text-gold/20 group-hover:text-gold/40 transition-colors mb-4 leading-none">
                      {step.step}
                    </div>
                    <h3 className="font-heading text-xl text-white mb-3">{step.title}</h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Deep-dive: What You Get ────────────────────────────────── */}
          <section className="py-24 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-4">Everything You Get</h2>
                <p className="font-body text-text-secondary max-w-xl mx-auto">Every deliverable, explained — so you know exactly what your investment covers.</p>
                <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.included.map((item, i) => (
                  <div key={i} className="bg-background border border-border rounded-xl p-7 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(201,168,76,0.06)] transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-heading text-xl text-white mb-3">{item.title}</h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Outcome Banner ─────────────────────────────────────────── */}
          <section className="py-20 bg-navy relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08)_0%,transparent_70%)]" />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <div className="w-1 h-12 bg-gold mx-auto mb-8 rounded-full" />
              <p className="font-heading text-2xl md:text-3xl text-white leading-relaxed italic">
                &ldquo;{content.outcome}&rdquo;
              </p>
              <div className="mt-10">
                <Link href="/#contact" className="inline-flex font-body font-medium px-8 py-4 bg-gold text-black rounded-md hover:bg-gold-light transition-all duration-200">
                  Start the Conversation
                </Link>
              </div>
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────────────── */}
          <section className="py-24 bg-background">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-semibold text-white mb-4">Common Questions</h2>
                <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
              </div>
              <div className="space-y-4">
                {content.faq.map((item, i) => (
                  <div key={i} className="bg-surface border border-border rounded-xl p-7">
                    <h3 className="font-heading text-lg text-gold mb-3">{item.question}</h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Related Services ───────────────────────────────────────── */}
          <section className="py-24 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="font-heading text-4xl font-semibold text-white mb-4">Explore Other Services</h2>
                <div className="w-16 h-0.5 bg-gold mx-auto" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((s) => {
                  const RelIcon = iconMap[s.icon] || GlobeAltIcon;
                  return (
                    <Link key={s.slug} href={`/services/${s.slug}`}
                      className="group bg-background border border-border rounded-xl p-7 hover:border-gold/40 hover:shadow-[0_0_30px_rgba(201,168,76,0.07)] transition-all duration-300">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                        <RelIcon className="w-5 h-5 text-gold" />
                      </div>
                      <h3 className="font-heading text-xl text-white mb-2 group-hover:text-gold transition-colors">{s.title}</h3>
                      <p className="font-body text-sm text-text-secondary leading-relaxed">{s.summary}</p>
                      <span className="inline-flex items-center gap-1 mt-4 font-body text-sm text-gold/70 group-hover:text-gold transition-colors">
                        Learn more <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

        </>}

        {/* ── Contact ─────────────────────────────────────────────────── */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
