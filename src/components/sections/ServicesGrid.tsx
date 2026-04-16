'use client';

import Link from 'next/link';

interface ServiceItem {
  title: string;
  catchphrase: string;
  desc: string;
  href: string;
  gradient: string;
  isContact?: boolean;
}

const col1: ServiceItem[] = [
  {
    title: 'Social Media Marketing',
    catchphrase: 'Millions Are Scrolling. Make Them Stop For You.',
    desc: 'We build social media ecosystems for hospitals that grow appointment bookings, not just follower counts. Instagram, Facebook, YouTube — precision-targeted content that reaches the right patients at exactly the right moment.',
    href: '/services/social-media',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 55%, #0d0d14 100%)',
  },
  {
    title: 'Search Engine Optimisation',
    catchphrase: 'Be the First Hospital Patients Find. Every Time.',
    desc: 'When a patient Googles your speciality, we make sure they find you — not your competitor. Page-1 dominance through technical SEO, high-intent healthcare keyword strategy, and local search mastery that sticks.',
    href: '/services/seo',
    gradient: 'linear-gradient(135deg, #0c2340 0%, #1a4a7a 55%, #0d0d14 100%)',
  },
];

const col2: ServiceItem[] = [
  {
    title: 'Content Creation',
    catchphrase: 'Words That Heal. Content That Converts.',
    desc: 'Healthcare-compliant, deeply compelling content that earns patient trust and Google rankings simultaneously. Doctor profiles, procedure pages, patient education articles — written to convert curious readers into booked appointments.',
    href: '/services/content-creation',
    gradient: 'linear-gradient(135deg, #052e1c 0%, #0f766e 55%, #0d0d14 100%)',
  },
  {
    title: 'Brand Consulting',
    catchphrase: 'Your Brand Is the First Treatment.',
    desc: 'In healthcare, trust is the deciding factor before the consultation even begins. We craft visual identities, brand narratives, and patient communication systems that make your hospital the obvious choice — instinctively.',
    href: '/services/branding',
    gradient: 'linear-gradient(135deg, #2e1065 0%, #7c3aed 55%, #0d0d14 100%)',
  },
  {
    title: 'Ad Production',
    catchphrase: 'Stop the Scroll. Start the Conversation.',
    desc: 'Cinematic doctor reels, procedure explainers, high-impact patient testimonials — we produce healthcare creatives built to perform across every platform. Every frame engineered to build trust, drive enquiries, and deliver measurable ROI.',
    href: '/services/ad-production',
    gradient: 'linear-gradient(135deg, #450a0a 0%, #b91c1c 55%, #0d0d14 100%)',
  },
];

const col3: ServiceItem[] = [
  {
    title: 'Web Development',
    catchphrase: 'Your Website Should Work as Hard as You Do.',
    desc: 'Fast, beautiful, appointment-converting hospital websites built mobile-first and SEO-ready from day one. A seamless digital front desk that turns every visitor into a potential patient — around the clock, without extra effort.',
    href: '/services/web-design',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 55%, #0d0d14 100%)',
  },
  {
    title: 'Ads Management',
    catchphrase: 'Every Rupee Spent. Every Patient Acquired.',
    desc: 'We manage your Google and Meta budgets with surgical precision — targeting the exact patient demographics who need your care most, at the moment they\'re ready to book. Real-time optimisation, full transparency, zero wasted spend.',
    href: '/services/paid-ads',
    gradient: 'linear-gradient(135deg, #0a2533 0%, #0e7490 55%, #0d0d14 100%)',
  },
  {
    title: 'Ready to Grow?',
    catchphrase: 'Your Growth Story Starts With One Conversation.',
    desc: 'Tell us about your hospital, your goals, and the challenges holding you back. We\'ll come back with a tailored, no-obligation strategy and a clear growth path. The first consultation is completely free.',
    href: '/#contact',
    gradient: 'linear-gradient(135deg, #451a03 0%, #c9a84c 55%, #0d0d14 100%)',
    isContact: true,
  },
];

export const allServiceItems = [...col1, ...col2, ...col3];

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <Link
      href={item.href}
      className="group relative overflow-hidden rounded-xl flex flex-col w-full h-full cursor-pointer transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
      style={{ background: item.gradient }}
    >
      {/* Placeholder label */}
      <div className="absolute top-3 right-3 bg-black/40 text-white/40 text-[10px] font-mono px-2 py-0.5 rounded group-hover:opacity-0 transition-opacity duration-200 pointer-events-none select-none">
        image
      </div>

      {/* Dark hover overlay */}
      <div className="absolute inset-0 bg-[#0a0a12]/88 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* DEFAULT: title at bottom */}
      <div className="absolute bottom-0 inset-x-0 p-5 bg-linear-to-t from-black/75 via-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-200 pointer-events-none">
        <h3 className={`font-heading text-lg font-semibold leading-tight ${item.isContact ? 'text-gold' : 'text-white'}`}>
          {item.title}
        </h3>
      </div>

      {/* HOVER: text */}
      <div className="absolute inset-0 p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 pointer-events-none">
        <p className="font-heading text-base font-semibold italic leading-snug mb-3 text-gold/90">
          {item.catchphrase}
        </p>
        <p className="font-body text-[0.82rem] text-white/75 leading-relaxed">
          {item.desc}
        </p>
      </div>

      {/* Gold ring on hover */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-gold/30 transition-all duration-300 pointer-events-none" />
    </Link>
  );
}

