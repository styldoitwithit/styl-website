export const dynamic = 'force-dynamic';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactSection } from '@/components/sections/ContactSection';
import { CaseStudySlider } from '@/components/sections/CaseStudySlider';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { getClients, getCaseStudies, getTestimonials } from '@/lib/firestore';
import { Client, CaseStudy, Testimonial } from '@/types';
import Image from 'next/image';

const fallbackClients: Client[] = [
  { id: '1', name: 'ATLAS HOSPITALS', logo: '/assets/ATLAS HOSPITALS.png', category: 'Healthcare', order: 1 },
  { id: '2', name: 'DR ANILKUMAR EYE HOSPITAL', logo: '/assets/DR ANILKUMAR EYE HOSPITAL.jpg', category: 'Healthcare', order: 2 },
  { id: '3', name: 'MUKESH ARTHRO CARE HOSPITAL', logo: '/assets/MUKESH ARTHRO CARE HOSPITAL.png', category: 'Healthcare', order: 3 },
  { id: '4', name: 'SRI RAMAKRISHNA SPECIALTY HOSPITALS', logo: '/assets/SRI RAMAKRISHNA SPECIALTY HOSPITALS.jpg', category: 'Healthcare', order: 4 },
  { id: '5', name: 'SHREE CLINIC', logo: '', category: 'Healthcare', order: 5 },
];

const fallbackCaseStudies: CaseStudy[] = [
  { id: '1', client: 'ATLAS HOSPITALS', logo: '/assets/ATLAS HOSPITALS.png', category: 'Healthcare', challenge: 'Low patient acquisition rate and declining referral numbers.', strategy: 'Targeted paid ads and referral incentive programme.', result: 'Significant growth in new patient registrations within 60 days.', metrics: [{ label: 'ROI', value: '320%', direction: 'up' }, { label: 'Leads', value: '250+', direction: 'up' }, { label: 'Growth', value: '40%', direction: 'up' }, { label: 'Cost Per Lead', value: '↓60%', direction: 'down' }], order: 1 },
  { id: '2', client: 'DR ANILKUMAR EYE HOSPITAL', logo: '/assets/DR ANILKUMAR EYE HOSPITAL.jpg', category: 'Healthcare', challenge: 'Struggling to convert online enquiries into booked appointments.', strategy: 'Redesigned enquiry funnel with automated follow-up sequences.', result: 'Conversion rate tripled within 45 days.', metrics: [{ label: 'Conversion Rate', value: '3×', direction: 'up' }, { label: 'Appointments', value: '180+', direction: 'up' }, { label: 'Faster Response', value: '55%', direction: 'up' }, { label: 'Revenue Growth', value: '↑28%', direction: 'up' }], order: 2 },
  { id: '3', client: 'MUKESH ARTHRO CARE HOSPITAL', logo: '/assets/MUKESH ARTHRO CARE HOSPITAL.png', category: 'Healthcare', challenge: 'Lack of brand visibility in a competitive regional market.', strategy: 'Multi-channel brand awareness campaign with local SEO.', result: 'Brand recall improved and organic search traffic increased.', metrics: [{ label: 'Search Visibility', value: '5×', direction: 'up' }, { label: 'New Patients', value: '400+', direction: 'up' }, { label: 'Organic Traffic', value: '70%', direction: 'up' }, { label: 'Brand Recall', value: '↑45%', direction: 'up' }], order: 3 },
];

const fallbackTestimonials: Testimonial[] = [
  { id: '1', author: 'DR JAIKISH S', role: 'CEO', company: 'ATLAS HOSPITALS', quote: 'As a doctor, I was looking for a reliable digital marketing team to grow my hospital\'s online presence. This team did an excellent job with Google Ads, social media marketing, and patient engagement. Highly recommended for healthcare marketing!', order: 1 },
  { id: '2', author: 'DR MADHUPRIYA', role: 'Managing Director', company: 'Shree Centre for Fertility and Women\'s Care', quote: 'We truly trust and value the digital marketing support provided for our fertility and women\'s care services. The team is reliable, responsive, and clearly understands the sensitivity and importance of healthcare communication.', order: 2 },
  { id: '3', author: 'DR VIJAYANAD', role: 'Founder', company: 'SRI RAMAKRISHNA SPECIALTY HOSPITALS', quote: 'Their strategies in SEO, Google Ads, and social media have significantly improved our patient inflow. They understand the healthcare industry well and provide consistent support. Highly satisfied with their service.', order: 3 },
];

export default async function ClientsPage() {
  let clients = fallbackClients;
  let caseStudies = fallbackCaseStudies;
  let testimonials = fallbackTestimonials;
  try {
    const [c, cs, t] = await Promise.all([getClients(), getCaseStudies(), getTestimonials()]);
    if (c.length) clients = c as Client[];
    if (cs.length) caseStudies = cs as CaseStudy[];
    if (t.length) testimonials = t as Testimonial[];
  } catch { /* use fallback */ }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05)_0%,transparent_70%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block font-body text-xs font-medium tracking-[0.3em] text-gold uppercase mb-6 px-4 py-2 border border-gold/30 rounded-full bg-gold/5">
              Our Clients
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-semibold text-white leading-tight mb-6">
              Healthcare Leaders Who{' '}
              <span className="text-gold italic">Trust Us</span>
            </h1>
            <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              We&apos;ve partnered with hospitals, clinics, and specialist practices across India to build
              brands that patients trust and search engines love.
            </p>
          </div>
        </section>

        {/* Client Grid */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Our Client Portfolio" />
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="bg-background border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-gold/40 transition-all duration-300 aspect-square"
                >
                  {client.logo ? (
                    <div className="relative w-full h-20 mb-3">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gold/10 rounded-lg flex items-center justify-center mb-3">
                      <span className="font-heading text-xl text-gold font-bold">
                        {client.name.slice(0, 2)}
                      </span>
                    </div>
                  )}
                  <p className="font-body text-xs text-text-secondary leading-tight">{client.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CaseStudySlider caseStudies={caseStudies} />
        <TestimonialsCarousel testimonials={testimonials} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
