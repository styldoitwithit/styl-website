import Link from 'next/link';
import Image from 'next/image';
import { getPageContent } from '@/lib/firestore';
import { storageUrl } from '@/lib/firebase';

const defaultData = {
  heading: 'We Got Your Back',
  subtitle: 'Our healthcare marketing expertise turns your challenges into competitive advantages.',
  badge: 'The Solutions',
  leftText: 'Every challenge you face — we have the answer for it.',
  ctaText: "See How We Do It",
  solutions: [
    { title: 'Data-Driven Patient Targeting', desc: 'We use location, demographics, and search intent data to reach the exact patients who need your services right now.' },
    { title: 'Full-Funnel Lead Conversion', desc: 'From first click to confirmed appointment — our funnels nurture every lead with precision follow-up sequences.' },
    { title: 'Premium Healthcare Branding', desc: 'We build trust at every touchpoint with a brand that reflects your expertise and resonates with patients.' },
    { title: 'Transparent ROI Tracking', desc: 'No guesswork. Every campaign is tracked, measured, and optimised with monthly performance reports.' },
  ],
};

export async function SolutionsSection() {
  const raw = await getPageContent('home_solutions');
  const data = raw ? { ...defaultData, ...raw, solutions: (raw.solutions as typeof defaultData.solutions) ?? defaultData.solutions } : defaultData;

  return (
    <section className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* Left — image and CTA */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="mb-6 h-6.5" />
            <p className="font-heading text-3xl md:text-4xl font-bold text-white leading-snug mb-8">
              {data.leftText}
            </p>
            <div className="w-full aspect-video rounded-xl bg-background/40 border border-gold/20 overflow-hidden mb-8 relative">
              <Image
                src={storageUrl('solutions-image.jpg')}
                alt="Healthcare marketing solutions"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <Link
              href="/services"
              className="inline-flex font-body font-medium px-8 py-4 bg-gold text-black rounded-md hover:bg-gold-light transition-all duration-200 text-base w-fit"
            >
              {data.ctaText}
            </Link>
          </div>

          {/* Right — badge, heading, solution cards */}
          <div className="lg:col-span-3">
            <span className="inline-block bg-gold/20 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-6">
              {data.badge}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase leading-tight mb-10">
              {data.heading}
            </h2>
            <div className="space-y-3">
              {data.solutions.map((s, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-5 bg-background/40 border border-gold/20 rounded-xl px-6 py-5 hover:border-gold/50 hover:shadow-[0_0_24px_rgba(201,168,76,0.07)] transition-all duration-300"
                >
                  <div className="shrink-0 w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mt-0.5 group-hover:bg-gold/20 transition-colors">
                    <div className="w-3 h-3 rounded-full bg-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white mb-1.5">{s.title}</h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
