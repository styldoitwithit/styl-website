import Link from 'next/link';

const problems = [
  {
    title: 'Low Online Visibility',
    desc: "Patients can't find you online. They're landing on your competitors instead of your doorstep.",
  },
  {
    title: 'Poor Patient Acquisition',
    desc: "Ad spend keeps rising but booked appointments stay flat. Leads come in and go cold.",
  },
  {
    title: 'Weak Brand Perception',
    desc: "No consistent identity means patients don't trust you before they even walk through the door.",
  },
  {
    title: 'Inefficient Ad Spend',
    desc: "Generic campaigns burn your budget targeting the wrong people at the wrong time.",
  },
];

export function ProblemsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">

          {/* Left column — badge, heading, problem list */}
          <div className="lg:col-span-3">
            <span className="inline-block bg-gold/20 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-6">
              The Problems
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase leading-tight mb-10">
              What's Holding Your Business Back?
            </h2>
            <div className="space-y-6">
              {problems.map((p, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mt-0.5">
                    <div className="w-3 h-3 rounded-full bg-gold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white mb-1.5">{p.title}</h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed max-w-sm">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — solution statement + CTA */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <p className="font-heading text-3xl md:text-4xl font-bold text-white leading-snug mb-8">
              We solve all of this — so you can focus on what you do best.
            </p>
            <Link
              href="/#contact"
              className="inline-flex font-body font-medium px-8 py-4 bg-gold text-black rounded-md hover:bg-gold-light transition-all duration-200 text-base w-fit"
            >
              Let&apos;s Talk
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
