import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactSection } from '@/components/sections/ContactSection';
import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'Discovery & Audit',
    duration: 'Week 1',
    desc: 'We start by deeply understanding your hospital, your patients, and your competitors. We audit your existing digital presence — website, social media, SEO, and ads — to identify the gaps and opportunities.',
    deliverables: ['Full digital audit report', 'Competitor analysis', 'Target patient persona development', 'Current performance baseline'],
  },
  {
    number: '02',
    title: 'Strategy & Planning',
    duration: 'Week 2',
    desc: 'Based on the audit, we build a custom 90-day marketing strategy tailored specifically to your hospital\'s goals, budget, and patient demographics. No generic templates — every strategy is bespoke.',
    deliverables: ['90-day marketing roadmap', 'Channel selection & budget allocation', 'Content calendar', 'KPIs and success metrics'],
  },
  {
    number: '03',
    title: 'Brand & Creative',
    duration: 'Week 2–3',
    desc: 'We develop or refresh your brand identity, create all creative assets, and set up the technical infrastructure needed for campaigns — landing pages, tracking, ad accounts, and content.',
    deliverables: ['Brand guidelines', 'Ad creatives & copy', 'Landing pages', 'Tracking & analytics setup'],
  },
  {
    number: '04',
    title: 'Launch & Optimise',
    duration: 'Week 3 onwards',
    desc: 'Campaigns go live. We monitor performance daily, optimise in real-time, and make data-driven adjustments to continuously improve results. You\'ll see leads coming in within the first week.',
    deliverables: ['Campaign launch', 'Daily performance monitoring', 'Weekly optimisation', 'A/B testing'],
  },
  {
    number: '05',
    title: 'Reporting & Scale',
    duration: 'Monthly',
    desc: 'Every month, you receive a clear performance report showing exactly what your investment achieved — new patients, cost per lead, ROI, and next month\'s plan. When results are strong, we scale up.',
    deliverables: ['Monthly performance report', 'ROI analysis', 'Next month strategy', 'Scaling recommendations'],
  },
];

export default function ProcessPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,168,76,0.06)_0%,transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block font-body text-xs font-medium tracking-[0.3em] text-gold uppercase mb-6 px-4 py-2 border border-gold/30 rounded-full bg-gold/5">
              How We Work
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-semibold text-white leading-tight mb-6">
              Our Proven{' '}
              <span className="text-gold italic">Process</span>
            </h1>
            <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              A systematic, results-driven approach that turns marketing investment into measurable patient growth.
            </p>
          </div>
        </section>

        <section className="py-24 bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div key={step.number} className="relative flex gap-8">
                    {/* Step indicator */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gold flex items-center justify-center z-10 shadow-[0_0_20px_rgba(201,168,76,0.3)]">
                      <span className="font-heading text-lg font-bold text-black">{step.number}</span>
                    </div>

                    <div className="flex-1 pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                        <h2 className="font-heading text-2xl text-white">{step.title}</h2>
                        <span className="font-body text-xs text-gold border border-gold/30 px-3 py-1 rounded-full bg-gold/5">
                          {step.duration}
                        </span>
                      </div>
                      <p className="font-body text-sm text-text-secondary leading-relaxed mb-6">{step.desc}</p>
                      <div className="bg-background border border-border rounded-xl p-6">
                        <p className="font-body text-xs font-medium text-gold uppercase tracking-wider mb-3">Deliverables</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {step.deliverables.map((d, i) => (
                            <li key={i} className="flex items-center gap-2 font-body text-sm text-text-secondary">
                              <span className="text-gold text-xs">✓</span> {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-navy">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionHeading title="Ready to Start?" subtitle="Your first consultation is free. Let's talk about your goals." goldAccent />
            <div className="mt-10">
              <Link
                href="/#contact"
                className="inline-flex font-body font-medium px-10 py-4 bg-gold text-black rounded-md hover:bg-gold-light transition-all duration-200 text-lg"
              >
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
