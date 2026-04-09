import { SectionHeading } from '@/components/ui/SectionHeading';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

const videoItems = [
  {
    id: 1,
    title: 'Dr. Jaikish — ATLAS Hospitals',
    subtitle: 'How we grew patient acquisition by 40%',
    href: 'https://www.instagram.com/styl.digitalmarketing/',
    bg: 'from-navy to-background',
  },
  {
    id: 2,
    title: 'Dr. Madhupriya — Shree Clinic',
    subtitle: 'Building trust in fertility care online',
    href: 'https://www.instagram.com/styl.digitalmarketing/',
    bg: 'from-gold/10 to-background',
  },
  {
    id: 3,
    title: 'Dr. Vijayanad — Sri Ramakrishna',
    subtitle: 'Scaling a specialty hospital brand',
    href: 'https://www.instagram.com/styl.digitalmarketing/',
    bg: 'from-navy to-background',
  },
  {
    id: 4,
    title: 'See All Testimonials',
    subtitle: 'Follow us on Instagram',
    href: 'https://www.instagram.com/styl.digitalmarketing/',
    bg: 'from-gold/20 to-background',
    isPlayAll: true,
  },
];

export function VideoTestimonials() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Real Results, Real Voices"
          subtitle="Don't take our word for it — hear directly from our clients"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[9/16] rounded-xl overflow-hidden border border-border hover:border-gold/50 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${item.bg}`} />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/40 transition-colors">
                  <PlayCircleIcon className="w-10 h-10 text-gold" />
                </div>
                <h4 className="font-heading text-lg text-white">{item.title}</h4>
                <p className="font-body text-xs text-text-secondary mt-2">{item.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
