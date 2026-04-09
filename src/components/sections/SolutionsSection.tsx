import { SectionHeading } from '@/components/ui/SectionHeading';

const solutions = [
  {
    number: '01',
    title: 'Data-Driven Patient Targeting',
    desc: 'We use location, demographics, and search intent data to reach the exact patients who need your services right now.',
  },
  {
    number: '02',
    title: 'Full-Funnel Lead Conversion',
    desc: 'From first click to confirmed appointment — our funnels nurture every lead with precision follow-up sequences.',
  },
  {
    number: '03',
    title: 'Premium Healthcare Branding',
    desc: 'We build trust at every touchpoint with a brand that reflects your expertise and resonates with patients.',
  },
  {
    number: '04',
    title: 'Transparent ROI Tracking',
    desc: 'No guesswork. Every campaign is tracked, measured, and optimised with monthly performance reports.',
  },
];

export function SolutionsSection() {
  return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="We Got Your Back"
          subtitle="Our healthcare marketing expertise turns your challenges into competitive advantages."
          goldAccent
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((s) => (
            <div
              key={s.number}
              className="border border-gold/20 rounded-xl p-8 bg-background/40 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(201,168,76,0.08)] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="font-heading text-4xl font-bold text-gold/30 flex-shrink-0 leading-none">{s.number}</span>
                <div>
                  <h3 className="font-heading text-xl text-white mb-2">{s.title}</h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
