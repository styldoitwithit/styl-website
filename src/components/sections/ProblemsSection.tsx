import Link from 'next/link';
import Image from 'next/image';
import { getPageContent } from '@/lib/firestore';
import { storageUrl } from '@/lib/firebase';

const defaultData = {
  badge: 'The Problems',
  heading: "What's Holding Your Business Back?",
  problems: [
    { title: 'Low Online Visibility', desc: "Patients can't find you online. They're landing on your competitors instead of your doorstep." },
    { title: 'Poor Patient Acquisition', desc: "Ad spend keeps rising but booked appointments stay flat. Leads come in and go cold." },
    { title: 'Weak Brand Perception', desc: "No consistent identity means patients don't trust you before they even walk through the door." },
    { title: 'Inefficient Ad Spend', desc: "Generic campaigns burn your budget targeting the wrong people at the wrong time." },
  ],
  rightText: 'Invisible online. Losing patients. Burning budget. Sound familiar?',
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

            {/* Problems image */}
            <div className="w-full aspect-video rounded-xl bg-surface border border-border overflow-hidden mb-8 relative">
              <Image
                src={storageUrl('problems-image.jpg')}
                alt="Healthcare branding challenges"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
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
