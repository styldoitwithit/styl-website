import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactSection } from '@/components/sections/ContactSection';
import { getPageContent } from '@/lib/firestore';
import Link from 'next/link';

const defaultStory = {
  paragraphs: [
    'Founded over 15 years ago, STYL started as a boutique marketing consultancy in Chennai. We quickly discovered that the healthcare sector had a massive gap — brilliant doctors and hospital administrators who were world-class at medicine, but struggled to communicate their expertise to the patients who needed them most.',
    'We filled that gap. Today, we work with hospitals, specialist clinics, and individual practitioners across India, delivering campaigns that don\'t just look good — they drive real patient footfall and measurable revenue growth.',
    'With over 150 healthcare clients served, 1,250+ hours of video content produced, and an average campaign ROI of 15X, STYL is the partner healthcare brands turn to when they\'re serious about growth.',
  ],
  stats: [
    { value: '150+', label: 'Healthcare Clients' },
    { value: '15X', label: 'Average Campaign ROI' },
    { value: '15+', label: 'Years of Experience' },
    { value: '45%', label: 'Lower Cost Per Lead' },
  ],
};

const defaultValues = {
  values: [
    { title: 'Healthcare First', desc: 'We understand that healthcare marketing carries a unique responsibility. Every campaign is crafted with patient safety, ethics, and trust at the forefront.' },
    { title: 'Results Driven', desc: 'We obsess over metrics. From cost per lead to appointment conversion rates — if it can be measured, we\'re tracking it and optimising it.' },
    { title: 'Long-Term Partnerships', desc: 'We don\'t do one-off campaigns. We build lasting relationships with our healthcare clients, growing alongside them year after year.' },
    { title: 'Transparent Communication', desc: 'No jargon, no vanity metrics. Monthly clear reports that show exactly where your budget went and what it achieved.' },
  ],
};

const defaultTeam = {
  members: [
    { name: 'Shailesh Kumar', role: 'Founder & Strategy Lead', desc: '15+ years in digital marketing, specialised in healthcare brand building and patient acquisition campaigns.' },
    { name: 'Priya Ramesh', role: 'Creative Director', desc: 'Expert in healthcare visual communication — from brand identity systems to patient-facing video content.' },
    { name: 'Arjun Nair', role: 'Performance Marketing', desc: 'Google & Meta certified specialist managing millions in ad spend for hospitals and medical clinics.' },
  ],
};

type Stat = { value: string; label: string };
type ValueItem = { title: string; desc: string };
type TeamMember = { name: string; role: string; desc: string };

export default async function AboutPage() {
  const [rawStory, rawValues, rawTeam] = await Promise.all([
    getPageContent('about_story'),
    getPageContent('about_values'),
    getPageContent('about_team'),
  ]);

  const storyData = rawStory
    ? { paragraphs: (rawStory.paragraphs as string[]) ?? defaultStory.paragraphs, stats: (rawStory.stats as Stat[]) ?? defaultStory.stats }
    : defaultStory;
  const valuesData = rawValues ? { values: (rawValues.values as ValueItem[]) ?? defaultValues.values } : defaultValues;
  const teamData = rawTeam ? { members: (rawTeam.members as TeamMember[]) ?? defaultTeam.members } : defaultTeam;

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.06)_0%,transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block font-body text-xs font-medium tracking-[0.3em] text-gold uppercase mb-6 px-4 py-2 border border-gold/30 rounded-full bg-gold/5">
                About STYL
              </span>
              <h1 className="font-heading text-5xl md:text-7xl font-semibold text-white leading-tight mb-6">
                The Agency Behind{' '}
                <span className="text-gold italic">Healthcare</span>{' '}
                Growth
              </h1>
              <p className="font-body text-lg text-text-secondary leading-relaxed mb-8">
                STYL Digital Marketing was founded with one mission: to help hospitals and doctors build powerful
                online presences that translate into real patient appointments. Based in Chennai, we&apos;ve grown
                to become India&apos;s most trusted healthcare marketing agency.
              </p>
              <Link
                href="/#contact"
                className="inline-flex font-body font-medium px-8 py-4 bg-gold text-black rounded-md hover:bg-gold-light transition-all duration-200"
              >
                Work With Us
              </Link>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeading title="Our Story" centered={false} />
                <div className="mt-8 space-y-4 font-body text-text-secondary leading-relaxed">
                  {storyData.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {storyData.stats.map((stat) => (
                  <div key={stat.label} className="bg-background border border-border rounded-xl p-6 text-center">
                    <div className="font-heading text-4xl font-bold text-gold">{stat.value}</div>
                    <div className="font-body text-xs text-text-secondary mt-2">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Our Values" subtitle="The principles that guide everything we do" />
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              {valuesData.values.map((v) => (
                <div key={v.title} className="bg-surface border border-border rounded-xl p-8 hover:border-gold/40 transition-all duration-300">
                  <h3 className="font-heading text-xl text-gold mb-3">{v.title}</h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="The Team" subtitle="Specialists who live and breathe healthcare marketing" />
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamData.members.map((member) => (
                <div key={member.name} className="bg-background border border-border rounded-xl p-8 text-center hover:border-gold/40 transition-all duration-300">
                  <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
                    <span className="font-heading text-2xl text-gold font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl text-white mb-1">{member.name}</h3>
                  <p className="font-body text-xs text-gold uppercase tracking-wider mb-4">{member.role}</p>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
