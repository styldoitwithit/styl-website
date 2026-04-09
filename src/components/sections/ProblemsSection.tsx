import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';

const problems = [
  {
    number: '01',
    title: 'Low Online Visibility',
    desc: 'Your hospital is invisible on Google. Patients search for you but find your competitors instead.',
  },
  {
    number: '02',
    title: 'Poor Patient Acquisition',
    desc: 'Despite spending on ads, the leads that come in don\'t convert into actual appointments.',
  },
  {
    number: '03',
    title: 'Weak Brand Perception',
    desc: 'No consistent brand identity means patients don\'t trust you before they even walk through the door.',
  },
  {
    number: '04',
    title: 'Inefficient Ad Spend',
    desc: 'Money is being wasted on generic campaigns that don\'t target the right patient demographics.',
  },
];

export function ProblemsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What's Holding Your Business Back?"
          subtitle="Sound familiar? You're not alone — these are the challenges every healthcare provider faces."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((p) => (
            <div
              key={p.number}
              className="border border-border rounded-xl p-8 bg-surface/50 hover:border-red-500/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="font-heading text-4xl font-bold text-red-500/20 flex-shrink-0 leading-none">{p.number}</span>
                <div>
                  <h3 className="font-heading text-xl text-white mb-2">{p.title}</h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-heading text-2xl md:text-3xl text-white mb-6 italic">
            We solve all of this — so you can focus on what you do best.
          </p>
          <Link
            href="/#contact"
            className="inline-flex font-body font-medium px-8 py-4 bg-gold text-black rounded-md hover:bg-gold-light transition-all duration-200 text-base"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </section>
  );
}
