export const dynamic = 'force-dynamic';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactSection } from '@/components/sections/ContactSection';
import { getBlogPosts } from '@/lib/firestore';
import { BlogPost } from '@/types';
import Link from 'next/link';

const fallbackPosts: BlogPost[] = [
  { id: '1', title: '5 Proven Strategies to Increase Hospital Patient Footfall', slug: '5-strategies-increase-patient-footfall', content: '', excerpt: 'Discover the data-backed strategies top hospitals use to consistently attract new patients and retain existing ones.', published: true, createdAt: { seconds: 1700000000, nanoseconds: 0 } },
  { id: '2', title: 'Why Google Ads Outperform Print for Healthcare Marketing', slug: 'google-ads-vs-print-healthcare', content: '', excerpt: 'A detailed comparison of digital vs traditional marketing ROI for hospitals and clinics in India.', published: true, createdAt: { seconds: 1699000000, nanoseconds: 0 } },
  { id: '3', title: 'How to Build a Healthcare Brand Patients Trust', slug: 'building-healthcare-brand-trust', content: '', excerpt: 'The psychology of trust in healthcare — and how digital branding can establish it before a patient even books an appointment.', published: true, createdAt: { seconds: 1698000000, nanoseconds: 0 } },
];

function formatDate(ts: { seconds: number }) {
  return new Date(ts.seconds * 1000).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPage() {
  let posts: BlogPost[] = fallbackPosts;
  try {
    const fetched = await getBlogPosts();
    if (fetched.length) posts = fetched as BlogPost[];
  } catch { /* use fallback */ }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.06)_0%,transparent_60%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block font-body text-xs font-medium tracking-[0.3em] text-gold uppercase mb-6 px-4 py-2 border border-gold/30 rounded-full bg-gold/5">
              Insights
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-semibold text-white leading-tight mb-6">
              Healthcare Marketing{' '}
              <span className="text-gold italic">Insights</span>
            </h1>
            <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Expert insights, case studies, and actionable strategies for healthcare marketing professionals.
            </p>
          </div>
        </section>

        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-body text-text-secondary">No posts published yet. Check back soon.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article key={post.id} className="group bg-background border border-border rounded-xl overflow-hidden hover:border-gold/50 transition-all duration-300">
                    <div className="bg-linear-to-br from-navy to-background h-48 flex items-center justify-center p-6">
                      <h2 className="font-heading text-xl text-white text-center leading-tight group-hover:text-gold transition-colors">
                        {post.title}
                      </h2>
                    </div>
                    <div className="p-6">
                      <p className="font-body text-xs text-gold uppercase tracking-wider mb-3">
                        {formatDate(post.createdAt)}
                      </p>
                      <p className="font-body text-sm text-text-secondary leading-relaxed mb-6">{post.excerpt}</p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-body text-sm font-medium text-gold hover:text-gold-light transition-colors inline-flex items-center gap-1"
                      >
                        Read Article <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
