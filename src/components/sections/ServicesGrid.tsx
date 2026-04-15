import Link from 'next/link';
import { Service } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  MagnifyingGlassIcon,
  MegaphoneIcon,
  ChartBarIcon,
  VideoCameraIcon,
  StarIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  search: MagnifyingGlassIcon,
  megaphone: MegaphoneIcon,
  chart: ChartBarIcon,
  video: VideoCameraIcon,
  star: StarIcon,
  globe: GlobeAltIcon,
};

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="py-12 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Range of Services"
          subtitle="Comprehensive digital marketing solutions tailored for the healthcare industry"
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || GlobeAltIcon;
            return (
              <div
                key={service.id}
                className="group bg-background border border-border rounded-xl p-6 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(201,168,76,0.08)] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 bg-gold/10 border border-gold/20 rounded-lg flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl text-white mb-2">{service.title}</h3>
                    <ul className="space-y-1.5 mb-4">
                      {service.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 font-body text-sm text-text-secondary">
                          <span className="text-gold mt-0.5 shrink-0">→</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/services/${service.slug}`}
                      className="font-body text-sm font-medium text-gold hover:text-gold-light transition-colors inline-flex items-center gap-1"
                    >
                      Learn more <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