export function CardGrid() {
  const ROW_HEIGHT = 260;
  const GAP = 16;
  const totalHeight = ROW_HEIGHT * 3 + GAP * 2;

  return (
    <>
      {/* Desktop grid — inline styles for grid placement (dynamic class names don't survive Tailwind purge) */}
      <div
        className="hidden lg:grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: `repeat(3, ${ROW_HEIGHT}px)`,
          height: `${totalHeight}px`,
        }}
      >
        {/* Col 1 */}
        <div style={{ gridColumn: 1, gridRow: 2 }} className="flex">
          <ServiceCard item={col1[0]} />
        </div>
        <div style={{ gridColumn: 1, gridRow: 3 }} className="flex">
          <ServiceCard item={col1[1]} />
        </div>
        {/* Col 2 */}
        {col2.map((item, i) => (
          <div key={item.title} style={{ gridColumn: 2, gridRow: i + 1 }} className="flex">
            <ServiceCard item={item} />
          </div>
        ))}
        {/* Col 3 */}
        {col3.map((item, i) => (
          <div key={item.title} style={{ gridColumn: 3, gridRow: i + 1 }} className="flex">
            <ServiceCard item={item} />
          </div>
        ))}
      </div>

      {/* Mobile: single column */}
      <div className="lg:hidden space-y-4">
        {allServiceItems.map((item) => (
          <div key={item.title} className="h-55">
            <ServiceCard item={item} />
          </div>
        ))}
      </div>
    </>
  );
}

export function ServicesGrid() {
  const ROW_HEIGHT = 260;
  const GAP = 16;
  const totalHeight = ROW_HEIGHT * 3 + GAP * 2;

  return (
    <section className="py-14 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Desktop: heading occupies col-1 row-1, cards fill the rest */}
        <div
          className="hidden lg:grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: `repeat(3, ${ROW_HEIGHT}px)`,
            height: `${totalHeight}px`,
          }}
        >
          {/* Heading — col 1, row 1 */}
          <div style={{ gridColumn: 1, gridRow: 1 }} className="flex flex-col justify-center px-2">
            <span className="inline-block font-body text-xs font-medium tracking-[0.3em] text-gold uppercase mb-4 px-3 py-1 border border-gold/30 rounded-full bg-gold/5 w-fit">
              What We Do
            </span>
            <h2 className="font-heading text-3xl font-bold text-white leading-tight mb-3">
              Built for Healthcare.<br />
              <span className="text-gold italic">Proven by Results.</span>
            </h2>
            <p className="font-body text-sm text-text-secondary leading-relaxed">
              Eight precision-engineered services. One singular goal — a full appointment calendar and a brand patients trust.
            </p>
          </div>

          {/* Col 1 cards */}
          <div style={{ gridColumn: 1, gridRow: 2 }} className="flex">
            <ServiceCard item={col1[0]} />
          </div>
          <div style={{ gridColumn: 1, gridRow: 3 }} className="flex">
            <ServiceCard item={col1[1]} />
          </div>

          {/* Col 2 */}
          {col2.map((item, i) => (
            <div key={item.title} style={{ gridColumn: 2, gridRow: i + 1 }} className="flex">
              <ServiceCard item={item} />
            </div>
          ))}

          {/* Col 3 */}
          {col3.map((item, i) => (
            <div key={item.title} style={{ gridColumn: 3, gridRow: i + 1 }} className="flex">
              <ServiceCard item={item} />
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <div className="mb-6 px-1">
            <span className="inline-block font-body text-xs font-medium tracking-[0.3em] text-gold uppercase mb-4 px-3 py-1 border border-gold/30 rounded-full bg-gold/5 w-fit">
              What We Do
            </span>
            <h2 className="font-heading text-3xl font-bold text-white leading-tight mb-3">
              Built for Healthcare.<br />
              <span className="text-gold italic">Proven by Results.</span>
            </h2>
            <p className="font-body text-sm text-text-secondary leading-relaxed">
              Eight precision-engineered services. One singular goal — a full appointment calendar and a brand patients trust.
            </p>
          </div>
          <div className="space-y-4">
            {allServiceItems.map((item) => (
              <div key={item.title} className="h-55">
                <ServiceCard item={item} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
