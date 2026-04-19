import { SectionHeading } from '@/components/ui/SectionHeading';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { getPageContent } from '@/lib/firestore';
import { storageUrl } from '@/lib/firebase';
import Image from 'next/image';

const defaultData = {
  heading: 'See Our Work in Action',
  subtitle: "Real content we create for real healthcare brands — live on Instagram",
  items: [
    { title: 'What Our Clients Say', subtitle: 'How we grew patient acquisition by 40%', href: 'https://www.instagram.com/doitinstyl/', bg: 'from-navy to-background' },
    { title: 'Dr. G Mukesh Mohan — Mukesh Arthro Care', subtitle: 'Scaling an orthopaedic brand online', href: 'https://www.instagram.com/p/DVXqaZYj8HF/', bg: 'from-gold/10 to-background' },
    { title: 'Dr. Vijayanad — Sri Ramakrishna', subtitle: 'Scaling a specialty hospital brand', href: 'https://www.instagram.com/reel/DVSlH34D28U/', bg: 'from-navy to-background' },
    { title: 'Dr. Madhupriya — Shree Clinic', subtitle: 'Building trust in fertility care online', href: 'https://www.instagram.com/reel/DVaTfHzDRIX/', bg: 'from-gold/20 to-background' },
  ],
};

type VideoItem = { title: string; subtitle: string; href: string; bg: string };

export async function VideoTestimonials() {
  const raw = await getPageContent('home_video_testimonials');
  const data = raw ? { ...defaultData, ...raw, items: (raw.items as VideoItem[]) ?? defaultData.items } : defaultData;

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={data.heading}
          subtitle={data.subtitle}
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1 — inline video */}
          <a
            href="https://www.instagram.com/doitinstyl/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-9/16 rounded-xl overflow-hidden border border-border hover:border-gold/50 transition-all duration-300 block"
          >
            <video
              src={storageUrl('testimonial-1.mp4')}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
              <h4 className="font-heading text-base text-white">{data.items[0].title}</h4>
              <p className="font-body text-xs text-text-secondary mt-1">{data.items[0].subtitle}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-full bg-gold/30 flex items-center justify-center">
                <PlayCircleIcon className="w-9 h-9 text-gold" />
              </div>
            </div>
          </a>

          {/* Cards 2–4 — images linking to Instagram */}
          {[
            { src: storageUrl('testimonial-2.jpg'), href: 'https://www.instagram.com/p/DVXqaZYj8HF/' },
            { src: storageUrl('testimonial-3.jpg'), href: 'https://www.instagram.com/reel/DVSlH34D28U/' },
            { src: storageUrl('testimonial-4.jpg'), href: 'https://www.instagram.com/reel/DVaTfHzDRIX/' },
          ].map((card, i) => (
            <a
              key={i}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-9/16 rounded-xl overflow-hidden border border-border hover:border-gold/50 transition-all duration-300"
            >
              <Image
                src={card.src}
                alt={data.items[i + 1].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
                <h4 className="font-heading text-base text-white">{data.items[i + 1].title}</h4>
                <p className="font-body text-xs text-text-secondary mt-1">{data.items[i + 1].subtitle}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-gold/30 flex items-center justify-center">
                  <PlayCircleIcon className="w-9 h-9 text-gold" />
                </div>
              </div>
            </a>
          ))}

        </div>
      </div>
    </section>
  );
}
