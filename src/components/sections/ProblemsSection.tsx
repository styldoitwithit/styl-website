import Link from 'next/link';
import { getPageContent } from '@/lib/firestore';

const defaultData = {
  badge: 'The Problems',
  heading: "What's Holding Your Business Back?",
  problems: [
    { title: 'Low Online Visibility', desc: "Patients can't find you online. They're landing on your competitors instead of your doorstep." },
    { title: 'Poor Patient Acquisition', desc: "Ad spend keeps rising but booked appointments stay flat. Leads come in and go cold." },
    { title: 'Weak Brand Perception', desc: "No consistent identity means patients don't trust you before they even walk through the door." },
    { title: 'Inefficient Ad Spend', desc: "Generic campaigns burn your budget targeting the wrong people at the wrong time." },
  ],
  rightText: 'We solve all of this — so you can focus on what you do best.',
  ctaText: "Let's Talk",
};

export async function ProblemsSection() {
  const raw = await getPageContent('home_problems');
  const data = raw ? { ...defaultData, ...raw, problems: (raw.problems as typeof defaultData.problems) ?? defaultData.problems } : defaultData;

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* Left — badge, heading, problem cards */}
          <div className="lg:col-span-3">
            <span className="inline-block bg-gold/20 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-6">
              {data.badge}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase leading-tight mb-10">
              {data.heading}
            </h2>
            <div className="space-y-3">
              {data.problems.map((p, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-5 bg-surface border border-border rounded-xl px-6 py-5 hover:border-gold/40 hover:shadow-[0_0_24px_rgba(201,168,76,0.07)] transition-all duration-300"
                >
                  <div className="shrink-0 w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mt-0.5 group-hover:bg-gold/20 transition-colors">
                    <div className="w-3 h-3 rounded-full bg-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white mb-1.5">{p.title}</h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — heading aligned to top, placeholder image, CTA */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Spacer to align heading with left heading (badge height + margin) */}
            <div className="mb-6 h-6.5" />
            <p className="font-heading text-3xl md:text-4xl font-bold text-white leading-snug mb-8">
              {data.rightText}
            </p>

            {/* Placeholder image */}
            <div className="w-full aspect-video rounded-xl bg-surface border border-border flex items-center justify-center mb-8 overflow-hidden">
              <div className="flex flex-col items-center gap-2 text-border">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 21h18" />
                </svg>
                <span className="font-body text-xs uppercase tracking-widest">Image</span>
              </div>
            </div>

            <Link
              href="/#contact"
              className="inline-flex font-body font-medium px-8 py-4 bg-gold text-black rounded-md hover:bg-gold-light transition-all duration-200 text-base w-fit"
            >
              {data.ctaText}
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
